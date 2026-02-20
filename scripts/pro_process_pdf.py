import os
import json
import requests
import time
import fitz  # PyMuPDF
from dotenv import load_dotenv

# Manually load environment variables to avoid dotenv issues
env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
print(f"Loading .env from: {env_path}")

try:
    with open(env_path, 'r', encoding='utf-8-sig') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            if '=' in line:
                key, value = line.split('=', 1)
                os.environ[key.strip()] = value.strip().strip('"').strip("'")
except Exception as e:
    print(f"Error reading .env: {e}")

# Configuration
GEMINI_KEY = os.getenv("VITE_GEMINI_API_KEY")
HF_TOKEN = os.getenv("HUGGINGFACE_TOKEN") # Optional fallback
if GEMINI_KEY:
    print(f"Key loaded: {GEMINI_KEY[:5]}...{GEMINI_KEY[-5:]}")

class ProPDFConverter:
    def __init__(self):
        # Use exact model names from list_models.py
        self.gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key={GEMINI_KEY}"
        self.hf_url = "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-32B-Instruct"
        
    def extract_with_layout(self, pdf_path):
        """Extracts text preserving blocks and basic structure."""
        doc = fitz.open(pdf_path)
        blocks = []
        print(f"Analyzing {len(doc)} pages for layout...")
        
        for page in doc:
            # Extract text as blocks (preserves some layout info)
            text_blocks = page.get_text("blocks")
            for b in text_blocks:
                # b = (x0, y0, x1, y1, "text", block_no, block_type)
                content = b[4].strip()
                if content:
                    blocks.append(content)
        
        return "\n\n".join(blocks)

    def call_ai(self, prompt, text_chunk):
        """Tries Gemini first, falls back to HF Inference."""
        payload = {
            "contents": [{
                "parts": [{"text": f"{prompt}\n\nDATA:\n{text_chunk[:15000]}"}]
            }]
        }
        
        # Try Gemini
        try:
            print("Requesting Intelligence from Pulse Core (Gemini)...")
            res = requests.post(self.gemini_url, json=payload, timeout=30)
            if res.status_code == 200:
                raw_text = res.json()['candidates'][0]['content']['parts'][0]['text']
                return self.clean_json(raw_text)
            else:
                print(f"Gemini Limit Hit: {res.status_code} - {res.text}")
                return None
        except:
            print("Primary Node Downtime. Switching to Fallback...")

        # Fallback to HF (If token exists)
        if HF_TOKEN:
            headers = {"Authorization": f"Bearer {HF_TOKEN}"}
            hf_payload = {"inputs": f"<|begin_of_text|><|start_header_id|>system<|end_header_id|>\nYou are an AI tutorial builder. Output raw JSON matching the requested structure.<|eot_id|><|start_header_id|>user<|end_header_id|>\n{prompt}\n{text_chunk[:10000]}<|eot_id|><|start_header_id|>assistant<|end_header_id|>"}
            try:
                res = requests.post(self.hf_url, headers=headers, json=hf_payload, timeout=60)
                # Note: HF response format varies by model, usually list of dicts or raw text
                # This is simplified for the demo
                return {"title": "Error", "content": "HF Parsing not implemented yet"}
            except Exception as e:
                print(f"Fallback failed: {e}")
        
        return None

    def clean_json(self, text):
        try:
            cleaned = text.replace('```json', '').replace('```', '').strip()
            return json.loads(cleaned)
        except:
            return None

    def process_all(self):
        pdf_dir = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'book')
        output_dir = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'generated_tutorials')
        os.makedirs(output_dir, exist_ok=True)
        
        files = [f for f in os.listdir(pdf_dir) if f.lower().endswith('.pdf')]
        print(f"PRO_PROCESSOR: Found {len(files)} entities in queue.")

        prompt = """
        You are a PRO-LEVEL technical instructor. Convert these notes into a high-quality interactive module.
        Use Mermaid.js for diagrams where it adds value (flowcharts, sequence).
        Use clean Markdown with H2/H3, bolding, and emojis.
        Structure JSON: {"title", "slug", "description", "tags":[], "content": "MARKDOWN"}
        """

        for f in files:
            path = os.path.join(pdf_dir, f)
            print(f"\n--- INITIATING EXTRACTION: {f} ---")
            text = self.extract_with_layout(path)
            
            # Rate limiting for Free Tier
            print("CALIBRATING NEURAL QUOTA (30s delay)...")
            time.sleep(30)
            
            data = self.call_ai(prompt, text)
            if data and 'slug' in data:
                out_path = os.path.join(output_dir, f"{data['slug']}.json")
                with open(out_path, 'w', encoding='utf-8') as out_f:
                    json.dump(data, out_f, indent=2)
                print(f"ENTITY_STABILIZED: {data['title']} at {out_path}")
            else:
                print(f"CRITICAL_FAILURE: Could not process {f}")

if __name__ == "__main__":
    converter = ProPDFConverter()
    converter.process_all()
