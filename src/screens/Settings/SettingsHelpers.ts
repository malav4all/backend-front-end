/* eslint-disable no-sparse-arrays */
import strings from "../../global/constants/StringConstants";
export const tabConfig = () => [
  {
    label: strings.USERS,
    count: 0,
  },
  {
    label: strings.LOCATIONTYPE,
    count: 0,
  },
];

export const getTabLabelFromUrl = (tabUrl: any) => {
  switch (tabUrl) {
    // case "profile":
    //   return strings.profile;
    case "billing-usage":
      return strings.billingUsage;
    case "role-management":
      return strings.roleManagement;
    case "user":
      return strings.USERS;
    default:
      return "";
  }
};

export const getUrlFromTabLabel = (tabLabel: any) => {
  switch (tabLabel) {
    case strings.profile:
      return "profile";
    case strings.billingUsage:
      return "billing-usage";
    case strings.roleManagement:
      return "role-management";
    case strings.USERS:
      return "user";
    default:
      return "";
  }
};
