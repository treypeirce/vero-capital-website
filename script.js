// ===== VERO CAPITAL GROUP - PREMIUM WEBSITE INTERACTIONS =====

class VeroCapitalWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupFormHandling();
        this.setupSmoothScrolling();
        this.setupParallaxEffects();
        this.setupCounterAnimations();
        this.setupMobileMenu();
        this.setupLoadingAnimations();
        this.setupCollapsibleSections();
        this.setupExpertiseTimeline();
        this.setupLuxuryInteractions();
    }

    // ===== NAVIGATION SETUP =====
    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Active navigation highlighting
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ===== SCROLL ANIMATIONS =====
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        };

        // Subtle section fade-ins
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        // Observe sections for fade-in
        const revealElements = document.querySelectorAll('.scroll-reveal');
        revealElements.forEach(el => {
            sectionObserver.observe(el);
        });

        // Hero stats counter animation
        const heroStats = document.querySelectorAll('.hero-stat');
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        heroStats.forEach(stat => {
            heroObserver.observe(stat);
        });

        // Keep regular stat counters for about section
        const regularStats = document.querySelectorAll('.stat');
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        regularStats.forEach(stat => {
            statObserver.observe(stat);
        });
    }

    // ===== COUNTER ANIMATIONS =====
    setupCounterAnimations() {
        this.countersAnimated = new Set();
    }

    animateCounter(statElement) {
        if (this.countersAnimated.has(statElement)) return;
        
        const numberElement = statElement.querySelector('.stat-number');
        if (!numberElement) return;

        const finalText = numberElement.textContent;
        let targetNumber = 0;
        let suffix = '';
        
        // Parse different number formats
        if (finalText.includes('$') && finalText.includes('B')) {
            targetNumber = parseFloat(finalText.replace(/[^0-9.]/g, ''));
            suffix = 'B+';
        } else if (finalText.includes('%')) {
            targetNumber = parseFloat(finalText.replace(/[^0-9.]/g, ''));
            suffix = '%';
        } else if (finalText.includes('+')) {
            targetNumber = parseFloat(finalText.replace(/[^0-9.]/g, ''));
            suffix = '+';
        } else {
            targetNumber = parseFloat(finalText.replace(/[^0-9.]/g, ''));
            suffix = finalText.replace(/[0-9.]/g, '');
        }
        
        let current = 0;
        const duration = 2000; // 2 seconds
        const increment = targetNumber / (duration / 16); // 60fps
        
        // Start from 0
        numberElement.textContent = finalText.includes('$') ? '$0' + suffix : '0' + suffix;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNumber) {
                current = targetNumber;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current * 10) / 10; // One decimal place
            let formattedValue = '';
            
            if (finalText.includes('$')) {
                formattedValue = `$${displayValue}${suffix}`;
            } else {
                formattedValue = `${Math.floor(current)}${suffix}`;
            }
            
            numberElement.textContent = formattedValue;
        }, 16);

        this.countersAnimated.add(statElement);
    }

    // ===== FORM HANDLING =====
    setupFormHandling() {
        const form = document.querySelector('.form');
        const inputs = form.querySelectorAll('input, select, textarea');

        // Enhanced form validation and styling
        inputs.forEach(input => {
            // Add floating label effect
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    input.classList.add('has-value');
                } else {
                    input.classList.remove('has-value');
                }
            });

            // Add focus effects
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });
    }

    async handleFormSubmission(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        try {
            await this.simulateFormSubmission(new FormData(form));
            
            // Success state
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#28a745';
            
            // Show success message
            this.showNotification('Thank you for your message. We\'ll be in touch soon!', 'success');
            
            // Reset form
            setTimeout(() => {
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
            
        } catch (error) {
            // Error state
            submitBtn.textContent = 'Error - Try Again';
            submitBtn.style.background = '#dc3545';
            
            this.showNotification('There was an error sending your message. Please try again.', 'error');
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }
    }

    simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            maxWidth: '400px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        });

        if (type === 'success') {
            notification.style.background = '#28a745';
        } else if (type === 'error') {
            notification.style.background = '#dc3545';
        } else {
            notification.style.background = '#17a2b8';
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // ===== SMOOTH SCROLLING =====
    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 100; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===== PARALLAX EFFECTS =====
    setupParallaxEffects() {
        const hero = document.querySelector('.hero');
        const heroBackground = document.querySelector('.hero::before');
        const parallaxElements = document.querySelectorAll('.parallax-element');
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            // General parallax elements
            parallaxElements.forEach((element, index) => {
                const rect = element.getBoundingClientRect();
                const speed = 0.5 + (index * 0.1); // Varying speeds
                
                if (rect.top < windowHeight && rect.bottom > 0) {
                    const yPos = -(scrolled - element.offsetTop) * speed * 0.1;
                    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }
            });
            
            ticking = false;
        };
        
        const requestParallaxUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
        
        // Initialize on load
        updateParallax();
    }

    // ===== MOBILE MENU =====
    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            // Close menu when clicking on a link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        }
    }

    // ===== LOADING ANIMATIONS =====
    setupLoadingAnimations() {
        window.addEventListener('load', () => {
            // Animate hero title
            const titleLines = document.querySelectorAll('.title-line');
            titleLines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.animationDelay = `${index * 0.3}s`;
                }, index * 300);
            });

            // Add loaded class to body for any CSS animations
            document.body.classList.add('loaded');
        });
    }

    // ===== COLLAPSIBLE SECTIONS =====
    setupCollapsibleSections() {
        const collapsibleTriggers = document.querySelectorAll('.collapsible-trigger');
        
        collapsibleTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = trigger.getAttribute('data-target');
                const targetContent = document.querySelector(targetId);
                
                if (targetContent) {
                    const isExpanded = targetContent.classList.contains('expanded');
                    
                    // Close all other collapsible sections
                    document.querySelectorAll('.collapsible-content.expanded').forEach(content => {
                        if (content !== targetContent) {
                            content.classList.remove('expanded');
                            content.style.maxHeight = '0px';
                        }
                    });
                    
                    // Toggle current section
                    if (isExpanded) {
                        targetContent.classList.remove('expanded');
                        targetContent.style.maxHeight = '0px';
                        trigger.classList.remove('active');
                    } else {
                        targetContent.classList.add('expanded');
                        targetContent.style.maxHeight = targetContent.scrollHeight + 'px';
                        trigger.classList.add('active');
                    }
                }
            });
        });
    }

    // ===== EXPERTISE TIMELINE =====
    setupExpertiseTimeline() {
        const timeline = document.querySelector('.expertise-timeline');
        if (!timeline) return;

        const progressLine = timeline.querySelector('.progress-line');
        const progressIndicator = timeline.querySelector('.progress-indicator');
        const expertiseItems = timeline.querySelectorAll('.expertise-item');
        
        let currentActive = -1;
        let timelineRect = null;

        // Intersection Observer for scroll-triggered expansion
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const item = entry.target;
                const index = parseInt(item.dataset.index);
                
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    // Activate this item
                    if (currentActive !== index) {
                        this.activateExpertiseItem(item, index, expertiseItems);
                        currentActive = index;
                        this.updateTimelineProgress(index, expertiseItems.length, progressLine, progressIndicator, timeline);
                    }
                }
            });
        }, {
            threshold: [0.3, 0.7],
            rootMargin: '-20% 0px -50% 0px'
        });

        // Observe all expertise items
        expertiseItems.forEach(item => {
            timelineObserver.observe(item);
        });

        // Update timeline rect on resize
        window.addEventListener('resize', () => {
            timelineRect = null;
        });
    }

    activateExpertiseItem(activeItem, activeIndex, allItems) {
        // Deactivate all items
        allItems.forEach(item => {
            item.classList.remove('active');
        });

        // Activate the current item
        activeItem.classList.add('active');

        // Add staggered delay for visual appeal
        setTimeout(() => {
            activeItem.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 300);
    }

    updateTimelineProgress(activeIndex, totalItems, progressLine, progressIndicator, timeline) {
        if (!progressLine || !progressIndicator) return;

        // Calculate progress percentage
        const progress = ((activeIndex + 1) / totalItems) * 100;
        
        // Update progress line height
        progressLine.style.height = `${progress}%`;

        // Calculate indicator position
        const timelineHeight = timeline.offsetHeight;
        const indicatorPosition = (activeIndex / (totalItems - 1)) * timelineHeight;
        
        // Update indicator position
        progressIndicator.style.transform = `translateY(${indicatorPosition}px)`;

        // Add pulse effect to indicator
        progressIndicator.style.animation = 'none';
        setTimeout(() => {
            progressIndicator.style.animation = 'pulse 2s infinite';
        }, 100);
    }

    // ===== LUXURY INTERACTIONS =====
    setupLuxuryInteractions() {
        // Enhanced hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('.interactive-element');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });

        // Magnetic button effect
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-3px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });

        // Text reveal animation on scroll
        const textElements = document.querySelectorAll('.luxury-text');
        textElements.forEach(element => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            });
            observer.observe(element);
        });
    }
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== ENHANCED INTERACTIONS =====

// Add hover effects to service cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .menu-open {
        overflow: hidden;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// ===== INITIALIZE WEBSITE =====
document.addEventListener('DOMContentLoaded', () => {
    new VeroCapitalWebsite();
});

// ===== PERFORMANCE OPTIMIZATIONS =====

// Lazy load images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Preload critical resources
const preloadLinks = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap'
];

preloadLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
});

// Service Worker registration for caching (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
