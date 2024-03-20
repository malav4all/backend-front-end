import { client } from "../../../core-services/graphql/apollo-client";
import {
  BASE_URL_POSTAL_PIN_CODE,
  Service,
  ServiceResponse,
  endpoints,
} from "../../../core-services/rest-api";
import { ADD_GEOZONE, FETCH_GEOZONE, UPDATE_GEOZONE } from "./geozone.mutation";

export const getAddressDetailsByPincode = async (pincode: string) => {
  const service = new Service(BASE_URL_POSTAL_PIN_CODE);
  try {
    const response = await service?.get(
      `${endpoints.external.postalpincode}/${pincode}`
    );
    return response?.data[0]?.PostOffice;
  } catch (error: any) {
    throw error.message;
  }
};

export const createGeozone = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ADD_GEOZONE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchGeozoneHandler = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_GEOZONE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const updateGeozone = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_GEOZONE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
