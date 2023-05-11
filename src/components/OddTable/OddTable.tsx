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

import { PokemonCard } from "components/PokemonCard";
import { usePokemons } from "components/PokemonContext";

import { IPokemonDto } from "types/IPokemonDto";

export default function PokemonsTable() {
  const response = usePokemons();
  console.log(response);

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

  if (response) {
    return (
      <Box sx={{ margin: "auto", height: "100%" }}>
        <div className="flex flex-col gap-1 justify-center items-center ">
          {response.map(({ data }: IPokemonDto, index: number) => {
            const { id, name, sprites, types } = data || {};

            return (
              <div
                key={index}
                className="w-96 mx-6  relative flex justify-center items-center"
              >
                <PokemonCard data={data} key={id} />
              </div>
            );
          })}
        </div>
      </Box>
    );
  } else return <p>refresh</p>;
}
