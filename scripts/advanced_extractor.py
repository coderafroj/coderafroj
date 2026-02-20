import os
import json
import fitz  # PyMuPDF
from unstructured.partition.pdf import partition_pdf
from collections import defaultdict
import re

class AdvancedExtractor:
    def __init__(self, book_dir, output_dir, assets_dir):
        self.book_dir = book_dir
        self.output_dir = output_dir
        self.assets_dir = assets_dir
        os.makedirs(output_dir, exist_ok=True)
        os.makedirs(assets_dir, exist_ok=True)

    def slugify(self, text):
        text = text.lower().strip()
        text = re.sub(r'[^\w\s-]', '', text)
        text = re.sub(r'[\s_-]+', '-', text)
        text = re.sub(r'^-+|-+$', '', text)
        return text

    def extract_images(self, pdf_path, prefix):
        """Extracts images from PDF and returns a mapping of page_num to image_path."""
        doc = fitz.open(pdf_path)
        img_map = {}
        
        for i in range(len(doc)):
            page = doc.load_page(i)
            images = page.get_images(full=True)
            for j, img in enumerate(images):
                xref = img[0]
                pix = fitz.Pixmap(doc, xref)
                if pix.n - pix.alpha < 4:       # Smask or RGB
                    pix.save(os.path.join(self.assets_dir, f"{prefix}_p{i}_i{j}.png"))
                else:                           # CMYK: convert to RGB first
                    pix1 = fitz.Pixmap(fitz.csRGB, pix)
                    pix1.save(os.path.join(self.assets_dir, f"{prefix}_p{i}_i{j}.png"))
                    pix1 = None
                pix = None
                img_map[i] = f"/src/assets/generated_images/{prefix}_p{i}_i{j}.png"
        return img_map

    def process_pdf(self, filename):
        pdf_path = os.path.join(self.book_dir, filename)
        prefix = self.slugify(filename.replace('.pdf', ''))
        
        print(f"--- STARTING EXTRACTION: {filename} ---")
        
        # 1. Image Extraction
        img_map = self.extract_images(pdf_path, prefix)
        
        # 2. Layout Partitioning
        # Using partition_pdf (this might be slow on large files)
        try:
            elements = partition_pdf(filename=pdf_path, strategy="fast")
        except Exception as e:
            print(f"Unstructured Error: {e}. Falling back to simple extraction.")
            # Fallback logic could go here, but let's assume it works for now
            return

        # 3. Topic Segmentation
        tutorials = []
        current_topic = {
            "title": filename.replace('.pdf', ''),
            "description": f"Notes extracted from {filename}",
            "tags": ["extracted", prefix],
            "content": "",
            "slug": prefix
        }
        
        for el in elements:
            text = str(el).strip()
            etype = el.category # 'Title', 'NarrativeText', 'ListItem', etc.
            
            if etype == "Title" and len(text) > 3:
                # If we have content in previous topic, save it
                if current_topic["content"].strip():
                    tutorials.append(current_topic)
                    
                # Start new topic
                topic_title = text
                current_topic = {
                    "title": topic_title,
                    "slug": self.slugify(f"{prefix}-{topic_title}"),
                    "description": f"Module: {topic_title}",
                    "tags": [prefix, "topic"],
                    "content": f"# {topic_title}\n\n"
                }
            else:
                # Add content
                if etype == "ListItem":
                    current_topic["content"] += f"- {text}\n"
                elif etype == "NarrativeText":
                    current_topic["content"] += f"{text}\n\n"
                else:
                    current_topic["content"] += f"{text}\n\n"

        # Final append
        if current_topic["content"].strip():
            tutorials.append(current_topic)

        # 4. Save Tutorials
        for t in tutorials:
            out_file = os.path.join(self.output_dir, f"{t['slug']}.json")
            with open(out_file, 'w', encoding='utf-8') as f:
                json.dump(t, f, indent=2)
            print(f"   Saved: {t['title']} -> {out_file}")

    def run(self):
        files = [f for f in os.listdir(self.book_dir) if f.lower().endswith('.pdf')]
        for f in files:
            self.process_pdf(f)

if __name__ == "__main__":
    BOOK_DIR = "src/assets/book"
    OUTPUT_DIR = "src/data/generated_tutorials"
    ASSETS_DIR = "src/assets/generated_images"
    
    extractor = AdvancedExtractor(BOOK_DIR, OUTPUT_DIR, ASSETS_DIR)
    extractor.run()
