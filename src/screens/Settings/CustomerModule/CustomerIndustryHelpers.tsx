export const customerModuleTableHeader = [
  {
    name: "Name",
    field: "name",
  },
  {
    name: "Code",
    field: "code",
  },
  {
    name: "Description",
    field: "description",
  },
  {
    name: "Action",
    field: "action",
  },
];

export const customerModuleInsertField = (data?: any) => {
  return {
    id: {
      value: data?._id ?? "",
      error: "",
    },
    name: {
      value: data?.name ?? "",
      error: "",
    },
    code: {
      value: data?.code ?? "",
      error: "",
    },
    description: {
      value: data?.description ?? "",
      error: "",
    },
  } as any;
};

export const customerModuleValidation = (customerModuleFormData: any) => {
  let isValid = true;
  let errors = { ...customerModuleFormData };

  if (!errors.name.value) {
    isValid = false;
    errors.name.error = "Please enter name";
  }

  if (!errors.code.value) {
    isValid = false;
    errors.code.error = "Please enter code";
  }

  return { isValid, errors };
};
