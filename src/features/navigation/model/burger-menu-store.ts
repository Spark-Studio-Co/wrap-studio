import { create } from "zustand";

interface BurgerMenuStore {
    isOpen: boolean;
    toggleMenu: () => void;
}

export const useBurgerMenuStore = create<BurgerMenuStore>((set) => ({
    isOpen: false,
    toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}));