# Welcome to Jumping Monolith contributing guide

Thank you for taking the time to contribute to the project!. New levels are always appreciated.

## What we're looking for

New levels that will challenge users. Perhaps you found the game too easy and would like a different challenge.

## How to contribute

- Fork the repo
- Clone locally or not
- Make your changes
- Make a pull request

I will be maintaining this product on my own so please allow a couple of days for a reply.

## About level creation

All levels are created and saved within their own `.js` file. This way, as the creator, you can add the information regarding the game. This will include:

- name: the name you want to give the level. Make sure it is not a name already in use.
- date: this way we can track the age of the levels.
- author: because you should get credit for your creation.
- level: this is the actual level.

Level information is store in an objects and exported. This way we can control the levels available in the game.

## How to create a level

Levels are created using `ASCII` charactes. Each has a meaning. Please stick to them.

**Player**:

- `@` (at-sign): marks the location your player will start the level from.

**Structure**:

- `.` (full stop): used to represent open space. The area the player can move within.
- `#` (hash): use them to create steps, floor, ceiling and walls. Users are not allowed to go through them.
- `o` (lowercase vowel): these are the coins the player will collect.

**Enemies**:

- `*` (asterisk): the enemy. Currently can only move horizontally.
- Lava consists of 4 different characters depending on the desired effect:
  - `+` sitting still lava block
  - `=` moving back and forth horizontally in a loop
  - `|` moving up and down in a loop
  - `v` dripping lava, once it hits the the floor it starts falling again

### Level file reference

Use the code for your file and edit the parts that make your level unique.

```javascript
const levelBlueprint = {
  name: 'level_name',
  date: 'date_of_creation',
  author: 'your_name',
  map: ''
}

const map = `
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

levelBlueprint.map = map;

export {levelBlueprint};
```
