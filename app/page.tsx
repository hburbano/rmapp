import styles from './page.module.scss'

import { CharacterList } from '@components/CharacterList'
import { Filters } from '@components/Filters'

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Filters />
        <CharacterList />
      </main>
      <footer className={styles.footer}>
        <p>Rick and Morty - API Example - 2024</p>
      </footer>
    </>
  )
}
