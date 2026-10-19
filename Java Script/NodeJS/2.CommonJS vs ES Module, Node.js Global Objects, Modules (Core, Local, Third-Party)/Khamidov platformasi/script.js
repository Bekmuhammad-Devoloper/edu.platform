document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const lessonTriggers = document.querySelectorAll('.lesson-trigger');
  const imageButtons = document.querySelectorAll('.image-btn');
  const scrollTopBtn = document.getElementById('scrollTop');
  const progressBar = document.getElementById('progressBar');
  const bgButtons = document.querySelectorAll('.bg-btn');

  // Background changer functionality - SHU QISMDA O'Z RASMINGIZNI QOYING
  const backgroundImages = {
    code: "url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover",
    tech: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover",
    matrix: "url('https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80') center/cover",
    circuit: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover",
    myimage: "url('./icons/b.png') center/cover", /* BU QATORNI O'ZGARTIRING */
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  };

  bgButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const bgType = this.getAttribute('data-bg');

      // Remove active class from all buttons
      bgButtons.forEach(b => b.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Update the CSS
      updateBackgroundStyle(bgType);
    });
  });

  function updateBackgroundStyle(bgType) {
    // Create or update style element
    let styleEl = document.getElementById('dynamic-bg-style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'dynamic-bg-style';
      document.head.appendChild(styleEl);
    }

    let bgCSS;
    if (bgType === 'gradient') {
      bgCSS = `
              body::before {
                  background: 
                      radial-gradient(circle at 20% 20%, rgba(0, 212, 255, 0.4) 0%, transparent 40%),
                      radial-gradient(circle at 80% 80%, rgba(255, 107, 107, 0.4) 0%, transparent 40%),
                      radial-gradient(circle at 40% 60%, rgba(78, 205, 196, 0.4) 0%, transparent 40%),
                      linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                  opacity: 0.8 !important;
              }
          `;
    } else {
      bgCSS = `
              body::before {
                  background: 
                      ${backgroundImages[bgType]},
                      radial-gradient(circle at 20% 20%, rgba(0, 212, 255, 0.3) 0%, transparent 40%),
                      radial-gradient(circle at 80% 80%, rgba(255, 107, 107, 0.3) 0%, transparent 40%),
                      radial-gradient(circle at 40% 60%, rgba(78, 205, 196, 0.3) 0%, transparent 40%) !important;
                  opacity: 0.5 !important;
              }
              body::after {
                  background: linear-gradient(45deg, rgba(26, 26, 46, 0.4) 0%, rgba(22, 33, 62, 0.5) 100%) !important;
              }
          `;
    }

    styleEl.textContent = bgCSS;
  }

  // Accordion functionality
  lessonTriggers.forEach(trigger => {
    trigger.addEventListener('click', function () {
      const content = this.nextElementSibling;
      const isActive = this.classList.contains('active');

      // Close all lessons
      lessonTriggers.forEach(otherTrigger => {
        otherTrigger.classList.remove('active');
        otherTrigger.nextElementSibling.classList.remove('active');
      });

      // Open clicked lesson if it wasn't active
      if (!isActive) {
        this.classList.add('active');
        content.classList.add('active');

        // Close all images in this lesson
        const imageContainers = content.querySelectorAll('.image-container');
        imageContainers.forEach(container => {
          container.classList.remove('active');
        });
      }
    });
  });

  // Image toggle functionality
  imageButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.stopPropagation();

      const targetId = this.getAttribute('data-target');
      const targetContainer = document.getElementById(targetId);
      const lesson = this.closest('.lesson-body');

      // Close all images in this lesson
      const allImages = lesson.querySelectorAll('.image-container');
      allImages.forEach(container => {
        container.classList.remove('active');
      });

      // Show selected image
      if (targetContainer) {
        targetContainer.classList.add('active');
      }
    });
  });

  // Scroll progress
  function updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.transform = `scaleX(${scrollPercent / 100})`;
  }

  // Scroll to top visibility
  function toggleScrollTop() {
    if (window.pageYOffset > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  // Scroll to top click
  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Scroll events
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

  // Add keyboard support for accessibility
  lessonTriggers.forEach(trigger => {
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Add intersection observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe lesson elements
  document.querySelectorAll('.lesson').forEach(lesson => {
    observer.observe(lesson);
  });

  // Add loading state for images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', function () {
      this.style.opacity = '1';
    });

    img.addEventListener('error', function () {
      this.style.opacity = '0.5';
      this.title = 'Rasm yuklanmadi';
    });
  });

  console.log('🚀 Khamidov Academy JavaScript kursi yuklandi!');
});