export const transitTypeFormInitialState = (prevState?: any) => ({
  transitType: {
    value: prevState?.transitType ?? "",
    error: "",
  },
  routeId: {
    value: prevState?.routeId ?? "",
    error: "",
  },
});

export const tripInformationFormInitialState = (prevState?: any) => ({
  startPoint: {
    value: prevState?.startPoint ?? "",
    error: "",
  },
  endPoint: {
    value: prevState?.endPoint ?? "",
    error: "",
  },
  tripStartDate: {
    value: prevState?.tripStartDate ?? null,
    error: "",
  },
  tripEndDate: {
    value: prevState?.tripEndDate ?? null,
    error: "",
  },
  imeiNumber: {
    value: prevState?.imeiNumber ?? [],
    error: "",
  },
  vehicleNumber: {
    value: prevState?.vehicleNumber ?? "",
    error: "",
  },
  remarks: {
    value: prevState?.remarks ?? "",
    error: "",
  },
});

export const alertConfigurationFormInitialState = (prevState?: any) => ({
  alertTypes: {
    value: prevState?.alertTypes ?? [],
    error: "",
  },
  getAlerts: {
    value: prevState?.getAlerts ?? [],
    error: "",
  },
  alertDetails: {
    SMS: prevState?.alertDetails?.SMS ?? "",
    WhatsApp: prevState?.alertDetails?.WhatsApp ?? "",
    Email: prevState?.alertDetails?.Email ?? "",
  },
});
