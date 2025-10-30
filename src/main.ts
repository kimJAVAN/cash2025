import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(ChakraProvider, { theme: theme },
      React.createElement(ColorModeScript, { initialColorMode: theme.config.initialColorMode }),
      React.createElement(App)
    )
  )
);
