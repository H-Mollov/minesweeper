import { getRandomNumber, stopTimer } from './utilities.js';
import { updateMines, removeClickListeners, displayCounters } from './visualEvents.js';

function generateBoard(mode) {
    const currentSettings = {
        mode: mode,
        field: [],
        markedMines: [],
        checkedFields: { total: 0 },
    }

    switch (mode) {
        case 'Easy':
            currentSettings.field.length = 81;
            currentSettings.mines = 10;
            currentSettings.columns = 9;
            break;
        case 'Medium':
            currentSettings.field.length = 256;
            currentSettings.mines = 40;
            currentSettings.columns = 16;
            break;
        case 'Hard':
            currentSettings.field.length = 480;
            currentSettings.mines = 100;
            currentSettings.columns = 30;
            break;
    }

    currentSettings.field.fill(0);

    for (let i = 0; i < currentSettings.mines; i++) {
        let randomNumber = getRandomNumber(0, currentSettings.field.length);
        if (currentSettings.field[randomNumber] !== 'X') {
            currentSettings.field[randomNumber] = 'X';
            increaseDanger(randomNumber, currentSettings.field, currentSettings.columns);
        } else {
            i--;
        }
    }

    return currentSettings;

    function increaseDanger(pos, array, leap) {
        if ((pos + 1) % leap === 0) {
            checkForBomb(array, [pos - leap - 1, pos - leap, pos - 1, pos + leap - 1, pos + leap]);
        } else if (pos % leap === 0) {
            checkForBomb(array, [pos - leap, pos - leap + 1, pos + 1, pos + leap, pos + leap + 1]);
        } else {
            checkForBomb(array, [pos - leap - 1, pos - leap, pos - leap + 1, pos - 1, pos + 1, pos + leap - 1, pos + leap, pos + leap + 1]);
        }
    }

    function checkForBomb(array, positionsArray) {
        for (let field of positionsArray) {
            if (array[field] === 'X') {
            } else if (array[field] !== undefined) {
                array[field]++;
            }
        }
    }
}

function cascading(position, array, leap, victoryCondition) {
    const field = document.getElementsByTagName('a');
    const checked = {};
    const line = [Number(position)];

    while (line.length !== 0) {
        const pos = line.shift();
        checked[pos] = true;
        checkForEmptySpace(array, [pos]);

        if ((pos + 1) % leap === 0) {
            checkForEmptySpace(array, [pos - leap - 1, pos - leap, pos - 1, pos + leap - 1, pos + leap]);
        } else if (pos % leap === 0) {
            checkForEmptySpace(array, [pos - leap, pos - leap + 1, pos + 1, pos + leap, pos + leap + 1]);
        } else {
            checkForEmptySpace(array, [pos - leap - 1, pos - leap, pos - leap + 1, pos - 1, pos + 1, pos + leap - 1, pos + leap, pos + leap + 1]);
        }
    }

    function checkForEmptySpace(array, positionArray) {
        for (let i = 0; i < positionArray.length; i++) {
            const position = positionArray[i];
            if (array[position] === 0) {
                if (!checked.hasOwnProperty(position)) { line.push(position) };
                if (field[position].children.length) { updateMines('+') };
                field[position].style.backgroundColor = 'white';
                field[position].style.border = '2px dotted #a2b1b8';
                field[position].innerHTML = '';
                checkVictory(victoryCondition, position);
            } else if (array[position] !== undefined) {
                field[position].style.backgroundColor = 'green';
                field[position].textContent = array[position];
                field[position].style.borderStyle = 'inset';
                field[position].style.color = 'white';
                checkVictory(victoryCondition, position);
            }
        }
    }
}

function checkVictory(counterObj, position) {
    if (!counterObj.checkedFields.hasOwnProperty(position)) {
        counterObj.checkedFields[position] = true;
        counterObj.checkedFields.total++;
    }
    if (counterObj.checkedFields.total === counterObj.field.length - counterObj.mines) {
        removeClickListeners(counterObj);
        stopTimer(counterObj.timer, '#timer');
        displayCounters('none');
        document.querySelector('.intro').children[3].style.display = 'block';
        Array.from(document.getElementsByTagName('a')).forEach(el => {
            el.style.backgroundColor = 'yellowgreen';
            el.innerHTML = '<i class="far fa-laugh-beam"></i>';
            el.style.color = 'white';
            el.style.border = '2px solid';
        })
    }
}
export {
    checkVictory,
    generateBoard,
    cascading
}