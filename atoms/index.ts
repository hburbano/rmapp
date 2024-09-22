import { atomWithStorage } from "jotai/utils";

type ColorScheme = "light" | "dark";
export const colorSchemeAtom = atomWithStorage<ColorScheme>(
  "colorScheme",
  "light"
);

export const favoriteCharactersAtom = atomWithStorage<number[]>(
  "favoriteCharacters",
  []
);

type Filter = {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: string;
};

export const filterAtom = atomWithStorage<Filter>("filter", {
  name: "",
  status: "",
  species: "",
  type: "",
  gender: "",
  origin: "",
});
