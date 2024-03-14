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

  // {
  //   name: "Journey",
  //   field: "journey",
  // },

  {
    name: "Box Set",
    field: "boxSet",
  },

  {
    name: "Created By",
    field: "createdBy",
  },
];

export const insertAssetAssingmentField = (data?: any) => {
  return {
    imei: {
      value: data?.imei ?? "",
      error: "",
    },
    labelName: {
      value: data?.labelName ?? "",
      error: "",
    },
    // journey: {
    //   value: data?.journey ?? "",
    //   error: "",
    // },
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

  // if (!errors.journey?.value) {
  //   errors.journey.error = "Please select Journey";
  //   isValid = false;
  // }

  if (!errors.createdBy?.value) {
    errors.createdBy.error = "Please select Created By";
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

// export const updateAssetAssingmentValidationForm = (updateAssetAssingmentData: any) => {
//   const errors = updateAssetAssingmentData;
//   let isValid = true;
//   const assignBy = updateAssetAssingmentData.assignBy.value;
//   const allowedEmailCount = updateAssetAssingmentData.allowedEmailCount.value;
//   const title = updateAssetAssingmentData.title.value;
//   if (!assignBy && !allowedEmailCount && !title) {
//     errors.assignBy.error = "Please select manager email";
//     errors.allowedEmailCount.error = "Please enter allowed email count";
//     errors.title.error = "Please enter title";
//     isValid = false;
//   } else if (!assignBy) {
//     errors.assignBy.error = "Please select manager email";
//     isValid = false;
//   } else if (!allowedEmailCount) {
//     errors.allowedEmailCount.error = "Please enter allowed email count";
//     isValid = false;
//   } else if (!title) {
//     errors.title.error = "Please enter title";
//     isValid = false;
//   }
//   return { isValid, errors };
// };
