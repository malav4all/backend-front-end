import { client } from "../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../core-services/rest-api";
import { FETCH_TRIP_LIST } from "./TripDashboard.mutation";

export const ListAllTrips = async (variable: any): Promise<any> => {
    try {
      const response = await client.mutate({
        mutation: FETCH_TRIP_LIST,
        variables: variable,
      });
  
      return response.data;
    } catch (error: any) {
      throw new ServiceResponse<any>(0, error.message, undefined);
    }
  };