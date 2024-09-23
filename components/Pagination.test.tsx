import { expect, test, describe, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Pagination } from './Pagination'

test('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    isLoading: false,
    onPageChange: vi.fn(),
  }

  describe('when current page is first page', () => {
    it('should render all controls button', () => {
      render(<Pagination {...defaultProps} />)
      expect(screen.getByText('Previous')).toBeDefined()
      expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled()
      expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled()
      expect(
        screen.getByText(defaultProps.currentPage.toString())
      ).toBeDefined()
    })
  })

  describe('when current page is last page', () => {
    it('should render all controls button', () => {
      render(<Pagination {...defaultProps} currentPage={10} />)
      expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled()
      expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled()
      expect(
        screen.getByText(defaultProps.currentPage.toString())
      ).toBeDefined()
    })
  })

  describe('when current page is not first/last page', () => {
    it('should render all controls button', () => {
      render(<Pagination {...defaultProps} currentPage={2} />)
      expect(screen.getByText('Previous')).toBeDefined()
      expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled()
      expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled()
      expect(
        screen.getByText(defaultProps.currentPage.toString())
      ).toBeDefined()
    })
  })
})
