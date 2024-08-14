import Timer from "../timer/timer";

export default class Game {
    constructor(element, size = 4) {
        this._element = element;
        this.kills = 0;
        this.miss = 0;
        this.size = size;
        const timerPlace = document.querySelector('.timer');
        this.timer = new Timer(timerPlace);

        this.mole = document.createElement('div');
        this.mole.classList.add('mole');

        this.#drawBoard(size);
        this.activeHole = Math.floor( 1 + Math.random() * this.size**2 )
        this.#play();
    }

    hit(element) {
        if (element.querySelector('.mole')){
            this.kills++;
        } else {
            this.miss++;
        }
    }

    #drawBoard(size) {
        for (let i=1; i<=size**2; i++) {
            let hole = document.createElement('div');
            hole.className = 'hole';
            hole.id = `hole${i}`;
            hole.addEventListener('click', () => this.hit(hole))
            this._element.append(hole);
        }
    }

    #getHole(index){
       return document.getElementById(`hole${index}`);
    } 
    
    #moleRun() {
     setInterval(() => {
            let activeHole = Math.floor( 1 + Math.random() * this.size**2 );
            this.#getHole( activeHole ).append(this.mole);
          }, 1000 );
      };

    #showResult() {
        const message = document.createElement('div');
        message.className = 'report';
        message.innerHTML = `<h1>Игра окончена!</h1>
        <p>Ваш результат:<br>

        Попаданий - ${this.kills}<br>
        Промахов - ${this.miss}
        </p>`
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close';
        closeBtn.innerText = 'Закрыть'
        closeBtn.addEventListener('click', ()=>{
            document.body.removeChild(message);
            this.timer.reset();
            this.#play()})
        message.append(closeBtn);
        document.body.append(message);
    }

    #play() {
        this.#moleRun();
        this.timer.tick(()=>this.#showResult());
    }
}
