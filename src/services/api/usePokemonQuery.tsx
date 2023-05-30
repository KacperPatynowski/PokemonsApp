/** @format */

import { QueryFunction, useQuery } from "react-query";
import { IPokemonChainDto } from "types/IPokemonChainDto";

import { getApiInstance } from "./getApiInstance";
import { IPokemonDto } from "types/IPokemonDto";

export const getPokemonEvolutionQuery2: QueryFunction<any> = async ({
  queryKey,
}) => {
  const [_key, pokemonName] = queryKey as [string, string];

  const response = await getApiInstance().get(`/pokemon/${pokemonName}`);

  return response;
};

export const usePokemonQuery = (pokemonName: string) => {
  return useQuery<IPokemonDto>(
    ["pokemonEvolutions", pokemonName],
    getPokemonEvolutionQuery2,
  );
};
