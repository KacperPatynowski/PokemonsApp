/** @format */

import { Box } from "@mui/material";
import { PokemonStatsCard } from "components/PokemonStatsCard";
import React, { ReactElement, useEffect } from "react";
import { usePokemonEvolution } from "services/api/usePokemonEvolutionQuery";
import { usePokemonsStatsQuery } from "services/api/usePokemonsStatsQuery";
import { IPokemonDto } from "types/IPokemonDto";

interface IProps {
  pokemonId: number;
  buttonMessage?: string;
}

export const PokemonEvolution = ({ pokemonId, buttonMessage }: IProps) => {
  const { data: response } = usePokemonEvolution(pokemonId);
  const getPoekmonsArray = () => {
    let pokemonsArray: Array<any> = [];

    if (response) {
      pokemonsArray = [
        response.data.chain.species?.name ?? "",
        response.data.chain.evolves_to[0]?.species?.name ?? "",
      ];
      if (response.data.chain.evolves_to[0]?.evolves_to[0]?.species?.name) {
        pokemonsArray.push(
          response!.data.chain.evolves_to[0]?.evolves_to[0]?.species?.name,
        );
      }
    }

    return pokemonsArray;
  };

  const pokemonsArray = getPoekmonsArray();

  const { data: pokemonsResponse } = usePokemonsStatsQuery(pokemonsArray);

  return (
    <>
      <Box className="bg-white flex justify-center">
        {pokemonsResponse?.map((pokemon, index) => {
          return <PokemonStatsCard pokemon={pokemon} key={index} />;
        })}
      </Box>
    </>
  );
};
