# Jumping Monolith :video_game:

Browser based platform game, where player is a monolith jumping around collecting coins while avoiding the lava and crushing enemies. `^_^`

## About

As part of my journey to stay ahead and from curiosity I read a book called _Eloquent JavaScript_ by _Marijn Haverbeke_ which goes through concepts in a clear way with examples and questions to test what you have learned. I really enjoyed it.

One of the chapters spoke about creating a game engine with code examples to create a simple game. It was a block that moved around avoiding obstacles. It was so good that it wet my curiosities appetite and I decided to take it further.

The current engine is combination of the code from the tutorial and my own. It will keep evolving and improving.
This version of the game uses the DOM to draw out the game, therefore it may not perform games console smooth.

## Play the game

Go to [game](https://webshuriken.github.io/jumping-monolith/).

## Built with

- HTML
- CSS
- JS (ES6)
- TypeScript
- Currently the game does not support touch screen devices.

## Test locally

Because we use `ES6` modules and due to CORS policy the game can't be run directly from the file.

- VS Code: Install the Live Server extension. Once installed, clicke ont he "Go Live" button at the bottom of the editor.
- Python: If you have Python installed, run this in your project folder: `python -m http.server`
- Node.js: If you prefer Node, run `npx serve`

## How to Play

- The game has one simple goal: `collect all the coins`.
- Use the `left` arrow-key and `right` arrow-key to `move`
- Use the `up` arrow-key to `jump`
- Don't let the lava touch you or the level will restart.
- Enemies will take a live and restart a level when they touch you.
- Land on top of the enemy to destry them!

**NOTE:**

Right now there is only 1 level available. I am currently designing a few more levels. :smiley:

## Game Features

**Lava:**

- able to move vertically
- able to move horizontally
- drips from the a set location vertically, resetting once it hits the ground

**Enemies:**

- able to moves horizontally

**Player:**

- moves left and right at constant speed
- jumps at constant height regardless of keypress length
- destroys enemies by jumping on top of them

**Level:**

- player only gets 3 tries per level
- player lives reset back to 3 on each new level

## Road map

These are the features or ideas to be implemented in due course.

1. Major version (Big changes, breaking changes)
2. Minor version (New features, backward-compatible)
3. Patch version (Bug fixes, small improvements)

### Version 1.2.0

- [X] Refactor game engine so that functions and classes location is more logical. Separating concerns.
- [X] Migrate all JavaScript codebase to TypeScript
- [X] Refactor the files within the app to improve logic
- [X] Improve `How to Play` screen
- [ ] Improve color pallet of game
- [ ] Refactor CSS separating styling more logically and use variables
- [ ] Add game screenshot to README

### Version 1.2.1

- [ ] Tests for level MAPS, only the valid strings are used to create it
- [ ] Add option to quit game using the `q` or `esc` character with a modal asking to confirm action

### Version 1.2.2

- [ ] Implement time tracking, how long does the player take to complete level
- [ ] Display time taken to complete the level at the end of level
- [ ] Track score of coins collected
- [ ] Display score of coins collected
- [ ] User can select levels. Levels are played until the end from selected level

### Version 1.2.3

- [ ] Player can do a smaller jump with a quick press of the up arrow-key
- [ ] Allow player to crouch, becoming a single pixel block
- [ ] Enemies that move up and down

### Version 1.3.0

- [ ] Improve animation for Lava using sprites
- [ ] Improve animation for Enemy using sprites

### Version 1.4.0

- [ ] Support for touch screen devices making sure it can be played on mobiles

## Authors

Website implementation and code customization.

- [Carlos E Alford M](https://carlosealford.com)

## Contributing

If you have any levels you want to add please see [Contributing](CONTRIBUTING.md).

## License

- [MIT License](LICENSE.md)

## Acknowledgements

Thanks to [Eloquent JavaScript](https://eloquentjavascript.net/) written by Marijn Haverbeke. The base engine for the game comes from chapter 16: A Platform Game.
