import { useQuery } from '@tanstack/react-query'

// Constants
const API_URL = 'https://rickandmortyapi.com/api'

// Helper Functions
const fetchData = async (endpoint: string, params?: Record<string, string>) => {
  const url = `${API_URL}/${endpoint}${params ? `?${new URLSearchParams(params).toString()}` : ''}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return response.json()
}

export const fetchCharacters = async (params?: Record<string, string>) => {
  return fetchData('character', params)
}

export const fetchCharacter = async (id: string) => {
  return fetchData(`character/${id}`)
}

export const fetchEpisode = async (id: string) => {
  return fetchData(`episode/${id}`)
}

// Custom Hooks
export const useCharacters = (params?: Record<string, string>) => {
  return useQuery({
    queryKey: ['characters', params],
    queryFn: () => fetchCharacters(params),
  })
}

export const useCharacter = (id: string) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacter(id),
  })
}
