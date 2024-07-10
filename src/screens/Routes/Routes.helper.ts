export const routesTableHeader = [
  { name: "Routes Name", field: "routesName" },
  { name: "Total Distance", field: "totalDistance" },
  { name: "Total Duration", field: "totalDuration" },
  { name: "Start Date", field: "startDate" },
  { name: "End Date", field: "endDate" },
  { name: "Created By", field: "createdBy" },
  { name: "Action", field: "action" },
];

export const validateRoutesForm = (formField: any) => {
  let isValid = true;
  let errors = { ...formField };
  if (!errors?.routesName?.value) {
    errors.routesName.error = "Please enter routes name";
    isValid = false;
  }
  if (!errors?.startLocation.value) {
    errors.startLocation.error = "Please enter start location";
    isValid = false;
  }
  if (!errors?.endLocation.value) {
    errors.endLocation.error = "Please enter end location";
    isValid = false;
  }

  return { isValid, errors };
};