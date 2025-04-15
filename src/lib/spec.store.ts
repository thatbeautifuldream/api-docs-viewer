import { create } from "zustand";

export type ApiSpec = {
  id: string;
  name: string;
  type: "url" | "content";
  value: string;
};

type SpecStore = {
  specs: ApiSpec[];
  activeSpecId: string | null;
  addSpec: (spec: Omit<ApiSpec, "id">) => void;
  updateSpec: (id: string, updates: Partial<Omit<ApiSpec, "id">>) => void;
  removeSpec: (id: string) => void;
  setActiveSpecId: (id: string | null) => void;
};

export const useSpecStore = create<SpecStore>((set) => ({
  specs: [],
  activeSpecId: null,

  addSpec: (spec) =>
    set((state) => {
      const id = Date.now().toString();
      return {
        specs: [...state.specs, { ...spec, id }],
        activeSpecId: state.activeSpecId || id,
      };
    }),

  updateSpec: (id, updates) =>
    set((state) => ({
      specs: state.specs.map((spec) =>
        spec.id === id ? { ...spec, ...updates } : spec
      ),
    })),

  removeSpec: (id) =>
    set((state) => {
      const newSpecs = state.specs.filter((spec) => spec.id !== id);
      return {
        specs: newSpecs,
        activeSpecId:
          state.activeSpecId === id
            ? newSpecs.length > 0
              ? newSpecs[0].id
              : null
            : state.activeSpecId,
      };
    }),

  setActiveSpecId: (id) => set({ activeSpecId: id }),
}));
