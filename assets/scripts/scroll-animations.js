document.addEventListener('DOMContentLoaded', function() {
    // Set up intersection observer for fade-in effects
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Add animate-element class to all section titles
    const sectionTitles = document.querySelectorAll('section h2');
    sectionTitles.forEach(title => {
        title.classList.add('title-animate');
        observer.observe(title);
    });
    
    // Elements to animate
    const elementsToAnimate = document.querySelectorAll('.project-card, .education-card, .experience-card, .skill-category, .about-content p');
    elementsToAnimate.forEach(element => {
        element.classList.add('animate-element');
        observer.observe(element);
    });
    
    // Parallax scrolling effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Parallax for hero section
        const heroSection = document.querySelector('#home');
        if (heroSection) {
            const scrollSpeed = 0.3;
            const yPos = scrollPosition * scrollSpeed;
            heroSection.style.backgroundPositionY = yPos + 'px';
        }
        
        // Parallax for background elements
        document.querySelectorAll('.parallax-bg').forEach(element => {
            const speed = element.dataset.speed || 0.2;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
    
    // Terminal typing effect for About section
    function setupTerminalEffect() {
        const aboutContent = document.querySelector('.about-content');
        if (!aboutContent) return;
        
        // Create terminal container
        const terminalContainer = document.createElement('div');
        terminalContainer.className = 'terminal-container';
        
        // Create terminal header
        const terminalHeader = document.createElement('div');
        terminalHeader.className = 'terminal-header';
        terminalHeader.innerHTML = `
            <div class="terminal-buttons">
                <span class="terminal-button red"></span>
                <span class="terminal-button yellow"></span>
                <span class="terminal-button green"></span>
            </div>
            <div class="terminal-title">shivansh@portfolio:~/about</div>
        `;
        
        // Create terminal content
        const terminalContent = document.createElement('div');
        terminalContent.className = 'terminal-content';
        
        // Place existing paragraphs in terminal content
        const paragraphs = aboutContent.querySelectorAll('p');
        
        // Add typed effect to each paragraph
        paragraphs.forEach((para, index) => {
            const originalText = para.textContent;
            const commandPrompt = document.createElement('div');
            commandPrompt.className = 'command-prompt';
            
            // Different prompts for each paragraph
            let prompt = '';
            if (index === 0) {
                prompt = '> cat personal-info.txt';
            } else if (index === 1) {
                prompt = '> cat background.txt';
            } else {
                prompt = '> cat interests.txt';
            }
            
            commandPrompt.textContent = prompt;
            
            // Create element for typed text
            const typedOutput = document.createElement('div');
            typedOutput.className = 'typed-output';
            typedOutput.setAttribute('data-text', originalText);
            
            // Add both to terminal content
            terminalContent.appendChild(commandPrompt);
            terminalContent.appendChild(typedOutput);
        });
        
        // Assemble terminal
        terminalContainer.appendChild(terminalHeader);
        terminalContainer.appendChild(terminalContent);
        
        // Replace original content
        aboutContent.innerHTML = '';
        aboutContent.appendChild(terminalContainer);
        
        // Set up typing animation
        function typeText() {
            const outputs = document.querySelectorAll('.typed-output');
            outputs.forEach((output, index) => {
                setTimeout(() => {
                    const text = output.getAttribute('data-text');
                    let i = 0;
                    const typing = setInterval(() => {
                        if (i < text.length) {
                            output.textContent += text.charAt(i);
                            i++;
                        } else {
                            clearInterval(typing);
                            // Add blinking cursor at the end
                            const cursor = document.createElement('span');
                            cursor.className = 'cursor';
                            cursor.innerHTML = '&nbsp;';
                            output.appendChild(cursor);
                        }
                    }, 30);
                }, index * 1000); // Delay between paragraphs
            });
        }
        
        // Start typing when the about section is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeText();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(aboutContent);
    }
    
    setupTerminalEffect();
});