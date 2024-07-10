import { gql } from "@apollo/client";

export const ADD_DEVICE = gql`
  mutation ($input: CreateAddDeviceInput!) {
    addDeviceList(input: $input) {
      success
      message
    }
  }
`;

export const FETCH_ADD_DEVICE_LIST = gql`
  mutation ($input: AddDeviceInput!) {
    fetchDeviceList(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        deviceId
        imei
        deviceModelType
        deviceModelName
        deviceModelCode
        createdBy
      }
    }
  }
`;

export const SEARCH_DEVICE_LIST = gql`
  mutation ($input: SearchLocationsInput!) {
    searchLocations(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        imei
        deviceModelCode
      }
    }
  }
`;

export const UPDATE_DEVICE_LIST = gql`
  mutation ($input: UpdateAddDeviceInput!) {
    updateDeviceList(input: $input) {
      success
      message
    }
  }
`;

export const BULK_DEVICE_UPLOAD = gql`
  mutation ($input: [CreateAddDeviceInput!]!) {
    bulkUploadDevice(input: $input) {
      success
      message
    }
  }
`;
