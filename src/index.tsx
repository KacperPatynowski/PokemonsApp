/** @format */

import "./index.css";

import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";
import { Paper } from "@mui/material";

export * from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <div className="w-screen h-full ">
      <App />
    </div>
  </QueryClientProvider>,
);
