/**
 * @format
 * @jsxImportSource @emotion/react
 */

import { QueryFunction, useQuery } from "react-query";
import { IPokemonDto } from "types/IPokemonDto";

import { getApiInstance } from "./getApiInstance";

export const getPokemonsStatsByName: QueryFunction<any> = async ({
  queryKey,
}) => {
  const [_key, { pokemonsNames }] = queryKey as [
    string,
    {
      pokemonsNames: number;
    }
  ];


  const response = await getApiInstance().get(`/pokemon/${pokemonsNames}`);

  return response;
};

export const usePokemonsStatsQueryByName = (pokemonsNames: number) => {
  return useQuery<number>(
    ["Pokemons", { pokemonsNames }],
    getPokemonsStatsByName
  );
};
