import Game from './game/game.js'

document.addEventListener('DOMContentLoaded', () => {
  const widget = new Game(document.querySelector('.board'));
  window.widget = widget;
})
