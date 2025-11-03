//
//// api.js
//

export { fetchCategories, fetchQuestions, fetchToken, fetchEndlessQuestions };

// API - Endponints:
const API_CATEGORY_PATH = `https://opentdb.com/api_category.php`;
const API_QUESTION_PATH = `https://opentdb.com/api.php`;
const API_TOKEN_PATH = `https://opentdb.com/api_token.php?command=request`;

async function fetchCategories() {
  const url = API_CATEGORY_PATH;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`fetchCategories(): ${response.status}`);
  }

  const data = await response.json();
  return data.trivia_categories;
}

async function fetchQuestions(difficulty, category, amount = 5) {
  const url =
    category === "any"
      ? `${API_QUESTION_PATH}?amount=${amount}&difficulty=${difficulty}&type=multiple`
      : `${API_QUESTION_PATH}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `fetchQuestions(${difficulty}, ${category}, ${amount}): ${response.status}`
    );
  }

  const data = await response.json();
  return data.results;
}

async function fetchToken() {
  const url = API_TOKEN_PATH;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`fetchToken: ${response.status}`);
  }

  const data = await response.json();
  return data.token;
}

async function fetchEndlessQuestions(token, category, amount = 50) {
  const url =
    category === "any"
      ? `${API_QUESTION_PATH}?amount=${amount}&token=${token}&type=multiple`
      : `${API_QUESTION_PATH}?amount=${amount}&token=${token}&category=${category}&type=multiple`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `fetchEndlessQuestions(${category}, ${amount}): ${response.status}`
    );
  }

  const data = await response.json();
  return data.results;
}
