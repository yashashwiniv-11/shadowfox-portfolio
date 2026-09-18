/* ===== Mobile Navigation ===== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

/* ===== Navbar scroll effect ===== */
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ===== Active nav link on scroll ===== */
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNav);

/* ===== Contact Form Validation ===== */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(`${inputId}-error`);
    input.classList.add('error');
    errorEl.textContent = message;
}

function clearError(inputId) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(`${inputId}-error`);
    input.classList.remove('error');
    errorEl.textContent = '';
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validateForm() {
    let isValid = true;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Clear previous errors
    ['name', 'email', 'subject', 'message'].forEach(clearError);

    if (name === '') {
        showError('name', 'Please enter your full name.');
        isValid = false;
    } else if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters.');
        isValid = false;
    }

    if (email === '') {
        showError('email', 'Please enter your email address.');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address.');
        isValid = false;
    }

    if (subject === '') {
        showError('subject', 'Please enter a subject.');
        isValid = false;
    } else if (subject.length < 3) {
        showError('subject', 'Subject must be at least 3 characters.');
        isValid = false;
    }

    if (message === '') {
        showError('message', 'Please enter your message.');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters.');
        isValid = false;
    }

    return isValid;
}

// Real-time validation on blur
['name', 'email', 'subject', 'message'].forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener('blur', () => {
        const value = input.value.trim();
        clearError(id);

        if (id === 'name' && value !== '' && value.length < 2) {
            showError(id, 'Name must be at least 2 characters.');
        }
        if (id === 'email' && value !== '' && !validateEmail(value)) {
            showError(id, 'Please enter a valid email address.');
        }
        if (id === 'subject' && value !== '' && value.length < 3) {
            showError(id, 'Subject must be at least 3 characters.');
        }
        if (id === 'message' && value !== '' && value.length < 10) {
            showError(id, 'Message must be at least 10 characters.');
        }
    });

    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            clearError(id);
        }
    });
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
        // Simulate successful submission (no backend)
        formSuccess.hidden = false;
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.hidden = true;
        }, 5000);
    }
});

/* ===== Smooth reveal on scroll (simple fade-in) ===== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category, .project-card, .edu-card, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});
