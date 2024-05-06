export const geoZoneInsertField = (data?: any) => {
  return {
    name: {
      value: data?.name ?? "",
      error: "",
    },
    type: {
      value: data?.geoCodeData?.geometry?.type ?? "",
      error: "",
    },
    propertyName: {
      value: data?.geoCodeData?.properties?.name ?? "",
      error: "",
    },
    locationType: {
      value: data?.locationType ?? "",
      error: "",
    },
    description: {
      value: data?.description ?? "",
      error: "",
    },
    mobileNumber: {
      value: data?.mobileNumber ?? "",
      error: "",
    },
    address: {
      value: data?.finalAddress ?? "",
      error: "",
    },
    zipCode: {
      value: data?.zipCode ?? "",
      error: "",
    },
    country: {
      value: data?.address?.country ?? "",
      error: "",
    },
    state: {
      value: data?.address?.state ?? "",
      error: "",
    },
    area: {
      value: data?.address?.area ?? "",
      error: "",
    },
    city: {
      value: data?.address?.city ?? "",
      error: "",
    },
    district: {
      value: data?.address?.district ?? "",
      error: "",
    },
    lat: {
      value: data?.geoCodeData?.geometry?.coordinates[0] ?? "",
      error: "",
    },
    long: {
      value: data?.geoCodeData?.geometry?.coordinates[1] ?? "",
      error: "",
    },
    radius: {
      value: data?.geoCodeData?.geometry?.radius ?? "",
      error: "",
    },
  };
};

export const validateGeoZoneForm = (formField: any) => {
  let isValid = true;
  let errors: any = { ...formField };
  if (!errors.name.value) {
    errors.name.error = "Please enter name";
    isValid = false;
  }
  if (!errors.locationType.value) {
    errors.locationType.error = "Please select location type";
    isValid = false;
  }
  if (!errors.description.value) {
    errors.description.error = "Please add description";
    isValid = false;
  }
  if (!errors.mobileNumber.value) {
    errors.mobileNumber.error = "Please enter a mobile number";
    isValid = false;
  }
  if (errors.mobileNumber.value) {
    const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (!re.test(errors.mobileNumber.value)) {
      errors.mobileNumber.error = "Mobile Number must be of 10 digits!";
      isValid = false;
    }
  }
  if (!errors.address.value) {
    errors.address.error = "Please enter address";
    isValid = false;
  }
  if (!errors.zipCode.value) {
    errors.zipCode.error = "Please enter zipcode";
    isValid = false;
  }
  
  return { isValid, errors };
}

