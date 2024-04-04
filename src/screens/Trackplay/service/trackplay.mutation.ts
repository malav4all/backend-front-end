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
        description
        locationType
        mobileNumber
        finalAddress
        address {
          country
          state
          city
          area
          district
          zipCode
        }
        geoCodeData {
          type
          geometry {
            type
            coordinates
            radius
          }
        }
      }
    }
  }
`;

export const UPDATE_GEOZONE = gql`
  mutation ($input: UpdateGeozoneInput!) {
    updateGeozone(input: $input) {
      success
      message
    }
  }
`;
