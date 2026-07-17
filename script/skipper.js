(() => {
  const hints = {
    prologue: [
      "먼저 입과 등록서를 작성하면 김선경의 출입증이 발급됩니다.",
      "이번 사건에서 네 개의 증빙은 수료 자체가 아니라 최종 심사에 들어가기 위한 자료입니다.",
      "외부 라이브러리 없이 HTML·CSS·JavaScript만으로 교육관을 구성했습니다."
    ],
    lobby: [
  "반갑습니다. AI 가이드 스키퍼입니다. 각 교육관의 학습 목표를 설명해드릴게요.",
  "네 개의 학습관은 어느 순서로 들어가도 됩니다. 현재 필요한 증빙부터 선택하세요.",
  "네 개의 증빙을 모은 뒤 최종 심사실에서 실제 제출 상태를 점검합니다."
    ],
    html: [
      "HTML에서는 먼저 정보의 의미를 판단합니다. 제목인지, 목록인지, 표인지가 태그 선택보다 앞섭니다.",
      "시간표는 행과 열의 관계를 가지므로 div보다 table이 더 적절합니다.",
      "입과 등록서는 받으려는 데이터에 따라 input type을 다르게 선택합니다."
    ],
    css: [
      "한 방향 정렬이라면 Flexbox, 행과 열을 함께 관리한다면 Grid를 우선 검토하세요.",
      "Box Model에서 padding은 내부 여백, margin은 다른 요소와의 외부 간격입니다.",
      "모바일에서는 사진 위 좌표보다 일반 카드 배치가 더 안정적일 수 있습니다."
    ],
    javascript: [
      "비밀번호 게임은 정답 생성 → 입력 → 검증 → 비교 → 출력의 순서로 작동합니다.",
      "객체는 현실의 사물함을 속성으로 표현하고, 배열은 여러 물품을 묶어 관리합니다.",
      "날씨 기능은 API 요청 책임과 화면 출력 책임을 서로 다른 파일로 나눴습니다."
    ],
    record: [
      "완성된 결과만으로는 개발 과정이 보이지 않습니다. 기능 단위 커밋이 학습 흔적이 됩니다.",
      "AI에는 완성품보다 학습목표 분석, 의사코드 검토, 오류 원인 설명을 요청했습니다.",
      "커밋 메시지는 실제 변경 내용과 일치해야 기록으로서 의미가 있습니다."
    ],
    final: [
      "네 개의 증빙이 모두 있어야 최종 수료 심사를 시작할 수 있습니다.",
      "최종 심사는 기능 완성뿐 아니라 설명 가능성, Git 기록, Public 저장소까지 확인합니다.",
      "체크리스트를 모두 확인해야 수료 판정 버튼이 작동합니다."
    ],
    profile: ["ul, ol, dl은 모양보다 정보의 관계를 기준으로 선택합니다."],
    class: ["rowspan과 colspan은 표의 의미가 실제로 이어질 때만 사용합니다."],
    holiday: ["계획은 기간, 목표, 검증 기준을 함께 기록하면 실행하기 쉬워집니다."],
    trip: ["이미지에는 화면을 볼 수 없는 사용자도 이해할 수 있는 alt 설명이 필요합니다."],
    signup: ["label의 for와 input의 id를 연결하면 입력 항목의 의미가 명확해집니다."],
    "signup-result": ["GET으로 전달된 값은 URLSearchParams로 읽어 화면에 표시할 수 있습니다."]
  };

  let index = 0;
  let panel;
  let message;

  function say(text) {
    if (message) message.textContent = text;
    if (panel) panel.hidden = false;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const room = document.body.dataset.room || "prologue";
    const roomHints = hints[room] || hints.prologue;

    const widget = document.createElement("aside");
    widget.className = "skipper-widget";
    widget.innerHTML = `
      <div class="skipper-panel">
        <strong>AI GUIDE · SKIPPER</strong>
        <p class="skipper-message"></p>
        <button class="skipper-next" type="button">다음 힌트</button>
      </div>
      <button class="skipper-toggle" type="button" aria-label="스키퍼 열기 또는 닫기">S</button>
    `;
    document.body.append(widget);

    panel = widget.querySelector(".skipper-panel");
    message = widget.querySelector(".skipper-message");
    message.textContent = roomHints[0];

    widget.querySelector(".skipper-toggle").addEventListener("click", () => {
      panel.hidden = !panel.hidden;
    });

    widget.querySelector(".skipper-next").addEventListener("click", () => {
      index = (index + 1) % roomHints.length;
      message.textContent = roomHints[index];
    });
  });

  window.SKIPPER = { say };
})();
