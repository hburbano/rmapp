import styles from './page.module.css'

import { CharacterList } from '@components/CharacterList'
import { Filters } from '@components/Filters'

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Filters />
        <CharacterList />
      </main>
      <footer className={styles.footer}>
        <p>Rick and Morty - GraphQL Example - 2024</p>
      </footer>
    </div>
  )
}
