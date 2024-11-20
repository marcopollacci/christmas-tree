//* css and some function here are taken from referral: https://github.com/danielglejzner/angular-christmas-calendar
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
      this.#letItSnow(newValue);
    }
  }

  #letItSnow(numberOfSnowflakes = 100) {
    for (let i = 0; i < numberOfSnowflakes; i++) {
      const snowflake = document.createElement("span");
      const size = this.#randomize(0.15, 0.85);
      const leftPos = this.#randomize(0, 100);

      snowflake.classList.add("snowflake");
      snowflake.classList.add(`c${this.#randomize(1, 3, true)}`);
      snowflake.style.left = `${leftPos}%`;
      snowflake.style.width = `${size}vw`;
      snowflake.style.height = `${size}vw`;
      snowflake.style.setProperty("--drift", `${leftPos + 2}%`);
      snowflake.style.animationDelay = `${this.#randomize(0, 100)}s`;
      this.shadowRoot.querySelector(".snow-area").appendChild(snowflake);
    }
  }

  #randomize(min, max, round = false) {
    const randomPick = Math.random() * (max - min) + min;
    return round ? Math.round(randomPick) : randomPick;
  }

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
            max-width: 8px;
            max-height: 8px;
            -webkit-animation-name: snowAnime;
            animation-name: snowAnime;
            -webkit-animation-duration: 5s;
            animation-duration: 5s;
            -webkit-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
            position: absolute;
            -webkit-transform: translateY(-10px);
            transform: translateY(-10px);
          }

          .snowflake.c1 {
            background-color: rgba(255, 255, 255, 0.9);
          }

          .snowflake.c2 {
            background-color: #d6ffff;
            -webkit-animation-duration: 18s;
            animation-duration: 18s;
          }

          .snowflake.c3 {
            background-color: #fff;
            -webkit-animation-duration: 22s;
            animation-duration: 22s;
          }

          @-webkit-keyframes snowAnime {
            15%,
            95% {
              opacity: 1;
              left: var(--drift);
            }

            to {
              opacity: 0.8;
              -webkit-transform: translateY(110vh);
              transform: translateY(110vh);
            }
          }

          @keyframes snowAnime {
            15%,
            95% {
              opacity: 1;
            }

            to {
              opacity: 0.8;
              -webkit-transform: translateY(110vh);
              transform: translateY(110vh);
            }
          }
    `;
  }
}

customElements.define("snow-flakes", SnowFlakes);
