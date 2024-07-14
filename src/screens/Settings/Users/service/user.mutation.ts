import { gql } from "@apollo/client";

export const FETCH_ACCOUNT = gql`
  mutation ($input: AccountInput!) {
    fetchAccountModuleList(input: $input) {
      paginatorInfo {
        count
        currentPage
      }
      success
      message
      data {
        _id
        accountName
      }
    }
  }
`;

export const FETCH_USER = gql`
  mutation ($input: UserInput!) {
    userListAll(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        firstName
        lastName
        userName
        accountName
        email
        mobileNumber
        createdBy
        roleId {
          _id
        }
        roleName
        status
        accountId {
          _id
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation ($input: CreateUserInput!) {
    addUser(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_USER = gql`
  mutation ($input: UpdateUserInput!) {
    updateUser(input: $input) {
      success
      message
    }
  }
`;

export const FETCH_ROLE = gql`
  mutation ($input: RoleInput!) {
    roleListAll(input: $input) {
      success
      message
      data {
        _id
        name
        industryType {
          name
        }
      }
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      success
      message
    }
  }
`;

export const SEARCH_USER = gql`
  mutation ($input: SearchUsersInput!) {
    searchUsers(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        firstName
        lastName
        email
        mobileNumber
        userName
        roleName
        accountName
        status
        createdBy
      }
    }
  }
`;
