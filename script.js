// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.getElementById('loadingScreen');
    let loadingScreenHidden = false;
    const hideLoadingScreen = () => {
        if (!loadingScreen || loadingScreenHidden) return;
        loadingScreenHidden = true;
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    };
    window.addEventListener('load', hideLoadingScreen, { once: true });
    const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
    setTimeout(hideLoadingScreen, isMobileViewport ? 600 : 1200);

    // Create floating particles (respect reduced motion)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && !window.matchMedia('(max-width: 992px)').matches) {
        createParticles();
    }

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuMedia = window.matchMedia('(max-width: 768px)');
    
    const setMenuOpen = (open) => {
        if (!hamburger || !navLinks) return;
        hamburger.classList.toggle('active', open);
        navLinks.classList.toggle('active', open);
        navLinks.inert = mobileMenuMedia.matches && !open;
        hamburger.setAttribute('aria-expanded', String(open));
        hamburger.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    };

    hamburger?.addEventListener('click', () => {
        setMenuOpen(hamburger.getAttribute('aria-expanded') !== 'true');
    });
    setMenuOpen(false);
    mobileMenuMedia.addEventListener('change', () => setMenuOpen(false));
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && hamburger?.getAttribute('aria-expanded') === 'true') {
            setMenuOpen(false);
            hamburger.focus();
        }
    });
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            setMenuOpen(false);
        });
    });
    
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    // Check for saved theme preference or default to dark
    let currentTheme = 'dark';
    try { currentTheme = localStorage.getItem('theme') || 'dark'; } catch (_) { /* Storage may be disabled. */ }
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon?.classList.remove('fa-moon');
        themeIcon?.classList.add('fa-sun');
        themeToggle?.setAttribute('aria-label', 'Switch to dark theme');
    } else {
        themeToggle?.setAttribute('aria-label', 'Switch to light theme');
    }
    
    themeToggle?.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            themeIcon?.classList.remove('fa-moon');
            themeIcon?.classList.add('fa-sun');
            this.setAttribute('aria-label', 'Switch to dark theme');
            try { localStorage.setItem('theme', 'light'); } catch (_) { /* Keep the theme for this page view. */ }
        } else {
            themeIcon?.classList.remove('fa-sun');
            themeIcon?.classList.add('fa-moon');
            this.setAttribute('aria-label', 'Switch to light theme');
            try { localStorage.setItem('theme', 'dark'); } catch (_) { /* Keep the theme for this page view. */ }
        }
    });
    
    // Reveal on view using IntersectionObserver
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px', threshold: 0.15 });
        fadeElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback
        fadeElements.forEach(el => el.classList.add('visible'));
    }

    // Active nav highlight based on section visibility
    const sections = document.querySelectorAll('section[id]');
    const navMap = new Map();
    document.querySelectorAll('.nav-links a').forEach(a => {
        navMap.set(a.getAttribute('href').replace('#', ''), a);
    });
    if (sections.length && 'IntersectionObserver' in window) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.id;
                const link = navMap.get(id);
                if (!link) return;
                if (entry.isIntersecting) {
                    document.querySelectorAll('.nav-links a[aria-current="page"]').forEach(l => l.removeAttribute('aria-current'));
                    link.setAttribute('aria-current', 'page');
                }
            });
        }, { threshold: 0.5 });
        sections.forEach(sec => navObserver.observe(sec));
    }
    
    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (!backToTopButton) return;
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton?.addEventListener('click', function() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    });

    // Current year in footer
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    
    // Form Validation
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    contactForm?.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Reset previous errors
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.textContent = '');
        if (formStatus) {
            formStatus.textContent = '';
            formStatus.classList.remove('error');
        }
        
        let isValid = true;
        let firstInvalidInput = null;
        
        // Name validation
        const nameInput = document.getElementById('name');
        if (nameInput.value.trim() === '') {
            document.getElementById('name-error').textContent = 'Name is required';
            nameInput.setAttribute('aria-invalid', 'true');
            firstInvalidInput ||= nameInput;
            isValid = false;
        } else {
            nameInput.removeAttribute('aria-invalid');
        }
        
        // Email validation
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            document.getElementById('email-error').textContent = 'Email is required';
            emailInput.setAttribute('aria-invalid', 'true');
            firstInvalidInput ||= emailInput;
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email';
            emailInput.setAttribute('aria-invalid', 'true');
            firstInvalidInput ||= emailInput;
            isValid = false;
        } else {
            emailInput.removeAttribute('aria-invalid');
        }
        
        // Message validation
        const messageInput = document.getElementById('message');
        if (messageInput.value.trim() === '') {
            document.getElementById('message-error').textContent = 'Message is required';
            messageInput.setAttribute('aria-invalid', 'true');
            firstInvalidInput ||= messageInput;
            isValid = false;
        } else {
            messageInput.removeAttribute('aria-invalid');
        }
        
        if (!isValid) {
            firstInvalidInput?.focus();
            return;
        }

        // Send only after client-side validation succeeds.
        if (isValid) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
            submitBtn.disabled = true;

            try {
                const action = contactForm.getAttribute('action');
                const formData = new FormData(contactForm);
                const response = await fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const data = await response.json().catch(() => ({}));
                if (!response.ok || data.success === false || data.success === 'false') {
                    throw new Error(data.message || 'Unable to send message right now.');
                }

                if (formStatus) {
                    formStatus.textContent = 'Thanks! Your message was sent successfully.';
                    formStatus.classList.remove('error');
                    formStatus.focus();
                }
                contactForm.reset();
            } catch (error) {
                if (formStatus) {
                    formStatus.textContent = 'Message failed to send. Please email me directly at yousefnagy322@gmail.com.';
                    formStatus.classList.add('error');
                    formStatus.focus();
                }
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            }
        });
    });

    // Copy Email to Clipboard
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const copyTooltip = document.getElementById('copyTooltip');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async function() {
            const email = 'yousefnagy322@gmail.com';
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(email);
                } else {
                    const tempInput = document.createElement('textarea');
                    tempInput.value = email;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    if (!document.execCommand('copy')) throw new Error('Clipboard copy was not available.');
                    document.body.removeChild(tempInput);
                }
                if (copyTooltip) {
                    copyTooltip.textContent = 'Copied!';
                    copyTooltip.style.opacity = '1';
                    copyTooltip.style.transform = 'translateY(-5px)';
                    setTimeout(() => {
                        copyTooltip.textContent = 'Copy Email';
                        copyTooltip.style.opacity = '';
                        copyTooltip.style.transform = '';
                    }, 2200);
                }
            } catch (err) {
                if (copyTooltip) {
                    copyTooltip.textContent = 'yousefnagy322@gmail.com';
                    setTimeout(() => {
                        copyTooltip.textContent = 'Copy Email';
                    }, 3000);
                }
            }
        });
    }

    // Add click effects to buttons
    const canUseHoverEffects = window.matchMedia('(hover: hover)').matches;
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            if (!canUseHoverEffects) return;
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const baseCount = 14;
    const particleCount = prefersReducedMotion ? 0 : (isMobile ? 6 : baseCount);
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 4 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 20;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
    }
}
