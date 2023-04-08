/**
 * @format
 * @jsxImportSource @emotion/react
 */

import { QueryFunction, useQuery } from "react-query";
import { IPokemonDto } from "types/IPokemonDto";

import { getApiInstance } from "./getApiInstance";

export const getPokemonsStatsFN: QueryFunction<any> = async ({ queryKey }) => {
  const [_key, { pokemonsNames }] = queryKey as [
    string,
    {
      pokemonsNames: Array<string>;
    },
  ];

  const getPokemons = (pokemonName: string) => {
    if (pokemonName !== "") {
      return getApiInstance().get(`/pokemon/${pokemonName}`);
    } else return;
  };

  const response = await Promise.all(
    pokemonsNames.map((pokemonName) => getPokemons(pokemonName)),
  );
  console.log(response);
  return response;
};

export const usePokemonsStatsQuery = (pokemonsNames: Array<string>) => {
  return useQuery<Array<IPokemonDto>>(
    ["Pokemons", { pokemonsNames }],
    getPokemonsStatsFN,
  );
};
