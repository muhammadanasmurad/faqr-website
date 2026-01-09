// ============================================
// Mobile Menu Toggle
// ============================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ============================================
// Smooth Scrolling for Navigation Links (only for same-page anchors)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only prevent default for same-page anchors
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
        // For links to other pages, let them navigate normally
    });
});

// ============================================
// Navbar Scroll Effect
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(13, 93, 47, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(13, 93, 47, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Language Toggle
// ============================================
const langButtons = document.querySelectorAll('.lang-btn');

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        langButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const selectedLang = button.getAttribute('data-lang');
        
        // Store language preference
        localStorage.setItem('preferredLanguage', selectedLang);
        
        // Here you would implement actual language switching
        // For now, this is a placeholder for future implementation
        if (selectedLang === 'ur') {
            // Future: Switch to Urdu content
            console.log('Switching to Urdu');
        } else {
            // Future: Switch to English content
            console.log('Switching to English');
        }
    });
});

// Load saved language preference
const savedLang = localStorage.getItem('preferredLanguage');
if (savedLang) {
    const savedButton = document.querySelector(`.lang-btn[data-lang="${savedLang}"]`);
    if (savedButton) {
        langButtons.forEach(btn => btn.classList.remove('active'));
        savedButton.classList.add('active');
    }
}

// ============================================
// Contact Form Handling
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const messageDiv = document.getElementById('formMessage');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                showMessage(result.message, 'success');
                contactForm.reset();
            } else {
                showMessage(result.message || 'Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Network error. Please try again later.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });

    function showMessage(text, type) {
        const messageDiv = document.getElementById('formMessage');
        messageDiv.textContent = text;
        messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
        messageDiv.style.display = 'block';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

// ============================================
// Intersection Observer for Fade-in Animations
// ============================================
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

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.work-card, .value-card, .education-card, .donation-card, .centre-card, .news-card, .join-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ============================================
// Active Navigation Link Highlighting (for multi-page navigation)
// ============================================
// Set active state based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinksArray = Array.from(document.querySelectorAll('.nav-link'));

navLinksArray.forEach(link => {
    const linkHref = link.getAttribute('href');
    // Remove .html extension for comparison
    const linkPage = linkHref.split('/').pop() || 'index.html';
    const currentPageName = currentPage || 'index.html';
    
    if (linkPage === currentPageName || 
        (currentPageName === '' && linkPage === 'index.html') ||
        (currentPageName === 'index.html' && linkPage === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// For single-page navigation (if sections exist on current page)
const sections = document.querySelectorAll('.section[id]');
if (sections.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        // Only update if we're on a single-page layout
        if (current) {
            navLinksArray.forEach(link => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    link.classList.remove('active');
                    if (href === `#${current}`) {
                        link.classList.add('active');
                    }
                }
            });
        }
    });
}

// ============================================
// WhatsApp Link Enhancement
// ============================================
const whatsappLinks = document.querySelectorAll('.whatsapp-link');

whatsappLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Ensure the link opens in a new tab/window
        if (!link.target) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    });
});

// ============================================
// Form Input Enhancements
// ============================================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    // Add focus effect
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
        if (this.value) {
            this.parentElement.classList.add('has-value');
        } else {
            this.parentElement.classList.remove('has-value');
        }
    });
    
    // Check if input has value on load
    if (input.value) {
        input.parentElement.classList.add('has-value');
    }
});

// ============================================
// Scroll to Top Button (Optional Enhancement)
// ============================================
let scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(13, 93, 47, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
    scrollToTopBtn.style.backgroundColor = 'var(--primary-dark)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
    scrollToTopBtn.style.backgroundColor = 'var(--primary-color)';
});

// ============================================
// Performance Optimization: Lazy Loading Images
// ============================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ============================================
// Console Welcome Message
// ============================================
console.log('%cآوانِ فقرِ نوشاہی', 'font-size: 24px; font-weight: bold; color: #0d5d2f;');
console.log('%cServing Faith • Strengthening Community • Promoting Peace', 'font-size: 14px; color: #666;');
console.log('%cWelcome to our website!', 'font-size: 12px; color: #0d5d2f;');

// ============================================
// Namaz Table: Dynamic Schedule & Highlight
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('prayer-timings-body');
    const seasonIndicator = document.getElementById('season-indicator');
    
    // Only proceed if the table exists on this page
    if (!tableBody) return;

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    // Define Schedules
    const summerSchedule = {
        default: { fajr: '4:15 AM', dhuhr: '1:30 PM', asr: '5:15 PM', maghrib: '7:15 PM', isha: '8:45 PM' },
        friday:  { fajr: '4:15 AM', dhuhr: '1:45 PM', asr: '5:15 PM', maghrib: '7:15 PM', isha: '8:45 PM' }
    };

    const winterSchedule = {
        default: { fajr: '5:45 AM', dhuhr: '1:30 PM', asr: '4:00 PM', maghrib: '5:30 PM', isha: '7:30 PM' },
        friday:  { fajr: '5:45 AM', dhuhr: '2:00 PM', asr: '4:00 PM', maghrib: '5:30 PM', isha: '7:30 PM' }
    };

    // Determine Season
    const currentMonth = new Date().getMonth(); // 0-11 (Jan is 0)
    // Summer: April (3) to September (8)
    const isSummer = currentMonth >= 3 && currentMonth <= 8;
    
    const schedule = isSummer ? summerSchedule : winterSchedule;
    const seasonName = isSummer ? 'Summer Schedule (April - September)' : 'Winter Schedule (October - March)';
    
    // Update Indicator
    if (seasonIndicator) {
        seasonIndicator.textContent = seasonName;
    }

    // Generate Table Rows
    let html = '';
    const todayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
    // Map JS getDay() (0=Sun) to our days array logic
    // Our array starts with Monday. 
    // Monday is index 0 in our array, but index 1 in getDay().
    // Sunday is index 6 in our array, but index 0 in getDay().
    
    // Helper to match current day
    const getDayName = (dateIndex) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[dateIndex];
    };
    const currentDayName = getDayName(todayIndex);

    daysOfWeek.forEach(day => {
        const isFriday = day === 'Friday';
        const times = isFriday ? schedule.friday : schedule.default;
        const isToday = day === currentDayName;
        
        html += `
            <tr class="${isToday ? 'today' : ''}">
                <td>${day}</td>
                <td>${times.fajr}</td>
                <td>${times.dhuhr}</td>
                <td>${times.asr}</td>
                <td>${times.maghrib}</td>
                <td>${times.isha}</td>
            </tr>
        `;
    });

    tableBody.innerHTML = html;
});
