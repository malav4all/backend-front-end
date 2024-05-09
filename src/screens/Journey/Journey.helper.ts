export const journeyTableHeader = [
  { name: "Journey Name", field: "journeyName" },
  { name: "Total Distance", field: "totalDistance" },
  { name: "Total Duration", field: "totalDuration" },
  { name: "Start Date", field: "startDate" },
  { name: "End Date", field: "endDate" },
  { name: "Created By", field: "createdBy" },
  { name: "Action", field: "action" },
];

export const validateJourneyForm = (formField: any) => {
  let isValid = true;
  let errors = { ...formField };
  if (!errors?.journeyName?.value) {
    errors.journeyName.error = "Please enter journey name";
    isValid = false;
  }
  if (!errors?.startDate.value) {
    errors.startDate.error = "Please enter journey start date";
    isValid = false;
  }
  if (!errors?.endDate.value) {
    errors.endDate.error = "Please enter journey end date";
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