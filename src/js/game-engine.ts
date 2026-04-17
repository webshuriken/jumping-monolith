/**
 * Jumping Monolith - Browser game
 * created: 2020
 * updated: 16-04-2026
 * author: Carlos E Alford
 * IMPROVEMENTS:
 * - runGame function is returning the value of game status but the function is a Promise so this return is not useful. Remove the return value and resolve promise.
 * - Tests:
 *  - for level MAPS:
 *    - map is construction only using valid characters
 *    - map Enemies and Coin can only move within valid areas, not through wall, unless its an intented features
 */

// Load the module with the game maps
import { GAME_LEVELS } from './main-barrel';

// Utilities
import { DOMDisplay } from './utilities/domdisplay';
import { State } from './utilities/state';
import { 
  trackKeys, 
  TrackedArrowKeys,
} from './utilities/util-functions';
import { 
  Level, 
  type ILevel 
} from './utilities/level';

// Types
type TGameResult = 'won' | 'lost';
type TGameRunning = 'yes' | 'no' | 'pausing';

// ==========================
// RUNNING THE GAME
// ==========================

/**
 * Wrapper function for requestAnimationFrame()
 * @param {object} frameFunc - function that expects a time difference
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
 * Displays the level in document letting user play
 * @param {ILevel} level - instance of Level class
 * @param {typeof DOMDisplay} Display - DOMDisplay constructor
 * @param {HTMLDivElement} gameWrapper - div used to display the game
 * @return {promise}
 */
function runLevel(
  level: ILevel, 
  Display: typeof DOMDisplay, 
  gameWrapper: HTMLDivElement
): Promise<TGameResult> {
  // lets get the DOM for the level ready
  const display = new Display(gameWrapper, level);
  // create a new state with current level, whatever level it may be
  let state = State.start(level);
  let ending = 1;
  // As suggested in EloquentJS, ther is a 'running' state
  let running: TGameRunning = 'yes';

  return new Promise(resolve => {

    // check if game has been paused
    function pauseHandler(event: KeyboardEvent) {
      // ignore all keypress other than "p"
      if (event.key.toLowerCase() !== 'p') return;
      event.preventDefault()

      // swap between running states
      switch (running) {
        case "no":
          running = 'yes';
          runAnimation(frame);
          break;
        case "yes":
          running = "pausing";
          break;
      }
    }

    // Add event handler to listen for game pause
    window.addEventListener('keydown', pauseHandler);

    // name for the keys we will track during the game
    const arrowKeys = trackKeys(TrackedArrowKeys);

    // frame only gets called while the game is active
    function frame(time: number) {
      // is the player trying to pause the game
      if (running === 'pausing') {
        console.log('OA')
        running = 'no';
        return false;
      }

      // udpate what all the actors are doing
      state = state.update(time, arrowKeys);

      // show what all the actors are doing
      display.syncState(state);

      // is the game running or did the player die
      if (state.status == 'playing') {
        return true;
      }

      // player finished level or died, either way lets wrap up
      if (ending > 0) {
        // FUTURE USE: add animation for player death or even better win
        ending -= time;
        return true;
      } else {
        //Game ends or reloads, clear screen and remove events
        display.clear();
        window.removeEventListener('keydown', pauseHandler);
        arrowKeys.unregister();
        resolve(state.status);
        return false;
      }
    }
    // call to draw single game frame
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
 * Loads the game. To be used by a main script.
 * @param {HTMLDivElement} gameWrapper - DOM element queried from outside module
 */
export function loadGame(gameWrapper: HTMLDivElement) {
  let game = runGame(GAME_LEVELS, DOMDisplay, gameWrapper);
  return game;
}
