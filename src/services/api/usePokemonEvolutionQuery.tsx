/** @format */

import { QueryFunction, useQuery } from "react-query";
import { IPokemonChainDto } from "types/IPokemonChainDto";

import { getApiInstance } from "./getApiInstance";
import { iPokemonEvolveDto } from "types/IPokemonEvolveDto";

export const getPokemonEvolutionQuery: QueryFunction<iPokemonEvolveDto> = async ({
  queryKey,
}) => {
  const [_key, id] = queryKey as [string, string];

  const species = await getApiInstance().get(`/pokemon-species/${id}`);

  const response = await getApiInstance().get(
    species.data.evolution_chain.url.slice(26, -1),
  );

  return response;
};

export const usePokemonEvolution = (id: number) => {
  return useQuery<iPokemonEvolveDto>(["pokemonEvolutions", id], getPokemonEvolutionQuery);
};
