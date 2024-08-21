import renderGame from "./renderGame/game-graph";

export default class Game {
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
      size: this.holes.length,
    };
    this.stats = {
      kills: 0,
      miss: this.settings.attemptCount,
    };
    this.duration = this.settings.timeLimit;
    this.progress = this.settings.timeLimit;

    this.timeUpdate = this.timeUpdate.bind(this);
    this.moleJump = this.moleJump.bind(this);
    this.restart = this.restart.bind(this);

    this.updateTimer = setInterval(this.timeUpdate, 1000);
    this.timeoutID = setTimeout(this.moleJump, 1000);

    this.holes.forEach((e) => e.addEventListener("click", () => this.hit(e)));
    this.closeBtn.addEventListener("click", () => this.restart());
  }

  #statsUpdate() {
    document.querySelector("#kills").textContent = this.stats.kills;
    document.querySelector("#miss").textContent = this.stats.miss;
  }

  timeUpdate() {
    this.progress -= 1000;

    this.remain.style.width =
      Math.floor((this.progress * 100) / this.duration) + "%";
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
