import { client } from "../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../core-services/rest-api";
import { ADD_JOURNEY, FETCH_JOURNEY } from "./journey.mutation";

export const createJourney = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ADD_JOURNEY,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchJourney = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_JOURNEY,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};