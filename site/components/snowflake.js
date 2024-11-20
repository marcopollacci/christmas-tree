class Snowflake extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
}

customElements.define("snow-flake", Snowflake);
