/**
 * Jumping Monolith - Game Utilities
 * created: 2026
 * updated: 2026
 * author: Carlos E Alford
 * utility: Vector, for the 2 dimentional values
 * improvements:
 */

/**
 * @description For 2 dimentional values
 * @param {integer} x - actors top-left x position
 * @param {integer} y - actors top-left y position
 */
class Vector {
  // Different types of actors get their own classes since
  // their behaviour is different.
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // Represent the current position and state of a given moving element in our game.
  plus(other) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  // Scales a Vector by a given number.
  // to multiply a speed Vector by a time interval to get the
  // distance travelled during that time.
  times(factor) {
    return new Vector(this.x * factor, this.y * factor);
  }
}

export { Vector };