import { QueryFunction, useQuery } from "react-query";
import { IPokemonChainDto } from "types/IPokemonChainDto";
import sliceUrl from "utils/sliceUrl";

import { getApiInstance } from "./getApiInstance";

export const getPokemonEvolutionQuery2: QueryFunction<any> = async ({
	queryKey,
}) => {
	const [_key, { pokemonName }] = queryKey as [
		string,
		{
			pokemonName: string;
		}
	];

	const getSpecies = (pokemonName: string) => {
		return getApiInstance().get(`/pokemon/${pokemonName}`);
	};
	const getEvolutionChain = (url: string) => {
		return getApiInstance().get(url);
	};

	const species = await getSpecies(pokemonName);

	const evolutionChain = sliceUrl(species.data.evolution_chain.url);

	const response = await getEvolutionChain(evolutionChain);

	console.log(response);
	return response ?? {};
};

export const usePokemonQuery = (pokemonName: string) => {
	return useQuery<IPokemonChainDto>(
		["pokemonEvolutions", { pokemonName }],
		getPokemonEvolutionQuery2
	);
};
