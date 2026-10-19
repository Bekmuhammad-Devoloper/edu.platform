  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    accordion.addEventListener("click", () => {
      const panel = accordion.nextElementSibling;
      const isOpen = panel.style.display === "block";

      panel.style.display = isOpen ? "none" : "block";

      if (!isOpen) {
        const childPanels = panel.querySelectorAll(".image-panel");
        childPanels.forEach((childPanel) => {
          childPanel.style.display = "none";
        });
      }
    });
  });

  const imageToggles = document.querySelectorAll(".image-toggle");

  imageToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const imagePanel = toggle.nextElementSibling;
      const isOpen = imagePanel.style.display === "block";
      imagePanel.style.display = isOpen ? "none" : "block";
    });
  });
