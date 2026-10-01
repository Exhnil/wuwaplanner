import { axiosInstance } from "@/lib/axios";
import { parseError } from "@/lib/errors";
import type { Domain, Item } from "@/types";
import { create } from "zustand";

interface DataStore {
  items: Item[];
  domains: Domain[];
  isLoading: boolean;
  error: string | null;

  fetchAllMaterials: () => Promise<void>;
  fetchAllDomains: () => Promise<void>;
}

export const useDataStore = create<DataStore>((set) => ({
  items: [],
  domains: [],
  isLoading: false,
  error: null,

  fetchAllMaterials: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/materials/all");
      set({ items: response.data });
    } catch (error: unknown) {
      set({ error: parseError(error) });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchAllDomains: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/domains/all");
      set({ domains: response.data });
    } catch (error: unknown) {
      set({ error: parseError(error) });
    } finally {
      set({ isLoading: false });
    }
  },
}));
