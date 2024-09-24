import React from 'react'
import Image from 'next/image'

import styles from './page.module.scss'
import { fetchCharacter, fetchEpisode } from '@hooks'

type Params = {
  id: string
}

export async function generateMetadata({ params }: { params: Params }) {
  const character = await fetchCharacter(params.id)
  return {
    title: `${character.name} | Rick and Morty Character | Rick and Morty App`,
    description: `Learn about ${character.name}, a ${character.species} character from Rick and Morty. Status: ${character.status}. Origin: ${character.origin.name}.`,
    openGraph: {
      title: `${character.name} - Rick and Morty Character Profile`,
      description: `Explore ${character.name}'s profile: ${character.species} from ${character.origin.name}. Current status: ${character.status}.`,
      images: [
        { url: character.image, alt: `${character.name} from Rick and Morty` },
      ],
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${character.name} | Rick and Morty Character`,
      description: `${character.name}: ${character.species} from ${character.origin.name}. Status: ${character.status}. Explore now!`,
      images: [
        { url: character.image, alt: `${character.name} from Rick and Morty` },
      ],
    },
  }
}

export default async function CharacterDetails({ params }: { params: Params }) {
  const character = await fetchCharacter(params.id)
  const episode = await fetchEpisode(
    character.episode[0].split('/').pop() || ''
  )
  return (
    <main className={styles.main}>
      <div className={styles.details}>
        <h1 className={styles.name}>{character.name}</h1>
        <dl className={styles.list}>
          <dt>Status</dt>
          <dd>{character.status}</dd>
          <dt>Species</dt>
          <dd>{character.species}</dd>
          <dt>Type</dt>
          <dd>{character.type || 'N/A'}</dd>
          <dt>Gender</dt>
          <dd>{character.gender}</dd>
          <dt>Origin</dt>
          <dd>{character.origin.name}</dd>
          <dt>Location</dt>
          <dd>{character.location.name}</dd>
          <dt>Featured Episode</dt>
          <dd>
            <span>{episode.name}</span> ~ <span>{episode.episode}</span>
          </dd>
          <dt>Total Episodes</dt>
          <dd>{character.episode.length}</dd>
        </dl>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={character.image}
          alt={`Avatar of ${character.name}`}
          className={styles.image}
          width={300}
          height={300}
        />
      </div>
    </main>
  )
}
