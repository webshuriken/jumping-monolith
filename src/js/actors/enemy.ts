/**
 * Jumping Monolith - Enemy Class
 * created: 2026
 * updated: 05-04-2026
 * author: Carlos E Alford
 */

import { Vector, type IVector } from "../utilities/vector";
import { State, type IState } from "../utilities/state";


export interface IEnemy {
  alive: boolean;
  collide(state: IState): State;
  pos: IVector;
  readonly type: 'enemy';
  reset?: IVector;
  speed: IVector;
  update(time: number, state: IState): Enemy;
}

/**
 * @description Create a enemy actor
 * @param {IVector} pos - actors current location
 * @param {IVector} basePos - base position
 * @param {number} reset - the wobble
 */
class Enemy implements IEnemy {
  // enemy same size as player
  readonly size = new Vector(1.2, 1.4);
  reset?: IVector;
  alive: boolean;

  constructor(public pos: IVector, public speed: IVector, reset?: IVector) {
    if (reset) {
      this.reset = reset;
    }
    this.alive = true;
  }

  // return player type
  get type(): 'enemy' { return "enemy"}

  static create(pos: IVector): Enemy {
    // enemy larger than standard square so update its starting position
    return new Enemy(pos.plus(new Vector(0, -0.4)), new Vector(2, 0));
  }

  /**
   * Updates the Player state on Enemy collision
   * @param {IState} state - current game state
   * @return {State}
   */
  collide(state: IState): State {
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
   * Computes a new position for Enemy actor
   * @param {number} time - time step
   * @param {IState} state - current game state
   * @return {Enemy}
   */
  update(time: number, state: IState): Enemy {
    let newPos = this.pos.plus(this.speed.times(time));
    // Check for wall collisions
    if (!state.level.touches(newPos, this.size, 'wall')) {
      return new Enemy(newPos, this.speed);
    } else {
      return new Enemy(newPos, this.speed.times(-1));
    }
  }
}

export { Enemy };