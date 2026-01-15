export const staticNotes = [
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
4. **Versatility (Bahumukhi)**: ek hi waqt par aap kai alag-alag kaam kar sakte hain.
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
#include <stdio.h> // Standard Input Output Header
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
- **Invalid Example**: \`1record\`, \`my-name\`

---

## 32 Keywords in C
C language mein 32 words reserved hain jinhe hum variable name ki tarah use nahi kar sakte (Example: \`auto\`, \`break\`, \`int\`, \`return\`).
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
    }
];
