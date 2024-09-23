import styles from './Pagination.module.scss'

interface PaginationProps {
  currentPage: number
  totalPages: number
  isLoading: boolean
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  isLoading,
  onPageChange,
}: PaginationProps) {
  const handlePageChange = (page: number) => {
    if (!isLoading) {
      onPageChange(page)
    }
  }

  const isPreviousDisabled = currentPage === 1 || isLoading
  const isNextDisabled = currentPage === totalPages || isLoading
  const handlePreviousPage = () => {
    if (!isPreviousDisabled) {
      handlePageChange(currentPage - 1)
    }
  }
  const handleNextPage = () => {
    if (!isNextDisabled) {
      handlePageChange(currentPage + 1)
    }
  }

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        disabled={isPreviousDisabled}
        onClick={handlePreviousPage}
        aria-label="Go to previous page"
      >
        Previous
      </button>
      <span
        aria-current="page"
        aria-label={`Page ${currentPage} of ${totalPages}`}
      >
        {currentPage} <span aria-hidden="true">/</span> {totalPages}
      </span>
      <button
        disabled={isNextDisabled}
        onClick={handleNextPage}
        aria-label="Go to next page"
      >
        Next
      </button>
    </nav>
  )
}
