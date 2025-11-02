//
//// api.js
//

export { fetchCategories, fetchQuestions, fetchEndlessQuestions };

// API - Endponints:
const API_CATEGORY_PATH = `https://opentdb.com/api_category.php`;
const API_QUESTION_PATH = `https://opentdb.com/api.php`;

async function fetchCategories() {
  const url = API_CATEGORY_PATH;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching categories: ${response.status}`);
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
    throw new Error(`Error fetching questions: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
}

async function fetchEndlessQuestions(category, amount = 50) {
  const url =
    category === "any"
      ? `${API_QUESTION_PATH}?amount=${amount}&type=multiple`
      : `${API_QUESTION_PATH}?amount=${amount}&category=${category}&type=multiple`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching questions: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
}
