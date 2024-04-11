import { gql } from "@apollo/client";

export const GET_DISTANCE = gql`
  mutation ($input: AlertInputType!) {
    fetchDistanceReport(input: $input) {
      imei
      coordinates {
        latitude
        longitude
        time
      }
    }
  }
`;
