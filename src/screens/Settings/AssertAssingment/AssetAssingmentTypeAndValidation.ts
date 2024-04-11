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
    name: "Journey",
    field: "journey",
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
    journey: {
      value: data?.journey?._id ?? (data?.journey?.journeyName || ""),
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

  if (!errors.labelName?.value) {
    errors.labelName.error = "Please enter Label Name";
    isValid = false;
  }

  if (!errors.boxSet?.value) {
    errors.boxSet.error = "Please enter Box Set";
    isValid = false;
  }

  if (!errors.journey?.value) {
    errors.journey.error = "Please select Journey";
    isValid = true;
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
    // journey: {
    //   value: data?.journey,
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

export const validateBulkJourneyUploadForm = (tableData: any) => {
  let isValid = true;
  let errors = tableData.map((item: any) => {
    let newItem = { ...item, journey: { ...item.journey } };
    if (!newItem.journey.value) {
      newItem.journey.error = "Please select journey";
      isValid = false;
    }
    return newItem;
  });

  return { errors, isValid };
};
