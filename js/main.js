/**
 * Centre médical Le Damany — Main JavaScript 2.0
 * Soft-UI | Glassmorphism | Bilingual FR/EN | Mobile-first
 */

/* ============================================================
   STATE
   ============================================================ */
// Langue par défaut : FR (réinitialise toute session précédente en EN)
if (!localStorage.getItem('lang_set_by_user')) {
  localStorage.setItem('lang', 'fr');
}
let currentLang = localStorage.getItem('lang') || 'fr';

/* ============================================================
   LANGUAGE SYSTEM — data-fr / data-en attributes
   ============================================================ */
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  // Update all elements with data-fr / data-en
  document.querySelectorAll('[data-fr], [data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text === null) return;

    // Use innerHTML for elements with data-html attribute OR leaf text nodes
    const useHTML = el.hasAttribute('data-html') || el.children.length === 0;
    if (useHTML) {
      el.innerHTML = text;
    }
  });

  // Update lang toggle UI
  document.querySelectorAll('.lang-toggle__option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });

  // Update page title
  if (lang === 'en') {
    document.title = document.title
      .replace('Médecin Généraliste', 'General Practitioner')
      .replace('Médecin généraliste', 'General Practitioner')
      .replace('Le médecin', 'About')
      .replace('Le cabinet', 'About')
      .replace('Infos pratiques', 'Practical info')
      .replace('Informations pratiques', 'Practical information')
      .replace('Urgences', 'Emergencies')
      .replace('Services médicaux', 'Medical Services')
      .replace('Services', 'Services');
  } else {
    document.title = document.title
      .replace('General Practitioner', 'Médecin Généraliste')
      .replace('About', 'Le cabinet')
      .replace('Practical information', 'Informations pratiques')
      .replace('Practical info', 'Infos pratiques')
      .replace('Emergencies', 'Urgences')
      .replace('Medical Services', 'Services médicaux');
  }
}

function initLangToggle() {
  const toggle = document.getElementById('langToggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const next = currentLang === 'fr' ? 'en' : 'fr';
    localStorage.setItem('lang_set_by_user', '1');
    applyLanguage(next);
  });
  applyLanguage(currentLang);
}

/* ============================================================
   STICKY HEADER
   ============================================================ */
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 16);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============================================================
   MOBILE NAV
   ============================================================ */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const overlay = document.getElementById('navOverlay');
  if (!hamburger || !nav) return;

  let isOpen = false;

  const openNav = () => {
    isOpen = true;
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    nav.classList.add('open');
    if (overlay) {
      overlay.style.display = 'block';
      requestAnimationFrame(() => overlay.classList.add('show'));
    }
    document.body.style.overflow = 'hidden';
  };

  const closeNav = () => {
    isOpen = false;
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    if (overlay) {
      overlay.classList.remove('show');
      setTimeout(() => { overlay.style.display = 'none'; }, 350);
    }
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => isOpen ? closeNav() : openNav());
  if (overlay) overlay.addEventListener('click', closeNav);
  nav.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', closeNav));
  window.addEventListener('resize', () => { if (window.innerWidth > 768 && isOpen) closeNav(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) closeNav(); });
  if (overlay) overlay.style.display = 'none';
}

/* ============================================================
   FAQ ACCORDION — with bounce effect
   ============================================================ */
function initFAQ() {
  document.querySelectorAll('.faq-item__q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-item__a');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-item__q').setAttribute('aria-expanded', 'false');
        openItem.querySelector('.faq-item__a').style.maxHeight = '0';
      });

      // Open clicked
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        // Small delay for bounce feel
        requestAnimationFrame(() => {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        });
      }
    });
  });
}

/* ============================================================
   REVEAL ANIMATIONS — Staggered with IntersectionObserver
   ============================================================ */
