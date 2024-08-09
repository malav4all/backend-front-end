import { gql } from "@apollo/client";

export const ADD_ROUTES = gql`
  mutation ($input: CreateRouteInput!) {
    addRoute(input: $input) {
      success
      message
    }
  }
`;

export const FETCH_ROUTES = gql`
  mutation ($input: RouteInput!) {
    fetchRoute(input: $input) {
      success
      message
      paginatorInfo {
        count
      }
      data {
        _id
        routeName
        routeId
        routeDetails
        totalDistance
        totalDuration
        createdBy
      }
    }
  }
`;

export const COORDINATES_SUBSCRIPTION = gql`
  subscription CoordinatesUpdated($topic: String!) {
    coordinatesUpdated(topic: $topic) {
      lat
      lng
      direction
    }
  }
`;

export const SEARCH_ROUTES = gql`
  mutation ($input: SearchRouteInput!) {
    searchRoute(input: $input) {
      success
      message
      paginatorInfo {
        count
      }
      data {
        _id
        routeName
        totalDistance
        totalDuration
        routeData {
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
        createdBy
      }
    }
  }
`;

export const SPEED_GRAPH = gql`
  mutation ($input: GetBatteryPercentageGraphInput!) {
    speedGraphData(input: $input) {
      xaxis {
        categories
      }
      series {
        name
        data
      }
    }
  }
`;

export const BATTERY_GRAPH = gql`
  mutation ($input: GetBatteryPercentageGraphInput!) {
    batteryGraphDataData(input: $input) {
      xaxis {
        categories
      }
      series {
        name
        data
      }
    }
  }
`;
