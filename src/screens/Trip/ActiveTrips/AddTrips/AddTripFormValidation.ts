export const tripTableHeader = [
  {
    name: "IMEI Number",
    field: "imeiNumber",
  },
  { name: "Trip Id", field: "tripId" },
  { name: "Total Distance", field: "totalDistance" },
  { name: "Total Duration", field: "totalDuration" },
  { name: "Trip Start Date", field: "tripStartDate" },
  { name: "Trip End Date", field: "tripEndDate" },
  { name: "Created By", field: "createdBy" },
  { name: "Action", field: "action" },
];
export const validateTransitTypeForm = (form: any, isEdit: boolean) => {
  let isValid = true;
  let errors = { ...form };

  if (!form.transitType.value) {
    errors.transitType.error = "Transit Type is required";
    isValid = false;
  }

  if (!form.routeId.value) {
    errors.routeId.error = "Route ID is required";
    isValid = false;
  }

  return { isValid, errors };
};

export const validateTripInformationForm = (form: any, isEdit: boolean) => {
  let isValid = true;
  let errors = { ...form };

  if (!form.startPoint.value) {
    errors.startPoint.error = "Start Point is required";
    isValid = false;
  }

  if (!form.endPoint.value) {
    errors.endPoint.error = "End Point is required";
    isValid = false;
  }

  if (!form.tripStartDate.value) {
    errors.tripStartDate.error = "Trip Start Date is required";
    isValid = false;
  }

  if (!form.tripEndDate.value) {
    errors.tripEndDate.error = "Trip End Date is required";
    isValid = false;
  }

  if (!form.imeiNumber.value.length) {
    errors.imeiNumber.error = "At least one IMEI is required";
    isValid = false;
  }

  if (!form.vehicleNumber.value) {
    errors.vehicleNumber.error = "Vehicle Number is required";
    isValid = false;
  }

  if (!form.remarks.value) {
    errors.remarks.error = "Remarks are required";
    isValid = false;
  }

  return { isValid, errors };
};

export const validateAlertConfigurationForm = (form: any, isEdit: boolean) => {
  let isValid = true;
  let errors = { ...form };

  if (!form.alertTypes.value.length) {
    errors.alertTypes.error = "At least one alert type is required";
    isValid = false;
  }

  if (!form.getAlerts.value.length) {
    errors.getAlerts.error = "At least one alert method is required";
    isValid = false;
  }

  return { isValid, errors };
};
