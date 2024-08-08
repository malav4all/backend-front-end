import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Stack,
} from "@mui/material";
import useStyles from "../TransitTypeForm/TransitTypeForm.styles";
import { SvgIcon } from "@mui/material";
import { CustomInput } from "../../../../../global/components";

export const LockIcon = (props: any) => (
  <SvgIcon {...props}>
    <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-7h-1V7a5 5 0 0 0-10 0v3H6c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2zm-6-5a3 3 0 0 1 3 3v3H9V8a3 3 0 0 1 3-3z" />
  </SvgIcon>
);

export const UnlockIcon = (props: any) => (
  <SvgIcon {...props}>
    <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-7h-1V7a5 5 0 0 0-9.9-1H8v3H6c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2zm-8-4a3 3 0 0 1 6 0v3H10V6z" />
  </SvgIcon>
);

export const GeozoneInIcon = (props: any) => (
  <SvgIcon {...props}>
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1-8-8 8 8 0 0 1-8 8zm1-12h-2v6h6v-2h-4z" />
  </SvgIcon>
);

export const GeozoneOutIcon = (props: any) => (
  <SvgIcon {...props}>
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1-8-8 8 8 0 0 1-8 8zm-1-12h2v6h-6v-2h4z" />
  </SvgIcon>
);

export const TripCreatedIcon = (props: any) => (
  <SvgIcon {...props}>
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1-8-8 8 8 0 0 1-8 8zM10 10.1h1.55v5.79h1.9V10.1H14L11.5 6z" />
  </SvgIcon>
);

export const TripEndedIcon = (props: any) => (
  <SvgIcon {...props}>
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 13.79h2v-2h-2zm0-4h2v-6h-2z" />
  </SvgIcon>
);

export const TamperAlertIcon = (props: any) => (
  <SvgIcon {...props}>
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1-8-8 8 8 0 0 1-8 8zm-1-10h2v-2h-2zm0 4h2v-2h-2z" />
  </SvgIcon>
);

export const OverspeedingIcon = (props: any) => (
  <SvgIcon {...props}>
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1-8-8 8 8 0 0 1-8 8zm-1-10h2v-2h-2zm0 4h2v-2h-2z" />
  </SvgIcon>
);

export const LowBatteryIcon = (props: any) => (
  <SvgIcon {...props}>
    <path d="M15 7h-2V6a2 2 0 0 0-4 0v1H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM9 6a1 1 0 0 1 2 0v1H9zm6 8H7V9h8z" />
  </SvgIcon>
);

export const SmsIcon = (props: any) => (
  <SvgIcon {...props}>
    <path d="M20 2H4c-1.1 0-2 .9-2 2v16l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6v-2h12zm0-4H6V6h12z" />
  </SvgIcon>
);

export const WhatsAppIcon = (props: any) => (
  <SvgIcon {...props}>
    <path d="M12 2a10 10 0 1 0 3.16 19.45L20 22l-.65-4.84A10 10 0 0 0 12 2zm5.45 14.54c-.13.34-.73.66-1 1a5.23 5.23 0 0 1-2.6.2c-1.06-.27-2.1-.97-3-1.73a10.8 10.8 0 0 1-2.73-3.5 7.38 7.38 0 0 1-.87-3c0-.55.19-1.13.4-1.63.25-.56.68-1.17 1.3-1.3.37-.08.79-.02 1.17.07.38.1.93.5 1.1.9.2.48.2 1.17.4 1.63.2.45.48.77.93 1.3.16.2.56.5.87.73.22.14.44.3.7.37.17.05.37-.03.5.07.24.17.5.55.7.77.22.26.44.54.67.8.16.18.4.5.27.77z" />
  </SvgIcon>
);

export const EmailIcon = (props: any) => (
  <SvgIcon {...props}>
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5z" />
  </SvgIcon>
);

interface AlertConfigurationProps {
  alertConfigurationForm: any;
  setAlertConfigurationForm: Function;
  handleFormDataChange: any;
}

