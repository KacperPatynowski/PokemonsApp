import "./index.css";

import { PokemonsProvider } from "components/PokemonContext";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";

export * from "./App";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
	<QueryClientProvider client={queryClient}>
		<PokemonsProvider>
			<App />
		</PokemonsProvider>
	</QueryClientProvider>
);
