import { render, fireEvent, getByTestId } from '@testing-library/react'
import { CharacterLink } from '@components/CharacterLink'
import { mockCharacter } from '@test/mocks/handlers'
import exp from 'constants'

const props = {
  character: mockCharacter,
  isFavorite: false,
  toggleFavorite: vi.fn(),
}

describe('CharacterLink', () => {
  it('should render character details', () => {
    const { getByText, getByAltText } = render(<CharacterLink {...props} />)

    expect(getByText(mockCharacter.name)).toBeInTheDocument()

    expect(getByText(`Status: ${mockCharacter.status}`)).toBeInTheDocument()

    const characterImage = getByAltText(mockCharacter.name) as HTMLImageElement
    expect(characterImage).toBeInTheDocument()
    expect(characterImage.src).toContain(
      encodeURIComponent(mockCharacter.image)
    )
  })

  it('should call toggleFavorite when the favorite button is clicked', () => {
    const { getByRole, getByTestId } = render(<CharacterLink {...props} />)

    expect(getByTestId('heart-icon')).toBeInTheDocument()

    const favoriteButton = getByRole('button', {
      name: `add ${mockCharacter.name} to favorites`,
    })
    fireEvent.click(favoriteButton)

    expect(props.toggleFavorite).toHaveBeenCalledWith(mockCharacter.id)
  })

  it('should render the heart-filled icon when the character is a favorite', () => {
    const { getByTestId } = render(
      <CharacterLink {...props} isFavorite={true} />
    )

    expect(getByTestId('heart-filled-icona')).toBeInTheDocument()
  })
})
