import { gql } from "@apollo/client";

export const FETCH_DEVICE_ONBOARDING_HISTORY = gql`
  mutation ($input: DeviceOnboardingHistoryFetchInput!) {
    fetchDeviceOnboardingHistoryList(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        deviceOnboardingAccount {
          accountName
        }
        deviceOnboardingSimNo
        deviceOnboardingIMEINumber
        deviceOnboardingDate
        deviceDeboardingDate
        createdBy
        updatedBy
      }
    }
  }
`;

export const FETCH_DEVICE_SIM_HISTORY = gql`
  mutation ($input: DeviceSimHistoryFetchInput!) {
    fetchDeviceSimHistoryList(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        deviceOnboardingSimNo
        deviceOnboardingIMEINumber
        fromDate
        toDate
        createdBy
        updatedBy
      }
    }
  }
`;
