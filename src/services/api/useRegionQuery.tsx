import React from "react";
import { useState } from "react";
import { QueryFunction, useQuery } from "react-query";

import { getApiInstance } from "./getApiInstance";

/** @jsxImportSource @emotion/react */
interface IResults {
	name: string;
	url: string;
}

export const useRegionListQuery: QueryFunction<any> = async ({ queryKey }) => {
	const [_key] = queryKey as [string];
	// console.log(page);

	// const searchPokemons = async (searchText: string) => {
	// 	let returnArray: any[] = [];
	// 	const searchedPokemon = await getApiInstance().get<any>(
	// 		`/pokemon/${searchedText}`
	// 	);
	// 	returnArray.push(searchedPokemon);
	// 	console.log(returnArray);
	// 	return returnArray;
	// };

	//usunac funcje zeby zapytania robic prosto do apiInstance
	const getRegionList = () => {
		return getApiInstance().get(`/region`);
	};

	// const convertType = (typeUrl: string) => {
	// 	return getApiInstance2().get<any>(typeUrl);
	// };

	// const convertPokemons = async () => {
	// 	let pokemonsArrayScope: any[] = [];
	// 	const pokemonsBefore = await getTypeList();

	// 	const firstResponse = await pokemonsBefore.data.results.map(
	// 		async (pokemon: IResults) => {
	// 			const pokemonAfter = await convertType(pokemon.url);
	// 			pokemonsArrayScope.push(pokemonAfter);
	// 		}
	// 	);

	// 	await Promise.all(firstResponse);

	// 	return pokemonsArrayScope;
	// };

	// if (searchedText) {
	// 	const response = searchPokemons(searchedText);
	// 	return response;
	// }

	const response: any = await getRegionList();
	console.log(response);

	return response.data;
};

export const useRegionQuery = () => {
	return useQuery<any>(["Region"], useRegionListQuery);
};
