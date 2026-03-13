
export const pythonMasterclass = {
    id: 'python-masterclass',
    title: 'Python Masterclass',
    description: 'The ultimate Python course. From syntax to Data Science, AI, and Big Data.',
    topics: [
        {
            id: 'python-basics-syntax',
            slug: 'python-basics-syntax',
            title: 'Python Masterclass: Syntax & Fundamentals',
            description: 'Python intro, setup, variables, aur data types ka deep technical overview.',
            tags: ['Python', 'Basics', 'Variables', 'Data Types'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-18'),
            content: `
# Python Masterclass: Segment 1

Python ek **High-level**, **Interpreted**, aur **Dynamic** programming language hai. Iska syntax itna simple hai ki ye english jaisa lagta hai.

### 🌟 Python Philosophy (Zen of Python)
- Simple is better than complex.
- Readability counts.

### 🏗️ Python Internal Flow
Python code kaise run hota hai ?

\`\`\`mermaid
graph LR
    C[Source Code .py] --> B[Bytecode .pyc]
    B --> P[PVM: Python Virtual Machine]
    P --> R[Output]
\`\`\`

---

### 🧱 Variables & Memory Logic
Python mein variables sirf "Labels" hote hain jo objects ki taraf point karte hain.

\`\`\`python
# Dynamic Typing
x = 10      # x is an integer
x = "Afroj" # now x is a string
\`\`\`

**Variables rules in Hinglish:**
- Number se shuru nahi ho sakta.
- Sirf alpha-numeric characters (A-z, 0-9, aur _) allowed hain.
- Case-sensitive (age aur Age alag hain).
            `
        },
        {
            id: 'python-control-flow-loops',
            slug: 'python-control-flow-loops',
            title: 'Python Masterclass: Control Flow & Loops',
            description: 'Logic building with If-Else, Match-Case, aur powerful loops.',
            tags: ['Python', 'Logic', 'Loops', 'Match-Case'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-18'),
            content: `
# Python Control Flow: Decisions & Repetition

Computer ko decisions lena sikhana hi real logic hai.

### 🚦 If...Else Decisions
Python indentation use karta hai (No curly braces \`{}\`!).

\`\`\`python
if age > 18:
    print("Welcome Babu!")
else:
    print("Wait for access.")
\`\`\`

---

### 🔄 Loops: For & While
- **For Loop**: Jab humein pata ho kitni baar repeat karna hai.
- **While Loop**: Jab tak condition true rahe, repeat karte raho.

\`\`\`python
for i in range(5):
    print(f"Transmission {i}")
\`\`\`

---

### 🆕 Match-Case (Python 3.10+)
Ye traditional Switch-Case ka modern version hai.

\`\`\`mermaid
graph TD
    IN[Input Value] --> C{Match Case}
    C --> V1[Case 1]
    C --> V2[Case 2]
    C --> VO[Case _: Default]
\`\`\`

\`\`\`python
status = 404
match status:
    case 200: print("Sync Successful")
    case 404: print("Node Not Found")
    case _: print("General Error")
\`\`\`
            `
        },
        {
            id: 'python-advanced-functions',
            slug: 'python-advanced-functions',
            title: 'Python Masterclass: Functions & Functional Logic',
            description: 'Args/Kwargs, Lambda, Map, Filter, aur powerful iterators.',
            tags: ['Python', 'Functions', 'Lambda', 'Functional Programming'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-18'),
            content: `
# Python Functions: The Logic Blocks

Functions code reusable banane mein madad karte hain.

### 🍱 Args & Kwargs (Flexibility)
Agar aapko nahi pata kitne arguments aayenge:
- \`*args\`: Non-keyword arguments (as tuple).
- \`**kwargs\`: Keyword arguments (as dictionary).

\`\`\`python
def system_log(*args, **kwargs):
    print(f"User: {kwargs.get('user')}")
    for log in args:
        print(f"EVENT: {log}")
\`\`\`

---

### ⚡ Lambda & Functional Tools
Chote, one-liner functions ke liye Lambda use hota hai.

\`\`\`mermaid
graph LR
    L[Lambda Input] --> O[Operation] --> R[Output]
\`\`\`

\`\`\`python
nums = [1, 2, 3, 4]
squares = list(map(lambda x: x**2, nums)) # [1, 4, 9, 16]
\`\`\`
            `
        },
        {
            id: 'python-standard-libraries',
            slug: 'python-standard-libraries',
            title: 'Python Masterclass: Advanced Modules & PIP',
            description: 'RegEx, JSON, Math, aur standard library mastery.',
            tags: ['Python', 'Modules', 'RegEx', 'JSON'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-18'),
            content: `
# Python Standard Library: The Power Tools

Python "Batteries Included" language hai, iska matlab iske paas har kaam ke liye module hai.

### 🔍 RegEx (Search Patterns)
Complex text search ke liye \`re\` module best hai.
\`\`\`python
import re
txt = "Login at 10:30 AM"
res = re.findall(r"\\d+:\\d+", txt) # ['10:30']
\`\`\`

---

### 📦 JSON & API Handling
Web services se data handle karne ke liye.
- \`json.dumps()\`: Python object to JSON string.
- \`json.loads()\`: JSON string to Python object.

---

### 🛠️ PIP: Package Manager
External libraries install karne ke liye.
\`\`\`bash
pip install pandas numpy requests
\`\`\`
            `
        },
        {
            id: 'python-error-handling-files',
            slug: 'python-error-handling-files',
            title: 'Python Masterclass: Error Handling & File I/O',
            description: 'Try-Except sequences, File streaming aur custom exceptions.',
            tags: ['Python', 'Exceptions', 'File I/O', 'Debugging'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-18'),
            content: `
# Robust Python: Handling the Unexpected

Crash recovery ke liye Error Handling zaroori hai.

### 🛡️ Try...Except Block
\`\`\`mermaid
graph TD
    T[Try Block] --> S{Error?}
    S -- Yes --> E[Except Block]
    S -- No --> F[Finally/Else]
\`\`\`

\`\`\`python
try:
    res = 10 / 0
except ZeroDivisionError:
    print("Babu, zero se divide mat karo!")
finally:
    print("Process Complete")
\`\`\`

---

### 📂 File Handling
Files read aur write karne ka pro way:
\`\`\`python
with open("data.txt", "w") as f:
    f.write("System Log: Online")
# 'with' use karne se file automatically close ho jati hai.
\`\`\`
            `
        },
        {
            id: 'python-oop-essentials',
            slug: 'python-oop-essentials',
            title: 'Python Masterclass: OOP Essentials',
            description: 'Classes, Objects, __init__ method aur self parameter logic.',
            tags: ['Python', 'OOP', 'Classes', 'Objects'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-18'),
            content: `
# Object-Oriented Programming (OOP) in Python

OOP real-world entities ko simulate karne mein madad karta hai.

### 🏗️ Class & Object
- **Class**: Blueprint (e.g., Car ka design).
- **Object**: Actual entity (e.g., Wo Red Car).

\`\`\`python
class Coderafroj:
    def __init__(self, role):
        self.role = role # self points to the current object
    
    def greet(self):
        print(f"Welcome {self.role}")

user1 = Coderafroj("Admin")
user1.greet()
\`\`\`

---

### 🧱 The \`__init__\` Method
Ye "Constructor" hota hai jo object bante hi automatically call hota hai.
            `
        },
        {
            id: 'python-advanced-oop',
            slug: 'python-advanced-oop',
            title: 'Python Masterclass: Advanced OOP Patterns',
            description: 'Inheritance, Polymorphism, Encapsulation aur Inner Classes.',
            tags: ['Python', 'OOP', 'Inheritance', 'Advanced'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-18'),
            content: `
# Advanced OOP: The Architecture Pillars

### 🧬 1. Inheritance (Virasat)
Ek class ki properties dusri class mein le jana.
\`\`\`python
class Device:
    def power_on(self): print("On")

class Phone(Device): # Inheriting Device
    def call(self): print("Calling...")
\`\`\`

---

### 🎭 2. Polymorphism (One thing, Many forms)
Alag-alag classes mein same method name hona.

\`\`\`mermaid
graph TD
    A[Animal MakeSound] --> D[Dog: Woof]
    A --> C[Cat: Meow]
\`\`\`

---

### 🔒 3. Encapsulation (Privacy)
Data ko hide karna using underscore (e.g., \`__wallet\`).
            `
        },
        {
            id: 'python-numpy-core',
            slug: 'python-numpy-core',
            title: 'Python Masterclass: NumPy Core (Scientific I)',
            description: 'Arrays, Broadcasting, aur Vectorized Operations NumPy mein.',
            tags: ['Python', 'NumPy', 'Arrays', 'Performance'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-18'),
            content: `
# NumPy: Numerical Python Foundations

NumPy libraries ko arrays handle karne ke liye optimized banati hai using **Vectorized** operations.

### ⚡ Why NumPy?
Standard Python lists slow hoti hain (Homogeneous data nahi hota). NumPy arrays C-language ki speed pe run karte hain.

\`\`\`python
import numpy as np
arr = np.array([1, 2, 3, 4])
arr *= 2 # Vectorized Multiplication: [2, 4, 6, 8]
\`\`\`

---

### 🥪 Broadcasting Logic
Jab alag shape ke arrays par operation karna ho:
\`\`\`mermaid
graph LR
    A[Array 1x3] --> plus[+]
    S[Scalar 1x1] --> plus
    plus --> R[Broadcasted Result]
\`\`\`
            `
        },
        {
            id: 'python-scipy-stats',
            slug: 'python-scipy-stats',
            title: 'Python Masterclass: SciPy & Statistics (Scientific II)',
            description: 'Optimization, integration, aur stats functions using SciPy.',
            tags: ['Python', 'SciPy', 'Science', 'Statistics'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1551288049-bbda38a5f973?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-18'),
            content: `
# SciPy: Scientific Tools for Engineers

SciPy NumPy ke upar build kiya gaya hai for complex scientific computing.

### 🧪 Optimization
\`\`\`python
from scipy.optimize import minimize
# Equation minimize karne ke liye use hota hai.
\`\`\`

---

### 📊 Stats Mastery
Mean, Median, Mode aur Normal Distribution functions:
- \`scipy.stats.norm\`: Bell curve handle karne ke liye.

\`\`\`mermaid
graph TD
    Data --> Mean
    Data --> StdDev[Standard Deviation]
    Data --> Var[Variance]
\`\`\`
            `
        },
        {
            id: 'python-pandas-wrangling',
            slug: 'python-pandas-wrangling',
            title: 'Python Masterclass: Pandas & Data Wrangling',
            description: 'DataFrames, Series, Cleaning aur Data transformation.',
            tags: ['Python', 'Pandas', 'Data Analysis', 'Cleaning'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-18'),
            content: `
# Pandas: The Data Scientist's Swiss Army Knife

Pandas data ko structure karne (DataFrames) mein help karta hai.

### 📊 DataFrames Setup
Ye ek excel sheet ya table jaisa hota hai (Rows aur Columns).

\`\`\`python
import pandas as pd
df = pd.read_csv("data.csv")
print(df.head()) # Top 5 rows dekhne ke liye
\`\`\`

---

### 🧹 Cleaning Logic
Agar data mein empty values hon:
- \`df.dropna()\`: Empty rows hatana.
- \`df.fillna(0)\`: Empty ko 0 se bharna.

\`\`\`mermaid
graph LR
    R[Raw Data] --> P[Pandas] --> C[Cleaned Table]
\`\`\`
            `
        },
        {
            id: 'python-matplotlib-visuals',
            slug: 'python-matplotlib-visuals',
            title: 'Python Masterclass: Matplotlib Foundations',
            description: 'Plotting, subplots, aur custom styling with Matplotlib.',
            tags: ['Python', 'Matplotlib', 'Visuals', 'Charts'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1551288049-bbda38a5f973?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-18'),
            content: `
# Matplotlib: Visualizing Logic

Data ko graphs mein badalna zaroori hai insight pane ke liye.

### 📈 Simple Line Plot
\`\`\`python
import matplotlib.pyplot as plt
plt.plot([1, 2, 3], [10, 20, 30])
plt.xlabel("X-Axis")
plt.ylabel("Y-Value")
plt.show()
\`\`\`

---

### 📐 Subplots Logic
Ek hi window mein multiple graphs dikhana:
\`\`\`python
plt.subplot(1, 2, 1) # 1 row, 2 columns, graph 1
plt.plot(x, y)
\`\`\`

\`\`\`mermaid
graph TD
    D[Data] --> L[Line Plot]
    D --> S[Scatter Plot]
    D --> B[Bar Chart]
\`\`\`
            `
        },
        {
            id: 'python-advanced-visuals',
            slug: 'python-advanced-visuals',
            title: 'Python Masterclass: Advanced Data Visuals',
            description: 'Scatter plots, Histograms, Pie Charts aur 3D visualizations.',
            tags: ['Python', 'Visualization', 'Charts', '3D'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1543286386-713bcd53cfcc?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-18'),
            content: `
# Advanced Visuals: Beyond the Basics

Complex data ko behtar samjhane ke liye advanced charts use hote hain.

### ☄️ Scatter Plots
Point wise correlation dekhne ke liye.
\`\`\`python
plt.scatter(height, weight)
\`\`\`

---

### 🥧 Pie & Histograms
- **Histogram**: Frequency distribution dekhne ke liye (e.g., age groups).
- **Pie**: Part-to-whole comparison.

---

### 🧊 3D Visualization
\`\`\`python
from mpl_toolkits import mplot3d
ax = plt.axes(projection='3d')
ax.plot3D(x, y, z)
\`\`\`

\`\`\`mermaid
graph TD
    V[Vis Type] --> C1[Scatter: Correlation]
    V --> C2[Histogram: Frequency]
    V --> C3[Pie: Allocation]
\`\`\`
            `
        },
        {
            id: 'python-dsa-ds',
            slug: 'python-dsa-ds',
            title: 'Python Masterclass: DSA I (Data Structures)',
            description: 'Stacks, Queues, Linked Lists, aur Hash Tables Python mein.',
            tags: ['Python', 'DSA', 'Stacks', 'Queues'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-18'),
            content: `
# Data Structures: Organizing Efficiency

### 📚 Stacks (LIFO)
Last In First Out.
\`\`\`python
stack = []
stack.append(1) # Push
stack.pop()      # Pop
\`\`\`

---

### ⏳ Queues (FIFO)
First In First Out. Python mein \`collections.deque\` use karna best hai.
\`\`\`python
from collections import deque
q = deque(["User1", "User2"])
q.popleft() # User1 out
\`\`\`

---

### 🔗 Linked Lists
Nodes aur Pointers ka concept.
\`\`\`mermaid
graph LR
    H[Head] --> N1[Node 1] --> N2[Node 2] --> NULL
\`\`\`
            `
        },
        {
            id: 'python-dsa-algorithms',
            slug: 'python-dsa-algorithms',
            title: 'Python Masterclass: DSA II (Sorting & Searching)',
            description: 'Binary Search, Quick Sort, aur Merge Sort algorithms.',
            tags: ['Python', 'DSA', 'Sorting', 'Algorithms'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-18'),
            content: `
# Sorting & Searching: The Speed King

### 🔎 Binary Search
Sorted collection mein data dhundhne ka fastest tarika ($O(\\log n)$).

\`\`\`mermaid
graph TD
    M[Find Mid] --> L{Mid == Target?}
    L -- Yes --> R[Found]
    L -- No --> S{Target < Mid?}
    S -- Yes --> Left[Search Left Half]
    S -- No --> Right[Search Right Half]
\`\`\`

---

### 🌪️ Sorting Algorithms
- **Quick Sort**: Divide and Conquer.
- **Merge Sort**: Stable sort for large data.
            `
        },
        {
            id: 'python-dsa-trees-graphs',
            slug: 'python-dsa-trees-graphs',
            title: 'Python Masterclass: DSA III (Trees & Graphs)',
            description: 'Binary Trees, BST, aur Graph Traversal (BFS/DFS).',
            tags: ['Python', 'DSA', 'Trees', 'Graphs'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1543286386-713bcd53cfcc?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-18'),
            content: `
# Trees & Graphs: Complex Relationships

### 🌳 Binary Search Tree (BST)
Choti values left mein, badi values right mein.

\`\`\`mermaid
graph TD
    10 --> 5
    10 --> 15
    5 --> 2
    5 --> 7
\`\`\`

---

### 🕸️ Graphs
Nodes (Vertices) aur Edges (Connections).
- **BFS**: Level by level search.
- **DFS**: Depth mein search karna.
            `
        },
        {
            id: 'python-databases-mysql',
            slug: 'python-databases-mysql',
            title: 'Python Masterclass: MySQL & Databases',
            description: 'CRUD operations, Joins, aur Table management with Python.',
            tags: ['Python', 'MySQL', 'Database', 'SQL'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-18'),
            content: `
# Relational Databases: Python + MySQL

Structured data ko store karne ke liye SQL best hai.

### 🐬 Connector Setup
\`\`\`python
import mysql.connector
db = mysql.connector.connect(host="localhost", user="root", password="...")
cursor = db.cursor()
\`\`\`

---

### 🔨 CRUD Operations
- **Create**: \`INSERT INTO users ...\`
- **Read**: \`SELECT * FROM users\`
- **Update**: \`UPDATE users SET ...\`
- **Delete**: \`DELETE FROM users ...\`

\`\`\`mermaid
graph LR
    P[Python] --> C[Connector] --> M[MySQL Engine]
    M --> Output
\`\`\`
            `
        },
        {
            id: 'python-databases-nosql',
            slug: 'python-databases-nosql',
            title: 'Python Masterclass: NoSQL & MongoDB',
            description: 'Collections, Queries, aur Scalability with MongoDB.',
            tags: ['Python', 'NoSQL', 'MongoDB', 'Big Data'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-18'),
            content: `
# NoSQL: Handling Unstructured Data

MongoDB documents (JSON style) use karta hai, isliye scaling asaan hai.

### 🍃 PyMongo Usage
\`\`\`python
from pymongo import MongoClient
client = MongoClient("mongodb://localhost:27017")
db = client['Afridb']
collection = db['users']
\`\`\`

---

### 🔍 Querying
\`\`\`python
res = collection.find({"role": "Admin"})
for user in res:
    print(user['name'])
\`\`\`

\`\`\`mermaid
graph TD
    D[Document] --> C[Collection] --> DB[Database]
\`\`\`
            `
        },
        {
            id: 'python-core-foundation',
            slug: 'python-core-foundation',
            title: 'Python Core: The Primitive Layer',
            description: 'Detailed breakdown of int, float, complex, bool, and NoneType. Understanding memory & objects.',
            tags: ['Python', 'Basics', 'Memory', 'Primitives'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-20'),
            content: `
# ⚛️ Python Core: Primitives & Memory

Python mein "Everything is an Object". Chalo iske foundation ko samjhte hain.

---

## 1. Fundamental Data Types
Python automatically detect kar leta hai ki data type kya hai (**Dynamic Typing**), par humein internals pata hona chahiye.

### A. Integers (int)
Bina decimal wale numbers. Python 3 mein integers ki koi fixed size nahi hoti (Arbitrary Precision), ye aapki RAM tak badh sakte hain.
\`\`\`python
a = 10
b = 10**100 # Ye bhi handle ho jayega!
\`\`\`

### B. Floating Point (float)
Decimal wale numbers. Ye IEEE 754 double precision format use karte hain.
\`\`\`python
pi = 3.14159
exp = 2e3 # 2000.0 (Scientific notation)
\`\`\`

### C. Complex Numbers (complex)
Engineering aur math ke liye: \`a + bj\`.
\`\`\`python
c = 3 + 5j
print(c.real) # 3.0
print(c.imag) # 5.0
\`\`\`

### D. Booleans (bool)
Integers ke sub-class hain: \`True\` (1) aur \`False\` (0).

### E. NoneType (None)
Insaan ke paas "Null" hota hai, Python ke paas \`None\`. Iska matlab hai "Void" ya "Kuch nahi".

---

## 2. Objects & Memory Internals
Python mein har value ek object hai jiske paas 3 cheezein hoti hain:
1. **Identity**: Memory address (\`id(x)\`).
2. **Type**: Category (\`type(x)\`).
3. **Value**: Actual data.

\`\`\`python
x = 5
print(id(x))   # Address dikhayega
print(type(x)) # <class 'int'>
\`\`\`

### 🧠 Interning Optimization
Python memory bachane ke liye chote integers (-5 se 256) aur strings ko cache kar leta hai.
\`\`\`python
a = 256
b = 256
print(a is b) # True (Same memory address!)
\`\`\`

---

## 3. Type Conversion (Casting)
- **Implicit**: Python khud karta hai (\`5 + 2.0 -> 7.0\`).
- **Explicit**: Hum batate hain:
  - \`int("10")\` -> 10
  - \`float(10)\` -> 10.0
  - \`str(10)\` -> "10"
  - \`bool(1)\` -> True

### Truthy/Falsy Evaluation
Python mein \`0\`, \`None\`, \`""\` (empty string), aur empty collections \`[]\`, \`{}\`, \`()\` humesha **False** hote hain. Baki sab **True**.
`
        },
        {
            id: 'python-strings-mastery',
            slug: 'python-strings-mastery',
            title: 'Python Strings Masterclass: 80+ Methods',
            description: 'The ultimate guide to Python Strings. Covering creating, slicing, formatting, and every single built-in string method with examples.',
            tags: ['Python', 'Strings', 'Data Types', 'Masterclass'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-20'),
            content: `
# 🐍 Python Strings: The Ultimate Guide

String (Text) Python ka sabse powerful data type hai. Is note mein hum **80+ concepts aur methods** cover karenge. Aaiye mastery shuru karte hain.

---

## 1. Creating Strings (Strings Banana)
String banane ke kai tarike hain:
\`\`\`python
s1 = 'Single Quotes'
s2 = "Double Quotes"
s3 = '''Triple Quotes 
for Multi-line Strings'''
s4 = str(123) # Converting number to string
\`\`\`

## 2. Accessing Characters (Indexing & Slicing)
Python mein strings **Arrays** ki tarah hoti hain.
\`\`\`python
s = "CODERAFROJ"

# Indexing (Position se nikalna)
print(s[0])   # 'C' (First)
print(s[-1])  # 'J' (Last)

# Slicing (Tukde karna) [Start : End : Step]
print(s[0:4])    # 'CODE' (0 se 3 tak)
print(s[5:])     # 'AFROJ' (5 se end tak)
print(s[::-1])   # 'JORFAREDOC' (Reverse String)
\`\`\`

---

## 3. String Methods (The 80+ List)
Har method ka example dekhte hain.

### A. Case Optimization (Case Badalna)
1. **capitalize()**: Pehla letter capital.  
   \`"hello".capitalize()\` -> "Hello"
2. **casefold()**: Advanced lowercase (better than lower() for German etc).  
   \`"ß".casefold()\` -> "ss"
3. **lower()**: Sab chota.  
   \`"HELLO".lower()\` -> "hello"
4. **upper()**: Sab bada.  
   \`"hello".upper()\` -> "HELLO"
5. **swapcase()**: Chota bada, bada chota.  
   \`"HeLLo".swapcase()\` -> "hEllO"
6. **title()**: Har word ka pehla letter capital.  
   \`"hello world".title()\` -> "Hello World"

### B. Search & Find (Dhoondhna)
7. **count(sub)**: Kitni baar aaya?  
   \`"banana".count("a")\` -> 3
8. **find(sub)**: Pehli baar kahan mila? (Index deta hai, nahi mile to -1).  
   \`"hello".find("e")\` -> 1
9. **rfind(sub)**: Right side se dhoondo.
10. **index(sub)**: Same as find, par nahi mile to **Error** deta hai.
11. **rindex(sub)**: Right side se index.
12. **startswith(prefix)**: Kya isse shuru hua? (True/False).  
    \`"India".startswith("In")\` -> True
13. **endswith(suffix)**: Kya ispar khatam hua?  
    \`"India".endswith("ia")\` -> True

### C. Formatting & Alignment (Sajaana)
14. **center(width)**: Beech mein lao.  
    \`"Hi".center(10, "-")\` -> "----Hi----"
15. **ljust(width)**: Left mein rakho.
16. **rjust(width)**: Right mein rakho.
17. **zfill(width)**: Zero se bhar do.  
    \`"42".zfill(5)\` -> "00042"
18. **format()**: Values put karna.  
    \`"Hi {}".format("Afroj")\` -> "Hi Afroj"
19. **format_map()**: Diet se format karna.
20. **expandtabs()**: Tab (\t) ki space set karna.

### D. Validation (Jaanch) - "is" methods
Ye sab **True** ya **False** dete hain.
21. **isalnum()**: Kya sab Alpha-Numeric (A-Z, 0-9) hain?
22. **isalpha()**: Kya sab Alphabet (A-Z) hain? (No space/digits).
23. **isascii()**: Kya sab ASCII characters hain?
24. **isdecimal()**: Kya sirf numbers hain (0-9)?
25. **isdigit()**: Kya digits hain? (Special digits like ² also True).
26. **isnumeric()**: Sabse broad number check (½ is also True).
27. **isidentifier()**: Kya ye valid variable name ban sakta hai?
28. **islower()**: Kya sab lowercase hai?
29. **isupper()**: Kya sab uppercase hai?
30. **isprintable()**: Kya print ho sakta hai? (No escape chars).
31. **isspace()**: Kya sirf whitespace (space, tab, newline) hai?
32. **istitle()**: Kya Title Case hai?

### E. Modification & Cleaning (Safai)
33. **lstrip()**: Left se space hatao.
34. **rstrip()**: Right se space hatao.
35. **strip()**: Dono taraf se space hatao.  
    \`"  hi  ".strip()\` -> "hi"
36. **replace(old, new)**: Badalna.  
    \`"HaHa".replace("a", "o")\` -> "HoHo"
37. **join(iterable)**: Jodna (Bahut important!).  
    \`"-".join(["A", "B", "C"])\` -> "A-B-C"
38. **split(sep)**: Todna (List banata hai).  
    \`"A-B-C".split("-")\` -> ["A", "B", "C"]
39. **rsplit()**: Right se todna.
40. **splitlines()**: Line by line todna.
41. **partition(sep)**: 3 hisson mein todta hai (Left, Sep, Right).
42. **rpartition()**: Right se partition.

### F. Encoding & Decoding
43. **encode()**: String to Bytes.  
    \`"Hi".encode()\` -> b'Hi'
44. **decode()**: Bytes to String (Available on bytes object).

### G. Mapping & Translation
45. **maketrans()**: Translation table banana.
46. **translate()**: Table use karke characters badalna.
    \`\`\`python
    table = str.maketrans("abc", "123")
    "cab".translate(table) # "312"
    \`\`\`

---

## 4. Modern String Formatting (f-strings)
Python 3.6+ mein sabse best tarika:
\`\`\`python
name = "Afroj"
age = 25
print(f"My name is {name} and I am {age} years old.")
# Math bhi kar sakte hain
print(f"Next year I will be {age + 1}.")
\`\`\`

## 5. String Arithmetic
- **Addition (+)**: Concatenation.  
  \`"Code" + "Rafroj"\` -> "CodeRafroj"
- **Multiplication (*)**: Repetition.  
  \`"Yo" * 3\` -> "YoYoYo"

---

## Conclusion
String Python ki jaan hai. In methods ko yaad rakhne ki zaroorat nahi, bas pata hona chahiye ki **kya possible hai**. Jab zaroorat ho, is list ko refer karein!
`
        },
        {
            id: 'python-lists-tuples',
            slug: 'python-lists-tuples',
            title: 'Python Lists & Tuples: Arrays on Steroids',
            description: 'Complete guide to mutable Lists and immutable Tuples. Slicing, methods, and list comprehensions detailed.',
            tags: ['Python', 'Lists', 'Tuples', 'Data Structures'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-20'),
            content: `
# 📜 Python Lists & Tuples

Variables store data, but **Lists** and **Tuples** store *collections* of data.

---

## 1. Python Lists (Mutable Arrays)
List ek ordered collection hai jo change ho sakti hai (**Mutable**).
\`\`\`python
fruits = ["Apple", "Banana", "Cherry", 100, 3.14]
\`\`\`

### List Methods (Yaad Karlo!)
1. **append(item)**: End mein jodna.  
   \`list.append("Mango")\`
2. **extend(iterable)**: Dusri list ko jodna.  
   \`list.extend([1, 2])\`
3. **insert(index, item)**: Beech mein dalna.  
   \`list.insert(1, "Orange")\`
4. **remove(item)**: Value se hatana.  
   \`list.remove("Banana")\`
5. **pop(index)**: Index se hatana (return bhi karta hai).  
   \`item = list.pop()\` (Last item)
6. **clear()**: Sab saaf kar dena.
7. **index(item)**: Dhoondhna.
8. **count(item)**: Ginna.
9. **sort()**: Arrange karna (Ascending).  
   \`list.sort(reverse=True)\` (Descending).
10. **reverse()**: Ulta kar dena.
11. **copy()**: Duplicate banana.

### List Comprehension (Pro Tip ⚡)
Ek line mein list banana.
\`\`\`python
# Normal
sq = []
for x in range(10): sq.append(x**2)

# Comprehension
sq = [x**2 for x in range(10)]
\`\`\`

---

## 2. Python Tuples (Immutable Lists)
Tuple ek baar ban gayi to change nahi ho sakti (**Immutable**). Fast hoti hai.
\`\`\`python
t = (1, 2, 3)
# t[0] = 10  <-- ERROR! Change nahi kar sakte.
\`\`\`

### Tuple Methods
Kyunki change nahi kar sakte, sirf 2 main methods hain:
1. **count(item)**
2. **index(item)**

### Tuple Packing & Unpacking
\`\`\`python
# Packing
my_tuple = 1, 2, "Hi" 

# Unpacking
a, b, c = my_tuple
print(c) # "Hi"
\`\`\`

### Kab Tuple Use Karein?
- Jab data constant rakhna ho (Coordinates, Config).
- Jab dictionary ki key banana ho (List key nahi ban sakti, Tuple ban sakti hai).
- Performance chahiye ho (Tuples are lighter on memory).

### ⚔️ LISTS VS TUPLES (Comparison)

| Feature | List [] | Tuple () |
| :--- | :--- | :--- |
| **Type** | Mutable (Changeable) | Immutable (Fixed) |
| **Speed** | Thoda Slow | Fast ⚡ |
| **Memory** | Zyada Memory | Kam Memory |
| **Syntax** | Square Brackets \`[]\` | Parentheses \`()\` |

`
        },
        {
            id: 'python-dict-sets',
            slug: 'python-dict-sets',
            title: 'Python Dictionaries & Sets: Hash Maps',
            description: 'Key-Value pairs with Dictionaries and unique collections with Sets. Fast lookups and set theory operations.',
            tags: ['Python', 'Dictionaries', 'Sets', 'Hashing'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-20'),
            content: `
# 🗝️ Python Dictionaries & Sets

Yeh dono "Hashing" concept par kaam karte hain. Matlab data dhoondhna super fast hota hai (O(1) Time Complexity).

---

## 1. Dictionaries (Key-Value Pairs)
Real dictionary ki tarah: Word (Key) -> Meaning (Value).
\`\`\`python
user = {
    "name": "Afroj",
    "age": 22,
    "skills": ["Python", "React"]
}
\`\`\`

### Dictionary Methods
1. **get(key)**: Safe access. Agar key nahi mili to Crash nahi hoga, \`None\` milega.  
   \`user.get("salary", 0)\`
2. **keys()**: Saari keys ki list.
3. **values()**: Saari values ki list.
4. **items()**: (Key, Value) tuples ki list (Looping ke liye best).
5. **update(new_dict)**: Merge karna ya update karna.
6. **pop(key)**: Key ko uda dena aur value return karna.
7. **popitem()**: Last inserted item uda dena.
8. **setdefault(key, default)**: Agar key hai to value do, nahi to set kardo.

### Looping Example
\`\`\`python
for k, v in user.items():
    print(f"{k} : {v}")
\`\`\`

---

## 2. Sets (Unique Collection)
Mathemetical Sets. Duplicate values allowed nahi hoti. Order maintain nahi hota.
\`\`\`python
s = {1, 2, 2, 3} 
print(s) # {1, 2, 3} (2 gayab ho gaya)
\`\`\`

### Set Methods (Set Theory)
1. **add(item)**: Item jodna.
2. **remove(item)**: Hatana (Error agar nahi mila).
3. **discard(item)**: Hatana (No Error agar nahi mila - Safe).
4. **pop()**: Random item hatana.

### Mathematical Operations 🧠
\`\`\`python
A = {1, 2, 3}
B = {3, 4, 5}

# Union (Sab kuch) - symbol |
print(A | B) # {1, 2, 3, 4, 5}

# Intersection (Common) - symbol &
print(A & B) # {3}

# Difference (A mein hai par B mein nahi) - symbol -
print(A - B) # {1, 2}

# Symmetric Difference (Jo common nahi hai) - symbol ^
print(A ^ B) # {1, 2, 4, 5}
\`\`\`
`
        },
        {
            id: 'python-bool-arrays',
            slug: 'python-bool-arrays',
            title: 'Python Booleans & Arrays: Logic Essentials',
            description: 'True/False logic, Truthy/Falsy concepts, and the specialized Array module for optimization.',
            tags: ['Python', 'Boolean', 'Arrays', 'Logic'],
            category: 'Python Masterclass',
            image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80',
            createdAt: new Date('2024-01-20'),
            content: `
# ✅ Python Booleans & Arrays

---

## 1. Booleans (True / False)
Computer ki puri duniya in do shabdon par tiki hai: \`True\` (1) aur \`False\` (0).

### Comparison Operators
These specific questions return Booleans:
- \`==\` Equal?
- \`!=\` Not Equal?
- \`>\` Greater?
- \`<\` Less?

### Truthy vs Falsy Values 🧐
Python mein har cheez ya to Sach (True) hai ya Jhooth (False).
**Falsy Values (Jo False maani jati hain):**
1. \`False\` (Khud)
2. \`None\`
3. \`0\` (Zero, 0.0)
4. Empty Collections: \`""\`, \`[]\`, \`()\`, \`{}\`, \`set()\`

**Baki sab Truthy hain!**
\`\`\`python
if []:
    print("Empty list is True") # Print nahi hoga
else:
    print("Empty list is False") # Ye print hoga
\`\`\`

---

## 2. Python Arrays (The efficient cousin)
Python mein hum zyadatar **Lists** use karte hain. Lekin ek specific \`array\` module bhi hai.
**Fark kya hai?**
- **List**: Mixed data store kar sakti hai \`[1, "Hi", 3.5]\`. Heavy memory usage.
- **Array**: Sirf **SAME** data type store karti hai (Jaise C arrays). Low memory usage.

### Usage
\`\`\`python
import array
# 'i' typecode means signed integer
arr = array.array('i', [1, 2, 3, 4]) 

arr.append(5)
print(arr[0])
\`\`\`

**Kab use karein?**
Sirf tab jab aapko millions of numbers store karne hon aur memory bachani ho. 99% time aap **List** hi use karenge ya phir **NumPy Arrays** (Data Science ke liye).
`
        }
    ]
};
