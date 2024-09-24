'use client'

import { useAtom } from 'jotai'
import styles from './Filters.module.scss'
import { filterAtom } from '@atoms'

const statuses = ['Alive', 'Dead', 'unknown']
const genders = ['Female', 'Male', 'Genderless', 'unknown']

export function Filters() {
  const [filter, setFilter] = useAtom(filterAtom)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }

  return (
    <div
      data-testid="filters"
      className={styles.container}
      role="region"
      aria-label="Character Filters"
    >
      <div className={styles.filters}>
        <label htmlFor="name-filter">
          <span className={styles.visuallyHidden}>Filter by Name</span>
          <input
            id="name-filter"
            name="name"
            type="text"
            placeholder="Filter by Name"
            value={filter.name}
            onChange={handleChange}
            aria-label="Filter by character name"
          />
        </label>
        <label htmlFor="status-filter">
          <span className={styles.visuallyHidden}>Filter by Status</span>
          <div className={styles.selectContainer}>
            <select
              id="status-filter"
              name="status"
              value={filter.status}
              onChange={handleChange}
              aria-label="Filter by character status"
            >
              <option value="">Select Status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </label>
        <label htmlFor="gender-filter">
          <span className={styles.visuallyHidden}>Filter by Gender</span>
          <div className={styles.selectContainer}>
            <select
              id="gender-filter"
              name="gender"
              value={filter.gender}
              onChange={handleChange}
              aria-label="Filter by character gender"
            >
              <option value="">Select Gender</option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>
        </label>
      </div>
    </div>
  )
}
