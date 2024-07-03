import React from "react";
import { Box, Grid, useTheme } from "@mui/material";
import useStyles from "./AddTrip.styles";
import { CustomInput } from "../../../../../global/components";
import strings from "../../../../../global/constants/StringConstants";

interface DriverInformationProps {
  tripFromFields: any;
  handleFormDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DriverInformation: React.FC<DriverInformationProps> = ({ tripFromFields, handleFormDataChange }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <CustomInput
          required
          id="add_asset_assingment_imei_field"
          placeHolder="Enter Driver Name"
          name="driverName"
          label="Driver Name"
          onChange={handleFormDataChange}
          value={tripFromFields.driverName?.value}
          error={tripFromFields.driverName?.error}
          propsToInputElement={{
            maxLength: strings.USER_FIRST_NAME_LIMIT,
          }}
          sx={{
            input: {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.default,
            },
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <CustomInput
          required
          id="add_asset_assingment_driver_phone_field"
          placeHolder="Enter Driver Phone"
          name="driverPhone"
          label="Driver Phone"
          onChange={handleFormDataChange}
          value={tripFromFields.driverPhone?.value}
          error={tripFromFields.driverPhone?.error}
          propsToInputElement={{
            maxLength: strings.USER_FIRST_NAME_LIMIT,
          }}
          sx={{
            input: {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.default,
            },
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <CustomInput
          required
          id="add_asset_assingment_alert_sms_phone_field"
          placeHolder="Enter Alert SMS Phone"
          name="alertSmsPhone"
          label="Alert SMS Phone"
          onChange={handleFormDataChange}
          value={tripFromFields.alertSmsPhone?.value}
          error={tripFromFields.alertSmsPhone?.error}
          propsToInputElement={{
            maxLength: strings.USER_FIRST_NAME_LIMIT,
          }}
          sx={{
            input: {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.default,
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default DriverInformation;
