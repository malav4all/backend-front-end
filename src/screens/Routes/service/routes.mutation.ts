import { gql } from "@apollo/client";

export const ADD_ROUTES = gql`
  mutation ($input: CreateRoutesInput!) {
    addRoutes(input: $input) {
      success
      message
    }
  }
`;

export const FETCH_ROUTES = gql`
  mutation ($input: RoutesInput!) {
    fetchRoutes(input: $input) {
      success
      message
      paginatorInfo {
        count
      }
      data {
        _id
        routesName
        imei
        startDate
        endDate
        totalDistance
        totalDuration
        routesData {
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
  mutation ($input: SearchRoutessInput!) {
    searchRoutess(input: $input) {
      success
      message
      paginatorInfo {
        count
      }
      data {
        _id
        imei
        routesName
        startDate
        endDate
        totalDistance
        totalDuration
        routesData {
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
