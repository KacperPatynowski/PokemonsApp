/** @format */

import {
  Air as AirIcon,
  AutoAwesome as AutoAwesomeIcon,
  Bolt as BoltIcon,
  Brightness5 as Brightness5Icon,
  FilterDrama as FilterDramaIcon,
  FilterHdr as FilterHdrIcon,
  FilterVintage as FilterVintageIcon,
  Grass as GrassIcon,
  Icecream as IcecreamIcon,
  LocalFireDepartment as LocalFireDepartmentIcon,
  Nature as NatureIcon,
  NightsStay as NightsStayIcon,
  PestControl as PestControlIcon,
  Pets as PetsIcon,
  PrecisionManufacturing as PrecisionManufacturingIcon,
  QuestionMark as QuestionMarkIcon,
  SportsMma as SportsMmaIcon,
  Storm as StormIcon,
  Warning as WarningIcon,
  Water as WaterIcon,
} from "@mui/icons-material";
import { Box, Checkbox, Chip, FormControlLabel } from "@mui/material";
import { CompareButton } from "components/CompareButton";

import { PokemonCard } from "components/PokemonCard";
import { usePokemons } from "components/PokemonContext";
import { PokemonEvolution } from "components/PokemonEvolution";
import { useEffect, useState } from "react";
import { usePokemonEvolution } from "services/api/usePokemonEvolutionQuery";

import { IPokemonDto } from "types/IPokemonDto";

export const PokemonsTable = () => {
  const [selectedPokemonIds, setSelectedPokemonIds] = useState<number[]>([]);

  useEffect(() => {
    console.log("checkedIds", selectedPokemonIds);
  }, [selectedPokemonIds]);

  const handlePokemonSelection = (pokemonId: number) => {
    console.log(pokemonId, selectedPokemonIds);
    if (selectedPokemonIds.includes(pokemonId)) {
      setSelectedPokemonIds(
        selectedPokemonIds.filter((id) => id !== pokemonId),
      );
    } else {
      setSelectedPokemonIds([...selectedPokemonIds, pokemonId]);
    }
  };

  const { pokemonsQueryResponse } = usePokemons();

  const iconSelect = (type: string) => {
    const typeToIcon = {
      normal: <NatureIcon />,
      fight: <SportsMmaIcon />,
      fly: <AirIcon />,
      poison: <WarningIcon />,
      ground: <FilterVintageIcon />,
      rock: <FilterHdrIcon />,
      bug: <PestControlIcon />,
      ghost: <FilterDramaIcon />,
      steel: <PrecisionManufacturingIcon />,
      fire: <LocalFireDepartmentIcon />,
      water: <WaterIcon />,
      grass: <GrassIcon />,
      electric: <BoltIcon />,
      physic: <StormIcon />,
      ice: <IcecreamIcon />,
      dragon: <PetsIcon />,
      dark: <NightsStayIcon />,
      fairy: <AutoAwesomeIcon />,
      unknown: <QuestionMarkIcon />,
      shadow: <Brightness5Icon />,
    };
    return typeToIcon[type as keyof typeof typeToIcon];
  };

  if (pokemonsQueryResponse) {
    const sortedPokemons = pokemonsQueryResponse.sort(
      (a: IPokemonDto, b: IPokemonDto) => a.data.id - b.data.id,
    );

    return (
      <div className="flex flex-col gap-1 justify-center items-center ">
        {sortedPokemons.map(({ data }: IPokemonDto, index: number) => {
          const { id, name, sprites, types, stats } = data || {};

          return (
            <>
              <div
                key={index}
                className="w-96 [height:30rem] relative flex justify-center items-center flex-col"
              >
                <div className="m-auto w-96 [height:30rem] ">
                  <PokemonCard data={data} key={id} />
                </div>
                <div className="rounded-3xl m-2 w-40 [background-color:rgba(0,0,0,0.08)] flex justify-center items-center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedPokemonIds.includes(id)}
                        onChange={() => handlePokemonSelection(id)}
                      />
                    }
                    label="Compare"
                    className="mr-0"
                  />
                </div>
              </div>
            </>
          );
        })}
      </div>
    );
  } else return <p>refresh</p>;
};
