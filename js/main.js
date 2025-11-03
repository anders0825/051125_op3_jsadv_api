//
//
/// main.js

// Importing classes:
import { GameManager } from "./gameManager.js";

// Importing functions:
import { fetchCategories } from "./api.js";
import {
  domEl,
  renderCategories,
  renderQuestion,
  displayState,
  renderHp,
} from "./dom.js";
import { FisherYatesShuffle as shuffle, retryAsyncFn } from "./utility.js";

// Fix Game States

let game = null;
let gameType = null;

const states = ["menu", "loading", "inGame", "gameOver", "youWin"];
let gameState = states[0];

console.warn("HEY! No Looking in the console you cheater");

async function init() {
  displayState(gameState);
  const categories = await retryAsyncFn(() => fetchCategories());
  renderCategories(categories);
}
init();

domEl.startBtn.addEventListener("click", async () => {
  if (gameState !== "menu") return console.error("Game already running");

  const quizType = domEl.typeSelect.value;
  const category = domEl.categorySelect.value;
  await startGame(category, quizType);
});

async function startGame(selectedCategory, quizType) {
  game = new GameManager(quizType);
  gameType = quizType;
  gameState = "loading";
  displayState(gameState);

  if (quizType === "normal") {
    await game.loadFirtQuestions(selectedCategory);
  } else if (quizType === "endless") {
    await game.loadEndlessQuestions(selectedCategory);
  } else {
    console.log("Invalid Quiz Type");
  }

  setQuestion();
  renderHp(game.hp);
  gameState = "inGame";
  displayState(gameState);

  if (quizType === "normal") {
    game.loadQuestions(selectedCategory);
  }
}

function setQuestion() {
  renderQuestion(game.currentQuestion, game.questionId);
  console.log(
    `Question ${game.questionId + 1} answer: ${
      game.currentQuestion.correct_answer
    }`
  );

  const answers = [
    game.currentQuestion.incorrect_answers,
    game.currentQuestion.correct_answer,
  ].flat();
  const shuffeledAnswers = shuffle(answers);

  domEl.answerBtns.forEach((btn, i) => {
    btn.innerHTML = shuffeledAnswers[i];
    btn.value =
      shuffeledAnswers[i] === game.currentQuestion.correct_answer
        ? "true"
        : "false";
    btn.style.backgroundColor = "";
  });
}

domEl.answerBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    if (gameState !== "inGame") return;

    const correct = btn.value === "true";
    const result = game.answerQuestion(correct);
    btn.style.backgroundColor = result ? "var(--correct)" : "var(--wrong)";
    renderHp(game.hp);

    if (game.hp <= 0 && game.quizType === "normal") {
      gameState = "gameOver";
      displayState(gameState);
    }
  })
);

domEl.nextBtn.addEventListener("click", () => {
  if (gameState !== "inGame" || !game.canContinue) return;

  game.nextQuestion();

  if (
    gameType === "endless" &&
    game.questionId >= game.questions.length / 2 &&
    !game.endlessLoading
  ) {
    game.endlessLoading = true;
    game
      .loadEndlessQuestions(domEl.categorySelect.value, false)
      .then(() => (game.endlessLoading = false));
  }

  if (
    gameType === "normal" &&
    game.questionId === 14 &&
    game.canContinue === true
  ) {
    gameState = "youWin";
    displayState(gameState);
  }

  setQuestion();
});

function resetToMenu() {
  gameState = "menu";
  displayState(gameState);
  if (game) game.sessionId++;
}

domEl.backBtn.addEventListener("click", resetToMenu);
domEl.retryBtn.forEach((btn) => btn.addEventListener("click", resetToMenu));