function initReveal() {
  const selectors = ['.reveal', '.reveal-left', '.reveal-right'];
  const elements = document.querySelectorAll(selectors.join(','));
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   COUNTER ANIMATION — Smooth counting on scroll
   ============================================================ */
function animateCount(el, target, suffix, duration = 1400) {
  let start = null;
  const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOut

  const step = (timestamp) => {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.round(ease(progress) * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}

function initCounters() {
  // Expertise section numbers
  const counterEls = document.querySelectorAll('[data-count]');
  if (!counterEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        if (!isNaN(target) && target > 0) animateCount(el, target, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => observer.observe(el));

  // Trust section numbers (.trust-item__number)
  const trustEls = document.querySelectorAll('.trust-item__number');
  const trustObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const num = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[0-9]/g, '');
        if (!isNaN(num) && num > 0) animateCount(el, num, suffix);
        trustObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  trustEls.forEach(el => trustObserver.observe(el));
}

/* ============================================================
   ACTIVE NAV LINK
   ============================================================ */
function initActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href')?.split('#')[0];
    link.classList.toggle('active', href === page || (page === '' && href === 'index.html'));
  });
}

/* ============================================================
   SMOOTH SCROLL for anchor links
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 76;
        window.scrollTo({ top: target.offsetTop - offset - 16, behavior: 'smooth' });
      }
    });
  });
}

/* ============================================================
   SERVICE CARDS — Staggered appearance
   ============================================================ */
function initServiceStagger() {
  const cards = document.querySelectorAll('.service-card, .info-card, .access-card, .team-card');
  cards.forEach((card, i) => {
    if (!card.style.getPropertyValue('--delay')) {
      card.style.setProperty('--delay', `${i * 0.07}s`);
    }
  });
}

/* ============================================================
   FLOATING RDV BUTTON (mobile only)
   ============================================================ */
function initFloatingRDV() {
  if (window.innerWidth > 768) return;

  const existing = document.querySelector('.floating-rdv');
  if (existing) return;

  const floating = document.createElement('a');
  floating.href = 'https://www.doctena.lu/fr/specialite/medecin-generaliste/dr-andreea-le-damany-1717095';
  floating.target = '_blank';
  floating.rel = 'noopener';
  floating.className = 'floating-rdv';

  const labelFr = 'Prendre RDV';
  const labelEn = 'Book now';
  floating.innerHTML = `<i class="fas fa-calendar-plus"></i> <span class="floating-rdv__label">${currentLang === 'en' ? labelEn : labelFr}</span>`;

  const style = document.createElement('style');
  style.textContent = `
    .floating-rdv {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #2BA466 0%, #1F9B5D 100%);
      color: white;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 15px 32px;
      border-radius: 999px;
      font-weight: 700;
      font-size: 0.92rem;
      z-index: 900;
      box-shadow: 0 8px 32px rgba(43,164,102,.45), 0 0 0 4px rgba(168,220,171,.2);
      text-decoration: none;
      white-space: nowrap;
      transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
      font-family: 'Inter', sans-serif;
    }
    .floating-rdv:hover {
      transform: translateX(-50%) translateY(-3px) scale(1.04);
      box-shadow: 0 14px 40px rgba(43,164,102,.55), 0 0 0 6px rgba(168,220,171,.25);
    }
    @media (min-width: 769px) { .floating-rdv { display: none !important; } }
  `;

  document.head.appendChild(style);
  document.body.appendChild(floating);

  // Update label on lang change
  const origApply = applyLanguage;
  window._origApplyLang = origApply;

  // Sync label
  const syncLabel = () => {
    const lbl = floating.querySelector('.floating-rdv__label');
    if (lbl) lbl.textContent = currentLang === 'en' ? labelEn : labelFr;
  };
  document.getElementById('langToggle')?.addEventListener('click', () => setTimeout(syncLabel, 50));

}

/* ============================================================
   BUTTON GLOW ON HOVER — Enhanced micro-interaction
   ============================================================ */
function initButtonGlow() {
  document.querySelectorAll('.btn--primary').forEach(btn => {
    btn.addEventListener('mouseenter', function (e) {
      const rect = this.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      this.style.setProperty('--glow-x', `${x}%`);
      this.style.setProperty('--glow-y', `${y}%`);
    });
  });
}

/* ============================================================
   REVIEWS CAROUSEL — Avis patients Doctena
   ============================================================ */
