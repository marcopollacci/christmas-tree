class SnowFlakes extends HTMLElement {
  static observedAttributes = ["flakes"];
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>${this.#cssStyles()}</style>
        <div class="snow-area"></div>
    `;
  }

  get flakes() {
    return this.getAttribute("flakes");
  }

  set flakes(value) {
    if (value === this.flakes) return;
    this.setAttribute("flakes", value);
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "flakes") {
      this.shadowRoot.querySelector(".snow-area").innerHTML = "";
      this.#letItSnow(newValue);
    }
  }

  /**
   * The function `letItSnow` appends a specified number of snowflakes to a designated element in the
   * shadow DOM.
   * @param [numberOfSnowflakes=100] - The `numberOfSnowflakes` parameter in the `letItSnow` function
   * specifies the number of snowflakes to be generated and appended to the `.snow-area` element in the
   * component's shadow DOM. By default, if no value is provided when calling the function, it will
   * generate 100
   */
  #letItSnow(numberOfSnowflakes = 100) {
    for (let i = 0; i < numberOfSnowflakes; i++) {
      this.shadowRoot
        .querySelector(".snow-area")
        .appendChild(this.snowFlakeMaker().next().value);
    }
  }

  /**
   * A generator function that creates a snowflake element.
   * The element is assigned a random class (c1, c2, c3) for styling.
   * The element is assigned a random left position, width, and height.
   * The element is assigned a random animation delay.
   * The element is assigned a custom property '--drift' which is the left position plus 2.
   * The generator yields the snowflake element.
   */
  *snowFlakeMaker() {
    //* this peace of code inside the function is taken from: https://github.com/danielglejzner/angular-christmas-calendar
    //* and modified to work with this project
    const snowflake = document.createElement("span");
    const size = this.#randomize(0.15, 0.85);
    const leftPos = this.#randomize(0, 100);

    snowflake.classList.add("snowflake");
    snowflake.classList.add(`c${this.#randomize(1, 3, true)}`);
    snowflake.style.left = `${leftPos}%`;
    snowflake.style.width = `${size}vw`;
    snowflake.style.height = `${size}vw`;
    snowflake.style.setProperty("--drift", `${leftPos + 2}%`);
    snowflake.style.animationDelay = `${this.#randomize(0, 60)}s`;
    yield snowflake;
  }

  /**
   * The function "randomize" generates a random number within a specified range, with an option to round
   * the result.
   * @param min - The `min` parameter in the `randomize` function represents the minimum value of the
   * range from which a random number will be generated.
   * @param max - The `max` parameter in the `randomize` function represents the maximum value that you
   * want the random number to be generated within.
   * @param [round=false] - The `round` parameter in the `randomize` function is a boolean value that
   * determines whether the random number generated should be rounded to the nearest integer or not. If
   * `round` is set to `true`, the random number will be rounded using `Math.round()`, otherwise, the
   * random number
   * @returns a random number between the specified minimum and maximum values. If the `round` parameter
   * is set to `true`, the returned value is rounded to the nearest integer.
   */
  //* this function is taken from: https://github.com/danielglejzner/angular-christmas-calendar
  #randomize(min, max, round = false) {
    const randomPick = Math.random() * (max - min) + min;
    return round ? Math.round(randomPick) : randomPick;
  }

  /**
   *  The `#cssStyles()` function in the provided JavaScript code is a private method within the
   * `SnowFlakes` class. This function returns a string containing CSS styles that define the appearance
   * and animation properties for the snowflakes in the custom HTML element created by the `SnowFlakes`
   * class.
   */
  //* this styles is taken from: https://github.com/danielglejzner/angular-christmas-calendar and little modified
  #cssStyles() {
    return `
          .snow-area {
            z-index: -1;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            overflow: hidden;
          }

          .snowflake {
            opacity: 0.4;
            pointer-events: none;
            will-change: transform, opacity, left;
            border-radius: 50%;
            max-width: 0.5em;
            max-height: 0.5em;
            animation-name: snowAnime;
            animation-duration: 5s;
            animation-iteration-count: infinite;
            position: absolute;
            transform: translateY(-0.625em);
          }

          .snowflake.c1 {
            background-color: rgba(255, 255, 255, 0.9);
          }

          .snowflake.c2 {
            background-color: #d6ffff;
            animation-duration: 10s;
          }

          .snowflake.c3 {
            background-color: #fff;
            animation-duration: 16s;
          }

          @keyframes snowAnime {
            15%,
            95% {
              opacity: 1;
            }

            to {
              opacity: 0.8;
              transform: translateY(110vh);
            }
          }
    `;
  }
}

customElements.define("snow-flakes", SnowFlakes);
