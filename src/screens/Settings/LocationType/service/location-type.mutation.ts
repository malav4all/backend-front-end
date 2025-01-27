import { gql } from "@apollo/client";

export const ADD_LOCATION_TYPE = gql`
  mutation ($input: CreateLocationTypeInput!) {
    addLocationType(input: $input) {
      success
      message
    }
  }
`;

export const FETCH_LOCATION_TYPE = gql`
  mutation ($input: LocationTypeInput!) {
    fetchLocationType(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        type
      }
    }
  }
`;

export const UPDATE_LOCATION_TYPE = gql`
  mutation ($input: UpdateLocationTypeInput!) {
    updateLocationType(input: $input) {
      success
      message
    }
  }
`;

export const SEARCH_LOCATION = gql`
  mutation ($input: SearchLocationsInput!) {
    searchLocationTypes(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        type
      }
    }
  }
`;
