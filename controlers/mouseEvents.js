import { stopTimer } from './utilities.js';
import { displayDeathMessage, updateMines, removeClickListeners, displayCounters } from './visualEvents.js'
import { checkVictory, cascading } from './boardEvents.js';

function pickField(event, settingsObj) {

    let target = event.target;

    if (target.localName !== 'a' && target.localName !== 'i') { return }
    if (target.localName === 'i') { target = target.parentElement }

    const currentFieldId = target.id;
    settingsObj.markedMines.splice(settingsObj.markedMines.indexOf(Number(currentFieldId)), 1);
    
    if (settingsObj.field[currentFieldId] === 'X') {
        target.style.backgroundColor = 'red';
        target.innerHTML = `<i class="fas fa-skull-crossbones"></i>`;
        target.style.color = 'black';
        removeClickListeners(settingsObj);
        displayDeathMessage('block');
        stopTimer(settingsObj.timer, '#timer');
        displayCounters('none');
    } else {
        if (settingsObj.field[currentFieldId] !== 0) {
            if (target.children.length) { updateMines('+') }
            target.style.backgroundColor = 'green';
            target.innerHTML = settingsObj.field[currentFieldId];
            target.style.borderStyle = 'inset';
            target.style.color = 'white';
            checkVictory(settingsObj, currentFieldId);
        } else {
            cascading(currentFieldId, settingsObj.field, settingsObj.columns, settingsObj);
        }
    }
}

function markMine(event, settingsObj) {
    event.preventDefault();
    const target = event.target;

    if (target.localName !== 'a') { return }
    if (target.textContent) { return }

    settingsObj.markedMines.push(Number(target.id));
    updateMines('-');
    target.innerHTML = '<i class="fab fa-font-awesome-flag"></i>';
    target.style.backgroundColor = 'yellow';
    target.style.color = 'red';
}

export { pickField, markMine }