const DOCTENA_REVIEWS_URL = 'https://www.doctena.lu/fr/specialite/medecin-generaliste/dr-andreea-le-damany-1717095';

// Données statiques des avis (source : Doctena, rendez-vous authentifiés)
const REVIEWS_DATA = [
  { prenom: 'Sarah',        date: 'avril 2026',    texte: "Après des années de recherche sans me sentir réellement prise au sérieux, j'ai enfin trouvé une médecin exceptionnelle. Elle écoute attentivement, prend en compte l'ensemble de la situation et ne se limite pas aux symptômes du moment. Son niveau de connaissances est impressionnant. Je la recommande vivement." },
  { prenom: 'Cyril',        date: 'mars 2026',     texte: "Très agréable et déterminée à m'aider malgré mes maladresses à répétition. Merci et bravo Docteur." },
  { prenom: 'Viorica',      date: 'mars 2026',     texte: "C'est un très bon médecin, très attentive et professionnelle ! Ravie d'avoir découvert ce praticien au Luxembourg !" },
  { prenom: 'Aldin',        date: 'mars 2026',     texte: "Une docteure exceptionnelle qui ne soigne pas seulement le corps, mais aussi l'âme. Sa gentillesse, sa patience et son dévouement inspirent confiance dès le premier instant. Merci du fond du cœur, elle est vraiment unique." },
  { prenom: 'Aikaterini',   date: 'mars 2026',     texte: "Dr Le Damany is the best doctor I have come across so far. She is truly remarkable." },
  { prenom: 'Radu',         date: 'mars 2026',     texte: "Examen agréable et professionnel, explication des symptômes du diagnostic et du traitement recommandé. Cabinet hébergeant également Bionext avec possibilité immédiate d'analyses et prélèvements." },
  { prenom: 'Anonyme',      date: 'mars 2026',     texte: "Docteur très à l'écoute et gentille. Elle prend le temps d'écouter et de conseiller au mieux le patient. Merci 🙏" },
  { prenom: 'Michel',       date: 'février 2026',  texte: "Listens carefully and gives very useful advice." },
  { prenom: 'El Hanoudi',   date: 'février 2026',  texte: "Merci pour vos excellents soins et votre attention. Votre approche m'a rassuré et m'a permis de reprendre confiance. Grâce à vous, je me porte très bien. Vous êtes un médecin remarquable en qui nous avons confiance. Je recommande sans hésitation." },
  { prenom: 'Daniela Maria',date: 'janvier 2026',  texte: "I had a great experience with Dr Andreea Le Damany. She takes the time to ask detailed questions and truly understands the medical situation before offering advice. I really appreciate her professionalism and genuine care. Highly recommended!" },
  { prenom: 'Anonyme',      date: 'janvier 2026',  texte: "Le docteur idéal — absolument compétente tant en médecine générale que dans la gériatrie, aimable, généreuse dans les explications. Examen détaillé, intérêt pour l'histoire médicale complète du patient. Vivement recommandée !" },
  { prenom: 'Axel',         date: 'janvier 2026',  texte: "Excellent médecin. À l'écoute et très professionnelle. Je recommande chaudement." },
  { prenom: 'Raul',         date: 'décembre 2025', texte: "Excellent doctor." },
  { prenom: 'Lucilia',      date: 'décembre 2025', texte: "Très bien à l'écoute du patient. Je recommande vivement." },
  { prenom: 'Richard',      date: 'décembre 2025', texte: "Despite the waiting time, a great doctor, thorough to identify the issue and took further steps to exclude potential other viruses. Explained the medication really well." },
  { prenom: 'Jennifer',     date: 'décembre 2025', texte: "I was extremely satisfied with my experience. She took a lot of time to carefully explain a complex blood analysis. Thorough, friendly, and very professional. I truly appreciated her competence and attention to detail." },
  { prenom: 'Essalhi',      date: 'décembre 2025', texte: "Très bon médecin, très à l'écoute avec ses patients et très professionnelle. Elle prend tout le temps nécessaire pour tout expliquer et effacer toutes interrogations ou doutes." }
];

