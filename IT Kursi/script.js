document.addEventListener('DOMContentLoaded', function () {
  const lessonTriggers = document.querySelectorAll('.lesson-trigger');
  const scrollTopBtn = document.getElementById('scrollTop');
  const bgButtons = document.querySelectorAll('.bg-btn');

  // ---------------- Fon tanlagich (tanlov eslab qolinadi) ----------------
  const BG_KEY = 'khamidov.reja.bg';
  const backgroundImages = {
    myimage: "url('./background.jpg') center/cover",
    code: "url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover",
    tech: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover",
    matrix: "url('https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80') center/cover",
    circuit: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover",
    aurora: "url('./img/northern_lights.jpg') center/cover"
  };

  function updateBackgroundStyle(bgType) {
    let styleEl = document.getElementById('dynamic-bg-style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'dynamic-bg-style';
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `
      body::before {
        background:
          ${backgroundImages[bgType]},
          radial-gradient(circle at 20% 20%, rgba(0, 212, 255, 0.3) 0%, transparent 40%),
          radial-gradient(circle at 80% 80%, rgba(255, 107, 107, 0.3) 0%, transparent 40%),
          radial-gradient(circle at 40% 60%, rgba(78, 205, 196, 0.3) 0%, transparent 40%) !important;
        opacity: ${bgType === 'aurora' ? 0.6 : 0.5} !important;
      }`;
  }

  function setBackground(bgType) {
    if (!backgroundImages[bgType]) bgType = 'myimage';
    bgButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-bg') === bgType));
    updateBackgroundStyle(bgType);
    try { localStorage.setItem(BG_KEY, bgType); } catch (e) {}
  }

  bgButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      setBackground(this.getAttribute('data-bg'));
    });
  });

  // ?bg=aurora kabi parametr bilan ham tanlash mumkin; aks holda eslab qolingan tanlov
  let savedBg = null;
  try { savedBg = new URLSearchParams(location.search).get('bg') || localStorage.getItem(BG_KEY); } catch (e) {}
  if (savedBg && savedBg !== 'myimage') setBackground(savedBg);

  // ---------------- Modullar (accordion) — ochiq bo'lim eslab qolinadi ----------------
  const OPEN_KEY = 'khamidov.reja.open';

  function openLesson(trigger, open) {
    trigger.classList.toggle('active', open);
    trigger.nextElementSibling.classList.toggle('active', open);
    trigger.closest('.lesson').classList.toggle('active', open);
    trigger.setAttribute('aria-expanded', String(open));
  }

  function saveOpen() {
    const ids = [];
    lessonTriggers.forEach(t => { if (t.classList.contains('active')) ids.push(t.closest('.lesson').dataset.module); });
    try { localStorage.setItem(OPEN_KEY, JSON.stringify(ids)); } catch (e) {}
  }

  lessonTriggers.forEach(trigger => {
    trigger.addEventListener('click', function () {
      const isActive = this.classList.contains('active');
      // bitta vaqtda bitta modul ochiq turadi (dars sahifalaridagi kabi)
      lessonTriggers.forEach(other => openLesson(other, false));
      if (!isActive) openLesson(this, true);
      saveOpen();
    });

    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // boshlang'ich holat: ?open — hammasi; aks holda eslab qolingan modul; hech biri bo'lmasa — birinchisi
  let remembered = [];
  try { remembered = JSON.parse(localStorage.getItem(OPEN_KEY) || '[]'); } catch (e) {}
  if (/[?&]open/.test(location.search)) {
    lessonTriggers.forEach(t => openLesson(t, true));
  } else {
    let any = false;
    lessonTriggers.forEach(t => {
      const hit = remembered.includes(t.closest('.lesson').dataset.module);
      if (hit) any = true;
      openLesson(t, hit);
    });
    if (!any && lessonTriggers[0]) openLesson(lessonTriggers[0], true);
  }

  // ---------------- Scroll: progress va yuqoriga tugmasi ----------------
  const scrollRing = document.getElementById('scrollRing');
  const RING_LENGTH = 2 * Math.PI * 25; // halqa radiusi 25

  function updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollHeight > 0 ? Math.min(1, scrollTop / scrollHeight) : 0;
    if (scrollRing) scrollRing.style.strokeDashoffset = String(RING_LENGTH * (1 - percent));
  }

  function toggleScrollTop() {
    scrollTopBtn.classList.toggle('visible', window.pageYOffset > 400);
  }

  scrollTopBtn.addEventListener('click', function () {
    // strelka "uchib ketadi", so'ng sahifa yuqoriga siljiydi
    scrollTopBtn.classList.remove('launch');
    void scrollTopBtn.offsetWidth;
    scrollTopBtn.classList.add('launch');
    setTimeout(() => scrollTopBtn.classList.remove('launch'), 700);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateProgress();
        toggleScrollTop();
        ticking = false;
      });
      ticking = true;
    }
  });
  updateProgress();

  console.log("🚀 Khamidov Academy o'quv rejasi yuklandi!");
});
