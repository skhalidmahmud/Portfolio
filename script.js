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
    if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.project-card') || e.target.closest('#terminal-body')) {
        cursorOutline.style.width = '24px';
        cursorOutline.style.height = '24px';
        cursorOutline.style.opacity = '1';
    }
});

// --- Interactive Developer Terminal Logic ---
const termInput = document.getElementById('terminal-input');
const termOutput = document.getElementById('terminal-output');
const termBody = document.getElementById('terminal-body');

if (termInput) {
    termInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim().toLowerCase();
            this.value = '';
            
            // Print the command that was run
            const cmdLine = document.createElement('div');
            cmdLine.className = 'term-line';
            cmdLine.innerHTML = `<span class="term-prompt">guest@khalid:~$ </span>${command}`;
            termOutput.appendChild(cmdLine);
            
            // Process and output
            if (command) {
                processCommand(command);
            }
            
            // Scroll to the bottom automatically
            termBody.scrollTop = termBody.scrollHeight;
        }
    });
}

function processCommand(cmd) {
    const resLine = document.createElement('div');
    resLine.className = 'term-line';
    resLine.style.marginBottom = '15px';
    
    switch(cmd) {
        case 'help':
            resLine.innerHTML = `Available commands:<br>
            <span class="term-cmd">about</span>   - Who is Khalid?<br>
            <span class="term-cmd">skills</span>  - View technical skills<br>
            <span class="term-cmd">hire</span>    - Get my contact info<br>
            <span class="term-cmd">clear</span>   - Clear the terminal<br>
            <span class="term-cmd">sudo</span>    - Run as administrator`;
            break;
        case 'about':
            resLine.innerHTML = "I am a Computer Science graduate specializing in Full-Stack Development, AI, and Large Language Models. Passionate about building intelligent systems.";
            break;
        case 'skills':
            resLine.innerHTML = "Languages : Python, C, C++, C#, JavaScript, HTML, CSS<br>Frameworks: Django, .NET, React, Vue<br>Tech      : LLMs, Prompt Engineering, Agents, SQL";
            break;
        case 'hire':
            resLine.innerHTML = "Great choice! Email me at: <a href='mailto:khalidfromdhaka@gmail.com' style='color:var(--accent-primary)'>khalidfromdhaka@gmail.com</a>";
            break;
        case 'clear':
            termOutput.innerHTML = '';
            return; // Don't append empty line
        case 'sudo':
            resLine.innerHTML = "Permission denied: user 'guest' is not in the sudoers file. This incident will be reported to Khalid.";
            resLine.style.color = '#ff5f56';
            break;
        case 'ls':
            resLine.innerHTML = "index.html  style.css  script.js  cv.pdf  top_secret_project.exe";
            break;
        case 'rm -rf /':
            resLine.innerHTML = "Nice try! I've disabled root access for guests. 😉";
            resLine.style.color = '#ffbd2e';
            break;
        default:
            resLine.innerHTML = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }
    
    termOutput.appendChild(resLine);
}

// --- Theme Switcher Logic ---
const themeBtn = document.getElementById('theme-btn');
const themePanel = document.getElementById('theme-panel');
const modeToggle = document.getElementById('mode-toggle-checkbox');
const colorDots = document.querySelectorAll('.color-dot');
const root = document.documentElement;

// Toggle panel
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        themePanel.classList.toggle('active');
    });
}

// Close panel when clicking outside
document.addEventListener('click', (e) => {
    if (themePanel && themeBtn && !themePanel.contains(e.target) && !themeBtn.contains(e.target)) {
        themePanel.classList.remove('active');
    }
});

// Mode Toggle (Dark/Light)
if (modeToggle) {
    // Check local storage for saved mode
    if (localStorage.getItem('theme-mode') === 'light') {
        modeToggle.checked = true;
        root.classList.add('light-mode');
    }
    
    modeToggle.addEventListener('change', () => {
        if (modeToggle.checked) {
            root.classList.add('light-mode');
            localStorage.setItem('theme-mode', 'light');
        } else {
            root.classList.remove('light-mode');
            localStorage.setItem('theme-mode', 'dark');
        }
    });
}

// Color Picker Logic
if (colorDots.length > 0) {
    // Check local storage for saved color
    const savedColor = localStorage.getItem('theme-color');
    const savedSecondary = localStorage.getItem('theme-secondary');
    
    if (savedColor && savedSecondary) {
        root.style.setProperty('--accent-primary', savedColor);
        root.style.setProperty('--accent-secondary', savedSecondary);
        
        // Update active dot
        colorDots.forEach(d => {
            d.classList.remove('active');
            if (d.getAttribute('data-color') === savedColor) {
                d.classList.add('active');
            }
        });
    }
    
    colorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            // Remove active class from all
            colorDots.forEach(d => d.classList.remove('active'));
            // Add active to clicked
            dot.classList.add('active');
            
            // Get colors
            const primaryColor = dot.getAttribute('data-color');
            const secondaryColor = dot.getAttribute('data-secondary');
            
            // Set CSS variables
            root.style.setProperty('--accent-primary', primaryColor);
            root.style.setProperty('--accent-secondary', secondaryColor);
            
            // Save to local storage
            localStorage.setItem('theme-color', primaryColor);
            localStorage.setItem('theme-secondary', secondaryColor);
        });
    });
}
