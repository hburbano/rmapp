import { getClient } from "@/graphql/client";

export const useGraphql = () => {
  return getClient();
};
