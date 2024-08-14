export default class Timer {
    constructor(element, time = 1) {
        this._element = element;
        this.time = time * 10;
        this.timer = this.#drawTimer(element);
    }

    #drawTimer(element) {
        const progress = document.createElement('progress');
        progress.classList.add('timer-progress');
        progress.id = 'progress';
        const label = document.createElement('label');
        label.innerText = 'Time remains...';
        label.for='progress';
        progress.max = this.time;
        progress.value = this.time;
        element.append(label);
        element.append(progress);
        return progress;
    }

    tick(cb) {
        const countdown = setInterval(() => {
            this.timer.value--;
            if (this.timer.value == 0) {
                clearInterval(countdown);
                cb();
            }
        }, 1000);
    }   

    reset() {
        this.timer.value = this.time;
    }
}