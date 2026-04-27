/**
 * Jumping Monolith - Game Utilities
 * created: 2026
 * updated: 24-04-2026
 * author: Carlos E Alford
 * utility: Level, tracks the game level
 */

import { Player } from "../actors/player";
import { Enemy } from "../actors/enemy";
import { Coin } from "../actors/coin";
import { Lava } from "../actors/lava";
import { Vector, type IVector } from "./vector";
import { type TLevelChars, type TLavaChars } from '../utilities/util-functions';


type TActors = typeof Player | typeof Enemy | typeof Coin | typeof Lava;
export type TActorInstances = Player | Enemy | Coin | Lava;
// strings that describe a level
type TLevelCharsToValues = "empty" | "wall" | "lava" | TActors;

export interface ILevel {
  height: number;
  rows: string[][];
  startActors: TActorInstances[];
  touches(pos: IVector, size: IVector, type: TLevelCharsToValues): boolean;
  width: number;
}

// maps background elements to strings and actor characters to classes.
const levelChars: Record<TLevelChars, TLevelCharsToValues> = {
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
 * Check that the level character is valid
 * @param {string} char single character to check
 * @returns {char is TLevelChars}
 */
function isLevelChar(char: string): char is TLevelChars {
  const validChars = [".", "#", "+", "@", "o", "=", "|", "v", "*"];
  return validChars.includes(char);
}

/**
 * Check if the constructor passed in is from the Lava class
 * @param {TActors} actor Class constructor for Enemy, Player, Coin or Lava
 * @returns actor is typeof Lava
 */
function isLavaActor(actor: TActors): actor is typeof Lava {
  return actor.prototype.type === 'lava';
}

/**
 * Does the character represent a valid lava action
 * @param {string} char a single character
 * @returns {char is TLavaChars}
 */
function isLavaChar(char: string): char is TLavaChars {
  return char === "=" || char === "|" || char === "v";
}

/**
 * @description Stores a level object
 * @param {string} plan - human readable level
 */

class Level implements ILevel {
  readonly height: number;
  readonly width: number;
  readonly startActors: TActorInstances[];
  readonly rows: string[][];

  // To interpret the characters in the plan, the Level
  // constructor uses the levelChars object.
  constructor(plan: string) {
    // Game map as array of arrays of string
    let rows: TLevelChars[][]  = plan.trim().split("\n").map((line, lineIndex) => {
      return [...line].filter((char): char is TLevelChars => {
        if (isLevelChar(char)) return true;
        // in the unlikely chance the char is not valid let them know it
        throw new Error(`Invalid character "${char}" in line "${lineIndex}".`);
      });
    });

    const cols = rows[0];

    if (!cols) {
      throw new Error('Invalid level plan: Where are the rows?');
    }

    // use array to get the maps height and width
    this.height = rows.length;
    this.width = cols.length;

    // Array of actor objects
    this.startActors = [];

    // Map background with field types: "empty", "wall" or "lava"
    this.rows = rows.map((row, y) => {
      // maps through each character that makes up the level
      return row.map((ch, x) => {

        // map current character to background(string) or actor(object)
        const ActorOrBg = levelChars[ch];

        if (!ActorOrBg) {
          throw new Error(`Unknown level character "${ch}".`);
        }

        // game bg is just a string so is ready to be added to the list
        if (typeof ActorOrBg === "string") return ActorOrBg;

        let actor: TActorInstances;
        
        // actors are objects to be instantiated before being added to list of startActors
        if (isLavaActor(ActorOrBg)) {
          // lava has various actions make sure this is a valid char for an action
          if (!isLavaChar(ch)) {
            throw new Error(`Unable to create lava for this character "${ch}".`);
          }
          actor = ActorOrBg.create(new Vector(x, y), ch);
        }else{
          actor = ActorOrBg.create(new Vector(x, y));
        }

        if (!actor) {
          throw new Error(`Actor creation failed for "${ch}".`);
        }
        this.startActors.push(actor);
        // space taken by actors is represented by "empty" string
        return "empty";
      });
    });
  }

  /**
   * Is rectangle touching a grid element of a given type
   * @param {IVector} pos - player element position
   * @param {IVector} size - player element size
   * @param {TLevelCharsToValues} type - type of element, eg lava, wall, player, ...
   * @return {boolean}
   */
  touches(pos: IVector, size: IVector, type: TLevelCharsToValues): boolean {
    let xStart = Math.floor(pos.x);
    let xEnd = Math.ceil(pos.x + size.x);
    let yStart = Math.floor(pos.y);
    let yEnd = Math.ceil(pos.y + size.y);

    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        const isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
        
        if (isOutside) {
          if (type === "wall") return true;
        }

        const row = this.rows[y];
        if (row) {
          if (row[x] === type) return true;
        }
      }
    }
    return false;
  };
}

export { Level };