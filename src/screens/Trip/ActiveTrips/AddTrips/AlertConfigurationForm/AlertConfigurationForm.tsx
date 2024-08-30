import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Stack,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import useStyles from "../TransitTypeForm/TransitTypeForm.styles";
import { SvgIcon } from "@mui/material";
import { CustomInput } from "../../../../../global/components";
import {
  EmailIcon,
  GeozoneInIcon,
  GeozoneOutIcon,
  LockIcon,
  LowBatteryIcon,
  OverspeedingIcon,
  SmsIcon,
  TamperAlertIcon,
  TripCreatedIcon,
  TripEndedIcon,
  UnlockIcon,
  WhatsAppIcon,
} from "./AlertIcons";

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
    { name: "overSpeeding", icon: <OverspeedingIcon /> },
    { name: "lowBattery", icon: <LowBatteryIcon /> },
    { name: "overStopping", icon: <OverspeedingIcon /> },
  ];

  const defaultAlertTypes = ["lock", "Unlock", "Geozone-In", "Geozone-out"];

  const getAlertOptions = [
    { name: "SMS", icon: <SmsIcon /> },
    // { name: "WhatsApp", icon: <WhatsAppIcon /> },
    // { name: "Email", icon: <EmailIcon /> },
  ];
  const speedOptions = ["80 km/h", "90 km/h", "100 km/h"];
  const batteryOptions = ["40%", "50%", "60%"];
  const overStopOptions = ["10 min", "20 min", "30 min"];
  useEffect(() => {
    if (alertConfigurationForm?.subscribedAlerts) {
      const updatedAlertTypes = new Set([
        ...alertConfigurationForm?.subscribedAlerts,
        ...defaultAlertTypes,
      ]);
      alertConfigurationForm.subscribedAlerts = Array.from(updatedAlertTypes);
    }
  }, [alertConfigurationForm?.subscribedAlerts]);

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setAlertConfigurationForm((prevFields: any) => ({
      ...prevFields,
      alertDetails: {
        ...prevFields.alertDetails,
        [name]: {
          ...prevFields.alertDetails[name],
          value: value,
        },
      },
    }));
  };

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
          "overSpeeding",
          "lowBattery",
          "overStopping",
        ]?.includes(name)
      ) {
        const updatedField = checked
          ? [...(prevFields?.subscribedAlerts || []), name]
          : prevFields?.subscribedAlerts?.filter(
              (type: string) => type !== name
            );

        // Update isEnabled for specific alerts
        let updatedAlertDetails = { ...prevFields.alertDetails };
        if (
          name === "overSpeeding" ||
          name === "lowBattery" ||
          name === "overStopping"
        ) {
          updatedAlertDetails = {
            ...updatedAlertDetails,
            [name]: {
              ...updatedAlertDetails[name],
              isEnabled: checked, // Set isEnabled based on the checkbox state
            },
          };
        }

        return {
          ...prevFields,
          subscribedAlerts: updatedField,
          alertDetails: updatedAlertDetails,
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
              {alert.name === "overSpeeding" &&
                alertConfigurationForm?.subscribedAlerts?.includes(
                  "overSpeeding"
                ) && (
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Box>
                      <Stack direction="column">
                        <InputLabel className={classes.inputLabel} shrink>
                          Speed
                          <Box ml={0.4} color={"red"}>
                            *
                          </Box>
                        </InputLabel>
                        <Select
                          className={classes.dropDownStyle}
                          name="overSpeeding"
                          value={
                            alertConfigurationForm.alertDetails?.overSpeeding
                              ?.value || ""
                          }
                          onChange={handleSelectChange}
                          displayEmpty
                        >
                          {speedOptions.map((speed, index) => (
                            <MenuItem
                              key={index}
                              value={speed}
                              className={classes.dropDownOptionsStyle}
                            >
                              {speed}
                            </MenuItem>
                          ))}
                        </Select>
                      </Stack>
                    </Box>
                  </Grid>
                )}
              {alert.name === "lowBattery" &&
                alertConfigurationForm?.subscribedAlerts?.includes(
                  "lowBattery"
                ) && (
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Box>
                      <Stack direction="column">
                        <InputLabel className={classes.inputLabel} shrink>
                          Battery Percentage
                          <Box ml={0.4} color={"red"}>
                            *
                          </Box>
                        </InputLabel>
                        <Select
                          className={classes.dropDownStyle}
                          name="lowBattery"
                          value={
                            alertConfigurationForm.alertDetails.lowBattery
                              .value || ""
                          }
                          onChange={handleSelectChange}
                          displayEmpty
                        >
                          {batteryOptions.map((percentage, index) => (
                            <MenuItem
                              key={index}
                              value={percentage}
                              className={classes.dropDownOptionsStyle}
                            >
                              {percentage}
                            </MenuItem>
                          ))}
                        </Select>
                      </Stack>
                    </Box>
                  </Grid>
                )}
              {alert.name === "overStopping" &&
                alertConfigurationForm?.subscribedAlerts?.includes(
                  "overStopping"
                ) && (
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Box>
                      <Stack direction="column">
                        <InputLabel className={classes.inputLabel} shrink>
                          Over stopping
                          <Box ml={0.4} color={"red"}>
                            *
                          </Box>
                        </InputLabel>
                        <Select
                          className={classes.dropDownStyle}
                          name="overStopping"
                          value={
                            alertConfigurationForm.alertDetails.overStopping
                              .value || ""
                          }
                          onChange={handleSelectChange}
                          displayEmpty
                        >
                          {overStopOptions.map((duration, index) => (
                            <MenuItem
                              key={index}
                              value={duration}
                              className={classes.dropDownOptionsStyle}
                            >
                              {duration}
                            </MenuItem>
                          ))}
                        </Select>
                      </Stack>
                    </Box>
                  </Grid>
                )}
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
