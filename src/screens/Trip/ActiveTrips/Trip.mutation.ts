import { gql } from "@apollo/client";
export const GET_ALL_TRIPS = gql`
  mutation ($input: TripInput!) {
    tripList(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        accountId
        tripId
        status
        primaryAccount
        tripStartDate
        tripEndDate
        tripData {
          imei
          vehicleNo
          tripDate
          remarks
        }
        route
        alertConfig
        startPoint
        endPoint
        metaData
        accessAccount
        createdBy
        updatedBy
        createdAt
      }
    }
  }
`;

export const SEARCH_DEVICE_GROUP = gql`
  mutation ($input: SearchDeviceGroupInput!) {
    searchDeviceGroup(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        deviceGroupName
        createdBy
        updateBy
      }
    }
  }
`;

export const FETCH_TRIP_METRICS = gql`
  mutation ($input: TripInput!) {
    getTripStatusMetrics(input: $input) {
      data {
        status
        count
      }
    }
  }
`;

export const FETCH_TRIP_BY_ID = gql`
  mutation ($input: TripIDInput!) {
    fetchTripById(input: $input) {
      data {
        _id
        metaData
        endPoint
        startPoint
        tripData {
          imei
          vehicleNo
          tripDate
          remarks
        }
        route
        alertConfig
        tripEndDate
        tripStartDate
        primaryAccount
        status
        tripId
        accountId
      }
    }
  }
`;
