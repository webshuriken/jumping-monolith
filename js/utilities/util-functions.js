/**
 * Jumping Monolith - Game Utilities
 * created: 2026
 * updated: 2026
 * author: Carlos E Alford
 * utilities available:
 * - Vec: for the 2 dimentional values
 * improvements:
 */

// ==========================
// VARIABLES
// ==========================
// game scale
// used by drawGird(), drawActor(), DOMDisplay.scrollPlayerIntoView()
const scale = 20;

// ==========================
// FUNCTIONS
// ==========================

/**
 * @description Draw the game actors attached to <div> element
 * @param {object} actors - class of actors
 * @return {object}
 */
function drawActors(actors) {
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
 * @description Draw the game map grid
 * @param {object} level - current game level map
 * @return {object}
 */
function drawGrid(level) {
  // Uing the <table> element to build current level background
  return elt("table", {
      class: "background",
      style: `width: ${level.width * scale}px`
    }, ...level.rows.map(row =>
    elt("tr", {style: `height: ${scale}px`},
      ...row.map(type => elt("td", {class: type})))
  ));
}

/**
 * @description Create an element
 * @param {string} name - element name
 * @param {object} attrs - attributes for element
 * @param {object} children - child nodes
 * @return {object}
 */
function elt(name, attrs, ...children) {
  let dom = document.createElement(name);

  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }

  for (let child of children) {
    dom.appendChild(child);
  }

  return dom;
}

/**
 * @description Detect overlap between actors
 * @param {object} actor1 - actor instace
 * @param {object} actor2 - player instace
 * @return {boolean}
 */
function overlap(actor1, actor2) {
  // TDO: CHECK MOSTER LOCATION AND PLAYER LOCATION
  // check collision with enemies killing player if ocurred
  if (actor1.type == 'enemy') {
    if ( (actor2.pos.y + actor2.size.y) < actor1.pos.y &&
      (actor1.pos.x + actor1.size.x) > actor2.pos.x &&
      actor1.pos.x < (actor2.pos.x + actor2.size.x) &&
      (actor2.pos.y + actor2.size.y + 0.2) > actor1.pos.y ) {
      // Monster was stepped on.
      actor1.alive = false;
      // valid overlap, return true
      return true;
    }
  }
  // check colling with anything but enemies
  return (actor1.pos.x + actor1.size.x) > actor2.pos.x &&
    actor1.pos.x < (actor2.pos.x + actor2.size.x) &&
    (actor1.pos.y + actor1.size.y) > actor2.pos.y &&
    actor1.pos.y < (actor2.pos.y + actor2.size.y);
}

/**
 * @description Track keys pressed
 * @param {array} keys - string of 3 possible keys
 * @return {object}
 */
function trackKeys(keys) {
  // their effects are active as long as the key is held down
  let down = Object.create(null);

  // Key handler, stores the current state of the key
  function track(event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type == "keydown";
      // stop auto page scroll
      event.preventDefault();
    }
  }
  window.addEventListener("keydown", track);
  window.addEventListener("keyup", track);

  // Unregister handlers and methods
  down.unregister = () => {
    window.removeEventListener('keydown', track);
    window.removeEventListener('keyup', track);
  }
  return down;
}

export { drawActors, drawGrid, elt, overlap, trackKeys, scale };