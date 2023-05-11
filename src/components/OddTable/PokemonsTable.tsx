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
import {
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  Input,
  Select,
} from "@mui/material";
import { CompareButton } from "components/CompareButton";
import { FormGroup, Label } from "reactstrap";

import { PokemonCard } from "components/PokemonCard";
import { usePokemons } from "components/PokemonContext";
import { PokemonEvolution } from "components/PokemonEvolution";
import { SearchInput } from "components/SearchInput";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { usePokemonEvolution } from "services/api/usePokemonEvolutionQuery";
import { usePokemonsQuery } from "services/api/usePokemonsQuery";

import { IPokemonDto } from "types/IPokemonDto";

export const PokemonsTable = () => {
  const [selectedPokemonIds, setSelectedPokemonIds] = useState<number[]>([]);
  const [searchedText, setSearchedText] = useState("");

  useEffect(() => {
    console.log("checkedIds", selectedPokemonIds);
  }, [selectedPokemonIds]);

  const handlePokemonSelection = (pokemonId: number) => {
    console.log(pokemonId, selectedPokemonIds);
    if (selectedPokemonIds.includes(pokemonId)) {
      setSelectedPokemonIds(
        selectedPokemonIds.filter((id) => id !== pokemonId)
      );
    } else {
      setSelectedPokemonIds([...selectedPokemonIds, pokemonId]);
    }
  };

  const { data: pokemonsQueryResponse } = usePokemonsQuery();

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

  const handleChange = (event: any) => {
    console.log(event.target);
    setSearchedText(event.target.value);
  };

  if (pokemonsQueryResponse) {
    const sortedPokemons = pokemonsQueryResponse.sort(
      (a: IPokemonDto, b: IPokemonDto) => a.data.id - b.data.id
    );

    const initValues = {
      name: "",
      region: "",
    };

    const regionNames = [
      "Kanto",
      "Johto",
      "Hoenn",
      "Sinnoh",
      "Hisui",
      "Unova",
      "Kalos",
      "Alola",
      "Galar",
      "Paldea",
    ];

    return (
      <div>
        <div className="flex justify-center items-center">
          {/* formik */}

          <Box className="flex justify-center">
            <Formik
              initialValues={initValues}
              onSubmit={(values, actions) => {
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <div className="text-center	">
                    <FormGroup className="text-center m-2">
                      <br />

                      <Field
                        name="name"
                        placeholder="Nazwa trenera pokemon"
                        type="text"
                        id="name"
                        component={Input}
                        className="input input-bordered w-full max-w-xs "
                        value={props.values.name}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    </FormGroup>
                    <FormGroup className="text-center">
                      <Label htmlFor="name" className="text-center">
                        Region z którego pochodzisz
                      </Label>

                      <br />

                      <Field
                        name="region"
                        id="region"
                        component={Select}
                        className="input input-bordered w-full max-w-xs m-2"
                        // value={props.values.region}
                        onChange={(e: any) => {
                          props.values.region = e;
                        }}
                        onBlur={props.handleBlur}
                      >
                        <option disabled selected>
                          Wybierz swój region
                        </option>
                        {regionNames.map((region) => {
                          return <option key={region}>{region}</option>;
                        })}
                      </Field>
                    </FormGroup>

                    <br />
                  </div>

                  <div className="flex justify-center m-4"></div>
                </Form>
              )}
            </Formik>
          </Box>

                        
        </div>
        <div className="flex flex-col gap-1 justify-center items-center ">
          {sortedPokemons.map(({ data }: IPokemonDto, index: number) => {
            const { id, name, sprites, types, stats } = data || {};

            return (
              <>
                <div
                  key={index}
                  className="w-96 [height:30rem] relative flex justify-center items-center flex-col"
                >
                  <div className="m-auto ">
                    <PokemonCard data={data} key={id} />
                  </div>
                  {/* <div className="rounded-3xl m-2 w-40 [background-color:rgba(0,0,0,0.08)] flex justify-center items-center">
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
                </div> */}
                </div>
              </>
            );
          })}
        </div>
      </div>
    );
  } else return <p>refresh</p>;
};
