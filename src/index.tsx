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
import CustomThemeProvider from "./redux/ThemeContext";
import { liveClient } from "./core-services/live-data/live-data";
import { alertClient } from "./core-services/alert/alert";

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "fr", "hi"],
    fallbackLng: "en",
    debug: false,

    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
  });

declare global {
  interface Window {
    __forceSmoothScrollPolyfill__: boolean;
  }

  interface Window {
    __forceSmoothScrollPolyfill__: boolean;
    H: any;
  }
}

window.__forceSmoothScrollPolyfill__ = true;
smoothscroll.polyfill();

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloProvider client={liveClient}>
      <ApolloProvider client={alertClient}>
        <StyledEngineProvider injectFirst>
          <StylesProvider>
            <ThemeProvider theme={theme}>
              <Provider store={store}>
                <React.StrictMode>
                  <ErrorBoundary>
                    <CustomThemeProvider>
                      <App />
                    </CustomThemeProvider>
                  </ErrorBoundary>
                </React.StrictMode>
              </Provider>
            </ThemeProvider>
          </StylesProvider>
        </StyledEngineProvider>
      </ApolloProvider>
    </ApolloProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
