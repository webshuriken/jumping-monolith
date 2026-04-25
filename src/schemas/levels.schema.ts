import { z } from "zod";
import { LEVEL_CHARS, LAVA_CHARS } from "../js/utilities/util-functions";

const AllLevelChars = [...LEVEL_CHARS, ...LAVA_CHARS].join("");

export const LevelSchema = z.object({
  name: z.string(),
  date: z.string(),
  author: z.string(),
  map: z.string().superRefine((val, ctx) => {
    const rows = val.trim().split("\n");

    if (rows.length === 0 || rows[0].length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Map cannot be empty",
      });
    }

    const width = rows[0]?.length;

    let playerCount = 0;
    let coinCount = 0;

    rows.forEach((row, i) => {
      if (row.length !== width) {
        ctx.addIssue({
          code: "custom",
          message: `Row ${i} has inconsistent width`,
        });
      }

      [...row].forEach((char, j) => {
        if (!AllLevelChars.includes(char as any)) {
          ctx.addIssue({
            code: "custom",
            mesasge: `Invalid char '${char} at (${i}, ${j})`,
          });
        }

        if (char === "@") playerCount++;
        if (char === "o") coinCount++;
      });
    });

    // Player validation
    if (playerCount === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Missing player spawn (@)",
      });
    }

    if (playerCount > 1) {
      ctx.addIssue({
        code: "custom",
        message: "Multiple player spawns (@) found",
      });
    }

    // coin validation
    if (coinCount === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Map must contain at least one coin (o)",
      });
    }
  })
});
