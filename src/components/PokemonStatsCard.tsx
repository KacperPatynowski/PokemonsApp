import { Box } from "@mui/material";
import { useEffect } from "react";
import { RadialAreaChart, RadialAxis } from "reaviz";

export const PokemonStatsCard = (pokemon: any) => {
	console.log(pokemon);

	const categoryData: Array<any> = [
		{
			id: "1",
			key: "hp",
			data: pokemon?.pokemon.data?.stats[0]?.base_stat ?? "0",
		},
		{
			id: "2",
			key: "attack",
			data: pokemon?.pokemon.data?.stats[1]?.base_stat ?? "0",
		},
		{
			id: "3",
			key: "defense",
			data: pokemon?.pokemon.data?.stats[2]?.base_stat ?? "0",
		},
		{
			id: "4",
			key: "special-attack",
			data: pokemon?.pokemon.data?.stats[3]?.base_stat ?? "0",
		},
		{
			id: "5",
			key: "special-defense",
			data: pokemon?.pokemon.data?.stats[4]?.base_stat ?? "0",
		},
		{
			id: "6",
			key: "speed",
			data: pokemon?.pokemon.data!.stats[5].base_stat ?? "0",
		},
	];

	useEffect(() => {
		console.log(pokemon.pokemon.data);
	}, [pokemon]);

	console.log(pokemon?.data);
	const pokemonImg = pokemon?.pokemon.data?.sprites?.front_default ?? "";
	console.log(pokemonImg);

	return (
		<>
			<div className="card w-96 bg-base-100 shadow-xl m-2">
				<figure className="mt-4">
					<img src={pokemonImg} alt="Shoes" />
				</figure>
				<div className="card-body flex justify-center pt-0">
					<Box className="flex flex-col">
						<h2 className="card-title justify-center m-2">
							{pokemon.pokemon.data!.name}
						</h2>

						<RadialAreaChart
							data={categoryData}
							height={300}
							width={350}
							axis={<RadialAxis type="category" />}
						/>
					</Box>
				</div>
			</div>
		</>
	);
};
