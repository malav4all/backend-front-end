import { gql } from "@apollo/client";

export const FETCH_TRIP_LIST = gql`
  mutation ($input: TripInput!) {
    tripList(input: $input) {
      paginatorInfo {
        count
      }
      message
      data {
        tripData {
          vehicleNo
        }
        startPoint 
        endPoint
        tripEndDate
        status
        tripId
      }
    }
  }
`;
