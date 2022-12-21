// import { useQuery } from "react-query";
// import { IPokemonSpeciesDto } from "types/IPokemonSpeciesDto";

// import { getApiInstance2 } from "./getApiInstance2";

export const usePokemonEvolutionQuery2 = async (url = "") => {};
// 	const getSpecies = (url: string) => {
// 		return getApiInstance2().request<IPokemonSpeciesDto>({ url });
// 	};
// 	const getEvolutionChain = (url: string) => {
// 		return getApiInstance2().request<IPokemonDto>({ url });
// 	};

// 	const species: IPokemonSpeciesDto = await getSpecies(url);

// 	const evolutionChain = species.data.evolution_chain.url;

// 	console.log(evolutionChain);

// 	const response = getEvolutionChain(evolutionChain);

// 	return response ?? {};
// };

// export const usePokemonsQuery = (options: any = {}) => {
// 	return useQuery<IPokemonDto>("Pokemons", usePokemonEvolutionQuery2, {
// 		...options,
// 	});
// };
