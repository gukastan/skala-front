(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".mobile-menu-button");
    const navigation = document.querySelector(".site-navigation");
    if (menuButton && navigation) {
      menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
      });
      navigation.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    }

    const page = document.body.dataset.page;
    document.querySelectorAll("[data-nav]").forEach((link) => {
      link.classList.toggle("active", link.dataset.nav === page);
    });

    const intro = document.querySelector("#introduction");
    const introCount = document.querySelector("#intro-count");
    if (intro && introCount) {
      const update = () => introCount.textContent = `${intro.value.length} / 200`;
      intro.addEventListener("input", update);
      update();
    }

    document.querySelectorAll("[data-reset-progress]").forEach((button) => {
      button.addEventListener("click", () => {
        if (confirm("저장된 미션 진행 상태를 초기화할까요?")) {
          window.Progress?.reset();
          location.reload();
        }
      });
    });
  });
})();
