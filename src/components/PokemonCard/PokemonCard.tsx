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
import { IPokemonDto } from "types/IPokemonDto";

export const PokemonCard = ({ data }: IPokemonDto) => {
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

  const { id, name, sprites, types } = data || {};

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {/* container */}
        <div
          id="container"
          className="h-full m-6 flex justify-center flex-col items-center "
        >
          {/* the card */}
          {/* hover:[transform:rotateY(180deg)] [transform-style:preserve-3d]  transition-all delay-300 duration-500 ease | hover:-translate-y-20 transition-all */}
          <div
            id="card"
            className=" w-full flex flex-col justify-center items-center "
          >
            {/* front */}
            <div
              id="front"
              className="card w-96 bg-gray-100 shadow-xl  [backface-visibility:hidden] "
            >
              <div className="flex flex-row">
                {/* <span className="m-4 text-base font-mono self-start">{id}</span> */}
                <Typography
                  // align="center"
                  sx={{
                    margin: "1rem auto 0",
                    fontWeight: "bold",
                    opacity: 0.4,
                    whiteSpace: "nowrap",
                  }}
                >
                  <button>
                    <span className="duration-300 after:[content:''_absolute_w-full_height-px_opacity-0] transition-opacity">
                      Flip Card
                    </span>
                  </button>
                </Typography>
              </div>
              <figure>
                <img
                  src={sprites?.front_default}
                  alt="pokemon"
                  className="w-36 h-36"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title ">{name}</h2>
                <div className="m-4">
                  {types?.map((type, index) => {
                    return iconSelect(type.type.name, index);
                  })}
                </div>
              </div>
            </div>
            {/* back */}
            <div
              id="back"
              className="[backface-visibility:hidden] [transform:rotateY(180deg)] w-full h-full absolute "
            >
              <PokemonEvolution pokemonId={data!.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
