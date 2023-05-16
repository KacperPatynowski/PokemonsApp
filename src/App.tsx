/** @format */

import "./App.css";

import { CssBaseline } from "@mui/material";
import { PokemonsTable } from "components/OddTable/PokemonsTable";
import { PokemonsProvider } from "components/PokemonContext";
import { PokemonsPage } from "pages/PokemonsPage";
import React, { useContext, useEffect, useState } from "react";
import { QueryClient } from "react-query";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  redirect,
} from "react-router-dom";
import { routes } from "routes";
import { useStarterPokemons } from "services/api/useStarterPokemons";

import { SignUp } from "../src/components/Modal";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <>
      <PokemonsProvider>
        <React.StrictMode>
          <BrowserRouter>
            <CssBaseline />
            <Routes>
              <Route path="*" element={<Navigate to={routes.signup} />} />
              <Route path={routes.signup} element={<SignUp />} />
              <Route path={routes.pokemonTable} element={<PokemonsPage />} />
            </Routes>
          </BrowserRouter>
        </React.StrictMode>
      </PokemonsProvider>
    </>
  );
};

export default App;
