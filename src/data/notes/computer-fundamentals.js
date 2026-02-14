
export const computerFundamentals = {
    id: 'computer-fundamentals',
    title: 'Computer Fundamentals',
    description: 'The foundation of CS. Hardware, Operating Systems, Number Systems, and Internet Basics.',
    topics: [
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

## ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Characteristics of Computers (Khaasiyat)

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
| **Oval** | ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¢ | Start / Stop |
| **Parallelogram** | ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ± | Input (Lean) / Output (Print) |
| **Rectangle** | ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ­ | Processing (Calculation like \`a = b + c\`) |
| **Diamond** | ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ | Decision (Kya \`a > b\` hai? Yes/No) |
| **Arrows** | ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ¡ | Flow ki disha |

### Example Logic: Even or Odd Number
1. **Start**
2. **Input**: Number lo (\`n\`).
3. **Decision**: Kya \`n % 2 == 0\` hai?
   - **Yes**: Print "Even"
   - **No**: Print "Odd"
4. **Stop**
            `
        },
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
        }
    ]
};
