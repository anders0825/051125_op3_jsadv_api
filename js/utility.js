//
/// utility.js
//

/* Iterates from the last element to the first, swapping each element with a randomly chosen element from 
 the unshuffled portion of the list, including the possibility of swapping an element with itself */
export function FisherYatesShuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* Makes First Letter upperCase and the rest lowerCase*/
export function makeFirstCaps(str) {
  return str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase();
}

/* Modified version of a retry function fond at: 
dev.to; Javascript fetch, retry upon failure */

/**
 * Retry function for asyncs that can fail
 * @param {Function} asyncFn - The Async function
 * @param {number} ms - Delay in ms on retry
 * @param {number} retries - Number of retries
 */

export async function retryAsyncFn(
  asyncFn,
  ms = 1000,
  retries = 3,
  attempt = 1
) {
  let delay = ms;
  if (attempt === 1) {
    delay = ms;
  } else {
    delay += 1000 * (attempt - 1);
  }
  await new Promise((resolve) => setTimeout(resolve, delay));
  try {
    return await asyncFn();
  } catch (err) {
    console.warn(`Attempt ${attempt} failed, delay: ${delay}, ${err}`);

    if (attempt >= retries) {
      throw err;
    } else {
      return retryAsyncFn(asyncFn, ms, retries, attempt + 1);
    }
  }
}
