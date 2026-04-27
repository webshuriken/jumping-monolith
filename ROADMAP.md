# Roadmap

These are the features or ideas to be implemented in due course.

## Version 1.1.0

- [X] Refactor game engine so that functions and classes location is more logical. Separating concerns.
- [X] Migrate all JavaScript codebase to TypeScript
- [X] Refactor the files within the app to improve logic
- [X] Improve `How to Play` screen
- [X] Improve color pallet of game
- [X] Refactor CSS separating styling more logically and use variables
- [X] Add game screenshot to README

## Version 1.1.1

- [X] Move `Road Map` details to its own document called `ROADMAP.md`
- [X] Play button has a zoom in and out effect. Improve loading so we can appreaciate it.
- [X] Improve scroling that keeps player in the viewable area.
- [X] Tests for level MAPS, only the valid strings are used to create it
  - [X] Check the `levelBlueprint` has correct structure
  - [X] Check the `map` property is not empty
  - [X] Check we have only a single player `@` spawn. If none or more than one exists then it gives error.
  - [X] Checks that we have at least a single coin `o`.
- [X] Add option to quit game using the `q` or `esc` character with a modal asking to confirm action
- [X] Improve the `How to Play` semantics by using a list to structure the modal layout
- [X] Add quit options to `How to Play` modal
- [X] Add missing `p` pause option to `How to Play` modal

## Version 1.2.0

- [ ] Implement time tracking, how long does the player take to complete level
- [ ] Display time taken to complete the level at the end of level
- [ ] Track score of coins collected
- [ ] Display score of coins collected
- [ ] User can select levels. Levels are played until the end from selected level

## Version 1.2.1

- [ ] Player can do a smaller jump with a quick press of the up arrow-key
- [ ] Allow player to crouch, becoming a single pixel block
- [ ] Enemies that move up and down

## Version 1.3.0

- [ ] Improve animation for Lava using sprites
- [ ] Improve animation for Enemy using sprites

## Version 1.4.0

- [ ] Support for touch screen devices making sure it can be played on mobiles