const AlertConfigurationForm: React.FC<AlertConfigurationProps> = ({
  alertConfigurationForm,
  setAlertConfigurationForm,
  handleFormDataChange,
}) => {
  const classes = useStyles();

  const alertTypes = [
    { name: "lock", icon: <LockIcon /> },
    { name: "Unlock", icon: <UnlockIcon /> },
    { name: "Geozone-In", icon: <GeozoneInIcon /> },
    { name: "Geozone-out", icon: <GeozoneOutIcon /> },
    { name: "Trip created", icon: <TripCreatedIcon /> },
    { name: "Trip ended", icon: <TripEndedIcon /> },
    { name: "Tamper Alert", icon: <TamperAlertIcon /> },
    { name: "Overspeeding", icon: <OverspeedingIcon /> },
    { name: "low battery", icon: <LowBatteryIcon /> },
  ];

  const defaultAlertTypes = ["lock", "Unlock", "Geozone-In", "Geozone-out"];

  const getAlertOptions = [
    { name: "SMS", icon: <SmsIcon /> },
    { name: "WhatsApp", icon: <WhatsAppIcon /> },
    { name: "Email", icon: <EmailIcon /> },
  ];

  const handleAlertDetailsChange = (event: any) => {
    const { name, value } = event.target;
    setAlertConfigurationForm((prevFields: any) => ({
      ...prevFields,
      alertMedium: {
        ...prevFields?.alertMedium,
        [name.toLowerCase()]: {
          ...prevFields?.alertMedium[name?.toLowerCase()],
          contact: value,
        },
      },
    }));
  };

  useEffect(() => {
    if (alertConfigurationForm?.subscribedAlerts) {
      const updatedAlertTypes = new Set([
        ...alertConfigurationForm?.subscribedAlerts,
        ...defaultAlertTypes,
      ]);
      alertConfigurationForm.subscribedAlerts = Array.from(updatedAlertTypes);
    }
  }, [alertConfigurationForm?.subscribedAlerts]);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event?.target;
    setAlertConfigurationForm((prevFields: any) => {
      if (
        [
          "lock",
          "Unlock",
          "Geozone-In",
          "Geozone-out",
          "Trip created",
          "Trip ended",
          "Tamper Alert",
          "Overspeeding",
          "low battery",
        ]?.includes(name)
      ) {
        const updatedField = checked
          ? [...(prevFields?.subscribedAlerts || []), name]
          : prevFields?.subscribedAlerts?.filter(
              (type: string) => type !== name
            );
        return {
          ...prevFields,
          subscribedAlerts: updatedField,
        };
      } else if (["SMS", "WhatsApp", "Email"].includes(name)) {
        const updatedField = {
          ...prevFields?.alertMedium,
          [name.toLowerCase()]: {
            ...prevFields?.alertMedium[name?.toLowerCase()],
            isEnable: checked,
          },
        };
        return {
          ...prevFields,
          alertMedium: updatedField,
        };
      }

      return prevFields;
    });
  };

  return (
    <Grid container spacing={2} padding={5}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Alert Types
          <Box component="span" ml={0.4} className={classes.star}>
            *
          </Box>
        </Typography>
        <Grid container spacing={1}>
          {alertTypes.map((alert) => (
            <Grid item xs={12} sm={6} md={4} key={alert.name}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      alertConfigurationForm?.subscribedAlerts?.includes(
                        alert?.name
                      ) || defaultAlertTypes?.includes(alert?.name)
                    }
                    onChange={handleCheckboxChange}
                    name={alert?.name}
                    disabled={defaultAlertTypes?.includes(alert?.name)}
                  />
                }
                label={
                  <Box display="flex" alignItems="center">
                    {alert?.icon}
                    <Box ml={1}>{alert?.name}</Box>
                  </Box>
                }
              />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Get Alerts
          <Box component="span" ml={0.4} className={classes.star}>
            *
          </Box>
        </Typography>
        <Grid container spacing={1}>
          {getAlertOptions?.map((option) => (
            <Grid item xs={12} key={option?.name}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        alertConfigurationForm?.alertMedium?.[
                          option.name?.toLowerCase()
                        ]?.isEnable || false
                      }
                      onChange={handleCheckboxChange}
                      name={option?.name}
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center">
                      {option?.icon}
                      <Box ml={1}>{option?.name}</Box>
                    </Box>
                  }
                />
                {alertConfigurationForm?.alertMedium?.[
                  option?.name.toLowerCase()
                ]?.isEnable && (
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <CustomInput
                      name={option?.name}
                      value={
                        alertConfigurationForm?.alertMedium?.[
                          option?.name.toLowerCase()
                        ]?.contact
                      }
                      onChange={handleAlertDetailsChange}
                      placeHolder={`Enter ${option?.name} details`}
                    />
                  </Box>
                )}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AlertConfigurationForm;
