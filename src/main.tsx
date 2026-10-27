import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource-variable/mona-sans/wdth.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import "@fontsource/orbitron/700.css";
import "@fontsource/orbitron/800.css";
import "@fontsource/orbitron/900.css";
import "@fontsource/chakra-petch/500.css";
import "@fontsource/chakra-petch/600.css";
import "reveal.js/reveal.css";
import "./theme/theme.css";

import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
