import { axiosInstance } from "@/lib/axios";
import { parseError } from "@/lib/errors";
import { create } from "zustand";

interface MiscStore {
  nations: string[];
  attributes: string[];
  weaponsTypes: string[];

  isLoading: boolean;
  error: string | null;
  fetchMisc: () => Promise<void>;
}

export const useMiscStore = create<MiscStore>((set, get) => ({
  nations: [],
  attributes: [],
  weaponsTypes: [],
  isLoading: false,
  error: null,

  fetchMisc: async () => {
    if (get().isLoading) return;
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/misc");
      set({
        attributes: response.data.attributes,
        weaponsTypes: response.data.weapons,
        nations: response.data.nations
      });
    } catch (error: unknown) {
      set({ error: parseError(error) });
    } finally {
      set({ isLoading: false });
    }
  },
}));