function buildReviewCard(review) {
  const card = document.createElement('div');
  card.className = 'review-card';
  card.innerHTML = `
    <span class="review-card__quote">"</span>
    <p class="review-card__text">${review.texte}</p>
    <div class="review-card__footer">
      <div>
        <div class="review-card__author">${review.prenom}</div>
        <div class="review-card__meta">${review.date}</div>
      </div>
      <span class="review-card__verified"><i class="fas fa-check-circle"></i> Doctena</span>
    </div>
  `;
  return card;
}

function initReviews() {
  const track    = document.getElementById('reviewsTrack');
  const wrapper  = document.getElementById('reviewsWrapper');
  const prevBtn  = document.getElementById('reviewsPrev');
  const nextBtn  = document.getElementById('reviewsNext');
  if (!track || !wrapper) return;

  // Construire les cartes (données × 2 pour boucle infinie fluide)
  const allReviews = [...REVIEWS_DATA, ...REVIEWS_DATA];
  allReviews.forEach(r => track.appendChild(buildReviewCard(r)));

  const CARD_W    = 280 + 20; // card width + gap
  const TOTAL     = REVIEWS_DATA.length;
  let current     = 0;
  let autoTimer   = null;
  let isDragging  = false;
  let dragStartX  = 0;
  let dragDelta   = 0;

  function getOffset() {
    return current * CARD_W;
  }

  function slideTo(index, animate = true) {
    // Boucle infinie : reset silencieux quand on dépasse la moitié
    if (index >= TOTAL) {
      // Sauter sans animation à la position équivalente de la première moitié
      track.style.transition = 'none';
      current = index - TOTAL;
      track.style.transform = `translateX(-${getOffset()}px)`;
      // Forcer reflow puis ré-appliquer animation
      void track.offsetWidth;
      index = current + 1 >= TOTAL ? 0 : current + 1;
    }
    if (index < 0) {
      track.style.transition = 'none';
      current = index + TOTAL;
      track.style.transform = `translateX(-${getOffset()}px)`;
      void track.offsetWidth;
      index = current;
    }
    current = index;
    track.style.transition = animate ? 'transform 0.55s cubic-bezier(0.4,0,0.2,1)' : 'none';
    track.style.transform = `translateX(-${getOffset()}px)`;
  }

  function next() { slideTo(current + 1); }
  function prev() { slideTo(current - 1); }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(next, 3800);
  }
  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  // Boutons
  nextBtn?.addEventListener('click', () => { next(); stopAuto(); startAuto(); });
  prevBtn?.addEventListener('click', () => { prev(); stopAuto(); startAuto(); });

  // Pause au survol
  wrapper.addEventListener('mouseenter', stopAuto);
  wrapper.addEventListener('mouseleave', startAuto);

  // Drag / swipe tactile
  const onDragStart = (x) => {
    isDragging = true;
    dragStartX = x;
    dragDelta  = 0;
    stopAuto();
    track.style.transition = 'none';
  };
  const onDragMove = (x) => {
    if (!isDragging) return;
    dragDelta = x - dragStartX;
    track.style.transform = `translateX(${-getOffset() + dragDelta}px)`;
  };
  const onDragEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    if (dragDelta < -60) next();
    else if (dragDelta > 60) prev();
    else slideTo(current);
    startAuto();
  };

  // Mouse drag
  wrapper.addEventListener('mousedown',  (e) => onDragStart(e.clientX));
  window.addEventListener('mousemove',   (e) => onDragMove(e.clientX));
  window.addEventListener('mouseup',     onDragEnd);

  // Touch swipe
  wrapper.addEventListener('touchstart', (e) => onDragStart(e.touches[0].clientX), { passive: true });
  wrapper.addEventListener('touchmove',  (e) => onDragMove(e.touches[0].clientX),  { passive: true });
  wrapper.addEventListener('touchend',   onDragEnd);

  // Init
  slideTo(0, false);
  startAuto();
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initLangToggle();
  initStickyHeader();
  initMobileNav();
  initFAQ();
  initReveal();
  initCounters();
  initActiveNav();
  initSmoothScroll();
  initServiceStagger();
  initFloatingRDV();
  initButtonGlow();
  initReviews();
});
