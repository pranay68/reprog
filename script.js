// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
    }

    lastScroll = currentScroll;
});

// Animate stats on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateValue(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

function animateValue(element) {
    const text = element.textContent;
    const isPercentage = text.includes('%');
    const isPlus = text.includes('+');
    const number = parseFloat(text.replace(/[^0-9.]/g, ''));

    if (isNaN(number)) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = number / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
        current += stepValue;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }

        let displayValue = Math.floor(current);
        if (number % 1 !== 0) {
            displayValue = current.toFixed(1);
        }

        element.textContent = displayValue + (isPercentage ? '%' : '') + (isPlus ? '+' : '');
    }, stepDuration);
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Simulate form submission
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;

        button.textContent = 'Sending...';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = 'Message Sent! ✓';
            button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
                contactForm.reset();
            }, 3000);
        }, 1500);
    });
}

// Add hover effect to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--primary)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.borderColor = '#e2e8f0';
    });
});

// Pricing card selection
document.querySelectorAll('.pricing-card').forEach(card => {
    const button = card.querySelector('.btn');
    if (button) {
        button.addEventListener('click', function(e) {
            if (!this.href.includes('#')) return;

            e.preventDefault();

            // Show modal or redirect to payment
            alert('Payment integration coming soon! You selected: ' +
                card.querySelector('h3').textContent + ' plan');
        });
    }
});

// Demo video play simulation
const videoPlaceholder = document.querySelector('.video-placeholder');
if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', function() {
        this.innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <i class="fas fa-spinner fa-spin" style="font-size: 3rem; color: var(--primary);"></i>
                <p style="margin-top: 1rem;">Loading demo video...</p>
            </div>
        `;

        setTimeout(() => {
            this.innerHTML = `
                <div style="text-align: center; padding: 3rem;">
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success);"></i>
                    <p style="margin-top: 1rem;">Demo video coming soon!</p>
                </div>
            `;
        }, 2000);
    });
}

// Animate progress bar
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.progress-fill');
            if (fill) {
                fill.style.width = fill.style.width || '100%';
            }
            progressObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.progress-bar').forEach(bar => {
    progressObserver.observe(bar);
});

// Add typing effect to hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    heroTitle.style.opacity = '1';

    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    }

    // Start typing after page load
    setTimeout(typeWriter, 500);
}

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Easter egg - konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s infinite';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 5000);

    alert('🎉 Beast Mode Activated! You found the secret code!');
}

// Console message for developers
console.log('%c🚀 Reprog - Revolutionary AI Development Platform', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cInterested in joining our team? Email: careers@reprog.ai', 'font-size: 14px; color: #64748b;');
console.log('%cBuilt with ❤️ by AI Swarm Intelligence', 'font-size: 12px; color: #10b981;');