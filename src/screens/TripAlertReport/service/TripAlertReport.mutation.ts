import { gql } from "@apollo/client";

export const ALERT_TABLE_DATA = gql`
  mutation ($input: AlertTripReportInputType!) {
    getTripAlertData(input: $input) {
      totalCount
      rowData {
        latitude
        time
        event
        accountId
        alertMessage
        latitude
        longitude
        imei
      }
    }
  }
`;
