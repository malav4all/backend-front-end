import { gql } from "@apollo/client";

export const FETCH_TRACKPLAY_DATA = gql`
  mutation {
    getRowData {
      imei
      direction
      lat
      lng
      label
      currentTime
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
