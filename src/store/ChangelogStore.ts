import { axiosInstance } from "@/lib/axios";
import { parseError } from "@/lib/errors";
import type { ChangelogEntry } from "@/types";
import { create } from "zustand";

interface ChangelogStore {
    changelog: ChangelogEntry[]

    isLoading: boolean;
    error: string | null;
    fetchChangelog: () => Promise<void>;
}

export const useChangelogStore = create<ChangelogStore>((set, get) => ({
    changelog: [],
    isLoading: false,
    error: null,

    fetchChangelog: async () => {
        if (get().isLoading) return;
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/changelog");
            set({
                changelog: response.data
            });
        } catch (error: unknown) {
            set({ error: parseError(error) });
        } finally {
            set({ isLoading: false });
        }
    },
}));
