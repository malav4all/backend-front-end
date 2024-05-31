import { client } from "../../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../../core-services/graphql/service-response";
import {
  CHECK_EXITS_CUSTOMER_MODULE,
  CREATE_CUSTOMER_MODULE,
  FETCH_CUSTOMER_MODULE,
  SEARCH_CUSTOMER_MODULE,
} from "./Customer.mutation";

export const createModule = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: CREATE_CUSTOMER_MODULE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchTableHandler = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_CUSTOMER_MODULE,
      variables,
    });
    console.log(response);
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const searchTableHandler = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: SEARCH_CUSTOMER_MODULE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const checkExitsCustomerModule = async (
  variables: any
): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: CHECK_EXITS_CUSTOMER_MODULE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
