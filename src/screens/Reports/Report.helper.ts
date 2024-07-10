export const reportTableHeader = [
  { name: "Event", field: "event" },
  { name: "Imei", field: "imei" },
  { name: "Label", field: "label" },
  { name: "Latitude", field: "lat" },
  { name: "Longitude", field: "lng" },
  { name: "Message", field: "message" },
  { name: "Mode", field: "mode" },
  { name: "Source", field: "source" },
];

export const options = [
  {
    label: "Today",
    value: 0,
  },
  {
    label: "Yesterday",
    value: 1,
  },
  {
    label: "Last 4 Days",
    value: 4,
  },
  {
    label: "Last 1 Week",
    value: 7,
  },
  {
    label: "Last 2 Weeks",
    value: 14,
  },
  {
    label: "Last 1 Month",
    value: 30,
  },
  {
    label: "Last 45 days",
    value: 45,
  },
];
export const validateRoutesForm = (formField: any) => {
  let isValid = true;
  let errors = { ...formField };
  if (!errors?.routesName?.value) {
    errors.routesName.error = "Please enter routes name";
    isValid = false;
  }
  if (!errors?.startDate.value) {
    errors.startDate.error = "Please enter routes start date";
    isValid = false;
  }
  if (!errors?.endDate.value) {
    errors.endDate.error = "Please enter routes end date";
    isValid = false;
  }

  return { isValid, errors };
};
