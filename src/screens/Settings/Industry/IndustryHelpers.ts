export const industryTableHeader = [
  {
    name: "Name",
    field: "name",
  },
  {
    name: "Modules",
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

export const industryInsertField = (data?: any) => {
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
      value: data?.code ?? [],
      error: "",
    },
    description: {
      value: data?.description ?? "",
      error: "",
    },
  } as any;
};

export const industryValidation = (customerModuleFormData: any) => {
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
