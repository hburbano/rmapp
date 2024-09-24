import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Filters } from './Filters'

describe('Filter', () => {
  it('should render filters for name, status, and gender', () => {
    const { getByLabelText, getAllByRole } = render(<Filters />)

    // Check for name input
    expect(getByLabelText('Filter by character name')).toBeInTheDocument()

    // Check for status select
    const statusSelect = getByLabelText('Filter by character status')
    expect(statusSelect).toBeInTheDocument()
    const statusOptions = statusSelect.querySelectorAll('option')
    expect(statusOptions).toHaveLength(4) // Including the default "Select Status" option
    const expectedOptions = ['Select Status', 'Alive', 'Dead', 'unknown']
    expectedOptions.forEach((option, index) => {
      expect(statusOptions[index]).toHaveTextContent(option)
    })

    // Check for gender select
    const genderSelect = getByLabelText('Filter by character gender')
    expect(genderSelect).toBeInTheDocument()
    const genderOptions = genderSelect.querySelectorAll('option')
    expect(genderOptions).toHaveLength(5) // Including the default "Select Gender" option
    const expectedGenderOptions = [
      'Select Gender',
      'Female',
      'Male',
      'Genderless',
      'unknown',
    ]
    expectedGenderOptions.forEach((option, index) => {
      expect(genderOptions[index]).toHaveTextContent(option)
    })
  })

  it('should update filter state when inputs change', async () => {
    const { getByLabelText } = render(<Filters />)
    const nameInput = getByLabelText('Filter by character name')
    const statusSelect = getByLabelText('Filter by character status')
    const genderSelect = getByLabelText('Filter by character gender')

    await userEvent.type(nameInput, 'Rick')
    await userEvent.selectOptions(statusSelect, 'Alive')
    await userEvent.selectOptions(genderSelect, 'Male')

    expect(nameInput).toHaveValue('Rick')
    expect(statusSelect).toHaveValue('Alive')
    expect(genderSelect).toHaveValue('Male')
  })
})
