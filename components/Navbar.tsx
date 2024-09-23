'use client'

import { useAtom } from 'jotai'
import Link from 'next/link'
import { useEffect } from 'react'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

import styles from './Navbar.module.scss'

import { colorSchemeAtom } from '@atoms'
import { Toggle } from '@components/ui/Toggle'

export function Navbar() {
  // Use the atom's state and update function
  const [colorScheme, setColorScheme] = useAtom(colorSchemeAtom)

  // Function to toggle between light and dark themes
  const toggleColorScheme = () => {
    setColorScheme((prevScheme) => (prevScheme === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorScheme)
  }, [colorScheme])

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <h1>Rick and Morty</h1>
      </Link>
      <Toggle
        id="theme-switch"
        checked={colorScheme === 'dark'}
        onChange={toggleColorScheme}
        checkedIcon={<MoonIcon />}
        uncheckedIcon={<SunIcon />}
      />
    </nav>
  )
}
