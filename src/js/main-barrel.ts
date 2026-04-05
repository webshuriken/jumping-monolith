import { levelBlueprint as demo } from './levels/demo';
import { levelBlueprint as leve2 } from './levels/level2';
import { levelBlueprint as leve3 } from './levels/level3';

// consumed by the game engine
const GAME_LEVELS: string[] = [
  demo.map,
  leve2.map,
  leve3.map
];

export {GAME_LEVELS};