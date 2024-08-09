import { gql } from "@apollo/client";

export const GET_DISTANCE = gql`
  mutation ($input: DistanceReportInputType!) {
    getDistanceReportData(input: $input) {
      imei
      coordinates {
        latitude
        longitude
        time
      }
    }
  }
`;
