//
/// GameManager.js
//

export { GameManager };

import { fetchQuestions, fetchToken, fetchEndlessQuestions } from "./api.js";
import { retryAsyncFn } from "./utility.js";

class GameManager {
  // Properties:
  constructor(quizType) {
    this.questions = [];
    this.questionId = 0;
    this.hp = 3;
    this.canContinue = false;
    this.sessionId = 0;
    this.quizType = quizType;
    this.endlessToken = "";
    this.loadEndless = false;
  }

  // Get - "Calculated Properties"
  get currentQuestion() {
    return this.questions[this.questionId];
  }

  // Methods:
  async loadFirtQuestions(category) {
    this.hp = 3;
    this.questions = [];
    this.sessionId++;
    const currentSession = this.sessionId;

    const easyQ = await retryAsyncFn(() => fetchQuestions("easy", category));

    if (this.sessionId !== currentSession) return;
    this.questions.push(...easyQ);

    console.log("Easy Questions Loaded");
  }

  async loadQuestions(category) {
    const currentSession = this.sessionId;

    const mediumQ = await retryAsyncFn(
      () => fetchQuestions("medium", category),
      2000
    );
    if (this.sessionId !== currentSession) return;
    this.questions.push(...mediumQ);

    console.log("Medium Questions Loaded");

    const hardQ = await retryAsyncFn(
      () => fetchQuestions("hard", category),
      2000
    );
    if (this.sessionId !== currentSession) return;
    this.questions.push(...hardQ);

    console.log("Hard Questions Loaded");

    console.log(this.questions);
  }

  async loadEndlessQuestions(category, isNewSession = false) {
    this.hp = 0;
    if (isNewSession) {
      this.questions = [];
      this.sessionId++;
    }

    if (!this.endlessToken) {
      this.endlessToken = await retryAsyncFn(fetchToken);
    }

    const endlessQ = await retryAsyncFn(() =>
      fetchEndlessQuestions(this.endlessToken, category, 50)
    );

    this.questions.push(...endlessQ);
    console.log("Endless Questions Loaded", this.questions);
  }

  answerQuestion(answer) {
    if (answer) {
      this.canContinue = true;
      return true;
    } else if (this.canContinue) {
      return false;
    } else {
      this.hp--;
      return false;
    }
  }

  nextQuestion() {
    if (this.canContinue && this.questionId < this.questions.length - 1) {
      this.questionId++;
      this.canContinue = false;
    }
  }
  // "Private functions":
  #delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
