import React, { createContext, useContext } from "react";
import { ApolloProvider } from "@apollo/client";
import { liveClient } from "./core-services/live-data/live-data";

const LiveClientContext = createContext();

export const LiveClientProvider = ({ children }) => {
  return (
    <LiveClientContext.Provider value={liveClient}>
      <ApolloProvider client={liveClient}>{children}</ApolloProvider>
    </LiveClientContext.Provider>
  );
};

export const useLiveClient = () => useContext(LiveClientContext);
