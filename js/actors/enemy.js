/**
 * Jumping Monolith - Enemy Class
 * created: 2026
 * updated: 2026
 * author: Carlos E Alford
 * improvements:
 */

import { Vector } from "../utilities/vector.js";
import { State } from "../utilities/state.js";

/**
 * @description Create a enemy actor
 * @param {object} pos - actors current location
 * @param {object} basePos - base position
 * @param {object} wobble - the wobble
 */
class Enemy {
  constructor(pos, speed, reset) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
    this.alive = true;
  }

  // return player type
  get type() { return "enemy"}

  static create(pos) {
    // enemy larger than standard square so update its starting position
    return new Enemy(pos.plus(new Vector(0, -0.4)), new Vector(2, 0));
  }
}

// enemy same size as player
Enemy.prototype.size = new Vector(1.2, 1.4);

/**
 * @description Updates the Player state on Enemy collision
 * @param {object} state - current game state
 * @return {object}
 */
Enemy.prototype.collide = function(state) {
  let status = state.status;
  let actors = state.actors;
  // remove monster actor or round lost
  if (this.alive) {
    status = 'lost';
  } else {
    actors = state.actors.filter(a => a != this);
  }
  return new State(state.level, actors, status);
}

/**
 * @description Computes a new position for Enemy actor
 * @param {integer} time - time step
 * @param {object} state - current game state
 * @return {object}
 */
Enemy.prototype.update = function(time, state) {
  let newPos = this.pos.plus(this.speed.times(time));
  // Check for wall collisions
  if (!state.level.touches(newPos, this.size, 'wall')) {
    return new Enemy(newPos, this.speed);
  } else {
    return new Enemy(newPos, this.speed.times(-1));
  }
}

export { Enemy };