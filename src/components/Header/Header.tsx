/** @format */

import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  console.log(location);
  return (
    <Box className="w-full h-16 p-2">
      <Box className="flex justify-center items-center h-full bg-white shadow-xl rounded-box">
        <Box className="m-2">
          <span>
            Witaj trenerze {location.state.name} z regionu{" "}
            {location.state.region} a twój startowy pokemon to{" "}
            {location.state.pokemon}{" "}
          </span>
        </Box>
      </Box>
    </Box>
  );
};
