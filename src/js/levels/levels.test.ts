import { z } from "zod";
import { describe, it, expect } from "vitest";
import { LevelSchema } from "../../schemas/levels.schema";

const modules = import.meta.glob("../levels/*.ts", { eager: true });

describe("Data file structure", () => {
  for (const [path, module] of Object.entries(modules)) {
    it(`validates ${path}`, () => {
      const data = (module as any).levelBlueprint;
      const result = LevelSchema.safeParse(data);

      const validationMessage = result.success 
        ? `Expected ${path} to validate successfully`
        : `Validation failed for ${path}\n${JSON.stringify(z.treeifyError(result.error), null, 2)}`;

      expect(result.success, validationMessage).toBe(true);
    });
  }
});
