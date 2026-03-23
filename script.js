// ==========================================
// 📜 SCRIPT.JS FILE
// Ye file website ki interactive activities sambalti hai (Jaise Animation, Form, Slider chalana)
// ==========================================

//  ---------- 1. PRELOADER (LOAder) HATANE KE LIYE ----------
// Jab website poori tarah open ho jayegi, tab ye preloader (gol ghumne wala animation) chhip jayega (hide ho jayega)
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0'; // Gayab ho jana animation ke saath
    
    // Aadhe second baad isse screen se hata dete hain
    setTimeout(() => {
        preloader.style.display = 'none';
        
        // aur fir neeche wale reveals (animations) load kar denge
        reveal();
    }, 500);
});


// ---------- 2. STICKY NAVBAR (Menu ko upar chipkana) ----------
// Jab user neeche scroll karega toh Navbar screen ke upar chipak jaega
const header = document.getElementById('header');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    // Agar 50px se jyada scroll hota hai toh "sticky" ban jayega
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
    
    // Sath hi me "Wapas Upar Jao" (Scroll to Top) wala button bhi tabhi niklega jab user 500px scroll karega
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// ---------- 3. SCROLL TO TOP (Sabse upar le jane wala button) ----------
// Jab uss arrow upar bale button par click karenge to page bilkul upar khisak jayega easily
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Aaram se upar jana
    });
});


// ---------- 4. MOBILE MENU (Phone par menu kholne ke liye) ----------
// Hamburger (3 line wala button) par click karne se phone-screen (Mobile) wala menu aayega aur jayega
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    document.querySelector('.navbar').classList.toggle('active');
});

// Jab kisi link (Home, About) par click hoga toh mobile menu wapas chhip jayega
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.querySelector('.navbar').classList.remove('active');
    });
});


// ---------- 5. ACTIVE LINK HIGHLIGHT ----------
// Jab koi section screen par aayega(jaise courses), toh uske menu ka name highlighted ho jayega
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.section, .hero');
    
    // Check karna ki konsa page ka hissa screen pr dikh rha hai
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    // Old highlighted nav ki "active" uthar kar naye wale ko "active" de denge
    navItems.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href').includes(current)) {
            li.classList.add('active');
        }
    });
});


// ---------- 6. SLIDER CAROUSEL (Hero Images badalna automatically) ----------
// Home page ki tasveere (images) jo har 5 seconds me left-right change hoti hain
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
const slideInterval = 5000; // 5000 milliseconds mtlab 5 second baad agla slide aayega

function nextSlide() {
    slides[currentSlide].classList.remove('active'); // pehle wale se active hataya
    currentSlide = (currentSlide + 1) % slides.length; // naye wale ki count bhari
    slides[currentSlide].classList.add('active'); // naye wale pe active class lagadi aane ke kiye
}
// Time loop lagaya ki continuous function chale apni madzi se
setInterval(nextSlide, slideInterval);


// ---------- 7. SCROLL KARNE PAR ANIMATION LAGANA ----------
// Jaise jaise page niche khiskta hai, elements nikal ke apne aap uper/side se aate hain
function reveal() {
    var reveals = document.querySelectorAll('.scroll-reveal, .box-reveal');
    
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150; // Element kab dhena shuru hoga screen par
        
        // Agar window par vo jaga dikhri hoti hai, toh CSS active wali .active dedna taaki dikhe 
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}
window.addEventListener('scroll', reveal); // Yeh check hamesha rahega scroll par


// ---------- 8. CONTACT FORM SE WHATSAPP PAR MESSAGE BHEJNA ----------
// Form bharkar Jab user submit karega toh details pack hokar WhatsApp Web/App par open hongi direct aake pass
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Page refresh hone se roko

        // Submit Button ko loading effect dena
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Connecting WhatsApp... <i class="fa-brands fa-whatsapp fa-spin"></i>';
        submitBtn.disabled = true;

        // Form boxes me se details lena (Name, Email, Course, Phone, Message)
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value || "No Email Given";
        const phone = document.getElementById('phone').value;
        // Check karna ki id="course" exist krta ho (drop down ki value k lie)
        const courseDrop = document.getElementById('course');
        const course = courseDrop ? courseDrop.value : "General Inquiry";
        const message = document.getElementById('message').value;

        // WhatsApp number jaha message aayega (Aapka Number: 9026385513)
        const waNumber = "919026385513";
        
        // Text message banana jo aapke chat me aayega
        // %0A ka matlab hota hai 'Enter' (New Line), %20 matlab Space.
        // *Text* yani ki Bold formatting
        let waText = `Hello CCE Amethi! 👋%0A%0A`;
        waText += `Mera Naam: *${name}*%0A`;
        waText += `Phone No: ${phone}%0A`;
        waText += `Email ID: ${email}%0A%0A`;
        waText += `Course Inquiry: *${course}*%0A`;
        waText += `Message: ${message}`;

        // Link banana direct whatsapp wa.me pe
        const waLink = `https://wa.me/${waNumber}?text=${waText}`;

        // Success hone par thoda intazar karke whatsapp ki nayi window/app khol dho
        setTimeout(() => {
            // Naye tab mein whatsapp link open karo
            window.open(waLink, '_blank');
            
            // Screen par success ka chota sa message dedho green color me
            formMessage.style.display = 'block';
            formMessage.className = 'form-message success';
            formMessage.innerText = "Redirected to WhatsApp! Aapse wahi baat hogi.";
            
            // Sab normal theek kardo
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            contactForm.reset();

            // 5 second me green success warning automatically hata dho
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }, 1200); // 1.2 second pause sirf sundar animation dekhne ke lie
    });
}

// ---------- 9. PREMIUM 3D TILT EFFECT ON CARDS ----------
// Hover krne pe cards 3D effect denge (Left/right jhukenge mouse ke sath)
const tiltCards = document.querySelectorAll('.glass-card, .feature-card, .about-img');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8; // 8 max tilt angle tilt up/down
        const rotateY = ((x - centerX) / centerX) * 8;  // 8 tilt left/right
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'none'; // Smooth tracking, disable css transition
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        card.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; // bounce back
    });
});
