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

let game = null;
let gameType = null;

const states = ["menu", "loading", "inGame", "gameOver", "youWin"];
let gameState = states[0];

async function init() {
  displayState(gameState);
  const categories = await retryAsyncFn(() => fetchCategories());
  renderCategories(categories);
}
init();

domEl.startBtn.addEventListener("click", async () => {
  if (gameState === "menu") {
    gameType = domEl.typeSelect.value;
    if (gameType === "normal") {
      game = new GameManager(gameType);
      gameState = states[1];
      displayState(gameState);
      const selectedCategory = domEl.categorySelect.value;
      await game.loadFirtQuestions(selectedCategory);
      setQuestion();
      renderHp(game.hp);
      gameState = states[2];
      displayState(gameState);
      await game.loadQuestions(selectedCategory);
      console.log(game.questions);
    } else {
      game = new GameManager(gameType);
      gameState = states[1];
      displayState(gameState);
      const selectedCategory = domEl.categorySelect.value;
      await game.loadEndlessQuestions(selectedCategory);
      setQuestion();
      renderHp(game.hp);
      gameState = states[2];
      displayState(gameState);
      console.log(game.questions);
    }
  } else {
    console.error("Can't start new Game while a Game is in Progress");
  }
});

function setQuestion() {
  renderQuestion(game.currentQuestion, game.questionId);
  console.log(
    `Question ${game.questionId + 1} answer: ${
      game.currentQuestion.correct_answer
    }`
  );

  const answers = [
    ...game.currentQuestion.incorrect_answers,
    game.currentQuestion.correct_answer,
  ];
  const shuffeledAnswers = shuffle([...answers]);

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
    if (gameState === "inGame") {
      const answer = btn.value === "true";
      const result = game.answerQuestion(answer);
      btn.style.backgroundColor = result ? "var(--correct)" : "var(--wrong)";
      renderHp(game.hp);
      if (game.hp <= 0 && game.quizType === "normal") {
        gameState = states[3];
        displayState(gameState);
      }
    }
  })
);

domEl.nextBtn.addEventListener("click", () => {
  console.log(game.questionId);
  if (gameState === "inGame" && game.canContinue) {
    game.nextQuestion();
    setQuestion();
  }
  if (gameType === "endless" && game.questionId >= 25) {
    game.loadEndlessQuestions();
  }
  if (gameType === "normal" && game.questionId === 14 && game.canContinue) {
    gameState = states[4];
    displayState(gameState);
  }
});

domEl.backBtn.addEventListener("click", () => {
  if (gameState === "inGame" || gameState === "gameOver");
  gameState = states[0];
  displayState(gameState);
  game.sessionId++;
});

domEl.retryBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    if (gameState === "gameOver" || gameState === "youWin") {
      gameState = states[0];
      displayState(gameState);
      game.sessionId++;
    }
  })
);
