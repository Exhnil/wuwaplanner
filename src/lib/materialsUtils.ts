import type { MaterialRequirement } from "@/types";

export const addMaterial = (totalMats: Record<string, number>, id: string, quantity: number) => {
    totalMats[id] = (totalMats[id] ?? 0) + quantity;
};

export const addMaterials = (totalMats: Record<string, number>, materials: MaterialRequirement[]) => {
    for (const mat of materials) {
        addMaterial(totalMats, mat.id, mat.value)
    }
}

export const mergeMats = (
    target: Record<string, number>,
    source: Record<string, number>,
) => {
    for (const [id, quantity] of Object.entries(source)) {
        addMaterial(target, id, quantity)
    }
};