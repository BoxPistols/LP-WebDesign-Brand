/**
 * Landing Page JavaScript
 * Handles mobile navigation, scroll effects, lightbox, and interactions
 * Optimized for mobile devices with touch support
 */

(function () {
  'use strict';

  // ========================================
  // MOBILE/TOUCH DETECTION
  // ========================================

  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  // Add touch class to body for CSS targeting
  if (isTouchDevice()) {
    document.body.classList.add('touch-device');
  }

  // Prevent double-tap zoom on buttons (iOS Safari)
  document.addEventListener(
    'touchend',
    function (e) {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        e.preventDefault();
        e.target.click();
      }
    },
    { passive: false }
  );

  // ========================================
  // MOBILE NAVIGATION
  // ========================================

  const navToggle = document.querySelector('.lp-nav-toggle');
  const navMenu = document.querySelector('.lp-nav-menu');

  if (navToggle && navMenu) {
    // Support both click and touch
    const toggleMenu = function (e) {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      const isActive = navMenu.classList.contains('active');
      navToggle.setAttribute('aria-expanded', isActive);

      // Prevent body scroll when menu is open on mobile
      if (isActive && isTouchDevice()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    navToggle.addEventListener('click', toggleMenu);

    // Touch optimization for mobile
    if (isTouchDevice()) {
      navToggle.addEventListener(
        'touchstart',
        function (e) {
          e.preventDefault();
        },
        { passive: false }
      );
    }

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking/touching outside
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Swipe to close menu on mobile
    if (isTouchDevice()) {
      let touchStartX = 0;
      let touchStartY = 0;

      navMenu.addEventListener(
        'touchstart',
        function (e) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        },
        { passive: true }
      );

      navMenu.addEventListener(
        'touchend',
        function (e) {
          const touchEndX = e.changedTouches[0].clientX;
          const touchEndY = e.changedTouches[0].clientY;
          const deltaX = touchEndX - touchStartX;
          const deltaY = touchEndY - touchStartY;

          // Swipe up to close (more than 100px vertical swipe)
          if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < -100) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
          }
        },
        { passive: true }
      );
    }
  }

  // ========================================
  // SCROLL EFFECTS
  // ========================================

  const header = document.querySelector('.lp-header');
  const scrollTopBtn = document.querySelector('.lp-scroll-top');

  let handleScroll = function () {
    const scrolled = window.scrollY > 100;

    // Add shadow to header on scroll
    if (header) {
      header.classList.toggle('scrolled', scrolled);
    }

    // Show/hide scroll to top button
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('visible', scrolled);
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Scroll to top button click/touch
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });

    // Touch support for scroll to top
    if (isTouchDevice()) {
      scrollTopBtn.addEventListener(
        'touchstart',
        function (e) {
          e.preventDefault();
        },
        { passive: false }
      );
    }
  }

  // ========================================
  // LIGHTBOX FOR GALLERY
  // ========================================

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.querySelector('.lp-lightbox-close');
  const galleryItems = document.querySelectorAll('.lp-gallery-item');

  if (lightbox && lightboxImage) {
    // Open lightbox on gallery item click/touch
    galleryItems.forEach((item) => {
      const openLightbox = function () {
        const img = this.querySelector('img');
        if (img) {
          lightboxImage.src = img.src;
          lightboxImage.alt = img.alt;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      };

      item.addEventListener('click', openLightbox);

      // Touch optimization
      if (isTouchDevice()) {
        item.addEventListener(
          'touchstart',
          function (e) {
            // Prevent ghost click
            e.preventDefault();
          },
          { passive: false }
        );
      }
    });

    // Close lightbox
    const closeLightbox = function () {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);

      // Touch support for close button
      if (isTouchDevice()) {
        lightboxClose.addEventListener(
          'touchstart',
          function (e) {
            e.preventDefault();
          },
          { passive: false }
        );
      }
    }

    // Close on background click/touch
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Swipe down to close lightbox on mobile
    if (isTouchDevice()) {
      let touchStartY = 0;
      let touchStartX = 0;

      lightbox.addEventListener(
        'touchstart',
        function (e) {
          touchStartY = e.touches[0].clientY;
          touchStartX = e.touches[0].clientX;
        },
        { passive: true }
      );

      lightbox.addEventListener(
        'touchend',
        function (e) {
          const touchEndY = e.changedTouches[0].clientY;
          const touchEndX = e.changedTouches[0].clientX;
          const deltaY = touchEndY - touchStartY;
          const deltaX = touchEndX - touchStartX;

          // Swipe down to close (more than 100px vertical swipe)
          if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 100) {
            closeLightbox();
          }
        },
        { passive: true }
      );
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================

  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
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
          behavior: 'smooth',
        });
      }
    });
  });

  // ========================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ========================================

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
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

  handleScroll = function () {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function () {
        originalScrollHandler();
        scrollTimeout = null;
      }, 16); // ~60fps
    }
  };

  console.log('Landing Page initialized');
})();
