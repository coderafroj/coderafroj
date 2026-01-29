
export const pythonTutorial = {
  id: 'python',
  title: 'Python',
  icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
  description: 'The absolute definitive guide to Python. From basic syntax to Machine Learning, DSA, and Databases.',
  topics: [
    {
      id: 'home',
      title: 'Python Home',
      content: `# Python Masterclass\n\n**Welcome to your Python journey.**\n\nThis tutorial covers the essential building blocks of Python programming. Master these basics to build a strong foundation for your coding career.\n\n> ### 🚀 Roadmap\n> * **Basics:** Intro, Variables, Numbers, Strings (Done ✅)\n> * **Data Types:** Lists, Tuples, Dictionaries, Sets (Done ✅)\n> * **Logic:** If...Else, Loops, Functions (Done ✅)`
    },
    // ... Keeping previous sections implicitly or re-writing with full depth
    {
      id: 'basics_group',
      title: 'Python Basics',
      children: [
        {
          id: 'intro',
          title: 'Python Intro',
          content: `# Python Intro: Shuruat Karein! 🚀

Python ek high-level, interpreted, aur bahut hi easy language hai. Isse "English jaisi" coding bhi kaha jata hai.

### Python Kyun Seekhein?
1. **Easy Syntax:** Iska code padhna english padhne jaisa hai.
2. **Powerful:** Artificial Intelligence se lekar Website banane tak, sab jagah use hoti hai.
3. **Big Community:** Agar aap kahin fans gaye, toh help milna bahut aasaan hai.

\`\`\`python
# Aapka pehla code!
print("Hello Coderafroj!")
\`\`\`

Python code blocks ke liye **Indentation** (space) ka use karta hai, curly braces \`{}\` ka nahi.`
        },
        {
          id: 'variables',
          title: 'Variables',
          content: `# Variables: Data Store Karne Wala Box 📦

Variables ka matlab hai containers jisme hum data store karte hain. Python mein aapko variable ka type (integar, string etc.) batane ki jarurat nahi padti.

### Basic Rules:
- Name start hona chahiye letter ya underscore se.
- Numbers se start nahi kar sakte (\`1name\` galat hai).
- Names case-sensitive hote hain (\`age\` aur \`Age\` alag hain).

\`\`\`python
name = "Afroj"  # Ye ek string variable hai
age = 22        # Ye ek integer variable hai
is_pro = True   # Ye ek boolean variable hai

print(name)
\`\`\` `
        },
        {
          id: 'numbers',
          title: 'Numbers (Int & Float)',
          content: `# Numbers in Python 🔢

Python mein main 3 tarah ke numbers hote hain:

1. **int (Integer):** Pure numbers bina decimal ke (e.g., 5, -10, 1000).
2. **float (Floating Point):** Decimal wale numbers (e.g., 5.5, -0.1, 10.0).
3. **complex:** Numbers with imaginary parts (e.g., 3 + 5j).

### Basic Math Operations:
\`\`\`python
x = 10
y = 3

print(x + y)  # 13 (Addition)
print(x / y)  # 3.333... (Division hamesha float return karta hai)
print(x // y) # 3 (Floor division - point ke baad wala part hata deta hai)
print(x % y)  # 1 (Remainder/Modulus)
print(x ** y) # 1000 (Power/Exponent)
\`\`\` `
        },
        {
          id: 'strings',
          title: 'Strings (Advanced Guide) 🧵',
          content: `# Strings: Characters ka Sequence

Python mein String ek **sequence** hai, yaani characters ka ek ordered collection. Aap characters ko bracket operator \`[]\` se access kar sakte ho.

### 1. Indexing (Ginti 0 se shuru hoti hai)
Computer science mein counting hamesha \`0\` se start hoti hai.
\`\`\`python
fruit = 'banana'
letter = fruit[0] # 'b' milega
print(letter)
\`\`\`
**Note:** Agar aap \`fruit[1.5]\` likhenge toh error aayega kyunki index hamesha integer hona chahiye.

### 2. Length Pata Karna (len)
\`len()\` function se aap string ki total length jaan sakte ho.
\`\`\`python
fruit = 'banana'
print(len(fruit)) # Result: 6
\`\`\`
**Tip:** Last character nikalne ke liye \`fruit[len(fruit)-1]\` ya simple \`fruit[-1]\` use karein.

### 3. Slicing (String ke Tukde)
String ka ek part cut karne ke liye slice operator \`[:]\` use hota hai.
\`\`\`python
s = 'Coderafroj'
print(s[0:4]) # 'Code' (0 se 3 tak, 4 include nahi hota)
print(s[:4])  # Same result 'Code'
print(s[4:])  # 'rafroj' (4 se end tak)
\`\`\`

### 4. Strings are Immutable
Matlab aap string banane ke baad usko beech mein se "edit" nahi kar sakte.
\`\`\`python
greet = "Hello"
# greet[0] = "J" # Yeh ERROR dega!
new_greet = "J" + greet[1:] # Aise naya string banao
print(new_greet) # "Jello"
\`\`\`

### 5. String Methods
Methods functions jaisa kaam karte hain par dot \`.\` se invoke hote hain.
\`\`\`python
word = "banana"
print(word.upper()) # "BANANA"
print(word.find('na')) # 2 (Pehla 'na' index 2 par hai)
print(word.find('na', 3)) # 4 (Index 3 ke baad dhundho)
\`\`\` `
        },
        {
          id: 'lists',
          title: 'Lists (Arrays) 📋',
          content: `# Lists: Data ki List Banayein

Python mein items ko ek order mein store karne ke liye \`List\` sabse zyada use hota hai. Ye doosri languages ke 'Array' jaisa hai par zyada flexible hai.

### 1. List Kaise Banayein?
Square brackets \`[]\` ka use karein aur items ko comma \`,\` se separate karein.
\`\`\`python
fruits = ["apple", "banana", "cherry"]
mix_list = ["Afroj", 22, True] # Alag types bhi ho sakte hain!
\`\`\`

### 2. Items Access Karna
Strings ki tarah yahan bhi indexing \`0\` se start hoti hai.
\`\`\`python
print(fruits[0])  # "apple"
print(fruits[-1]) # "cherry" (Last item)
\`\`\`

### 3. List is Mutable (Change Kar Sakte Hain)
Strings ke opposite, aap list ke items ko change kar sakte ho.
\`\`\`python
fruits[1] = "mango"
print(fruits) # ["apple", "mango", "cherry"]
\`\`\`

### 4. Important Methods
\`\`\`python
fruits.append("orange") # End mein add karein
fruits.insert(1, "lemon") # Specific position par add karein
fruits.remove("apple") # Item delete karein
fruits.pop() # Last item delete karein
\`\`\` `
        },
        {
          id: 'tuples',
          title: 'Tuples (Locked Lists) 🔒',
          content: `# Tuples: Immutable Collections

Tuple bilkul List jaisa hai, par ek bade difference ke saath: **Tuples ko modify nahi kiya ja sakta (Immutable).**

### 1. Tuple Kaise Banayein?
Iske liye round brackets \`()\` ka use hota hai.
\`\`\`python
motto = ("Code", "Innovate", "Succeed")
# motto[0] = "Hack" # Yeh ERROR dega!
\`\`\`

### 2. Kab Use Karein?
Jab aap chahte ho ki aapka data accidental change se bacha rahe (Jaise ki coordinates, configuration etc.)

### 3. Unpacking
\`\`\`python
point = (10, 20)
x, y = point # x=10, y=20
print(x, y)
\`\`\` `
        },
        {
          id: 'dictionaries',
          title: 'Dictionaries (Key-Value) 📖',
          content: `# Dictionaries: Key-Value Pairs

Dictionary ka use data ko "Key:Value" pairs mein store karne ke liye hota hai. Ye real-life dictionary jaisa hai jahan word (key) ka matlab (value) hota hai.

### 1. Dictionary Kaise Banayein?
Curly braces \`{}\` ka use karein.
\`\`\`python
user = {
  "name": "Afroj",
  "age": 22,
  "is_pro": True
}
\`\`\`

### 2. Data Access Karna
Yahan indexing nahi, **Key** ka use hota hai.
\`\`\`python
print(user["name"]) # "Afroj"
print(user.get("age")) # 22
\`\`\`

### 3. Change & Add Items
Dictionaries mutable hoti hain.
\`\`\`python
user["age"] = 23 # Update
user["location"] = "India" # New item add karein
\`\`\`

### 4. Important Methods
\`\`\`python
print(user.keys())   # Saari keys milegi
print(user.values()) # Saari values milegi
user.pop("name")     # Specific key delete karein
\`\`\` `
        },
        {
          id: 'sets',
          title: 'Sets (Unique Items) 💎',
          content: `# Sets: No Duplicates ALLOWED!

Set ek aisi collection hai jisme koi bhi item repeat nahi ho sakta. Ye unordered hoti hai.

### 1. Set Kaise Banayein?
Curly braces \`{}\` ka use hota hai (bina key-value ke).
\`\`\`python
my_set = {"apple", "banana", "cherry", "apple"}
print(my_set) # Result: {"apple", "banana", "cherry"} (Duplicates gayab!)
\`\`\`

### 2. Access Items
Sets unordered hote hain isliye aap \`my_set[0]\` nahi kar sakte. Aapko loop use karna padega.

### 3. Methods
\`\`\`python
my_set.add("orange")
my_set.remove("banana")
\`\`\` `
        }
      ]
    },
    {
      id: 'logic_group',
      title: 'Logic & Control Flow',
      children: [
        {
          id: 'ifelse',
          title: 'If...Else (Conditions) 🤔',
          content: `# If...Else: Decision Making

Programming mein humein aksar conditions check karni padti hain (Jaise: "Agar marks 100 hain toh Winner").

### 1. Basic Syntax
\`\`\`python
a = 100
b = 50

if a > b:
  print("a bada hai b se")
elif a == b:
  print("Dono barabar hain")
else:
  print("b bada hai a se")
\`\`\`

### 2. Logical Operators
- **and:** Dono condition true honi chahiye.
- **or:** Kam se kam ek true honi chahiye.
- **not:** Condition ko ulta kar deta hai.

\`\`\`python
if a > 0 and b > 0:
  print("Dono numbers positive hain")
\`\`\` `
        },
        {
          id: 'loops',
          title: 'Loops (Repeating Tasks) 🔄',
          content: `# Loops: Kaam ko Repeat Karein

Jab koi kaam baar-baar karna ho, toh hum Loops ka use karte hain.

### 1. for Loop
Ye sequence (list, string etc.) par iterate karne ke liye best hai.
\`\`\`python
fruits = ["apple", "banana", "cherry"]
for x in fruits:
  print(x) # Sabka naam line se print hoga
\`\`\`

### 2. range() Function
Agar aapko loop specific number of times chalana hai:
\`\`\`python
for i in range(5):
  print(i) # 0 se 4 tak print karega
\`\`\`

### 3. while Loop
Ye tab tak chalta hai jab tak condition **True** rahe.
\`\`\`python
i = 1
while i < 6:
  print(i)
  i += 1
\`\`\` `
        },
        {
          id: 'functions',
          title: 'Functions (Custom Tools) 🛠️',
          content: `# Functions: Reusable Code Blocks

Function ek aisi cheez hai jisme aap code likh kar "save" kar lete ho aur jab chahe usse "call" kar sakte ho.

### 1. Function Banana aur Call Karna
\`def\` keyword ka use karein.
\`\`\`python
def greet(name):
  print("Namaste, " + name + "!")

greet("Afroj") # Output: Namaste, Afroj!
\`\`\`

### 2. Arguments & Parameters
Aap function ke andar data bhej sakte ho (Parameters).

### 3. Return Statements
Function se value wapas lene ke liye \`return\` use karein.
\`\`\`python
def add(x, y):
  return x + y

result = add(5, 5)
print(result) # 10
\`\`\` `
        }
      ]
    }
  ]
};
