'use client'

import { useAtom } from 'jotai'

import { filterAtom } from '@atoms'

export function Filters() {
  const [filter, setFilter] = useAtom(filterAtom)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }

  return (
    <div>
      Filters:
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
        name="species"
        type="text"
        placeholder="Species"
        value={filter.species}
        onChange={handleChange}
      />
      <input
        name="type"
        type="text"
        placeholder="Type"
        value={filter.type}
        onChange={handleChange}
      />
      <input
        name="gender"
        type="text"
        placeholder="Gender"
        value={filter.gender}
        onChange={handleChange}
      />
      <input
        name="origin"
        type="text"
        placeholder="Origin"
        value={filter.origin}
        onChange={handleChange}
      />
    </div>
  )
}
