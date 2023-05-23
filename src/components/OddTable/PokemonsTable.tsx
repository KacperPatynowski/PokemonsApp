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
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { CompareButton } from "components/CompareButton";
import { FormGroup, Label } from "reactstrap";

import { PokemonCard } from "components/PokemonCard";
import { usePokemons } from "components/PokemonContext";
import { PokemonEvolution } from "components/PokemonEvolution";
import { SearchInput } from "components/SearchInput";
import { Field, Form, Formik, useFormik, useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import { usePokemonEvolution } from "services/api/usePokemonEvolutionQuery";
import { usePokemonsQuery } from "services/api/usePokemonsQuery";

import { IPokemonDto } from "types/IPokemonDto";
import { PokemonStatsCard } from "components/PokemonStatsCard";

interface IFormikValues {
  values: { name: string; region: string; generation: string };
}

export const PokemonsTable = () => {
  const [selectedPokemonIds, setSelectedPokemonIds] = useState<number[]>([]);
  const [searchedText, setSearchedText] = useState("");
  const [page, setPage] = useState(1);
  const [generationState, setGenerationState] = useState("");
  const [region, setRegion] = useState("");
  const [debouncedSearchedText, setDebouncedSearchedText] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (selectedPokemonIds.length === 2) {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (selectedPokemonIds.length === 2) {
      setOpen(true);
    }
  }, [selectedPokemonIds]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchedText(searchedText);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchedText]);

  useEffect(() => {
    console.log(open);
  }, [open]);

  useEffect(() => {
    console.log(selectedPokemonIds);
  }, [selectedPokemonIds]);

  const handlePokemonSelection = (pokemonId: number) => {
    if (selectedPokemonIds.includes(pokemonId)) {
      setSelectedPokemonIds(
        selectedPokemonIds.filter((id) => id !== pokemonId)
      );
    } else {
      setSelectedPokemonIds([...selectedPokemonIds, pokemonId]);
    }
  };

  const { data: pokemonsQueryResponse } = usePokemonsQuery(
    generationState,
    debouncedSearchedText
  );

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
      (a: IPokemonDto, b: IPokemonDto) => a.data.id - b.data.id
    );

    const initValues = {
      name: "",
      region: "",
      generation: "",
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

    const style = {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 1 / 2,
      height: 1 / 2,
      bgcolor: "background.paper",
      border: "2px solid #000",
      borderRadius: 6,
      boxShadow: 24,
      p: 4,
    };

    // const generationNames = [
    //   "I",
    //   "II",
    //   "III",
    //   "IV",
    //   "V",
    //   "VI",
    //   "VII",
    //   "VIII",
    //   "IX",
    // ];
    const generationNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    if (selectedPokemonIds.length === 2) {
    }

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
                  <div className="shadow-xl rounded-box px-10">
                    <div className="text-center	flex flex-row">
                      <div className="mt-auto mx-4">
                        <FormGroup className="text-center">
                          <br />

                          <Field
                            name="name"
                            placeholder="Wyszukaj pokemona"
                            variant="outlined"
                            type="text"
                            id="name"
                            component={TextField}
                            value={searchedText}
                            onChange={(e: SelectChangeEvent) => {
                              setSearchedText(e.target.value as string);
                            }}
                            onBlur={props.handleBlur}
                          />
                        </FormGroup>
                      </div>
                      <FormGroup className="text-center">
                        <div className="m-4">
                          <Label htmlFor="name" className="text-center">
                            Region z którego pochodzisz
                          </Label>
                        </div>

                        <FormControl fullWidth>
                          <InputLabel id="region-label">Region</InputLabel>
                          <Field
                            name="region"
                            defaultValue=""
                            id="region"
                            component={Select}
                            // selected={props.values.region}
                            value={region}
                            labelId="region-label"
                            onChange={(e: SelectChangeEvent) => {
                              setRegion(e.target.value as string);
                            }}
                            onBlur={props.handleBlur}
                          >
                            <MenuItem value="">Wybierz swój region</MenuItem>
                            {regionNames.map((region) => {
                              return (
                                <MenuItem
                                  value={region}
                                  key={region}
                                  id={region}
                                >
                                  {region}
                                </MenuItem>
                              );
                            })}
                          </Field>
                        </FormControl>
                      </FormGroup>
                      <FormGroup className="text-center mx-4">
                        <div className="m-4">
                          <Label htmlFor="name" className="text-center p-4">
                            Generacja
                          </Label>
                        </div>

                        <FormControl fullWidth>
                          <InputLabel id="generation-label">
                            Generacja
                          </InputLabel>
                          <Field
                            defaultValue=""
                            name="generation"
                            id="generation"
                            value={generationState}
                            component={Select}
                            // selected={props.values.region}
                            labelId="generation-label"
                            onChange={(e: SelectChangeEvent) => {
                              setGenerationState(e.target.value as string);
                            }}
                            onBlur={props.handleBlur}
                          >
                            <MenuItem value="">Wyszukaj po generacji</MenuItem>
                            {generationNames.map((generation) => {
                              return (
                                <MenuItem
                                  value={generation}
                                  key={generation}
                                  id={generation}
                                >
                                  {generation}
                                </MenuItem>
                              );
                            })}
                          </Field>
                        </FormControl>
                      </FormGroup>

                      <br />
                    </div>

                    <div className="flex justify-center m-4"></div>
                  </div>
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
                    <PokemonCard
                      data={data}
                      key={index}
                      handleCompare={handlePokemonSelection}
                    />
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
        <div id="modal">
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={style}>
              {open ? (
                <>
                  <div className="flex justify-center flex-row">
                    {selectedPokemonIds.map((id, index) => {
                      console.log(id);
                      return (
                        <>
                          <PokemonStatsCard
                            pokemonId={id}
                            key={index}
                            variant="single"
                          />
                        </>
                      );
                    })}
                  </div>
                </>
              ) : null}
            </Box>
          </Modal>
        </div>
      </div>
    );
  } else return <p>refresh</p>;
};
