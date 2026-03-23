// ==========================================
// 🚀 SERVER.JS FILE
// Ye file Node.js (Express) ka backend server banati hai jisse website run hoti hai.
// isse Home page open hota hai aur Contact form ka data save hota hai.
// ==========================================

// Baahar ke modules (Libraries) ko include karna taki humara server chal sake
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Express ka app banana
const app = express();

// Port number set karna (jispar server chalega, usually 3000 hota hai)
const PORT = process.env.PORT || 3000;

// Middleware yahan define hote hain (Ye requests ko handle karte hain)
app.use(cors()); // CORS allow karta hai taki resources block na hon
app.use(bodyParser.json()); // JSON Format data read karne me madad karta hai
app.use(bodyParser.urlencoded({ extended: true }));

// Ye command batati hai ki HTML, CSS, aur JS files issi folder se uthaane hain
app.use(express.static(path.join(__dirname)));

// =======================
// 📌 PAGES LOADING ROUTES
// Ye batate hain ki jab user browser me link likhega, to kaunsa naya (Home/About/etc) page khulega
// =======================

// Jab user seedha website (root URL `/`) open karega, toh home page (index.html) khulaana hai
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// Extra Pages ke routes (jaise hi user /courses wale link par click karega)
app.get('/courses', (req, res) => res.sendFile(path.join(__dirname, 'courses.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'contact.html')));


// =======================
// 📝 CONTACT FORM API ROUTE
// Jab user website par "Send Message" karega toh uski jankaari isme aakar database/file me store hogi
// =======================
app.post('/api/contact', (req, res) => {
    // Form me jo likha hai unhe extract karna (Naam, Email, Phone, Message)
    const { name, email, phone, message } = req.body;
    
    // Check karna ki sab kuch submit kia gaya hai ki nahi
    if(!name || !phone || !message) {
        return res.status(400).json({ success: false, message: 'Please sab fields bhariye.' });
    }

    // Jis JSON file me data add hoga uska path set karna
    const filePath = path.join(__dirname, 'contacts.json');
    
    // Naya data object banana jisme user ki detail hogi
    const newContact = {
        id: Date.now(),
        name,
        email: email || 'N/A', // agar email na de toh N/A use karna
        phone,
        message,
        date: new Date().toISOString()
    };

    // Database (JSON file) ko pehle padhna (Read karna)
    fs.readFile(filePath, 'utf8', (err, data) => {
        let contacts = [];
        if (!err && data) {
            try {
                // file mein likhe text ko JSON structure array mein badalna
                contacts = JSON.parse(data);
            } catch (e) {
                console.error("Error file ko padhne me", e);
            }
        }
        
        // Purane contacts me nayi jankari add (Push) karna
        contacts.push(newContact);
        
        // Fir wapas usi file me sare contacts overwrite kar dena
        fs.writeFile(filePath, JSON.stringify(contacts, null, 2), (err) => {
            if (err) {
                console.error("Data save karne me dikkat aayi:", err);
                return res.status(500).json({ success: false, message: 'Server error hai. Kuch der bad try karein.' });
            }
            // Agar file sahi chal jaye, toh success message bhejna client (website) ko
            res.status(200).json({ success: true, message: 'Thank you! Aapka inquiry data jama kar liya gaya hai.' });
        });
    });
});

// Server ko live start karne wala hissa
app.listen(PORT, () => {
    console.log(`🚀 Server http://localhost:${PORT} var successfully chal rha hai!`);
    console.log(`Open in Browser -> http://localhost:${PORT}`);
});
