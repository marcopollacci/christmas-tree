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
function generateTree(rows = 7) {
  console.log("🚀 ~ generateTree ~ rows:", rows);
  const treeElement = document.querySelector(".tree");
  console.log("🚀 ~ generateTree ~ treeElement:", treeElement);
  let delay = 0;

  for (let i = 0; i < rows; i++) {
    const rowElement = document.createElement("div");
    treeElement.appendChild(rowElement);

    for (let j = 0; j <= i; j++) {
      const spanElement = document.createElement("span");
      spanElement.style.setProperty("--delay", `${delay}s`);
      spanElement.textContent = "* ";
      rowElement.appendChild(spanElement);
      delay += 0.2;
    }
  }
  const trunkElement = document.createElement("span");
  trunkElement.textContent = "|";
  treeElement.appendChild(trunkElement);
}

window.onload = () => {
  generateTree();
};
document.body.addEventListener("click", goFullscreen);
