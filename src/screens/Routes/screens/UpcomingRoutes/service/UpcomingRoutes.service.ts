import { client } from "../../../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../../../core-services/rest-api";
import {  FETCH_UPCOMING_ROUTES } from "./UpcomingRoutes.mutation";

export const upComingRoutes = async (): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_UPCOMING_ROUTES,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

