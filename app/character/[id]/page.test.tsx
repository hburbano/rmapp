import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import CharacterDetails from './page'
import { mockCharacter, mockEpisode } from '@test/mocks/handlers'

describe('CharacterDetails', () => {
  it('should display character details', async () => {
    render(await CharacterDetails({ params: { id: '1' } }))

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument()

    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText(mockCharacter.status)).toBeInTheDocument()

    expect(screen.getByText('Species')).toBeInTheDocument()
    expect(screen.getByText(mockCharacter.species)).toBeInTheDocument()

    expect(screen.getByText('Type')).toBeInTheDocument()
    expect(screen.getByText(mockCharacter.type || 'N/A')).toBeInTheDocument()

    expect(screen.getByText('Gender')).toBeInTheDocument()
    expect(screen.getByText(mockCharacter.gender)).toBeInTheDocument()

    expect(screen.getByText('Origin')).toBeInTheDocument()
    expect(screen.getByText(mockCharacter.origin.name)).toBeInTheDocument()

    expect(screen.getByText(mockEpisode.name)).toBeInTheDocument()
    expect(screen.getByText(mockEpisode.episode)).toBeInTheDocument()

    const characterImage = screen.getByAltText(
      `Avatar of ${mockCharacter.name}`
    ) as HTMLImageElement
    expect(characterImage).toBeInTheDocument()
  })
})
