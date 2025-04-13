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
                
                // Add glitch effect on intersection
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.animation = 'glitch 0.3s cubic-bezier(.25, .46, .45, .94)';
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card, .skill-category').forEach(element => {
        enhancedObserver.observe(element);
    });

    // 3D card tilt effect
    const cards = document.querySelectorAll('.project-card, .education-card, .experience-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleY = (x - centerX) / 20;
            const angleX = (centerY - y) / 20;
            
            this.style.transform = `rotateY(${angleY}deg) rotateX(${angleX}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0)';
        });
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
        const dataPointsCount = 100;
        
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
            dataCtx.clearRect(0, 0, dataStreamCanvas.width, dataStreamCanvas.height);
            
            // Draw lines between points
            dataCtx.beginPath();
            for (let i = 0; i < dataPoints.length; i++) {
                const point = dataPoints[i];
                
                // Find nearby points and connect them with lines
                for (let j = i + 1; j < dataPoints.length; j++) {
                    const otherPoint = dataPoints[j];
                    const dx = point.x - otherPoint.x;
                    const dy = point.y - otherPoint.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        dataCtx.moveTo(point.x, point.y);
                        dataCtx.lineTo(otherPoint.x, otherPoint.y);
                    }
                }
                
                // Move points upwards
                point.y -= point.speed;
                
                // Reset position when point goes off screen
                if (point.y < -10) {
                    point.y = dataStreamCanvas.height + 10;
                    point.x = Math.random() * dataStreamCanvas.width;
                }
            }
            
            dataCtx.strokeStyle = 'rgba(52, 152, 219, 0.3)';
            dataCtx.lineWidth = 0.5;
            dataCtx.stroke();
            
            // Draw points
            for (const point of dataPoints) {
                dataCtx.beginPath();
                dataCtx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
                dataCtx.fillStyle = point.color;
                dataCtx.fill();
            }
            
            requestAnimationFrame(drawDataStreams);
        }
        
        // Start animation if skills section is visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                drawDataStreams();
            }
        }, { threshold: 0.1 });
        
        observer.observe(skillsSection);
    }
});