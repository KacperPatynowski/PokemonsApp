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
	const [_key, { page, searchedText, regionFilter, typeFilter }] = queryKey as [
		string,
		{
			page: number;
			searchedText: string;
			regionFilter: number;
			typeFilter: string;
		}
	];
	console.log(page);

	const searchPokemons = async (searchText: string) => {
		let returnArray: any[] = [];
		const searchedPokemon = await getApiInstance().get<any>(
			`/pokemon/${searchedText}`
		);
		returnArray.push(searchedPokemon);
		console.log(searchedPokemon);
		return returnArray;
	};

	//usunac funcje zeby zapytania robic prosto do apiInstance
	const getPokemons = (page: number) => {
		return getApiInstance().get(`/pokemon?limit=50&offset=${page}`);
	};

	const getTypeFn = (type: string) => {
		return getApiInstance().get(`/type/${type}`);
	};

	const convertPokemonsCall = (pokemonUrl: string) => {
		return getApiInstance2().get<any>(pokemonUrl);
	};

	const convertPokemons = async (pokemonList: any) => {
		console.log(pokemonList);
		let pokemonsArrayScope: any[] = [];
		const pokemonsBefore = pokemonList;

		const firstResponse = await pokemonsBefore.data.results.map(
			async (pokemon: IResults) => {
				const pokemonAfter = await convertPokemonsCall(pokemon.url);
				pokemonsArrayScope.push(pokemonAfter);
			}
		);

		await Promise.all(firstResponse);

		return pokemonsArrayScope;
	};

	// const convertPokemonsType = async (pokemonList: any) => {
	// 	let pokemonsArrayScope: any[] = [];
	// 	const pokemonsBefore = pokemonList;

	// 	const firstResponse = await pokemonsBefore.data.pokemon.map(
	// 		async (pokemon: IResults) => {
	// 			const pokemonAfter = await convertPokemonsCall(pokemon.url);
	// 			pokemonsArrayScope.push(pokemonAfter);
	// 		}
	// 	);

	// 	await Promise.all(firstResponse);

	// 	return pokemonsArrayScope;
	// };

	if (searchedText) {
		const response = searchPokemons(searchedText);
		return response;
	}

	if (typeFilter) {
		const typePokemonsBeforeList = await getTypeFn(typeFilter);
		console.log(typePokemonsBeforeList);
		const response = await convertPokemons(typePokemonsBeforeList.data.pokemon);
		console.log(response);
		return response;
	}

	if (regionFilter) {
		console.log(regionFilter);
	}

	const pokemonsListBefore = await getPokemons(page);
	console.log(pokemonsListBefore.data.results);

	const response: Promise<any[]> = convertPokemons(
		pokemonsListBefore.data.results
	);

	return await response;
};

export const usePokemonsQuery = (
	page = 0,
	searchedText = "",
	regionFilter = "",
	typeFilter = ""
) => {
	return useQuery<Array<IPokemonDto>>(
		["Pokemons", { page, searchedText, regionFilter, typeFilter }],
		usePokemonsQuerry
	);
};
