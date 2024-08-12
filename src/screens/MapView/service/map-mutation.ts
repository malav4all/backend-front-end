import { gql } from "@apollo/client";

export const FETCH_DEVICE_MAP = gql`
  mutation ($input: MapViewInputType!) {
    viewAllDeviceMap(input: $input) {
      latitude
      longitude
      imei
    }
  }
`;
