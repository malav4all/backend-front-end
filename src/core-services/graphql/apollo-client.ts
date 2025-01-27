import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  from,
  split,
  HttpLink,
  FetchResult,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { store } from "../../utils/store";
import { REFRESH_TOKEN } from "../../screens/LandingPage/login-mutation";
import { updateTokens } from "../../redux/authSlice";
import { getMainDefinition, Observable } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

interface AccessToken {
  accessToken: string;
}

const removeTypenameLink = removeTypenameFromVariables();

let apiCount = 0;

const customFetch = async (uri: any, options: any): Promise<any> => {
  try {
    apiCount++;
    const response = await fetch(uri, options).then((response) => {
      if (response.status >= 500) {
        apiCount--;
        return Promise.reject(response.status);
      }
      if (response) {
        apiCount--;
      }
      return response;
    });
    return response;
  } catch (error) {
    return await Promise.reject(error);
  }
};

const getBaseUrl = (env: any) => {
  switch (env) {
    case "Development":
      return process.env.REACT_APP_API_HOST_DEV;
    default:
      return process.env.REACT_APP_API_HOST_LOCAL;
  }
};

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${store.getState().auth.accessToken}`,
      "x-tenant-id": store.getState().auth.tenantId
        ? store.getState().auth.tenantId
        : "",
    },
  };
});

const uploadLink = createUploadLink({
  uri: getBaseUrl(process.env.REACT_APP_ENV),
  fetch: customFetch,
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }: any) => {
    console.log(graphQLErrors, networkError, operation);

    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.log(err);
        switch (err.extensions.exception?.status) {
          case 401:
            return new Observable<FetchResult<Record<string, any>>>(
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
                    forward(operation).subscribe(subscriber);
                  } catch (err) {
                    observer.error(err);
                  }
                })();
              }
            );
          default:
            break;
        }
      }
    }

    if (networkError) {
      const resultErrors = networkError.result?.errors;
      if (resultErrors && resultErrors.length > 0) {
        const graphqlError = resultErrors[0];
        const message = graphqlError.message || "An error occurred";
        const statusCode = graphqlError.extensions?.code || "Unknown code";

        console.error(`Network Error ${statusCode}: ${message}`);
        alert(`Network Error ${statusCode}: ${message}`);

        throw new Error(`Network Error ${statusCode}: ${message}`);
      } else if (networkError.message === "Failed to fetch") {
        alert("Backend Server is not responding. Please try again later.");
      } else {
        alert(`[Network error]: ${networkError.message}`);
      }
    }
  }
);

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://localhost:8080/subscriptions`,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  from([removeTypenameLink, authLink, uploadLink, errorLink])
);

const refreshToken = async () => {
  try {
    const refreshResolverResponse = await client.mutate<{
      refreshToken: AccessToken;
    }>({
      mutation: REFRESH_TOKEN,
    });
    const accessToken = refreshResolverResponse;
    store.dispatch(updateTokens(accessToken.data?.refreshToken! as any));
    return accessToken.data?.refreshToken;
  } catch (err) {
    throw err;
  }
};

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export { ApolloProvider };
