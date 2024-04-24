import { gql } from "@apollo/client";

export const ADD_DEVICE_GROUP = gql`
  mutation ($input: CreateDeviceGroupInput!) {
    createDeviceGroup(input: $input) {
      success
      message
    }
  }
`;

export const FETCH_DEVICE_GROUP = gql`
  mutation ($input: DeviceGroupInput!) {
    fetchDeviceGroup(input: $input) {
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
        imeiData {
          _id
          imei
          boxSet
          labelName
          createdBy
        }
      }
    }
  }
`;

export const UPDATE_DEVICE_GROUP = gql`
  mutation ($input: UpdateDeviceGroupInput!) {
    updateDeviceGroup(input: $input) {
      success
      message
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
