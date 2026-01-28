export const internet = [
    {
        id: 'internet-basics-history',
        slug: 'internet-basics-history',
        title: 'Internet Basics: History & Architecture',
        description: 'Internet kya hai? WWW, IP Address, DNS, aur URL ka complete breakdown.',
        tags: ['Internet', 'Web', 'Basics', 'Network'],
        category: 'Internet & Web Technology',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-20'),
        content: `
# Internet & Web Technology: The Global Network

Internet aaj ki duniya ka nervous system hai.

## 1. What is Internet?
**Internet** (Interconnected Network) networks ka network hai jo duniya bhar ke computers ko jodta hai.
- **History**: 1969 mein **ARPANET** (Advanced Research Projects Agency Network) se shuru hua tha (US Defence).
- **Owner**: Internet ka koi ek malik nahi hai. Ise organizations like **ICANN** (Internet Corporation for Assigned Names and Numbers) manage karti hain.

## 2. Core Concepts
- **WWW (World Wide Web)**: Tim Berners-Lee ne 1989 mein banaya. Ye internet par pages (Documents) ka collection hai jo Hypertext (Links) se juda hai.
- **Web Browser**: Woh software jo web pages dikhata hai (Chrome, Firefox, Edge).
- **Web Server**: Woh powerful computer jahan website ki files store hoti hain (24/7 online).

## 3. How Internet Works? (Technical)
Jab aap browser mein "google.com" likhte hain, to kya hota hai?

\`\`\`mermaid
graph TD
    User[User Browser] -- Request --> DNS[DNS Server]
    DNS -- IP Address --> User
    User -- HTTP Request --> Server[Google Server]
    Server -- HTML/CSS --> User
\`\`\`

1.  **URL (Uniform Resource Locator)**: Website ka address.
2.  **DNS (Domain Name System)**: Internet ki Phonebook. Ye "google.com" ko IP Address (e.g., 142.250.193.78) mein badalta hai.
3.  **IP Address**: Har device ka unique number (Identity).

## 4. Connecting to Internet
- **ISP (Internet Service Provider)**: Woh company jo net deti hai (Jio, Airtel).
- **Modem**: Modulator-Demodulator. Telephone line ke analog signal ko digital mein badalta hai.
- **Router**: Data packets ko sahi raaste (route) se bhejta hai aur WiFi provide karta hai.

## 5. Web Technologies
- **HTML**: Structure (Haddi).
- **CSS**: Styling (Kapde/Makeup).
- **JavaScript**: Logic (Dimaag/Actions).
- **Protocol (HTTP/HTTPS)**: Rules jinse data travel karta hai. (S = Secure).
        `
    },
    {
        id: 'html5-semantics-forms',
        slug: 'html5-semantics-forms',
        title: 'HTML5 Mastery: Semantics & Forms',
        description: 'Modern HTML5 tags, Semantic structure, Forms aur Input types.',
        tags: ['HTML', 'Web Development', 'Frontend'],
        category: 'Internet & Web Technology',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-21'),
        content: `
# HTML5: The Structure of the Web

HyperText Markup Language (HTML) web pages ka skeleton hai.

## 1. Semantic HTML5
Semantic tags browser aur search engines ko batate hain ki content kya hai.
- \`<header>\`: Page ka shuruaati hissa.
- \`<nav>\`: Navigation links.
- \`<article>\`: Independent content (Blog post).
- \`<section>\`: Page ka ek hissa.
- \`<footer>\`: Copyright aur contact info.

## 2. Forms & Inputs
User se data lene ke liye forms use hote hain.

\`\`\`html
<form action="/submit">
    <label>Email:</label>
    <input type="email" required placeholder="name@example.com">
    
    <label>Password:</label>
    <input type="password">
    
    <input type="submit" value="Login">
</form>
\`\`\`

**New Input Types in HTML5:**
- \`date\`: Date picker.
- \`color\`: Color picker.
- \`range\`: Slider control.
- \`number\`: Numeric input only.

## 3. Multimedia Tags
- **Audio**:
  \`\`\`html
  <audio controls>
      <source src="song.mp3" type="audio/mpeg">
  </audio>
  \`\`\`
- **Video**:
  \`\`\`html
  <video width="320" height="240" controls>
      <source src="movie.mp4" type="video/mp4">
  </video>
  \`\`\`
        `
    },
    {
        id: 'css3-flexbox-grid',
        slug: 'css3-flexbox-grid',
        title: 'CSS3 Styling: Flexbox & Grid',
        description: 'Page layout design karna with Flexbox, Grid system, aur Responsive Design.',
        tags: ['CSS', 'Web Design', 'Layout', 'Responsive'],
        category: 'Internet & Web Technology',
        image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-21'),
        content: `
# CSS3: Making it Beautiful

Cascading Style Sheets (CSS) web ko sundar banati hai.

## 1. Flexbox (One-Dimensional Layout)
Items ko ek row ya column mein align karne ke liye best hai.

\`\`\`css
.container {
    display: flex;
    justify-content: center; /* Horizontally Center */
    align-items: center;     /* Vertically Center */
}
\`\`\`

## 2. CSS Grid (Two-Dimensional Layout)
Complex layouts (Rows + Columns) ke liye.

\`\`\`css
.grid-container {
    display: grid;
    grid-template-columns: auto auto auto; /* 3 Columns */
    gap: 10px;
}
\`\`\`

## 3. Responsive Design (Media Queries)
Mobile-first design ke liye zaroori hai.

\`\`\`css
@media only screen and (max-width: 600px) {
    body {
        background-color: lightblue;
    }
}
\`\`\`
        `
    },
    {
        id: 'cyber-security-basics',
        slug: 'cyber-security-basics',
        title: 'Cyber Security Essentials',
        description: 'Viruses, Malware, Phishing aur Digital Safety ke niyam.',
        tags: ['Security', 'Internet', 'Safety', 'Hacking'],
        category: 'Internet & Web Technology',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
        createdAt: new Date('2024-01-22'),
        content: `
# Cyber Security: Protecting Digital Life

Internet ke fayde hain to khatre bhi hain.

## 1. Threats (Khatre)
- **Virus**: Ek code jo files ko corrupt karta hai aur khud ko failata hai.
- **Malware** (Malicious Software): Bura software. Isme Virus, Spyware, Ransomware sab aate hain.
- **Phishing**: Nakli email/SMS bhejkar password churana (e.g., "Aapki Lottery lagi hai!").
- **Hacking**: Unauthorized tarike se kisi system mein ghusna.

## 2. Protection (Suraksha)
- **Antivirus**: Software jo virus dhoondhta aur maarta hai (Norton, McAfee, Windows Defender).
- **Firewall**: Deewar jo anjaan connections ko rokti hai.
- **Strong Passwords**: "123456" use na karein. Use "Tr!ck#99".
- **HTTPS**: Hamesha dekhein ki website URL ke sath Lock 🔒 icon ho.

## 3. Digital Etiquette (Netiquette)
- Kisi ko spam na karein.
- Copyright content chori na karein.
- Online bully na banein.
        `
    }
];
