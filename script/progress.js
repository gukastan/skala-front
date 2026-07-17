const roomButtonLabels = {
  structure: "HTML관 입장",
  design: "CSS관 입장",
  logic: "보안실 입장",
  record: "기록관 입장"
};
(() => {
  const STORAGE_KEY = "skalaEscapeProgressV2";
  const defaultState = {
    studentName: "김선경",
    keys: { structure: false, design: false, logic: false, record: false },
    finalPassed: false
  };

  function load() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return {
        ...defaultState,
        ...stored,
        keys: { ...defaultState.keys, ...(stored?.keys || {}) }
      };
    } catch {
      return structuredClone(defaultState);
    }
  }

  let state = load();

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    render();
  }

  function countKeys() {
    return Object.values(state.keys).filter(Boolean).length;
  }

  function completeKey(key) {
    if (key in state.keys) {
      state.keys[key] = true;
      save();
    }
  }

  function setStudentName(name) {
    if (name?.trim()) {
      state.studentName = name.trim();
      save();
    }
  }

  function setFinalPassed(value) {
    state.finalPassed = Boolean(value);
    save();
  }

  function reset() {
    state = structuredClone(defaultState);
    save();
  }

  function render() {
    document.querySelectorAll(".progress-count").forEach((element) => {
      element.textContent = countKeys();
    });

    document.querySelectorAll("[data-student-name]").forEach((element) => {
      element.textContent = state.studentName;
    });

    document.querySelectorAll("[data-key-card]").forEach((card) => {
  const key = card.dataset.keyCard;
  const completed = Boolean(state.keys[key]);

  card.classList.toggle("completed", completed);

  const enterButton = card.querySelector("a.button");

  if (enterButton) {
    enterButton.textContent = completed
      ? "✓ 복구 완료 · 다시 보기"
      : roomButtonLabels[key];
  }
});

    document.querySelectorAll("[data-complete-key]").forEach((button) => {
      const key = button.dataset.completeKey;
      if (state.keys[key]) {
        button.classList.add("completed");
        button.textContent = "증빙 복구 완료 ✓";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    render();
    document.querySelectorAll("[data-complete-key]").forEach((button) => {
      button.addEventListener("click", () => {
        const key = button.dataset.completeKey;
        completeKey(key);
        window.SKIPPER?.say(`${key.toUpperCase()} 증빙이 복구되었습니다. 이제 로비 또는 다음 학습관으로 이동하세요.`);
      });
    });
  });

  window.Progress = {
    get state() { return state; },
    save, countKeys, completeKey, setStudentName, setFinalPassed, reset, render
  };
})();
