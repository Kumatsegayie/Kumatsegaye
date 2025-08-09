// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const mobileSunIcon = document.getElementById('mobileSunIcon');
const mobileMoonIcon = document.getElementById('mobileMoonIcon');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply the current theme
if (currentTheme === 'dark') {
  document.documentElement.classList.add('dark-theme');
  sunIcon.classList.add('hidden');
  moonIcon.classList.remove('hidden');
  mobileSunIcon.classList.add('hidden');
  mobileMoonIcon.classList.remove('hidden');
} else {
  document.documentElement.classList.remove('dark-theme');
  sunIcon.classList.remove('hidden');
  moonIcon.classList.add('hidden');
  mobileSunIcon.classList.remove('hidden');
  mobileMoonIcon.classList.add('hidden');
}

// Toggle theme
function toggleTheme() {
  if (document.documentElement.classList.contains('dark-theme')) {
    document.documentElement.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
    mobileSunIcon.classList.remove('hidden');
    mobileMoonIcon.classList.add('hidden');
  } else {
    document.documentElement.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
    mobileSunIcon.classList.add('hidden');
    mobileMoonIcon.classList.remove('hidden');
  }
}

// Add event listeners
themeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);

// Mobile menu functionality
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');
const closeMobileMenu = document.getElementById('closeMobileMenu');

mobileMenuButton.addEventListener('click', () => {
  mobileMenu.style.display = 'block';
});

closeMobileMenu.addEventListener('click', () => {
  mobileMenu.style.display = 'none';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.style.display = 'none';
  });
});

// Age calculation
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

document.addEventListener("DOMContentLoaded", () => {
  const age = calculateAge(4, 27, 2006);
  const about = document.getElementById("about-text");
  about.innerHTML = `I'm a <strong>${age}-year-old</strong> front-end developer and <strong>Entrepreneur</strong> based in Ethiopia. As the <strong>Chief Product Officer (CPO)</strong> of Nuner, a rental platform for houses and cars, I combine technical expertise with product leadership. My front-end development skills in HTML, CSS, JavaScript, and Tailwind enable me to build real projects while my entrepreneurial mindset drives innovation and growth.`;
  
  // Initialize modal as hidden
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
});

function openModal(src) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  modalImg.src = src;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
  
  document.querySelector('.modal-content')?.addEventListener('click', function(e) {
    e.stopPropagation();
  });
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
  document.getElementById("modalImg").src = "";
}

document.getElementById("imageModal").addEventListener("click", function(e) {
  if (e.target === this) {
    closeModal();
  }
});

// Intersection Observer for animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
