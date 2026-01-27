
export const iot = {
    id: 'iot',
    title: 'Internet of Things (IoT)',
    description: 'The future is connected. Learn about Sensors, Cloud, Protocols, and Smart Cities.',
    topics: [
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
        }
    ]
};
