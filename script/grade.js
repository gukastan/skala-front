(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("#grade-calculate-button");
    const output = document.querySelector("#grade-result");
    if (!button || !output) return;

    button.addEventListener("click", () => {
      const scores = ["#score-html", "#score-css", "#score-js"]
        .map((selector) => Number(document.querySelector(selector).value));

      if (scores.some((score) => !Number.isFinite(score) || score < 0 || score > 100)) {
        output.textContent = "모든 점수는 0부터 100 사이여야 합니다.";
        return;
      }

      const total = scores.reduce((sum, score) => sum + score, 0);
      const average = total / scores.length;
      output.textContent =
        `총점 ${total}점 · 평균 ${average.toFixed(1)}점 · ${average >= 60 ? "다음 학습 단계 진입 가능" : "보충 학습 필요"}`;
    });
  });
})();
