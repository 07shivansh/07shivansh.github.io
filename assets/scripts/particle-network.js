document.addEventListener('DOMContentLoaded', function() {
    // Add canvas to home section if it doesn't exist
    const homeSection = document.querySelector('#home');
    if (!homeSection.querySelector('#particle-network')) {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-network';
        homeSection.prepend(canvas);
    }
    
    const canvas = document.getElementById('particle-network');
    const ctx = canvas.getContext('2d');
    const particleArray = [];
    let hue = 200; // Start with a blue-ish color
    
    canvas.width = window.innerWidth;
    canvas.height = homeSection.offsetHeight;
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = homeSection.offsetHeight;
    });
    
    const mouse = {
        x: undefined,
        y: undefined,
        radius: 150
    }
    
    document.addEventListener('mousemove', function(event) {
        const rect = canvas.getBoundingClientRect();
        if (event.clientY >= rect.top && event.clientY <= rect.bottom) {
            mouse.x = event.clientX;
            mouse.y = event.clientY - rect.top;
        }
    });
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `hsla(${hue}, 70%, 60%, 0.8)`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Boundary check
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
            
            // Mouse interaction
            if (mouse.x !== undefined && mouse.y !== undefined) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    
                    this.speedX += forceDirectionX * force * 0.6;
                    this.speedY += forceDirectionY * force * 0.6;
                }
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function init() {
        for (let i = 0; i < 80; i++) {
            particleArray.push(new Particle());
        }
    }
    
    function connectParticles() {
        for (let i = 0; i < particleArray.length; i++) {
            for (let j = i; j < particleArray.length; j++) {
                const dx = particleArray[i].x - particleArray[j].x;
                const dy = particleArray[i].y - particleArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${1 - distance/150})`;
                    ctx.lineWidth = 0.2;
                    ctx.moveTo(particleArray[i].x, particleArray[i].y);
                    ctx.lineTo(particleArray[j].x, particleArray[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        hue += 0.2; // Slowly change the color
        if (hue >= 360) hue = 0;
        
        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
            particleArray[i].draw();
        }
        
        connectParticles();
        
        requestAnimationFrame(animate);
    }
    
    init();
    animate();

    // Add binary rain animation to home section
    if (homeSection) {
        const binaryCanvas = document.createElement('canvas');
        binaryCanvas.id = 'binary-rain';
        binaryCanvas.style.position = 'absolute';
        binaryCanvas.style.top = '0';
        binaryCanvas.style.left = '0';
        binaryCanvas.style.width = '100%';
        binaryCanvas.style.height = '100%';
        binaryCanvas.style.opacity = '0.15';
        binaryCanvas.style.zIndex = '0';
        homeSection.insertBefore(binaryCanvas, homeSection.firstChild);
        
        const binaryCtx = binaryCanvas.getContext('2d');
        const binaryChars = "01";
        
        // Set canvas dimensions
        function setBinaryCanvasDimensions() {
            binaryCanvas.width = homeSection.offsetWidth;
            binaryCanvas.height = homeSection.offsetHeight;
        }
        
        setBinaryCanvasDimensions();
        window.addEventListener('resize', setBinaryCanvasDimensions);
        
        // Create binary rain columns
        const fontSize = 14;
        const columns = Math.floor(binaryCanvas.width / fontSize);
        const rainDrops = [];
        
        for (let i = 0; i < columns; i++) {
            rainDrops[i] = {
                x: i * fontSize,
                y: Math.random() * -500,
                speed: 1 + Math.random() * 3,
                length: 5 + Math.floor(Math.random() * 15),
                currentLength: 0
            };
        }
        
        function drawBinaryRain() {
            binaryCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            binaryCtx.fillRect(0, 0, binaryCanvas.width, binaryCanvas.height);
            
            binaryCtx.fillStyle = '#0084ff';
            binaryCtx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < rainDrops.length; i++) {
                const drop = rainDrops[i];
                
                // Draw random binary digit
                const char = binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
                const y = drop.y * fontSize;
                
                // Make the first digit brighter (head of the rain)
                if (drop.currentLength === 0) {
                    binaryCtx.fillStyle = '#3498db';
                } else {
                    // Fade out tail digits
                    const opacity = 1 - (drop.currentLength / drop.length);
                    binaryCtx.fillStyle = `rgba(0, 132, 255, ${opacity})`;
                }
                
                binaryCtx.fillText(char, drop.x, y);
                
                // Move drop
                drop.y += drop.speed;
                drop.currentLength++;
                
                // Reset when reaching max length or going offscreen
                if (drop.currentLength > drop.length || y > binaryCanvas.height + fontSize) {
                    drop.y = Math.random() * -500 / fontSize;
                    drop.currentLength = 0;
                }
            }
            
            requestAnimationFrame(drawBinaryRain);
        }
        
        // Start animation
        drawBinaryRain();
    }
});