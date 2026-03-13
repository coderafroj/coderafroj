import os
import requests
from dotenv import load_dotenv

# Manually load environment variables
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

API_KEY = os.getenv("VITE_GEMINI_API_KEY")

if not API_KEY:
    print("API Key not found")
    exit(1)

url = f"https://generativelanguage.googleapis.com/v1beta/models?key={API_KEY}"

try:
    response = requests.get(url)
    if response.status_code == 200:
        models = response.json().get('models', [])
        print("Available Models:")
        for model in models:
            if 'generateContent' in model.get('supportedGenerationMethods', []):
                print(f"- {model['name']}")
    else:
        print(f"Error: {response.status_code} - {response.text}")
except Exception as e:
    print(f"Network error: {e}")
