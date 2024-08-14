export default class Timer {
    constructor(element, time = 1) {
        this._element = element;
        this.time = time * 30;
        const progress = document.createElement('progress');
        progress.classList.add('timer-progress');
        progress.id = 'progress';
        const label = document.createElement('label');
        label.innerText = 'Time remains...';
        label.for='progress';
        progress.max = this.time;
        progress.value = this.time;
        this.timer = progress;
        element.append(label);
        element.append(this.timer);
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
        this._element.value = this.time;

    }
}