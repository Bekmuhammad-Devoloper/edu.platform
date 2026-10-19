

// Accordion funksiyasi
const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
  accordion.addEventListener("click", () => {
    const panel = accordion.nextElementSibling; // Har bir accordion uchun tegishli panelni topish

    // Agar panel ochiq bo'lsa
    const isOpen = panel.classList.contains("open");

    // Panelni ochish yoki yopish
    panel.classList.toggle("open", !isOpen); // "open" sinfini qo'shish yoki olib tashlash

    // Agar panel yopilsa, bola elementlarini yopish
    if (!isOpen) {
      const childPanels = panel.querySelectorAll(".image-panel");
      childPanels.forEach((childPanel) => {
        childPanel.classList.remove("open");
      });
    }
  });
});

// Bola teglar uchun toggling funksiyasi
const imageToggles = document.querySelectorAll(".image-toggle");

imageToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const imagePanel = toggle.nextElementSibling;
    const isOpen = imagePanel.classList.contains("open");
    imagePanel.classList.toggle("open", !isOpen); // "open" sinfini qo'shish yoki olib tashlash
  });
});
