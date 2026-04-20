/**
 * Jumping Monolith - Game Utilities
 * created: 2026
 * updated: 05-04-2026
 * author: Carlos E Alford
 * utility: Vector, for the 2 dimentional values
 */

export interface IVector {
  plus(other: IVector): IVector;
  times(factor: number): IVector;
  x: number;
  y: number;
}

/**
 * @description For 2 dimentional values
 * @param {number} x - actors top-left x position
 * @param {number} y - actors top-left y position
 */
class Vector implements IVector {
  // Different types of actors get their own classes since
  // their behaviour is different.
  constructor(public x: number, public y: number) {}

  // Represent the current position and state of a given moving element in our game.
  plus(other: IVector): Vector {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  // Scales a Vector by a given number.
  // to multiply a speed Vector by a time interval to get the
  // distance travelled during that time.
  times(factor: number): Vector {
    return new Vector(this.x * factor, this.y * factor);
  }
}

export { Vector };