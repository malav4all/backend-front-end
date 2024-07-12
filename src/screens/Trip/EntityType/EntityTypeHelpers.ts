export const entityTypeTableHeader = [
  {
    name: "EntityType Name",
    field: "name",
  },
  {
    name: "Description",
    field: "description",
  },
  {
    name: "EnteredBy",
    field: "createdBy",
  },
];

export const entityTypeInsertField = () => {
  return {
    name: {
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

export const entityTypeValidation = (customerModuleFormData: any) => {
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
