import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { createGlobalStyle } from "styled-components";

const root = ReactDOM.createRoot(document.getElementById("root"));
const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Nunito Sans", sans-serif !important;
  }
`;

root.render(
    <ChakraProvider>
      <GlobalStyle />
      <App />
    </ChakraProvider>
);
