import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/system";
import { PokemonCompareModal } from "components/PokemonCompareModal";
import { PokemonsContext, usePokemons } from "components/PokemonContext";
import { PokemonEvolution } from "components/PokemonEvolution";
import React, { ReactElement, ReactNode, ReactPortal, useContext, useState } from "react";
import { useEffect } from "react";
import { Badge, Button, ButtonGroup, Mask, Table } from "react-daisyui";
import { IPokemonDto } from "types/IPokemonDto";

export const TableDaisy = () => {
	const initialArray: Array<IPokemonDto> = [];
	const initialPokemon: IPokemonDto = {};
	const [active, setActive] = useState(false);
	const [active2, setActive2] = useState(false);
	const [pokemonCompare, setPokemonCompare] = useState(initialPokemon);
	const [pokemon1, setPokemon1] = useState(initialPokemon);
	const [activeArray, setActiveArray] = useState(initialArray);
	const [isLoading, setIsLoading] = useState(true);
	const faPropIcon = faGithub as IconProp;

	const pokemons1 = usePokemons();
	// const { data: response } = usePokemonsQuery();
	// useEffect(() => {
	// 	setIsLoading(false);
	// 	console.log(isLoading);
	// }, [response]);

	// console.log(response);

	const pokemons = useContext(PokemonsContext);

	console.log(pokemons);
	const handleClick = (pokemon: IPokemonDto) => {
		setActiveArray((initialArray) => [...initialArray, pokemon]);
	};

	const returnPokemonEvolution = () => {
		return (
			<>
				<Box>
					<PokemonEvolution pokemon={pokemon1} buttonMessage={"dupa"} />
				</Box>
			</>
		);
	};

	const handleClick2 = (pokemon: IPokemonDto) => {
		setPokemon1(pokemon);
		console.log(pokemon1);
	};

	useEffect(() => {
		if (Object.keys(pokemon1).length !== 0) {
			setActive2(true);
		}
	}, [pokemon1]);

	useEffect(() => {
		setActive(() => {
			if (activeArray.length === 2) {
				return true;
			} else return false;
		});
	}, [activeArray]);

	if (active2 === true) {
		return (
			<>
				<Box>
					<PokemonEvolution pokemon={pokemon1} buttonMessage={"dupa"} />
				</Box>
			</>
		);
	}

	if (active === true) {
		return (
			<>
				<Box className="">
					<PokemonCompareModal
						pokemons={activeArray}
						message={"dupa"}
						buttonMessage={"dupaa"}
					/>
				</Box>
			</>
		);
	} else {
		if (pokemons) {
			return (
				<>
					<Box className="flex justify-center bg-red-500">
						<Box className="flex-col justify-center overflow-x-auto ">
							<Table className="rounded-box">
								<Table.Head>
									<span>Pokemon Id</span>
									<span>Pokemon Name</span>
									<span>Region</span>
									<span>Type</span>
									<span>Compare</span>
									<span>Evolutions</span>
								</Table.Head>
								<Table.Body>
									{pokemons.map((pokemon: IPokemonDto) => {
										return (
											<Table.Row key={pokemon.data!.id}>
												<div className="flex items-center">
													{pokemon.data!.id}
												</div>
												<div className="flex items-center space-x-3 truncate">
													<Mask
														variant="squircle"
														src={pokemon.data!.sprites.front_default}
													/>
													<div>
														<div className="font-bold">
															{pokemon.data!.name}
														</div>
													</div>
												</div>
												<div>
													{pokemon.data!.id}
													<br />
													<Badge color="ghost" size="sm">
														Desktop Support Technician
													</Badge>
												</div>
												<div>{pokemon.data!.types[0].type.name}</div>
												<div>
													<Button
														shape="circle"
														color="primary"
														variant="outline"
														size="xs"
														className="w-12 "
														active={active}
														onClick={() => handleClick(pokemon)}
													>
														<FontAwesomeIcon icon={faMessage} />
													</Button>
												</div>
												<div>
													<Button
														shape="circle"
														color="primary"
														variant="outline"
														size="xs"
														className="w-12 "
														active={active}
														onClick={() => handleClick2(pokemon)}
													>
														<FontAwesomeIcon icon={faMessage} />
													</Button>
												</div>
											</Table.Row>
										);
									})}
								</Table.Body>
							</Table>
							<Box className="w-full h-16 bg-red-500">
								<Box className="flex h-full justify-center items-center bg-white shadow-xl rounded-box">
									<ButtonGroup>
										<input
											type="radio"
											name="options"
											data-title="1"
											className="btn"
											onClick={() => console.log("xd")}
										/>

										<input
											type="radio"
											name="options"
											data-title="2"
											className="btn"
										/>
										<input
											type="radio"
											name="options"
											data-title="3"
											className="btn"
										/>
										<input
											type="radio"
											name="options"
											data-title="4"
											className="btn"
										/>
									</ButtonGroup>
								</Box>
							</Box>
						</Box>
					</Box>
				</>
			);
		} else {
			return <div>Loading...</div>;
		}
	}
};
