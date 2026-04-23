/**
 * Jumping Monolith - Game Utilities
 * created: 2026
 * updated: 23-04-2026
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
  private domMargin: number = 0;

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
    this.domMargin = this.domWidth / 3;
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
   * Manipulate the div elements scroll position to keep the player centered
   * @param {IState} state - current game state
   */
  scrollPlayerIntoView(state: IState): void {
    const left = this.dom.scrollLeft;
    const right = left + this.domWidth;
    const top = this.dom.scrollTop;
    const bottom = top + this.domHeight;
    
    const player = state.player;
    // calculates the position of the center of the players rectangle
    const center = player.pos.plus(player.size.times(0.5)).times(scale);
    
    // x-axis movements
    // the second check is the boundary so we stop updating the scroll when we have reach the left limit
    if (center.x < left + this.domMargin && left > 0) {
      // the extra minus 1 is so the boundary moves infront of the player not behind or leveled with it
      this.dom.scrollLeft = center.x - 1 - this.domMargin;
    } else if (center.x > right - this.domMargin && right < this.dom.scrollWidth) {
      // plus 1 is to keep the right boundary infront of player avoid repeated calls to scroll
      this.dom.scrollLeft = (center.x + this.domMargin) + 1 - this.domWidth;
    }
    
    // y-axis movements
    // the and checks are for the boundaries of the scroll so we dont update when we reach the limit
    if (center.y < top + this.domMargin && top > 0) {
      this.dom.scrollTop = center.y - this.domMargin;
    } else if (center.y > bottom - this.domMargin && bottom < this.dom.scrollHeight) {
      this.dom.scrollTop = center.y + this.domMargin - this.domHeight;
    }
  };
}

export { DOMDisplay };