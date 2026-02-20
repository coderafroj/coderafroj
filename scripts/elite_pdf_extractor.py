import os
import json
import fitz  # PyMuPDF
import re
from collections import Counter

class ElitePDFExtractor:
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

    def analyze_fonts(self, doc):
        """Analyzes font sizes to determine heading thresholds."""
        font_sizes = []
        for page in doc:
            blocks = page.get_text("dict")["blocks"]
            for b in blocks:
                if "lines" in b:
                    for l in b["lines"]:
                        for s in l["spans"]:
                            font_sizes.append(round(s["size"], 1))
        
        counts = Counter(font_sizes)
        # The most common font size is likely the body text
        common_sizes = sorted(counts.items(), key=lambda x: x[1], reverse=True)
        body_size = common_sizes[0][0] if common_sizes else 10
        
        # Headings are usually larger than body text
        headings = [size for size, count in common_sizes if size > body_size]
        headings.sort(reverse=True)
        
        # Assign levels (rough heuristic)
        h1_size = headings[0] if len(headings) > 0 else body_size + 4
        h2_size = headings[1] if len(headings) > 1 else body_size + 2
        h3_size = headings[2] if len(headings) > 2 else body_size + 1
        
        print(f"Font Analysis: Body({body_size}), H1({h1_size}), H2({h2_size}), H3({h3_size})")
        return h1_size, h2_size, h3_size

    def extract_images(self, doc, prefix):
        """Extracts images and returns a map of {page_num: [image_paths]}."""
        img_map = {}
        print(f"Extracting images for {prefix}...")
        for i in range(len(doc)):
            page = doc.load_page(i)
            images = page.get_images(full=True)
            page_imgs = []
            for j, img in enumerate(images):
                xref = img[0]
                pix = fitz.Pixmap(doc, xref)
                
                # Convert to RGB if it's CMYK or has other incompatible formats
                if pix.n >= 4:
                    pix = fitz.Pixmap(fitz.csRGB, pix)
                
                img_name = f"{prefix}_p{i}_i{j}.png"
                img_path = os.path.join(self.assets_dir, img_name)
                
                try:
                    pix.save(img_path)
                    page_imgs.append(f"/src/assets/generated_images/{img_name}")
                except Exception as e:
                    print(f"Warning: Could not save image {img_name}: {e}")
                
                pix = None
            if page_imgs:
                img_map[i] = page_imgs
        return img_map

    def process_pdf(self, filename):
        pdf_path = os.path.join(self.book_dir, filename)
        prefix = self.slugify(filename.replace('.pdf', ''))
        doc = fitz.open(pdf_path)
        
        h1_size, h2_size, h3_size = self.analyze_fonts(doc)
        img_map = self.extract_images(doc, prefix)
        
        topics = []
        current_topic = {
            "title": filename.replace('.pdf', ''),
            "slug": prefix,
            "description": f"Notes from {filename}",
            "tags": [prefix, "Premium"],
            "content": "",
            "createdAt": "2026-02-17"
        }
        
        prev_titles = set()
        print(f"Segmenting {filename} into topics...")
        
        for i, page in enumerate(doc):
            blocks = page.get_text("dict")["blocks"]
            if i in img_map:
                for img_path in img_map[i]:
                    current_topic["content"] += f"\n![Image]({img_path})\n"

            for b in blocks:
                if "lines" in b:
                    for l in b["lines"]:
                        # Join spans to handle split titles
                        line_text = "".join([s["text"] for s in l["spans"]]).strip()
                        if not line_text: continue
                        
                        # Use the average size or max size for the line
                        max_size = max([s["size"] for s in l["spans"]])
                        size = round(max_size, 1)
                        
                        if size >= h1_size and len(line_text) < 100:
                            # Clean the text (remove page numbers etc)
                            clean_text = re.sub(r'\s+Page\s+\d+\s*$', '', line_text, flags=re.IGNORECASE).strip()
                            
                            # Skip if it's the same as current title or a frequent header
                            if clean_text.lower() in prev_titles or clean_text.lower() == current_topic["title"].lower():
                                current_topic["content"] += f"\n# {line_text}\n"
                                continue

                            if current_topic["content"].strip():
                                topics.append(current_topic)
                            
                            prev_titles.add(clean_text.lower())
                            current_topic = {
                                "title": clean_text,
                                "slug": self.slugify(f"{prefix}-{clean_text}"),
                                "description": f"Module from {filename}: {clean_text}",
                                "tags": [prefix, "Elite"],
                                "content": f"# {clean_text}\n\n",
                                "createdAt": "2026-02-17"
                            }
                        elif size >= h2_size and len(line_text) < 100:
                            current_topic["content"] += f"\n## {line_text}\n"
                        elif size >= h3_size and len(line_text) < 100:
                            current_topic["content"] += f"\n### {line_text}\n"
                        else:
                            current_topic["content"] += line_text + " "
                    current_topic["content"] += "\n"
                current_topic["content"] += "\n"

        if current_topic["content"].strip():
            topics.append(current_topic)

        # Filter out empty/tiny topics (e.g. cover pages or repetitive headers)
        # Minimum 100 characters to be considered a valid tutorial module
        final_topics = [t for t in topics if len(t["content"].strip()) > 100]
        
        # Save each topic as a JSON
        for t in final_topics:
            out_path = os.path.join(self.output_dir, f"{t['slug']}.json")
            with open(out_path, 'w', encoding='utf-8') as f:
                json.dump(t, f, indent=2)
        
        print(f"Total valid topics generated: {len(final_topics)}")
        return final_topics

    def run(self):
        files = [f for f in os.listdir(self.book_dir) if f.lower().endswith('.pdf')]
        for f in files:
            print(f"\n--- PROCESSING: {f} ---")
            self.process_pdf(f)

if __name__ == "__main__":
    BOOK_DIR = os.path.join("src", "assets", "book")
    # Output to the generated tutorials data folder
    OUTPUT_DIR = os.path.join("src", "data", "generated_tutorials")
    # Assets for images
    ASSETS_DIR = os.path.join("src", "assets", "generated_images")
    
    extractor = ElitePDFExtractor(BOOK_DIR, OUTPUT_DIR, ASSETS_DIR)
    extractor.run()
