export const tripTypeTableHeader = [
  {
    name: "Account Id",
    field: "accountId",
  },
  {
    name: "TripType Name",
    field: "name",
  },
  {
    name: "Min Battery %",
    field: "minBatteryPercentage",
  },
  {
    name: "Trip Rate",
    field: "tripRate",
  },
  {
    name: "GST %",
    field: "gstPercentage",
  },
  {
    name: "Entered By",
    field: "createdBy",
  },
  {
    name: "Action",
    field: "action",
  },
];

export const tripTypeInsertField = (data?: any) => {
  return {
    id: {
      value: data?._id ?? "",
      error: "",
    },
    accountId: {
      value: data?.accountId ?? "",
      error: "",
    },
    name: {
      value: data?.tripName ?? "",
      error: "",
    },
    minBatteryPercentage: {
      value: data?.minBatteryPercentage ?? "",
      error: "",
    },
    tripRate: {
      value: data?.tripRate ?? "",
      error: "",
    },
    gstPercentage: {
      value: data?.gstPercentage ?? "18%",
      error: "",
    },
  } as any;
};

export const tripTypeValidation = (customerModuleFormData: any) => {
  let isValid = true;
  let errors = { ...customerModuleFormData };

  if (!errors.name.value) {
    isValid = false;
    errors.name.error = "Please enter name";
  }

  if (errors.minBatteryPercentage.value.length < 1) {
    isValid = false;
    errors.code.error = "Please select module";
  }

  return { isValid, errors };
};
