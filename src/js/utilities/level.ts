/**
 * Jumping Monolith - Game Utilities
 * created: 2026
 * updated: 2026
 * author: Carlos E Alford
 * utility: Level, tracks the game level
 * improvements:
 */

import { Player } from "../actors/player.js";
import { Enemy } from "../actors/enemy.js";
import { Coin } from "../actors/coin.js";
import { Lava } from "../actors/lava.js";
import { Vector } from "./vector.js";

// maps background elements to strings and actor characters to classes.
const levelChars = {
  ".": "empty",
  "#": "wall",
  "+": "lava",
  "@": Player,
  "o": Coin,
  "=": Lava,
  "|": Lava,
  "v": Lava,
  "*": Enemy
};

/**
 * @description Stores a level object
 * @param {string} plan - human readable level
 */

class Level {
  // To interpret the characters in the plan, the Level
  // constructor uses the levelChars object.
  constructor(plan) {
    // Game map as array of arrays of string
    let rows = plan.trim().split("\n").map(l => [...l]);

    // use array to get the maps height and width
    this.height = rows.length;
    this.width = rows[0].length;

    // Array of actor objects
    this.startActors = [];

    // Map background as Array of arrays of strings
    // With field types: "empty", "wall" or "lava"
    this.rows = rows.map((row, y) => {
      // Map through each item, row by row
      return row.map((ch, x) => {

        // map current character to background(string) or actor(object)
        let type = levelChars[ch];
        // return the background
        if (typeof type === "string") return type;

        // create actor object and add to list
        this.startActors.push(type.create(new Vector(x, y), ch));
        // space taken by actors is also empty so return this
        return "empty";
      });
    });
  }
}

/**
 * @description Is rectangle touching a grid element of a given type
 * @param {object} pos - player element position
 * @param {integer} size - player element size
 * @param {string} type - type of element, eg lava
 * @return {boolean}
 */
Level.prototype.touches = function(pos, size, type) {
  var xStart = Math.floor(pos.x);
  var xEnd = Math.ceil(pos.x + size.x);
  var yStart = Math.floor(pos.y);
  var yEnd = Math.ceil(pos.y + size.y);

  for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      let isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
      let here = isOutside ? "wall" : this.rows[y][x];
      if (here == type) return true;
    }
  }
  return false;
};

export { Level };