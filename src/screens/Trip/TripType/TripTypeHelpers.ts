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
    name: "Minimum Battery Percentage",
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
    name: "EnteredBy",
    field: "createdBy",
  },
];

export const tripTypeInsertField = () => {
  return {
    accountId: {
      value: "",
      error: "",
    },
    name: {
      value: "",
      error: "",
    },
    minBatteryPercentage: {
      value: "",
      error: "",
    },
    tripRate: {
      value: "",
      error: "",
    },
    gstPercentage: {
      value: "18%",
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
