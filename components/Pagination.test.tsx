import { render, screen } from '@testing-library/react'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    isLoading: false,
    onPageChange: vi.fn(),
  }

  // This should be in a i18n file and should be the source of truth to both the test and the component
  const labels = {
    previous: 'Go to previous page',
    next: 'Go to next page',
    page: 'Page',
  }

  const renderPagination = (props = {}) => {
    render(<Pagination {...defaultProps} {...props} />)
  }

  const expectCommonElements = (currentPage: number) => {
    expect(
      screen.getByRole('button', { name: labels.previous })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: labels.next })
    ).toBeInTheDocument()
  }

  describe('when current page is first page', () => {
    it('should render all controls button', () => {
      renderPagination()
      expectCommonElements(defaultProps.currentPage)
      expect(
        screen.getByRole('button', { name: labels.previous })
      ).toBeDisabled()
      expect(
        screen.getByRole('button', { name: labels.next })
      ).not.toBeDisabled()
    })
  })

  describe('when current page is last page', () => {
    it('should render all controls button ', () => {
      renderPagination({ currentPage: 10 })
      expectCommonElements(10)
      expect(
        screen.getByRole('button', { name: labels.previous })
      ).not.toBeDisabled()
      expect(screen.getByRole('button', { name: labels.next })).toBeDisabled()
    })
  })

  describe('when current page is not first/last page', () => {
    it('should render all controls button', () => {
      renderPagination({ currentPage: 2 })
      expectCommonElements(2)
      expect(
        screen.getByRole('button', { name: labels.previous })
      ).not.toBeDisabled()
      expect(
        screen.getByRole('button', { name: labels.next })
      ).not.toBeDisabled()
    })
  })
})
