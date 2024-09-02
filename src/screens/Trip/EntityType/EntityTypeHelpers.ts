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
    name: "Created By",
    field: "createdBy",
  },

  {
    name: "Action",
    field: "action",
  },
];

export const entityTypeInsertField = (data?: any) => {
  return {
    id: {
      value: data?._id ?? "",
      error: "",
    },
    name: {
      value: data?.name ?? "",
      error: "",
    },
    description: {
      value: data?.description ?? "",
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

  return { isValid, errors };
};
