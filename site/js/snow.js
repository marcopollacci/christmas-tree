function letItSnow() {
  for (let i = 0; i < 500; i++) {
    const snowflake = document.createElement("span");
    const size = randomize(0.15, 0.85);
    const leftPos = randomize(0, 100);

    snowflake.classList.add("snowflake");
    snowflake.classList.add(`c${randomize(1, 3, true)}`);
    snowflake.style.left = `${leftPos}%`;
    snowflake.style.width = `${size}vw`;
    snowflake.style.height = `${size}vw`;
    snowflake.style.setProperty("--drift", `${leftPos + 2}%`);
    snowflake.style.animationDelay = `${randomize(0, 100)}s`;
    document.querySelector(".snow-area").appendChild(snowflake);
  }
}

/**
 * Returns a random number between min (inclusive) and max (inclusive)
 * @param {number} min
 * @param {number} max
 * @param {boolean} [round=false] - If true, Math.round is called on the result.
 * @returns {number}
 */
function randomize(min, max, round = false) {
  const randomPick = Math.random() * (max - min) + min;
  return round ? Math.round(randomPick) : randomPick;
}

/**
 * Calculates the animation delay for a given snowflake based on its index.
 * @param {number} flakeIndex - The index of the snowflake in the list of all snowflakes.
 * @param {number} totalSnowCount - The total number of snowflakes.
 * @returns {number} The delay for the snowflake's animation, in seconds.
 */
function calcAnimationDelay(flakeIndex, totalSnowCount) {
  return flakeIndex < totalSnowCount * 0.1
    ? randomize(0, 0.5)
    : randomize(0.35, 18);
}

/**
 * Toggles full screen mode for the page.
 * @return {void}
 */
function goFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
}

window.addEventListener("DOMContentLoaded", letItSnow);
document.body.addEventListener("click", goFullscreen);
