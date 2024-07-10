import { gql } from "@apollo/client";

export const ARCHIVE_ROUTES = gql`
  mutation {
    archiveRoutes {
      data {
        routesName
        createdBy
        startDate
        endDate
        totalDistance
        totalDuration
      }
    }
  }
`;
