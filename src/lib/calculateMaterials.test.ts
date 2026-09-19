import { describe, expect, it } from "vitest";
import { calculateLevels } from "./calculateMaterials";
import type { Character } from "@/types";

describe("calculateLevels", () => {
    it("should calculate materials required between current and target ascension levels", () => {
        const character = {
            ascension_materials: {
                2: [
                    { id: "material-a", value: 3 },
                ],
                3: [
                    { id: "material-a", value: 2 },
                    { id: "material-b", value: 5 },
                ],
                4: [
                    { id: "material-b", value: 10 },
                ],
            },
        } as unknown as Character;

        const state = {
            currentAscensionLevel: 1,
            targetAscensionLevel: 3,
            currentLevel: 1,
            targetLevel: 1,
        };

        const result = calculateLevels(character, state);

        expect(result).toEqual({
            "material-a": 5,
            "material-b": 5,
        });
    });
});