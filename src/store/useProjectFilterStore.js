"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useProjectFilterStore = create(
  persist(
    (set) => ({
      query: "",
      selectedTags: [],
      status: "all", // all | completed | in-progress

      setQuery: (q) => set({ query: q }),
      toggleTag: (tag) =>
        set((s) => {
          const exists = s.selectedTags.includes(tag);
          return {
            selectedTags: exists
              ? s.selectedTags.filter((t) => t !== tag)
              : [...s.selectedTags, tag],
          };
        }),
      setStatus: (v) => set({ status: v }),
      reset: () => set({ query: "", selectedTags: [], status: "all" }),
    }),
    {
      name: "pf-v1",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : undefined
      ),
    }
  )
);
