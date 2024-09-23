import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

type ColorScheme = 'light' | 'dark'
export const colorSchemeAtom = atomWithStorage<ColorScheme>(
  'colorScheme',
  'light'
)

export const favoriteCharactersAtom = atomWithStorage<string[]>(
  'favoriteCharacters',
  []
)

type Filter = {
  name?: string
  status?: string
  species?: string
  type?: string
  gender?: string
  origin?: string
}

export const filterAtom = atom<Filter>({
  name: '',
})
