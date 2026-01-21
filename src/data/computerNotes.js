const originalStaticNotes = [
    {
        id: 'computer-definition',
        slug: 'computer-definition',
        title: 'Definition of Computer & Characteristics',
        description: 'Computer kya hai? Iski taqat (Characteristics) aur fundamental role ko saral bhasha mein samjhein.',
        tags: ['Basics', 'Fundamentals'],
        category: 'Computer Science',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-15'),
        content: `
# Computer: Ek Intelligent Machine

**Computer** ek aisi electronic device hai jo humse "Raw Data" (input) leti hai, uspar humari di gayi "Instructions" (programs) ke mutabik kaam karti hai, aur humein ek "Meaningful Result" (output) deti hai.

### Computer Kaise Kaam Karta Hai? (IPO Cycle)
1. **Input**: Data enter karna (Keyboard/Mouse se).
2. **Process**: CPU mein calculations aur logic apply hona.
3. **Output**: Result monitor par dikhna ya printer se nikalna.
4. **Storage**: Future use ke liye save karna.

---

## 🚀 Characteristics of Computers (Khaasiyat)

1. **Speed (Raftaar)**: Computer millions of calculations sirf 1-2 seconds mein kar leta hai.
2. **Accuracy (Sateekta)**: Computer kabhi galti nahi karta (GIGO - Garbage In, Garbage Out).
3. **Diligence (Lagat)**: Insaan thak jata hai, par computer 24x7 bina thake kaam kar sakta hai.
4. **Versatility (Bahumukhi)**: Ek hi waqt par aap kai alag-alag kaam kar sakte hain.
5. **Storage (Yadaasht)**: Iski memory bahut badi hoti hai.

---

## Evolution: Abacus se AI tak
- **Charles Babbage**: Inhe "Father of Computer" kaha jata hai kyunki unhone modern computer ka base banaya.
        `
    },
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
        id: 'operating-system-deep-dive',
        slug: 'operating-system-deep-dive',
        title: 'Operating System: The Master Manager',
        description: 'OS ke functions, types (Multitasking, Real-time) aur modern processing concepts.',
        tags: ['OS', 'Software', 'Theory'],
        category: 'Operating Systems',
        image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-15'),
        content: `
# Operating System (OS) Overview

**Operating System** wo software hai jo hardware aur user ke beech ek bridge banata hai. Iske bina computer sirf lohe ka dabba hai.

## Mukhya Kaam (Functions)
1. **Process Management**: CPU ko decide karna hota hai ki kaunsa program pehle chalega.
2. **Memory Management**: RAM aur Storage ko efficient tarike se use karna.
3. **I/O Management**: Keyboard, Disk, aur Monitor ke sath communication.
4. **User Interface**: Aapko icons ya commands dikhana.

---

## Advanced Processing Concepts
- **Multiprogramming**: Jab ek se zyada programs RAM mein hon taki CPU kabhi busy na rahe.
- **Multitasking**: Jab user ek waqt par music bhi sune aur typing bhi kare. OS time share karta hai.
- **Multithreading**: Ek hi program ke kai hisse (Threads) ek saath chalana.
- **Multiprocessing**: Ek computer mein 2 ya usse zyada CPU chips ka hona. 
- **Time-Sharing**: Har user ya process ko CPU ka barabar time milta hai.
- **Real-Time OS (RTOS)**: Fast responses chahiye hote hain (Example: Missile system, Airplanes).
- **Single-User vs Multi-User**: Aapka PC (Single) vs Servers ya Linux computers (Multi).
        `
    },
    {
        id: 'computer-virus-and-defense',
        slug: 'computer-virus-and-defense',
        title: 'Computer Viruses & Security',
        description: 'Vial threats, Malware types, aur antivirus kaise kaam karte hain.',
        tags: ['Security', 'Viruses'],
        category: 'Cyber Security',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-15'),
        content: `
# Computer Virus: Digital Khatra

**VIRUS (Vital Information Resources Under Siege)** ek aisi coding hai jo system ko nuksan pahunchati hai.

## Types of Viruses
- **Boot Sector Virus**: Booting files ko infect karta hai.
- **File Infector**: .exe aur .com files ko kharab karta hai.
- **Trojan Horse**: Achha ban kar aata hai, par andar se khatarnak hota hai.
- **Worm**: Apni copies khud banakar memory bhar deta hai.

## Characteristics (Pehchan)
- System slow ho jata hai.
- Files apne aap delete hone lagti hain.
- Unknown pop-ups aate hain.

## Defense: Anti-Virus
Software jo virus ko marta hai. (Example: QuickHeal, Avast, Windows Defender).
        `
    },
    {
        id: 'dos-mastery',
        slug: 'dos-mastery',
        title: 'Disk Operating System (DOS) Internals',
        description: 'DOS History, Versions, Disk Structure (FAT), aur System Files ki puri jankari.',
        tags: ['DOS', 'Systems', 'Internal'],
        category: 'Operating Systems',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-15'),
        content: `
# MS-DOS (Disk Operating System)

DOS ek CLI (Command Line Interface) based OS hai jo Microsoft ne banaya tha.

## History & Versions
- Sabse pehle 1981 mein aaya. Aajkal hum ise Windows ke "Command Prompt" (cmd) mein use karte hain.

## Physical Structure of Disk
Disk kafi hisson mein banti hoti hai:
- **Tracks**: Gol ghere.
- **Sectors**: Tracks ke tukde.
- **Clusters**: Data store karne ki smallest unit.

## FAT (File Allocation Table)
Yeh ek map ki tarah hai jo batata hai ki kaunsi file disk par kahan store hai. Windows mein aajkal NTFS use hota hai, par DOS mein FAT hota tha.

## System Files (Booting ke liye)
1. **IO.SYS**: Hardware control ke liye.
2. **MSDOS.SYS**: Core processing rules.
3. **COMMAND.COM**: Commands ko samajhne wala interpreter.

---

## Important Commands
- **DIR**: Folder list dekhna.
- **MD / RD**: Folder banana aur delete karna.
- **FORMAT**: Pura disk data saaf karna.
- **COPY**: Ek file dusri jagah bhejna.
        `
    },
    {
        id: 'windows-master-guide',
        slug: 'windows-master-guide',
        title: 'Windows Features & Workspace',
        description: 'Managing icons, files, folders, aur dual-window management.',
        tags: ['Windows', 'GUI', 'UI'],
        category: 'Operating Systems',
        image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-15'),
        content: `
# Windows GUI Mastery

Windows duniya ka sabse friendly GUI (Graphical User Interface) hai.

## Mukhya Features
- **My Computer / This PC**: Storage drives (C:, D:) ka control center.
- **Windows Explorer**: Files aur folders browse karne ka asaan tarika (Shortcut: \`Win + E\`).
- **Multiple Windows**: "Snap Layout" se 2 apps ek saath screen par chalayein.

## Desktop Organization
- **Icons**: Files ke chote images. Right-click karke aap inhe "Sort by Name/Size" kar sakte hain.
- **Taskbar**: Niche wala area jahan start menu aur open apps dikhte hain.

## Windows Accessories (Mukt Apps)
1. **Notepad**: Text likhne ke liye.
2. **Paint**: Drawing ke liye.
3. **WordPad**: Basic office typing.

## Entertainment Hub
- **Windows Media Player**: Songs aur movies ke liye.
- **Sound Recorder**: Voice record karne ke liye.
- **Volume Control**: Sound settings manage karna.

---

## Sessions Management
- **Shut Down**: Band karna.
- **Sleep**: Power bachana (state save rehti hai).
- **Restart**: Update ya error fix ke liye boot karna.
        `
    },
    // UNIT I
    {
        id: 'computing-environments',
        slug: 'computing-environments',
        title: 'Computing Environments: Digital Ecosystem',
        description: 'Personal, Time-Sharing, Client-Server, aur Distributed environments ka detailed breakdown.',
        tags: ['System Design', 'Architecture', 'Networking'],
        category: 'Computer Fundamentals',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-16'),
        content: `
# Computing Environments: Jahaan Code Chalta Hai

Computer sirf ek dabba nahi hai; yeh ek poora ecosystem hai. Aaiye dekhte hain alag-alag tarah ke environments.

## 1. Personal Computing Environment
Yeh sabse common hai. Aapka laptop ya desktop jisme saara hardware (CPU, RAM, HDD) aur software ek hi jagah hota hai.
- **Example**: Windows PC, MacBook.
- **Use**: Single user ke liye best.

## 2. Time-Sharing Environment
Yahan ek powerful Central Computer (Mainframe) hota hai jise kai users ek saath use karte hain.
- **Concept**: CPU apna time "slices" mein baant deta hai taaki har user ko lage ki computer sirf usi ka kaam kar raha hai.
- **Use**: Bade offices ya universities mein.

## 3. Client-Server Environment (Web Logic)
Isme kaam do hisson mein bat jata hai:
- **Client**: Aapka computer jo "Request" bhejta hai (Jaise browser).
- **Server**: Powerful computer jo "Response" deta hai (Jaise Google ka server).
- **Example**: Jab aap Facebook kholte hain, aap client hain aur Facebook ka database server hai.

## 4. Distributed Environment (Cloud Power)
Yahan processing ek jagah nahi hoti. Kai saare computers (nodes) network se jude hote hain aur mil kar ek bada task complete karte hain.
- **Benefit**: Agar ek computer kharab bhi ho jaye, toh system chalta rehta hai like **Blockchain** or **Cloud Computing**.
        `
    },
    {
        id: 'computer-languages-types',
        slug: 'computer-languages-types',
        title: 'Computer Languages: Machine vs Human',
        description: 'Low Level (Binary/Assembly) se High Level (C/Java) tak ka safar.',
        tags: ['Compilers', 'Programming', 'Basics'],
        category: 'Computer Fundamentals',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-16'),
        content: `
# Computer Languages: Baat Karne Ka Tarika

Jaise hum Hindi ya English bolte hain, computers ki apni bhasha hoti hai.

## 1. Low Level Languages (Machine ke kareeb)
- **Machine Language (The Binary Truth)**: Sirf **0** aur **1**. Computer sirf yahi samajhta hai. Fast hoti hai par insaan ke liye padhna namumkin jaisa hai.
- **Assembly Language (Mnemonics)**: Thoda behtar. Isme hum codes use karte hain jaise \`ADD\`, \`SUB\`, \`MOV\`. Isse "Assembler" machine code mein badalta hai.

## 2. High Level Languages (Insaan ke kareeb)
Yeh English jaisi hoti hain. Likhna aur samajhna asaan hai.
- **Examples**: C, C++, Java, Python.
- **Translator Chahiye**: High level code ko machine code mein badalne ke liye **Compiler** ya **Interpreter** lagta hai.

| Feature | Machine Language | High Level Language |
|---------|------------------|---------------------|
| User Friendly | Bilkul nahi | Bahut zyada |
| Speed | Super Fast | Thoda Slow (Translation chahiye) |
| Hardware Knowledge | Zaroori hai | Zaroori nahi |
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
    {
        id: 'algorithms-flowcharts-logic',
        slug: 'algorithms-flowcharts-logic',
        title: 'Logic Building: Algorithms & Flowcharts',
        description: 'Problem solving ka blueprint. Flowchart symbols aur Pseudocode likhna sikhein.',
        tags: ['Logic', 'Design', 'Flowchart'],
        category: 'Computer Fundamentals',
        image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-16'),
        content: `
# Algorithms & Flowcharts: Coding se Pehle

Code likhne se pehle Logic banana zaroori hai.

## Algorithm (Step-by-Step Plan)
Algorithm ek recipe ki tarah hai. Seedhi English mein steps likho.
**Example: Chai banane ka Algorithm**
1. Start.
2. Pani ubaalo.
3. Chini aur patti dalo.
4. Doodh dalo.
5. Serve karo.
6. Stop.

## Flowchart (Chitra)
Algorithm ko diagram mein dikhana Flowchart kehlata hai. Iske specific symbols hote hain:

| Symbol | Shape | Meaning |
| :--- | :--- | :--- |
| **Oval** | 🟢 | Start / Stop |
| **Parallelogram** | ▱ | Input (Lean) / Output (Print) |
| **Rectangle** | ▭ | Processing (Calculation like \`a = b + c\`) |
| **Diamond** | ◇ | Decision (Kya \`a > b\` hai? Yes/No) |
| **Arrows** | ➡ | Flow ki disha |

### Example Logic: Even or Odd Number
1. **Start**
2. **Input**: Number lo (\`n\`).
3. **Decision**: Kya \`n % 2 == 0\` hai?
   - **Yes**: Print "Even"
   - **No**: Print "Odd"
4. **Stop**
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
    // UNIT I (Additional)
    {
        id: 'number-systems',
        slug: 'number-systems',
        title: 'Number Systems & Conversions',
        description: 'Binary, Octal, Decimal, Hexadecimal samjhein aur convert karein.',
        tags: ['Math', 'Digital Logic', 'Basics'],
        category: 'Computer Fundamentals',
        image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-17'),
        content: `
# Number Systems: Computer ki Ginati

Computer sirf 0 aur 1 samajhta hai, lekin humans Decimal (0-9) use karte hain.

## 1. Binary Number System (Base 2)
- Digits: **0, 1**
- Computer ki native bhasha.
- Example: \`1010\`

## 2. Decimal Number System (Base 10)
- Digits: **0-9**
- Humari daily life ki counting.

## 3. Octal Number System (Base 8)
- Digits: **0-7**
- 3 bits ka group hota hai.

## 4. Hexadecimal Number System (Base 16)
- Digits: **0-9** aur **A-F** (A=10, B=11... F=15)
- Memory addresses dikhane ke liye use hota hai (#FFFFFF colors bhi yehi hain).

## Conversions (Badlav)
- **Decimal to Binary**: Number ko 2 se divide karte jao aur remainders note karo.
- **Binary to Decimal**: 2 ki powers se multiply karke add karo ($2^0, 2^1...$).
        `
    },
    {
        id: 'input-output-devices',
        slug: 'input-output-devices',
        title: 'Input & Output Devices',
        description: 'Keyboard, Mouse, Printers, Plotters aur unka working mechanism.',
        tags: ['Hardware', 'I/O', 'Basics'],
        category: 'Computer Fundamentals',
        image: 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-17'),
        content: `
# Input & Output Devices

Computer se baat karne (Input) aur jawab lene (Output) ke liye devices.

## Input Devices (Aandar Bhejna)
1. **Keyboard**: Text type karne ke liye. (QWERTY layout).
2. **Mouse**: Pointing device (GUI control).
3. **Scanner**: Hard copy (paper) ko soft copy (image) mein badalta hai.
4. **Microphone**: Awaaz record karne ke liye.

## Output Devices (Bahar Dikhana)
1. **Monitor (VDU)**: Visuals dikhane ke liye. (LED, LCD).
2. **Printer**: Soft copy ko paper par chapne ke liye.
   - **Impact**: Dot Matrix (purana, shor karne wala).
   - **Non-Impact**: Laser, Inkjet (fast aur quiet).
3. **Speaker**: Audio sunne ke liye.
4. **Plotter**: Bade maps aur engineering drawings print karne ke liye.
        `
    },
    // UNIT IV
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
    // UNIT V
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
    },
    {
        id: 'pc-maintenance-troubleshooting',
        slug: 'pc-maintenance-troubleshooting',
        title: 'PC Maintenance & Troubleshooting: The Hardware Guide',
        description: 'Complete guide to PC assembly, disassembly, hardware components, and troubleshooting.',
        tags: ['Hardware', 'Maintenance', 'Troubleshooting'],
        category: 'Hardware & Maintenance',
        image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-18'),
        content: `
# PC Maintenance & Troubleshooting

Computer hardware ko samajhna aur maintain karna ek essential skill hai.

## 1. Opening the PC & Identification
PC cabinet (case) ko open karne se pehle power off karein aur cables unplug karein.
- **Side Panel**: Screws remove karke side panel halka slide karein.
- **Identification of Blocks**:
    - **SMPS (Power Supply)**: Top-left ya bottom-left corner mein bada box.
    - **Motherboard**: Badi circuit board jispar sab kuch laga hota hai.
    - **Storage (HDD/SSD)**: Front racks mein fix hote hain.
    - **RAM Slots**: Processor ke paas lambe slots.

## 2. Assembling & Disassembling
**Disassembling (Kholna)**:
1. Power cords remove karein.
2. Sabse pehle Add-on cards (GPU/WiFi) remove karein.
3. Power cables (24-pin, 4-pin CPU) unplug karein.
4. SATA cables aur Front panel connectors (USB, Power btn) hatayein.
5. Motherboard screws khol kar board bahar nikalein.

**Assembling (Jodna)**:
Iska ulta process follow karein. Dhyan rahe ki processor dhire se socket mein fit ho.

## 3. Basic Device Configuration
- **Monitor**: HDMI/VGA cable se GPU ya Motherboard port par connect karein.
- **Printer**: USB se connect karein aur Drivers install karein. "Devices & Printers" mein jaakar Default set karein.
- **Sound/Video Card**: PCIe slots mein lagayein aur screws se tight karein. Drivers update zaroor karein.

## 4. Components of Motherboard
Motherboard computer ki readh ki haddi (backbone) hai.
- **Processor Socket**: Jahan CPU lagta hai (LGA/AM4 etc).
- **RAM Slots (DIMM)**: Random Access Memory ke liye.
- **Chipset**: Traffic control karne wala hub (Northbridge/Southbridge).
- **BIOS/CMOS Battery**: Date aur time save rakhne ke liye chota cell.

## 5. Ports, Slots & Connectors
- **Ports (External)**:
    - **USB (Type-A/C)**: Universal connection.
    - **HDMI/DisplayPort**: Video output.
    - **Ethernet (RJ45)**: Internet cable.
    - **Audio Jacks**: Mic (Pink) aur Speaker (Green).
- **Slots (Internal)**:
    - **PCIe x16**: Graphics Card ke liye.
    - **M.2 Slot**: Fast NVMe SSD ke liye.
- **Connectors**:
    - **SATA**: Hard disk aur DVD drive ke liye.
    - **24-pin ATX**: Main power cable.

## 6. Storage Devices
- **Primary Storage (RAM/ROM)**: Fast lekin temporary (Volatile). Bina iske PC start nahi hoga.
- **Secondary Storage (HDD/SSD)**: Permanent storage.
    - **HDD**: Purani, sasti, lekin slow (Rotating disks).
    - **SSD**: Nayi, mehngi, lekin super fast (Flash memory).

## 7. Troubleshooting Tips
- **PC Start nahi ho raha**: Power cable check karein, SMPS fan ghum raha hai ya nahi dekhein.
- **No Display**: RAM nikal kar eraser se saaf karke wapas lagayein.
- **Blue Screen (BSOD)**: Driver issue ya Hardware fault ho sakta hai. Restart karke check karein.
- **Overheating**: CPU fan par dhool (dust) ho sakti hai, thermal paste change karein.
        `
    },
    {
        id: 'internet-web-technology',
        slug: 'internet-web-technology',
        title: 'Internet Mastery: Web, Security & Ethics',
        description: 'Internet ki duniya, security threats, emails, aur cyber laws ka detailed overview.',
        tags: ['Internet', 'Security', 'Networking'],
        category: 'Internet & Networking',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-18'),
        content: `
# Internet & Web Technology

**Internet**: Networks ka network. Ye duniya bhar ke computers ko connect karta hai taaki information share ho sake.

## 1. Key Definitions
- **WWW (World Wide Web)**: Internet par maujood saare webpages ka collection.
- **URL (Uniform Resource Locator)**: Kisi bhi website ka address. (Ex: \`https://google.com\`).
- **Web Browser**: Wo software jo internet chalane ke kaam aata hai (Chrome, Edge, Firefox).
- **IP Address**: Har computer ka internet par ek unique number (Pehchan). (Ex: \`192.168.1.1\`).
- **Domain Name**: IP address yaad rakhna mushkil hai, isliye hum naam use karte hain (Ex: \`facebook.com\`).
- **ISP (Internet Service Provider)**: Wo company jo internet deti hai (Jio, Airtel).

## 2. Internet Services
- **Search Engines**: Information dhundhne ke liye (Google, Bing).
- **Email**: Electronic chitti. Fast aur professional.
- **Intranet**: Ek private network jo sirf organization ke andar chalta hai.
- **Extranet**: Intranet ka wo hissa jo bahar ke kuch logon (partners) ke liye khula ho.

## 3. Email (Electronic Mail)
- **Advantages**: Free, Instant, Global access, Record keeping.
- **Disadvantages**: Spam/Junk mails, Internet zaroori hai, Virus aa sakte hain.
- **Address Format**: \`username@domain.com\` (Ex: \`student@university.edu\`).

## 4. Internet Security & Cyber Crimes
Internet par suraksha bahut zaroori hai.
- **Hacker**: Wo expert jo depth mein system jaanta hai.
    - *White Hat*: Achhe hackers jo security tight karte hain.
    - *Black Hat*: Bure hackers jo chori ya nuksan karte hain.
- **Cracker**: Jo sirf tod-fod (security break) karte hain bina kisi permission ke.
- **Cyber Crimes**: Internet par hone wale apradh.
    - **Phishing**: Fake email bhejkar password churana.
    - **Identity Theft**: Kisi aur ki pehchan use karna.
    - **Cyber Stalking**: Kisi ko online pareshan karna.

## 5. Net Etiquette (Internet Tameez)
- Kisi ko abusive language na use karein.
- **ALL CAPS** mein type na karein (Iska matlab chillana hota hai).
- Privacy ki respect karein. Doosron ki photos bina pooche share na karein.

## 6. Impact on Society
- **Education**: Online classes (Zoom), YouTube learning, eBooks.
- **Research**: Google Scholar, infinite knowledge access.
- **Social**: Facebook/Insta se connection, lekin real-life interaction kamm ho gaya hai.
        `
    },
    {
        id: 'word-processing-mastery',
        slug: 'word-processing-mastery',
        title: 'Microsoft Word: The Complete Documentation Guide',
        description: 'Word Processing concepts, formatting, mail-merge, tables, aur advanced features ka detailed guide.',
        tags: ['Word', 'Office', 'Documentation'],
        category: 'Office Automation',
        image: 'https://images.unsplash.com/photo-1585241936939-be05368a5bc3?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-19'),
        content: `
# Word Processing (MS Word)

**Word Processing** ka matlab hai computer par text likhna, edit karna, aur format karna.

## 1. Introduction
Pehle hum Typewriter use karte the, jisme galti sudharna mushkil tha. Word Processors ne ise aasan bana diya.
- **Common Software**:
    - **Microsoft Word**: Sabse popular aur powerful.
    - **WordPad**: Basic features ke sath (Windows mein free).
    - **Notepad**: Sirf plain text ke liye.
    - **Google Docs**: Online collaboration ke liye.

## 2. Features of MS Word
- **Creating**: Naya document banana.
- **Editing**: Text add karna, delete karna, copy-paste karna.
- **Formatting**: Text ko sundar dikhana (Bold, Italic, Color).
- **Graphics**: Images aur charts lagana.

## 3. Toolbars (The Interface)
- **Standard Toolbar**: Common kaam jaise New, Open, Save, Print, Cut, Copy, Paste ke icons yahan hote hain.
- **Formatting Toolbar**: Text ka look badalne ke liye (Font Style, Size, Bold, Center Alignment).
- **Drawing Toolbar**: Shapes, Lines, Arrows aur Colors ke liye.

## 4. Document Formatting
- **Text**: Font face (Arial, Times New Roman), Size (12, 14), Color.
- **Paragraph**: Alignment (Left, Right, Center, Justify), Line Spacing.
- **Header & Footer**: Page ke upar (Header) ya neeche (Footer) content jo har page par repeat ho (Ex: Page Number, Chapter Name).
    - *Insert -> Header/Footer*.

## 5. Advanced Features
- **Find & Replace**: Pure document mein koi word dhundhna (Find) aur use dusre word se badalna (Replace). (Shortcut: \`Ctrl + H\`).
- **Spell Check**: Grammatical aur Spelling mistakes dhoondhna. Red line = Spelling Error, Blue/Green = Grammar Error. (Shortcut: \`F7\`).
- **Thesaurus**: Synonyms (paryaywachi) dhoondhne ke liye dictionary.

## 6. Pictures & Tables
- **Inserting Pictures**: Apne document ko visual banane ke liye images add karna.
- **Working with Tables**: Data ko Rows aur Columns mein dikhana.
    - *Insert -> Table*.
    - Cells ko merge ya split bhi kar sakte hain.

## 7. Mail Merge (Mass Mailing)
Ek hi letter hajaron logon ko alag-alag naam aur address ke sath bhejne ka tareeka.
1. **Main Document**: Jo letter likhna hai.
2. **Data Source**: Logon ki list (Naam, Address).
3. **Merge**: Word in dono ko mila kar sabke liye alag letter bana deta hai.
        `
    },
    {
        id: 'powerpoint-presentation-guide',
        slug: 'powerpoint-presentation-guide',
        title: 'PowerPoint Mastery: Creating Impactful Slides',
        description: 'Presentation banana, Animations, Transitions, aur Slide Views ka masterclass.',
        tags: ['PowerPoint', 'Presentation', 'Office'],
        category: 'Office Automation',
        image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-19'),
        content: `
# PowerPoint Presentation (PPT)

Ideas ko visuals aur text ke zariye logon ke samne prastut karna **Presentation** kehlata hai.

## 1. Creating a Presentation
- **Auto-Content Wizard**: (Purane versions mein) Ye aapse topic puchta tha aur bana-banaya template deta tha.
- **Blank Presentation**: Scratch se start karna.
- **Design Template**: Bani-banayi designs use karna.

## 2. Views in PowerPoint
Apni slides ko alag-alag tarike se dekhne ke liye:
- **Normal View**: Editing ke liye (Slide + Outline).
- **Slide Sorter View**: Saari slides choti hokar ek screen par dikhti hain. Order change karne ke liye best hai.
- **Slide Show View**: Full screen presentation (Shortcut: \`F5\`).
- **Notes Page View**: Slide ke neeche speaker ke liye notes likhne ki jagah.

## 3. Formatting & Enhancements
- **Text**: Font, Size, Color change karna.
- **Bullets**: Points ko list mein dikhana.
- **ClipArt & WordArt**:
    - *ClipArt*: Bani-banayi images.
    - *WordArt*: Stylish text effects.
- **Graph/Charts**: Data ko visual form mein dikhana.

## 4. Animation & Transitions
- **Slide Transition**: Jab ek slide jaati hai aur dusri aati hai, tab jo effect aata hai (Ex: Fade, Wipe).
- **Custom Animation**: Slide ke andar ke objects (Text, Image) kaise aayenge (Ex: Fly In, Bounce).
- **Setting Timings**: Har slide kitni der rukegi, ye automatic set karna.

## 5. Final Output
- **Handouts**: Audience ko dene ke liye slides ka printout (Ek page par 3-6 slides).
- **Speaker Notes**: Sirf apke padhne ke liye points.
- **Saving**: \`.pptx\` format mein save karein.
        `
    },
    {
        id: 'excel-spreadsheet-mastery',
        slug: 'excel-spreadsheet-mastery',
        title: 'Excel Spreadsheet Mastery: Data & Analysis',
        description: 'Excel mein data entry, formulas, charts, macros, aur advanced formatting ka complete roadmap.',
        tags: ['Excel', 'Data Analysis', 'Office'],
        category: 'Office Automation',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-20'),
        content: `
# Spreadsheet (Microsoft Excel)

**Spreadsheet** ek electronic worksheet hai jo data ko Rows aur Columns mein organize karti hai. Iska use calculation aur data analysis ke liye hota hai.

## 1. Definition & Advantages
- **Definition**: Ek bada grid jisme boxes (Cells) hote hain. Har cell mein text, number ya formula aa sakta hai.
- **Advantages**:
    - Automatic Calculations (Formula badalte hi result badal jata hai).
    - Data Sorting aur Filtering.
    - Graphical Representation (Charts).
    - Large Data Handling.

## 2. Working on Spreadsheets
- **Workbook & Worksheet**: 
    - Workbook ek file hai (Book).
    - Worksheet us book ka ek page hai. Default 3 sheets hoti hain (Sheet1, Sheet2, Sheet3).
- **Cell Referencing**: Har cell ka ek pata (Address) hota hai.
    - **Relative**: \`A1\` (Formula copy karne par address badal jata hai).
    - **Absolute**: \`$A$1\` (Formula copy karne par address fix rehta hai).
    - **Mixed**: \`$A1\` ya \`A$1\` (Ek cheez fix, ek relative).
- **Range**: Cells ka group (Ex: \`A1:B10\`).

## 3. Data Entry & Formatting
- **Data Types**: Text (Labels), Numbers (Values), Date & Time.
- **Entering Data**: Cell par click karein aur type karein.
- **Formatting**:
    - **Merge & Center**: Heading banane ke liye cells ko jodna.
    - **Wrap Text**: Lambe text ko ek hi cell mein fit karna (multiple lines).
    - **Conditional Formatting**: Values ke hisab se color badalna (Ex: Marks < 33 to Red).

## 4. Functions (Formulas)
Excel ka dimaag uske formulas hain. Formula hamesha \`=\` se shuru hota hai.
- **Mathematical**: \`SUM()\`, \`AVERAGE()\`, \`MAX()\`, \`MIN()\`, \`ROUND()\`.
- **Text**: \`UPPER()\` (Capital), \`LOWER()\`, \`CONCATENATE()\` (Join strings).
- **Date/Time**: \`NOW()\` (Current Time), \`TODAY()\` (Aaj ki date).
- **Logical**: \`IF()\` (Condition check).
    - Ex: \`=IF(A1>33, "Pass", "Fail")\`.

## 5. Advanced Features
- **Macros**: Repetitive kaam ko record karke ek click mein karna. 
    - *View -> Macros -> Record Macro*.
- **Database Handling**:
    - Start mein Heading (Field Name) honi chahiye.
    - **Sort**: Data ko A-Z ya Z-A lagana.
    - **Filter**: Sirf specific data dekhna.
- **Protecting Worksheet**: File ko password se lock karna taaki koi edit na kar sake.
    - *Review -> Protect Sheet*.

## 6. Graphs & Printing
- **Charts/Graphs**: Data ko visual banana.
    - **Column Chart**: Comparison ke liye.
    - **Pie Chart**: Percentage dikhane ke liye (Hissa).
    - **Line Chart**: Trend dikhane ke liye (Kaise badha/ghata).
- **Printing**:
    - **Page Setup**: Margins aur Orientation (Portrait/Landscape) set karna.
    - **Print Area**: Sirf select kiya hua hissa print karna.
    - **Header/Footer**: Page ke upar/neeche date ya page number lagana.
        `
    },
    {
        id: 'iot-fundamentals-vision',
        slug: 'iot-fundamentals-vision',
        title: 'IoT Fundamentals & The Smart Vision',
        description: 'Internet of Things ka core concept, M2M vs IoT, aur Smart Objects ki classification.',
        tags: ['IoT', 'Basics', 'M2M', 'Future Tech'],
        category: 'Internet of Things',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-17'),
        content: `
# Internet of Things (IoT): The Global Vision

**Internet of Things (IoT)** sirf devices ko connect karna nahi hai, balki ek aisa "Ecosystem" hai jahan har physical object internet ka ek endpoint ban jata hai.

### 🌟 M1: The Basic Definition
IoT ka matlab hai: "A network of physical objects embedded with sensors, software, and other technologies for the purpose of connecting and exchanging data with other devices and systems over the internet."

### 🆚 M2M (Machine to Machine) vs IoT
| Feature | M2M (Machine to Machine) | IoT (Internet of Things) |
|---------|--------------------------|--------------------------|
| **Connectivity** | Point-to-point (Isolated) | Network-based (Cloud) |
| **Communication** | Closed system (Proprietary) | Open standards (IP-based) |
| **Scalability** | Limited | Massive (Trillions) |

\`\`\`mermaid
graph LR
    subgraph M2M
    D1[Device A] --- D2[Device B]
    end
    subgraph IoT
    D3[Device] --- C[Cloud/Internet] --- D4[App/User]
    end
\`\`\`

---

### 🧱 Framework Equations (Raj Kamal)
IoT ko mathematical terms mein aise samjhein:
1. **Basic**: \`Physical Object + Controller + Sensors + Actuators + Internet = IoT\`
2. **Enterprise**: \`Gather + Enrich + Stream + Manage + Acquire + Analyse = IoT\`

- **Enrich**: Data ko gateway par clean aur transcode karna.
- **Stream**: Message queue se data distribute karna.
        `
    },
    {
        id: 'iot-architecture-frameworks',
        slug: 'iot-architecture-frameworks',
        title: 'IoT Architecture & Standard Models',
        description: 'CISCO 7-Layer, IEEE P2413, aur multi-tiered architectures ka deep-dive.',
        tags: ['Architecture', 'IoT', 'CISCO', 'Standards'],
        category: 'Internet of Things',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-17'),
        content: `
# IoT Architecture: Multi-Layered Frameworks

IoT architecture complex hoti hai kyunki isme hardware aur cloud dono ko merge karna padta hai.

## 🏢 1. CISCO IoT Reference Model (7 Layers)
CISCO ne IoT ko 7 layers mein divide kiya hai:

\`\`\`mermaid
graph BT
    L1[Layer 1: Physical Devices] --- L2[Layer 2: Connectivity]
    L2 --- L3[Layer 3: Edge Computing]
    L3 --- L4[Layer 4: Data Accumulation]
    L4 --- L5[Layer 5: Data Abstraction]
    L5 --- L6[Layer 6: Application]
    L6 --- L7[Layer 7: Collaboration & Processes]
\`\`\`

- **Edge Computing (Layer 3)**: Data ko cloud par bhejne se pehle filter karna.
- **Data Abstraction (Layer 5)**: Alag-alag sources se aaye data ko ek format mein lana.

---

## 🏗️ 2. IEEE P2413 Standard
Yeh global "Blueprint" hai jo interoperability (alag devices ka saath kaam karna) solve karta hai.

### 🛡️ The Quadruple Trust
IEEE focus karta hai:
- **Protection**: Physical damage se bachao.
- **Security**: Data encryption aur safety.
- **Privacy**: User ki identity chupa ke rakhna.
- **Safety**: Physically kisi ko nuksaan na ho (like in robots).
        `
    },
    {
        id: 'iot-protocols-communication',
        slug: 'iot-protocols-communication',
        title: 'IoT Protocols: Networking & Standards',
        description: 'IPv6, 6LoWPAN, CoAP, aur MQTT protocols ka technical analysis.',
        tags: ['Protocols', 'CoAP', 'MQTT', '6LoWPAN'],
        category: 'Internet of Things',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-17'),
        content: `
# IoT Protocols: The Language of Things

## 🌉 1. 6LoWPAN (Adaptation Layer)
**IPv6 over Low-Power Wireless Personal Area Networks.**
127-byte ke frames par 128-bit IPv6 chalana mushkil tha. 6LoWPAN ise solve karta hai:
- **Header Compression**: IP header ko 40 bytes se 2-3 bytes tak lana.
- **Fragmentation**: Large packets ko chote "Fragments" mein todna.

---

## 🚀 2. CoAP: The HTTP for IoT
CoAP (Constrained Application Protocol) binary format use karta hai.

| Feature | HTTP | CoAP |
|---------|------|------|
| **Transport** | TCP (Heavy) | UDP (Light) |
| **Format** | Text | Binary |

---

## 📡 3. MQTT: Publish/Subscribe
\`\`\`mermaid
sequenceDiagram
    participant S as Sensor
    participant B as MQTT Broker
    participant D as Admin Panel
    S->>B: Publish (/temperature : 30C)
    B->>D: Notify Subscriber
\`\`\`

- **QoS Level 1**: Kam se kam ek baar data pahunchna chahiye.
- **QoS Level 2**: Exact ek baar data pahunchna chahiye (No duplicates).
        `
    },
    {
        id: 'iot-hardware-mcu-units',
        slug: 'iot-hardware-mcu-units',
        title: 'IoT Hardware: MCU & Sensor Units',
        description: 'ADC, PWM, GPIO, Timers aur Wireless Sensor Network (WSN) topologies.',
        tags: ['Hardware', 'WSN', 'MCU', 'Sensors'],
        category: 'Internet of Things',
        image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-17'),
        content: `
# IoT Hardware: Under the Hood

## 🧠 1. Microcontroller Functional Units
Ek IoT MCU (ESP32/Arduino) mein yeh units hote hain:
- **ADC**: Analog sensor data (voltage) ko digital mein badalna.
- **PWM**: Motor speed ya Light dimming ke liye pulses bhejna.
- **Timers**: Exact waqt par interrupt generate karna.

---

## 🛰️ 2. Wireless Sensor Networks (WSN)
WSN ek group hai sensors ka jo environment sensing karte hain.

\`\`\`mermaid
graph TD
    N1((Node)) --- N2((Node))
    N2 --- G[Sink/Gateway]
    N3((Node)) --- G
    N1 --- N4((Node))
    N4 --- G
\`\`\`

### 🏷️ RFID (Tracking)
- **Passive**: Reader se power leta hai (No battery).
- **Active**: Apni battery hoti hai (Long range up to 100m).
        `
    },
    {
        id: 'iot-service-discovery-logic',
        slug: 'iot-service-discovery-logic',
        title: 'IoT Logic: Discovery & Session Initiation',
        description: 'Discovery protocols (mDNS, DNS-SD), CoRE Resource Directory aur SIP.',
        tags: ['Discovery', 'mDNS', 'SIP', 'CoRE'],
        category: 'Internet of Things',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-17'),
        content: `
# IoT Logic: Discovery & Sessions

## 🔍 1. Service Discovery
Devices ko ek dusre ko find karne ke liye discovery chahiye.
- **mDNS**: Bina server ke hostnames resolve karna.
- **DNS-SD**: "Printer" ya "Sensor" service ko network par identify karna.

## 📚 2. CoRE Resource Directory (RD)
Constrained environments ke liye:
1. **Registration**: Device apna "Type" aur "Address" RD ko batata hai.
2. **Lookup**: Client RD se puchta hai ki "Temperature sensor kahan hai?".

---

## 📞 3. SIP (Session Initiation)
SIP sessions banata hai, modify karta hai aur khatam karta hai. IoT mein webcam streaming ya real-time calls ke liye use hota hai.
        `
    },
    {
        id: 'iot-data-processing',
        slug: 'iot-data-processing',
        title: 'Data Processing & Analytics in IoT',
        description: 'OLTP vs OLAP, NoSQL vs SQL, aur real-time data streaming logic.',
        tags: ['Data', 'Analytics', 'NoSQL', 'Big Data'],
        category: 'Internet of Things',
        image: 'https://images.unsplash.com/photo-1551288049-bbda38a5f973?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-17'),
        content: `
# Data Analytics: Processing the Flood

IoT trillions of records generate karta hai. Iska processing do tarah ka hota hai:

## 📊 1. OLTP vs OLAP
- **OLTP (Online Transaction Processing)**: Immediate updates (e.g., current temp).
- **OLAP (Online Analytical Processing)**: Purana data analyze karke patterns nikalna (e.g., past 1 year usage).

## 🗄️ 2. NoSQL for IoT
Standard SQL databases (MySQL) IoT ke high speed data ko handle nahi kar sakte.
- **Key-Value Stores**: Redis, Cassandra.
- **Document Stores**: MongoDB (Unstructured sensor metadata ke liye).

---

## 📈 3. Real-time Streaming
Data ko 'At Rest' store karne ke bajaye 'In Motion' analyze karna (e.g., Apache Kafka/Spark).
\`\`\`mermaid
graph LR
    S[Sensors] --> Q[Message Queue]
    Q --> P[Stream Processor]
    P --> D[Dashboard]
    P --> DB[Long-term DB]
\`\`\`
        `
    },
    {
        id: 'iot-cloud-computing',
        slug: 'iot-cloud-computing',
        title: 'IoT Cloud Computing & Platforms (PaaS)',
        description: 'AWS IoT, IBM BlueMix, aur Azure IoT Hub. Cloud Computing ka connectivity model.',
        tags: ['Cloud', 'Cloud Computing', 'AWS', 'PaaS', 'Connectivity'],
        category: 'Internet of Things',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-17'),
        content: `
# IoT on Cloud: Scaling the Edge

Cloud platforms (PaaS) humein storage, computing aur device management dete hain.

## ☁️ 1. Main Components
- **Device Shadows**: Device offline hone par bhi uska "Last state" cloud par save rehta hai.
- **Rules Engine**: Agar sensor value > 100, toh alert bhej do!
- **Device Gateway**: Multitude of protocols ko handle karna.

## 🏢 2. Major Platforms
1. **AWS IoT**: Highly scalable, Lambda integrated.
2. **IBM Watson IoT**: Cognitive (AI) abilities ke saath.
3. **Microsoft Azure IoT**: Enterprise management ke liye best.

---

## 🔀 3. Connectivity Models (Raj Kamal)
1. **D2D (Device to Device)**: Direct communication.
2. **D2G (Device to Gateway)**: Bridge ke zariye.
3. **D2C (Device to Cloud)**: Direct MQTT connection.
        `
    },
    {
        id: 'iot-security-solutions',
        slug: 'iot-security-solutions',
        title: 'IoT Security, Privacy & Vulnerabilities',
        description: 'DTLS, IPsec, aur "Quadruple Trust" implementation patterns.',
        tags: ['Security', 'DTLS', 'Privacy', 'Encryption'],
        category: 'Internet of Things',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-17'),
        content: `
# IoT Security: The Silent Guardian

IoT devices hacked hone ka khatra sabse zyada hai.

## 🛡️ 1. Secure Communication Protocols
- **DTLS (Datagram TLS)**: UDP par data encrypt karne ke liye (CoAP ke saath).
- **IPsec**: Network layer par tunnel banana.
- **TLS**: TCP base connections (MQTT over SSL).

## 🔐 2. Privacy Techniques
- **Data Anonymization**: User ka naam aur location reveal na hone dena.
- **Pseudonymization**: Temporary IDs ka use karna.

---

## ☣️ 3. Vulnerabilities
1. **Physical Attack**: Device ko churana ya reset karna.
2. **Eavesdropping**: Data packtes ko beech mein read karna.
3. **DoS (Denial of Service)**: Network ko overload karna.

\`\`\`mermaid
graph TD
    T[Threats] --> P[Physical]
    T --> N[Network]
    T --> A[Application]
    subgraph Defenses
    D[Encryption]
    I[Identity Management]
    E[End-to-End Security]
    end
\`\`\`
        `
    },
    {
        id: 'iot-business-iiot',
        slug: 'iot-business-iiot',
        title: 'Industrial IoT (IIoT) & Business Models',
        description: 'Industry 4.0, Predictive maintenance, Asset tracking aur M2M billing logic.',
        tags: ['IIoT', 'Industrial IoT', 'Business', 'Industry 4.0'],
        category: 'Internet of Things',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-17'),
        content: `
# IIoT: Industry 4.0 Transformation

**Industrial IoT (IIoT)** factories ko smart banata hai.

## 🏭 1. Industry 4.0 Pillars
- **Interoperability**: Sab machines ek dusre se baat karein.
- **Digital Twins**: Physical machine ka digital copy jo cloud pe simulate ho sake.
- **Decentralized Decisions**: Machines khud small decisions le sakein.

## 💰 2. Business Revenue Models
1. **Product as a Service**: Machine bechne ke bajaye usage (hours) par paise lena.
2. **Predictive Maintenance**: Machine kharab hone se pehle engineer bhej dena (Cost saving).

---

## 📦 3. Asset Tracking (SCOVARS)
**Supply Chain Order Verification and Resource System.**
Real-time tracking ki madad se inventory aur loss ko 90% tak kam kiya ja sakta hai.
        `
    },
    {
        id: 'iot-case-studies-advanced',
        slug: 'iot-case-studies-advanced',
        title: 'Advanced IoT Case Studies',
        description: 'Smart Farming, Smart Cities, aur E-Health ki implementation details.',
        tags: ['Case Study', 'Smart Cities', 'Agriculture', 'Health'],
        category: 'Internet of Things',
        image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-17'),
        content: `
# Real World IoT Case Studies

## 🚜 1. Smart Farming (Precision Agriculture)
- **Soil Sensors**: Mitti ka NPK levels (Nitrogen, Phosphorus, Potassium) check karna.
- **Precision Irrigation**: Sirf usi tree ko pani dena jise zaroorat hai.

## 🏥 2. E-Health (Remote Care)
Wearable monitors jo heart-beat pattern analyze karte hain. Agar pattern abnormal hai:
1. Trigger Emergency Alert.
2. GPS location family aur doctor ko bhejna.

---

## 🏙️ 3. Smart City (Integrated Services)
- **Smart Parking**: App se slot book karna.
- **Waste Management**: Bin levels track karke optimal route banana kachre ki gaadi ke liye.

\`\`\`mermaid
graph TD
    SC[Smart City] --> P[Infrastructure]
    SC --> G[Governance]
    SC --> E[Environment]
    P --> Lighting
    P --> Transport
    E --> Waste
    E --> AirQuality
\`\`\`
            `
    },
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
    }
];

// Python Data Types Expansion
const pythonDataTypes = [
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
];

export const staticNotes = [...originalStaticNotes, ...pythonDataTypes];




