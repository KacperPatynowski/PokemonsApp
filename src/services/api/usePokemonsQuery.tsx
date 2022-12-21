import { QueryFunction, useQuery } from "react-query";
import { IPokemonDto } from "types/IPokemonDto";

import { getApiInstance } from "./getApiInstance";

/** @jsxImportSource @emotion/react */
export const getPokemonsFN: QueryFunction<any> = async ({ queryKey }) => {
	const randomNumbers: Array<number> = [];

	const getPokemons = (number: number) => {
		return getApiInstance().get(`/pokemon/${number}`);
	};

	for (let i = 1; i < 30; i++) {
		const n = Math.floor(Math.random() * 100);
		if (randomNumbers.includes(n)) {
			continue;
		}
		randomNumbers.push(n);
	}

	const response = await Promise.all(
		randomNumbers.map((number) => getPokemons(number))
	);

	return response ?? {};
};

export const usePokemonsQuery = (options: any = {}) => {
	return useQuery<Array<IPokemonDto>>("Pokemons", getPokemonsFN, {
		...options,
	});
};
