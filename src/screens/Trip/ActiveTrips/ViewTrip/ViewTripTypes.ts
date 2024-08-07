export const transitTypeFormInitialState = () => ({
  transitType: "",
  vehicleType: "",
  numberOfPassengers: 0,
  specialRequirements: "",
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
});

export const alertConfigurationFormInitialState = () => ({
  alertTypes: [],
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
