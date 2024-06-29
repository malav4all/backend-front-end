import { store } from "../../utils/store";

export const tripTableHeader = [
  {
    name: "Device Group Name",
    field: "tripName",
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

export const insertTripField = (data?: any) => {
  return {
    tripName: {
      value: data?.tripName ?? "",
      error: "",
    },
    imeiList: {
      value: data?.imeiList ?? "",
      error: "",
    },
    createdBy: {
      value: store?.getState().auth.userName,
      error: "",
    },
  } as any;
};

export const validateAddTripForm = (
  tripFromFields: any,
  edit = false
) => {
  let isValid = true;
  let errors: any = { ...tripFromFields };
  if (!errors.tripName?.value) {
    errors.tripName.error = "Please enter Device Group Name";
    isValid = false;
  }
  if (!errors.imeiList?.value) {
    errors.imeiList.error = "Please select Imei";
    isValid = false;
  }
  return { isValid, errors };
};
