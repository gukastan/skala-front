(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector("#guess-input");
    const button = document.querySelector("#guess-button");
    const result = document.querySelector("#guess-result");
    const attemptsElement = document.querySelector("#guess-attempts");
    if (!input || !button || !result || !attemptsElement) return;

    let secret = Math.floor(Math.random() * 50) + 1;
    let attempts = 0;
    let solved = false;

    function newGame() {
      secret = Math.floor(Math.random() * 50) + 1;
      attempts = 0;
      solved = false;
      input.value = "";
      result.textContent = "새 보안번호가 생성되었습니다.";
      attemptsElement.textContent = "시도 횟수: 0";
      button.textContent = "확인";
    }

    button.addEventListener("click", () => {
      if (solved) {
        newGame();
        return;
      }

      const guess = Number(input.value);
      if (!Number.isInteger(guess) || guess < 1 || guess > 50) {
        result.textContent = "1부터 50 사이의 정수를 입력해주세요.";
        window.SKIPPER?.say("입력값을 숫자로 변환한 뒤 범위가 유효한지 먼저 검사해야 해요.");
        return;
      }

      attempts += 1;
      attemptsElement.textContent = `시도 횟수: ${attempts}`;

      if (guess > secret) result.textContent = "Down ↓ 입력한 번호가 더 큽니다.";
      else if (guess < secret) result.textContent = "Up ↑ 입력한 번호가 더 작습니다.";
      else {
        solved = true;
        result.textContent = `보안실 잠금 해제! ${attempts}번 만에 성공했습니다.`;
        button.textContent = "새 게임";
        window.SKIPPER?.say("비밀번호 해제 성공! 입력 → 비교 → 출력의 흐름이 실제 화면에서 작동했습니다.");
      }

      if (attempts === 3 && !solved) {
        window.SKIPPER?.say("힌트: 입력값이 정답보다 큰 경우와 작은 경우를 if / else if로 나눠 생각해보세요.");
      }
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") button.click();
    });
  });
})();
