/** @format */

import { Box } from "@mui/material";
import { PokemonStatsCard } from "components/PokemonStatsCard";
import React, { ReactElement, useEffect, useState } from "react";
import { usePokemonEvolution } from "services/api/usePokemonEvolutionQuery";
import { usePokemonsStatsQuery } from "services/api/usePokemonsStatsQuery";
import { IPokemonDto } from "types/IPokemonDto";

interface IProps {
  pokemonId: number;
  buttonMessage?: string;
}

export const PokemonEvolution = ({ pokemonId, buttonMessage }: IProps) => {
  const {
    data: response,
    isLoading,
    isSuccess,
  } = usePokemonEvolution(pokemonId);

  const [pokemonsArray, setPokemonsArray] = useState<Array<any>>([]);

  useEffect(() => {
    const getPoekmonsArray = () => {
      let pokemonsArray: Array<any> = [];
      const evolutionChain = response!.data.chain;

      pokemonsArray = [
        evolutionChain.species.name ?? "",
        evolutionChain.evolves_to[0].species.name ?? "",
      ];
      if (evolutionChain.evolves_to[0].evolves_to[0].species.name) {
        pokemonsArray.push(
          evolutionChain.evolves_to[0].evolves_to[0].species.name
        );
      }

      return pokemonsArray;
    };

    if (isSuccess) {
      const array = getPoekmonsArray();
      setPokemonsArray(array);
    }
  }, [response, isSuccess]);

  const { data: pokemonsResponse, isLoading: statsLoading } =
    usePokemonsStatsQuery(pokemonsArray);

  if (pokemonsResponse === undefined) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Box className=" flex justify-center">
          {pokemonsResponse?.map((pokemon, index) => {
            const categoryData: Array<any> = [
              {
                id: "1",
                key: "hp",
                data: pokemon.data.stats[0].base_stat ?? "0",
              },
              {
                id: "2",
                key: "attack",
                data: pokemon.data.stats[1].base_stat ?? "0",
              },
              {
                id: "3",
                key: "defense",
                data: pokemon.data.stats[2].base_stat ?? "0",
              },
              {
                id: "4",
                key: "special-attack",
                data: pokemon.data.stats[3].base_stat ?? "0",
              },
              {
                id: "5",
                key: "special-defense",
                data: pokemon.data.stats[4].base_stat ?? "0",
              },
              {
                id: "6",
                key: "speed",
                data: pokemon.data.stats[5].base_stat ?? "0",
              },
            ];

            return (
              <div>
                <PokemonStatsCard
                  pokemonId={pokemon.data.id}
                  variant="multiple"
                />
              </div>
            );
          })}
        </Box>
      </>
    );
  }
};
