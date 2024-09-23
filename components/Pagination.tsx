import styles from './Pagination.module.scss'

export function Pagination({
  currentPage,
  totalPages,
  isLoading,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  isLoading: boolean
  onPageChange: (page: number) => void
}) {
  const handlePageChange = (page: number) => {
    if (!isLoading) {
      onPageChange(page)
    }
  }

  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage === 1 || isLoading}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages || isLoading}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  )
}
