import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import reportWebVitals from "@app/configs/reportWebVitals";
import App from "@app/routes/App";

import { queryClient } from "@shared/lib/react-query/queryClient";

import "@app/styles/globals.css";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
