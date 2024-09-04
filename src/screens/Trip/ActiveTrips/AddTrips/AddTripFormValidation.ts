export const tripTableHeader = [
  { name: "Trip Id", field: "tripId" },
  {
    name: "Account Name",
    field: "accountName",
  },
  {
    name: "IMEI Number",
    field: "imeiNumber",
  },
  {
    name: "Vehicle Number",
    field: "vehicleNumber",
  },

  {
    name: "Source",
    field: "source",
  },
  {
    name: "Destination",
    field: "destination",
  },
  {
    name: "Driver Name",
    field: "driverName",
  },
  {
    name: "Driver Number",
    field: "driverContactNumber",
  },

  { name: "Trip Start Date", field: "tripStartDate" },
  { name: "Trip End Date", field: "tripEndDate" },
  { name: "Created By", field: "createdBy" },
  // { name: "Action", field: "action" },
];
export const validateTransitTypeForm = (form: any, isEdit: boolean) => {
  let isValid = true;
  let errors = { ...form };

  if (!form?.transitType?.value) {
    errors.transitType.error = "Transit Type is required";
    isValid = false;
  }

  return { isValid, errors };
};

export const validateTripInformationForm = (form: any, isEdit: boolean) => {
  let isValid = true;
  let errors = { ...form };

  if (!form?.startPoint?.value) {
    errors.startPoint.error = "Start Point is required";
    isValid = false;
  }

  if (!form?.endPoint?.value) {
    errors.endPoint.error = "End Point is required";
    isValid = false;
  }

  if (!form?.tripStartDate?.value) {
    errors.tripStartDate.error = "Trip Start Date is required";
    isValid = false;
  }

  if (!form?.tripEndDate?.value) {
    errors.tripEndDate.error = "Trip End Date is required";
    isValid = false;
  }

  if (!form?.imeiNumber?.value?.length) {
    errors.imeiNumber.error = "At least one IMEI is required";
    isValid = false;
  }

  if (!form?.vehicleNumber?.value) {
    errors.vehicleNumber.error = "Vehicle Number is required";
    isValid = false;
  }

  if (!form?.driverName?.value) {
    errors.driverName.error = "Driver name is required";
    isValid = false;
  }

  if (!form?.contactNumber?.value) {
    errors.contactNumber.error = "Contact number is required";
    isValid = false;
  }

  return { isValid, errors };
};

export const validateAlertConfigurationForm = (form: any, isEdit: boolean) => {
  let isValid = true;
  let errors = { ...form };

  if (!form?.alertTypes?.value?.length) {
    errors.alertTypes.error = "At least one alert type is required";
    isValid = true;
  }

  if (!form?.getAlerts?.value?.length) {
    errors.getAlerts.error = "At least one alert method is required";
    isValid = true;
  }

  return { isValid, errors };
};
