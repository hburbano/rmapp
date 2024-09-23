import cc from 'classcat'

import styles from './Toggle.module.scss'

interface ToggleProps {
  id: string
  checked?: boolean
  onChange?: () => void
  checkedIcon?: React.ReactNode
  uncheckedIcon?: React.ReactNode
}

export function Toggle({
  checked,
  onChange,
  id,
  checkedIcon,
  uncheckedIcon,
}: ToggleProps) {
  return (
    <label className={styles.switch} htmlFor={id}>
      <input type="checkbox" id={id} onChange={onChange} checked={checked} />
      <span className={cc([styles.slider, styles.round])}>
        {checked ? checkedIcon || undefined : uncheckedIcon || undefined}
      </span>
    </label>
  )
}
