function displayCounters(action) {
    let countersDisplay = document.querySelector('.counters');
    countersDisplay.style.display = action;
}

function updateMines(action) {
    let minesField = document.getElementById('mines');
    action === '-' ? minesField.textContent-- : minesField.textContent++;
}

function displayIntroMessage(action) {
    document.querySelector('.intro').children[1].style.display = `${action}`;
    document.querySelector('.intro').children[3].style.display = `${action}`;
}

function displayDeathMessage(action) {
    let messageDisplay = document.querySelector('.intro').children[2];
    messageDisplay.style.display = action;
}

function displayGameButtons(action) {
    let buttons = document.querySelector('.game-buttons');
    buttons.style.display = action;
}

function removeClickListeners(settings) {
    if (settings.listeners) {
        document.getElementsByClassName('field')[0].removeEventListener('click', settings.listeners.pickField);
        document.getElementsByClassName('field')[0].removeEventListener('contextmenu', settings.listeners.markMine);
    }

}

function addClickListeners(clickListener, mineListener, settingsObj) {
    settingsObj.listeners = { pickField: clickListener, markMine: mineListener };
    document.getElementsByClassName('field')[0].addEventListener('click', settingsObj.listeners.pickField);
    document.getElementsByClassName('field')[0].addEventListener('contextmenu', settingsObj.listeners.markMine);
}

export {
    displayCounters,
    updateMines,
    displayIntroMessage,
    displayDeathMessage,
    displayGameButtons,
    removeClickListeners,
    addClickListeners
}