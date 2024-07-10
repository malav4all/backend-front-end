import strings from "../../../global/constants/StringConstants";
import { AssetAssingmentFields } from "../../../models/interfaces";
import { PhoneNumberUtil } from "google-libphonenumber";
import { store } from "../../../utils/store";

export const assetAssingmentTableHeader = [
  {
    name: "IMEI Number",
    field: "imei",
  },

  {
    name: "Label Name",
    field: "labelName",
  },

  {
    name: "Routes",
    field: "routes",
  },

  {
    name: "Box Set",
    field: "boxSet",
  },

  {
    name: "Created By",
    field: "createdBy",
  },

  {
    name: "Action",
    field: "action",
  },
];

export const insertAssetAssingmentField = (data?: any, edit?: any) => {
  return {
    imei: {
      value: data?.imei ?? "",
      error: "",
    },
    labelName: {
      value: data?.labelName ?? "",
      error: "",
    },
    routes: {
      value: data?.routes?._id ?? (data?.routes?.routesName || ""),
      error: "",
    },
    boxSet: {
      value: data?.boxSet ?? "",
      error: "",
    },
    createdBy: {
      value: store.getState().auth.userName,
      error: "",
    },
  } as any;
};

export const validateAddAssetAssingmentForm = (
  assetAssingmentFormFields: any,
  edit = false
) => {
  let isValid = true;
  let errors: any = { ...assetAssingmentFormFields };

  if (!errors.imei?.value) {
    errors.imei.error = "Please enter IMEI Number";
    isValid = false;
  }
  if (errors.imei?.value && !/^\d{1,20}$/.test(errors.imei.value)) {
    errors.imei.error =
      "IMEI must contain only digits and have a maximum length of 20";
    isValid = false;
  }

  if (!errors.labelName?.value) {
    errors.labelName.error = "Please enter Label Name";
    isValid = false;
  }

  if (!errors.boxSet?.value) {
    errors.boxSet.error = "Please enter Box Set";
    isValid = false;
  }

  return { isValid, errors };
};

export const updateAssetAssingmentValidation = (data: any) => {
  return {
    imei: {
      value: data?.imei,
      error: "",
    },
    labelName: {
      value: data?.labelName,
      error: "",
    },
    // routes: {
    //   value: data?.routes,
    //   error: "",
    // },
    boxSet: {
      value: data?.boxSet,
      error: "",
    },
    createdBy: {
      value: data?.createdBy,
      error: "",
    },
  } as AssetAssingmentFields;
};

export const uploadGroupField = () => {
  return {
    groupCSV: {
      value: {},
      error: "",
    },
  };
};

export const validateBulkRoutesUploadForm = (tableData: any) => {
  let isValid = true;
  let errors = tableData.map((item: any) => {
    let newItem = { ...item, routes: { ...item.routes } };
    if (!newItem.routes.value) {
      newItem.routes.error = "Please select routes";
      isValid = false;
    }
    return newItem;
  });

  return { errors, isValid };
};
