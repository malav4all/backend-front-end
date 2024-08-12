import { gql } from "@apollo/client";

export const FETCH_TRACKPLAY_DATA = gql`
  mutation ($input: DistanceTrackPlayInputType!) {
    getDistanceTrackPlay(input: $input) {
      latitude
      longitude
      imei
      bearing
      speed
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
