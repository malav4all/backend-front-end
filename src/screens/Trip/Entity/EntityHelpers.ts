export const entityTableHeader = [
  {
    name: "Entity Name",
    field: "name",
  },
  {
    name: "Entity Type",
    field: "type",
  },
  {
    name: "Address",
    field: "address",
  },
  {
    name: "City",
    field: "city",
  },
  {
    name: "State",
    field: "state",
  },
  {
    name: "Area",
    field: "area",
  },
  {
    name: "District",
    field: "district",
  },
  {
    name: "Pincode",
    field: "pinCode",
  },
  {
    name: "Contact Name",
    field: "contactName",
  },
  {
    name: "Contact Phone",
    field: "contactPhone",
  },
  {
    name: "GST No",
    field: "gstIn",
  },
  {
    name: "Aadhar No",
    field: "aadharCardNo",
  },
  {
    name: "Entered By",
    field: "createdBy",
  },
];

export const entityInsertField = () => {
  return {
    name: {
      value: "",
      error: "",
    },
    type: {
      value: "",
      error: "",
    },
    tripTypeList: {
      value: "",
      error: "",
    },
    address: {
      value: "",
      error: "",
    },
    city: {
      value: "",
      error: "",
    },
    state: {
      value: "",
      error: "",
    },
    area: {
      value: "",
      error: "",
    },
    district: {
      value: "",
      error: "",
    },
    pinCode: {
      value: "",
      error: "",
    },
    contactName: {
      value: "",
      error: "",
    },
    contactEmail: {
      value: "",
      error: "",
    },
    contactPhone: {
      value: "",
      error: "",
    },
    gstIn: {
      value: "",
      error: "",
    },
    aadharCardNo: {
      value: "",
      error: "",
    },
  } as any;
};

export const entityValidation = (customerModuleFormData: any) => {
  let isValid = true;
  let errors = { ...customerModuleFormData };

  if (!errors.name.value) {
    isValid = false;
    errors.name.error = "Please enter name";
  }

  if (errors.code.value.length < 1) {
    isValid = false;
    errors.code.error = "Please select module";
  }

  return { isValid, errors };
};
