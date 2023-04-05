/** @format */

import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

export const CompareButton = () => {
  return (
    <div className="rounded-3xl m-2 w-40 [background-color:rgba(0,0,0,0.08)] flex justify-center items-center">
      <FormControlLabel
        control={<Checkbox />}
        label="Compare"
        className="mr-0"
      />
    </div>
  );
};
