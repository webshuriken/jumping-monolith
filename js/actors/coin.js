/**
 * Jumping Monolith - Coin Class
 * created: 2026
 * updated: 2026
 * author: Carlos E Alford
 * improvements:
 */

import { Vector } from "../utilities/vector.js";
import { State } from "../utilities/state.js";

// how fast the coins move and how far
const wobbleSpeed = 8;
const wobbleDist = 0.07;

/**
 * @description Create a coin actor
 * @param {object} pos - actors current location
 * @param {object} basePos - base position
 * @param {object} wobble - the wobble
 */
class Coin {
  // are given a “wobble”, a slight vertical back-and-forth motion.
  // basePos and wobble determine the coins current pos
  constructor(pos, basePos, wobble) {
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
  }

  get type() { return "coin"; }

  static create(pos) {
    let basePos = pos.plus(new Vector(0.2, 0.1));
    // starting pos is randomised to avoid all coins moving in sync
    return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
  }
}

// All coins are same size so place in prototype
Coin.prototype.size = new Vector(0.6, 0.6);

/**
 * @description Updates the Player state on collide with Coin
 * @param {object} state - current game state
 * @return {object}
 */
Coin.prototype.collide = function(state) {
  // remove the collected coin if any
  let filtered = state.actors.filter(a => a != this);
  let status = state.status;
  // check for leftover coins
  if (!filtered.some(a => a.type == "coin")) status = "won";
  return new State(state.level, filtered, status);
};

// Coins use their update method to wobble. They ignore collisions with the
// grid since they are simply wobbling around inside of their own square.
/**
 * @description Create the coins wobble
 * @param {integer} time - time step
 * @return {object}
 */
Coin.prototype.update = function(time) {
  // method ignores collisions with the grid since they are simply
  // wobbling around in their own square.

  // property used to track time and used as argument to Math.sin
  let wobble = this.wobble + time * wobbleSpeed;
  // coins new position computed from its base pos and an offset based on this wave
  let wobblePos = Math.sin(wobble) * wobbleDist;
  return new Coin(this.basePos.plus(new Vector(0, wobblePos)), this.basePos, wobble);
};

export { Coin };