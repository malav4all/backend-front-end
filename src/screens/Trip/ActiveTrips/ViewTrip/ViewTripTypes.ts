export const transitTypeFormInitialState = () => ({
  transitType: "",
  vehicleType: "",
});

export const tripInformationFormInitialState = () => ({
  tripName: "",
  tripId: "",
  startPoint: "",
  endPoint: "",
  tripStartDate: "",
  tripEndDate: "",
  status: "",
  remarks: "",
  tripData: [],
  vehicleNumber: "",
});

export const alertConfigurationFormInitialState = () => ({
  subscribedAlerts: [],
  alertMedium: {
    sms: {
      contact: "",
      isEnable: false,
    },
    whatsapp: {
      contact: "",
      isEnable: false,
    },
    email: {
      contact: "",
      isEnable: false,
    },
  },
});
