/**
 * Jumping Monolith - Coin Class
 * created: 2026
 * updated: 05-04-2026
 * author: Carlos E Alford
 * improvements:
 */

import { Vector, type IVector } from "../utilities/vector";
import { State, type IState } from "../utilities/state";

interface ICoin {
  basePos:IVector;
  collide(state: IState): IState;
  pos: IVector;
  readonly size: IVector;
  readonly type: 'coin';
  update(time: number): Coin;
  wobble: number;
}

// how fast the coins move and how far
const wobbleSpeed = 8;
const wobbleDist = 0.07;

/**
 * Create a coin actor
 * @param {IVector} pos - actors current location
 * @param {IVector} basePos - base position
 * @param {number} wobble - the wobble
 */
class Coin implements ICoin {
  // all coins are the same size
  readonly size: IVector = new Vector(0.6, 0.6);
 
  // are given a “wobble”, a slight vertical back-and-forth motion.
  // basePos and wobble determine the coins current pos
  constructor(public pos: IVector, public basePos: IVector, public wobble: number) {}

  get type(): 'coin' { return "coin"; }

  static create(pos: IVector): Coin {
    let basePos = pos.plus(new Vector(0.2, 0.1));
    // starting pos is randomised to avoid all coins moving in sync
    return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
  }

  /**
 * Updates the Player state on collide with Coin
 * @param {IState} state - current game state
 * @return {State}
 */
  collide(state: IState): State {
    // remove the collected coin if any
    let filtered = state.actors.filter(a => a != this);
    let status = state.status;
    // check for leftover coins
    if (!filtered.some(a => a.type == "coin")) status = "won";
    return new State(state.level, filtered, status);
  };

  /**
   * Create the coins wobble
   * @param {number} time - time step
   * @return {Coin}
   */
  update(time: number): Coin {
    // Coins use their update method to wobble. They ignore collisions with the
    // grid since they are simply wobbling around inside of their own square.

    // property used to track time and used as argument to Math.sin
    let wobble = this.wobble + time * wobbleSpeed;
    // coins new position computed from its base pos and an offset based on this wave
    let wobblePos = Math.sin(wobble) * wobbleDist;
    return new Coin(this.basePos.plus(new Vector(0, wobblePos)), this.basePos, wobble);
  };
}

export { Coin };