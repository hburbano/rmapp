import Link from 'next/link'
import styles from './CharacterLink.module.css'
import { StarIcon } from '@radix-ui/react-icons'
import cc from 'classcat'

export function CharacterLink({
  character,
  isFavorite,
  toggleFavorite,
}: {
  character: Character
  isFavorite: boolean
  toggleFavorite: (characterId: string) => void
}) {
  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggleFavorite(character.id)
  }

  return (
    <li className={styles.listItem}>
      <Link href={`/character/${character.id}`} className={styles.link}>
        <div className={styles.characterCard}>
          <img
            src={character.image}
            alt={character.name}
            width={100}
            height={100}
            className={styles.characterImage}
          />
          <p className={styles.characterName}>{character.name}</p>
          <p className={styles.episodeName}>
            Episode: {character?.episode?.[0]?.name || 'Unknown'}
          </p>
        </div>
      </Link>
      <button className={styles.favoriteButton} onClick={handleToggleFavorite}>
        <StarIcon
          className={cc([styles.favoriteIcon, isFavorite && styles.isFavorite])}
        />
      </button>
    </li>
  )
}
