(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("#locker-open-button");
    const output = document.querySelector("#locker-output");
    if (!button || !output) return;

    button.addEventListener("click", () => {
      const locker = {
        owner: window.Progress?.state.studentName || "김선경",
        lockerNumber: 204,
        items: [
          { name: "MacBook", category: "학습 도구", quantity: 1 },
          { name: "노트", category: "기록 도구", quantity: 2 },
          { name: "펜", category: "필기 도구", quantity: 3 }
        ]
      };

      const itemList = locker.items
        .map((item) => `<li><strong>${item.name}</strong> · ${item.category} · ${item.quantity}개</li>`)
        .join("");
      const total = locker.items.reduce((sum, item) => sum + item.quantity, 0);

      output.innerHTML = `
        <strong>${locker.owner}의 ${locker.lockerNumber}번 사물함</strong>
        <ul>${itemList}</ul>
        <p>총 물품 수량: ${total}개</p>
      `;
    });
  });
})();
