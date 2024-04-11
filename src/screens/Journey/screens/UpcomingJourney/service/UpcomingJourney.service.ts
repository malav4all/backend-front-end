import { client } from "../../../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../../../core-services/rest-api";
import {  FETCH_UPCOMING_JOURNEY } from "./UpcomingJourney.mutation";

export const upComingJourney = async (): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_UPCOMING_JOURNEY,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

