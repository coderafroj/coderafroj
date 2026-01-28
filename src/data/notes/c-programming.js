export const cProgramming = [
    {
        id: 'c-language-introduction',
        slug: 'c-language-introduction',
        title: 'Introduction to C Programming',
        description: 'Dennis Ritchie ki legacy. C language ke features aur code structure ko samjhein.',
        tags: ['C', 'Programming', 'Basics'],
        category: 'C Programming',
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-15'),
        content: `
# C Programming: The Mother Language

C ek dynamic aur powerful language hai jise **Dennis Ritchie** ne 1972 mein AT&T Bell Labs mein banaya tha.

## Why C? (C kyun sikhein?)
1. **Portability**: Ek system par likha code dusre par bhi chal jata hai.
2. **Fast Execution**: Yeh hardware ke bahut kareeb hoti hai, isliye super fast hai.
3. **Structured Design**: Isme programs chote functions mein banti hain.

---

## First "Hello World" Code Breakdown
\`\`\`c
#include < stdio.h > // Standard Input Output Header
    void main() {
        printf("Hello Coderafroj!"); // Screen par print karne ke liye
    }
\`\`\`

- **#include**: Preprocessor directive jo link section mein help karta hai.
- **main()**: Program ka entry point. CPU yahi se execution start karta hai.
- **printf()**: Output dikhane wala function.
        `
    },
    {
        id: 'c-tokens-variables',
        slug: 'c-tokens-variables',
        title: 'C Tokens: Variables & Data Types',
        description: 'Identifiers, 32 Keywords, aur memory allocation units (int, float, char).',
        tags: ['C', 'Logic', 'Memory'],
        category: 'C Programming',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-15'),
        content: `
# C Tokens & Memory

Computer mein har choti unit jo code mein use hoti hai, use **Token** kehte hain.

## Data Types (Data ke prakar)
1. **int**: Integers (Numbers jaise 10, 20). Memory: 2-4 bytes.
2. **char**: Characters ('A', 'z'). Memory: 1 byte.
3. **float**: Decimal numbers (10.5, 3.14). Memory: 4 bytes.

## Variables (Memory Containers)
Variable ek naam hai jo memory location ko diya jata hai.
- **Naming Rules**: Sirf alphabets, digits aur underscore (_) allow hain. Pehla character hamesha alphabet ya (_) hona chahiye.
- **Valid Example**: \`std_name\`, \`salary100\`
- **Invalid Example**: \`1record\`, \`my - name\`

---

## 32 Keywords in C
C language mein 32 words reserved hain jinhe hum variable name ki tarah use nahi kar sakte (Example: \`auto\`, \`break\`, \`int\`, \`return \`).
        `
    },
    {
        id: 'c-operators-deep-dive',
        slug: 'c-operators-deep-dive',
        title: 'C Operators: Arithmetic to Bitwise',
        description: 'Complete guide to +, -, *, /, %, Logical (&&, ||), aur Bitwise operators. Precedence rules aur calculations.',
        tags: ['C', 'Operators', 'Math'],
        category: 'C Programming',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-15'),
        content: `
# C Operators: The Tools of Calculation

Variables par process karne ke liye hum **Operators** ka use karte hain.

## 1. Arithmetic Operators (Maths)
- \`+\`, \`-\`, \`*\` (Multiply), \`/\` (Divide).
- **Modulus (\`%\`)**: Yeh remainder (shesh) deta hai. \`10 % 3 = 1\`. (Sirf Integers par chalta hai).

## 2. Relational Operators (Rishta)
Do values ko compare karne ke liye (Result: True(1) or False(0)).
- \`==\` (Barabar hai?), \`!=\` (Barabar nahi hai?).
- \`>\`, \`<\`, \`>=\`, \`<=\`.

## 3. Logical Operators (Logic)
Do ya zyada conditions ko jodne ke liye.
- **&& (AND)**: Jab dono sahi hon.
- **|| (OR)**: Jab koi ek bhi sahi ho.
- **! (NOT)**: True ko False aur False ko True bana deta hai.

## 4. Assignment Operators
Value set karne ke liye.
- \`=\`: Simple assignment (\`a = 10\`).
- Short-hand: \`a += 10\` (Iska matlab \`a = a + 10\`). Yeh \`-=\`, \`*=\`, \`/=\` ke liye bhi chalta hai.

## 5. Increment/Decrement (Unary)
- \`++\`: Value ko 1 badhata hai (\`a++\`).
- \`--\`: Value ko 1 ghataata hai (\`a--\`).

## 6. Bitwise Operators (Binary Level)
Bits (0 aur 1) par direct kaam karne ke liye.
- \`&\` (Bitwise AND), \`|\` (Bitwise OR), \`^\` (XOR), \`~\` (NOT).
- \`<<\` (Left Shift), \`>>\` (Right Shift).

## 7. Ternary Operator (One Liner)
Short \`if-else\`.
- Syntax: \`Condition ? TruePart : FalsePart;\`
- Example: \`(a > b) ? a : b;\` (Jo bada hai wo milega).
        `
    },
    {
        id: 'c-control-structures',
        slug: 'c-control-structures',
        title: 'Decisions & Loops in C',
        description: 'if-else ladder, switch cases, aur Looping (for, while, do-while) ka logic.',
        tags: ['C', 'Logic', 'Control'],
        category: 'C Programming',
        image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-15'),
        content: `
# Flow Control: Logic Building

Program ko batana ki kab kya karna hai, yahi real programming hai.

## 1. Selection Statements (Decisions)
- **if-else**: "Agar" condition sahi hai toh ye karo, "Varna" wo karo.
- **Switch Case**: Jab bahut saare choices hon (Example: Calculator menu).

## 2. Iteration Statements (Loops)
Kisi bhi kaam ko baar-baar karne ke liye:
- **for loop**: Jab humein pehle se pata ho kitni baar repeat karna hai.
- **while loop**: Jab condition depend karti hai execution par.
- **do-while**: Yeh kam-se-kam ek baar zaroor chalta hai, chahe condition galat hi kyun na ho.

---

## Jump Statements
1. **break**: Loop se foran bahar nikalne ke liye.
2. **continue**: Agli iteration par jump karne ke liye.
3. **goto**: Kisi label par direct control bhejnew ke liye.
        `
    },
    {
        id: 'c-arrays-and-pointers',
        slug: 'c-arrays-and-pointers',
        title: 'Arrays & The Power of Pointers',
        description: 'Contiguous memory management, 2D Arrays (Matrices), aur pointers core internals.',
        tags: ['C', 'Advanced', 'Memory'],
        category: 'C Programming',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-15'),
        content: `
# Data Org: Arrays & Pointers

## 1. Arrays (Samuh)
Array ek aisi variables ki collection hai jisme sabka data type same hota hai aur memory ek ke baad ek (Contiguous) hoti hai.
- **1D Array**: List banane ke liye (Example: \`int marks[50]\`).
- **2D Array**: Tables ya Matrix banane ke liye (Example: \`int matrix[3][3]\`).

## 2. Pointers (Memory Address)
Pointer ek aisi special variable hai jo dusri variable ka **Address** store karti hai.
- **& operator**: Variable ka address nikalne ke liye.
- *** operator**: Us address par rkhi hui value nikalne ke liye.

---

### Importance of Pointers
Pointers se hum memory ko direct control kar sakte hain, functions mein link bhej sakte hain (Call by Reference) aur highly dynamic data structures (Linked Lists) bana sakte hain.
        `
    },
    {
        id: 'c-strings-mastery',
        slug: 'c-strings-mastery',
        title: 'Strings in C: Handling Text',
        description: 'Character arrays, null terminator, aur string.h library functions (strcpy, refined logic) ka pura gyaan.',
        tags: ['C', 'Strings', 'Text Processing'],
        category: 'C Programming',
        image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-16'),
        content: `
# C Strings: Text ke saath khelna

C language mein "String" jaisa koi direct data type nahi hota. Hum **Character Arrays** ka use karte hain words ya sentences store karne ke liye.

## 1. String Kya Hai?
String ek characters ka sequence hai jo **Null Character** (\`'\\0'\`) se khatam hota hai.
- Declaration: \`char name[20] = "Coderafroj";\`
- Memory: \`C | o | d | e | r | a | f | r | o | j | \\0\`
- **Note**: Null character (\`\\0\`) zaroori hai taaki computer ko pata chale string kahan khatam ho rahi hai.

## 2. Input/Output
- **Scanner**: \`scanf("%s", name);\` (Space ke baad ka data nahi padhta).
- **Gets**: \`gets(name);\` (Puri line padhta hai, including spaces - *unsafe but good for learning*).
- **Puts**: \`puts(name);\` (String ko print karta hai aur new line deta hai).

## 3. String.h Library Functions
String manipulation ke liye hum \`<string.h>\` library use karte hain.

| Function | Kaam | Example |
| :--- | :--- | :--- |
| **strlen()** | Length (lambai) batata hai | \`int len = strlen(str);\` |
| **strcpy()** | Copy karta hai (Assignment) | \`strcpy(target, source);\` |
| **strcat()** | Jodta hai (Concatenation) | \`strcat(str1, str2);\` |
| **strcmp()** | Compare karta hai | \`if(strcmp(s1, s2) == 0) // Same\` |
| **strrev()** | Ulta kar deta hai (Reverse) | \`strrev(str);\` |

### Common Mistake:
Example: \`str1 = str2;\` ❌ (Wrong! Arrays direct assign nahi hote).
Sahi tarika: \`strcpy(str1, str2);\` ✅
        `
    },
    {
        id: 'c-storage-classes',
        slug: 'c-storage-classes',
        title: 'Storage Classes: Variable ki Life',
        description: 'Auto, Extern, Static, aur Register variables ka scope aur lifetime samjhein.',
        tags: ['C', 'Memory', 'Scope'],
        category: 'C Programming',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-16'),
        content: `
# Storage Classes: Variable ka Swabhaav

C mein har variable ki 2 properties hoti hain: **Scope** (Kahan tak accessible hai) aur **Lifetime** (Kab tak zinda rehta hai). Ise decide karne ke liye **Storage Classes** use hoti hain.

## 1. Auto (Automatic)
- **Default**: Functions ke andar banne wale sabhi variables by default \`auto\` hote hain.
- **Scope**: Sirf us function ke andar.
- **Lifetime**: Jab tak function chal raha hai.
- **Value**: Garbage (Kachra) value agar initialize na karein.

## 2. Extern (External)
- **Global Variables**: Function ke bahar bante hain.
- **Scope**: Pure program mein kahin bhi use ho sakta hai.
- **Usage**: Multiple files ke beech data share karne ke liye.

## 3. Static (Amar Variable)
- **Magic**: Yeh apni value **bhulta nahi** hai. Function khatam hone ke baad bhi iski value memory mein rehti hai.
- **Example**:
\`\`\`c
void count() {
    static int c = 0; // Sirf ek baar initialize hoga
    c++;
    printf("%d ", c);
}
// Call 1: prints 1
// Call 2: prints 2 (Purani value yaad rakhi)
\`\`\`

## 4. Register (Fastest)
- **Request**: Hum CPU se request karte hain ki is variable ko **CPU Register** (sabse fast memory) mein rakho.
- **Use**: Loops ke counters ke liye jo baar-baar access hote hain.
- **Note**: Address (\`&\`) operator ispar kaam nahi karta.
        `
    },
    {
        id: 'program-execution-process',
        slug: 'program-execution-process',
        title: 'Anatomy of Program Execution',
        description: 'Source code se Executable (.exe) file banne ka step-by-step process.',
        tags: ['Compilation', 'Linking', 'Loading'],
        category: 'C Programming',
        image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-16'),
        content: `
# Program Execution: Code se Software Tak

Jab aap "Run" button dabate hain, toh parde ke piche kya hota hai? 

## 1. Writing & Editing
Sabse pehle aap **Text Editor** (Notepad, VS Code) mein code likhte hain. File save hoti hai \`.c\` extension se. (Source Code).

## 2. Compiling (The Translation)
**Compiler** aapke code ko check karta hai (Syntax errors ke liye) aur use **Object Code** (\`.obj\`) mein badal deta hai. Yeh machine language ke kareeb hai.

## 3. Linking (Jodna)
Aapne code mein \`printf() \` use kiya, par uski definition library mein hai. **Linker** aapke object code ko libraries ke saath jodta hai aur **Executable File** (\`.exe\`) banata hai.

## 4. Loading (Memory mein)
Ab **Loader** aapki \`.exe\` file ko Hard Disk se uthakar **RAM** mein dalta hai taaki CPU use chala sake.

## 5. Execution (Run)
CPU instructions ko ek-ek karke execute karta hai aur aapko Output screen par dikhta hai.

### Flow Diagram:
\`Source Code(.c) -> Compiler -> Object Code(.obj) -> Linker -> Executable(.exe) -> Loader -> Run\`
        `
    },
    // UNIT II
    {
        id: 'c-statements-types',
        slug: 'c-statements-types',
        title: 'C Statements: The Building Blocks',
        description: 'Expression, Compound, aur Null Statements ka foundational logic.',
        tags: ['C', 'Syntax', 'Logic'],
        category: 'C Programming Unit II',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-16'),
        content: `
# C Statements: Code ke Vakya (Sentences)

C language mein instruction ko "Statement" kehte hain.

## 1. Expression Statement
Koi bhi calculation ya assignment jo semicolon \`; \` se khatam ho.
- Example: \`a = 10; \` ya \`printf("Hi"); \`

## 2. Compound Statement (Block)
Ye curly braces \`{ } \` ke andar likhe gaye statements ka group hai. Ise ek single unit mana jata hai.
\`\`\`c
    {
    int x = 10;
        x = x + 5;
    }
    \`\`\`

## 3. Null Statement
Sirf ek semicolon \`; \`. Yeh kuch nahi karta, bas syntax poora karne ke liye use hota hai (jaise empty loops mein).

---

## Return Statement
Functions se wapas aane ke liye use hota hai. \`return 0; \` ka matlab hai "Sab kuch sahi se khatam hua".
        `
    },
    {
        id: 'c-decision-making',
        slug: 'c-decision-making',
        title: 'Decision Control: if, else & switch',
        description: 'Computer ko faisla lena sikhayein. if-else ladder aur switch case ki mastery.',
        tags: ['Control Flow', 'Logic', 'Conditionals'],
        category: 'C Programming Unit II',
        image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-16'),
        content: `
# Decision Making: Computer ka Logic

Computer khud start nahi sochta, humein batana padta hai: "Agar ye ho, to wo karo".

## 1. if Statement
Simple condition check.
\`\`\`c
    if (marks > 33) {
        printf("Pass!");
    }
    \`\`\`

## 2. if-else Statement
Agar condition sahi nahi hai, to kya karein?
Use: **ATM Logic**
- Agar Pin sahi hai -> Withdraw Money
- Varna (Else) -> Show Error

## 3. else-if Ladder
Jab 2 se zyada options hon. (Example: Grading System)
- \`marks > 90\` -> Grade A
- \`else if (marks > 80) \` -> Grade B
- \`else \` -> Grade C

## 4. Switch Case
Jab ek variable ki alag-alag values par alag kaam karna ho. Yeh \`else -if\` se fast aur clean hota hai.
**Example: Menu System**
\`\`\`c
    switch (choice) {
        case 1: printf("Pizza"); break;
        case 2: printf("Burger"); break;
        default: printf("Invalid");
    }
    \`\`\`
**Note**: \`break\` zaroori hai, nahi to neeche ke saare cases bhi chal jayenge (Fallthrough).
        `
    },
    {
        id: 'c-loops-iteration',
        slug: 'c-loops-iteration',
        title: 'Looping Mastery: While, Do-While & For',
        description: 'Repetitive tasks ko automate karein. Entry vs Exit controlled loops ka fark.',
        tags: ['Loops', 'Iteration', 'Automation'],
        category: 'C Programming Unit II',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-16'),
        content: `
# Loops: Kaam Ko Repeat Karna

Agar aapko "Hello" 1000 baar print karna ho, to kya 1000 baar \`printf\` likhenge? Nahi, **Loops** use karenge!

## 1. while Loop (Entry Controlled)
Pehle condition check hoti hai, fir kaam hota hai. Agar pehli baar mein hi condition galat hai, to loop ek baar bhi nahi chalega.
\`\`\`c
    while (battery > 0) {
        playGame();
    }
    \`\`\`

## 2. do-while Loop (Exit Controlled)
Pehle kaam hota hai, fir condition check hoti hai. **Guarantee**: Yeh kam se kam **1 baar** zaroor chalega.
Use: Menu driven programs jahan user ko ek baar menu dikhana zaroori hai.

## 3. for Loop (The All-Rounder)
Isme initialization, condition, aur update sab ek hi line mein hote hain.
\`for (int i = 1; i <= 10; i++) \`
**Use**: Jab pata ho ki kitni baar loop chalana hai (Fixed iterations).

## Nested Loops
Loop ke andar loop. Iska use **Matrix** (Rows & Columns) ya **Patterns** (Star pyramid) print karne ke liye hota hai.
        `
    },
    {
        id: 'c-jump-control',
        slug: 'c-jump-control',
        title: 'Jump Statements: Break, Continue & Goto',
        description: 'Loop flow ko control karna. Break vs Continue ka real-world usage.',
        tags: ['Control Flow', 'Syntax', 'Logic'],
        category: 'C Programming Unit II',
        image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-16'),
        content: `
# Jump Statements: Flow Ko Todna

Kabhi-kabhi humein sequence todna padta hai.

## 1. Break Statement
**Purpose**: Loop ya Switch se turant **bahar nikalna**.
Example: Aap 1 se 100 tak count kar rahe the, lekin 50 milte hi ruk jana hai.

## 2. Continue Statement
**Purpose**: Current iteration ko skip karke **wapas upar jana** (Next round ke liye).
Example: 1 se 10 print karo, lekin 5 ko skip kar do.

## 3. Goto Statement (avoid karein)
Program ka control kisi bhi labeled jagah bhejne ke liye.
**Note**: Ise moderna programming mein avoid karte hain kyunki isse code "Spaghetti" (uljha hua) ban jata hai.

| Break | Continue |
| :--- | :--- |
| Loop khatam kar deta hai | Sirf current round skip karta hai |
| Switch mein use hota hai | Switch mein use nahi hota |
        `
    },
    {
        id: 'c-type-conversion',
        slug: 'c-type-conversion',
        title: 'Type Conversion: Implicit vs Explicit',
        description: 'Data types ko badalna (Casting). Data loss se kaise bachein.',
        tags: ['Memory', 'Data Types', 'Syntax'],
        category: 'C Programming Unit II',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-16'),
        content: `
# Type Casting: Data Ka Roop Badalna

Jab hum ek data type ki value dusre data type mein daalte hain, use **Type Conversion** kehte hain.

## 1. Implicit Conversion (Automatic)
Yeh compiler khud karta hai. Chote data type ko bade mein dalna (Safe hai).
- Example: \`int\` (chota) -> \`float\` (bada).
\`\`\`c
int a = 10;
float b = a; // 10.0 ban jayega
    \`\`\`

## 2. Explicit Conversion (Type Casting)
Yeh programmer force karta hai. Bade data ko chote mein dalna. Yahan **Data Loss** ho sakta hai.
- Syntax: \`(type)expression\`
- Example:
\`\`\`c
float marks = 95.5;
int final = (int)marks; // .5 udd jayega, sirf 95 bachega.
    \`\`\`

**Rule**: Jab aap do integers ko divide karte hain (jaise 5/2), to result integer (2) hi aayega. Sahi result (2.5) ke liye type casting zaroori hai: \`(float)5 / 2\`.
        `
    },
    // UNIT III
    {
        id: 'c-functions-modular',
        slug: 'c-functions-modular',
        title: 'Functions: Modular Programming',
        description: 'Code ko chote hisson mein todna. Call by Value vs Reference aur Recursion ka magic.',
        tags: ['Functions', 'Recursion', 'Modular'],
        category: 'C Programming Unit III',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-16'),
        content: `
# Functions: Code ke Building Blocks

Badi problem ko chote-chote tukdon mein tod kar solve karna hi "Modular Programming" hai. C mein iska tool hai **Function**.

## 1. Function Kya Hai?
Ye lines of code ka ek group hai jo ek specific kaam karta hai.
**Example**: \`printf() \` ek function hai jo print karta hai. Hum apne functions bhi bana sakte hain.

## 2. Types of Functions
- **Library Functions**: Jo pehle se C mein hain (ex: \`scanf\`, \`sqrt\`).
- **User-Defined Functions**: Jo hum banate hain (ex: \`calculateTax() \`).

## 3. Passing Arguments (Data bhejna)
- **Call by Value**: Variable ki **copy** function ko bheji jati hai. Original variable safe rehta hai.
- **Call by Reference**: Variable ka **address** bheja jata hai. Agar function ne value badli, to original value bhi badal jayegi.

## 4. Recursion (Khud ko call karna)
Jab ek function apne aap ko hi call kare.
**Classic Example: Factorial**
\`\`\`c
int factorial(int n) {
        if (n == 0) return 1;
        return n * factorial(n - 1);
    }
    \`\`\`
Yeh loop jaisa kaam karta hai, par bina loop lagaye.
        `
    },
    {
        id: 'c-preprocessor-directives',
        slug: 'c-preprocessor-directives',
        title: 'The C Preprocessor: # Magic',
        description: '#include se lekar Macros tak. Compilation se pehle ka process samjhein.',
        tags: ['Preprocessor', 'Macros', 'Header Files'],
        category: 'C Programming Unit III',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-16'),
        content: `
# Preprocessor Directives: Compilation se Pehle

Compiler apna kaam shuru karne se pehle "Preprocessor" ko bulata hai. Jo bhi line \`#\` se shuru hoti hai, wo preprocessor command hai.

## 1. File Inclusion (#include)
- \`#include < stdio.h >\`: Standard library se file uthao.
- \`#include "myfile.h"\`: Current folder se apni banayi file uthao.

## 2. Macro Substitution (#define)
Code mein kisi value ko naam dena.
- Example: \`#define PI 3.14\`
Jahan bhi \`PI\` likha hoga, wahan \`3.14\` replace ho jayega. Yeh memory nahi leta, bas text replace karta hai.

## 3. Conditional Compilation
Kya code ka kuch hissa specific situation mein hi chalana hai?
\`\`\`c
    #ifdef WINDOWS
    // Sirf Windows ke liye code
    #endif
    \`\`\`
Yeh techniques bade projects mein platform-specific code likhne ke liye use hoti hain.
        `
    },
    // UNIT IV
    {
        id: 'c-structures-unions',
        slug: 'c-structures-unions',
        title: 'Derived Data: Structures & Unions',
        description: 'Real world data modeling. Student records se lekar complex data types tak.',
        tags: ['Data Structures', 'Memory', 'Logic'],
        category: 'C Programming Unit IV',
        image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-16'),
        content: `
# Structures & Unions: Data ka Packet

Ab tak hum ek variable (\`int a\`) mein ek hi value rakhte the. Lekin agar "Student" ka data rakhna ho (Name, Roll No, Marks)?
Yahan **Structures** kaam aate hain.

## 1. Structure (struct)
Alag-alag data types ko ek naam ke neeche lana.
\`\`\`c
struct Student {
    char name[20];
    int roll;
    float marks;
    };
    \`\`\`
**Memory**: Har member ki apni jagah hoti hai. Size = \`20 + 4 + 4 = 28 bytes\`.

## 2. Union
Structure jaisa hi hai, par memory bachaata hai. Isme ek waqt mein **sirf ek** member hi value hold kar sakta hai.
**Memory**: Sabse bade member ke size barabar (i.e., 20 bytes).
**Use**: Jab memory bahut kam ho (Embedded systems).

## 3. Arrays of Structures
Poori class ka data store karna? Structure ka array bana lo!
\`struct Student class_X[50]; \`
        `
    },
    {
        id: 'c-typedef-enumerations',
        slug: 'c-typedef-enumerations',
        title: 'User Types: Typedef & Enum',
        description: 'Apna data type kaise banayein? Enums ke named constants aur Typedef ka simplification.',
        tags: ['C', 'Keywords', 'Types'],
        category: 'C Programming Unit IV',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-16'),
        content: `
# Creating Custom Types

C humein allowed karta hai ki hum existing types ko naye naam dein ya apne types banayein.

## 1. Typedef (Type Definition)
Kisi bade data type ko chota naam dene ke liye.
- **Before**: \`unsigned long long int salary;\` (Bahut bada naam).
- **Use typedef**: \`typedef unsigned long long int bigint;\`
- **After**: \`bigint salary;\` (Simple!).

Usage with Structures:
\`\`\`c
typedef struct Student {
    int id;
} STU;

STU s1; // ab 'struct Student' likhne ki zaroorat nahi.
\`\`\`

## 2. Enumeration (Enum)
Numbers ko meaningful naam dene ke liye.
Example: Weekdays.
\`\`\`c
enum Week {Mon, Tue, Wed, Thu, Fri, Sat, Sun};
// Iska matlab hai: Mon=0, Tue=1, Wed=2...

enum Week today = Wed;
printf("%d", today); // Output: 2
\`\`\`
**Faida**: Code padhne mein asaan ho jata hai. \`flag = 0\` ki jagah \`flag = FALSE\` likh sakte hain agar enum banayein toh.
        `
    },
    {
        id: 'c-advanced-pointers',
        slug: 'c-advanced-pointers',
        title: 'Advanced Pointers & Dynamic Memory',
        description: 'Pointer arithmetic, malloc/calloc, aur memory leakage se bachne ke tarike.',
        tags: ['Pointers', 'Memory Management', 'Advanced'],
        category: 'C Programming Unit IV',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-16'),
        content: `
# Advanced Pointers: Memory Master

Simple pointers toh address rakhte hain, par Advanced Pointers jaadu karte hain.

## 1. Pointer Arithmetic
Pointers ko hum add (\`p++\`) ya subtract kar sakte hain.
- \`p++\` ka matlab agle memory block par jana (Agar \`int\` hai to +4 bytes).
- Iska use Arrays ko fast access karne ke liye hota hai.

## 2. Dynamic Memory Allocation (DMA)
Ab tak hum fix size arrays banate the (\`int arr[100]\`). Par agar size na pata ho?
**stdlib.h** ke functions use karein:
- **malloc()**: Memory block reserve karta hai.
- **calloc()**: Multiple blocks reserve karta hai aur zero se bhar deta hai.
- **realloc()**: Size badhane ya ghatane ke liye.
- **free()**: Kaam khatam hone par memory wapas system ko dena (Zaroori hai, nahi to Memory Leak ho jayega).

## 3. Pointers to Pointers (**p)
Ek pointer jo dusre pointer ka address rakhe. Yeh 2D Arrays aur complex Data Structures (Linked Lists) mein use hota hai.
        `
    },
    // UNIT V
    {
        id: 'c-file-handling-mastery',
        slug: 'c-file-handling-mastery',
        title: 'File Handling: Persistent Storage',
        description: 'Data ko hamesha ke liye save karna. fopen, fclose, aur File Modes ka detailed guide.',
        tags: ['File I/O', 'Storage', 'System'],
        category: 'C Programming Unit V',
        image: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-16'),
        content: `
# File Handling: Data ko Zinda Rakhna

Variables mein data tab tak rehta hai jab tak program chal raha hai. Agar computer band ho gaya, to data gayab!
Isliye hum **Files** use karte hain permanent storage ke liye.

## 1. File Pointer
File ko control karne ke liye hum \`FILE *\` pointer ka use karte hain.
\`FILE * fptr; \`

## 2. Opening a File (fopen)
File ko kholne ke liye \`fopen() \` function lagta hai.
Syntax: \`ptr = fopen("filename", "mode"); \`

### File Modes (Tareeke)
| Mode | Description |
| :--- | :--- |
| **"r"** | Read mode. Agar file nahi mili to NULL return karega. |
| **"w"** | Write mode. Agar file nahi hai to nayi banayega. Purana data udd jayega! |
| **"a"** | Append mode. Purane data ke aage naya data jodega. |
| **"rb/wb"** | Binary files ke liye (Images/Music). |

## 3. Reading & Writing Functions
- **fprintf(fptr, ...)**: File mein likhne ke liye (Print).
- **fscanf(fptr, ...)**: File se padhne ke liye (Scan).
- **fputc('a', fptr)**: Ek character likhne ke liye.
- **fgetc(fptr)**: Ek character padhne ke liye.

## 4. Closing a File (fclose)
Kaam hone ke baad file band karna zaroori hai taaki data save ho sake aur memory leak na ho.
\`fclose(fptr); \`

### Complete Example:
\`\`\`c
    #include < stdio.h >
        void main() {
        FILE * fptr;
        fptr = fopen("test.txt", "w"); // File banayi/kholi
        fprintf(fptr, "Hello Coderafroj!"); // Data likha
        fclose(fptr); // File band ki
    }
    \`\`\`

## 5. Random Access (fseek, ftell)
Agar file ke beech mein direct jump karna ho:
- **fseek()**: Cursor ko kisi bhi position par le jane ke liye.
- **rewind()**: Cursor ko wapas shuru mein laye.
        `
    },
    {
        id: 'c-command-line-arguments',
        slug: 'c-command-line-arguments',
        title: 'Command Line Arguments',
        description: 'Main function ko arguments pass karna. argc aur argv[] ka concept.',
        tags: ['C', 'Advanced', 'System'],
        category: 'C Programming Unit V',
        image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-16'),
        content: `
# Command Line Arguments

Kya aap jante hain ki \`main()\` function bhi arguments le sakta hai? Jab hum command prompt se program run karte hain, tab hum values pass kar sakte hain.

## Syntax
\`\`\`c
int main(int argc, char *argv[]) {
    // code
}
\`\`\`

## Parameters
1. **argc (Argument Count)**: Kitne arguments pass kiye gaye hain. (Program ka naam bhi 1 count hota hai).
2. **argv[] (Argument Vector)**: Yeh strings ka array hai jisme arguments store hote hain.
   - \`argv[0]\`: Program ka naam.
   - \`argv[1]\`: Pehla argument.

## Example
Agar run karein: \`./app hello 10\`
- \`argc\` = 3
- \`argv[0]\` = "./app"
- \`argv[1]\` = "hello"
- \`argv[2]\` = "10"

Iska use tools banane mein hota hai (jaise \`ls -l\`, jahan \`-l\` ek argument hai).
        `
    },
    {
        id: 'c-structures',
        slug: 'c-structures',
        title: 'Structures in C',
        description: 'struct keyword, user-defined data types, aur complex data management.',
        tags: ['C', 'Data Structures', 'Advanced'],
        category: 'C Programming Unit IV',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-17'),
        content: `
# Structures: Apna Data Type Banao

Ab tak humne \`int\`, \`float\` dekha. Agar humein ek **Student** ka data store karna ho (Name, Roll No, Marks) toh hum alag-alag variables nahi banayenge, hum **Structure** use karenge.

## Definition
\`struct\` keyword use karke hum alag-alag data types ko ek bundle mein rakhte hain.

\`\`\`c
struct Student {
    char name[50];
    int roll;
    float marks;
};
\`\`\`

## Using Structure
\`\`\`c
void main() {
    struct Student s1; // Variable banaya
    s1.roll = 101;     // Dot (.) operator se access kiya
    strcpy(s1.name, "Rahul");
    s1.marks = 90.5;
    
    printf("Name: %s", s1.name);
}
\`\`\`

## Array of Structures
Puri class ka data store karne ke liye structure ka array bana sakte hain: \`struct Student batch[60];\`
        `
    },
    {
        id: 'c-unions',
        slug: 'c-unions',
        title: 'Unions: Memory Saving',
        description: 'Structure vs Union. Ek waqt par ek hi member active.',
        tags: ['C', 'Memory', 'Optimization'],
        category: 'C Programming Unit IV',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-17'),
        content: `
# Unions: Memory Bachat

Union dekhne mein Structure jaisa hi hota hai, lekin memory allocation mein fark hai.

## Structure vs Union
| Feature | Structure (\`struct\`) | Union (\`union\`) |
| :--- | :--- | :--- |
| **Memory** | Har member ko alag memory milti hai. Total size = Sum of all members. | Sabhi members **ek hi memory space** share karte hain. Size = Largest member size. |
| **Active Members** | Sabhi members ek saath value hold kar sakte hain. | Ek waqt par **sirf ek** member active reh sakta hai. |

## Syntax
\`\`\`c
union Data {
    int i;
    float f;
    char str[20];
};

union Data data;
data.i = 10;
data.f = 220.5; // Ab 'i' ki value corrupt ho jayegi kyunki memory overwrite ho gayi.
\`\`\`
        `
    },
    {
        id: 'c-enums-typedef',
        slug: 'c-enums-typedef',
        title: 'Enums & Typedef',
        description: 'Code readability badhana aur constants ke group banana.',
        tags: ['C', 'Syntax', 'Clean Code'],
        category: 'C Programming Unit IV',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-17'),
        content: `
# Keywords for Clean Code

## 1. Typedef (Type Definition)
Kisi bade data type ko chota naam dene ke liye.
- **Example**: \`unsigned long long int\` likhne ke bajaye hum uska nickname rakh sakte hain.
\`\`\`c
typedef unsigned long long int bigint;
bigint a = 100000;
\`\`\`

## 2. Enumeration (enum)
Constants ka group banane ke liye, jisse code padhna aasan ho. Integers ko naam dena.
- **Example**: Weekdays
\`\`\`c
enum Week { Sunday, Monday, Tuesday }; // 0, 1, 2...
enum Week today = Monday; // Value 1 hogi
if (today == Sunday) {
    printf("Chutti!");
}
\`\`\`
        `
    },
    {
        id: 'c-dynamic-memory',
        slug: 'c-dynamic-memory',
        title: 'Dynamic Memory Allocation (DMA)',
        description: 'malloc, calloc, realloc, free - Runtime par memory manage karna.',
        tags: ['C', 'Memory', 'Pointers'],
        category: 'C Programming Unit V',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-17'),
        content: `
# Dynamic Memory Allocation (DMA)

Ab tak humne \`int arr[100]\` banaya jo **Static** hai (Fixed size). Agar humein pata na ho ki kitna data aayega, toh hum **Runtime** par memory mangte hain.

Header file: \`<stdlib.h>\`

## 1. malloc() (Memory Allocation)
Ek bada memory block mangta hai. Values initialize nahi hoti (Garbage).
- Syntax: \`ptr = (int*) malloc(n * sizeof(int));\`

## 2. calloc() (Contiguous Allocation)
Array ke liye memory mangta hai aur sabko **0** se initialize karta hai.
- Syntax: \`ptr = (int*) calloc(n, sizeof(int));\`

## 3. realloc() (Re-Allocation)
Agar pehle mangi gayi memory kam pad gayi, toh size badhane ke liye.
- Syntax: \`ptr = realloc(ptr, new_size);\`

## 4. free()
Kaam khatam hone par memory wapas karna zaroori hai, nahi toh **Memory Leak** ho jayega.
- Syntax: \`free(ptr);\`
        `
    },
    {
        id: 'c-preprocessor',
        slug: 'c-preprocessor',
        title: 'Preprocessor Directives',
        description: '#define, Macros, File inclusion, aur compilation se pehle ka magic.',
        tags: ['C', 'System', 'Macros'],
        category: 'C Programming Unit V',
        image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-17'),
        content: `
# Preprocessor: Compiler se Pehle

Jo commands \`#\` se shuru hoti hain, wo **Preprocessor** ke liye hoti hain. Ye compilation start hone se pehle code ko modify karti hain.

## 1. Macro Substitution (#define)
Magic numbers ko naam dena aur chote functions banana.
- **Constant**: \`#define PI 3.14\` (Jahan bhi PI likha hoga, wahan 3.14 aa jayega).
- **Macro Function**: \`#define SQUARE(x) (x*x)\`

## 2. File Inclusion (#include)
Doosri files ka content apne program mein lane ke liye.
- \`#include <stdio.h>\`: Standard library files ke liye.
- \`#include "myfile.h"\`: User-defined (apni banayi hui) files ke liye.

## 3. Conditional Compilation
Kuch code sirf specific situations mein run karne ke liye.
\`\`\`c
#ifdef WINDOWS
    // Windows specific code
#else
    // Linux specific code
#endif
\`\`\`
        `
    }
];
