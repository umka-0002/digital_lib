import { atom } from "jotai";

export interface Card {
  id: number;
  author: string;
  title: string;
  year: string;
  city: string;
  pages: string;
  cipher: string;
  image: string;
  ocr_text: string;
  corrected_text: string;
  checked: boolean;
  rejected: boolean;
}

export const cardsAtom = atom<Card[]>([]);