import "./App.css";

import { CssBaseline } from "@mui/material";
import { PokemonsProvider } from "components/PokemonContext";
import { PokemonsPage } from "pages/PokemonsPage";
import React, { useContext, useEffect, useState } from "react";
import { QueryClient } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "routes";
import { useStarterPokemons } from "services/api/useStarterPokemons";

import { OpenModal } from "../src/components/Modal";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});
const App = () => {
	const [isOpen, setIsOpen] = useState(false);

	// const { data: response } = usePokemonsQuery();
	// const PokemonContext = React.createContext(response);

	useEffect(() => {
		setInterval(() => setIsOpen(!isOpen), 1);
	}, []);

	//

	const { data: starterResponse } = useStarterPokemons();

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

	// const context = useContext(PokemonsProvider.)

	return (
		<>
			<div className="w-screen h-screen">
				<PokemonsProvider>
					<React.StrictMode>
						<BrowserRouter>
							<CssBaseline />
							<Routes>
								<Route path={routes.modal} element={<OpenModal />} />
								<Route path={routes.pokemonTable} element={<PokemonsPage />} />
								{/* <Route path={routes.pokemonCompare} element={<PokemonCompareModal/>}/> */}
							</Routes>
						</BrowserRouter>
					</React.StrictMode>
				</PokemonsProvider>
			</div>
		</>
	);
};

export default App;
