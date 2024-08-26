export const validateLocationTypeForm = (formField: any) => {
  let isValid = true;
  let errors = { ...formField };

  if (!errors.value) {
    errors.error = "Please enter location type";
    isValid = false;
  }

  return { isValid, errors };
};
