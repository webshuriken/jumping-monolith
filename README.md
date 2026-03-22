# Jumping Monolith :video_game:

Browser based platform game, where player is a monolith jumping around collecting coins while avoiding the lava and crushing enemies.

## Getting Started

Here is what you need to start playing the game.

### Prerequisites

- [Python3](https://www.python.org/downloads/) can be used to run a quick local server (see below) or you can use any other method you'd prefer.

### Setup

Because we use ES6 modules and due to CORS policy the game can't be run directly from the file.

- Clone this repo :smile:

`git clone https://github.com/webshuriken/jumping-monolith.git`

- Now go into the folder and run:

`python3 -m http.server 8888`

`8888` is just the port number I use but you can use any port number you like.

## How to Play

- The game has one simple goal: **collect all the coins**.

- Use the **left** :arrow_left: and **right** :arrow_right: *arrow keys* to **move**

- Use the **up** :arrow_up: *arrow key* to **jump**

- Don't let the lava touch you or the level will restart.

- Enemies will take a live and restart a level when they touch you.

- Land on top of the enemy to destry them!

**NOTE:**

Right now there is only 1 level available. I am currently designing a few more levels. :smiley:

If you have any levels you want to add please see [Contributing](#contributing).

## Built with

- HTML
- CSS
- JS (ES6)

## Contributing

Pull request are welcomed.

- Fork the repo
- Clone locally or not
- Make your changes
- Make a pull request

I will be maintaining this product on my own so please allow a couple of days for a reply.

### Creating maps

The map is made from a string. This keeps it simple and easily readable.

Use the following characters to create the map:
- `#` for walls and floors
- `.` full stops are black spaces
- `@` player
- `*` enemy (horizontally moving)
- `o` the letter o are the coins
- Lava consists of 4 different characters depending on the desired effect:
  - `+` sitting still lava block
  - `=` moving back and forth horizontally in a loop
  - `|` moving up and down in a loop
  - `v` dripping lava, once it hits the the floor it starts falling again

**Map Example**

```javascript
const mapName = `
....................|...................
.#.............|.........|............#.
.#....................................#.
.#....................................#.
.#........................o.o.o.o.....#.
.#.o....=..############################.
.###.........................v......o.#.
.#....................................#.
.#.o.o.#............o...............o.#.
.#..............................#######.
.#..........######..................o.#.
.#o.................................o.#.
.##.......................#############.
.#....o.........#..*...@.#..............
.#....##++++#############...............
.#####################..................
........................................`;
```

## Notes

- Currently the game does not support touch screen devices.

- This version of the game uses the DOM to draw out the game, therefore it may not perform games console smooth.

## Authors

Website implementation and code customization.

- Website - [Carlos E Alford M](https://carlosealford.com)
- Twitter - [@webshuriken](https://www.twitter.com/webshuriken)

## License

- [MIT License](LICENSE.md)

## Acknowledgements

Thanks to [Eloquent JavaScript](https://eloquentjavascript.net/) written by Marijn Haverbeke.
The challenges presented in the book were worth the time.
The base engine for the game comes from chapter 16: A Platform Game.
