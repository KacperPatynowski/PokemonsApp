/** @format */

import { Box } from "@mui/material";
import { ReactNode, useEffect } from "react";
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
import { IPokemonDto } from "types/IPokemonDto";

interface IData {
  id: string;
  key: string;
  data: string;
}

interface IProps {
  pokemon: IPokemonDto;
  name: string;
  pokemonImg: string;
  pokemonStatsData: IData[];
}

export const PokemonStatsCard = ({
  name,
  pokemonImg,
  pokemon,
  pokemonStatsData,
}: IProps) => {
  return (
    <>
      <div className="card w-96 bg-gray-100 shadow-xl m-2">
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
  );
};
