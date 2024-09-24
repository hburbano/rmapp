import { http, delay, HttpResponse } from 'msw'

// Mock character data would probaly use faker and random data
export const mockCharacter: Character = {
  id: '1',
  name: 'John Doe',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth Origin',
  },
  location: {
    name: 'Earth Location',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
}

export const mockEpisode = {
  id: '1',
  name: 'Pilot',
  episode: 'S01E01',
}

const handleGetCharacter = () => {
  delay(100)
  return HttpResponse.json(mockCharacter)
}

const handleGetCharacters = () => {
  delay(100)
  return HttpResponse.json({
    info: {
      count: 1,
      pages: 1,
      next: null,
      prev: null,
    },
    results: [mockCharacter],
  })
}

const handleGetEpisode = () => {
  return HttpResponse.json(mockEpisode)
}

// API routes
export const handlers = [
  http.get('https://rickandmortyapi.com/api/character', handleGetCharacters),
  http.get('https://rickandmortyapi.com/api/character/:id', handleGetCharacter),
  http.get('https://rickandmortyapi.com/api/episode/:id', handleGetEpisode),
]
