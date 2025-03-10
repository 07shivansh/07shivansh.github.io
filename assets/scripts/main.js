/* filepath: /C:/Users/vissn/OneDrive/Desktop/MyWeb/shivansh-portfolio/assets/scripts/main.js */
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Hide navbar on scroll down, show on scroll up
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Active state for navigation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').slice(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Animate background elements
    const animatedBgSpans = document.querySelectorAll('.animated-bg span');
    animatedBgSpans.forEach((span, index) => {
        span.style.left = `${Math.random() * 100}%`;
        span.style.animationDelay = `${Math.random() * 5}s`;
        span.style.animationDuration = `${15 + Math.random() * 10}s`;
    });

    // Section reveal on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        revealObserver.observe(section);
    });

    // Typing animation reset
    const tagline = document.querySelector('.hero .tagline');
    if (tagline) {
        tagline.addEventListener('animationend', () => {
            setTimeout(() => {
                tagline.style.animation = 'none';
                setTimeout(() => {
                    tagline.style.animation = '';
                }, 10);
            }, 2000);
        });
    }
});