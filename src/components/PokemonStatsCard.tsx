/** @format */

import { Box } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import {
  RadialArea,
  RadialAreaChart,
  RadialAreaSeries,
  RadialAxis,
  RadialAxisArcSeries,
  RadialAxisTick,
  RadialAxisTickLabel,
  RadialAxisTickLine,
  RadialAxisTickSeries,
  RadialGradient,
} from "reaviz";
import { usePokemonEvolution } from "services/api/usePokemonEvolutionQuery";
import { usePokemonsStatsQuery } from "services/api/usePokemonsStatsQuery";
import { usePokemonsStatsQueryByName } from "services/api/usePokemonsStatsQueryByName";
import { IPokemonDto } from "types/IPokemonDto";
import { iPokemonEvolveDto } from "types/IPokemonEvolveDto";

interface IStats {
  id: string;
  key: string;
  data: string;
}

interface IProps {
  pokemonId?: number;
  pokemonName?: string
  
  variant: "single" | "multiple";
}

export const PokemonStatsCard = ({ pokemonId, variant, pokemonName }: IProps) => {

  let pokemonsResponse;
  if(variant === "multiple"){
  const {
    data: response,
    isLoading,
    isSuccess,
  } = usePokemonEvolution(pokemonId!);

  const [pokemonsArray, setPokemonsArray] = useState<Array<any>>([]);

  useEffect(() => {
    const getPoekmonsArray = () => {
      let pokemonsArray: Array<any> = [];
      const evolutionChain = response!.data.chain;

      if (evolutionChain?.species.name) {
        pokemonsArray.push(evolutionChain.species.name);
      }
      if (evolutionChain?.evolves_to[0]?.species.name) {
        pokemonsArray.push(evolutionChain.evolves_to[0].species.name);
      }
      if (
        evolutionChain?.evolves_to[0]?.evolves_to[0]?.species.name &&
        evolutionChain?.evolves_to[0]?.evolves_to[0]?.species.name.trim() !== ""
      ) {
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
    usePokemonsStatsQuery(pokemonsArray);}
    else {
      const { data: pokemonsResponse, isLoading: statsLoading } =
      usePokemonsStatsQueryByName(pokemonId!);
    }

  return (
    <>
      {pokemonsResponse!.map((pokemon, index) => {
        const { id, name, sprites, types, stats } = pokemon.data || {};
        const pokemonImg = sprites.other.dream_world.front_default;

        const pokemonStatsData: Array<any> = [
          {
            id: "1",
            key: "hp",
            data: stats[0].base_stat ?? "0",
          },
          {
            id: "2",
            key: "attack",
            data: stats[1].base_stat ?? "0",
          },
          {
            id: "3",
            key: "defense",
            data: stats[2].base_stat ?? "0",
          },
          {
            id: "4",
            key: "special-attack",
            data: stats[3].base_stat ?? "0",
          },
          {
            id: "5",
            key: "special-defense",
            data: stats[4].base_stat ?? "0",
          },
          {
            id: "6",
            key: "speed",
            data: stats[5].base_stat ?? "0",
          },
        ];

        return (
          <div>
            <>
              <div className="card w-96 bg-gray-100 shadow-xl m-2 mt-12">
                <figure className="mt-4">
                  <img src={pokemonImg} alt="pokemon" className="w-36 h-36" />
                </figure>
                <div className="card-body flex justify-center pt-0">
                  <Box className="flex flex-col justify-center items-center">
                    <h2 className="card-title justify-center m-2">{name}</h2>

                    <div className="relative">
                      <>
                        <RadialAreaChart
                          data={pokemonStatsData}
                          height={300}
                          width={350}
                          axis={<RadialAxis type="category" />}
                        />
                      </>
                    </div>
                  </Box>
                </div>
              </div>
            </>
          </div>
        );
      })}
    </>
  );
};
