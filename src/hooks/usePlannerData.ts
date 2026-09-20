import { calculate, computeDomainRuns } from "@/lib/calculateMaterials"
import { useCharacterProgressStore } from "@/store/CharacterProgressStore"
import { useCharactersStore } from "@/store/CharactersStore"
import { useInventoryStore } from "@/store/InventoryStore"
import { useItemStore } from "@/store/ItemStore"
import { useWeaponProgressStore } from "@/store/WeaponProgressStore"
import { useWeaponStore } from "@/store/WeaponStore"
import type { Item } from "@/types"
import { useMemo } from "react"


export const usePlannerData = () => {
    const { characters } = useCharactersStore()
    const { charactersProgress } = useCharacterProgressStore()
    const { weapons } = useWeaponStore()
    const { weaponsProgress } = useWeaponProgressStore()
    const { domains, items } = useItemStore()
    const { inventoryState } = useInventoryStore()

    const requiredMap = useMemo(() => {
        return calculate(characters, weapons, charactersProgress, weaponsProgress)
    }, [characters, weapons, charactersProgress, weaponsProgress])

    const runsByDomain = useMemo(() => {
        return Object.fromEntries(
            domains.map((domain) => [
                domain.id,
                computeDomainRuns(domain, requiredMap, inventoryState)
            ])
        )
    }, [])

    const filteredDomains = useMemo(() => {
        return domains
            .filter((domain) =>
                domain.materials.some((mat) => {
                    const required = requiredMap[mat.id] ?? 0;
                    const owned = inventoryState[mat.id] ?? 0;

                    return required > owned;
                }),
            )
            .map((domain) => ({
                ...domain,
                materials: [...domain.materials].sort(
                    (a, b) => b.rarity - a.rarity,
                ),
            }));
    }, [domains, requiredMap, inventoryState]);

    const filteredLocalItems = useMemo(() => {
        return items.filter(
            (i) =>
                i.source.toLowerCase().includes("local") &&
                (requiredMap[i.id] ?? 0) > (inventoryState[i.id] ?? 0),
        );
    }, [items, requiredMap, inventoryState]);

    const filteredEnemyDrops = useMemo(() => {
        return items.filter(
            (i) =>
                i.source.toLowerCase().includes("local") &&
                (requiredMap[i.id] ?? 0) > (inventoryState[i.id] ?? 0),
        );
    }, [items, requiredMap, inventoryState]);

    const groupedEnemyDrops = useMemo(() => {
        const drops: Record<string, { items: Item[]; required: number }> = {};

        for (const item of filteredEnemyDrops) {
            const key = item.group && item.group !== "none" ? item.group : item.id;

            if (!drops[key]) {
                drops[key] = { items: [], required: 0 };
            }

            drops[key].items.push(item);
            drops[key].required += requiredMap[item.id] ?? 0;
        }

        for (const group of Object.values(drops)) {
            group.items.sort((a, b) => b.rarity - a.rarity);
        }
        return drops;
    }, [filteredEnemyDrops, requiredMap]);

    const forgeryMaterials = filteredDomains.filter(
        (d) => d.type === "Forgery Challenge",
    );
    const overlordClasses = filteredDomains.filter(
        (d) => d.type === "Overlord Class",
    );
    const weeklyDomains = filteredDomains.filter(
        (d) => d.type === "Weekly Challenge",
    );

    const hasNothingToFarm =
        filteredEnemyDrops.length === 0 &&
        forgeryMaterials.length === 0 &&
        weeklyDomains.length === 0 &&
        overlordClasses.length === 0 &&
        filteredLocalItems.length === 0;

    const totalEnergy = useMemo(() => {
        let totalEnergy = 0;
        for (const domain of filteredDomains) {
            totalEnergy += runsByDomain[domain.id] * domain.cost;
        }
        return totalEnergy;
    }, [filteredDomains, runsByDomain]);

    return {
        requiredMap,
        runsByDomain,
        filteredEnemyDrops,
        filteredLocalItems,
        groupedEnemyDrops,
        forgeryMaterials,
        overlordClasses,
        weeklyDomains,
        hasNothingToFarm,
        totalEnergy
    }
}