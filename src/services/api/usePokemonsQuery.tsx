/**
 * @format
 * @jsxImportSource @emotion/react
 */

import React, { useEffect } from "react";
import { useState } from "react";
import { QueryFunction, useQuery } from "react-query";
import { IPokemonDto } from "types/IPokemonDto";

import { getApiInstance } from "./getApiInstance";
import { getApiInstanceNoUrl } from "./getApiInstanceNoUrl";
import { useField, useFormikContext } from "formik";

/** @jsxImportSource @emotion/react */
interface IResults {
  name: string;
  url: string;
}

export const usePokemonsQuerry: QueryFunction<any> = async ({ queryKey }) => {
  const [_key, { page, searchedText, generation }] = queryKey as [
    string,
    {
      page: number;
      searchedText: string;
      generation: string;
    },
  ];

  const searchPokemons = async (searchText: string) => {
    let returnArray: any[] = [];
    const searchedPokemon = await getApiInstance().get<any>(
      `/pokemon/${searchText}`,
    );
    returnArray.push(searchedPokemon);

    return returnArray;
  };

  const searchPokemons2 = async (searchText: string) => {
    return await getApiInstance().get<any>(`/pokemon/${searchText}`);
  };

  if (searchedText) {
    const response = searchPokemons(searchedText);

    return response;
  }
  console.log(generation);

  const getGeneration = (generation: string) => {
    console.log(`generation/${generation}`);
    return getApiInstance().get(
      `generation/${generation as unknown as number}`,
    );
  };

  const getPokemons = (page: number) => {
    return getApiInstance().get(`/pokemon?limit=10&offset=${page}`);
  };

  const getTypeFn = (type: string) => {
    return getApiInstance().get(`/type/${type}`);
  };

  const convertPokemonsCall = (pokemonUrl: string) => {
    return getApiInstanceNoUrl().get<any>(pokemonUrl);
  };

  const convertPokemons = async (pokemonList: any) => {
    let pokemonsArrayScope: any[] = [];
    const pokemonsBefore = pokemonList;

    const firstResponse = await pokemonsBefore.data.results.map(
      async (pokemon: IResults) => {
        const pokemonAfter = await convertPokemonsCall(pokemon.url);

        pokemonsArrayScope.push(pokemonAfter);
      },
    );

    await Promise.all(firstResponse);

    return pokemonsArrayScope;
  };

  const convertPokemonsType = async (pokemonList: any) => {
    let pokemonsArrayScope: any[] = [];
    const pokemonsBefore = pokemonList;

    const firstResponse = await pokemonsBefore.data.pokemon.map(
      async (pokemon: IResults) => {
        const pokemonAfter = convertPokemonsCall(pokemon.url);
        pokemonsArrayScope.push(pokemonAfter);
      },
    );

    await Promise.all(firstResponse);

    return pokemonsArrayScope;
  };

  const convertGeneration2 = async (pokemonList: IResults[]) => {
    let pokemonsArrayScope: any[] = [];

    for (const pokemon of pokemonList) {
      try {
        const pokemonAfter = await searchPokemons2(pokemon.name as string);
        pokemonsArrayScope.push(pokemonAfter);
      } catch (err) {
        // Skip the iteration and do not add null to the array
        continue;
      }
    }

    return pokemonsArrayScope;
  };

  if (generation) {
    const firstResponse = await getGeneration(generation);
    const secondResponse = await convertGeneration2(
      firstResponse.data.pokemon_species,
    );
    const array = secondResponse.slice(0, 10);

    return array;
  }

  const pokemonsListBefore = await getPokemons(page);

  const response: Promise<any[]> = convertPokemons(pokemonsListBefore);

  return await response;
};

export const usePokemonsQuery = (
  generation = "",
  page = 1,
  searchedText = "",
) => {
  return useQuery<Array<IPokemonDto>>(
    ["Pokemons", { page, searchedText, generation }],
    usePokemonsQuerry,
  );
};

// const convertGeneration = async (pokemonList: any) => {
//   let pokemonsArrayScope: any[] = [];
//   const pokemonsBefore = pokemonList;

//   console.log(pokemonList[0].url);

//   const firstResponse = await pokemonsBefore.map(
//     async (pokemon: IResults) => {
//       const pokemonAfter = await convertPokemonsCall(pokemon.url as string);

//       pokemonsArrayScope.push(pokemonAfter);
//     },
//   );
//   await Promise.all(firstResponse);

//   const pokemonsResponse = await pokemonList.map(
//     async (pokemon: IResults) => {
//       const pokemonAfter = await searchPokemons2(pokemon.name as string);

//       pokemonsArrayScope.push(pokemonAfter);
//     },
//   );

//   return pokemonsArrayScope;
// };
// pokemonList.map(async (pokemon: IResults) => {
//   const pokemonAfter = await searchPokemons2(pokemon.name as string);
//   console.log(pokemonAfter);
//   pokemonsArrayScope.push(pokemonAfter);
// });
