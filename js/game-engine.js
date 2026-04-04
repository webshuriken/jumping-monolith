/**
 * Jumping Monolith - Browser game
 * created: 2020
 * updated: 2026
 * author: Carlos E Alford
 * IMPROVEMENTS:
 * - runGame function is returning the value of game status but the function is a Promise so this return is not useful. Remove the return value and resolve promise.
 * - Tests:
 *  - for level MAPS:
 *    - map is construction only using valid characters
 *    - map Enemies and Coin can only move within valid areas, not through wall, unless its an intented features
 */

// Load the module with the game maps
import { GAME_LEVELS } from './main-barrel.js';

// Utilities
import { DOMDisplay } from './utilities/domdisplay.js';
import { State } from './utilities/state.js';
import { Level } from './utilities/level.js';
import { trackKeys } from './utilities/util-functions.js';

// ==========================
// RUNNING THE GAME
// ==========================

/**
 * @description Wrapper function for requestAnimationFrame()
 * @param {object} framFunc - function that expects a time difference
 */
function runAnimation(frameFunc) {
  // Max frame step = 100ms
  let lastTime = null;

  // Draws a single fram
  function frame(time) {
    if (lastTime != null) {
      // convert time step to seconds
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      // on false, animation stops
      if (frameFunc(timeStep) === false) return;
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  // first request to animation frame
  requestAnimationFrame(frame);
}

/**
 * @description Displays the level in document letting user play
 * @param {object} level - current game level
 * @param {object} Display - a constructor
 * @param {object} gameWrapper - DOM element
 * @return {promise}
 */
function runLevel(level, Display, gameWrapper) {
  let display = new Display(gameWrapper, level);
  let state = State.start(level);
  let ending = 1;
  // As suggested in EloquentJS, ther is a 'running' state
  let running = 'yes';

  return new Promise(resolve => {

    // check if game has been paused
    function pauseHandler(event) {
      if (event.key != 'p') return;
      event.preventDefault()
      // swap between running states;
      if (running == 'no') {
        running = 'yes';
        runAnimation(frame);
      } else if (running == 'yes') {
        running = 'pausing';
      } else {
        running = 'yes';
      }
    }

    // Add event handler to listen out for pause
    window.addEventListener('keydown', pauseHandler);
    let arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

    function frame(time) {
      // check game state
      if (running == 'pausing') {
        running = 'no';
        return false;
      }

      // Run the game
      state = state.update(time, arrowKeys);
      display.syncState(state);
      if (state.status == 'playing') {
        return true;
      } else if (ending > 0) {
        // NOTE: when the player touches an enemy this is called many times
        // each time the value is decreased by 0.183000000000000 to 0.16629999999999978
        // IS IT NESCESSARY?
        ending -= time;
        return true;
      } else {
        // Game ends or reloads, clear screen and remove events
        display.clear();
        window.removeEventListener('keydown', pauseHandler);
        arrowKeys.unregister();
        resolve(state.status);
        return false;
      }
    }
    runAnimation(frame);
  });
}

/**
 * @description Change level on completion
 * @param {array} plans - game levels as array of strings
 * @param {object} Display - display constructor
 * @param {object} gameWrapper - DOM element
 */
async function runGame(plans, Display, gameWrapper) {
  // set starting level
  let level = 0;
  let won;

  // Loop will keep going as long as the player has lives left
  for (let lives = 3; lives > 0; lives--) {
    console.log(`You have ${lives} lives left`);
    won = await runLevel(new Level(plans[level]), Display, gameWrapper)

    // Implementing player lives
    if (won == 'won') {
      level++;
      // reset lives if next level is available
      if (level < plans.length) {
        lives = 3;
      } else {
        // catch unnescessary game call if game won but lives are left
        lives = 0;
      }
    }
  }
  return won;
}

/**
 * @description Loads the game
 * @param {object} gameWrapper - DOM element queried from outside module
 */
export function loadGame(gameWrapper) {
  let game = runGame(GAME_LEVELS, DOMDisplay, gameWrapper);
  return game;
}
