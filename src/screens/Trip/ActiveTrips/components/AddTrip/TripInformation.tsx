import React from "react";
import {
  Box,
  Stack,
  InputLabel,
  Grid,
  useTheme,
  SelectChangeEvent,
} from "@mui/material";
import useStyles from "./AddTrip.styles";
import { isTruthy } from "../../../../../helpers/methods";
import { CustomInput } from "../../../../../global/components";
import strings from "../../../../../global/constants/StringConstants";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

interface TripInformationProps {
  tripFromFields: any;
  handleFormDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (event: SelectChangeEvent<any>) => void;
  handleDateChange: (field: string, date: Date | null) => void; // Ensure handleDateChange is passed as a prop
}

const TripInformation: React.FC<TripInformationProps> = ({
  tripFromFields,
  handleFormDataChange,
  handleSelectChange,
  handleDateChange, // Ensure handleDateChange is received as a prop
}) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <CustomInput
          required
          id="add_device_group_name_field"
          placeHolder="Enter Start Point"
          name="startPoint"
          label="Start Point"
          onChange={handleFormDataChange}
          value={tripFromFields.startPoint?.value}
          error={tripFromFields.startPoint?.error}
          propsToInputElement={{ maxLength: strings.USER_LAST_NAME_LIMIT }}
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
          id="add_device_group_name_field"
          placeHolder="Enter End Point"
          name="endPoint"
          label="End Point"
          onChange={handleFormDataChange}
          value={tripFromFields.endPoint?.value}
          error={tripFromFields.endPoint?.error}
          propsToInputElement={{ maxLength: strings.USER_LAST_NAME_LIMIT }}
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
          id="add_device_group_name_field"
          placeHolder="Enter IMEI Number"
          name="imeiNumber"
          label="IMEI Number"
          onChange={handleFormDataChange}
          value={tripFromFields.imeiNumber?.value}
          error={tripFromFields.imeiNumber?.error}
          propsToInputElement={{ maxLength: strings.USER_LAST_NAME_LIMIT }}
          sx={{
            input: {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.default,
            },
          }}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
        <Stack direction="column">
          <InputLabel
            sx={{
              color: theme.palette.text.primary,
              
            }}
            shrink
          >
            Trip Start Date & Time
            <Box ml={0.4}>*</Box>
          </InputLabel>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                value={tripFromFields?.startDate?.value}
                onChange={(date) => handleDateChange("startDate", date)} // Use handleDateChange for date fields
                format="dd/MM/yyyy hh:mm a"
                ampm={true}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    fullWidth: true,
                    error: isTruthy(tripFromFields?.startDate?.error),
                    helperText: tripFromFields?.startDate?.error,
                    inputProps: {
                      placeholder: "DD/MM/YYYY",
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
        <Stack direction="column">
          <InputLabel
            sx={{
              color: theme.palette.text.primary,
            }}
            shrink
          >
            Trip End Date & Time
            <Box ml={0.4}>*</Box>
          </InputLabel>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                value={tripFromFields?.endDate?.value}
                onChange={(date) => handleDateChange("endDate", date)} 
                format="dd/MM/yyyy hh:mm a"
                ampm={true}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    fullWidth: true,
                    error: isTruthy(tripFromFields?.endDate?.error),
                    helperText: tripFromFields?.endDate?.error,
                    inputProps: {
                      placeholder: "DD/MM/YYYY",
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default TripInformation;
