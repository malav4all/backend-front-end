export const insertAccountField = (data?: any, edit?: boolean) => {
  return {
    accountName: {
      value: data?.accountName ?? "",
      error: "",
    },

    accountContactName: {
      value: data?.accountContactName ?? "",
      error: "",
    },

    accountContactEmail: {
      value: data?.accountContactEmail ?? "",
      error: "",
    },

    accountAddress: {
      value: data?.accountAddress ?? "",
      error: "",
    },

    accountContactMobile: {
      value: data?.accountContactMobile ?? "",
      error: "",
    },

    accountType: {
      value: data?.industryType?._id ?? (data?.industryType?.name || ""),
      error: "",
    },
    accountPanNo: {
      value: data?.accountPanNo ?? "",
      error: "",
    },
    accountGstNo: {
      value: data?.accountGstNo ?? "",
      error: "",
    },
    accountAadharNo: {
      value: data?.accountAadharNo ?? "",
      error: "",
    },
    accountState: {
      value: data?.accountState ?? "",
      error: "",
    },
    accountCity: {
      value: data?.accountCity ?? "",
      errorr: "",
    },
    remarks: {
      value: data?.remarks ?? "",
      error: "",
    },
    accountAuthMobile: {
      value: "",
      error: "",
    },
    accountApiKey: {
      value: "",
      error: "",
    },
    accountCreatedBy: {
      value: "",
      error: "",
    },
    accountValue: {
      value: "",
      error: "",
    },
    accountKey: {
      value: "",
      error: "",
    },
    accountAuthorizedNo: {
      value: "",
      error: "",
    },
  };
};

export const accountTableHeader = [
  {
    name: "Account Name",
    field: "accountName",
  },
  {
    name: "Account Contact Name",
    field: "accountContactName",
  },
  {
    name: "Account Contact Email",
    field: "accountContactEmail",
  },
  {
    name: "Account Contact Mobile",
    field: "accountContactMobile",
  },
  {
    name: "Account Address",
    field: "accountAddress",
  },
  {
    name: "Account Type",
    field: "accountType",
  },
  {
    name: "Action",
    field: "action",
    align: "center",
  },
];
