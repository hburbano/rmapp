import Image from 'next/image'
import styles from './CharacterSkeleton.module.scss'
import skeletonImage from '../public/place_no_bg.png'

export function CharacterSkeleton() {
  return (
    <li className={styles.skeleton}>
      <div className={styles.characterCard}>
        <Image src={skeletonImage} alt="skeleton" width={100} height={100} />
        <p className={styles.characterName}>----</p>
        <p className={styles.episodeName}>-----</p>
      </div>
    </li>
  )
}
