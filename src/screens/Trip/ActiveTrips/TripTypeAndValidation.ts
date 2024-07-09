import { store } from "../../../utils/store";

export const tripTableHeader = [
  {
    name: "IMEI Number",
    field: "imeiNumber",
  },
  { name: "Total Distance", field: "totalDistance" },
  { name: "Total Duration", field: "totalDuration" },
  { name: "Start Date", field: "startDate" },
  { name: "End Date", field: "endDate" },
  { name: "Created By", field: "createdBy" },
  { name: "Action", field: "action" },
];

export const insertTripField = (data?: any) => {
  return {
    createdBy: {
      value: store?.getState().auth.userName,
      error: "",
    },
  } as any;
};

export const validateAddTripForm = (tripFromFields: any, edit = false) => {
  let isValid = true;
  let errors: any = { ...tripFromFields };
  if (!errors.tripName?.value) {
    errors.tripName.error = "Please enter Trip Name";
    isValid = false;
  }
  if (!errors.imeiList?.value) {
    errors.imeiList.error = "Please select IMEI";
    isValid = false;
  }
  return { isValid, errors };
};
