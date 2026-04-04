/**
 * Jumping Monolith - Player Class
 * created: 2026
 * updated: 2026
 * author: Carlos E Alford
 * improvements:
 */

import { Vector } from "../utilities/vector.js";

// player abilities
const playerXSpeed = 7;
const gravity = 30;
const jumpSpeed = 17;

/**
 * @description Create a player actor
 * @param {object} pos - actors current location
 * @param {integer} speed - actors current speed
 */
class Player {
  constructor(pos, speed) {
    this.pos = pos;
    // Stores current speed to simulate momentum and gravity.
    this.speed = speed;
  }

  get type() { return "player"; }

  // A player is one-and-a-half squares high, initial position is set to
  // be half a square above the position where the @ character appeared.
  static create(pos) {
    return new Player(pos.plus(new Vector(0, -0.5)), new Vector(0, 0));
  }
}

// Size is the same for all instances, add to prototype
Player.prototype.size = new Vector(0.8, 1.5);

/**
 * @description Hanlde player motion inside of map
 * @param {integer} time - time step
 * @param {object} state - current game state
 * @param {object} keys - game keys
 * @return {object}
 */
Player.prototype.update = function(time, state, keys) {
  // Player motion is handled per axis.

  // Calculate left and right movement
  let xSpeed = 0;
  if (keys.ArrowLeft) xSpeed -= playerXSpeed;
  if (keys.ArrowRight) xSpeed += playerXSpeed;

  // With no wall blocking new position is used
  let pos = this.pos;
  let movedX = pos.plus(new Vector(xSpeed * time, 0));
  if (!state.level.touches(movedX, this.size, "wall")) {
    pos = movedX;
  }

  // Calculate up and down movement, using gravity and jumping.

  // ySPeed accelerated to account for gravity
  let ySpeed = this.speed.y + time * gravity;
  let movedY = pos.plus(new Vector(0, ySpeed * time));

  // Check for walls before making a move, out a possible two:
  // 1. arrow key up pressed and moving down, speed is changed to jump again.
  // 2. player simply bumped into something and speed is set to zero.
  if (!state.level.touches(movedY, this.size, "wall")) {
    pos = movedY;
  } else if (keys.ArrowUp && ySpeed > 0) {
    ySpeed = -jumpSpeed;
  } else {
    ySpeed = 0;
  }
  return new Player(pos, new Vector(xSpeed, ySpeed));
};

export { Player };