"use client";
import { create } from "zustand";

export const useUIStore = create((set) => ({
  mobileNavOpen: false,
  toggleMobileNav: () => set((s) => ({ mobileNavOpen: !s.mobileNavOpen })),
  closeMobileNav: () => set({ mobileNavOpen: false }),

  contactModalOpen: false,
  openContactModal: () => set({ contactModalOpen: true }),
  closeContactModal: () => set({ contactModalOpen: false }),
}));
