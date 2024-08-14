import Timer from "../timer/timer";

export default class Game {
    constructor(element, size = 4) {
        this._element = element;
        this.kills = 0;
        this.miss = 0;
        this.size = size;

        this.#drawUI()
        this.#drawBoard(size);
        this.activeHole = Math.floor( 1 + Math.random() * this.size**2 )
        this.#play();
    }

    hit(element) {
        if (element.querySelector('.mole')){
            this.kills++;
            this.#moleJump();
        } else {
            this.miss++;
        }
    }

    #drawUI() {
        const timerPlace = document.querySelector('.timer');
        this.timer = new Timer(timerPlace);

        const message = document.createElement('div');
        message.className = 'report hidden';
        const kills= document.createElement('span');
        kills.id = 'kills';
        const miss= document.createElement('span');
        miss.id = 'miss';
        message.innerHTML = `<h1>Игра окончена!</h1>
        <p>Ваш результат:<br>
        </p>`
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close';
        closeBtn.innerText = 'Закрыть'
        closeBtn.addEventListener('click', ()=>{
            this.message.classList.add('hidden');
            this.reset();            
            this.#play()})
        message.append(kills);
        message.append(miss);
        message.append(closeBtn);
        document.body.append(message);
        this.message = message;
    }

    #drawBoard(size) {
        for (let i=1; i<=size**2; i++) {
            let hole = document.createElement('div');
            hole.className = 'hole';
            hole.id = `hole${i}`;
            hole.addEventListener('click', () => this.hit(hole))
            this._element.append(hole);
        }
        this.mole = document.createElement('div');
        this.mole.classList.add('mole');
    }

    #getHole(index){
       return document.getElementById(`hole${index}`);
    } 
    
    #moleJump() {
        this.#getHole( this.activeHole ).append(this.mole);
        let nextHole = Math.floor( 1 + Math.random() * this.size**2 );
        if (nextHole == this.activeHole) {
                this.#moleJump();
            }
        this.activeHole = nextHole;
      };

    #showResult() {
        document.querySelector('#kills').innerHTML = `Попаданий - ${this.kills}<br>`;
        document.querySelector('#miss').innerHTML =`Промахов - ${this.miss}<br>`;
        this.message.classList.remove('hidden');
    }

    reset() {
        this.timer.reset();
        this.kills = 0;
        this.miss = 0;
    }

    #play() {
        setInterval(()=>{
            this.#moleJump()
        }, 1000)
        this.timer.tick(()=>this.#showResult());
    }
}
