import React from "react";
import { useState } from "react";
import { QueryFunction, useQuery } from "react-query";
import { IPokemonDto } from "types/IPokemonDto";

import { getApiInstance } from "./getApiInstance";
import { getApiInstance2 } from "./getApiInstance2";

/** @jsxImportSource @emotion/react */
interface IResults {
	name: string;
	url: string;
}

export const usePokemonsQuerry: QueryFunction<any> = async ({ queryKey }) => {
	const [_key, { page, searchedText }] = queryKey as [
		string,
		{
			page: number;
			searchedText: string;
		}
	];
	console.log(page);

	const searchPokemons = async (searchText: string) => {
		let returnArray: any[] = [];
		const searchedPokemon = await getApiInstance().get<any>(
			`/pokemon/${searchedText}`
		);
		returnArray.push(searchedPokemon);
		console.log(returnArray);
		return returnArray;
	};

	//usunac funcje zeby zapytania robic prosto do apiInstance
	const getPokemons = (page: number) => {
		return getApiInstance().get(`/pokemon?limit=50&offset=${page}`);
	};

	const convertPokemonsCall = (pokemonUrl: string) => {
		return getApiInstance2().get<any>(pokemonUrl);
	};

	const convertPokemons = async () => {
		let pokemonsArrayScope: any[] = [];
		const pokemonsBefore = await getPokemons(page);

		const firstResponse = await pokemonsBefore.data.results.map(
			async (pokemon: IResults) => {
				const pokemonAfter = await convertPokemonsCall(pokemon.url);
				pokemonsArrayScope.push(pokemonAfter);
			}
		);

		await Promise.all(firstResponse);

		return pokemonsArrayScope;
	};

	if (searchedText) {
		const response = searchPokemons(searchedText);
		return response;
	}

	const response: Promise<any[]> = convertPokemons();

	return await response;
};

export const usePokemonsQuery = (page = 0, searchedText = "") => {
	return useQuery<Array<IPokemonDto>>(
		["Pokemons", { page, searchedText }],
		usePokemonsQuerry
	);
};
