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
  const screens = {
    menu: [domEl.quizMenu],
    loading: [domEl.loadScreen],
    inGame: [domEl.quizCont],
    gameOver: [domEl.gameOverScreen, domEl.quizCont],
    youWin: [domEl.youWinScreen],
  };

  /* 
Object.values(obj) → array of obj values 
.flat() → Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
*/

  Object.values(screens)
    .flat()
    .forEach((el) => (el.style.display = "none"));

  (screens[state] || []).forEach((el) => (el.style.display = "flex"));
}

function renderHp(hp) {
  domEl.navHp.innerHTML = hp;
}
