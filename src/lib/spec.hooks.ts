import { useEffect } from "react";
import { ApiSpec, useSpecStore } from "./spec.store";

const STORAGE_KEY = "api-specs";

export function useLoadSpecsFromStorage() {
  const { specs, addSpec } = useSpecStore();

  useEffect(() => {
    try {
      const storedSpecs = localStorage.getItem(STORAGE_KEY);
      if (storedSpecs && specs.length === 0) {
        const parsedSpecs = JSON.parse(storedSpecs) as ApiSpec[];
        // Only load if there are actually specs to load
        if (parsedSpecs.length > 0) {
          parsedSpecs.forEach((spec) => {
            addSpec({
              name: spec.name,
              type: spec.type,
              value: spec.value,
            });
          });
        }
      }
    } catch (error) {
      console.error("Failed to load specs from storage:", error);
    }
  }, []);
}

export function useSyncSpecsToStorage() {
  const { specs } = useSpecStore();

  useEffect(() => {
    // Always save the current state, even if empty
    localStorage.setItem(STORAGE_KEY, JSON.stringify(specs));
  }, [specs]);
}

export function useActiveSpec() {
  const { specs, activeSpecId } = useSpecStore();

  return specs.find((spec) => spec.id === activeSpecId) || null;
}
