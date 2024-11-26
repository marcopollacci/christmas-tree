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
/**
 * Generates a Christmas tree with the given number of rows.
 * The tree is added to the first element with class "tree".
 * The tree is composed of asterisks (*) and vertical bars (|).
 * The tree is animated by incrementing the --delay CSS property
 * for each row element and setting it as a property on each span element.
 * @param {number} [rows=7] - The number of rows in the tree.
 * @return {void}
 */
function generateTree(rows = 7) {
  const treeElement = document.querySelector(".tree");
  let delay = 0;

  for (let i = 0; i < rows; i++) {
    const rowElement = document.createElement("div");
    treeElement.appendChild(rowElement);

    for (let j = 0; j <= i; j++) {
      const spanElement = document.createElement("span");
      spanElement.style.setProperty("--delay", `${delay}`);
      spanElement.textContent = "* ";
      rowElement.appendChild(spanElement);
      delay += 0.2;
    }
  }
  const trunkElement = document.createElement("span");
  trunkElement.textContent = "|";
  treeElement.appendChild(trunkElement);
}

function alterNumberOfFlakes() {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has("flakes")) {
    const flakes = searchParams.get("flakes");
    document.querySelector("snow-flakes").setAttribute("flakes", flakes);
  }
}

window.onload = () => {
  generateTree();
  alterNumberOfFlakes();
};
document.body.addEventListener("dblclick", goFullscreen);
