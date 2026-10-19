  // Accordion funksiyasi
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    accordion.addEventListener("click", () => {
      const panel = accordion.nextElementSibling;
      const isOpen = panel.style.display === "block";

      // Ota tegni yopish yoki ochish
      panel.style.display = isOpen ? "none" : "block";

      // Ota teg yopilganda barcha bola teglarni yopish
      if (!isOpen) {
        const childPanels = panel.querySelectorAll(".image-panel");
        childPanels.forEach((childPanel) => {
          childPanel.style.display = "none";
        });
      }
    });
  });

  // Bola teglar uchun toggling funksiyasi
  const imageToggles = document.querySelectorAll(".image-toggle");

  imageToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const imagePanel = toggle.nextElementSibling;
      const isOpen = imagePanel.style.display === "block";
      imagePanel.style.display = isOpen ? "none" : "block";
    });
  });
