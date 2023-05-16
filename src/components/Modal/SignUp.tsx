/** @format */

import {
  Box,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Artboard, Button } from "react-daisyui";
import { Link, Navigate, useLocation } from "react-router-dom";
import { FormGroup, Label } from "reactstrap";
import { routes } from "routes";
import { useStarterPokemons } from "services/api/useStarterPokemons";

/** @jsxImportSource @emotion/react */

export const SignUp = () => {
  const { data: response, isLoading: loadingPokemons } = useStarterPokemons();
  const [activePokemon, setActivePokemon] = useState(0);
  const [activeClass, setActiveClass] = useState(false);

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

  const initValues = {
    name: "",
    region: "",
    pokemon: "",
  };
  if (!loadingPokemons && response) {
    return (
      <>
        <div className="">
          <div className="flex justify-center items-center w-full h-full ">
            <div className="w-8/12 h-1/2 shadow-lg rounded-2xl ring-2">
              <Box className="flex justify-center">
                <Formik
                  initialValues={initValues}
                  onSubmit={(values, actions) => {
                    actions.setSubmitting(false);
                    <Navigate
                      to={routes.pokemonTable}
                      state={{ values: values }}
                      replace
                    />;
                  }}
                >
                  {(props) => (
                    <Form>
                      <div className="text-center	">
                        <FormGroup className="text-center m-2">
                          <br />
                          <FormControl fullWidth>
                            <Field
                              name="name"
                              placeholder="Nazwa trenera pokemon"
                              type="text"
                              id="name"
                              component={Input}
                              value={props.values.name}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              variant="outlined-basic"
                            />
                          </FormControl>
                        </FormGroup>

                        <FormGroup className="text-center">
                          <Label htmlFor="name" className="text-center">
                            Region z którego pochodzisz
                          </Label>

                          <br />
                          <FormControl fullWidth>
                            <InputLabel id="region-label">Region</InputLabel>
                            <Field
                              name="region"
                              id="region"
                              component={Select}
                              // selected={props.values.region}
                              labelId="region-label"
                              onChange={(e: SelectChangeEvent) =>
                                (props.values.region = e.target.value as string)
                              }
                              // (e: SelectChangeEvent) => {
                              //   props.setFieldValue(
                              //     props.values.region,
                              //     e.target.value as string,
                              //     false,
                              //   );
                              //   console.log(e.target.value as string);
                              // }
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

                        <FormGroup className="m-auto">
                          <Label className="text-center">
                            <div className="mb-2">Twój startowy pokemon</div>
                          </Label>

                          <div className="tabs tabs-boxed w-full bg-gray-100">
                            <a
                              className={`tab h-32 ${
                                activeClass && activePokemon === 1
                                  ? "tab-active"
                                  : ""
                              }`}
                              id="1"
                              onClick={() => {
                                setActiveClass(true);
                                setActivePokemon(1);

                                props.values.pokemon = response[0]!.data!.name;
                                console.log(props.values.pokemon);
                                return;
                              }}
                            >
                              <img
                                src={response[0]!.data!.sprites.front_default}
                              />
                            </a>
                            <a
                              className={`tab h-32 mx-4 ${
                                activeClass && activePokemon === 2
                                  ? "tab-active"
                                  : ""
                              }`}
                              id="2"
                              onClick={(event) => {
                                setActiveClass(true);
                                setActivePokemon(2);

                                props.values.pokemon = response[1]!.data!.name;
                                console.log(props.values.pokemon);
                                return;
                              }}
                            >
                              <img
                                src={response[1]!.data!.sprites.front_default}
                              />
                            </a>
                            <a
                              className={`tab h-32 ${
                                activeClass && activePokemon === 3
                                  ? "tab-active"
                                  : ""
                              }`}
                              id="3"
                              onClick={(event) => {
                                setActiveClass(true);
                                setActivePokemon(3);

                                props.values.pokemon = response[2]!.data!.name;
                                console.log(props.values.pokemon);
                                return;
                              }}
                            >
                              <img
                                src={response[2]!.data!.sprites.front_default}
                              />
                            </a>
                          </div>
                        </FormGroup>
                        <br />
                        <Link to={routes.pokemonTable} state={props.values}>
                          <Button
                            className="btn-lg w-20"
                            type="submit"
                            onClick={() => console.log(props.values)}
                          >
                            Yay!
                          </Button>
                        </Link>
                      </div>

                      <div className="flex justify-center m-4"></div>
                    </Form>
                  )}
                </Formik>
              </Box>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};
