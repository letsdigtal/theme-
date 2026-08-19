// Global JavaScript for theme
(function() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Add loaded class to body when page is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      document.body.classList.add('loaded');
    });
  } else {
    document.body.classList.add('loaded');
  }

  // Handle resize events with debounce
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      document.body.classList.add('resizing');
      setTimeout(function() {
        document.body.classList.remove('resizing');
      }, 250);
    }, 250);
  });

  // Lazy loading images (for browsers that don't support native lazy loading)
  if ('loading' in HTMLImageElement.prototype === false) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  }

  // Add intersection observer for animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-animate]').forEach(el => {
    animationObserver.observe(el);
  });

  console.log('Livso Theme Loaded Successfully');
})();
