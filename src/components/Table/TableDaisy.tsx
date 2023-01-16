import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/system";
import { PokemonCompareModal } from "components/PokemonCompareModal";
import { PokemonEvolution } from "components/PokemonEvolution";
import { SearchInput } from "components/SearchInput";
import React, { ReactElement, ReactNode, ReactPortal, useContext, useState } from "react";
import { useEffect } from "react";
import { Button, ButtonGroup, Dropdown, Mask, Table } from "react-daisyui";
import { useLocation, useNavigate } from "react-router-dom";
import { usePokemonsQuery } from "services/api/usePokemonsQuery";
import { useRegionQuery } from "services/api/useRegionQuery";
import { useTypeListQuery } from "services/api/useTypeQuery";
import { IPokemonDto } from "types/IPokemonDto";

// import { SearchInput } from "components/SearchInput";
export const TableDaisy = () => {
	const initialArray: Array<IPokemonDto> = [];
	const initialPokemon: IPokemonDto = {};
	const [active, setActive] = useState(false);
	const [active2, setActive2] = useState(false);
	const [pokemonCompare, setPokemonCompare] = useState(initialPokemon);
	const [currentPage, setCurrentPage] = useState(0);
	const [pokemon1, setPokemon1] = useState(initialPokemon);
	const [activeArray, setActiveArray] = useState(initialArray);
	const [searchedText, setSearchedText] = useState("");
	const faPropIcon = faGithub as IconProp;
	const [typeFilter, setTypeFilter] = useState("normal");
	const [regionFilter, setRegionFilter] = useState("region");

	const navigate = useNavigate();
	const location = useLocation();

	// console.log(navigate);
	// console.log(location.state);

	// const context = React.useContext(PokemonsProvider);
	// console.log(context);
	// const pokemons1 = usePokemons();

	const { data: response } = usePokemonsQuery(
		currentPage,
		searchedText,
		regionFilter,
		typeFilter
	);
	const { data: typeResponse } = useTypeListQuery();
	const { data: regionResponse } = useRegionQuery();
	console.log(typeResponse);

	useEffect(() => {
		console.log(searchedText);
	}, [searchedText]);

	// const pokemons = useContext(PokemonsContext);

	// console.log(response);
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

	const handleClick3 = (newCurrentPage: number) => {
		setCurrentPage(newCurrentPage);
		console.log(currentPage);
	};

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
		return (
			<>
				<Box className="flex justify-center bg-red-500">
					<Box className="flex-col justify-center overflow-x-auto ">
						<Table className="rounded-box rounded-b-none">
							<Table.Head className="">
								<></>
								<>
									<Box>
										<Dropdown>
											<Dropdown.Toggle>{regionFilter}</Dropdown.Toggle>
											<Dropdown.Menu className="w-52">
												{regionResponse?.results?.map(
													(region: { name: string; url: string }) => {
														return (
															<Dropdown.Item
																onClick={() => setRegionFilter(region.name)}
															>
																{region.name}
															</Dropdown.Item>
														);
													}
												)}
											</Dropdown.Menu>
										</Dropdown>
									</Box>
								</>
								<>
									<Box>
										<Dropdown>
											<Dropdown.Toggle>{typeFilter}</Dropdown.Toggle>
											<Dropdown.Menu className="w-52">
												{typeResponse?.results?.map(
													(type: { name: string; url: string }) => {
														return (
															<Dropdown.Item
																onClick={() => setTypeFilter(type.name)}
															>
																{type.name}
															</Dropdown.Item>
														);
													}
												)}
											</Dropdown.Menu>
										</Dropdown>
									</Box>
								</>
								<>
									<SearchInput
										placeholder="Search"
										size="xs"
										onChange={setSearchedText}
									/>
								</>
								<></>
								<></>
							</Table.Head>
							<Table.Head>
								<span>Pokemon Id</span>
								<span>Pokemon Name</span>
								<span>Region</span>
								<span>Type</span>
								<span>Compare</span>
								<span>Evolutions</span>
							</Table.Head>
							<Table.Body className="">
								{response?.map((pokemon: IPokemonDto) => {
									return (
										<Table.Row className="" key={pokemon.data!.id}>
											<div className="flex items-center rounded-l-none">
												{pokemon.data!.id}
											</div>
											<div className="flex items-center space-x-3 truncate">
												<Mask
													variant="squircle"
													src={pokemon.data!.sprites.front_default}
												/>
												<div>
													<div className="font-bold">{pokemon.data!.name}</div>
												</div>
											</div>
											<div>
												{pokemon.data!.id}
												<br />
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
							<Box className="flex h-full justify-center items-center bg-white shadow-xl rounded-box rounded-t-none ">
								<ButtonGroup>
									<input
										type="radio"
										name="options"
										data-title="1"
										className="btn"
										onClick={() => setCurrentPage(50)}
									/>

									<input
										type="radio"
										name="options"
										data-title="2"
										className="btn"
										onClick={() => setCurrentPage(100)}
									/>
									<input
										type="radio"
										name="options"
										data-title="3"
										className="btn"
										onClick={() => setCurrentPage(150)}
									/>
									<input
										type="radio"
										name="options"
										data-title="4"
										className="btn"
										onClick={() => setCurrentPage(200)}
									/>
								</ButtonGroup>
							</Box>
						</Box>
					</Box>
				</Box>
			</>
		);
	}
};
