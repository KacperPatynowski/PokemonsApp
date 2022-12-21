import { QueryFunction, useQuery } from "react-query";
import { IPokemonChainDto } from "types/IPokemonChainDto";
import sliceUrl from "utils/sliceUrl";

import { getApiInstance } from "./getApiInstance";

export const getPokemonEvolutionQuery: QueryFunction<any> = async ({
	queryKey,
}) => {
	const [_key, { id }] = queryKey as [
		string,
		{
			id: number;
		}
	];
	console.log(id);

	const getSpecies = (id: number) => {
		return getApiInstance().get(`/pokemon-species/${id}`);
	};
	const getEvolutionChain = (url: string) => {
		return getApiInstance().get(url);
	};

	const species = await getSpecies(id);

	const evolutionChain = sliceUrl(species.data.evolution_chain.url);
	console.log(evolutionChain);

	const response = await getEvolutionChain(evolutionChain);
	console.log(response);
	return response;
};

export const usePokemonEvolution = (id: number) => {
	return useQuery<IPokemonChainDto>(
		["pokemonEvolutions", { id }],
		getPokemonEvolutionQuery
	);
};
