import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import {store} from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const root = ReactDOM.createRoot(document.getElementById("root"));
let persistor = persistStore(store);
const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Nunito Sans", sans-serif !important;
  }
`;

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ChakraProvider>
        <GlobalStyle />
        <App />
      </ChakraProvider>
    </PersistGate>
  </Provider>
);
