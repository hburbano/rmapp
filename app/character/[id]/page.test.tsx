import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import CharacterDetails from './page'

beforeAll(() => {
  vi.mock('react', async (importOriginal) => {
    const testCache = <T extends (...args: Array<unknown>) => unknown>(
      func: T
    ) => func
    const originalModule = await importOriginal<typeof import('react')>()
    return {
      ...originalModule,
      cache: testCache,
    }
  })
})

describe('CharacterDetails', () => {
  it('should display character details', async () => {
    render(await CharacterDetails({ params: { id: '1' } }))

    expect(screen.getByText('This is a test')).toBeInTheDocument()
  })
})
