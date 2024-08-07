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
