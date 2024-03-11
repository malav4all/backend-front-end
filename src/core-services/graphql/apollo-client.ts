/* eslint-disable no-loop-func */
/* eslint-disable no-console */
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  from,
  Observable,
  FetchResult,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { store } from "../../utils/store";
import { REFRESH_TOKEN } from "../../screens/LandingPage/login-mutation";
import { updateTokens } from "../../redux/authSlice";

interface AccessToken {
  accessToken: string;
}

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
  const apiKey = store.getState().auth.apiKey;
  const authorizationHeader = apiKey
    ? { "x-api-key": apiKey }
    : { Authorization: `Bearer ${store.getState().auth.accessToken}` };

  return {
    headers: {
      ...headers,
      ...authorizationHeader,
      "x-tenant-id": store.getState().auth.tenantId || "",
    },
  };
});

const UploadLink = createUploadLink({
  uri: getBaseUrl(process.env.REACT_APP_ENV),
  fetch: customFetch,
});

// const errorLink = onError(
//   ({ graphQLErrors, networkError, operation, forward }: any) => {
//     if (graphQLErrors) {
//       for (let err of graphQLErrors) {
//         switch (err.extensions.exception?.status) {
//           case 401:
//             const observable = new Observable<FetchResult<Record<string, any>>>(
//               (observer) => {
//                 (async () => {
//                   try {
//                     const accessToken = await refreshToken();
//                     const subscriber = {
//                       next: observer.next.bind(observer),
//                       error: observer.error.bind(observer),
//                       complete: observer.complete.bind(observer),
//                     };

//                     const oldHeaders = operation.getContext().headers;
//                     operation.setContext({
//                       headers: {
//                         ...oldHeaders,
//                         Authorization: `Bearer ${accessToken}`,
//                       },
//                     });
//                     return forward(operation).subscribe(subscriber);
//                   } catch (err) {
//                     observer.error(err);
//                   }
//                 })();
//               }
//             );

//             return observable;
//           default:
//             break;
//         }
//       }
//     }

//     if (networkError) console.log(`[Network error]: ${networkError}`);
//   }
// );

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
  link: authLink.concat(from([UploadLink])),
  cache: new InMemoryCache(),
});

export { ApolloProvider };
