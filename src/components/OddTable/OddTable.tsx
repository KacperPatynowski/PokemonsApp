/** @format */

import {
  Air as AirIcon,
  AutoAwesome as AutoAwesomeIcon,
  Bolt as BoltIcon,
  Brightness5 as Brightness5Icon,
  CheckBox,
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
import Paper from "@mui/material/Paper";
import { PokemonCard } from "components/PokemonCard";
import { PokemonEvolution } from "components/PokemonEvolution";
import * as React from "react";
import { usePokemonsQuery } from "services/api/usePokemonsQuery";
import { IPokemonDto } from "types/IPokemonDto";

export default function OddTable() {
  const [page, setPage] = React.useState(0);

  const { data: response } = usePokemonsQuery(page);

  const handleClick = () => {};

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
      <div className="">
        <Paper
          sx={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            align: "center",
          }}
        >
          <Box sx={{ margin: "auto", height: "100%" }}>
            <div className="flex flex-col gap-1 justify-center items-center ">
              {response.map(({ data }: IPokemonDto, index) => {
                const { id, name, sprites, types } = data || {};

                return (
                  <div
                    key={index}
                    className="w-96 mx-6 [height:30rem] relative flex justify-center items-center hover:[transform:rotateY(180deg)] [transform-style:preserve-3d] transition-all delay-500 duration-500 ease"
                  >
                    <PokemonCard data={data} key={id} />
                    <div className="[backface-visibility:hidden] [transform:rotateY(180deg)] w-full h-full absolute top-0 ">
                      <PokemonEvolution pokemonId={id!} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Box>
        </Paper>
      </div>
    );
  } else return <p>refresh</p>;
}
