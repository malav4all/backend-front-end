export const userAccessTableHeader = [
  {
    name: "UserAccess Name",
    field: "name",
  },
  {
    name: "UserAccess Modules",
    field: "code",
  },
  {
    name: "Description",
    field: "description",
  },
  {
    name: "Image",
    field: "file",
  },
];

export const userAccessInsertField = () => {
  return {
    userId: {
      value: "",
      error: "",
    },
    code: {
      value: [],
      error: "",
    },
    description: {
      value: "",
      error: "",
    },
  } as any;
};

export const userAccessValidation = (customerModuleFormData: any) => {
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
