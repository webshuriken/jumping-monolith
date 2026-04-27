/**
 * Jumping Monolith - Lava Class
 * created: 2026
 * updated: 24-04-2026
 * author: Carlos E Alford
 */

import { Vector, type IVector } from "../utilities/vector";
import { State, type IState } from "../utilities/state";
import { type TLavaChars } from '../utilities/util-functions';


export interface ILava {
  collide(state: IState): IState;
  pos: IVector;
  readonly type: 'lava';
  reset?: IVector;
  size: IVector;
  speed: IVector;
  update(time: number, state: IState): Lava;
}

/**
 * Create a lava type actor
 * @param {IVector} pos actors current location
 * @param {IVector} speed actors current speed
 * @param {IVector} reset?
 */
class Lava implements ILava {
  // all lava is same size
  readonly size = new Vector(1, 1);
  reset?: IVector;

  constructor(public pos: IVector, public speed: IVector, reset?: IVector) {
    if (reset) {
      this.reset = reset;
    }
  }

  get type(): 'lava' { return "lava"; }

  // actor character type required to choose lava
  static create(pos: IVector, ch: TLavaChars): Lava {
    // Decide which type of lava to build
    switch (ch) {
      case "=":
        return new Lava(pos, new Vector(2, 0));
      case "|":
        return new Lava(pos, new Vector(0, 2));
      case "v":
        return new Lava(pos, new Vector(0, 3), pos);
    }
  }

  /**
   * Updates the Player state on collide with Lava
   * @param {IState} state - current game state
   * @return {IState}
   */
  collide(state: IState): State {
    return new State(state.level, state.actors, "lost");
  }

  /**
   * Computes a new position for Lava actor
   * @param {number} time - time step
   * @param {IState} state - current game state
   * @return {Lava}
   */
  update(time: number, state: IState): Lava {
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
}

export { Lava };