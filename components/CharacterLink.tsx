import Link from 'next/link'
import styles from './CharacterLink.module.scss'
import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons'
import cc from 'classcat'
import Image from 'next/image'

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
          <Image
            src={character.image}
            alt={character.name}
            width={100}
            height={100}
            className={styles.characterImage}
          />
          <p className={styles.characterName}>{character.name}</p>
          <p className={styles.details}>
            Status: {character?.status || 'Unknown'}
          </p>
        </div>
      </Link>
      <button
        onClick={handleToggleFavorite}
        aria-label={`add ${character.name} to favorites`}
        className={cc([styles.favoriteButton, isFavorite && styles.isFavorite])}
      >
        {isFavorite ? (
          <HeartFilledIcon data-testid="heart-filled-icon" />
        ) : (
          <HeartIcon data-testid="heart-icon" />
        )}
      </button>
    </li>
  )
}
