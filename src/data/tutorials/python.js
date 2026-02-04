
export const pythonTutorial = {
  id: 'python',
  title: 'Python',
  icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
  description: 'The absolute definitive guide to Python. From basic syntax to Machine Learning, DSA, and Databases.',
  topics: [
    {
      id: 'home',
      title: 'Python Home',
      content: `# Python Super-Masterclass 🚀

**Swagat hai Coderafroj ke sabse deep Python guide mein.**

Bhai, ye sirf ek tutorial nahi hai, ye ek encyclopedia hai. Ismein humne har ek variable, har ek method, aur har ek internal logic ko itna detail mein likha hai ki iske baad aapko koi kitab padhne ki zaroori nahi padegi. `
    },
    {
      id: 'foundations_group',
      title: '1. Python Foundations 🧱',
      children: [
        {
          id: 'intro',
          title: 'Deep Intro & Architecture',
          content: `# Python Architecture: Under the Hood ⚙️

Python ek **High-Level, Interpreted** language hai. Iska matlab hai ki humein memory ya hardware ki chinta nahi karni padti.

### ⚙️ Compilation vs Interpretation
1. **Source Code (.py):** Aapka likha hua code.
2. **Bytecode (.pyc):** Ye machine code nahi hota, ye platform-independent intermediate code hai.
3. **PVM (Python Virtual Machine):** Ye bytecode ko read karke machine code mein badalta hai.

### 🌟 Features Mastery
- **Platform Independent:** Aap Windows par code likho aur Mac/Linux par bina change kiye chalao.
- **Rich Libraries:** 300,000+ packages available hain PyPI par. 
- **Garbage Collection:** Python automatically un objects ko memory se hata deta hai jo kisi variable ke reference mein nahi hain. `
        },
        {
          id: 'variables_memory',
          title: 'Memory Logic (The Real Deal)',
          content: `# Memory Architecture & Variables 🧠

### 📦 References & Identity
Python mein sab kuch ek **Object** hai.
\`\`\`python
a = [1, 2, 3]
b = a # b ab usi list object ko point kar raha hai
print(id(a) == id(b)) # True
\`\`\`

### 🛡️ Naming Mastery (PEP 8)
- Variable names sirf letters (a-z, A-Z), digits (0-9), aur underscores (\`_\`) se milkar bante hain.
- Pehla character digit nahi ho sakta.
- Underscore se start hone wale names (\`_var\`) aksar "Private" variables ke liye use hote hain. `
        },
        {
          id: 'operators_deep',
          title: 'Operators: The Math Engine',
          content: `# Operators Deep Mastery ➗

### 🧮 Bitwise Operators (Advanced)
Aap numbers ko binary level par bhi manipulate kar sakte ho:
- \`&\` (AND), \`|\` (OR), \`^\` (XOR), \`~\` (NOT)
- \`<<\` (Left Shift), \`>>\` (Right Shift)

### 🧩 Assignment Operators
- \`+=\`, \`-=\`, \`*=\`, \`/=\`, \`//=\`, \`%=\`, \`**=\`, \`&=\`, \`|=\`, \`^=\`, \`>>=\`, \`<<=\` `
        }
      ]
    },
    {
      id: 'data_mastery_group',
      title: '2. Data Mastery (The Core) 🧵',
      children: [
        {
          id: 'strings_exhaustive',
          title: 'Strings: The Exhaustive Guide',
          content: `# Strings: Deep Dive 🧵

String ek **Immutable Sequence** hai. Yani ki ek baar banne ke baad aap uske elements ko change nahi kar sakte.

### 🛠️ Exhaustive Methods Guide

| Method | Description | Example |
|---|---|---|
| \`.capitalize()\` | Pehla character uppercase karega | \`"hi".capitalize()\` -> "Hi" |
| \`.casefold()\` | Pura string lowercase karega (More aggressive than lower) | \`"HELLO".casefold()\` -> "hello" |
| \`.center(width)\` | String ko center mein layega fixed width ke | \`"hi".center(10)\` -> "    hi    " |
| \`.count(val)\` | Check karega value kitni baar aayi | \`"banana".count("a")\` -> 3 |
| \`.encode()\` | Encoded version return karega | \`s.encode("utf-8")\` |
| \`.endswith(val)\` | True agar string us value par khatam ho | \`"file.txt".endswith(".txt")\` -> True |
| \`.find(val)\` | Position dhundhega (warna -1) | \`"abc".find("b")\` -> 1 |
| \`.index(val)\` | Like find, par error fekega agar na mile | \`"abc".index("z")\` -> Exception! |
| \`.isalnum()\` | True agar alphanumeric hai | |
| \`.isalpha()\` | True agar sirf alphabet hai | |
| \`.isdecimal()\` | True agar numbers (0-9) hain | |
| \`.isdigit()\` | Numbers + superscripts etc. | |
| \`.islower()\` | True agar sab small hai | |
| \`.isspace()\` | True agar sirf whitespace hai | |
| \`.isupper()\` | True agar sab capital hai | |
| \`.join(iterable)\` | Elements ko join karega | \`"-".join(["A", "B"])\` -> "A-B" |
| \`.ljust(width)\` | Left justify karega | |
| \`.lower()\` | Sab small karega | |
| \`.lstrip()\` | Left se spaces hatana | |
| \`.replace(old, new)\` | Value badlega | \`"A B".replace("A", "C")\` |
| \`.rfind()\` | Piche se dhundhna | |
| \`.split()\` | String todna (returns list) | \`"a b".split()\` -> ["a", "b"] |
| \`.splitlines()\` | Newline par todna | |
| \`.startswith(val)\` | True agar shuruat wahan se ho | |
| \`.strip()\` | Dono taraf se spaces saaf karna | |
| \`.swapcase()\` | Upper -> Lower, Lower -> Upper | |
| \`.title()\` | Har word ka pehla letter capital | \`"hello world".title()\` -> "Hello World" |
| \`.upper()\` | Sab capital | |
| \`.zfill(width)\` | Zeroes se bhar dena | \`"42".zfill(5)\` -> "00042" |

### 🚀 Formatting Mastery
\`\`\`python
# Modern F-Strings
name = "Afroj"
print(f"User: {name.upper():>10}") # Right align (10 width)

# .format() method
print("Age is {0}, name is {1}".format(25, "Bhai"))
\`\`\` `
        },
        {
          id: 'lists_exhaustive',
          title: 'Lists: Every Single Secret',
          content: `# Lists: Full Encyclopedia 📋

Lists **Mutable Ordered Collections** hain.

### 🛠️ All List Methods

| Method | Definition | Example |
|---|---|---|
| \`.append(x)\` | Add item at the end | \`L.append(4)\` |
| \`.clear()\` | Remove all elements | \`L.clear()\` |
| \`.copy()\` | Returns a shallow copy | \`L2 = L.copy()\` |
| \`.count(x)\` | Kitni baar x aaya hai | \`L.count(1)\` |
| \`.extend(iterable)\` | End mein multiple items add karna | \`L.extend([5, 6])\` |
| \`.index(x)\` | First occurrence ka index | \`L.index(3)\` |
| \`.insert(i, x)\` | Specific index i par x daalna | \`L.insert(1, 'val')\` |
| \`.pop(i)\` | Element nikalna index i se (default last) | \`val = L.pop()\` |
| \`.remove(x)\` | First occurrence of x delete karna | \`L.remove(2)\` |
| \`.reverse()\` | Permanent reverse | \`L.reverse()\` |
| \`.sort()\` | Permanent sorting | \`L.sort(reverse=True)\` |

### 🧠 Nested Lists & Matrices
\`\`\`python
matrix = [[1, 2], [3, 4]]
print(matrix[0][1]) # Output: 2
\`\`\` `
        },
        {
          id: 'tuples_pro',
          title: 'Tuples: Speed & Integrity',
          content: `# Tuples: Deep Mastery 🔒

Tuples comma-separated values hain jo immutable hain.

### 🍱 Unpacking & Padding
\`\`\`python
t = (1, 2, 3, 4, 5)
a, *b, c = t 
print(a) # 1
print(b) # [2, 3, 4] (Middle elements in list)
print(c) # 5
\`\`\`

### 🗺️ Built-in Methods
Tuples ke paas sirf do methods hote hain kyunki wo change nahi ho sakte:
1. \`.count()\`
2. \`.index()\` `
        },
        {
          id: 'dict_exhaustive',
          title: 'Dictionaries: Hash Table Magic',
          content: `# Dictionaries: Exhaustive Guide 📖

### 🛠️ Dictionary Methods (All)

| Method | Explanation |
|---|---|
| \`.clear()\` | Pura khali kardena |
| \`.copy()\` | Copy banana |
| \`.fromkeys(seq, val)\` | Nayi dict banana specific keys aur value ke sath |
| \`.get(key, default)\` | Safely value nikalna (error nahi aayega agar key na ho) |
| \`.items()\` | List of tuples (key, val) return karega |
| \`.keys()\` | Sari keys dega |
| \`.pop(key)\` | Specific key nikalna |
| \`.popitem()\` | Last inserted item nikalna |
| \`.setdefault(key, val)\` | Agar key na ho toh set kar dena |
| \`.update(dict2)\` | Merge karna dusri dict ko |
| \`.values()\` | Sari values dega |

### ⚡ Performance Hint
Hashing ki wajah se dictionary mein data search karna constant time \`O(1)\` mein hota hai, chahe dict kitni bhi badi ho! `
        },
        {
          id: 'sets_exhaustive',
          title: 'Sets: The Math Hub',
          content: `# Sets Mastery 💎

Sets unordered, unique collections hain.

### 🛠️ Every Set Method
| Method | Description |
|---|---|
| \`.add(x)\` | Item daalna |
| \`.clear()\` | Safayi |
| \`.difference(set2)\` | A - B |
| \`.discard(x)\` | Remove item (na ho toh error nahi dega) |
| \`.intersection(set2)\` | Common items |
| \`.isdisjoint(set2)\` | True agar kuch common nahi hai |
| \`.issubset(set2)\` | True agar A, B ke andar hai |
| \`.pop()\` | Random item nikalna |
| \`.symmetric_difference()\` | Jo common nahi hain wo nikalna |
| \`.union(set2)\` | Sab milakar | `
        }
      ]
    },
    {
      id: 'logic_control_group',
      title: '3. Logic & Algorithms 🌀',
      children: [
        {
          id: 'conditionals_logic',
          title: 'Conditionals & Short Circuit',
          content: `# Conditions & Logic 🌀

### ⚡ Short Circuit Logic
\`if A or B:\` - Agar A true hai, toh B check bhi nahi hoga. 
\`if A and B:\` - Agar A false hai, toh B check bhi nahi hoga.

### 🎭 Ternary Operator
\`\`\`python
status = "Allowed" if age > 18 else "Wait"
\`\`\` `
        },
        {
          id: 'loops_deep',
          title: 'Loops, Range & Enumerate',
          content: `# Deep Iteration 🔄

### 📍 Enumerate
Aap index aur value dono ek sath loop mein use kar sakte ho:
\`\`\`python
for i, name in enumerate(["A", "B"]):
    print(f"Index {i} is {name}")
\`\`\`

### 🎡 While-Else & For-Else
Python mein loops ke peeche \`else\` lag sakta hai! Ye tab chalta hai jab loop bina \`break\` hue finish ho jaye. `
        },
        {
          id: 'recursion_algorithms',
          title: 'Recursion & Call Stack',
          content: `# Recursion Depth 🌀

Recursion ek powerful tool hai par khatarnak bhi.
- **Stack:** Har call memory ke stack mein save hoti hai.
- **Limit:** Python ki default recursion limit 1000 hoti hai. \`sys.setrecursionlimit()\` se aap badha sakte ho. `
        }
      ]
    },
    {
      id: 'professional_python',
      title: '4. Professional & Advanced 🛡️',
      children: [
        {
          id: 'file_handling_exhaustive',
          title: 'File Handling: Beyond Basics',
          content: `# File I/O Mastery 📂

Data ko permanent save karne ke liye File Handling zaroori hai.

### 🔑 Modes Guide
| Mode | Action |
|---|---|
| \`'r'\` | Read (Default). Error agar file na ho. |
| \`'w'\` | Write. File ko overwrite karke pura saaf kardega. |
| \`'a'\` | Append. End mein data likhega. |
| \`'x'\` | Create. Error dega agar file pehle se ho. |
| \`'b'\` | Binary mode (Images/Videos ke liye). |
| \`'+'\` | Updating (Read + Write). |

### 🛠️ Advanced File Methods
- \`.read(n)\`: \`n\` characters tak read karna.
- \`.readline()\`: Ek single line read karna.
- \`.readlines()\`: Sari lines list mein read karna.
- \`.tell()\`: Current cursor position batayega.
- \`.seek(offset)\`: Cursor ko specific position par bhejega.
- \`.flush()\`: Buffer saaf karke Turant file mein save karna.

### 🛡️ Best Practice: Context Manager
\`\`\`python
with open('file.txt', 'r') as f:
    data = f.read()
# f.close() karne ki chinta nahi, ye auto ho jata hai!
\`\`\` `
        },
        {
          id: 'exception_handling_deep',
          title: 'Exception Handling Deep Dive',
          content: `# Exception Handling mastery 🛡️

Programming mein galtiyan handle karna hi ek achhe developer ki pehchan hai.

### 💻 Exhaustive Syntax
\`\`\`python
try:
    # Danger zone
except ValueError:
    # Specific handle
except (ZeroDivisionError, KeyError) as e:
    # Multiple handle
else:
    # Chalta hai agar galti NA ho
finally:
    # Hamesha chalta hai (Clean-up)
\`\`\`

### 🆕 Raising Exceptions
Aap khud error fek sakte ho:
\`\`\`python
if age < 0:
    raise ValueError("Age ghatiya nahi ho sakti!")
\`\`\` `
        },
        {
          id: 'oop_mastery',
          title: 'OOP: The Design Patterns',
          content: `# OOP Gold Mine 🏗️

### 🧬 Inheritance & MRO
**MRO (Method Resolution Order):** Python \`C3 Linearization\` algorithm use karta hai ye decide karne ke liye ki konsa method pehle call hoga multi-inheritance mein.

### 🪄 Magic Methods (Dunder)
| Method | Triggered by |
|---|---|
| \`__init__\` | Object creation |
| \`__str__\` | print() |
| \`__len__\` | len() |
| \`__add__\` | \`+\` operator |
| \`__getitem__\` | \`obj[key]\` | `
        }
      ]
    },
    {
      id: 'projects_group',
      title: '5. Python Mega Projects 🚀',
      children: [
        {
          id: 'project_1',
          title: 'Project 1: Management System',
          content: `# Advanced User Management 🏢

Is project mein humne try-except, file handling aur logic ko merge kiya hai.

### 💻 Code Logic:
\`\`\`python
import os

FILE = "users.db"

def save_user(name, age):
    try:
        with open(FILE, "a") as f:
            f.write(f"{name}:{age}\\n")
    except Exception as e:
        print(f"Error: {e}")

def load_users():
    if not os.path.exists(FILE): return []
    with open(FILE, "r") as f:
        return [line.strip().split(":") for line in f]

# Main interaction loop...
\`\`\` `
        }
      ]
    }
  ]
};
