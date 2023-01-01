/** @jsxImportSource @emotion/react */
import React from "react";
import { useState } from "react";
import { QueryFunction, useQuery } from "react-query";
import { IPokemonDto } from "types/IPokemonDto";

import { getApiInstance } from "./getApiInstance";
import { getApiInstanceNoUrl } from "./getApiInstanceNoUrl";

interface IResults {
	name: string;
	url: string;
}

export const usePokemonsQuerry: QueryFunction<any> = async ({ queryKey }) => {
	const getPokemons = () => {
		return getApiInstance().get(`/pokemon?limit=50&offset=0`);
	};

	const convertPokemonsCall = (pokemonUrl: string) => {
		return getApiInstanceNoUrl().get<any>(pokemonUrl);
	};

	const convertPokemons = async () => {
		let pokemonsArrayScope: any[] = [];
		const pokemonsBefore = await getPokemons();

		const firstResponse = await pokemonsBefore.data.results.map(
			async (pokemon: IResults) => {
				const pokemonAfter = await convertPokemonsCall(pokemon.url);
				console.log(pokemonAfter);
				pokemonsArrayScope.push(pokemonAfter);
			}
		);
		console.log(await Promise.all(firstResponse));
		console.log(pokemonsArrayScope);
		return pokemonsArrayScope;
	};

	const response: Promise<any[]> = convertPokemons();

	return await response;
};

export const usePokemonsQuery = (options: any = {}) => {
	return useQuery<Array<IPokemonDto>>("Pokemons", usePokemonsQuerry, {
		...options,
	});
};
