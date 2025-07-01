/* Modern Portfolio - Main JavaScript */
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const homeSection = document.getElementById('home');
    
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // Navbar visibility control - consolidated scroll handler
    let lastScroll = 0;
    let scrollTimeout;
    
    // Function to check if home section is in viewport
    function isHomeInViewport() {
        if (!homeSection) return false;
        
        const rect = homeSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Show navbar when home section occupies more than 80% of viewport
        return rect.top < windowHeight * 0.2 && rect.bottom > windowHeight * 0.2;
    }
    
    // Consolidated scroll handler
    function handleScroll() {
        if (!navbar) return;
        
        if (isHomeInViewport()) {
            navbar.classList.remove('hidden');
            navbar.classList.add('home-only');
        } else {
            navbar.classList.add('hidden');
            navbar.classList.remove('home-only');
        }
    }
    
    // Performance optimized scroll handler
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 16);
    }, { passive: true });

    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            
            // If clicking home link, scroll to top and show navbar
            if (targetId === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navbar.classList.remove('hidden');
                navbar.classList.add('home-only');
            } else {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Combined intersection observer for navigation and section reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Update active navigation
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').slice(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
                
                // Add visible class for animations
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
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

    // Matrix rain effect
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    const characters = matrix.split("");
    const fontSize = 14;
    const columns = canvas.width/fontSize;
    const drops = [];

    for(let x = 0; x < columns; x++)
        drops[x] = 1;

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#0F0";
        ctx.font = fontSize + "px monospace";

        for(let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random()*characters.length)];
            ctx.fillText(text, i*fontSize, drops[i]*fontSize);
            
            if(drops[i]*fontSize > canvas.height && Math.random() > 0.975)
                drops[i] = 0;
            
            drops[i]++;
        }
    }

    setInterval(draw, 35);

    // Enhanced scroll animations
    const enhancedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'none';
                entry.target.style.opacity = '1';
                
                // Add subtle animation effect on intersection
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        entry.target.style.transform = '';
                    }, 300);
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card, .skill-category').forEach(element => {
        enhancedObserver.observe(element);
    });

    // 3D card tilt effect
    const cards = document.querySelectorAll('.project-card, .education-card, .experience-card');
    
    function handleMouseMove(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleY = (x - centerX) / 20;
        const angleX = (centerY - y) / 20;
        
        this.style.transform = `rotateY(${angleY}deg) rotateX(${angleX}deg) translateZ(10px)`;
    }
    
    function handleMouseLeave() {
        this.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0)';
    }
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
    });

    // Add digital data streams to skills section
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const dataStreamCanvas = document.createElement('canvas');
        dataStreamCanvas.id = 'data-stream-canvas';
        dataStreamCanvas.style.position = 'absolute';
        dataStreamCanvas.style.top = '0';
        dataStreamCanvas.style.left = '0';
        dataStreamCanvas.style.width = '100%';
        dataStreamCanvas.style.height = '100%';
        dataStreamCanvas.style.opacity = '0.08';
        dataStreamCanvas.style.zIndex = '0';
        
        // Insert canvas as first child of skills section
        skillsSection.insertBefore(dataStreamCanvas, skillsSection.firstChild);
        
        // Initialize data stream animation
        const dataCtx = dataStreamCanvas.getContext('2d');
        const dataPoints = [];
        let dataPointsCount = 100;
        
        // Set canvas dimensions
        function setCanvasDimensions() {
            dataStreamCanvas.width = skillsSection.offsetWidth;
            dataStreamCanvas.height = skillsSection.offsetHeight;
        }
        
        setCanvasDimensions();
        window.addEventListener('resize', setCanvasDimensions);
        
        // Create data points
        for (let i = 0; i < dataPointsCount; i++) {
            dataPoints.push({
                x: Math.random() * dataStreamCanvas.width,
                y: Math.random() * dataStreamCanvas.height,
                speed: Math.random() * 2 + 0.5,
                size: Math.random() * 2 + 1,
                color: Math.random() > 0.5 ? '#3498db' : '#2ecc71'
            });
        }
        
        // Draw data streams
        function drawDataStreams() {
            const rect = skillsSection.getBoundingClientRect();
            if (
                rect.bottom < 0 ||
                rect.top > window.innerHeight ||
                rect.right < 0 ||
                rect.left > window.innerWidth
            ) {
                requestAnimationFrame(drawDataStreams);
                return;
            }
            
            dataCtx.clearRect(0, 0, dataStreamCanvas.width, dataStreamCanvas.height);
            
            // Draw lines between points
            dataCtx.beginPath();
            const maxConnections = isMobile ? 2 : 5;
            
            for (let i = 0; i < dataPoints.length; i++) {
                const point = dataPoints[i];
                let connections = 0;
                
                for (let j = i + 1; j < dataPoints.length && connections < maxConnections; j++) {
                    const otherPoint = dataPoints[j];
                    const dx = point.x - otherPoint.x;
                    const dy = point.y - otherPoint.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        dataCtx.moveTo(point.x, point.y);
                        dataCtx.lineTo(otherPoint.x, otherPoint.y);
                        connections++;
                    }
                }
                
                point.y -= point.speed;
                
                if (point.y < -10) {
                    point.y = dataStreamCanvas.height + 10;
                    point.x = Math.random() * dataStreamCanvas.width;
                }
            }
            
            dataCtx.strokeStyle = 'rgba(52, 152, 219, 0.3)';
            dataCtx.lineWidth = 0.5;
            dataCtx.stroke();
            
            for (const point of dataPoints) {
                dataCtx.beginPath();
                dataCtx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
                dataCtx.fillStyle = point.color;
                dataCtx.fill();
            }
            
            requestAnimationFrame(drawDataStreams);
        }
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                drawDataStreams();
            }
        }, { threshold: 0.1 });
        
        observer.observe(skillsSection);
    }

    // Mobile optimizations for main.js
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        dataPointsCount = 50;
        
        cards.forEach(card => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        });
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        document.querySelectorAll('.profile-frame').forEach(el => {
            el.style.animation = 'rotateSlow 20s linear infinite';
        });
        
        setInterval(draw, 50);
    } else {
        setInterval(draw, 35);
    }
    
    function fixIOSVhBug() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        const heroSection = document.getElementById('home');
        if (heroSection) {
            heroSection.style.height = 'calc(var(--vh, 1vh) * 100)';
        }
    }
    
    fixIOSVhBug();
    window.addEventListener('resize', fixIOSVhBug);
    
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('touchstart', function() {}, { passive: true });
    });
    
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            if (dataStreamCanvas) {
                setCanvasDimensions();
            }
            fixIOSVhBug();
        }, 200);
    });
    
    // Initial check for navbar visibility
    handleScroll();
});