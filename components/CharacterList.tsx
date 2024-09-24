'use client'

import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import styles from './CharacterList.module.scss'

import { CharacterLink } from './CharacterLink'
import { Pagination } from './Pagination'
import { CharacterSkeleton } from './CharacterSkeleton'

import { favoriteCharactersAtom, filterAtom } from '@atoms'
import { useCharacters } from '@hooks'

// Constants
const DEBOUNCE_DELAY = 500
const SKELETON_COUNT = 20

export function CharacterList() {
  // State
  const [filter] = useAtom(filterAtom)
  const [debouncedFilter, setDebouncedFilter] = useState({
    ...filter,
    page: '1',
  })
  const [page, setPage] = useState(1)
  const [favoriteCharacters, setFavoriteCharacters] = useAtom(
    favoriteCharactersAtom
  )

  // Queries
  const { data, isLoading } = useCharacters({
    ...debouncedFilter,
    page: page.toString(),
  })

  // Derived state
  const characters = data?.results || []
  const totalPages = data?.info?.pages

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter((prev) => ({ ...prev, ...filter }))
      setPage(1)
    }, DEBOUNCE_DELAY)
    return () => clearTimeout(timer)
  }, [filter])

  // Handlers
  const toggleFavorite = (characterId: string) => {
    setFavoriteCharacters((prev) =>
      prev.includes(characterId)
        ? prev.filter((id) => id !== characterId)
        : [...prev, characterId]
    )
  }

  // Render helpers
  const renderCharacters = () => {
    if (isLoading) {
      return Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <CharacterSkeleton key={index} />
      ))
    }

    return characters.map((character: Character) => (
      <CharacterLink
        key={character.id}
        character={character}
        isFavorite={favoriteCharacters.includes(character.id)}
        toggleFavorite={toggleFavorite}
      />
    ))
  }

  const renderContent = () => {
    if (characters.length === 0 && !isLoading) {
      return (
        <p className={styles.emptyNotice}>
          No characters found for the provided search parameters.
        </p>
      )
    }

    return <ul className={styles.list}>{renderCharacters()}</ul>
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Character List</h2>
      {renderContent()}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        isLoading={isLoading}
        onPageChange={setPage}
      />
    </div>
  )
}
