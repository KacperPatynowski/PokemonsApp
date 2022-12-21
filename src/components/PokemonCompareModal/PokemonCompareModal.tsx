import { Box } from "@mui/material";
import React, { ReactElement } from "react";
import { RadialAreaChart, RadialAxis } from "reaviz";
import { IPokemonDto } from "types/IPokemonDto";

interface IProps {
	image?: string;
	header?: string;
	message?: string;
	buttonMessage?: string;
	pokemons: Array<IPokemonDto>;
}

export const PokemonCompareModal = ({
	message,
	buttonMessage,
	pokemons,
}: IProps) => {
	return (
		<>
			<Box className="flex justify-center m-4">
				{pokemons.map((pokemon: IPokemonDto) => {
					const categoryData: Array<any> = [
						{
							id: "1",
							key: "hp",
							data: pokemon.data!.stats[0].base_stat ?? "0",
						},
						{
							id: "2",
							key: "attack",
							data: pokemon.data!.stats[1].base_stat ?? "0",
						},
						{
							id: "3",
							key: "defense",
							data: pokemon.data!.stats[2].base_stat ?? "0",
						},
						{
							id: "4",
							key: "special-attack",
							data: pokemon.data!.stats[3].base_stat ?? "0",
						},
						{
							id: "5",
							key: "special-defense",
							data: pokemon.data!.stats[4].base_stat ?? "0",
						},
						{
							id: "6",
							key: "speed",
							data: pokemon.data!.stats[5].base_stat ?? "0",
						},
					];

					console.log(pokemons);

					return (
						<>
							<div className="card w-96 bg-base-100 shadow-xl m-2">
								<figure className="mt-4">
									<img src={pokemon.data!.sprites.front_default} alt="Shoes" />
								</figure>
								<div className="card-body flex justify-center pt-0">
									<Box className="flex justify-center flex-col">
										<h2 className="card-title justify-center m-2">
											{pokemon.data!.name}
										</h2>

										<RadialAreaChart
											data={categoryData}
											height={300}
											width={350}
											axis={<RadialAxis type="category" />}
										/>
										<div className="card-actions justify-center mt-4">
											<button className="btn btn-primary">
												{buttonMessage}
											</button>
										</div>
									</Box>
								</div>
							</div>
						</>
					);
				})}
			</Box>
		</>
	);
};
