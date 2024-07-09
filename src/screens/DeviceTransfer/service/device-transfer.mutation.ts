import { gql } from "@apollo/client";

export const FILTER_IMEI_ACCOUNT_ID = gql`
  mutation ($input: DeviceOnboardingAccountIdInput!) {
    filterRecordAccountId(input: $input) {
      data {
        _id
        deviceOnboardingIMEINumber
      }
    }
  }
`;

export const TRANSFER_IMEI_TO_ACCOUNT = gql`
  mutation ($input: DeviceTransferInput!) {
    deviceTransferOneToAnotherAccount(input: $input) {
      message
    }
  }
`;
