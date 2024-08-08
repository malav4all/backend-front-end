import React, { createContext, useContext } from "react";
import { ApolloProvider } from "@apollo/client";
import { alertClient } from "./core-services/alert/alert";

const AlertClientContext = createContext();

export const AlertClientProvider = ({ children }) => {
  return (
    <AlertClientContext.Provider value={alertClient}>
      <ApolloProvider client={alertClient}>{children}</ApolloProvider>
    </AlertClientContext.Provider>
  );
};

export const useAlertClient = () => useContext(AlertClientContext);
