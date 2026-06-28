/* Imota LCDA – Main JS */

// Sticky navbar shadow — throttled to avoid work on every scroll event.
const navbar = document.getElementById('navbar');
if (navbar) {
  let ticking = false;
  const updateNavbar = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });
  updateNavbar();
}

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// Counter animation
function animateCounters() {
  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const target = Number(el.dataset.target || 0);
    if (!target) return;
    const duration = 1400;
    const start = performance.now();
    const step = now => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(target * progress).toLocaleString();
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  });
}

// Trigger counter when stats section enters viewport
const statsSection = document.querySelector('.stats-banner');
if (statsSection && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounters();
      observer.disconnect();
    }
  }, { threshold: 0.25 });
  observer.observe(statsSection);
} else if (statsSection) {
  animateCounters();
}

// Newsletter form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('button');
    const input = newsletterForm.querySelector('input');
    if (!btn || !input) return;
    btn.textContent = 'Subscribed ✓';
    btn.style.background = '#16a34a';
    input.value = '';
    setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; }, 3000);
  });
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    if (!btn) return;
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#16a34a';
    setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; contactForm.reset(); }, 3000);
  });
}

// Smooth scroll for in-page anchor links
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}
