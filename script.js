// ═══════════════════════════════════════════
//  script.js — Mkhulu Sithole Portfolio
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
  console.log('Portfolio loaded successfully!');

  // ── 1. NAVBAR — scroll behaviour & hamburger ──────────────────
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Check if elements exist before adding event listeners
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ── 2. TYPED TEXT EFFECT ──────────────────────────────────────
  const phrases = [
    'Software Engineer',
    'Full-Stack Developer',
    'Spring Boot Developer',
    'React Developer',
    'Azure Enthusiast',
  ];

  const typedEl = document.getElementById('typed-text');
  
  if (typedEl) {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function type() {
      const current = phrases[phraseIndex];

      if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        typingSpeed = 1400;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  // ── 3. SCROLL FADE-IN OBSERVER ────────────────────────────────
  const fadeTargets = document.querySelectorAll(
    '.skill-card, .project-card, .cert-card, .about-grid, .contact-grid, .section-header'
  );

  fadeTargets.forEach(function(el) {
    el.classList.add('fade-in');
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    fadeTargets.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    // Fallback for older browsers
    fadeTargets.forEach(function(el) {
      el.classList.add('visible');
    });
  }

  // ── 4. ACTIVE NAV LINK on scroll ──────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function highlightNav() {
    let current = '';
    sections.forEach(function(sec) {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        current = sec.id;
      }
    });

    navAnchors.forEach(function(a) {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = '#06B6D4';
      }
    });
  }

  if (sections.length > 0 && navAnchors.length > 0) {
    window.addEventListener('scroll', highlightNav);
    highlightNav();
  }

  // ── 5. CONTACT FORM ───────────────────────────────────────────
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (form && formStatus) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      // Basic validation
      if (!name || !email || !message) {
        formStatus.style.color = '#EF4444';
        formStatus.textContent = 'Please fill in all fields.';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formStatus.style.color = '#EF4444';
        formStatus.textContent = 'Please enter a valid email address.';
        return;
      }

      // Simulate send
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

      setTimeout(function() {
        // Build mailto as fallback
        const mailtoLink = 'mailto:mkhulunicholus053@gmail.com?subject=Portfolio Contact from ' + encodeURIComponent(name) + '&body=' + encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
        window.location.href = mailtoLink;

        formStatus.style.color = '#10B981';
        formStatus.textContent = '✅ Message ready! Your mail client should open.';
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        form.reset();
      }, 900);
    });
  }

  // ── 6. SMOOTH SCROLL for same-page anchors ────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // ── 7. SKILL TAG hover effect ─────────────────────────────────
  document.querySelectorAll('.skill-tags span').forEach(function(tag) {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.06)';
    });
    tag.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  console.log('All scripts initialized successfully!');
});