/**
 * Jumping Monolith - Game Utilities
 * created: 2026
 * updated: 16-04-2026
 * author: Carlos E Alford
 * utilities available:
 * - Vec: for the 2 dimentional values
 * improvements:
 */
import { 
  type TActorInstances, 
  type ILevel 
} from "./level";
import { type IPlayer } from "../actors/player";

// ==========================
// VARIABLES
// ==========================
// keys we will track for grame play
export const TrackedArrowKeys = ["ArrowLeft", "ArrowRight", "ArrowUp"] as const;
export type TArrowKeys = typeof TrackedArrowKeys[number];
export type TTrackKeys = Partial<Record<TArrowKeys, boolean>> & { unregister: () => void };

// game scale used by drawGird(), drawActor(), DOMDisplay.scrollPlayerIntoView()
const scale = 20;

// ==========================
// FUNCTIONS
// ==========================
type TAttribute = {
  style?: string;
  class?: string;
  [key: string]: string | undefined;
}

/**
 * Draw the game actors attached to <div> element
 * @param {TActorInstances[]} actors - class of actors
 * @return {HTMLDivElement}
 */
function drawActors(actors: TActorInstances[]): HTMLDivElement {
  return elt("div", {}, ...actors.map(actor => {
    let rect = elt("div", {class: `actor ${actor.type}`});

    // Apply actor type unique size
    rect.style.width = `${actor.size.x * scale}px`;
    rect.style.height = `${actor.size.y * scale}px`;

    // Place the actor in the right pos
    rect.style.left = `${actor.pos.x * scale}px`;
    rect.style.top = `${actor.pos.y * scale}px`;

    return rect;
  }));
}

/**
 *  Draw the game map grid as a HTML Table
 * @param {ILevel} level - current game level map
 * @return {HTMLTableElement}
 */
function drawGrid(level: ILevel): HTMLTableElement {
  // Uing the <table> element to build current level background
  return elt("table", {
      class: "background",
      style: `width: ${level.width * scale}px`
    }, ...level.rows.map(row =>
    elt("tr", {style: `height: ${scale}px`},
      ...row.map(type => elt("td", {class: type})))
    )
  );
}

/**
 * Create an element. Currently for div, table, tr, td elements.
 * @param {string} name - element name
 * @param {TAttribute} attrs - attributes for element
 * @param {Node[]} children - child nodes
 * @return {object}
 */
function elt<K extends keyof HTMLElementTagNameMap>(
  name: K, 
  attrs: TAttribute, 
  ...children: Node[]
): HTMLElementTagNameMap[K] {
  let dom = document.createElement(name);

  for (let attr of Object.keys(attrs)) {
    const value = attrs[attr];
    if (value !== undefined) {
      dom.setAttribute(attr, value);
    }
  }

  for (let child of children) {
    dom.appendChild(child);
  }

  return dom;
}

/**
 * Detect overlap between actors and let us know if there is any
 * @param {TActor} actor1 - actor instace
 * @param {TActor} actor2 - player instace
 * @return {boolean}
 */
function overlap(actor1: Exclude<TActorInstances, IPlayer>, actor2: Extract<TActorInstances, IPlayer>): boolean {
  // did the player kill the enemy on collision
  if (actor1.type === 'enemy') {
    // player must land on top of the enemy to kill them
    if ( (actor2.pos.y + actor2.size.y) < actor1.pos.y &&
      (actor1.pos.x + actor1.size.x) > actor2.pos.x &&
      actor1.pos.x < (actor2.pos.x + actor2.size.x) &&
      (actor2.pos.y + actor2.size.y + 0.2) > actor1.pos.y ) {
      // Monster was stepped on. Kill it.
      actor1.alive = false;
      // valid overlap
      return true;
    }
  }
  // check colling with anything
  return (actor1.pos.x + actor1.size.x) > actor2.pos.x &&
  actor1.pos.x < (actor2.pos.x + actor2.size.x) &&
  (actor1.pos.y + actor1.size.y) > actor2.pos.y &&
  actor1.pos.y < (actor2.pos.y + actor2.size.y);
}

/**
 * Only used by Player actor. Track keys pressed. Arrow keys (up, right, left) and 'p' to pause game.
 * @param {typeof TrackedArrowKeys} keys - string array of 3 possible keys
 * @return {TTrackKeys}
 */
function trackKeys(keys: typeof TrackedArrowKeys): TTrackKeys {
  // their effects are active as long as the key is held down
  const activeKeys: TTrackKeys = Object.create(null);

  // Key handler, stores the current state of the key
  function track(event: KeyboardEvent) {
    // decided to cast the TArrowKeys, directly, as only those values are allowed through
    if (keys.includes(event.key as TArrowKeys)) {
      // boolean lets Player know which arrow key is active
      activeKeys[event.key as TArrowKeys] = event.type === "keydown";
      // stop auto page scroll
      event.preventDefault();
    }
  }

  // only need to track keyboard key press and release
  window.addEventListener("keydown", track);
  window.addEventListener("keyup", track);

  // engine will use to prevent memory leaks
  activeKeys.unregister = () => {
    window.removeEventListener('keydown', track);
    window.removeEventListener('keyup', track);
  }
  return activeKeys;
}

export { drawActors, drawGrid, elt, overlap, trackKeys, scale };