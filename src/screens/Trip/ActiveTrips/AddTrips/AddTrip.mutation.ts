import { gql } from "@apollo/client";
export const GET_ALL_DEVICE = gql`
  mutation {
    getAllDeviceList {
      imei
      labelName
      _id
      createdBy
    }
  }
`;

export const FETCH_GEOZONE = gql`
  mutation ($input: GeozoneInput!) {
    listGeozone(input: $input) {
      success
      message
      paginatorInfo {
        count
      }
      data {
        _id
        name
        description
        locationId
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
    }
  }
`;

export const FETCH_ENTITY = gql`
  mutation ($input: EntitesTypeInput!) {
    fetchEntityByTripTypeAndType(input: $input) {
      success
      message
      paginatorInfo {
        count
      }
      data {
        _id
        createdBy
        aadharCardNo
        gstIn
        contactPhone
        contactEmail
        contactName
        pinCode
        district
        area
        state
        city
        address
        type
        name
        tripTypeList
        accountId
      }
    }
  }
`;
