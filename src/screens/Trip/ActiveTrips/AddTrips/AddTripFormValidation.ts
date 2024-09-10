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
    isValid = true;
  }

  if (!form?.vehicleNumber?.value) {
    errors.vehicleNumber.error = "Vehicle Number is required";
    isValid = false;
  }

  if (!form?.driverName?.value) {
    errors.driverName.error = "Driver name is required";
    isValid = false;
  }

  if (!form?.driverContactNumber?.value) {
    errors.driverContactNumber.error = "Contact number is required";
    isValid = false;
  }

  return { isValid, errors };
};

export const validateAlertConfigurationForm = (form: any, isEdit: any) => {
  let isValid = true;
  let errors = { ...form };

  // Validate alertTypes
  if (!form?.subscribedAlerts?.length) {
    errors.subscribedAlertsError = "At least one alert type is required";
    isValid = false;
  }

  // Validate Get Alerts SMS
  if (form?.alertMedium?.sms?.isEnable && !form?.alertMedium?.sms?.contact) {
    errors.alertMedium = {
      ...form?.alertMedium,
      sms: {
        ...form?.alertMedium?.sms,
        error: "Please select a valid SMS number",
      },
    };
    isValid = false;
  }

  // Validate lowBattery, overSpeeding, and overStopping
  if (
    form.subscribedAlerts?.includes("lowBattery") &&
    !form.alertDetails?.lowBattery?.value
  ) {
    errors.alertDetails.lowBattery = {
      ...form?.alertDetails?.lowBattery,
      error: "Please select a battery threshold value",
    };
    isValid = false;
  }

  if (
    form.subscribedAlerts?.includes("overSpeeding") &&
    !form.alertDetails?.overSpeeding?.value
  ) {
    errors.alertDetails.overSpeeding = {
      ...form?.alertDetails?.overSpeeding,
      error: "Please select a speed threshold value",
    };
    isValid = false;
  }

  if (
    form.subscribedAlerts?.includes("overStopping") &&
    !form.alertDetails?.overStopping?.value
  ) {
    errors.alertDetails.overStopping = {
      ...form?.alertDetails?.overStopping,
      error: "Please select a stopping duration value",
    };
    isValid = false;
  }

  return { isValid, errors };
};
