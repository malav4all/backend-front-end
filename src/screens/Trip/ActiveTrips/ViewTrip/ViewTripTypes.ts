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

export const dynamicFormInitialState = (prevState?: any) => {
  return (
    prevState?.map((form: any) => ({
      ...form,
      content: form?.content?.map((field: any) => ({
        ...field,
        extraAttributes: {
          ...field?.extraAttributes,
          value: field?.extraAttributes?.value ?? "", // Ensure that value is properly initialized
        },
      })),
    })) || []
  );
};
