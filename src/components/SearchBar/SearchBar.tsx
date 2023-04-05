/** @format */

import { TextField } from "@mui/material";
import React from "react";

interface IProps {
  fullwidth?: boolean;
  label?: string;
  id?: string;
}

export const SearchBar = ({ fullwidth, label, id }: IProps) => {
  return <TextField label={label} id={id} />;
};
