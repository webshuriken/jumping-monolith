/**
 * Jumping Monolith - Game Utilities
 * created: 2026
 * updated: 2026
 * author: Carlos E Alford
 * utility: State, to maintain game state for the 2 dimentional values
 * improvements:
 */

import { overlap } from './util-functions.js'

/**
 * @description Track the state of a running game.
 * @param {array} level - human readable level
 * @param {object} plan - game actors
 * @param {string} status - either lost or won
 */
class State {
  // This is a persistent data structure.
  constructor(level, actors, status) {
    this.level = level;
    this.actors = actors;
    // will change when the game has ended
    this.status = status;
  }

  // Creates a new state and leaves the old one intact.
  static start(level) {
    return new State(level, level.startActors, "playing");
  }

  // Return a player
  get player() {
    return this.actors.find(a => a.type == "player");
  }
}

/**
 * @description Update a grid element of a given type
 * @param {integer} time - element position
 * @param {integer} keys - size of element
 * @return {object}
 */
State.prototype.update = function(time, keys) {
  let actors = this.actors.map(actor => actor.update(time, this, keys));
  let newState = new State(this.level, actors, this.status);

  if (newState.status != "playing") return newState;

  let player = newState.player;
  if (this.level.touches(player.pos, player.size, "lava")) {
    return new State(this.level, actors, "lost");
  }

  for (let actor of actors) {
    if (actor != player && overlap(actor, player)) {
      newState = actor.collide(newState);
    }
  }
  return newState;
}

export { State };