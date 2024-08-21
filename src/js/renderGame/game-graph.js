import  "./game-graph.css";

export default function renderGame(element) {
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
      miss: document.querySelector("#miss"),
    },
    message: document.querySelector(".report"),
    remain: document.querySelector(".remaining"),
    closeBtn: document.querySelector(".close"),
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
