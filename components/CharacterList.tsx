"use client";

import { useAtom } from "jotai";
import { useQuery } from "@urql/next";
import { favoriteCharactersAtom, filterAtom } from "@/atoms";
import CHARACTERS from "@graphql/queries/characters.gql";
import { useEffect, useState } from "react";
import styles from "./CharacterList.module.css";
import { CharacterLink } from "./CharacterLink";

export function CharacterList() {
  const [filter] = useAtom(filterAtom);
  const [debouncedFilter, setDebouncedFilter] = useState(filter);
  const [page, setPage] = useState(1);
  const [favoriteCharacters, setFavoriteCharacters] = useAtom(
    favoriteCharactersAtom
  );

  const [{ data, fetching }] = useQuery({
    query: CHARACTERS.GetCharacters,
    variables: { filter: debouncedFilter, page },
  });

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedFilter(filter), 500);
    return () => clearTimeout(timer);
  }, [filter]);

  const characters = data?.characters?.results || [];
  const totalPages = data?.characters?.info?.pages || 1;

  const toggleFavorite = (characterId: string) => {
    if (favoriteCharacters.includes(characterId)) {
      setFavoriteCharacters((prev) => prev.filter((id) => id !== characterId));
    } else {
      setFavoriteCharacters((prev) => [...prev, characterId]);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Character List</h1>
      <ul className={styles.list}>
        {characters?.map((character: Character) => (
          <CharacterLink
            key={character.id}
            character={character}
            isFavorite={favoriteCharacters.includes(character.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </ul>
      <div className={styles.pagination}>
        <button
          disabled={page === 1 || fetching}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages || fetching}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

