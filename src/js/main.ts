/**
 * Jumping Monolith - Browser game
 * created: 2020
 * updated: 05-04-2026
 * author: Carlos E Alford
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
 * Lauches the game when the start button is pressed
 * @param {HTMLDivElement} gameWrapper - html div element
 * @param {HTMLButtonElement} startButton - html button element
 */
function startGame(gameWrapper: HTMLDivElement, startButton: HTMLButtonElement) {
  // disable start button to avoid multiple presses
  startButton.setAttribute('disabled', 'disabled');
  startButton.classList.toggle('active');

  // call a promise that will re-enable the play button when resolved (game finished)
  loadGame(gameWrapper).then(() => {
    // enable start button
    startButton.removeAttribute('disabled');
    startButton.classList.toggle('active');
  });
}

/**
 * Initialize site settings
 */
function initSettings() {
  // lets grab the Play game button and the div that will host the game
  const startButton = document.querySelector<HTMLButtonElement>('#startBtn');
  const gameWrapper = document.querySelector<HTMLDivElement>('#gameWrapper');

  // only load the game setting if HTML is ready for it
  if (startButton && gameWrapper) {
    startButton.addEventListener('click', (e) => {
      startGame(gameWrapper, startButton);
    });
  }
}

// make sure all resources have finished loading before running anything
window.addEventListener('load', () => {
  initSettings();
});