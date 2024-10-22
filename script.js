let startTime, updatedTime, difference, interval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimes = document.getElementById('lapTimes');

function updateDisplay(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;

    display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function startStopwatch() {
    if (!running) {
        startTime = Date.now() - (difference || 0);
        interval = setInterval(() => {
            updatedTime = Date.now() - startTime;
            updateDisplay(updatedTime);
        }, 10);
        running = true;
    }
}

function stopStopwatch() {
    if (running) {
        clearInterval(interval);
        difference = updatedTime;
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(interval);
    running = false;
    difference = 0;
    updateDisplay(0);
    lapTimes.innerHTML = '';
    lapCounter = 0;
}

function addLap() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        lapTimes.appendChild(lapTime);
    }
}

startButton.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', stopStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', addLap);
