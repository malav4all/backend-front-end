import { gql } from "@apollo/client";

export const GET_ARCHIVE_ROUTES = gql`
  mutation {
    archiveRoutes {
      success
      message
      data {
        _id
        routesName
        createdBy
        startDate
        endDate
        totalDistance
        totalDuration
        imei
        createdAt
        updatedAt
      }
    }
  }
`;
