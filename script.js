document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle functionality
  const themeToggle = document.getElementById('themeToggle');
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  const mobileSunIcon = document.getElementById('mobileSunIcon');
  const mobileMoonIcon = document.getElementById('mobileMoonIcon');
  const body = document.body;

  // Initialize theme on page load
  function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      body.classList.add('dark-theme');
      if (sunIcon) sunIcon.classList.add('hidden');
      if (moonIcon) moonIcon.classList.remove('hidden');
      if (mobileSunIcon) mobileSunIcon.classList.add('hidden');
      if (mobileMoonIcon) mobileMoonIcon.classList.remove('hidden');
    } else {
      body.classList.remove('dark-theme');
      if (sunIcon) sunIcon.classList.remove('hidden');
      if (moonIcon) moonIcon.classList.add('hidden');
      if (mobileSunIcon) mobileSunIcon.classList.remove('hidden');
      if (mobileMoonIcon) mobileMoonIcon.classList.add('hidden');
    }
  }

  // Call initializeTheme immediately
  initializeTheme();

  // Toggle theme function
  function toggleTheme() {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    
    if (sunIcon) sunIcon.classList.toggle('hidden', isDark);
    if (moonIcon) moonIcon.classList.toggle('hidden', !isDark);
    if (mobileSunIcon) mobileSunIcon.classList.toggle('hidden', isDark);
    if (mobileMoonIcon) mobileMoonIcon.classList.toggle('hidden', !isDark);
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  // Event listeners for theme toggles
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

  // Mobile menu functionality
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMobileMenu = document.getElementById('closeMobileMenu');

  function openMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuButton) mobileMenuButton.addEventListener('click', openMobileMenu);
  if (closeMobileMenu) closeMobileMenu.addEventListener('click', closeMobileMenu);

  // Close mobile menu when clicking on links
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Age calculation and dynamic about text
  function calculateAge(birthMonth, birthDay, birthYear) {
    const today = new Date();
    let age = today.getFullYear() - birthYear;
    const m = today.getMonth() + 1;
    const d = today.getDate();
    if (m < birthMonth || (m === birthMonth && d < birthDay)) {
      age--;
    }
    return age;
  }

  const aboutText = document.getElementById('about-text');
  if (aboutText) {
    const age = calculateAge(4, 27, 2006);
    aboutText.innerHTML = `I'm a <strong>${age}-year-old</strong> front-end developer and <strong>Entrepreneur</strong> based in Ethiopia. As the <strong>Chief Product Officer (CPO)</strong> of Nuner, a rental platform for houses and cars, I combine technical expertise with product leadership. My front-end development skills in HTML, CSS, JavaScript, and Tailwind enable me to build real projects while my entrepreneurial mindset drives innovation and growth.`;
  }

  // Image modal functionality
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');

  function openModal(src) {
    if (modal && modalImg) {
      modalImg.src = src;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Close modal when clicking outside the image
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Prevent modal from closing when clicking on the image
  if (modalImg) {
    modalImg.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }

  // Intersection Observer for scroll animations
  const fadeElements = document.querySelectorAll('.fade-in-up');
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
      observer.observe(element);
    });
  }

  // Close modal when pressing Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Initialize all fade-in-up elements as inactive initially
  fadeElements.forEach(element => {
    element.classList.remove('active');
  });

  // Force a reflow to ensure animations can trigger
  setTimeout(() => {
    fadeElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
    });
  }, 50);
});
