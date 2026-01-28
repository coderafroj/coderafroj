export const hardware = [
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
    }
];
