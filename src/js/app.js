import Game from "./game-logic.js";

document.addEventListener("DOMContentLoaded", () => {
  const widget = new Game(document.querySelector(".game"));
  window.widget = widget;
});
