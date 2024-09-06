import React, { useEffect, ChangeEvent } from "react";
import {
  Box,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Stack,
  MenuItem,
  Select,
  FormControl,
  RadioGroup,
  FormLabel,
  Radio,
} from "@mui/material";
import useStyles from "../TransitTypeForm/TransitTypeForm.styles";
import { CustomInput } from "../../../../../global/components";
import {
  GeozoneInIcon,
  GeozoneOutIcon,
  LockIcon,
  LowBatteryIcon,
  OverspeedingIcon,
  OverstopingIcon,
  SmsIcon,
  TamperAlertIcon,
  TripCreatedIcon,
  TripEndedIcon,
  UnlockIcon,
} from "./AlertIcons";
import { store } from "../../../../../utils/store";

interface AlertConfigurationProps {
  alertConfigurationForm: any;
  setAlertConfigurationForm: Function;
  tripInformationForm?: any;
}

const AlertConfigurationForm: React.FC<AlertConfigurationProps> = ({
  alertConfigurationForm,
  setAlertConfigurationForm,
  tripInformationForm,
}) => {
  const classes = useStyles();

  const alertTypes = [
    { name: "Lock", icon: <LockIcon /> },
    { name: "Geozone-In", icon: <GeozoneInIcon /> },
    { name: "lowBattery", icon: <LowBatteryIcon /> },
    { name: "Unlock", icon: <UnlockIcon /> },
    { name: "Geozone-out", icon: <GeozoneOutIcon /> },
    { name: "overSpeeding", icon: <OverspeedingIcon /> },
    { name: "Tamper Alert", icon: <TamperAlertIcon /> },
    { name: "Trip ended", icon: <TripEndedIcon /> },
    { name: "overStopping", icon: <OverstopingIcon /> },
    { name: "Trip created", icon: <TripCreatedIcon /> },
  ];

  const defaultAlertTypes = ["Lock", "Unlock", "Tamper Alert"];
  const getAlertOptions = [
    { name: "SMS", icon: <SmsIcon /> },
    // Add more options like WhatsApp, Email here if needed
  ];

  const speedOptions = ["80", "90", "100"];
  const batteryOptions = ["40", "50", "60"];
  const overStopOptions = ["10", "20", "30"];

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

  const handleAlertDetailsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setAlertConfigurationForm((prevFields: any) => {
      if (name === "customNumber") {
        return {
          ...prevFields,
          alertMedium: {
            ...prevFields?.alertMedium,
            sms: {
              ...prevFields?.alertMedium?.sms,
              contact: value,
            },
          },
        };
      }

      return {
        ...prevFields,
        alertMedium: {
          ...prevFields?.alertMedium,
          [name?.toLowerCase()]: {
            ...prevFields?.alertMedium[name?.toLowerCase()],
            contact: value,
          },
        },
      };
    });
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
              isEnabled: checked,
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

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    let contactNumber = "";

    switch (value) {
      case "accountNumber":
        contactNumber = store.getState().auth.accountContactMobile;
        break;
      case "sourceNumber":
        contactNumber =
          tripInformationForm?.startPoint?.data?.mobileNumber || "";
        break;
      case "destinationNumber":
        contactNumber = tripInformationForm?.endPoint?.data?.mobileNumber || "";
        break;
      default:
        contactNumber = "";
    }

    setAlertConfigurationForm((prevFields: any) => ({
      ...prevFields,
      alertMedium: {
        ...prevFields?.alertMedium,
        sms: {
          ...prevFields?.alertMedium?.sms,
          smsType: value,
          contact: contactNumber,
        },
      },
    }));
  };

  return (
    <Grid container spacing={2} padding={5}>
      <Grid item xs={12} spacing={4}>
        <Typography variant="h6" gutterBottom>
          Alert Types
          <Box component="span" ml={0.4} className={classes.star}>
            *
          </Box>
        </Typography>
        <Grid container spacing={1}>
          {alertTypes.map((alert) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={alert.name}
              sx={{ display: "flex" }}
            >
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
                    <Box sx={{ width: "180px" }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Select
                          className={classes.dropDownStyle}
                          sx={{ marginTop: "8px", width: "100px" }}
                          name="overSpeeding"
                          renderValue={() =>
                            alertConfigurationForm?.alertDetails?.overSpeeding
                              ?.value !== ""
                              ? alertConfigurationForm?.alertDetails
                                  ?.overSpeeding?.value
                              : "Select Trip Type"
                          }
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
                    <Box sx={{ width: "180px" }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Select
                          className={classes.dropDownStyle}
                          sx={{ marginLeft: "17px", width: "100px" }}
                          name="lowBattery"
                          renderValue={() =>
                            alertConfigurationForm.alertDetails.lowBattery
                              .value !== ""
                              ? alertConfigurationForm.alertDetails.lowBattery
                                  .value
                              : "Select Trip Type"
                          }
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
                    <Box sx={{ width: "180px" }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Select
                          className={classes.dropDownStyle}
                          sx={{
                            marginTop: "8px",
                            width: "100px",
                            marginLeft: "5px",
                          }}
                          name="overStopping"
                          renderValue={() =>
                            alertConfigurationForm?.alertDetails?.overStopping
                              ?.value !== ""
                              ? alertConfigurationForm?.alertDetails
                                  ?.overStopping?.value
                              : "Select Trip Type"
                          }
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
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ height: "80px" }}
              >
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
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    {option?.name?.toLowerCase() === "sms" && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          marginLeft: "20px",
                          alignItems: "start",
                          gap: 2,
                        }}
                      >
                        <FormControl component="fieldset">
                          <FormLabel sx={{ paddingY: "10px" }}>
                            Send SMS to:
                          </FormLabel>
                          <RadioGroup
                            name="smsType"
                            value={
                              alertConfigurationForm?.alertMedium?.sms
                                ?.smsType || ""
                            }
                            onChange={handleRadioChange}
                            row
                          >
                            <FormControlLabel
                              value="accountNumber"
                              control={<Radio />}
                              label={`Account Number (${
                                store.getState().auth.accountContactMobile
                              })`}
                            />
                            <FormControlLabel
                              value="sourceNumber"
                              control={<Radio />}
                              label={`Source Number (${
                                tripInformationForm?.startPoint?.data
                                  ?.mobileNumber || "N/A"
                              })`}
                            />
                            <FormControlLabel
                              value="destinationNumber"
                              control={<Radio />}
                              label={`Destination Number (${
                                tripInformationForm?.endPoint?.data
                                  ?.mobileNumber || "N/A"
                              })`}
                            />
                            <FormControlLabel
                              value="customNumber"
                              control={<Radio />}
                              label="Custom Number"
                            />
                            {alertConfigurationForm?.alertMedium?.sms
                              ?.smsType === "customNumber" && (
                              <CustomInput
                                name="customNumber"
                                value={
                                  alertConfigurationForm?.alertMedium?.sms
                                    ?.contact || ""
                                }
                                onChange={handleAlertDetailsChange}
                                placeHolder="Enter Custom Number"
                                sx={{ width: "200px", marginLeft: "10px" }}
                              />
                            )}
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    )}
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
