document.addEventListener("DOMContentLoaded", () => {

  /*  動画の切替（時間帯） */
  const video = document.getElementById("timeVideo");
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) video.src = "videos/morning.mp4";
  else if (hour >= 11 && hour < 18) video.src = "videos/day.mp4";
  else video.src = "videos/night.mp4";

  /* アコーディオンのメニュー */
  document.querySelectorAll(".has-sub > .nav-pill, .has-sub > a").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const parent = btn.closest(".has-sub");
      parent.classList.toggle("open");
      document.querySelectorAll(".has-sub").forEach(i => { if (i !== parent) i.classList.remove("open"); });
    });
  });
  
  /* 診断して結果を出す */
const form = document.getElementById("travelForm");
const cards = document.querySelectorAll(".card");
const resultArea = document.getElementById("resultArea");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const q1 = form.q1.value;   
  const q2 = form.q2.value;   
  const q3 = form.q3.value;   

  let key = "";
  if (q1 === "domestic" && q2 === "gourmet" && q3 === "trend") key = "osaka";
  else if (q1 === "domestic" && q2 === "gourmet" && q3 === "tradition") key = "kyoto";
  else if (q1 === "domestic" && q2 === "view" && q3 === "trend") key = "tokyo";
  else if (q1 === "domestic" && q2 === "view" && q3 === "tradition") key = "nagano";
  else if (q1 === "abroad" && q2 === "gourmet" && q3 === "tradition") key = "france";
  else if (q1 === "abroad" && q2 === "gourmet" && q3 === "trend") key = "korea";
  else if (q1 === "abroad" && q2 === "view" && q3 === "tradition") key = "spain";
  else if (q1 === "abroad" && q2 === "view" && q3 === "trend") key = "canada";

  // ハイライトをリセット
  cards.forEach(c => c.classList.remove("highlight"));

  const chosenCard = document.querySelector(`.card[data-place="${key}"]`);
  chosenCard.classList.add("highlight");
  chosenCard.scrollIntoView({ behavior: "smooth", block: "center" });

  resultArea.innerHTML =
    `<div class="result-box">
      <h3>あなたにおすすめは「${chosenCard.querySelector("h3").textContent}」です！</h3>
    </div>`;
});

// 各質問ごとに選択肢をクリックしたら選択状態を維持する
document.querySelectorAll('.quiz-question').forEach(question => {
  const options = question.querySelectorAll('.quiz-option');
  options.forEach(option => {
    option.addEventListener('click', () => {
      options.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
    });
  });
});

  document.querySelectorAll(".option").forEach(opt => {
    opt.addEventListener("click", () => {
      const input = opt.querySelector("input");
      if (input) input.checked = true;
      const name = input.name;
      document.querySelectorAll(`.option input[name="${name}"]`).forEach(i => {
        i.closest(".option").classList.remove("selected");
      });
      opt.classList.add("selected");
    });
  });
});

