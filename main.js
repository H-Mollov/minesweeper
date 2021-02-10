import { startNewGame, changeDifficulty } from './controlers/gameEvents.js'

(function () {
    document.getElementById('new-game-btn').addEventListener('click', startNewGameEvent);
    document.getElementById('difficulty-btn').addEventListener('click', changeDifficultyEvent)
    document.getElementsByClassName('settings')[0].addEventListener('click', startNewGameEvent);

    const _settings = { timer: { seconds: 1 } };

    function startNewGameEvent(event) { startNewGame(event, _settings) };
    function changeDifficultyEvent(event) { changeDifficulty(event, _settings) };
})();