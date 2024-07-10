import { store } from "../../../utils/store";

export interface TripField {
  value: any;
  error: string;
}

export interface TripFields {
  transitType: TripField;
  routeId: TripField;
  tripName: TripField;
  imeiList: TripField;
  alertTypes: TripField;
  getAlerts: TripField;
  createdBy: TripField;
}

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

export const insertTripField = (data?: any): TripFields => {
  return {
    routeId: {
      value: data?.tripName ?? "",
      error: "",
    },
    transitType: {
      value: data?.tripName ?? "",
      error: "",
    },
    tripName: {
      value: data?.tripName ?? "",
      error: "",
    },
    imeiList: {
      value: data?.imeiList ?? "",
      error: "",
    },
    alertTypes: {
      value: data?.alertTypes ?? [],
      error: "",
    },
    getAlerts: {
      value: data?.getAlerts ?? [],
      error: "",
    },
    createdBy: {
      value: store?.getState().auth.userName,
      error: "",
    },
  };
};

export const validateAddTripForm = (
  tripFromFields: TripFields,
  edit = false
) => {
  let isValid = true;
  let errors: TripFields = { ...tripFromFields };
  if (!errors.tripName.value) {
    errors.tripName.error = "Please enter Trip Name";
    isValid = false;
  }
  if (!errors.imeiList.value) {
    errors.imeiList.error = "Please select IMEI";
    isValid = false;
  }
  if (errors.alertTypes.value.length === 0) {
    errors.alertTypes.error = "Please select at least one Alert Type";
    isValid = false;
  }
  if (errors.getAlerts.value.length === 0) {
    errors.getAlerts.error = "Please select at least one Get Alert option";
    isValid = false;
  }
  return { isValid, errors };
};
