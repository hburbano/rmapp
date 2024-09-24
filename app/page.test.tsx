import { render } from '@testing-library/react'
import Home from './page'
import { Providers } from './providers'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Providers>{children}</Providers>
)

describe('Home', () => {
  it('should render page with elements', () => {
    const { getByTestId } = render(<Home />, { wrapper })

    expect(getByTestId('filters')).toBeInTheDocument()
    expect(getByTestId('character-list')).toBeInTheDocument()
  })
})
