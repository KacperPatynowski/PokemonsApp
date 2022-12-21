import { Header } from "components/Header/Header";
import React from "react";

import { TableDaisy } from "../../../src/components/Table";

// import { Box, Typography } from "@mui/material";
export const PokemonsPage = () => {
	return (
		<>
			{/* <div className="bg-red-500">
				<div className="navbar bg-white shadow-xl rounded-box mr-2">
					<div className="navbar-center">
						<a>
							Witaj name z regionu region i twój startowy pokemon to pokemon
						</a>
					</div>
				</div>
			</div> */}
			<Header />
			<TableDaisy />
		</>
	);
};
