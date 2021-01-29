"use strict";

const words = [
  "sky",
  "apple",
  "blue",
  "middle",
  "set",
  "orange",
  "banana",
  "yesterday",
  "cheese",
  "after",
  "pink",
  "red",
  "flag",
  "language",
  "kyoto",
  "youtube",
  "google",
  "yahoo",
  "kirara",
  "hello",
  "actually",
  "again",
  "almost",
  "anything",
  "another",
  "alright",
  "because",
  "carefully",
  "black",
];

let inputTime = Number(prompt("残り秒数を設定してください"));
if (!(inputTime > 0)) {
  alert("0以上の半角整数を入力してください");
  location.reload();
}

let word = "";
let loc = 0;
let score = 0;
let miss = 0;
let timeLimit = inputTime * 1000; //秒
let startTime = 0;
let isPlaying = false;

const target = document.getElementById("target");
const scoreLabel = document.getElementById("score");
const missLabel = document.getElementById("miss");
const timerLabel = document.getElementById("timer");

const updateTarget = () => {
  let placeholder = "";
  for (let i = 0; i < loc; i++) {
    placeholder += "_";
  }
  target.textContent = placeholder + word.substring(loc);
};

const updateTimer = () => {
  const timeLeft = startTime + timeLimit - Date.now();
  timerLabel.textContent = (timeLeft / 1000).toFixed(2);

  const timeoutId = setTimeout(() => {
    updateTimer();
  }, 10);

  if (timeLeft < 0) {
    isPlaying = false;

    clearTimeout(timeoutId);
    timerLabel.textContent = "0.00";
    setTimeout(() => {
      showResult();
    }, 100);

    target.textContent = "画面クリックしてもう一度挑戦";
  }
};

const showResult = () => {
  const accuracy = score + miss === 0 ? 0 : (score / (score + miss)) * 100;
  alert(`${score} 文字中, ${miss} 文字失敗, 成功率${accuracy.toFixed(2)}% !`);
};

window.addEventListener("click", () => {
  if (isPlaying === true) {
    return;
  }
  isPlaying = true;

  loc = 0;
  score = 0;
  miss = 0;
  scoreLabel.textContent = score;
  missLabel.textContent = miss;
  word = words[Math.floor(Math.random() * words.length)];

  target.textContent = word;
  startTime = Date.now();
  updateTimer();
});

window.addEventListener("keydown", (e) => {
  if (isPlaying === false) {
    return;
  }
  console.log(e.key);
  if (e.key === word[loc]) {
    loc++;
    if (loc === word.length) {
      word = words[Math.floor(Math.random() * words.length)];
      loc = 0;
    }
    score++;
    updateTarget();
    scoreLabel.textContent = score;
  } else {
    miss++;
    missLabel.textContent = miss;
  }
});
