/**
 * Landing Page JavaScript
 * Handles mobile navigation, scroll effects, lightbox, and interactions
 */

(function() {
    'use strict';

    // ========================================
    // MOBILE NAVIGATION
    // ========================================

    const navToggle = document.querySelector('.lp-nav-toggle');
    const navMenu = document.querySelector('.lp-nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isActive);
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ========================================
    // SCROLL EFFECTS
    // ========================================

    const header = document.querySelector('.lp-header');
    const scrollTopBtn = document.querySelector('.lp-scroll-top');

    function handleScroll() {
        const scrolled = window.scrollY > 100;

        // Add shadow to header on scroll
        if (header) {
            header.classList.toggle('scrolled', scrolled);
        }

        // Show/hide scroll to top button
        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('visible', scrolled);
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Scroll to top button click
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // LIGHTBOX FOR GALLERY
    // ========================================

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.querySelector('.lp-lightbox-close');
    const galleryItems = document.querySelectorAll('.lp-gallery-item');

    if (lightbox && lightboxImage) {
        // Open lightbox on gallery item click
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                if (img) {
                    lightboxImage.src = img.src;
                    lightboxImage.alt = img.alt;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close lightbox
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        // Close on background click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Ignore empty anchors
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ========================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for fade-in effect
    const sections = document.querySelectorAll('.lp-section, .lp-feature, .lp-gallery-item');
    sections.forEach((section, index) => {
        // Set initial state
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;

        observer.observe(section);
    });

    // ========================================
    // PERFORMANCE OPTIMIZATIONS
    // ========================================

    // Throttle scroll events
    let scrollTimeout;
    const originalScrollHandler = handleScroll;

    handleScroll = function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                originalScrollHandler();
                scrollTimeout = null;
            }, 16); // ~60fps
        }
    };

    console.log('Landing Page initialized');
})();
