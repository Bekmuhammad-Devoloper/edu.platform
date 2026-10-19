// Accordion funksiyasi - sodda va ishlaydigan versiya
document.addEventListener('DOMContentLoaded', function () {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    accordion.addEventListener("click", function () {
      const panel = this.nextElementSibling;
      const isActive = this.classList.contains('active');

      // Barcha accordion va panellarni yopish
      accordions.forEach(acc => {
        acc.classList.remove('active');
        acc.nextElementSibling.classList.remove('active');
      });

      // Agar yopiq bo'lsa, ochish
      if (!isActive) {
        this.classList.add('active');
        panel.classList.add('active');

        // Panel ochilganda barcha rasmlarni yopish
        const imageToggles = panel.querySelectorAll('.image-panel');
        imageToggles.forEach(img => img.classList.remove('active'));
      }
    });
  });

  // Image toggle funksiyasi
  const imageToggles = document.querySelectorAll(".image-toggle");

  imageToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();

      const imagePanel = this.nextElementSibling;
      const isActive = imagePanel.classList.contains('active');

      // Bir vaqtda faqat bitta rasmni ko'rsatish
      const parentPanel = this.closest('.panel');
      const allImagePanels = parentPanel.querySelectorAll('.image-panel');
      allImagePanels.forEach(panel => panel.classList.remove('active'));

      // Agar yopiq bo'lsa, ochish
      if (!isActive) {
        imagePanel.classList.add('active');
      }
    });
  });

  // H2 hover effekti
  document.querySelectorAll('h2.accordion').forEach(item => {
    item.addEventListener('mouseenter', function () {
      this.style.color = '#14c7d7';
    });

    item.addEventListener('mouseleave', function () {
      if (!this.classList.contains('active')) {
        this.style.color = '#fff';
      }
    });
  });
});