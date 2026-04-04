import { levelBlueprint as demo } from './levels/demo.js';
import { levelBlueprint as leve2 } from './levels/level2.js';
import { levelBlueprint as leve3 } from './levels/level3.js';

// consumed by the game engine
const GAME_LEVELS = [
  demo.map,
  leve2.map,
  leve3.map
];

export {GAME_LEVELS};