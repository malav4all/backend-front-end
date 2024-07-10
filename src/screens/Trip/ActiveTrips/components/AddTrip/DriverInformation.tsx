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
      {/* Add appropriate fields here */}
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <CustomInput
          required
          id="driver_name_field"
          placeHolder="Enter Driver Name"
          name="driverName"
          label="Driver Name"
          onChange={handleFormDataChange}
          value={tripFromFields.driverName?.value}
          error={tripFromFields.driverName?.error}
          propsToInputElement={{ maxLength: strings.USER_LAST_NAME_LIMIT }}
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
