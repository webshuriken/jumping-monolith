# Jumping Monolith :video_game:

Browser based platform game, where player is a monolith jumping around collecting coins while avoiding the lava and crushing enemies.

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

## Contributing

If you have any levels you want to add please see [Contributing](CONTRIBUTING.md).

## Features

- lava obstacles that move up and down
- enemies moves horizontally
- player can destroy enemies by jumping on top of them
- limited number of level retries

## Road map

These are the features or ideas to be implemented in due course.

- [ ] Improve `How to Play` screen
- [ ] Player can do a smaller jump with a quick press of the up arrow-key
- [ ] Enemies that move up and down
- [ ] Track and display score of coins collected
- [ ] Display time taken to complete the level
- [ ] Improve animation for Lava
- [ ] Improve animation for Enemy
- [ ] User can select levels
- [ ] Levels are played until the end from selected level
- [ ] Allow player to crouch, becoming a single pixel block
- [ ] Support for touch screen devices

## Authors

Website implementation and code customization.

- [Carlos E Alford M](https://carlosealford.com) (webshuriken)

## License

- [MIT License](LICENSE.md)

## Acknowledgements

Thanks to [Eloquent JavaScript](https://eloquentjavascript.net/) written by Marijn Haverbeke. The base engine for the game comes from chapter 16: A Platform Game.
