import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import reportWebVitals from "@app/configs/reportWebVitals";
import App from "@app/routes/App";

import "@app/styles/globals.css";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
