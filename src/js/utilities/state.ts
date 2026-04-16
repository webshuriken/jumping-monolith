/**
 * Jumping Monolith - Game Utilities
 * created: 2026
 * updated: 16-04-2026
 * author: Carlos E Alford
 * utility: State, to maintain game state for the 2 dimentional values
 * improvements:
 */

import { 
  overlap,
  type TTrackKeys
} from './util-functions';
import { 
  type TActorInstances, 
  type ILevel 
} from "./level";
import { type IPlayer } from '../actors/player';


export type TGameStatus = 'playing' | 'won' | 'lost';
export interface IState {
  actors: TActorInstances[];
  level: ILevel;
  readonly player: IPlayer;
  status: TGameStatus;
  update(time: number, keys: TTrackKeys): IState;
}

/**
 * Track the state of a running game.
 * @param {ILevel} level - human readable level
 * @param {TActorInstances[]} actors - game actors
 * @param {TGameStatus} status - either lost or won
 */
class State implements IState {
  // This is a persistent data structure.
  constructor(public level: ILevel, public actors: TActorInstances[], public status: TGameStatus) {}

  // Creates a new state and leaves the old one intact.
  static start(level: ILevel) {
    return new State(level, level.startActors, "playing");
  }

  /**
   * @ return {TActor} actor object, eg Player, Coin, Lava, Enemy
   */
  get player(): IPlayer { 
    const player = this.actors.find(a => a.type === "player");
    if (!player) {
      throw new Error('State invariant violated: no player actor in state.');
    }
    return player;
  }

  /**
   * Update a grid element of a given type
   * @param {number} time - element position
   * @param { TTrackKeys} keys - size of element
   * @return {State}
   */
  update(time: number, keys: TTrackKeys): State {
    let actors = this.actors.map(actor => actor.update(time, this, keys));
    let newState = new State(this.level, actors, this.status);

    if (newState.status != "playing") return newState;

    let player = newState.player;
    if (this.level.touches(player.pos, player.size, "lava")) {
      return new State(this.level, actors, "lost");
    }

    // when a player overlaps another actor (lava, enemy, coin) check how they collide
    for (let actor of actors) {
      // a player cannot overlap itself so no need for this check when actor is player
      if (actor.type !== 'player' && overlap(actor, player)) {
          newState = actor.collide(newState);
      }
    }
    return newState;
  }
}

export { State };