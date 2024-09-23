import React from 'react'
import Image from 'next/image'

import styles from './page.module.css'

import GET_CHARACTERS from '@graphql/queries/characters.gql'
import { getClient } from '@graphql/client'

type Params = {
  id: string
}

export async function generateMetadata({ params }: { params: Params }) {
  const result = await getClient().query(GET_CHARACTERS.GetCharacter, {
    id: params.id,
  })
  const character = result.data.character
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
  const result = await getClient().query(GET_CHARACTERS.GetCharacter, {
    id: params.id,
  })
  const character: Character = result.data.character

  return (
    <main className={styles.main}>
      <div className={styles.details}>
        <h1 className={styles.name}>{character.name}</h1>
        <ul className={styles.list}>
          <li>
            <strong>Status:</strong> {character.status}
          </li>
          <li>
            <strong>Species:</strong> {character.species}
          </li>
          <li>
            <strong>Type:</strong> {character.type || 'N/A'}
          </li>
          <li>
            <strong>Gender:</strong> {character.gender}
          </li>
          <li>
            <strong>Origin:</strong> {character.origin.name}
          </li>
        </ul>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={character.image}
          alt={character.name}
          className={styles.image}
        />
      </div>
    </main>
  )
}
