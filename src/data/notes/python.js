export const python = [
    {
        id: 'python-way-of-program',
        slug: 'python-way-of-program',
        title: 'Masterclass 1: The Way of the Program',
        description: 'Programming kya hai? Debugging, Formal vs Natural language, aur Python ka pehla safar.',
        tags: ['Python', 'Basics', 'Debugging', 'Logic'],
        category: 'Python Masterclass',
        image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-02-04'),
        content: `
# Masterclass 1: The Way of the Program 🛣️

Programming seekhna sirf code likhna nahi, balki **problem-solving** seekhna hai. Ek computer scientist ki tarah sochna hi "The Way of the Program" hai.

### 🧠 Programming Kya Hai?
Program ek sequence of instructions hai jo batata hai ki computational kaam kaise karna hai. Ye math jaisa ho sakta hai ya symbolic processing jaisa.

**Core Components of a Program:**
1. **Input**: Keyboard, file, ya sensor se data lena.
2. **Output**: Screen pe dikhana ya file mein save karna.
3. **Math**: Basic addition se lekar complex algorithms tak.
4. **Conditional Execution**: "Agar ye ho, toh wo karo" wala logic.
5. **Repetition**: Kisi kaam ko baar-baar karte rehna.

---

### 🪲 Debugging: Galtiyon se Seekhna
Code mein galtiyan hona normal hai. In galtiyon ko "Bugs" kehte hain aur inko theek karne ko "Debugging".

**Bugs ke Types:**
- **Syntax Errors**: Python ke grammar rules todna.
- **Runtime Errors**: Run hote waqt fat jana.
- **Semantic Errors**: Program run toh hota hai par output galat deta hai.

---

### 🗣️ Languages: Formal vs Natural
- **Natural Languages**: Jo hum bolte hain (Hindi, English). Inmein ambiguity hoti hai.
- **Formal Languages**: Jo scientists design karte hain (Math logic, Programming languages). Ye ek dam precise hoti hain.
`
    },
    {
        id: 'python-variables-expressions',
        slug: 'python-variables-expressions',
        title: 'Masterclass 2: Variables & Statements',
        description: 'Memory architecture, Reserved words, aur Operators ka deep logic.',
        tags: ['Python', 'Memory', 'Operators', 'Expressions'],
        category: 'Python Masterclass',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-02-04'),
        content: `
# Masterclass 2: Variables & Statements 🧱

Is segment mein hum dekhenge ki Python memory ke saath kaise khelta hai.

### 📦 Assignment Statements
Jab hum \`message = "Hello"\` likhte hain, toh hum ek "State" create kar rahe hain. 

### 🚫 Reserved Words (Keywords)
Python ke paas kuch reserved words hain jo aap variable name ki tarah use nahi kar sakte.
(e.g., \`False\`, \`class\`, \`finally\`, \`is\`, \`return\`, etc.)

---

### ➗ Expressions aur Operators
- **Expression**: Values, variables, aur operators ka combination.
- **Statement**: Ek unit of code jiska koi effect hota hai (jaise print ya assignment).

**PEMDAS (Order of Operations):**
1. **P**-arentheses \`()\`
2. **E**-xponentiation \`**\`
3. **M**-ultiplication \`*\` aur **D**-ivision \`/\`
4. **A**-ddition \`+\` aur **S**-ubtraction \`-\`

### 🧩 String Operations
Aap Strings ke saath math ke '+' aur '*' use kar sakte ho!
\`\`\`python
first = 'throat'
second = 'warbler'
print(first + second) # throatwarbler (Concatenation)
print('Spam' * 3)      # SpamSpamSpam (Repetition)
\`\`\`
`
    },
    {
        id: 'python-functions-deep',
        slug: 'python-functions-deep',
        title: 'Masterclass 3: Functions & Flow of Execution',
        description: 'Function calls, Arguments, Parameters, aur Stack Diagrams ki logic.',
        tags: ['Python', 'Functions', 'Stack', 'Arguments'],
        category: 'Python Masterclass',
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-02-04'),
        content: `
# Masterclass 3: Functions 🍱

Functions code ko organize aur reusable banane ka best tarika hain.

### 📞 Function Calls
Jaise \`type(32)\` ek function call hai jo argument \`32\` leta hai aur result return karta hai.

### ➕ Math Functions
Python mein \`math\` module bahut powerful hai:
\`\`\`python
import math
radians = 0.7
height = math.sin(radians)
\`\`\`

---

### 🏗️ Flow of Execution
Computer hamesha line 1 se start karta hai par jab function call aata hai toh control function ke andar jump kar jata hai.

### 📋 Parameters aur Arguments
- **Argument**: Jo value hum function ko bhejte hain.
- **Parameter**: Wo variable jo function ke andar us value ko pakadta hai.

### 📚 Stack Diagrams
Memory ko Visualize karne ke liye stack diagrams use hote hain. Har function ek "Frame" banata hai. Frame mein local variables hote hain.
`
    },
    {
        id: 'python-turtle-interface',
        slug: 'python-turtle-interface',
        title: 'Masterclass 4: Case Study: Interface Design',
        description: 'Turtle graphics ke saath encapsulation, generalization, aur refactoring seekhein.',
        tags: ['Python', 'Turtle', 'Encapsulation', 'Refactoring'],
        category: 'Python Masterclass',
        image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-02-04'),
        content: `
# Masterclass 4: Turtle Graphics 🐢

Chalo kuch shapes draw karte hain aur programming ke patterns seekhte hain.

### 🎨 Turtle Module
\`\`\`python
import turtle
bob = turtle.Turtle()
bob.fd(100) # Forward 100
bob.lt(90)  # Left 90
\`\`\`

---

### 📦 Encapsulation
Related code ko function mein wrap karna:
\`\`\`python
def square(t):
    for i in range(4):
        t.fd(100)
        t.lt(90)
\`\`\`

### 🌍 Generalization
Function ko flexibility dena parameters add karke:
\`\`\`python
def polygon(t, n, length):
    angle = 360 / n
    for i in range(n):
        t.fd(length)
        t.lt(angle)
\`\`\`

### 🛠️ Refactoring
Code ko rearrange karna takki redundant code khatam ho jaye aur readability badh jaye.
`
    },
    {
        id: 'python-conditionals-recursion',
        slug: 'python-conditionals-recursion',
        title: 'Masterclass 5: Conditionals & Recursion',
        description: 'Boolean expressions, Logical operators, aur Recursion ka magic.',
        tags: ['Python', 'Logic', 'Recursion', 'Conditionals'],
        category: 'Python Masterclass',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-02-04'),
        content: `
# Masterclass 5: Conditionals & Recursion 🌀

Logic building ka asli khel yahan shuru hota hai.

### ➗ Floor Division aur Modulus
- \`//\`: Point ke baad wali values hata deta hai.
- \`%\`: Remainder deta hai.

### ✅ Boolean Expressions
Ek aisi expression jo ya toh \`True\` hogi ya \`False\`.
Operators: \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`.

---

### 🌀 Recursion (Khud ko Call Karna)
Jab ek function khud ko hi call kare, usse Recursion kehte hain.

\`\`\`python
def countdown(n):
    if n <= 0:
        print('Blastoff!')
    else:
        print(n)
        countdown(n-1) # Recursive call
\`\`\`

**Base Case:** Wo condition jahan recursion rukta hai (\`n <= 0\`). Agar base case nahi hoga toh code infinite loop mein ja kar crash (Stack Overflow) ho jayega.

### ⌨️ Keyboard Input
User se input lene ke liye:
\`\`\`python
name = input('Aapka naam kya hai? ')
\`\`\`
`
    },
    {
        id: 'python-fruitful-functions',
        slug: 'python-fruitful-functions',
        title: 'Masterclass 6: Fruitful Functions',
        description: 'Return values, Incremental development, aur Boolean functions ki logic.',
        tags: ['Python', 'Functions', 'Logic', 'Development'],
        category: 'Python Masterclass',
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-02-04'),
        content: `
# Masterclass 6: Fruitful Functions 🍎

Ab tak humne jo functions dekhe wo "Void" the (kuch return nahi karte the). Ab hum seekhenge **Fruitful Functions** jo value wapas dete hain.

### 🔙 Return Values
\`return\` keyword ka use function se result nikalne ke liye hota hai.
\`\`\`python
import math
def area(radius):
    return math.pi * radius**2
\`\`\`

---

### 🛠️ Incremental Development
Bade programs likhte waqt ek saath sara code mat likho.
1. Chote se shuru karo.
2. Har step pe print karke check karo.
3. Jab wo chalne lage, tab agla part likho.

### 🎭 Dead Code
Aisa code jo \`return\` statement ke baad likha ho aur kabhi run na ho sake.

### 🌈 Composition
Ek function ke andar dusre function ko call karna.
\`\`\`python
def circle_area(xc, yc, xp, yp):
    return area(distance(xc, yc, xp, yp))
\`\`\`

### ✅ Boolean Functions
Wo functions jo sirf \`True\` ya \`False\` return karte hain. Inka naam aksar \`is_\` se shuru hota hai (e.g., \`is_divisible\`).
`
    },
    {
        id: 'python-iteration-mastery',
        slug: 'python-iteration-mastery',
        title: 'Masterclass 7: Iteration & Algorithms',
        description: 'While loops, Reassignment, aur Newton\'s method for square roots.',
        tags: ['Python', 'Loops', 'Algorithms', 'Math'],
        category: 'Python Masterclass',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-02-04'),
        content: `
# Masterclass 7: Iteration 🔄

Computers repetitive kaam karne mein mahir hote hain.

### 🔄 Multiple Assignment
Aap ek variable ko baar-baar nayi value de sakte ho.
\`\`\`python
x = 5
print(x)
x = 7
print(x)
\`\`\`
**Note:** \`x = y\` aur \`y = x\` alag hain. Mathematics mein \`=\` equality dikhata hai, Python mein ye **Assignment** hai.

---

### 🎡 While Loop
Jab tak condition true rahegi, loop chalta rahega.
\`\`\`python
def countdown(n):
    while n > 0:
        print(n)
        n = n - 1
    print('Blastoff!')
\`\`\`

### 🛑 Break Statement
Loop ko beech mein hi rokne ke liye:
\`\`\`python
while True:
    line = input('> ')
    if line == 'done':
        break
    print(line)
\`\`\`

### 🧮 Newton's Method (Square Root)
Loop ka use karke square root nikalne ka tareeka:
\`\`\`python
# Square root of a
while True:
    print(y)
    x = (y + a/y) / 2
    if x == y:
        break
    y = x
\`\`\`
`
    },
    {
        id: 'python-strings-traversal',
        slug: 'python-strings-traversal',
        title: 'Masterclass 8: Strings - A Deeper Look',
        description: 'Traversal, Slices, Immutability, aur Search methods.',
        tags: ['Python', 'Strings', 'Sequence', 'Methods'],
        category: 'Python Masterclass',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-02-04'),
        content: `
# Masterclass 8: Strings Deeper 🧵

Strings sirf text nahi, characters ka **Sequence** hain.

### 🚶 Traversal (Looping through strings)
\`\`\`python
index = 0
while index < len(fruit):
    letter = fruit[index]
    print(letter)
    index = index + 1
\`\`\`
Ya phir simple:
\`\`\`python
for char in fruit:
    print(char)
\`\`\`

---

### 🍰 String Slices
\`[start:end]\` pattern. End include nahi hota!
\`\`\`python
s = 'Monty Python'
print(s[0:5]) # 'Monty'
print(s[6:12]) # 'Python'
\`\`\`

### 🔒 Strings are Immutable
Yaani aap \`s[0] = 'A'\` nahi kar sakte. Aapko naya string banana padega.

### 🔍 Searching Pattern
Aisa function jo character ka index dhundhe:
\`\`\`python
def find(word, letter):
    index = 0
    while index < len(word):
        if word[index] == letter:
            return index
        index = index + 1
    return -1
\`\`\`
`
    },
    {
        id: 'python-word-play-case',
        slug: 'python-word-play-case',
        title: 'Masterclass 9: Case Study: Word Play',
        description: 'File reading, String logic, aur Computational thinking practice.',
        tags: ['Python', 'Strings', 'Logic', 'Case Study'],
        category: 'Python Masterclass',
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-02-04'),
        content: `
# Masterclass 9: Word Play Case Study 📖

Chalo real data ke saath khelte hain. Python file reading ko bahut aasaan bana deta hai.

### 📂 Reading Word Lists
Maan lo hamare paas \`words.txt\` file hai.
\`\`\`python
fin = open('words.txt')
for line in fin:
    word = line.strip()
    print(word)
\`\`\`

---

### 🧩 Challenges:
1. **No 'e'**: Wo words print karo jinmein 'e' nahi hai.
2. **Avoids**: Ek word aur forbidden characters le kar check karo.

**Logic for "Has No E":**
\`\`\`python
def has_no_e(word):
    for letter in word:
        if letter == 'e':
            return False
    return True
\`\`\`
`
    },
    {
        id: 'python-lists-sequences',
        slug: 'python-lists-sequences',
        title: 'Masterclass 10: Lists - The Mutable Sequence',
        description: 'List operations, Slicing, Methods, aur Map/Filter/Reduce logic.',
        tags: ['Python', 'Lists', 'Mutability', 'Algorithms'],
        category: 'Python Masterclass',
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-02-04'),
        content: `
# Masterclass 10: Lists Mastery 📋

Lists sequences hain, par strings ke opposite ye **Mutable** (changable) hain.

### 🧱 List elements
List ke andar elements kisi bhi type ke ho sakte hain, yahan tak ki dusri lists (Nested Lists) bhi.
\`\`\`python
cheeses = ['Cheddar', 'Edam', 'Gouda']
numbers = [17, 123]
empty = []
\`\`\`

---

### ✏️ Mutability
\`\`\`python
numbers[1] = 5
print(numbers) # [17, 5]
\`\`\`

### 🛠️ List Methods
- \`t.append('x')\`: End mein add karo.
- \`t.extend(['a', 'b'])\`: Dusri list join karo.
- \`t.sort()\`: Order mein lagao.

### 🔀 Map, Filter, and Reduce
- **Map**: Saare words ko uppercase karna.
- **Filter**: Sirf kuch specific items rakhna.
`
    },
    {
        id: 'python-dictionaries-mastery',
        slug: 'python-dictionaries-mastery',
        title: 'Masterclass 11: Dictionaries - The Key-Value Map',
        description: 'Dictionaries as mapping, Counter logic, aur Dictionaries vs Lists.',
        tags: ['Python', 'Dictionaries', 'Mapping', 'Counter'],
        category: 'Python Masterclass',
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-02-04'),
        content: `
# Masterclass 11: Dictionaries Deep 📖

Dictionary ek ultra-fast data structure hai jo Mapping ke liye use hoti hai.

### 🗺️ Dictionary as a Mapping
Yahan aap Index ki jagah **Key** use karte ho.
\`\`\`python
eng2sp = {'one': 'uno', 'two': 'dos', 'three': 'tres'}
print(eng2sp['one']) # 'uno'
\`\`\`

---

### 🧮 Dictionary as a Collection of Counters
Maan lo aapko characters count karne hain:
\`\`\`python
def histogram(s):
    d = dict()
    for c in s:
        if c not in d:
            d[c] = 1
        else:
            d[c] += 1
    return d
\`\`\`

### 🔍 Looping and Dictionaries
\`\`\`python
for key in d:
    print(key, d[key])
\`\`\`

### ⚡ Reverse Lookup
Key se value nikalna aasaan hai, par value se key nikalna slow hota hai.

### 🧠 Memos
Recursion ko fast karne ke liye values ko dictionary mein save rakhna.
`
    },
    {
        id: 'python-tuples-mastery',
        slug: 'python-tuples-mastery',
        title: 'Masterclass 12: Tuples - The Immutable Sequence',
        description: 'Tuples as sequences, Unpacking, aur Tuples as Keys.',
        tags: ['Python', 'Tuples', 'Mutability', 'Unpacking'],
        category: 'Python Masterclass',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-02-04'),
        content: `
# Masterclass 12: Tuples Mastery 🔒

Tuples comma-separated values hain. Ye Lists jaise hain par **Immutable** hain.

### 🧱 Creating Tuples
\`\`\`python
t = ('a', 'b', 'c', 'd', 'e')
t1 = 'a', # Single element tuple ke liye comma zaroori hai!
\`\`\`

---

### 📦 Tuple Assignment (Unpacking)
Ek line mein variables swap karne ka pro tarika:
\`\`\`python
a, b = b, a
\`\`\`

### 🍱 Variable-length Argument Tuples (\*args)
Jab aapko nahi pata kitne parameters aayenge:
\`\`\`python
def printall(*args):
    print(args)
\`\`\`

### 🗺️ Dictionaries and Tuples
Tuples ko aap Dictionary keys ki tarah use kar sakte ho.
`
    },
    {
        id: 'python-data-structures-case',
        slug: 'python-data-structures-case',
        title: 'Masterclass 13: Case Study: Data Structure Selection',
        description: 'Word frequency analysis, Random numbers, aur sahi data structure kaise chune.',
        tags: ['Python', 'Analysis', 'Logic', 'Case Study'],
        category: 'Python Masterclass',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-02-04'),
        content: `
# Masterclass 13: Data Structure Selection Case Study 🏗️

Sahi tool chunna hi ek achhe programmer ki pehchaan hai.

### 📊 Word Frequency Analysis
Book ke saare words padhna aur unhe count karna.

### 🎲 Random Numbers
\`random\` module ka use karke random values pick karna:
\`\`\`python
import random
t = ['a', 'b', 'c']
print(random.choice(t))
\`\`\`

---

### 🛠️ Common Patterns:
- **Lists**: Jab order zaroori ho.
- **Dictionaries**: Jab fast mapping zaroori ho.
- **Tuples**: Jab data immutable rakhna ho.
`
    },
    {
        id: 'python-persistence-files',
        slug: 'python-persistence-files',
        title: 'Masterclass 14: Files - Persistence',
        description: 'Writing files, Format operators, Directories, aur Shelve/Pickle modules.',
        tags: ['Python', 'Files', 'OS', 'Persistence'],
        category: 'Python Masterclass',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-02-04'),
        content: `
# Masterclass 14: Files & Persistence 📂

Program band hone ke baad bhi data save rakhne ko **Persistence** kehte hain.

### ✍️ Writing Files
\`\`\`python
fout = open('output.txt', 'w')
fout.write("Hello World\\n")
fout.close()
\`\`\`

---

### 📁 Filenames and Paths
\`os\` module ka use karke directories aur paths manage karna.

### 🥒 Pickling
Complex objects ko file mein save karne ke liye \`pickle\` module best hai.
`
    },
    {
        id: 'python-classes-objects',
        slug: 'python-classes-objects',
        title: 'Masterclass 15: Classes & Objects',
        description: 'User-defined types, Attributes, aur Deep Copy logic.',
        tags: ['Python', 'OOP', 'Classes', 'Memory'],
        category: 'Python Masterclass',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-02-04'),
        content: `
# Masterclass 15: Classes & Objects 🏗️

Object-Oriented Programming (OOP) ka pehla kadam.

### 🆕 User-defined Types
\`class\` keyword se hum naye data types bana sakte hain.
\`\`\`python
class Point:
    """Represents a point in 2-D space."""
\`\`\`

---

### 🏷️ Attributes
Object ke andar data store karna dot notation se.

### 📋 Deep Copy vs Shallow Copy
- **Shallow Copy**: Sirf top-level object copy.
- **Deep Copy**: Saare nested objects bhi copy.
`
    },
    {
        id: 'python-classes-functions',
        slug: 'python-classes-functions',
        title: 'Masterclass 16: Classes & Functions',
        description: 'Pure functions, Modifiers, aur Prototyping vs Planning logic.',
        tags: ['Python', 'OOP', 'Functions', 'Logic'],
        category: 'Python Masterclass',
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-02-04'),
        content: `
# Masterclass 16: Classes & Functions 🛠️

Hum user-defined types ko functions ke saath kaise use karte hain, chalo dekhte hain.

### 🍎 Pure Functions
Wo function jo sirf input leta hai aur output deta hai, bina objects ko modify kiye.
\`\`\`python
def add_time(t1, t2):
    sum = Time()
    sum.hour = t1.hour + t2.hour
    sum.minute = t1.minute + t2.minute
    sum.second = t1.second + t2.second
    return sum
\`\`\`

---

### 🔧 Modifiers
Wo functions jo un objects ko modify karte hain jo unhe as arguments mile hain.
\`\`\`python
def increment(time, seconds):
    time.second += seconds
    if time.second >= 60:
        time.second -= 60
        time.minute += 1
\`\`\`

### 💡 Prototyping vs Planning
- **Prototyping**: Pehle jaldi se code likho, phir use theek karo.
- **Planning**: Pehle problem samjho, phir design karo. Planning aksar behtar hoti hai.
`
    },
    {
        id: 'python-classes-methods',
        slug: 'python-classes-methods',
        title: 'Masterclass 17: Classes & Methods',
        description: 'Magic methods, Init, Str, aur Operator Overloading.',
        tags: ['Python', 'OOP', 'Methods', 'Special Methods'],
        category: 'Python Masterclass',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-02-04'),
        content: `
# Masterclass 17: Classes & Methods 🪄

Ab hum logic ko class ke *andar* layenge.

### 🏗️ The __init__ Method
Ye constructor hai jo tab call hota hai jab object banta hai.
\`\`\`python
class Time:
    def __init__(self, hour=0, minute=0, second=0):
        self.hour = hour
        self.minute = minute
        self.second = second
\`\`\`

---

### 📝 The __str__ Method
Jab hum object ko \`print()\` karte hain, tab ye method call hota hai.
\`\`\`python
def __str__(self):
    return '%.2d:%.2d:%.2d' % (self.hour, self.minute, self.second)
\`\`\`

### ➕ Operator Overloading
Aap \`+\`, \`-\` jaise operators ka behavior apni class ke liye define kar sakte ho using \`__add__\`.

### 🎭 Polymorphism
Alag-alag classes ke liye same functions use karna (e.g., \`histogram\` function jo string ya list dono pe kaam kare).
`
    },
    {
        id: 'python-inheritance-mastery',
        slug: 'python-inheritance-mastery',
        title: 'Masterclass 18: Inheritance',
        description: 'Class diagrams, Inheritance, Encapsulation, aur Class variables.',
        tags: ['Python', 'OOP', 'Inheritance', 'Architecture'],
        category: 'Python Masterclass',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-02-04'),
        content: `
# Masterclass 18: Inheritance 🧬

Ek class se doosri class banane ka tareeka.

### 🃏 Card Game Example
Maan lo humein Card game banana hai.
\`\`\`python
class Card:
    """Represents a standard playing card."""
    suit_names = ['Clubs', 'Diamonds', 'Hearts', 'Spades']
    rank_names = [None, 'Ace', '2', '3', '4', '5', '6', '7', 
                 '8', '9', '10', 'Jack', 'Queen', 'King']
\`\`\`

---

### 🧬 Inheritance Logic
\`\`\`python
class Deck(Card): # Deck inherits from Card
    def __init__(self):
        self.cards = []
        for suit in range(4):
            for rank in range(1, 14):
                self.cards.append(Card(suit, rank))
\`\`\`

### 📊 Class Diagrams
Visualizing how classes relate to each other (Is-a relation, Has-a relation).

### 🔒 Encapsulation
Data aur methods ko ek hi unit mein band karna.
`
    },
    {
        id: 'python-goodies-advanced',
        slug: 'python-goodies-advanced',
        title: 'Masterclass 19: The Python Goodies',
        description: 'List comprehensions, Generators, aur advanced coding tricks.',
        tags: ['Python', 'Advanced', 'Tricks', 'Optimization'],
        category: 'Python Masterclass',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-02-04'),
        content: `
# Masterclass 19: Python Goodies 💎

Python ke kuch advanced shortcuts aur tools.

### 📝 Conditional Expressions
\`\`\`python
y = math.log(x) if x > 0 else float('nan')
\`\`\`

---

### 🚀 List Comprehensions
List banane ka elegant tareeka:
\`\`\`python
points = [Point(x, y) for x in range(5) for y in range(5)]
\`\`\`

### 🌀 Generators
\`yield\` keyword ka use karke lazy evaluation karna (Memory efficient).
\`\`\`python
def count():
    n = 0
    while True:
        yield n
        n += 1
\`\`\`

### 🍱 Any and All
- \`any([False, True, False])\` -> \`True\`
- \`all([True, True, False])\` -> \`False\`

---

> [!TIP]
> Masterclass Khatam! Ab aap ek Python Pro ban chuke hain. 🚀
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
# ⚛️ Python Core: Primitives & Memory Masterclass

Python mein "Everything is an Object". Chalo iske foundation ko ek dam depth mein samjhte hain.

---

## 1. Fundamental Data Types (Numbers Deep Dive)
Python automatically detect kar leta hai ki data type kya hai (**Dynamic Typing**), par complex engineering ke liye humein internals pata hona chahiye.

### A. Integers (int)
Bina decimal wale numbers. Python 3 mein integers ki koi fixed size nahi hoti (**Arbitrary Precision**).
- **Internals**: Chote integers \`(-5 to 256)\` memory mein predefined hote hain.
- **Conversion**: Aap \`bin()\`, \`oct()\`, aur \`hex()\` se bases change kar sakte hain.
\`\`\`python
a = 10
print(bin(a)) # 0b1010 (Binary)
print(hex(a)) # 0xa (Hexadecimal)
\`\`\`

### B. Floating Point (float)
Decimal wale numbers. Ye IEEE 754 double precision format use karte hain.
- **The Floating Point Issue**: \`0.1 + 0.2\` exactly \`0.3\` nahi hota.
\`\`\`python
print(0.1 + 0.2 == 0.3) # False! (Result is 0.30000000000000004)
\`\`\`
- **Solution**: High precision financial calculations ke liye \`decimal\` module use karein.
\`\`\`python
from decimal import Decimal
print(Decimal('0.1') + Decimal('0.2')) # Exact 0.3
\`\`\`

### C. Complex Numbers (complex)
AI aur science ke liye: \`a + bj\`.
\`\`\`python
c = 3 + 4j
print(abs(c)) # 5.0 (Magnitude/Hypotenuse)
\`\`\`

---

## 2. Objects & Memory Architecture
Python Memory Management (PMM) kaafi smart hai.

### Identity vs Equality
- \`==\` (Equality): Kya values same hain?
- \`is\` (Identity): Kya memory address (Object) same hai?

\`\`\`python
a = [1, 2]
b = [1, 2]
print(a == b) # True
print(a is b) # False (Alag memory clusters)
\`\`\`

### Mutable vs Immutable
Inka logic samajhna sabse zaroori hai:
1. **Immutable** (Change nahi ho sakte): \`int\`, \`float\`, \`string\`, \`tuple\`, \`bool\`.
2. **Mutable** (Change ho sakte hain): \`list\`, \`dict\`, \`set\`.

---

## 3. Truthy/Falsy & Logic Gates
Python mein har value ka ek logical status hota hai.
- **All False**: \`0\`, \`0.0\`, \`None\`, \`""\`, \`[]\`, \`{}\`, \`()\`, \`set()\`, \`False\`.
- **Logic Gates**: \`and\`, \`or\`, \`not\` operators bitwise se alag hote hain.
\`\`\`python
# Short-circuiting
res = True or some_heavy_function() # some_heavy_function call hi nahi hoga!
\`\`\`
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
# 📜 Python Lists & Tuples Masterclass

Collections store karna Python ki sabse badi power hai. Chalo inka post-mortem karte hain.

---

## 1. Python Lists (The Dynamic Array)
List ek ordered collection hai jo mutable (changeable) hoti hai.

### Exhaustive Method List (11+ Methods)
1. **append(x)**: End mein element jodna. $O(1)$
2. **extend(iterable)**: Puri list ya collection ko end mein merge karna.
3. **insert(i, x)**: Specific index par element dalna. $O(n)$
4. **remove(x)**: Pehli bar mile element ko hatana. $O(n)$
5. **pop([i])**: Index se element hatana aur return karna. (Uda dena).
6. **clear()**: Saari list khali kar dena.
7. **index(x)**: Element ka pehla index return karna. 
8. **count(x)**: Ginna ki element kitni baar aaya.
9. **sort(key=..., reverse=...)**: In-place sorting. $O(n \log n)$
10. **reverse()**: List ko ulta kar dena.
11. **copy()**: Shallow copy banana.

### Advanced Slicing & Logic
\`\`\`python
nums = [0, 10, 20, 30, 40, 50]

# Negative Indexing
print(nums[-1]) # 50 (Last)

# Stepping
print(nums[1:5:2]) # [10, 30] (1 se 4 tak, har dusra element)

# Reversing via Slice
print(nums[::-1]) # [50, 40, 30, 20, 10, 0]
\`\`\`

### Memory Internal 🧠
Lists actually **Dynamic Arrays** hoti hain. Jab list bharti hai, Python use double memory (Over-allocation) deta hai taaki baar-baar resize na karna pade. Isliye \`append\` fast hota hai.

---

## 2. Python Tuples (The Fast Constants)
Immutable collection. Jo badli nahi ja sakti.

### Why Tuples?
- **Speed**: Lists se fast hoti hain.
- **Safety**: Configuration data protected rehta hai.
- **Dictionary Keys**: Tuples ko keys banane ke liye use kar sakte hain (Lists ko nahi).

### Specialized Tuples
\`\`\`python
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(10, 20)
print(p.x) # 10 (Access like object!)
\`\`\`

---

## 3. Comparison of Collections

| Feature | List | Tuple |
| :--- | :--- | :--- |
| **Storage** | Dynamic Array | Static Array |
| **Mutability** | Mutable | Immutable |
| **Methods** | Many (append, pop, etc) | Only 2 (count, index) |
| **Best For** | Changing Data | Constant Data / Keys |
| **Memory** | High (Due to over-allocation) | Low |

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

# 🗝️ Python Dictionaries & Sets Masterclass

Yeh dono collections **Hashing** concept par kaam karte hain. Isliye data retrieval $O(1)$ (Instant) hota hai.

---

## 1. Dictionaries (The Hash Map)
Key-Value pairs ka collection. Python 3.7+ mein ye **Ordered** hote hain.

### Exhaustive Dictionary Methods
1. **get(key, default)**: Safe retrieval. Crash nahi hoga agar key missing hai.
2. **keys() / values() / items()**: Views return karte hain jo dynamic hote hain.
3. **update({k:v})**: Batch update ya merge karna.
4. **pop(key)**: Key hatana aur uski value return karna.
5. **popitem()**: Last inserted item (LIFO) hatana.
6. **setdefault(key, default)**: Agar key nahi hai to set kardo, hai to value do.
7. **fromkeys(seq, val)**: Nayi dictionary banana with same value for all keys.

### Hashing Internal 🧠
Dict keys **Hashable** honi chahiye (Immutable). Jab aap \`d[key]\` karte hain, Python key ka \`hash()\` nikalta hai aur ek internal table (Bucket) mein value store karta hai.

\`\`\`python
# Dict Comprehension
users = ["Afroj", "Babu"]
role_dict = {u: "Admin" for u in users} # {'Afroj': 'Admin', 'Babu': 'Admin'}
\`\`\`

---

## 2. Sets (Unique & Mathematical)
Unordered collection of unique items.

### Set Theory Operations
Sets sirf duplicates hatane ke liye nahi, logic building ke liye bhi hote hain:
- **Union (\`| \`)**: Dono sets ke saare elements.
- **Intersection (\`& \`)**: Sirf common elements.
- **Difference (\`- \`)**: A mein hon par B mein nahi.
- **Symmetric Difference (\`^ \`)**: Jo dono mein common nahi hain.

### Advanced Methods
1. **add() / remove() / discard()**: Basic mutations.
2. **issubset() / issuperset()**: Relation check karna.
3. **isdisjoint()**: Kya kuch bhi common nahi hai?

\`\`\`python
s = {1, 2, 3}
s.discard(10) # Safe: Error nahi dega agar 10 nahi mila
# s.remove(10) # Unsafe: Error dega!
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
    },
    {
        id: 'python-special-types',
        slug: 'python-special-types',
        title: 'Python Specialized Types: Range & Binary Data',
        description: 'Deep dive into Range objects, Bytes, Bytearrays, and Memoryviews for low-level optimization.',
        tags: ['Python', 'Specialized', 'Binary', 'Range'],
        category: 'Python Masterclass',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-20'),
        content: `
# 🛠️ Python Specialized Data Types

Ye types common tutorials mein nahi milte, par real-world system systems programming mein bahut important hote hain.

---

## 1. Range Object (The Memory Saver)
\`range()\` ek regular list nahi hai. Ye ek **Lazy Iterator** hai.
- **Internals**: Ye sirf Start, Stop, aur Step values store karta hai. Chahe range 10 ki ho ya 10 Million ki, ye memory barabar leta hai ($O(1)$ Memory).

\`\`\`python
r = range(1, 10000000)
print(r[500]) # Immediate access (indexing allowed!)
\`\`\`

---

## 2. Binary Types (Low-level Data)
Jab aap images, files, ya network packets handle karte hain:

### A. Bytes (Immutable)
\`\`\`python
b = b"Hello" # Prefix 'b'
# b[0] = 65 # ERROR! Immutable hai.
\`\`\`

### B. Bytearray (Mutable)
\`\`\`python
ba = bytearray(b"Hello")
ba[0] = 72 # ASCII for 'H'
print(ba) # bytearray(b'Hello')
\`\`\`

### C. Memoryview
Bina data copy kiye binary data ko access karna:
\`\`\`python
mv = memoryview(ba)
print(mv[0]) # 72
\`\`\`

---

## Summary of Python Data Types
System design ke liye yaad rakho:
1. **Numbers**: High precision (Decimal), Arbitrary size (Int).
2. **Collections**: Fast lookup (Dict/Set), Ordering (List), Safety (Tuple).
3. **Optimizers**: Generators/Ranges, Specialized Arrays.
`
    }
];
