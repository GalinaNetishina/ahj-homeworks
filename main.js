/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/renderGame/game-graph.js

function renderGame(element) {
  if (typeof element === "string") {
    const element = document.querySelector(element);
  }
  drawHeader(element);
  drawBoard(element);
  createMessage();
  return {
    mole: document.querySelector(".mole"),
    holes: Array.from(document.querySelectorAll(".hole")),
    stats: {
      kills: document.querySelector("#kills"),
      miss: document.querySelector("#miss")
    },
    message: document.querySelector(".report"),
    remain: document.querySelector(".remaining"),
    closeBtn: document.querySelector(".close")
  };
}
function drawHeader(element) {
  const header = document.createElement("section");
  header.classList.add("top");
  const stats = document.createElement("div");
  stats.className = "stats";
  const kills = document.createElement("span");
  kills.id = "kills";
  kills.innerText = "0";
  const labelKill = document.createElement("label");
  labelKill.for = "kills";
  labelKill.innerText = "Попаданий: ";
  const miss = document.createElement("span");
  miss.id = "miss";
  const labelMiss = document.createElement("label");
  labelMiss.for = "miss";
  miss.innerText = "5";
  labelMiss.innerText = "Допустимых промахов: ";
  const progress = document.createElement("div");
  progress.classList.add("progress");
  const remain = document.createElement("div");
  remain.classList.add("remaining");
  stats.append(labelKill);
  labelKill.append(kills);
  stats.append(labelMiss);
  labelMiss.append(miss);
  header.append(stats);
  header.append(progress);
  progress.append(remain);
  element.parentElement.prepend(header);
}
function drawBoard(element) {
  const board = document.createElement("div");
  board.classList.add("board");
  for (let i = 1; i <= 16; i++) {
    let hole = document.createElement("div");
    hole.className = "hole hole-circle";
    hole.id = `hole${i}`;
    board.append(hole);
  }
  element.append(board);
  createMole();
}
function createMole() {
  const mole = document.createElement("div");
  mole.classList.add("mole");
  let randCell = Math.ceil(Math.random() * 16);
  mole.setAttribute("place", randCell);
  let cell = document.getElementById(`hole${randCell}`);
  cell.appendChild(mole);
}
function createMessage() {
  const message = document.createElement("div");
  message.className = "report hidden";
  message.innerHTML = `<h1>Игра окончена!</h1>
        <p>Ваш результат: <span id="result"></span><br>
        </p>`;
  const closeBtn = document.createElement("button");
  closeBtn.className = "close";
  closeBtn.innerText = "Перезапуск";
  closeBtn.addEventListener("click", () => {
    message.classList.add("hidden");
  });
  message.append(closeBtn);
  document.querySelector(".game").append(message);
}
;// CONCATENATED MODULE: ./src/js/game-logic.js

class Game {
  constructor(element) {
    this._element = element;
    const objects = renderGame(this._element);
    for (let prop in objects) {
      console.log(prop, objects[prop]);
      this[prop] = objects[prop];
    }
    this.settings = {
      attemptCount: 5,
      timeLimit: 10000,
      size: this.holes.length
    };
    this.stats = {
      kills: 0,
      miss: this.settings.attemptCount
    };
    this.duration = this.settings.timeLimit;
    this.progress = this.settings.timeLimit;
    this.timeUpdate = this.timeUpdate.bind(this);
    this.moleJump = this.moleJump.bind(this);
    this.restart = this.restart.bind(this);
    this.updateTimer = setInterval(this.timeUpdate, 1000);
    this.timeoutID = setTimeout(this.moleJump, 1000);
    this.holes.forEach(e => e.addEventListener("click", () => this.hit(e)));
    this.closeBtn.addEventListener("click", () => this.restart());
  }
  #statsUpdate() {
    document.querySelector("#kills").textContent = this.stats.kills;
    document.querySelector("#miss").textContent = this.stats.miss;
  }
  timeUpdate() {
    this.progress -= 1000;
    this.remain.style.width = Math.floor(this.progress * 100 / this.duration) + "%";
    if (this.progress === 0) {
      this.gameOver();
    }
  }
  hit(element) {
    if (element.querySelector(".mole")) {
      this.stats.kills++;
      this.moleJump();
    } else {
      this.stats.miss--;
    }
    this.#statsUpdate();
    if (this.stats.miss == 0) {
      this.gameOver();
    }
  }
  gameOver() {
    document.querySelector("#result").textContent = this.stats.kills;
    this.message.classList.toggle("hidden");
  }
  restart() {
    this.stats.kills = 0;
    this.stats.miss = this.settings.attemptCount;
    this.#statsUpdate();
    this.remain.style.width = "100%";
    this.progress = this.settings.timeLimit;
    clearInterval(this.updateTimer);
    this.updateTimer = setInterval(this.timeUpdate, 1000);
  }
  #getHole(index) {
    return document.getElementById(`hole${index}`);
  }
  moleJump() {
    const nextHoleId = Math.ceil(Math.random() * this.settings.size);
    if (nextHoleId == this.mole.place) {
      this.moleJump();
    }
    this.#getHole(nextHoleId).append(this.mole);
    this.mole.place = nextHoleId;
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(this.moleJump, 1000);
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

document.addEventListener("DOMContentLoaded", () => {
  const widget = new Game(document.querySelector(".game"));
  window.widget = widget;
});
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;