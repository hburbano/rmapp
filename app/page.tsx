import styles from './page.module.scss'

import { CharacterList } from '@components/CharacterList'
import { Filters } from '@components/Filters'

export default function Home() {
  return (
    <main className={styles.main}>
      <Filters />
      <CharacterList />
    </main>
  )
}
