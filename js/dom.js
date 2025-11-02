//
//// dom.js
//

export { domEl, renderCategories, renderQuestion, displayState, renderHp };
import { makeFirstCaps } from "./utility.js";

const domEl = {
  //  Menu:
  quizMenu: document.querySelector("#quiz-menu"),

  typeSelect: document.querySelector("#type-select"),
  categorySelect: document.querySelector("#category-select"),
  startBtn: document.querySelector("#start-btn"),

  // Loading Screen:
  loadScreen: document.querySelector("#loading-section"),

  // Questions:
  quizCont: document.querySelector("#quiz"),

  navNum: document.querySelector("#question-num"),
  navDifficulty: document.querySelector("#difficulty"),
  navHp: document.querySelector("#hp"),

  category: document.querySelector("#category"),
  question: document.querySelector("#question"),
  answerBtns: document.querySelectorAll("#answer-cont button"),

  backBtn: document.querySelector("#back-btn"),
  nextBtn: document.querySelector("#next-btn"),

  gameOverScreen: document.querySelector("#game-over"),
  retryBtn: document.querySelectorAll(".retry-btn"),

  youWinScreen: document.querySelector("#you-win"),
};

function renderCategories(categories) {
  for (let cat of categories) {
    const catOption = document.createElement("option");
    catOption.value = cat.id;
    catOption.textContent = cat.name;
    domEl.categorySelect.append(catOption);
  }
}

function renderQuestion(question, idx) {
  //nav
  domEl.navNum.innerHTML = `Question ${idx + 1}.`;
  domEl.navDifficulty.innerHTML = makeFirstCaps(question.difficulty);

  //question
  domEl.category.innerHTML = question.category;
  domEl.question.innerHTML = question.question;
}

function displayState(state) {
  if (state === "menu") {
    domEl.quizMenu.style.display = "flex";
    domEl.loadScreen.style.display = "none";
    domEl.quizCont.style.display = "none";
    domEl.gameOverScreen.style.display = "none";
    domEl.youWinScreen.style.display = "none";
  } else if (state === "loading") {
    domEl.quizMenu.style.display = "none";
    domEl.loadScreen.style.display = "flex";
    domEl.quizCont.style.display = "none";
    domEl.gameOverScreen.style.display = "none";
    domEl.youWinScreen.style.display = "none";
  } else if (state === "inGame") {
    domEl.quizMenu.style.display = "none";
    domEl.loadScreen.style.display = "none";
    domEl.quizCont.style.display = "flex";
    domEl.gameOverScreen.style.display = "none";
    domEl.youWinScreen.style.display = "none";
  } else if (state === "gameOver") {
    domEl.quizMenu.style.display = "none";
    domEl.loadScreen.style.display = "none";
    domEl.quizCont.style.display = "flex";
    domEl.gameOverScreen.style.display = "flex";
    domEl.youWinScreen.style.display = "none";
  } else if (state === "youWin") {
    domEl.quizMenu.style.display = "none";
    domEl.loadScreen.style.display = "none";
    domEl.quizCont.style.display = "none";
    domEl.gameOverScreen.style.display = "none";
    domEl.youWinScreen.style.display = "flex";
  }
}

function renderHp(hp) {
  domEl.navHp.innerHTML = hp;
}
