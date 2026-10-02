import type { Domain } from "@/types";
import { getItemWeight } from "./materialsUtils";

export const computeDomainRuns = (
  domain: Domain,
  requiredMap: Record<string, number>,
  inventory: Record<string, number>,
): number => {
  if (domain.type === "Forgery Challenge" && domain.materials.length === 4) {
    let totalRequired = 0;
    let totalOwned = 0;
    let totalDropPerRun = 0;

    domain.materials.forEach((mat) => {
      const weight = getItemWeight(mat.rarity);
      const owned = inventory[mat.id] ?? 0;
      const required = requiredMap[mat.id] ?? 0;

      totalRequired += required * weight;
      totalOwned += owned * weight;
      totalDropPerRun += mat.value * weight;
    });

    const missing = Math.max(totalRequired - totalOwned, 0);

    return Math.ceil(missing / totalDropPerRun);
  }

  let maxRuns = 0;

  for (const mat of domain.materials) {
    const required = requiredMap[mat.id] ?? 0;
    const owned = inventory[mat.id] ?? 0;
    const needed = Math.max(required - owned, 0);
    const runs = Math.ceil(needed / mat.value);
    if (runs > maxRuns) maxRuns = runs;
  }
  return maxRuns;
};