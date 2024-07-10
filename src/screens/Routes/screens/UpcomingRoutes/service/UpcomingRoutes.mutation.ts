import { gql } from "@apollo/client";

export const FETCH_UPCOMING_ROUTES = gql`
  mutation {
    upComingRoutes {
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
