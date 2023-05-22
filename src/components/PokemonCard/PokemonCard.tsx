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
import { Checkbox, Chip, FormControlLabel, Typography } from "@mui/material";
import { PokemonEvolution } from "components/PokemonEvolution";
import { PokemonStatsCard } from "components/PokemonStatsCard";
import { useEffect, useState } from "react";
import { IPokemonDto } from "types/IPokemonDto";

// interface IHandle {
//   handleSelection: (pokemonId: number) => void;
// }

export const PokemonCard = ({
  data,
  handleCompare,
}: {
  data: IPokemonDto["data"];
  handleCompare: (pokemonId: number) => void;
}) => {
  const [addState, setAddState] = useState(false);
  const { id, name, sprites, types } = data;
  console.log(id);
  useEffect(() => {
    console.log(addState);
  }, [addState]);

  const handlePokemonSelection = (id: number) => {
    handleCompare(id);
  };

  // const [selectedPokemonIds, setSelectedPokemonIds] = useState<number[]>([]);

  // const handlePokemonSelection = (pokemonId: number) => {
  //   if (selectedPokemonIds.includes(pokemonId)) {
  //     setSelectedPokemonIds(
  //       selectedPokemonIds.filter((id) => id !== pokemonId),
  //     );
  //   } else {
  //     setSelectedPokemonIds([...selectedPokemonIds, pokemonId]);
  //   }
  // };

  // useEffect(() => {
  //   console.log(selectedPokemonIds);
  // }, [selectedPokemonIds]);

  const iconSelect = (type: string, key: number) => {
    const typeToIcon = {
      normal: <NatureIcon />,
      fight: <SportsMmaIcon />,
      flying: <AirIcon />,
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
    return (
      <Chip
        icon={typeToIcon[type as keyof typeof typeToIcon]}
        label={type}
        className="m-1"
        key={key}
      />
    );
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-12">
        {/* container */}
        <div
          id="container"
          className={`h-full m-6 flex justify-center flex-col items-center ${
            addState ? "-translate-y-14 transition-all" : ""
          }`}
        >
          {/* the card */}

          <div
            id="card"
            className={` w-full flex flex-col justify-center items-center ${
              addState
                ? "[transform:rotateY(180deg)] [transform-style:preserve-3d]  transition-all delay-300 duration-500 ease "
                : ""
            }`}
          >
            {/* front */}
            <div
              id="front"
              className="card w-96 bg-gray-100 shadow-xl  [backface-visibility:hidden] "
            >
              <div className="flex flex-row">
                <Typography
                  // align="center"
                  sx={{
                    margin: "1rem auto 0",
                    fontWeight: "bold",
                    opacity: 0.7,
                    whiteSpace: "nowrap",
                  }}
                >
                  <a
                    className="relative my-link cursor-pointer"
                    onClick={() => setAddState(true)}
                  >
                    Flip Card
                  </a>
                </Typography>
              </div>
              <figure>
                <img
                  src={
                    sprites.other.dream_world.front_default ||
                    sprites.front_default
                  }
                  alt="pokemon"
                  className="w-32 h-32 m-4 "
                />
              </figure>
              <div className="card-body items-center text-center p-4">
                <h2 className="card-title ">{name}</h2>
                <div className="m-4">
                  {types?.map((type, index) => {
                    return iconSelect(type.type.name, index);
                  })}
                </div>
                <div id="compare">
                  <FormControlLabel
                    control={
                      <Checkbox onChange={() => handlePokemonSelection(id)} />
                    }
                    label="Compare"
                  />
                </div>
              </div>
            </div>
            {/* back */}
            <div
              id="back"
              className="[backface-visibility:hidden] [transform:rotateY(180deg)] w-full h-full absolute flex flex-row justify-center items-center top-[4rem]"
            >
              <PokemonStatsCard pokemonId={id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
