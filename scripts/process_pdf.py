import os
import sys
import json
import requests
import time
from pypdf import PdfReader
from dotenv import load_dotenv

# Manually load environment variables to avoid dotenv issues
env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
print(f"Loading .env from: {env_path}")

try:
    with open(env_path, 'r', encoding='utf-8-sig') as f:
        print("--- .env Content Start ---")
        for line in f:
            print(f"Read line: {repr(line)}")
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            if '=' in line:
                key, value = line.split('=', 1)
                os.environ[key.strip()] = value.strip().strip('"').strip("'")
                if key.strip() == "VITE_GEMINI_API_KEY":
                    print("Found VITE_GEMINI_API_KEY!")
        print("--- .env Content End ---")
except Exception as e:
    print(f"Error reading .env: {e}")

# Configuration
API_KEY = os.getenv("VITE_GEMINI_API_KEY")

if not API_KEY:
    print("Error: VITE_GEMINI_API_KEY not found in .env file.")
    sys.exit(1)

GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key={API_KEY}"

def extract_text_from_pdf(pdf_path):
    """Extracts text from a PDF file."""
    try:
        reader = PdfReader(pdf_path)
        text = ""
        print(f"Reading {len(reader.pages)} pages...")
        for i, page in enumerate(reader.pages):
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return None

def generate_tutorial_content(text_chunk):
    """Uses Gemini API via HTTP to convert text into a structured tutorial."""
    
    prompt = """
    You are an elite technical content creator and senior developer. 
    Your task is to transform the provided raw technical notes (from a PDF) into a "Pro-Level", highly structured, and beautiful Markdown tutorial.

    **Design Requirements:**
    1.  **Structure**: Use a clear hierarchy (H1, H2, H3).
    2.  **Visuals**: Use emojis, blockquotes, and bold text to make it engaging.
    3.  **Code**: Include relevant code snippets (even if inferred) in correct syntax highlighting.
    4.  **Tone**: Professional, encouraging, and "Hacker/Cyber" aesthetic friendly.
    5.  **Complexity**: Do not oversimplify. Keep the technical depth but make it digestible.

    **Output Format (JSON Only):**
    {
        "title": "Engaging Title",
        "slug": "url-friendly-slug",
        "description": "A compelling summary of what this module covers.",
        "tags": ["TAG1", "TAG2", "TAG3"],
        "content": "# Main Heading ... (Full Markdown functionality)"
    }
    
    Do NOT return markdown code fences for the JSON itself. Just the raw JSON string.
    
    **Input Data:**
    """
    
    # Payload
    payload = {
        "contents": [{
            "parts": [{"text": prompt + text_chunk[:30000]}]  # Limit input context
        }]
    }
    
    headers = {'Content-Type': 'application/json'}
    
    try:
        print("Sending data to Gemini API...")
        response = requests.post(GEMINI_API_URL, headers=headers, json=payload)
        
        if response.status_code != 200:
            print(f"API Error: {response.status_code} - {response.text}")
            return None
            
        result = response.json()
        
        # Extract response text
        try:
            generated_text = result['candidates'][0]['content']['parts'][0]['text']
            # Clean up potential markdown formatting
            generated_text = generated_text.replace('```json', '').replace('```', '').strip()
            return json.loads(generated_text)
        except (KeyError, IndexError, json.JSONDecodeError) as e:
            print(f"Error parsing API response: {e}")
            print(f"Raw response fragment: {str(result)[:500]}")
            return None
            
    except Exception as e:
        print(f"Network error: {e}")
        return None

def main():
    # Directory containing PDFs
    pdf_dir = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'book')
    
    if not os.path.exists(pdf_dir):
        print(f"Error: Directory '{pdf_dir}' not found.")
        sys.exit(1)

    # Get all PDF files
    pdf_files = [f for f in os.listdir(pdf_dir) if f.lower().endswith('.pdf')]
    
    if not pdf_files:
        print(f"No PDF files found in {pdf_dir}")
        sys.exit(1)

    print(f"Found {len(pdf_files)} PDFs to process: {', '.join(pdf_files)}")

    for pdf_file in pdf_files:
        pdf_path = os.path.join(pdf_dir, pdf_file)
        print(f"\n==================================================")
        print(f"Processing: {pdf_file}")
        print(f"==================================================")
        
        raw_text = extract_text_from_pdf(pdf_path)
        
        if not raw_text:
            print(f"Skipping {pdf_file} due to extraction failure.")
            continue

        print(f"Extracted {len(raw_text)} characters from {pdf_file}. Generating content...")
        
        # Rate limit handling (Flash tier is more lenient)
        print("Waiting 20s for API quota reset...")
        time.sleep(20) 
        
        # Process first 15k chars as summary tutorial
        tutorial_data = generate_tutorial_content(raw_text[:15000])
        
        if tutorial_data:
            output_dir = os.path.join("src", "data", "generated_tutorials")
            os.makedirs(output_dir, exist_ok=True)
            
            # Use safe slug or filename
            filename = f"{tutorial_data.get('slug', pdf_file.replace('.pdf', '').lower())}.json"
            output_path = os.path.join(output_dir, filename)
            
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(tutorial_data, f, indent=2)
                
            print(f"SUCCESS! Generated: {output_path}")
            print(f"Title: {tutorial_data.get('title')}")
        else:
            print(f"Failed to generate tutorial for {pdf_file}")
            
    print("\nBatch processing complete.")

if __name__ == "__main__":
    main()
