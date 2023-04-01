import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { usePokemonsQuery } from "services/api/usePokemonsQuery";

interface IProps {
  children?: any;
}

export const PokemonsContext = createContext({} as any);
export const usePokemons = () => {
  return useContext(PokemonsContext);
};

export const PokemonsProvider = ({ children }: IProps) => {
  const pokemonsContext = usePokemons();
  const pokemons6 = useContext(PokemonsContext);

  const { data: response } = usePokemonsQuery();

  const value = useMemo(() => response, [response]);

  return (
    <PokemonsContext.Provider value={value}>
      {children}
    </PokemonsContext.Provider>
  );
};

export default PokemonsProvider;
