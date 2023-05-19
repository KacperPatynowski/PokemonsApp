/** @format */

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
  useMemo,
} from "react";
import { usePokemonsQuery } from "services/api/usePokemonsQuery";
import { useStarterPokemons } from "services/api/useStarterPokemons";

export const PokemonsContext = createContext({} as any);
export const usePokemons = () => {
  return useContext(PokemonsContext);
};

export const PokemonsProvider = ({ children }: any) => {
  const { data: pokemonsQueryResponse } = usePokemonsQuery();

  const value = useMemo(() => {
    return { pokemonsQueryResponse };
  }, [pokemonsQueryResponse]);

  return (
    <PokemonsContext.Provider value={value}>
      {children}
    </PokemonsContext.Provider>
  );
};

export default PokemonsProvider;
