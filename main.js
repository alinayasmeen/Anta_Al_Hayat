// Loading animation
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loadingOverlay').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loadingOverlay').style.display = 'none';
                }, 500);
            }, 1000);
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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

        // Advanced header effects
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.style.background = 'rgba(10, 10, 15, 0.98)';
                header.style.boxShadow = '0 4px 30px rgba(0, 255, 255, 0.1)';
                header.style.backdropFilter = 'blur(25px)';
            } else {
                header.style.background = 'rgba(10, 10, 15, 0.95)';
                header.style.boxShadow = 'none';
                header.style.backdropFilter = 'blur(20px)';
            }
            
            // Hide/show header on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
        });

        // Advanced scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observe all fade-up elements
        document.querySelectorAll('.fade-up').forEach(el => {
            observer.observe(el);
        });

        // Enhanced form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Basic validation
            if (!data.name || !data.email || !data.service || !data.message) {
                alert('Please fill in all fields.');
                return;
            }

            // WhatsApp message format
            const phone = '923151080765'; // WhatsApp requires country code (Pakistan: 92)
            const text = `Name: ${data.name}%0AEmail: ${data.email}%0AService: ${data.service}%0AMessage: ${data.message}`;
            const whatsappUrl = `https://wa.me/${phone}?text=${text}`;

            // Redirect to WhatsApp
            window.open(whatsappUrl, '_blank');
        });

        // Advanced particle system
        function createAdvancedParticles() {
            const particleCount = 100;
            const particles = [];
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: linear-gradient(45deg, #00ffff, #0080ff);
                    border-radius: 50%;
                    pointer-events: none;
                `;
                
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.top = window.innerHeight + 10 + 'px';
                
                document.body.appendChild(particle);
                particles.push({
                    element: particle,
                    x: parseFloat(particle.style.left),
                    y: parseFloat(particle.style.top),
                    vx: (Math.random() - 0.5) * 2,
                    vy: -Math.random() * 3 - 1,
                    life: 1,
                    decay: Math.random() * 0.02 + 0.005
                });
            }
            
            function animateParticles() {
                particles.forEach((particle, index) => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    particle.life -= particle.decay;
                    
                    particle.element.style.left = particle.x + 'px';
                    particle.element.style.top = particle.y + 'px';
                    particle.element.style.opacity = particle.life;
                    
                    if (particle.life <= 0 || particle.y < -10) {
                        particle.element.remove();
                        particles.splice(index, 1);
                    }
                });
                
                if (particles.length > 0) {
                    requestAnimationFrame(animateParticles);
                }
            }
            
            animateParticles();
        }

        // Trigger particles periodically
        setInterval(createAdvancedParticles, 5000);

        // Mobile menu functionality
        function createMobileMenu() {
            if (window.innerWidth <= 768) {
                const nav = document.querySelector('.nav');
                const navLinks = document.querySelector('.nav-links');
                
                if (!document.querySelector('.mobile-menu-btn')) {
                    const menuBtn = document.createElement('button');
                    menuBtn.className = 'mobile-menu-btn';
                    menuBtn.innerHTML = '☰';
                    menuBtn.style.cssText = `
                        background: none;
                        border: none;
                        color: #00ffff;
                        font-size: 1.5rem;
                        cursor: pointer;
                        padding: 10px;
                        border-radius: 5px;
                        transition: background 0.3s ease;
                    `;
                    
                    menuBtn.addEventListener('click', () => {
                        const isVisible = navLinks.style.display === 'flex';
                        navLinks.style.display = isVisible ? 'none' : 'flex';
                        navLinks.style.flexDirection = 'column';
                        navLinks.style.position = 'absolute';
                        navLinks.style.top = '100%';
                        navLinks.style.left = '0';
                        navLinks.style.right = '0';
                        navLinks.style.background = 'rgba(10, 10, 15, 0.98)';
                        navLinks.style.padding = '1rem';
                        navLinks.style.backdropFilter = 'blur(20px)';
                        navLinks.style.border = '1px solid rgba(0, 255, 255, 0.1)';
                        navLinks.style.borderTop = 'none';
                        menuBtn.innerHTML = isVisible ? '☰' : '✕';
                    });
                    
                    nav.appendChild(menuBtn);
                }
            }
        }

        // Initialize mobile menu
        createMobileMenu();
        window.addEventListener('resize', createMobileMenu);

        // Advanced cursor effects
        const cursor = document.createElement('div');
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(0, 255, 255, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: screen;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Enhance cursor on interactive elements
        document.querySelectorAll('a, button, .service-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = 'radial-gradient(circle, rgba(0, 255, 255, 0.6) 0%, transparent 70%)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'radial-gradient(circle, rgba(0, 255, 255, 0.8) 0%, transparent 70%)';
            });
        });

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            // Add stagger animation to service cards
            const serviceCards = document.querySelectorAll('.service-card');
            serviceCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.2}s`;
            });

            // Add typing effect to hero text
            const heroText = document.querySelector('.hero-subtitle');
            const originalText = heroText.textContent;
            heroText.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < originalText.length) {
                    heroText.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }
});
            
            setTimeout(typeWriter, 1000);
        });

