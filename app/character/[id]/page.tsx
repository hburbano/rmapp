import React from "react";
import GET_CHARACTERS from "@graphql/queries/characters.gql";
import { getClient } from "@graphql/client";
import styles from "./page.module.css";

type Params = {
  id: string;
};

export async function generateMetadata({ params }: { params: Params }) {
  const result = await getClient().query(GET_CHARACTERS.GetCharacter, {
    id: params.id,
  });
  const character = result.data.character;
  return {
    title: `${character.name} - Rick and Morty App`,
    description: `Character details for ${character.name}`,
    openGraph: {
      images: [character.image],
    },
  };
}

export default async function CharacterDetails({ params }: { params: Params }) {
  const result = await getClient().query(GET_CHARACTERS.GetCharacter, {
    id: params.id,
  });
  const character: Character = result.data.character;

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
            <strong>Type:</strong> {character.type || "N/A"}
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
        <img
          src={character.image}
          alt={character.name}
          className={styles.image}
        />
      </div>
    </main>
  );
}
