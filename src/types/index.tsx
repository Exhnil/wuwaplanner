export interface Character {
  id: string;
  name: string;
  attribute: string;
  weapon: string;
  gender: string;
  nation: string;
  class: string;
  rarity: number;
  release: string;
  ascension_materials: AscensionMaterials;
  skill_materials: SkillMaterials;
  stats_bonus_materials: StatsBonusMaterials;
  inherent_skill_materials: InherentSkillMaterials;
}

export interface Material {
  id: string;
  name: string;
  rarity: number;
  value: number;
}

interface AscensionMaterials {
  [ascensionLevel: string]: Material[];
}

interface SkillMaterials {
  [level: string]: Material[];
}

interface StatsBonusMaterials {
  [rank: string]: Material[];
}

interface InherentSkillMaterials {
  [rank: string]: Material[];
}

export interface CharacterProgress {
  level: LevelProgress;
  skills: Record<string, SkillProgress>;
  bonusStats: Record<number, UnlockProgress[]>;
  inherentSkills: Record<number, UnlockProgress[]>;
}

export interface LevelProgress {
  currentAscensionLevel: number;
  targetAscensionLevel: number;
  currentLevel: number;
  targetLevel: number;
}

export interface SkillProgress {
  currentSkillLevel: number;
  targetSkillLevel: number;
}

export type UnlockProgress = "locked" | "planned" | "unlocked";

export interface Weapon {
  id: string;
  name: string;
  type: string;
  rarity: number;
  ascension_materials: AscensionMaterials;
}

export interface WeaponProgress {
  level: LevelProgress;
}

export interface Item {
  name: string;
  id: string;
  type: string;
  rarity: number;
  source: string;
  group: string;
}

export interface CraftRecipe {
  outputId: string;
  inputs: { id: string; amount: number };
  cost?: number;
}

export type MaterialsCounts = Record<string, number>

export interface Domain {
  name: string;
  id: string;
  type: DomainType;
  cost: number;
  materials: Material[];
}

export type DomainType =
  | "Forgery Challenge"
  | "Overlord Class"
  | "Weekly Challenge"

export interface ChangelogEntry {
  id: string;
  date: string;
  title: string;
  content: string;
}
