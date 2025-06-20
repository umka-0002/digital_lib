import { atom } from "jotai";

export const userAtom = atom<{token: string} | null>(null);