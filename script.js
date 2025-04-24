// Cursor Custom
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
});

// Efek hover pada link
const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.color = 'var(--primary-color)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.color = 'var(--text-color)';
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Animation
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Glitch Effect
const glitchText = document.querySelector('.glitch');
let isGlitching = false;

glitchText.addEventListener('mouseover', () => {
    if (!isGlitching) {
        isGlitching = true;
        glitchText.style.animation = 'glitch 100ms infinite';
        setTimeout(() => {
            glitchText.style.animation = 'glitch 500ms infinite';
            isGlitching = false;
        }, 1000);
    }
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    document.querySelector('.hero').style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});

// Typewriter Effect
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 200;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Inisialisasi TypeWriter
document.addEventListener('DOMContentLoaded', () => {
    const txtElement = document.querySelector('.subtitle');
    const words = ['Portofolio Futuristik', 'Kreatif & Inovatif', 'Modern & Responsif'];
    const wait = 3000;
    
    if (txtElement) {
        new TypeWriter(txtElement, words, wait);
    }
});

// Project Card Animation
const projectCards = document.querySelectorAll('.project-card');
const projectObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, projectObserverOptions);

projectCards.forEach(card => {
    projectObserver.observe(card);
});

// Project Image Hover Effect
projectCards.forEach(card => {
    const image = card.querySelector('.project-image img');
    const info = card.querySelector('.project-info');
    
    card.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.1)';
        info.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
        info.style.transform = 'translateY(0)';
    });
});

// Form Validation and Animation
const contactForm = document.getElementById('contactForm');
const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');
    
    // Check if input has value on page load
    if (input.value) {
        label.classList.add('active');
    }
    
    input.addEventListener('focus', () => {
        label.classList.add('active');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            label.classList.remove('active');
        }
    });
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Form validation
    let isValid = true;
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    if (isValid) {
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Pesan Terkirim';
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = '<span>Kirim Pesan</span><i class="fas fa-paper-plane"></i>';
                submitBtn.disabled = false;
                
                // Reset labels
                formGroups.forEach(group => {
                    const label = group.querySelector('label');
                    label.classList.remove('active');
                });
            }, 2000);
        }, 1500);
    }
});

// Add error class styling
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: #ff0000 !important;
    }
    
    .error ~ label {
        color: #ff0000 !important;
    }
    
    .error ~ .focus-border {
        background: #ff0000 !important;
    }
`;
document.head.appendChild(style); 