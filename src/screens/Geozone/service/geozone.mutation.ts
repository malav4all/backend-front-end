import { gql } from "@apollo/client";

export const ADD_GEOZONE = gql`
  mutation ($input: CreateGeoZoneInput!) {
    addGeozone(input: $input) {
      success
      message
    }
  }
`;

export const FETCH_GEOZONE = gql`
  mutation ($input: GeozoneInput!) {
    listGeozone(input: $input) {
      success
      message
      paginatorInfo {
        count
      }
      data {
        _id
        name
        radius
        lat
        long
        country
        address
        state
        city
        area
        district
        zipCode
        centerNo
        type
      }
    }
  }
`;
