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
          imei
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

export const TRIP_COUNT = gql`
  mutation ($input: TripCountInput!) {
    tripCount(input: $input) {
      todayActiveTripsCount
      totalActiveTripsCount
    }
  }
`;
