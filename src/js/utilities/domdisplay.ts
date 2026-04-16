/**
 * Jumping Monolith - Game Utilities
 * created: 2026
 * updated: 05-04-2026
 * author: Carlos E Alford
 * utility: DOMDisplay, to maintain the browsers DOM
 * improvements:
 */

import { 
  drawActors,
  drawGrid,
  elt,
  scale
} from './util-functions';
import { type ILevel } from './level';
import { type IState } from './state';


interface IDOMDisplay {
  actorLayer: HTMLDivElement | null;
  readonly dom: HTMLDivElement;
  clear(): void;
  syncState(state: IState):  void;
  scrollPlayerIntoView(state: IState): void;
}

/**
 * @description Displays a given level and state.
 * @param {object} parent - element to append game grid to
 * @param {object} level - current level map
 */
class DOMDisplay implements IDOMDisplay {
  readonly dom: HTMLDivElement;
  actorLayer: HTMLDivElement | null;

  constructor(parent: HTMLDivElement, level: ILevel) {
    this.dom = elt("div", {class: "game"}, drawGrid(level));
    parent.appendChild(this.dom);
    this.actorLayer = null;
  }

  clear() { this.dom.remove(); }

  /**
   * Make the display show a given Actor state.
   * @param {IState} state - current game state
   */
  syncState(state: IState): void {
    // remove old actors layer if one exists
    if (this.actorLayer) this.actorLayer.remove();

    // new actors layer
    const layer = drawActors(state.actors);
    this.actorLayer = layer;
    this.dom.appendChild(layer);

    // status added to element class to style game accordingly
    this.dom.className = `game ${state.status}`;

    // make sure player does not go off screen
    this.scrollPlayerIntoView(state);
  };

  /**
   * Keep the player within the center of the screen or there abouts
   * @param {IState} state - current game state
   */
  scrollPlayerIntoView(state: IState): void {
    // We change the scroll position by manipulating that element’s
    // scrollLeft and scrollTop properties when the player is too
    // close to the edge.
    let width = this.dom.clientWidth;
    let height = this.dom.clientHeight;
    let margin = width / 3;

    // The viewport
    let left = this.dom.scrollLeft, right = left + width;
    let top = this.dom.scrollTop, bottom = top + height;

    let player = state.player;
    let center = player.pos.plus(player.size.times(0.5)).times(scale);

    if (center.x < left + margin) {
      this.dom.scrollLeft = center.x - margin;
    } else if (center.x > right - margin) {
      this.dom.scrollLeft = center.x + margin - width;
    }

    if (center.y < top + margin) {
      this.dom.scrollTop = center.y - margin;
    } else if (center.y > bottom - margin) {
      this.dom.scrollTop = center.y + margin - height;
    }
  };
}

export { DOMDisplay };