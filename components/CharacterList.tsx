'use client'

import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { useQuery } from '@urql/next'

import styles from './CharacterList.module.scss'
import { CharacterLink } from './CharacterLink'
import { Pagination } from './Pagination'

import { favoriteCharactersAtom, filterAtom } from '@/atoms'
import CHARACTERS from '@graphql/queries/characters.gql'

export function CharacterList() {
  const [filter] = useAtom(filterAtom)
  const [debouncedFilter, setDebouncedFilter] = useState(filter)
  const [page, setPage] = useState(1)
  const [favoriteCharacters, setFavoriteCharacters] = useAtom(
    favoriteCharactersAtom
  )

  const [{ data, fetching }] = useQuery({
    query: CHARACTERS.GetCharacters,
    variables: { filter: debouncedFilter, page },
  })

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedFilter(filter), 500)
    return () => clearTimeout(timer)
  }, [filter])

  const characters = data?.characters?.results || []
  const totalPages = data?.characters?.info?.pages || 1

  const toggleFavorite = (characterId: string) => {
    if (favoriteCharacters.includes(characterId)) {
      setFavoriteCharacters((prev) => prev.filter((id) => id !== characterId))
    } else {
      setFavoriteCharacters((prev) => [...prev, characterId])
    }
  }

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
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        isLoading={fetching}
        onPageChange={setPage}
      />
    </div>
  )
}
