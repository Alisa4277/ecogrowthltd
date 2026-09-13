/* =========================================================
   ECOGROWTH LTD — Global JS
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {

  /* --- Navbar scroll state --- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 40) navbar.classList.add('is-scrolled');
    else navbar.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- Mobile menu (side drawer) --- */
  const toggle = document.getElementById('navToggle');
  const panel = document.getElementById('mobilePanel');
  const close = document.getElementById('mobileClose');
  const backdrop = document.getElementById('mobileBackdrop');

  const openMenu = () => {
    panel.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
  };
  const closeMenu = () => {
    panel.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  };

  if (toggle && panel) {
    toggle.addEventListener('click', openMenu);
    close.addEventListener('click', closeMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);
    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  /* --- Random local image fallback for empty image locations --- */
  const imagePool = [
    'about.jpeg', 'contact.png', 'green.png', 'greenhouse.jpeg',
    'nanyuki.jpeg', 'project.jpg', 'service.jpeg', 'shade-net.jpeg',
    'SHADENET.jpeg', 'solution.jpeg', 'STRUCTURE.jpeg', 'wooden.jpeg'
  ];

  const pickRandomImage = () => {
    const file = imagePool[Math.floor(Math.random() * imagePool.length)];
    return 'assets/images/' + file;
  };

  const ensureImage = (target, className = '') => {
    if (!target || target.querySelector('img')) return;
    const img = document.createElement('img');
    img.src = pickRandomImage();
    img.alt = 'ECOGROWTH LTD project image';
    if (className) img.className = className;
    target.appendChild(img);
  };

  document.querySelectorAll('.page-hero__bg').forEach(bg => {
    if (!bg.querySelector('img')) {
      ensureImage(bg);
    }
  });

  document.querySelectorAll('.hero__bg').forEach(bg => {
    if (!bg.querySelector('img')) {
      ensureImage(bg);
    }
  });

  document.querySelectorAll('.split-media').forEach(split => {
    if (!split.querySelector('img')) {
      const a = document.createElement('img');
      const b = document.createElement('img');
      a.className = 'img-a';
      b.className = 'img-b';
      a.src = pickRandomImage();
      b.src = pickRandomImage();
      a.alt = 'Greenhouse project image';
      b.alt = 'Greenhouse project image';
      split.appendChild(a);
      split.appendChild(b);
    }
  });

  document.querySelectorAll('.service-card__media').forEach(media => {
    if (!media.querySelector('img')) {
      const img = document.createElement('img');
      img.src = pickRandomImage();
      img.alt = 'Service image';
      media.appendChild(img);
    }
  });

  document.querySelectorAll('.ghlist-card__media').forEach(media => {
    if (!media.querySelector('img')) {
      const img = document.createElement('img');
      img.src = pickRandomImage();
      img.alt = 'Pricing greenhouse image';
      media.appendChild(img);
    }
  });

  /* --- Reveal on scroll --- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* --- FAQ accordion --- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(open => {
        open.classList.remove('open');
        open.querySelector('.faq-answer').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

});
