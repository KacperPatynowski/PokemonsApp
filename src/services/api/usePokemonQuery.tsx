/** @format */

import { QueryFunction, useQuery } from "react-query";
import { IPokemonChainDto } from "types/IPokemonChainDto";

import { getApiInstance } from "./getApiInstance";

export const getPokemonEvolutionQuery2: QueryFunction<any> = async ({
  queryKey,
}) => {
  const [_key, pokemonName] = queryKey as [string, string];

  const species = await getApiInstance().get(`/pokemon/${pokemonName}`);

  const response = await getApiInstance().get(
    species.data.evolution_chain.url.slice(26, -1),
  );

  return response;
};

export const usePokemonQuery = (pokemonName: string) => {
  return useQuery<IPokemonChainDto>(
    ["pokemonEvolutions", pokemonName],
    getPokemonEvolutionQuery2,
  );
};
