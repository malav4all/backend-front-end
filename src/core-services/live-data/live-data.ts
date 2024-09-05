/* eslint-disable no-loop-func */
/* eslint-disable no-console */
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  split,
  FetchResult,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { store } from "../../utils/store";
import { REFRESH_TOKEN } from "../../screens/LandingPage/login-mutation";
import { updateTokens } from "../../redux/authSlice";
import { getMainDefinition, Observable } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { HttpLink } from "@apollo/client/link/http";

interface AccessToken {
  accessToken: string;
}

const httpLink = new HttpLink({
  uri: `http://103.20.214.201:9090/graphql`,
});

const wsLink = new WebSocketLink({
  uri: `ws://103.20.214.201:9090/subscriptions`,
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }: any) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.exception?.status) {
          case 401:
            const observable = new Observable<FetchResult<Record<string, any>>>(
              (observer) => {
                (async () => {
                  try {
                    const accessToken = await refreshToken();
                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer),
                    };

                    const oldHeaders = operation.getContext().headers;
                    operation.setContext({
                      headers: {
                        ...oldHeaders,
                        Authorization: `Bearer ${accessToken}`,
                      },
                    });
                    return forward(operation).subscribe(subscriber);
                  } catch (err) {
                    observer.error(err);
                  }
                })();
              }
            );

            return observable;
          default:
            break;
        }
      }
    }
    if (networkError) {
      if (networkError.message === "Failed to fetch") {
        alert("Backend Server is not responding. Please try again later.");
      } else {
        alert(`[Network error]: ${networkError}`);
      }
    }
  }
);

const refreshToken = async () => {
  try {

    const refreshResolverResponse = await liveClient.mutate<{
      refreshToken: AccessToken;
    }>({
      mutation: REFRESH_TOKEN,
    });

    const accessToken = refreshResolverResponse.data?.refreshToken.accessToken;

    // store.dispatch(updateTokens(accessToken));
    return accessToken;
  } catch (err) {
    throw err;
  }
};

export const liveClient = new ApolloClient({
  link: from([link, errorLink]),
  cache: new InMemoryCache(),
});

export { ApolloProvider };
