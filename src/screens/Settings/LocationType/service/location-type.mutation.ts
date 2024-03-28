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

export const SEARCH_LOCATION = gql`
  mutation ($input: SearchLocationsInput!) {
    searchLocations(input: $input) {
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
