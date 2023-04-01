/** @format */

import { QueryFunction, useQuery } from "react-query";
import { IPokemonChainDto } from "types/IPokemonChainDto";

import { getApiInstance } from "./getApiInstance";

export const getPokemonEvolutionQuery: QueryFunction<any> = async ({
  queryKey,
}) => {
  const [_key, id] = queryKey as [string, number];

  const species = await getApiInstance().get(`/pokemon-species/${id}`);

  const response = await getApiInstance().get(
    species.data.evolution_chain.url.slice(26, -1),
  );

  return response;
};

export const usePokemonEvolution = (id: number) => {
  return useQuery<IPokemonChainDto>(
    ["pokemonEvolutions", id],
    getPokemonEvolutionQuery,
  );
};
