(() => {
  const guides = {
    semantic: {
      concept: "HTML 시맨틱 구조",
      title: "정보의 역할을 태그로 표현",
      result: "프로필, 시간표, 계획, 폼이 서로 다른 문서 구조로 표현됩니다.",
      code: `<main>
  <section aria-labelledby="profile-title">
    <h2 id="profile-title">교육생 프로필</h2>
  </section>
</main>`,
      reason: "태그의 이름이 콘텐츠 역할을 설명하면 사람과 검색엔진, 보조기술이 문서 구조를 더 쉽게 이해합니다.",
      mapping: [
        ["<main>", "현재 문서의 핵심 콘텐츠 영역"],
        ["<section>", "하나의 주제를 가진 구역"],
        ["aria-labelledby", "구역의 제목 요소를 연결"]
      ],
      target: '[data-highlight="semantic"]'
    },
    table: {
      concept: "HTML Table",
      title: "시간과 요일의 관계를 표로 표현",
      result: "수업 시간표가 행과 열의 관계를 유지한 채 읽힙니다.",
      code: `<table>
  <thead>
    <tr>
      <th scope="col">시간</th>
      <th scope="col">월요일</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">09:00</th>
      <td>HTML 기초</td>
    </tr>
  </tbody>
</table>`,
      reason: "시간표는 행과 열의 교차 관계를 가진 데이터이므로 일반적인 div 묶음보다 table이 의미에 맞습니다.",
      mapping: [
        ["<thead>", "열 제목을 포함하는 표 머리"],
        ["<tbody>", "실제 수업 데이터"],
        ["scope", "th가 설명하는 행 또는 열의 방향"]
      ],
      target: '[data-highlight="table"]'
    },
    box: {
      concept: "CSS Box Model",
      title: "카드의 내부와 외부 공간",
      result: "카드의 내용, 안쪽 여백, 테두리, 카드 사이 간격이 구분됩니다.",
      code: `.lesson-card {
  padding: 24px;
  border: 1px solid var(--line);
  margin-bottom: 16px;
  background: white;
}`,
      reason: "콘텐츠와 테두리 사이에는 padding, 다른 요소와의 외부 간격에는 margin을 사용했습니다.",
      mapping: [
        ["padding", "카드 내용과 테두리 사이의 내부 여백"],
        ["border", "카드의 경계"],
        ["margin", "다른 카드와 떨어지는 외부 간격"]
      ],
      target: ".concept-box"
    },
    flex: {
      concept: "CSS Flexbox",
      title: "버튼을 한 방향으로 정렬",
      result: "여러 이동 버튼이 한 줄로 배치되고 공간이 부족하면 다음 줄로 넘어갑니다.",
      code: `.door-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}`,
      reason: "버튼처럼 한 방향의 흐름과 간격을 관리하는 문제이므로 Flexbox가 적합합니다.",
      mapping: [
        ["display: flex", "자식 요소를 Flex 항목으로 전환"],
        ["flex-wrap", "공간이 부족할 때 줄바꿈"],
        ["gap", "버튼 사이 간격"]
      ],
      target: ".door-actions"
    },
    grid: {
      concept: "CSS Grid",
      title: "학습 카드를 행과 열로 배치",
      result: "여러 학습 카드가 같은 너비의 열로 정렬되고 모바일에서는 한 열로 바뀝니다.",
      code: `.lesson-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 760px) {
  .lesson-grid { grid-template-columns: 1fr; }
}`,
      reason: "여러 카드의 행과 열을 함께 관리하고 화면 크기에 따라 열 수를 바꾸기 위해 Grid를 사용했습니다.",
      mapping: [
        ["display: grid", "자식 카드를 Grid 항목으로 전환"],
        ["repeat(2, 1fr)", "같은 너비의 열 두 개"],
        ["@media", "좁은 화면에서 한 열로 전환"]
      ],
      target: ".lesson-grid"
    },
    password: {
      concept: "조건문 · 이벤트 · DOM",
      title: "출입 비밀번호 추리",
      result: "입력값이 정답보다 큰지 작은지에 따라 Up·Down 힌트가 표시됩니다.",
      code: `const secret = Math.floor(Math.random() * 50) + 1;

button.addEventListener("click", () => {
  const guess = Number(input.value);

  if (guess > secret) {
    result.textContent = "Down";
  } else if (guess < secret) {
    result.textContent = "Up";
  } else {
    result.textContent = "잠금 해제";
  }
});`,
      reason: "사용자의 클릭을 이벤트로 받고, 입력값을 숫자로 변환한 뒤 조건문으로 정답과 비교했습니다.",
      mapping: [
        ["Math.random()", "무작위 보안번호 생성"],
        ["addEventListener", "확인 버튼 클릭 감지"],
        ["textContent", "결과 문구를 화면에 갱신"]
      ],
      target: ".password-lab"
    },
    object: {
      concept: "객체 · 배열",
      title: "교육생 사물함 데이터 모델링",
      result: "소유자, 사물함 번호, 여러 물품이 하나의 데이터 구조로 관리됩니다.",
      code: `const locker = {
  owner: "김선경",
  lockerNumber: 204,
  items: [
    { name: "MacBook", quantity: 1 },
    { name: "노트", quantity: 2 }
  ]
};`,
      reason: "하나의 사물함은 여러 속성을 가진 객체로, 여러 물품은 배열로 표현했습니다.",
      mapping: [
        ["owner", "사물함 소유자 속성"],
        ["items", "여러 물품을 담는 배열"],
        ["quantity", "각 물품의 수량 속성"]
      ],
      target: ".locker-lab"
    },
    weather: {
      concept: "fetch · async/await · ES Module",
      title: "날씨 요청과 화면 출력 분리",
      result: "도시를 선택하면 API에서 온도와 습도를 받아 화면에 표시합니다.",
      code: `// weatherAPI.js
export async function fetchWeather(cityKey) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("요청 실패");
  return response.json();
}

// realtimeInfo.js
import { fetchWeather } from "./weatherAPI.js";
const weather = await fetchWeather(citySelect.value);`,
      reason: "외부 데이터를 가져오는 책임과 DOM을 바꾸는 책임을 서로 다른 파일에 분리했습니다.",
      mapping: [
        ["export / import", "파일 사이에서 함수 공유"],
        ["await fetch", "응답을 기다린 뒤 처리"],
        ["response.ok", "HTTP 요청 성공 여부 확인"]
      ],
      target: ".weather-lab"
    },
    git: {
      concept: "Git · GitHub",
      title: "기능 단위 변경 기록",
      result: "HTML, CSS, JavaScript, 오류 수정이 각각 구분된 커밋으로 남습니다.",
      code: `git status
git add script/missionGame.js
git commit -m "feat: implement security password game"
git push origin main`,
      reason: "기능 단위 커밋은 무엇을 언제 변경했는지 보여주고, 개인 실습 과정을 검토할 수 있게 합니다.",
      mapping: [
        ["git status", "현재 변경 상태 확인"],
        ["git add", "이번 커밋에 포함할 파일 선택"],
        ["git commit", "변경사항을 하나의 기록으로 확정"]
      ],
      target: ".commit-timeline"
    }
  };

  let dialog;
  let currentGuide;

  function ensureDialog() {
    if (dialog) return;
    dialog = document.createElement("dialog");
    dialog.className = "code-dialog";
    dialog.innerHTML = `
      <div class="dialog-header">
        <div>
          <p class="dialog-kicker"></p>
          <h2 class="dialog-title"></h2>
        </div>
        <button class="dialog-close" type="button" aria-label="닫기">×</button>
      </div>
      <div class="dialog-content">
        <section>
          <h3>이 화면에서 구현된 결과</h3>
          <p class="dialog-result"></p>
        </section>
        <section>
          <h3>실제 관련 코드</h3>
          <pre><code class="dialog-code"></code></pre>
        </section>
        <section>
          <h3>왜 이 방법을 사용했나요?</h3>
          <p class="dialog-reason"></p>
        </section>
        <section>
          <h3>코드와 화면의 연결</h3>
          <ul class="mapping-list"></ul>
        </section>
        <button class="highlight-action" type="button">화면에서 위치 확인</button>
      </div>
    `;
    document.body.append(dialog);

    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
    dialog.querySelector(".highlight-action").addEventListener("click", () => {
      dialog.close();
      const target = document.querySelector(currentGuide?.target);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.classList.add("code-highlight");
      setTimeout(() => target.classList.remove("code-highlight"), 1600);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    ensureDialog();
    document.querySelectorAll("[data-guide]").forEach((button) => {
      button.addEventListener("click", () => {
        currentGuide = guides[button.dataset.guide];
        if (!currentGuide) return;

        dialog.querySelector(".dialog-kicker").textContent = currentGuide.concept;
        dialog.querySelector(".dialog-title").textContent = currentGuide.title;
        dialog.querySelector(".dialog-result").textContent = currentGuide.result;
        dialog.querySelector(".dialog-code").textContent = currentGuide.code;
        dialog.querySelector(".dialog-reason").textContent = currentGuide.reason;

        const list = dialog.querySelector(".mapping-list");
        list.innerHTML = currentGuide.mapping
          .map(([code, meaning]) => `<li><code>${code}</code><span>${meaning}</span></li>`)
          .join("");

        dialog.showModal();
      });
    });
  });
})();
