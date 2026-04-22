/**
 * Jumping Monolith - Game Utilities
 * created: 2026
 * updated: 05-04-2026
 * author: Carlos E Alford
 * utility: DOMDisplay, to maintain the browsers DOM
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
 * @description Displays a given level and state. Initialise using the 'create' method.
 * @param {object} parent - element to append game grid to
 * @param {object} level - current level map
 */
class DOMDisplay implements IDOMDisplay {
  readonly dom: HTMLDivElement;
  actorLayer: HTMLDivElement | null;
  private domWidth: number = 0;
  private domHeight: number = 0;

  constructor(parent: HTMLDivElement, level: ILevel) {
    this.dom = elt("div", {class: "game"}, drawGrid(level));
    parent.appendChild(this.dom);
    this.actorLayer = null;
    this.updateDimensions();
  }

  /**
   * Remove the html element from DOM and event listener
   */
  clear() {
    window.removeEventListener('resize', this.updateDimensions);
    this.dom.remove();
  }

  static create(parentElem: HTMLDivElement, level: ILevel) {
    const display = new DOMDisplay(parentElem, level);
    // 
    window.addEventListener('resize', () => {
      // calling method inside anonymous function to maintain the value of 'this' for 'display'
      display.updateDimensions();
    });
    return display;
  }

  /**
   * Update the dimensions of the div containing the game
   */
  updateDimensions() {
    this.domWidth = this.dom.clientWidth;
    this.domHeight = this.dom.clientHeight;
  }

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
    let margin = this.domWidth / 3;

    // The viewport
    let left = this.dom.scrollLeft;
    let right = left + this.domWidth;
    let top = this.dom.scrollTop;
    let bottom = top + this.domHeight;

    let player = state.player;
    // calculates the position of the center of the players rectangle
    let center = player.pos.plus(player.size.times(0.5)).times(scale);

    if (center.x < left + margin) {
      this.dom.scrollLeft = center.x - margin;
    } else if (center.x > right - margin) {
      this.dom.scrollLeft = center.x + margin - this.domWidth;
    }
    
    if (center.y < top + margin) {
      this.dom.scrollTop = center.y - margin;
    } else if (center.y > bottom - margin) {
      this.dom.scrollTop = center.y + margin - this.domHeight;
    }
  };
}

export { DOMDisplay };