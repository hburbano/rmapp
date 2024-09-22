"use client";

import { useAtom } from "jotai";
import Link from "next/link";
import { useQuery } from "@urql/next";
import { gql } from "@urql/core";
import { filterAtom } from "@/atoms";
import ClientLayout from "@/app/client/ClientLayout";

export function CharacterList() {
  const [filter] = useAtom(filterAtom);

  const [{ data }] = useQuery({
    query: gql`
      query {
        characters {
          id
          name
        }
      }
    `,
  });

  const characters = data?.characters;

  return (
    <div>
      <h1>Character List {JSON.stringify(filter)}</h1>
      {characters.map((character: Character) => (
        <Link href={`/character/${character.id}`} key={character.id}>
          {character.name}
        </Link>
      ))}
    </div>
  );
}

CharacterList.getLayout = (page: React.ReactNode) => (
  <ClientLayout>{page}</ClientLayout>
);
