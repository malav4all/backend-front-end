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
    name: "Created By",
    field: "createdBy",
  },
  {
    name: "Action",
    field: "action",
  },
];

export const entityInsertField = (data?: any) => {
  return {
    id: {
      value: data?._id ?? "",
      error: "",
    },
    name: {
      value: data?.name ?? "",
      error: "",
    },
    type: {
      value: data?.type ?? "",
      error: "",
    },
    tripTypeList: {
      value: data?.tripTypeList ?? "",
      error: "",
    },
    address: {
      value: data?.address ?? "",
      error: "",
    },
    city: {
      value: data?.city ?? "",
      error: "",
    },
    state: {
      value: data?.state ?? "",
      error: "",
    },
    area: {
      value: data?.area ?? "",
      error: "",
    },
    district: {
      value: data?.district ?? "",
      error: "",
    },
    pinCode: {
      value: data?.pinCode ?? "",
      error: "",
    },
    contactName: {
      value: data?.contactName ?? "",
      error: "",
    },
    contactEmail: {
      value: data?.contactEmail ?? "",
      error: "",
    },
    contactPhone: {
      value: data?.contactPhone ?? "",
      error: "",
    },
    gstIn: {
      value: data?.gstIn ?? "",
      error: "",
    },
    aadharCardNo: {
      value: data?.aadharCardNo ?? "",
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

  if (!errors.type.value) {
    isValid = false;
    errors.name.error = "Please enter type";
  }

  if (!errors.tripTypeList.value) {
    isValid = false;
    errors.name.error = "Please enter Trip Type List";
  }

  if (!errors.contactName.value) {
    isValid = false;
    errors.name.error = "Please enter contactName";
  }

  if (!errors.contactPhone.value) {
    isValid = false;
    errors.name.error = "Please enter contactPhone";
  }

  return { isValid, errors };
};
