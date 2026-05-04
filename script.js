// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Typing Animation
const texts = ["Web Developer", "UI/UX Designer", "Problem Solver"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";
let isDeleting = false;

function type() {
    if (count === texts.length) {
        count = 0;
    }
    
    currentText = texts[count];
    
    if (isDeleting) {
        letter = currentText.slice(0, --index);
    } else {
        letter = currentText.slice(0, ++index);
    }
    
    document.querySelector('.typing-text').textContent = letter;
    
    let typeSpeed = 100;
    
    if (isDeleting) {
        typeSpeed /= 2;
    }
    
    if (!isDeleting && letter.length === currentText.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && letter.length === 0) {
        isDeleting = false;
        count++;
        typeSpeed = 500; // Pause before next word
    }
    
    setTimeout(type, typeSpeed);
}

// Start typing animation on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
});

// Close mobile menu when link is clicked
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        hamburger.classList.remove('toggle');
    });
});

// Navbar Scroll Effect and Active Links
const nav = document.querySelector('nav');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    // Navbar background
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Active Link Highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// Scroll Reveal Animation (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            
            // Trigger counter animation if it's the about section
            if (entry.target.classList.contains('about-content')) {
                animateCounters();
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(el => observer.observe(el));

// Number Counter Animation
let countersAnimated = false;
function animateCounters() {
    if (countersAnimated) return;
    
    const counters = document.querySelectorAll('.stat-num');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            
            const inc = target / speed * 10;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 40);
            } else {
                counter.innerText = target + (target > 10 ? '+' : '');
            }
        };
        updateCount();
    });
    
    countersAnimated = true;
}

// Mouse movement effect on hero image
const heroImage = document.querySelector('.hero-image');
const glowRing = document.querySelector('.glow-ring');
const profileImg = document.querySelector('.image-wrapper img');

if (heroImage && glowRing && profileImg) {
    // Add smooth transition for when mouse leaves
    profileImg.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease';
    
    heroImage.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = heroImage.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        // Very fast transition during move for smooth tracking without lag
        profileImg.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
        
        glowRing.style.transform = `translate(${x * 30}px, ${y * 30}px) scale(1.05)`;
        
        // 3D Tilt effect
        const rotateX = -y * 20; // 10 deg max
        const rotateY = x * 20;  // 10 deg max
        profileImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05) translateY(-5px)`;
        profileImg.style.boxShadow = `${-x * 20}px ${-y * 20 + 20}px 30px rgba(0,0,0,0.4)`;
    });
    
    heroImage.addEventListener('mouseleave', () => {
        // Restore slow transition for smooth snap back
        profileImg.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.5s ease';
        
        glowRing.style.transform = `translate(0, 0) scale(1.05)`;
        profileImg.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1) translateY(0)`;
        profileImg.style.boxShadow = `0 10px 30px rgba(0,0,0,0.3)`;
    });
}

// Toggle extra certificates
const toggleCertsBtn = document.getElementById('toggle-certs-btn');
const extraCerts = document.querySelectorAll('.extra-cert');

if (toggleCertsBtn) {
    toggleCertsBtn.addEventListener('click', () => {
        const isHidden = extraCerts[0].style.display === 'none';
        
        if (isHidden) {
            extraCerts.forEach(cert => {
                cert.style.display = 'flex';
                // Slight delay to allow display:flex to apply before CSS transition
                setTimeout(() => cert.classList.add('show'), 10);
            });
            toggleCertsBtn.innerHTML = 'Show Less <i class="fa-solid fa-chevron-up"></i>';
        } else {
            extraCerts.forEach(cert => {
                cert.classList.remove('show');
                setTimeout(() => cert.style.display = 'none', 300); // Wait for transition
            });
            toggleCertsBtn.innerHTML = 'Open Full Certificates <i class="fa-solid fa-chevron-down"></i>';
            
            // Scroll back up to the top of certificates section
            const certSection = document.getElementById('certificates');
            if(certSection) certSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Custom Fast Cursor Animation
const cursorDot = document.createElement('div');
cursorDot.classList.add('cursor-dot');
document.body.appendChild(cursorDot);

const cursorOutline = document.createElement('div');
cursorOutline.classList.add('cursor-outline');
document.body.appendChild(cursorOutline);

let outlineX = 0;
let outlineY = 0;
let mouseX = 0;
let mouseY = 0;

// High-performance tracking via transform translate3d
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows instantly
    cursorDot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
});

// Smooth lag for outline using requestAnimationFrame
function animateCursor() {
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;
    
    // Lerp (smooth follow)
    outlineX = outlineX + (distX * 0.2);
    outlineY = outlineY + (distY * 0.2);
    
    // 12px offset centers the 24px flower
    cursorOutline.style.transform = `translate3d(${outlineX - 12}px, ${outlineY - 12}px, 0)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Add hover effects for the cursor
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.project-card')) {
        cursorOutline.style.width = '36px';
        cursorOutline.style.height = '36px';
        cursorOutline.style.opacity = '0.6';
        // adjust transform offset to keep it centered when scaled to 36px (offset 18)
        cursorOutline.style.transform = `translate3d(${outlineX - 18}px, ${outlineY - 18}px, 0)`;
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.project-card')) {
        cursorOutline.style.width = '24px';
        cursorOutline.style.height = '24px';
        cursorOutline.style.opacity = '1';
    }
});
