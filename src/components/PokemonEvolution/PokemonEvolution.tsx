import { Box } from "@mui/material";
import { PokemonStatsCard } from "components/PokemonStatsCard";
import React, { ReactElement, useEffect } from "react";
import { usePokemonEvolution } from "services/api/usePokemonEvolutionQuery";
import { usePokemonsStatsQuery } from "services/api/usePokemonsStatsQuery";
import { IPokemonDto } from "types/IPokemonDto";

interface IProps {
	pokemon: IPokemonDto;
	buttonMessage?: string;
}

export const PokemonEvolution = ({ pokemon, buttonMessage }: IProps) => {
	const pokemonId: number = pokemon!.data!.id;

	const { data: response } = usePokemonEvolution(pokemonId);
	const getPoekmonsArray = () => {
		let pokemonsArray2: Array<any> = [];

		if (response) {
			pokemonsArray2 = [
				response!.data.chain.species?.name ?? "",
				response!.data.chain.evolves_to[0]?.species?.name ?? "",
			];
			if (response!.data.chain.evolves_to[0]?.evolves_to[0]?.species?.name) {
				pokemonsArray2.push(
					response!.data.chain.evolves_to[0]?.evolves_to[0]?.species?.name
				);
			}
		}

		return pokemonsArray2;
	};

	const pokemons1 = getPoekmonsArray();

	const { data: pokemonsResponse } = usePokemonsStatsQuery(pokemons1);

	return (
		<>
			<Box className="bg-white flex justify-center">
				{pokemonsResponse?.map((pokemon1) => {
					return <PokemonStatsCard pokemon={pokemon1} />;
				})}
			</Box>
		</>
	);
};
