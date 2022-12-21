import { createContext, FC, ReactNode, useContext, useState } from "react";
import { usePokemonsQuery } from "services/api/usePokemonsQuery";

interface IProps {
	children?: any;
}

export const PokemonsContext = createContext({} as any);
export const usePokemons = () => {
	useContext(PokemonsContext);
};

export const PokemonsProvider = ({ children }: IProps) => {
	const pokemonsContext = usePokemons();
	const pokemons6 = useContext(PokemonsContext);
	const { data: response } = usePokemonsQuery();
	return (
		<PokemonsContext.Provider value={response}>
			{children}
		</PokemonsContext.Provider>
	);
};

export default PokemonsProvider;
