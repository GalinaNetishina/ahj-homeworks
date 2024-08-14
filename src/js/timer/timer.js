export default class Timer {
    constructor(element, time = 1) {
        this._element = element;
        const progress = document.createElement('progress');
        progress.classList.add('timer-progress');
        progress.id = 'progress';
        const label = document.createElement('label');
        label.innerText = 'Time remains...';
        label.for='progress';
        progress.max = time * 60;
        progress.value = time * 60;
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
}