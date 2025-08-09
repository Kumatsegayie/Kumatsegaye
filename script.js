document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle functionality
  const themeToggle = document.getElementById('themeToggle');
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  const mobileSunIcon = document.getElementById('mobileSunIcon');
  const mobileMoonIcon = document.getElementById('mobileMoonIcon');
  const body = document.body;

  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply theme on load
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.add('dark-theme');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
    mobileSunIcon.classList.add('hidden');
    mobileMoonIcon.classList.remove('hidden');
  }

  // Toggle theme function
  function toggleTheme() {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    
    // Toggle icons
    sunIcon.classList.toggle('hidden', isDark);
    moonIcon.classList.toggle('hidden', !isDark);
    mobileSunIcon.classList.toggle('hidden', isDark);
    mobileMoonIcon.classList.toggle('hidden', !isDark);
    
    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  // Event listeners for theme toggles
  themeToggle.addEventListener('click', toggleTheme);
  mobileThemeToggle.addEventListener('click', toggleTheme);

  // Mobile menu functionality
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMobileMenu = document.getElementById('closeMobileMenu');

  function openMobileMenu() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileMenuButton.addEventListener('click', openMobileMenu);
  closeMobileMenu.addEventListener('click', closeMobileMenu);

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

  const age = calculateAge(4, 27, 2006);
  const aboutText = document.getElementById('about-text');
  if (aboutText) {
    aboutText.innerHTML = `I'm a <strong>${age}-year-old</strong> front-end developer and <strong>Entrepreneur</strong> based in Ethiopia. As the <strong>Chief Product Officer (CPO)</strong> of Nuner, a rental platform for houses and cars, I combine technical expertise with product leadership. My front-end development skills in HTML, CSS, JavaScript, and Tailwind enable me to build real projects while my entrepreneurial mindset drives innovation and growth.`;
  }

  // Image modal functionality
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');

  function openModal(src) {
    modalImg.src = src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close modal when clicking outside the image
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Prevent modal from closing when clicking on the image
  modalImg.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  // Intersection Observer for scroll animations
  const fadeElements = document.querySelectorAll('.fade-in-up');

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

  // Close modal when pressing Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});
