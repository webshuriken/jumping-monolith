/**
 * Jumping Monolith - Browser game
 * created: 2020
 * updated: 17-04-2026
 * author: Carlos E Alford
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
 * @param {(time: number) => boolean} drawSingleFrame - function that expects a time difference
 */
function runAnimation(drawSingleFrame: (time: number) => boolean) {
  // Max frame step = 100ms
  let lastTime: number | null = null;

  // Draws a single fram
  function aniFrame(time:  number) {
    if (lastTime != null) {
      // convert time step to seconds
      const timeStep = Math.min(time - lastTime, 100) / 1000;
      // draw next frame or stop/pause animation
      if (drawSingleFrame(timeStep) === false) return;
    }
    lastTime = time;
    // continuous request to animation to draw single frame
    requestAnimationFrame(aniFrame);
  }
  // request to animation frame on new or game reload
  requestAnimationFrame(aniFrame);
}

/**
 * Preps the DOM, game State, game keys, frame update of characters
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
  const display = Display.create(gameWrapper, level);
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
          // call to draw single game frame
          runAnimation(drawSingleFrame);
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

    /**
     * updates actors states and sync display to draw single game frame
     * @param {number} time 
     * @returns boolean
     */
    function drawSingleFrame(time: number) {
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
    runAnimation(drawSingleFrame);
  });
}

/**
 * Change level on completion
 * @param {string[]} plans - game levels as array of strings
 * @param {typeof DOMDisplay} Display - DOM display constructor
 * @param {HTMLDivElement} gameWrapper - HTML div element displaying the game
 * @returns Promise<TGameResult> 
 */
async function runGame(
  plans: string[], 
  Display: typeof DOMDisplay, 
  gameWrapper: HTMLDivElement
): Promise<TGameResult> {
  // set starting level
  let level = 0;
  let won: TGameResult = 'lost';

  // Loop will keep going as long as the player has lives left
  for (let lives = 3; lives > 0; lives--) {

    // prep the level map making sure it is valid
    const plan = plans[level];
    if (plan === undefined) {
      throw new Error("Can not load game. No level provided");
    }

    // game round outcome
    won = await runLevel(new Level(plan), Display, gameWrapper);

    // reset lives, load new level or end game if no further levels available
    if (won == 'won') {
      level++;
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
