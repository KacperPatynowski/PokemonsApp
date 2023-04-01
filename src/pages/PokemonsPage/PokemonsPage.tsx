/** @format */

import { Header } from "components/Header/Header";
import Paper from "@mui/material/Paper";
import PokemonsTable from "components/OddTable/OddTable";
import React from "react";

export const PokemonsPage = () => {
  return (
    <>
      <Header />
      <PokemonsTable />
    </>
  );
};
