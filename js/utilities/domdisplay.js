/**
 * Jumping Monolith - Game Utilities
 * created: 2026
 * updated: 2026
 * author: Carlos E Alford
 * utility: DOMDisplay, to maintain the browsers DOM
 * improvements:
 */

import { 
  drawActors,
  drawGrid,
  elt,
  scale
 } from './util-functions.js';

/**
 * @description Displays a given level and state.
 * @param {object} parent - element to append game grid to
 * @param {object} level - current level map
 */
class DOMDisplay {
  constructor(parent, level) {
    this.dom = elt("div", {class: "game"}, drawGrid(level));
    this.actorLayer = null;
    parent.appendChild(this.dom);
  }

  clear() { this.dom.remove(); }
}

/**
 * @description Make the display show a given Actor state.
 * @param {string} state - current game state
 */
DOMDisplay.prototype.syncState = function(state) {
  // remove old actors layer if one exists
  if (this.actorLayer) this.actorLayer.remove();
  // Update the actors
  this.actorLayer = drawActors(state.actors);
  this.dom.appendChild(this.actorLayer);
  this.dom.className = `game ${state.status}`;
  this.scrollPlayerIntoView(state);
};

/**
 * @description find the player’s position and update the wrapping element’s scroll position.
 * @param {object} state - current game state
 */
DOMDisplay.prototype.scrollPlayerIntoView = function(state) {
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

export { DOMDisplay };