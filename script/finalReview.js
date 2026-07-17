(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const lock = document.querySelector("#review-lock");
    const review = document.querySelector("#review-content");
    const missingList = document.querySelector("#missing-keys");
    const submit = document.querySelector("#review-submit");
    const certificate = document.querySelector("#certificate");

    const labels = {
      structure: "HTML 구조 증빙",
      design: "CSS 설계 증빙",
      logic: "JavaScript 동작 증빙",
      record: "Git·AI 기록 증빙"
    };

    const missing = Object.entries(window.Progress.state.keys)
      .filter(([, completed]) => !completed)
      .map(([key]) => labels[key]);

    if (missing.length) {
      lock.hidden = false;
      review.hidden = true;
      missingList.innerHTML = missing.map((item) => `<li>${item}</li>`).join("");
      return;
    }

    lock.hidden = true;
    review.hidden = false;

    submit.addEventListener("click", () => {
      const checks = [...document.querySelectorAll(".review-checklist input")];
      if (!checks.every((input) => input.checked)) {
        window.SKIPPER?.say("아직 확인하지 않은 최종 심사 항목이 있습니다. 체크리스트를 다시 살펴보세요.");
        return;
      }

      window.Progress.setFinalPassed(true);
      certificate.hidden = false;
      certificate.scrollIntoView({ behavior: "smooth", block: "center" });
      window.SKIPPER?.say("최종 심사를 통과했습니다. 기능 구현뿐 아니라 설명과 기록까지 확인되었습니다.");
    });
  });
})();
