/**
 * Jumping Monolith - Browser game
 * created: 2020
 * updated: april - 2026
 * author: Carlos E Alford
 * IMPROVEMENTS:
 */
// load function from game engine to start game
import {loadGame} from './game-engine.js';


// allows modal to be closed by clicking on the dialog backdrop
const howToModal = document.querySelector<HTMLDialogElement>('#howToModal');

// only will work if we are using the correct html element '<dialog></dialog>'
if (howToModal instanceof HTMLDialogElement) {
  howToModal.addEventListener('click', (e) => {
    if (e.target === howToModal) {
      howToModal.close();
    }
  });
}else{
  console.error('The element is not a dialog');
}


/**
 * @description Start game
 * @param {object} gameWrapper - DOM element
 * @param {object} startBtn - DOM element
 */
const startGame = (gameWrapper, startBtn) => {
  // disable start button
  startBtn.setAttribute('disabled', 'disabled');
  loadGame(gameWrapper).then(() => {
    // enable start button
    startBtn.removeAttribute('disabled');
  });
}


/**
 * @description Initialize site settings
 */
const initSettings = () => {
  // Get DOM elements outside Modules
  const startBtn = document.querySelector('#startBtn');
  let gameWrapper = document.querySelector('.game-wrapper');

  // Listener for the start button
  startBtn.addEventListener('click', () => {
    startGame(gameWrapper, startBtn);
  });
}

// make sure all resources have finished loading before running anything
window.addEventListener('load', () => {
  initSettings();
});