export const geoZoneInsertField = (data?: any) => {
  return {
    name: {
      value: data.name ?? "",
      error: "",
    },
    type: {
      value: data.type ?? "",
      error: "",
    },
    centerNo: {
      value: data.centerNo ?? "",
      error: "",
    },
    radius: {
      value: data.radius ?? "",
      error: "",
    },
    mobileNumber: {
      value: data.mobileNumber ?? "",
      error: "",
    },
    address: {
      value: data.address ?? "",
      error: "",
    },
    zipCode: {
      value: data.zipCode ?? "",
      error: "",
    },
    country: {
      value: data.country ?? "",
      error: "",
    },
    state: {
      value: data.state ?? "",
      error: "",
    },
    area: {
      value: data.area ?? "",
      error: "",
    },
    city: {
      value: data.city ?? "",
      error: "",
    },
    district: {
      value: data.district ?? "",
      error: "",
    },
    lat: {
      value: data.lat ?? "",
      error: "",
    },
    long: {
      value: data.long ?? "",
      error: "",
    },
  };
};
