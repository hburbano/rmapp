import { render, waitFor } from '@testing-library/react'
import { CharacterList, SKELETON_COUNT } from './CharacterList'
import { Providers } from '@app/providers'
import { http, HttpResponse } from 'msw'
import { server } from '@test/setup'
import { mockCharacter } from '@test/mocks/handlers'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Providers>{children}</Providers>
)

describe('CharacterList', () => {
  it('should render', () => {
    const { getByTestId } = render(<CharacterList />, { wrapper })

    // Check if the character list container is rendered
    expect(getByTestId('character-list')).toBeInTheDocument()

    // Check if the title is rendered
    expect(getByTestId('character-list').querySelector('h2')).toHaveTextContent(
      'Character List'
    )

    // Check if the pagination component is rendered
    expect(getByTestId('pagination')).toBeInTheDocument()
  })

  it('should render skeletons when loading', () => {
    const { getAllByTestId } = render(<CharacterList />, { wrapper })
    const skeletons = getAllByTestId('character-skeleton')
    expect(skeletons.length).toBe(SKELETON_COUNT)
  })

  it('should render characters', async () => {
    const { getByText, getByTestId } = render(<CharacterList />, { wrapper })
    await waitFor(() => {
      expect(getByTestId('character-list')).toBeInTheDocument()
    })
    waitFor(() => {
      expect(getByText(mockCharacter.name)).toBeInTheDocument()
    })
  })

  it('should render empty notice when no characters are found', async () => {
    const { getByText, getByTestId } = render(<CharacterList />, { wrapper })
    // Mock the API response to return an empty list of characters
    const mockEmptyResponse = {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      results: [],
    }

    // Override the default handler for this specific test
    server.use(
      http.get('https://rickandmortyapi.com/api/character', () => {
        return HttpResponse.json(mockEmptyResponse)
      })
    )

    // Wait for the component to finish loading
    await waitFor(() => {
      expect(getByTestId('character-list')).toBeInTheDocument()
    })

    waitFor(() => {
      expect(
        getByText('No characters found for the provided search parameters.')
      ).toBeInTheDocument()
    })
  })
})
