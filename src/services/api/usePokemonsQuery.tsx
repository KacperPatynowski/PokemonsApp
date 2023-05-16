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

  if (searchedText) {
    const response = searchPokemons(searchedText);

    return response;
  }
  console.log(generation);

  // if(generation){
  //   const response =
  // }

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
        const pokemonAfter = await convertPokemonsCall(pokemon.url);
        pokemonsArrayScope.push(pokemonAfter);
      },
    );

    await Promise.all(firstResponse);

    return pokemonsArrayScope;
  };

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
