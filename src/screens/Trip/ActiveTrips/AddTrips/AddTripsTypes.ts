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
  driverName: {
    value: prevState?.driverName ?? "",
    error: "",
  },
  driverContactNumber: {
    value: prevState?.driverContactNumber ?? "",
    error: "",
  },
});

export const alertConfigurationFormInitialState = (prevState?: any) => ({
  subscribedAlerts: prevState?.subscribedAlerts ?? [],
  alertMedium: {
    sms: {
      contact: prevState?.alertMedium?.sms?.contact ?? "",
      isEnable: prevState?.alertMedium?.sms?.isEnable ?? false,
      smsType: prevState?.alertMedium?.sms?.smsType ?? "",
    },
    // whatsapp: {
    //   contact: prevState?.alertMedium?.whatsapp?.contact ?? "",
    //   isEnable: prevState?.alertMedium?.whatsapp?.isEnable ?? false,
    // },
    // email: {
    //   contact: prevState?.alertMedium?.email?.contact ?? "",
    //   isEnable: prevState?.alertMedium?.email?.isEnable ?? false,
    // },
  },
  alertDetails: {
    overSpeeding: {
      value: prevState?.alertDetails?.overSpeeding?.value ?? "",
      isEnabled: prevState?.alertDetails?.overSpeeding?.isEnable ?? false,
    },
    lowBattery: {
      value: prevState?.alertDetails?.lowBattery?.value ?? "",
      isEnabled: prevState?.alertDetails?.lowBattery?.isEnable ?? false,
    },
    overStopping: {
      value: prevState?.alertDetails?.overStopping?.value ?? "",
      isEnabled: prevState?.alertDetails?.overStopping?.isEnable ?? false,
    },
  },
});

export const dynamicFormInitialState = (prevState = []) => {
  return prevState.map((form: any) => ({
    ...form,
    content: form?.content?.map((field: any) => {
      return {
        ...field,
        extraAttributes: {
          ...field?.extraAttributes,
          value: field?.extraAttributes?.value,
        },
      };
    }),
  }));
};

export const tripVerificationFormInitialState = (prevState?: any) => ({
  vehicleNumberPlate: {
    value: prevState?.vehicleNumberPlate ?? "",
    error: "",
  },
  installedLockPhoto: {
    value: prevState?.installedLockPhoto ?? "",
    error: "",
  },
  permitPhoto: {
    value: prevState?.permitPhoto ?? "",
    error: "",
  },
});
