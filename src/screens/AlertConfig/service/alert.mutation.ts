import { gql } from "@apollo/client";

export const ADD_ALERT_CONFIG = gql`
  mutation ($input: CreateAlertInputType!) {
    addAlert(input: $input) {
      success
      message
    }
  }
`;

export const ALERT_TABLE_CONFIG_DATA = gql`
  mutation ($input: AlertInput!) {
    fetchAlert(input: $input) {
      paginatorInfo {
        count
      }
      data {
        _id
        alertName
        isAlertDisable
        alertConfig {
          alertImeiGroup {
            deviceGroupName
            imei
            deviceGroupId
          }
          userSelectedImei
          alertData {
            event
            location
            startDate
            endDate
          }
        }
        mobileNo
        createdBy
      }
    }
  }
`;

export const UPDATE_ALERT_CONFIG = gql`
  mutation ($input: UpdateAlertInput!) {
    updateAlert(input: $input) {
      success
      message
    }
  }
`;
