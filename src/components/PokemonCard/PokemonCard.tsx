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
import { Checkbox, Chip, FormControlLabel } from "@mui/material";
import { PokemonEvolution } from "components/PokemonEvolution";
import { IPokemonDto } from "types/IPokemonDto";

interface IData {
  id: string;
  name: string;
  sprites: {
    front_default: string;
  };
  types: string;
}

interface IProps {
  data: IData;
}

export const PokemonCard = ({ data }: IPokemonDto) => {
  const iconSelect = (type: string, key: number) => {
    const typeToIcon = {
      normal: <NatureIcon key={key} />,
      fight: <SportsMmaIcon key={key} />,
      flying: <AirIcon key={key} />,
      poison: <WarningIcon key={key} />,
      ground: <FilterVintageIcon key={key} />,
      rock: <FilterHdrIcon key={key} />,
      bug: <PestControlIcon key={key} />,
      ghost: <FilterDramaIcon key={key} />,
      steel: <PrecisionManufacturingIcon key={key} />,
      fire: <LocalFireDepartmentIcon key={key} />,
      water: <WaterIcon key={key} />,
      grass: <GrassIcon key={key} />,
      electric: <BoltIcon key={key} />,
      physic: <StormIcon key={key} />,
      ice: <IcecreamIcon key={key} />,
      dragon: <PetsIcon key={key} />,
      dark: <NightsStayIcon key={key} />,
      fairy: <AutoAwesomeIcon key={key} />,
      unknown: <QuestionMarkIcon key={key} />,
      shadow: <Brightness5Icon key={key} />,
    };
    return (
      <Chip
        icon={typeToIcon[type as keyof typeof typeToIcon]}
        label={type}
        className="m-1"
      />
    );
  };

  const { id, name, sprites, types } = data || {};

  // hover:[transform:rotateY(180deg)] [transform-style:preserve-3d] [transition:all] [transition:ease] [transition:0.5s]
  // [transition:all] [transition:ease] [transition:0.5s]
  return (
    <>
      <div className="absolute flex flex-col justify-center items-center">
        {/* container */}
        <div className="h-full m-6 flex justify-center flex-col items-center">
          {/* the card */}
          <div className="hover:[transform:rotateY(180deg)] [transform-style:preserve-3d] transition-all delay-500 duration-500 ease w-full h-full flex flex-col justify-center items-center ">
            {/* front */}
            <div className="card w-96 bg-gray-100 shadow-xl  [backface-visibility:hidden] ">
              <span className="m-4 text-base font-mono">{id}</span>
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
            <div className="[backface-visibility:hidden] [transform:rotateY(180deg)] w-full h-full absolute top-0 ">
              <PokemonEvolution pokemonId={data!.id} />
            </div>
          </div>
          <div className="rounded-3xl m-2 w-40 [backface-visibility:hidden] [background-color:rgba(0,0,0,0.08)] flex justify-center items-center hidden ">
            <FormControlLabel
              control={<Checkbox />}
              label="Compare"
              className="mr-0"
            />
          </div>
        </div>
      </div>
    </>
  );
};
