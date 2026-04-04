/**
 * Jumping Monolith - Lava Class
 * created: 2026
 * updated: 2026
 * author: Carlos E Alford
 * improvements:
 */

import { Vector } from "../utilities/vector.js";
import { State } from "../utilities/state.js";

/**
 * @description Create a lava type actor
 * @param {object} pos - actors current location
 * @param {integer} speed - actors current speed
 */
class Lava {
  constructor(pos, speed, reset) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  get type() { return "lava"; }

  // actor character type required to choose lava
  static create(pos, ch) {
    // Decide which type of lava to build
    if (ch == "=") {
      return new Lava(pos, new Vector(2, 0));
    } else if (ch == "|") {
      return new Lava(pos, new Vector(0, 2));
    } else if (ch == "v") {
      return new Lava(pos, new Vector(0, 3), pos);
    }
  }
}

Lava.prototype.size = new Vector(1, 1);

/**
 * @description Updates the Player state on collide with Lava
 * @param {object} state - current game state
 * @return {object}
 */
Lava.prototype.collide = function(state) {
  return new State(state.level, state.actors, "lost");
};

/**
 * @description Computes a new position for Lava actor
 * @param {integer} time - time step
 * @param {object} state - current game state
 * @return {object}
 */
Lava.prototype.update = function(time, state) {
  // Add the product of the time step and the current speed to its old position
  let newPos = this.pos.plus(this.speed.times(time));
  // The bahaviour depends on the type of lava block
  if (!state.level.touches(newPos, this.size, "wall")) {
    return new Lava(newPos, this.speed, this.reset);
  } else if (this.reset) {
    // Dripping lava resets its position
    return new Lava(this.reset, this.speed, this.reset);
  } else {
    // Bouncing lava inverts its speed
    return new Lava(this.pos, this.speed.times(-1));
  }
};

export { Lava };