/**
 * Jumping Monolith - Player Class
 * created: 2026
 * updated: 05-04-2026
 * author: Carlos E Alford
 * improvements:
 */

import { Vector, type IVector } from "../utilities/vector";
import { type IState, type TTrackKeys } from "../utilities/state";


export interface IPlayer {
  pos: IVector;
  readonly size: IVector;
  readonly type: 'player';
  speed: IVector;
  update(time: number, state: IState, keys: TTrackKeys): Player;
}

// player abilities
const playerXSpeed = 7;
const gravity = 30;
const jumpSpeed = 17;

/**
 * @description Create a player actor
 * @param {IVector} pos - actors current location
 * @param {IVector} speed - actors current speed
 */
class Player implements IPlayer {
  // Size is the same for all instances, add to prototype
  readonly size = new Vector(0.8, 1.5);

  // speed simulates momentum and gravity.
  constructor(public pos: IVector, public speed: IVector) {}

  get type(): 'player' { return "player"; }

  // A player is one-and-a-half squares high, initial position is set to
  // be half a square above the position where the @ character appeared.
  static create(pos: IVector) {
    return new Player(pos.plus(new Vector(0, -0.5)), new Vector(0, 0));
  }

  /**
   * Hanlde player motion inside of map. Motion is handled per axis.
   * @param {number} time - time step
   * @param {IState} state - current game state
   * @param {TTrackKeys} keys - game keys
   * @return {Player}
   */
  update(time: number, state: IState, keys: TTrackKeys): Player {
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
}

export { Player };