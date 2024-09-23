'use client'

import { useAtom } from 'jotai'

import styles from './Filters.module.scss'

import { filterAtom } from '@atoms'

export function Filters() {
  const [filter, setFilter] = useAtom(filterAtom)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }

  return (
    <div className={styles.container}>
      <span>Filters:</span>
      <div className={styles.filters}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={filter.name}
          onChange={handleChange}
        />
        <input
          name="status"
          type="text"
          placeholder="Status"
          value={filter.status}
          onChange={handleChange}
        />
        <input
          name="gender"
          type="text"
          placeholder="Gender"
          value={filter.gender}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
