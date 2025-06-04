import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import reportWebVitals from "@app/configs/reportWebVitals";
import App from "@app/routes/App";

import "@app/styles/globals.css";

const queryKey = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryKey}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
