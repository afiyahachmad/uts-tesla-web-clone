document.addEventListener('DOMContentLoaded', function() {
    const switchButtons = document.querySelectorAll('.switch-model');
    const indicators = document.querySelectorAll('.indicator');
    const modelSections = document.querySelectorAll('.hero-section');
    let isScrolling = false;
    let lastScrollTime = 0;

    function switchModel(targetId) {
      modelSections.forEach(section => {
        section.classList.remove('active');
        if (section.id === targetId) {
          section.classList.add('active');
        }
      });

      indicators.forEach(indicator => {
        indicator.classList.remove('active');
        if (indicator.dataset.target === targetId) {
          indicator.classList.add('active');
        }
      });
    }

    if (switchButtons.length && indicators.length && modelSections.length) {
      switchButtons.forEach(button => {
        button.addEventListener('click', function() {
          const target = this.dataset.target;
          switchModel(target);
        });
      });

      indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
          const target = this.dataset.target;
          switchModel(target);
        });
      });
    }

    window.addEventListener('wheel', function(e) {
      const now = Date.now();
      if (now - lastScrollTime < 1000) return; // Debounce scroll events
      lastScrollTime = now;

      if (isScrolling) return;
      isScrolling = true;

      const currentActive = document.querySelector('.hero-section.active');
      let targetId;
      
      if (e.deltaY > 0) {
        targetId = currentActive.id === 'performance' ? 'longrange' : 'performance';
      } else {
        targetId = currentActive.id === 'longrange' ? 'performance' : 'longrange';
      }

      switchModel(targetId);
      
      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    });

    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    const modelSwitcher = document.querySelector('.model-switcher');
    if (modelSwitcher) {
      let startX, currentX;
      const threshold = 50;

      modelSwitcher.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
      });

      modelSwitcher.addEventListener('touchmove', function(e) {
        currentX = e.touches[0].clientX;
        e.preventDefault();
      });

      modelSwitcher.addEventListener('touchend', function() {
        const diffX = startX - currentX;
        
        if (Math.abs(diffX) > threshold) {
          const currentActive = document.querySelector('.hero-section.active');
          const targetId = currentActive.id === 'performance' ? 'longrange' : 'performance';
          switchModel(targetId);
        }
      });

      modelSwitcher.addEventListener('mousedown', function(e) {
        startX = e.clientX;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      });

      function handleMouseMove(e) {
        currentX = e.clientX;
      }

      function handleMouseUp() {
        const diffX = startX - currentX;
        
        if (Math.abs(diffX) > threshold) {
          const currentActive = document.querySelector('.hero-section.active');
          const targetId = currentActive.id === 'performance' ? 'longrange' : 'performance';
          switchModel(targetId);
        }
        
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
    }
  });

  