import { generateBoard } from './boardEvents.js';
import { startTimer, stopTimer } from './utilities.js';
import { displayCounters, displayIntroMessage, displayDeathMessage, displayGameButtons, addClickListeners, removeClickListeners } from './visualEvents.js';
import { pickField, markMine } from './mouseEvents.js'

function startNewGame(event, settingsObj) {
    if (event.target.localName !== 'li' && event.target.localName !== 'button') { return }
    if (!settingsObj.difficulty) {
        settingsObj.difficulty = event.target.textContent;
    } else {
        if (confirm('The current progress will be reset. Are you sure you want to start a new game?')) {
        } else { return }
    }

    const generatedField = generateBoard(settingsObj.difficulty);
    removeClickListeners(settingsObj);
    addClickListeners(pickFieldEvent, markMineEvent, settingsObj);
    const fieldHTML = document.getElementsByClassName('field')[0];
    Object.assign(settingsObj, generatedField);
    fieldHTML.innerHTML = '';
    fieldHTML.style.width = `${generatedField.columns * 39}px`;
    stopTimer(settingsObj.timer, '#timer');
    displayIntroMessage("none");
    displayDeathMessage("none");

    for (let i = 0; i < generatedField.field.length; i++) {
        const currentCell = document.createElement('a');
        currentCell.id = i;
        fieldHTML.appendChild(currentCell);
    }

    document.getElementsByClassName('settings')[0].style.display = 'none';
    document.getElementById('mines').textContent = Number(settingsObj.mines);
    startTimer(settingsObj.timer, '#timer');
    displayGameButtons('inline');
    displayCounters('flex');

    function pickFieldEvent(event) { pickField(event, settingsObj) };
    function markMineEvent(event) { markMine(event, settingsObj) };
}

function changeDifficulty(event, settingsObj) {
    settingsObj.difficulty = undefined;
    document.getElementsByClassName('settings')[0].style.display = 'flex';
    document.getElementsByClassName('field')[0].innerHTML = '';
    displayGameButtons('none');
    displayDeathMessage('none');
    stopTimer(settingsObj.timer, '#timer');
    displayCounters('none');
}

export { startNewGame, changeDifficulty };