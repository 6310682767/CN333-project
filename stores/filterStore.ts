// stores/filterStore.ts
import { create } from "zustand";

interface FilterState {
  selectedCampus: string | null;
  selectedCommunity: string | null;
  setCampus: (campus: string | null) => void;
  setCommunity: (community: string | null) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedCampus: null,
  selectedCommunity: null,
  setCampus: (campus) => set({ selectedCampus: campus }),
  setCommunity: (community) => set({ selectedCommunity: community }),
}));
