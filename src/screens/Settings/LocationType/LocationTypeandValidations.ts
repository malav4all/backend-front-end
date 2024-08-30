export const validateLocationTypeForm = (formField: any) => {
  let isValid = true;
  let errors = { ...formField };

  if (!errors.type.value) {
    errors.type.error = "Please enter location type";
    isValid = false;
  }

  return { isValid, errors };
};
