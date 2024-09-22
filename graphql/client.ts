import { registerUrql } from "@urql/next/rsc";
import { cacheExchange, createClient, fetchExchange } from "urql";

export const API_URL = "https://rickandmortyapi.com/graphql";

const makeClient = () => {
  return createClient({
    url: API_URL,
    exchanges: [cacheExchange, fetchExchange],
  });
};

export const { getClient } = registerUrql(makeClient);
