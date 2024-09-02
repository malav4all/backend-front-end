import React, { useEffect, ChangeEvent } from "react";
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
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 512 512"
    height="20px"
    width="20px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M368 192h-16v-80a96 96 0 1 0-192 0v80h-16a64.07 64.07 0 0 0-64 64v176a64.07 64.07 0 0 0 64 64h224a64.07 64.07 0 0 0 64-64V256a64.07 64.07 0 0 0-64-64zm-48 0H192v-80a64 64 0 1 1 128 0z"></path>
  </svg>
);

export const UnlockIcon = (props: any) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 16 16"
    height="20px"
    width="20px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2"></path>
  </svg>
);

export const GeozoneInIcon = (props: any) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 512 512"
    height="22px"
    width="22px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M256 48c-42.9 0-84.2 13-119.2 37.5-34.2 24-60.2 57.2-75.1 96.1L58 192h45.7l1.9-5c8.2-17.8 19.4-33.9 33.5-48 31.2-31.2 72.7-48.4 116.9-48.4s85.7 17.2 116.9 48.4c31.2 31.2 48.4 72.7 48.4 116.9 0 44.1-17.2 85.7-48.4 116.9-31.2 31.2-72.7 48.4-116.9 48.4-44.1 0-85.6-17.2-116.9-48.4-14-14-25.3-30.1-33.5-47.9l-1.9-5H58l3.6 10.4c14.9 38.9 40.9 72.1 75.1 96.1C171.8 451.1 213 464 256 464c114.7 0 208-93.3 208-208S370.7 48 256 48z"></path>
    <path d="M48 277.4h189.7l-43.6 44.7L224 352l96-96-96-96-31 29.9 44.7 44.7H48v42.8z"></path>
  </svg>
);

export const GeozoneOutIcon = (props: any) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 512 512"
    height="22px"
    width="22px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M192 277.4h189.7l-43.6 44.7L368 352l96-96-96-96-31 29.9 44.7 44.7H192v42.8z"></path>
    <path d="M255.7 421.3c-44.1 0-85.5-17.2-116.7-48.4-31.2-31.2-48.3-72.7-48.3-116.9 0-44.1 17.2-85.7 48.3-116.9 31.2-31.2 72.6-48.4 116.7-48.4 44 0 85.3 17.1 116.5 48.2l30.3-30.3c-8.5-8.4-17.8-16.2-27.7-23.2C339.7 61 298.6 48 255.7 48 141.2 48 48 141.3 48 256s93.2 208 207.7 208c42.9 0 84-13 119-37.5 10-7 19.2-14.7 27.7-23.2l-30.2-30.2c-31.1 31.1-72.5 48.2-116.5 48.2zM448.004 256.847l-.849-.848.849-.849.848.849z"></path>
  </svg>
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
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height="20px"
    width="20px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m5.705 3.71-1.41-1.42C1 5.563 1 7.935 1 11h1l1-.063C3 8.009 3 6.396 5.705 3.71zm13.999-1.42-1.408 1.42C21 6.396 21 8.009 21 11l2-.063c0-3.002 0-5.374-3.296-8.647zM12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.184 4.073 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.996.996 0 0 0-.293-.707L19 14.586z"></path>
  </svg>
);

export const OverspeedingIcon = (props: any) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 256 256"
    height="20px"
    width="20px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M119.51,143.51l88-88a12,12,0,1,1,17,17l-88,88a12,12,0,1,1-17-17Zm14.23-43.2a12,12,0,1,0,2.62-23.85A75.15,75.15,0,0,0,128,76a76.08,76.08,0,0,0-76,76,12,12,0,0,0,24,0,52.06,52.06,0,0,1,52-52A54.75,54.75,0,0,1,133.74,100.31Zm101.54,7.5A12,12,0,0,0,213.09,117a92.47,92.47,0,0,1,2.58,63H40.34A92.23,92.23,0,0,1,128,60h.84a91.43,91.43,0,0,1,34.2,6.91,12,12,0,0,0,9.14-22.19A116.07,116.07,0,0,0,18.57,190.58,20.09,20.09,0,0,0,37.46,204H218.53a20.06,20.06,0,0,0,18.88-13.38,116.39,116.39,0,0,0-2.13-82.81Z"></path>
  </svg>
);

export const LowBatteryIcon = (props: any) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    version="1.2"
    baseProfile="tiny"
    viewBox="0 0 24 24"
    height="25px"
    width="25px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 16c-.552 0-1-.447-1-1v-4c0-.553.448-1 1-1s1 .447 1 1v4c0 .553-.448 1-1 1zM19 10c0-1.654-1.346-3-3-3h-11c-1.654 0-3 1.346-3 3v6c0 1.654 1.346 3 3 3h11c1.654 0 3-1.346 3-3 1.104 0 2-.896 2-2v-2c0-1.104-.896-2-2-2zm-2 6c0 .552-.449 1-1 1h-11c-.551 0-1-.448-1-1v-6c0-.552.449-1 1-1h11c.551 0 1 .448 1 1v6z"></path>
  </svg>
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

  useEffect(() => {
    if (alertConfigurationForm?.subscribedAlerts) {
      const updatedAlertTypes = new Set([
        ...alertConfigurationForm?.subscribedAlerts,
        ...defaultAlertTypes,
      ]);
      alertConfigurationForm.subscribedAlerts = Array.from(updatedAlertTypes);
    }
  }, [alertConfigurationForm?.subscribedAlerts]);

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
