/** @jsxImportSource @emotion/react */
import { QueryFunction, useQuery } from "react-query";
import { IPokemonDto } from "types/IPokemonDto";

import { getApiInstance } from "./getApiInstance";

export const getStarterPokemons: QueryFunction<Array<IPokemonDto>> = async ({
	queryKey,
}) => {
	const starterPokemons: Array<{}> = [];
	const randomNumbers: Array<number> = [];

	const getPokemons = (number: number) => {
		return getApiInstance().get(`/pokemon/${number}`);
	};

	for (let i = 1; i < 4; i++) {
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

export const useStarterPokemons = (options: any = {}) => {
	return useQuery<Array<IPokemonDto>>("starterPokemons", getStarterPokemons, {
		...options,
	});
};
