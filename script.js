// Prevent FOUC by removing 'no-js' immediately
document.body.classList.remove('no-js');

document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;

  /* ---------------------------
     THEME TOGGLE FUNCTIONALITY
  --------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  const mobileSunIcon = document.getElementById('mobileSunIcon');
  const mobileMoonIcon = document.getElementById('mobileMoonIcon');

  function applyTheme(isDark) {
    body.classList.toggle('dark-theme', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Update icons
    [sunIcon, mobileSunIcon].forEach(icon => icon && icon.classList.toggle('hidden', isDark));
    [moonIcon, mobileMoonIcon].forEach(icon => icon && icon.classList.toggle('hidden', !isDark));
  }

  function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    applyTheme(isDark);
  }

  function toggleTheme() {
    applyTheme(!body.classList.contains('dark-theme'));
  }

  initializeTheme();

  [themeToggle, mobileThemeToggle].forEach(toggle => {
    if (toggle) {
      toggle.addEventListener('click', toggleTheme);
      toggle.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') toggleTheme();
      });
    }
  });

  /* ---------------------------
     MOBILE MENU FUNCTIONALITY
  --------------------------- */
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMobileMenuBtn = document.getElementById('closeMobileMenu');

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('active');
    body.style.overflow = 'hidden';
    const firstLink = mobileMenu.querySelector('.mobile-nav-link');
    if (firstLink) firstLink.focus();
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('active');
    body.style.overflow = '';
    if (mobileMenuButton) mobileMenuButton.focus();
  }

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', openMobileMenu);
    mobileMenuButton.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openMobileMenu();
    });
  }

  if (closeMobileMenuBtn) {
    closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
    closeMobileMenuBtn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') closeMobileMenu();
    });
  }

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
    link.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') closeMobileMenu();
    });
  });

  /* ---------------------------
     ABOUT TEXT (AGE CALCULATION)
  --------------------------- */
  const aboutText = document.getElementById('about-text');

  function calculateAge(birthMonth, birthDay, birthYear) {
    const today = new Date();
    let age = today.getFullYear() - birthYear;
    if (today.getMonth() + 1 < birthMonth || 
       (today.getMonth() + 1 === birthMonth && today.getDate() < birthDay)) {
      age--;
    }
    return age;
  }

  if (aboutText) {
    const age = calculateAge(4, 27, 2006);
    aboutText.innerHTML = `I'm a <strong>front-end developer</strong> and <strong>Entrepreneur</strong> based in Ethiopia. As the <strong>Chief Product Officer (CPO)</strong> of Nuner, a rental platform for houses and cars, I combine technical expertise with product leadership. My <strong>front-end development</strong> skills in HTML, CSS, JavaScript, and Tailwind enable me to build real projects while my entrepreneurial mindset drives innovation and growth.`;
  }

  /* ---------------------------
     IMAGE MODAL FUNCTIONALITY
  --------------------------- */
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const certificateImages = document.querySelectorAll('.certificate-img');

  function openModal(src) {
    if (!modal || !modalImg) return;
    modalImg.src = src;
    modal.classList.add('active');
    body.style.overflow = 'hidden';
    modal.setAttribute('aria-hidden', 'false');
    modal.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    body.style.overflow = '';
    modal.setAttribute('aria-hidden', 'true');
  }

  certificateImages.forEach(img => {
    img.addEventListener('click', () => openModal(img.src));
    img.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openModal(img.src);
    });
  });

  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
  }

  if (modalImg) {
    modalImg.addEventListener('click', e => e.stopPropagation());
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  /* ---------------------------
     FADE-IN-UP ANIMATION REMOVED
     (Elements instantly visible)
  --------------------------- */
  try {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.transition = 'none';
    });
  } catch (error) {
    console.error('Fade-in-up removal error:', error);
  }

  /* ---------------------------
     GLOBAL FUNCTION EXPORT
  --------------------------- */
  window.closeMobileMenu = closeMobileMenu;
  window.openModal = openModal;
  window.closeModal = closeModal;
});



