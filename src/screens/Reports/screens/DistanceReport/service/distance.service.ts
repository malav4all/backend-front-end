import { client } from "../../../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../../../core-services/rest-api";
import { GET_DISTANCE } from "./distance.mutation";

export const getDistanceReport = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: GET_DISTANCE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
