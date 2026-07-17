(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(location.search);
    const name = params.get("name") || "김선경";
    window.Progress?.setStudentName(name);

    const setText = (selector, value, fallback = "입력하지 않음") => {
      const element = document.querySelector(selector);
      if (element) element.textContent = value || fallback;
    };

    setText("#result-student-id", params.get("studentId"));
    setText("#result-name", name);
    setText("#result-email", params.get("email"));
    setText("#result-level", params.get("level"));
    setText("#result-interest", params.getAll("interest").join(", "));
    setText("#result-introduction", params.get("introduction"));

    const welcome = document.querySelector("#welcome-message");
    if (welcome) welcome.textContent = `${name} 교육생, 입과 등록이 완료되었습니다.`;
  });
})();
