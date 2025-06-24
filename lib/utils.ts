import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFirstLetters = (str: string) => {
  const matches = str.match(/\b(\w)/g);
  const acronym = matches?.join("");
  return acronym;
};
