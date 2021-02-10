function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function startTimer(timerObj, targetElement) {
    return timerObj.id = setInterval(function () {
        document.querySelector(targetElement).textContent = timerObj.seconds;
        timerObj.seconds++;
    }, 1000)
}

function stopTimer(timerObj, targetElement) {
    if (timerObj.seconds !== 1) {
        clearInterval(timerObj.id);
        timerObj.seconds = 1;
        document.querySelector(targetElement).textContent = 0;
    }
}

export { getRandomNumber, startTimer, stopTimer };