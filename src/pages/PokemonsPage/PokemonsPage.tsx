/** @format */
import { Header } from "components/Header/Header";

import { PokemonsTable } from "components/OddTable/PokemonsTable";
import { SearchBar } from "components/SearchBar";
import { SearchInput } from "components/SearchInput";
import { css } from "@emotion/react";

export const PokemonsPage = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center">
        <SearchInput
          placeholder="Search"
          size="md"
          onChange={() => console.log("xd")}
        />
      </div>
      <PokemonsTable />
    </>
  );
};
