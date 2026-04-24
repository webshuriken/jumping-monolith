import { z } from "zod";
import { LEVEL_CHARS, LAVA_CHARS } from "../js/utilities/util-functions";

const AllLevelChars = [...LEVEL_CHARS, ...LAVA_CHARS];
const LevelCharsSchema = z.enum(AllLevelChars);

export const LevelSchema = z.object({
  name: z.string(),
  date: z.string(),
  author: z.string(),
  map: z.array(z.array(LevelCharsSchema)),
});
