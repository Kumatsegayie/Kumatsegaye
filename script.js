document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('img:not(.brand-mark):not(.about-portrait img)').forEach(function (img) {
    if (!img.hasAttribute('loading')) img.loading = 'lazy';
    img.decoding = 'async';
  });

  var revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px 12% 0px', threshold: 0.01 });
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var leadstarSlides = Array.prototype.slice.call(document.querySelectorAll('[data-gallery="leadstar"]'));
  var leadstarIndex = 0;
  var leadstarCount = document.getElementById('leadstarCount');
  var leadstarPrev = document.getElementById('leadstarPrev');
  var leadstarNext = document.getElementById('leadstarNext');

  function showLeadstarSlide(index) {
    if (!leadstarSlides.length) return;
    leadstarIndex = (index + leadstarSlides.length) % leadstarSlides.length;
    leadstarSlides.forEach(function (slide, slideIndex) {
      slide.classList.toggle('active', slideIndex === leadstarIndex);
    });
    if (leadstarCount) leadstarCount.textContent = (leadstarIndex + 1) + ' / ' + leadstarSlides.length;
  }

  if (leadstarPrev) leadstarPrev.addEventListener('click', function () {
    showLeadstarSlide(leadstarIndex - 1);
  });

  if (leadstarNext) leadstarNext.addEventListener('click', function () {
    showLeadstarSlide(leadstarIndex + 1);
  });

  showLeadstarSlide(0);

  var peopleTrack = document.getElementById('peopleTrack');
  var peoplePrev = document.getElementById('peoplePrev');
  var peopleNext = document.getElementById('peopleNext');

  function peopleScrollAmount() {
    var card = peopleTrack ? peopleTrack.querySelector('.person-card') : null;
    if (!card) return 320;
    var computed = window.getComputedStyle(peopleTrack);
    var gap = parseFloat(computed.gap || computed.columnGap || '16') || 16;
    return card.getBoundingClientRect().width + gap;
  }

  if (peoplePrev && peopleTrack) {
    peoplePrev.addEventListener('click', function () {
      peopleTrack.scrollBy({ left: -peopleScrollAmount(), behavior: 'smooth' });
    });
  }

  if (peopleNext && peopleTrack) {
    peopleNext.addEventListener('click', function () {
      peopleTrack.scrollBy({ left: peopleScrollAmount(), behavior: 'smooth' });
    });
  }

  var modal = document.getElementById('imageModal');
  var modalImg = document.getElementById('modalImg');
  var modalCount = document.getElementById('modalCount');
  var modalClose = document.getElementById('modalClose');
  var modalPrev = document.getElementById('modalPrev');
  var modalNext = document.getElementById('modalNext');
  var galleryItems = [];
  var galleryIndex = 0;

  function buildGallery(triggerEl) {
    var galleryName = triggerEl.getAttribute('data-gallery');
    return Array.prototype.slice.call(document.querySelectorAll('[data-gallery="' + galleryName + '"]'));
  }

  function renderModal() {
    if (!galleryItems.length) return;
    var current = galleryItems[galleryIndex];
    modalImg.src = current.src;
    modalImg.alt = current.alt || 'Expanded image';

    var showNav = galleryItems.length > 1;
    modalPrev.style.display = showNav ? 'inline-flex' : 'none';
    modalNext.style.display = showNav ? 'inline-flex' : 'none';
    modalCount.style.display = showNav ? 'inline-block' : 'none';

    if (modalCount) modalCount.textContent = (galleryIndex + 1) + ' / ' + galleryItems.length;
  }

  function openModal(triggerEl) {
    galleryItems = buildGallery(triggerEl);
    galleryIndex = galleryItems.indexOf(triggerEl);
    if (galleryIndex < 0) galleryIndex = 0;
    renderModal();
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    }
    document.body.style.overflow = 'hidden';
  }

  function openProjectPreview(card) {
    var projectImage = card.querySelector('.work-image img');
    if (!projectImage || !modal) return;

    galleryItems = [projectImage];
    galleryIndex = 0;
    renderModal();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.cert-img, .person-img').forEach(function (img) {
    img.addEventListener('click', function () {
      openModal(img);
    });
  });

  document.querySelectorAll('.work-card').forEach(function (card) {
    var title = card.querySelector('h3');
    var externalLink = card.querySelector('a[href]');

    if (!externalLink) {
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', 'View ' + (title ? title.textContent : 'project') + ' preview');
      card.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openProjectPreview(card);
        }
      });
    }

    card.addEventListener('click', function (event) {
      if (event.target.closest('a')) return;
      if (externalLink) {
        window.open(externalLink.href, '_blank', 'noopener');
        return;
      }
      openProjectPreview(card);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', function (event) {
      if (event.target === modal) closeModal();
    });
  }

  if (modalPrev) {
    modalPrev.addEventListener('click', function () {
      if (!galleryItems.length) return;
      galleryIndex = (galleryIndex - 1 + galleryItems.length) % galleryItems.length;
      renderModal();
    });
  }

  if (modalNext) {
    modalNext.addEventListener('click', function () {
      if (!galleryItems.length) return;
      galleryIndex = (galleryIndex + 1) % galleryItems.length;
      renderModal();
    });
  }

  document.addEventListener('keydown', function (event) {
    if (!modal || !modal.classList.contains('open')) return;
    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowLeft' && modalPrev && modalPrev.style.display !== 'none') modalPrev.click();
    if (event.key === 'ArrowRight' && modalNext && modalNext.style.display !== 'none') modalNext.click();
  });

  var toast = document.getElementById('toast');
  var toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 1800);
  }

  document.querySelectorAll('[data-copy]').forEach(function (el) {
    el.addEventListener('click', function (event) {
      var value = el.getAttribute('data-copy');
      if (!value || !navigator.clipboard) return;
      event.preventDefault();
      navigator.clipboard.writeText(value).then(function () {
        showToast('Copied ' + value);
      }).catch(function () {
        window.location.href = el.getAttribute('href');
      });
    });
  });

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav a, .mobile-nav a'));
  var siteHeader = document.querySelector('.site-header');
  var mobileNav = document.querySelector('.mobile-nav');
  var lastScrollY = window.scrollY;
  var sectionIds = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute('href').replace('#', '');
    if (sectionIds.indexOf(id) === -1) sectionIds.push(id);
  });
  var sections = sectionIds.map(function (id) { return document.getElementById(id); });
  var sectionTops = [];
  var scrollFrame = 0;

  function cacheSectionTops() {
    sectionTops = sections.map(function (section) {
      return section ? section.getBoundingClientRect().top + window.scrollY : 0;
    });
  }

  function setActiveNav() {
    var scrollPosition = window.scrollY + 160;
    var activeIndex = 0;

    if (siteHeader) siteHeader.classList.toggle('is-scrolled', window.scrollY > 80);

    sectionTops.forEach(function (sectionTop, index) {
      if (sectionTop <= scrollPosition) activeIndex = index;
    });

    navLinks.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + sectionIds[activeIndex]);
    });
  }

  function updateMobileNav() {
    if (!mobileNav || window.innerWidth > 700) return;

    var currentScrollY = window.scrollY;
    if (currentScrollY <= 100 || currentScrollY < lastScrollY - 8) {
      mobileNav.classList.remove('is-collapsed');
    } else if (currentScrollY > lastScrollY + 8) {
      mobileNav.classList.add('is-collapsed');
    }
    lastScrollY = currentScrollY;
  }

  if (mobileNav) {
    mobileNav.addEventListener('click', function (event) {
      if (!mobileNav.classList.contains('is-collapsed')) return;
      event.preventDefault();
      mobileNav.classList.remove('is-collapsed');
    });
  }

  window.addEventListener('scroll', function () {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(function () {
      setActiveNav();
      updateMobileNav();
      scrollFrame = 0;
    });
  }, { passive: true });
  window.addEventListener('resize', function () {
    cacheSectionTops();
    setActiveNav();
    if (mobileNav && window.innerWidth > 700) mobileNav.classList.remove('is-collapsed');
  });
  cacheSectionTops();
  setActiveNav();
});
