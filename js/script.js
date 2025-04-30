document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.querySelector(".menu-btn");
  const cancelBtn = document.querySelector(".menu-cross");
  const menubar = document.querySelector(".menubar");
  const body = document.body;

  if (menuBtn && cancelBtn && menubar) {
    menuBtn.addEventListener("click", () => {
      menubar.classList.toggle("active");
      body.style.backgroundColor = "#cfcfcf";
    });

    cancelBtn.addEventListener("click", () => {
      menubar.classList.toggle("active");
      body.style.backgroundColor = "";
    });
  }

  const openVehicle = document.getElementById('openVehicle');
  const openShop = document.getElementById('openShop');
  const vehiclePopup = document.getElementById('vehiclePopup');
  const shopPopup = document.getElementById('shopPopup');

  function closeAllPopups() {
    if (vehiclePopup) vehiclePopup.classList.add('hidden');
    if (shopPopup) shopPopup.classList.add('hidden');
  }

  if (openVehicle && vehiclePopup) {
    openVehicle.addEventListener('click', function(e) {
      e.preventDefault();
      if (vehiclePopup.classList.contains('hidden')) {
        closeAllPopups();
        vehiclePopup.classList.remove('hidden');
      } else {
        vehiclePopup.classList.add('hidden');
      }
    });
  }

  if (openShop && shopPopup) {
    openShop.addEventListener('click', function(e) {
      e.preventDefault();
      if (shopPopup.classList.contains('hidden')) {
        closeAllPopups();
        shopPopup.classList.remove('hidden');
      } else {
        shopPopup.classList.add('hidden');
      }
    });
  }

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.navbar') && !e.target.closest('.popup-container')) {
      closeAllPopups();
    }
  });

  window.addEventListener('scroll', function() {
    closeAllPopups();
  });

  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  const switchButtons = document.querySelectorAll('.switch-model');
  const indicators = document.querySelectorAll('.indicator');
  const modelSections = document.querySelectorAll('.hero-section');

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
  }
});