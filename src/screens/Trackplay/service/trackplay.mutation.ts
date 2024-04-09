import { gql } from "@apollo/client";

export const FETCH_TRACKPLAY_DATA = gql`
  mutation {
    getRowData {
     lat
     lng
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
