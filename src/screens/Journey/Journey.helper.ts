export const validateJourneyForm = (formField: any) => {
  let isValid = true;
  let errors = { ...formField };
  if (!errors?.journeyName?.value) {
    errors.journeyName.error = "Please enter journey name";
    isValid = false;
  }
  if (!errors?.startDate.value) {
    errors.startDate.error = "Please enter journey start date";
    isValid = false;
  }
  if (!errors?.endDate.value) {
    errors.endDate.error = "Please enter journey end date";
    isValid = false;
  }

  return { isValid, errors };
};
