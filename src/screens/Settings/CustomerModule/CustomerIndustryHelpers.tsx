export const customerModuleTableHeader = [
  {
    name: "Module Name",
    field: "name",
  },
  {
    name: "Module Code",
    field: "code",
  },
  {
    name: "Description",
    field: "description",
  },
];

export const customerModuleInsertField = () => {
  return {
    name: {
      value: "",
      error: "",
    },
    code: {
      value: "",
      error: "",
    },
    description: {
      value: "",
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
