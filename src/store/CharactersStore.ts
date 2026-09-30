import { axiosInstance } from "@/lib/axios";
import { parseError } from "@/lib/errors";
import type { Character } from "@/types";
import { create } from "zustand";

interface CharacterStore {
  characters: Character[];

  isLoading: boolean;
  error: string | null;

  fetchCharacters: () => Promise<void>;
}

export const useCharactersStore = create<CharacterStore>((set, get) => ({
  characters: [],
  isLoading: false,
  error: null,

  fetchCharacters: async () => {
    if (get().isLoading) return;
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/characters/all");
      set({ characters: response.data });
    } catch (error: unknown) {
      set({ error: parseError(error) });
    } finally {
      set({ isLoading: false });
    }
  },
}));