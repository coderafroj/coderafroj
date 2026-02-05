
export const pythonTutorial = {
  id: 'python',
  title: 'Python',
  icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
  description: 'The absolute definitive guide to Python. From basic syntax to Machine Learning, DSA, and Databases.',
  topics: [
    {
      id: 'home',
      title: 'Python Home',
      content: `# Python Super-Masterclass: The Absolute Encyclopedia 🚀

**Swagat hai Coderafroj ke sabse deep Python guide mein.**

Bhai, ye sirf ek tutorial nahi hai, ye ek encyclopedia hai. Ismein humne har ek variable, har ek method, aur har ek internal logic ko itna detail mein likha hai ki iske baad aapko koi kitab padhne ki zaroori nahi padegi. From Basics to Industry-Level Libraries, sab yahan hai.`
    },
    {
      id: 'foundations_group',
      title: '1. Foundations & Architecture 🧱',
      children: [
        {
          id: 'intro',
          title: 'Internal Architecture & PVM',
          content: `# Python Architecture: Under the Hood ⚙️

### ⚙️ Compilation vs Interpretation Logic
Python code 3 steps mein chalta hai:
1. **Source Code (.py):** Hamara likha code.
2. **Bytecode (.pyc):** \`__pycache__\` folder mein save hota hai. Ye ek intermediate low-level language hai jo machine-independent hai.
3. **PVM (Python Virtual Machine):** Ye bytecode ko read karke host processor ke machine cycles mein badalta hai.

### 🧠 CPython vs Others
Python ka default implementation **CPython** hai (C language mein likha gaya). Par iske alaga **Jython** (JVM ke liye) aur **IronPython** (.NET ke liye) bhi hote hain. `
        },
        {
          id: 'variables_memory',
          title: 'Memory Management & GC',
          content: `# Memory Architecture 🧠

### 📦 Reference Counting
Python har object ka ek "Reference Count" track karta hai.
\`\`\`python
import sys
x = [1, 2]
print(sys.getrefcount(x)) # Count check karo
\`\`\`

### ♻️ Garbage Collection (GC)
Jab kisi object ka count 0 ho jata hai, Python use memory se "Cycle Detection" algorithm se saaf kar deta hai.

### 🛡️ Variable Scopes (LEGB Rule)
Variables ka look-up is order mein hota hai:
- **L**ocal (Function ke andar)
- **E**nclosing (Nested functions mein)
- **G**lobal (Module level par)
- **B**uilt-in (Python keywords) `
        }
      ]
    },
    {
      id: 'data_structures_group',
      title: '2. Data Structures (Masterclass) 🧵',
      children: [
        {
          id: 'strings_ultimate',
          title: 'Strings: The Exhaustive Guide',
          content: `# Strings: The Ultimate Guide 🧵

### 🛠️ Exhaustive Method List

| Method | Pro-Level Use |
|---|---|
| \`.encode()\` | ASCII/UTF-8 bytes mein convert karna |
| \`.find()\` vs \`.index()\` | find() -1 deta hai, index() Error fekta hai |
| \`.translate()\` | Multiple map-based replacements ek sath |
| \`.partition()\` | String ko (head, separator, tail) mein todna |
| \`.maketrans()\` | Translation tables banana |

### 🔍 Advanced Patterns (re module)
\`\`\`python
import re
# Pure text se email dhundna
raw = "Contact at support@coderafroj.com today!"
email = re.findall(r'[\w\.-]+@[\w\.-]+', raw)
\`\`\` `
        },
        {
          id: 'collections_deep',
          title: 'Exhaustive Collections (L, T, D, S)',
          content: `# Collections Bible 📋

### 📋 Lists Pro
- **Slicing Depth:** \`L[start:stop:step]\`. \`L[::-1]\` is reverse, \`L[::2]\` is alternate.
- **Sorting Logic:** \`sort(key=len)\` - Length ke basis par sort karna.

### 📖 Dictionary Mastery
- **Ordered Dict:** Python 3.7+ mein dicts memory order save rakhti hain.
- **Merging:** Python 3.9+ mein \`d1 | d2\` use karein dictionaries merge karne ke liye.

### 💎 Set Math
\`\`\`python
A = {1, 2, 3}
B = {3, 4, 5}
print(A ^ B) # Symmetric Difference: {1, 2, 4, 5}
\`\`\` `
        }
      ]
    },
    {
      id: 'professional_group',
      title: '3. Professional Development 🛡️',
      children: [
        {
          id: 'file_system_mastery',
          title: 'File System & Persistence',
          content: `# File System Mastery 📂

Basics se aage, file system ko control karna seekhein.

### 🛠️ shutil (File Operations)
Is module se aap files copy aur move kar sakte ho:
\`\`\`python
import shutil
shutil.copy('source.txt', 'destination.txt')
shutil.make_archive('backup', 'zip', 'project_folder')
\`\`\`

### 📦 pathlib (Modern Path Logic)
OS module se better tarika:
\`\`\`python
from pathlib import Path
p = Path('data') / 'test.txt'
print(p.exists())
print(p.suffix) # .txt
\`\`\`

### 🥒 Serialization (Pickle & JSON)
Objects ko save karna:
- **JSON:** Cross-language compatibility.
- **Pickle:** Pure Python object integrity (Methods bhi save ho jate hain). `
        },
        {
          id: 'exception_mastery',
          title: 'Error Handling Strategy',
          content: `# Advanced Error Management 🛡️

Galti hone par program ko graceful banana.

### 💻 Exception Context
\`\`\`python
try:
    with open('db.txt') as f:
        data = f.read()
except FileNotFoundError as e:
    # Python 3 logic: Chained exceptions
    raise RuntimeError("DB load nahi ho saki") from e
\`\`\`

### 🧠 Assertions
Debugging ke liye: \`assert age > 0, "Age negative kaise?"\` `
        }
      ]
    },
    {
      id: 'industry_tools_group',
      title: '4. Industry Standard Tools 🛠️',
      children: [
        {
          id: 'numpy_pandas',
          title: 'NumPy & Pandas (Data Science)',
          content: `# Data Science Intro 📊

Industry mein Python in do libraries ke bina adhura hai.

### 🔢 NumPy (Numerical Python)
Arrays ke liye sabse fast library.
\`\`\`python
import numpy as np
arr = np.array([1, 2, 3])
print(arr * 2) # Vectorized operation (Fast)
\`\`\`

### 🐼 Pandas (Data Analysis)
Excel sheets aur Data ko handle karne ke liye.
\`\`\`python
import pandas as pd
df = pd.read_csv('data.csv')
print(df.head()) # Pehle 5 rows dikhao
\`\`\` `
        },
        {
          id: 'web_scraping',
          title: 'Web Scraping & APIs',
          content: `# Web & Automation 🌐

### 🕷️ BeautifulSoup
Website se data nikalna:
\`\`\`python
from bs4 import BeautifulSoup
import requests

page = requests.get("https://coderafroj.com")
soup = BeautifulSoup(page.content, 'html.parser')
print(soup.title.text)
\`\`\`

### 🔌 Requests (APIs)
\`\`\`python
response = requests.get("https://api.github.com/users/afroj")
data = response.json()
print(data['bio'])
\`\`\` `
        }
      ]
    },
    {
      id: 'projects_hub',
      title: '5. Python Mega Projects 🚀',
      children: [
        {
          id: 'final_project',
          title: 'Advanced CRM System',
          content: `# The Ultimate CRM Project 🏢

Isme humne Classes, JSON Persistence, Error Handling, aur Logic ko merge kiya hai.

### 💻 Features:
1. **Persistent Storage:** Data \`.json\` file mein save hota hai.
2. **Object Oriented:** Classes handle user logic.
3. **Menu Driven:** Command line interface.

\`\`\`python
# Check out the implementation logic in Professional Python section!
\`\`\` `
        }
      ]
    }
  ]
};
