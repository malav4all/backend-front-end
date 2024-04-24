import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./utils/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import ThemeProvider from "@mui/styles/ThemeProvider";
import { theme } from "./utils/styles";
import smoothscroll from "smoothscroll-polyfill";
import { StylesProvider } from "@mui/styles";
import { StyledEngineProvider } from "@mui/material";
import ErrorBoundary from "./utils/ErrorBoundary";
import { ApolloProvider } from "@apollo/client";
import { client } from "./core-services/graphql/apollo-client";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "fr", "hi"],
    fallbackLng: "en",
    debug: false,
    // Options for language detector
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    // react: { useSuspense: false },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
  });

// steps to override default smooth scrolling behaviour in browsers
declare global {
  interface Window {
    __forceSmoothScrollPolyfill__: boolean;
  }
}

declare global {
  interface Window {
    __forceSmoothScrollPolyfill__: boolean;
    H: any;
  }
}

window.__forceSmoothScrollPolyfill__ = true;
smoothscroll.polyfill();

ReactDOM.render(
  <ApolloProvider client={client}>
    <StyledEngineProvider injectFirst>
      <StylesProvider>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <React.StrictMode>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
            </React.StrictMode>
          </Provider>
        </ThemeProvider>
      </StylesProvider>
    </StyledEngineProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
