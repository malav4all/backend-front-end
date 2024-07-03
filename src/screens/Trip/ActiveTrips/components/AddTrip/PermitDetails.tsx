import React from "react";
import {
  Box,
  Stack,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  useTheme,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import useStyles from "./AddTrip.styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { CustomInput } from "../../../../../global/components";
import { isTruthy } from "../../../../../helpers/methods";
import strings from "../../../../../global/constants/StringConstants";

interface PermitDetailsProps {
  tripFromFields: any;
  handleFormDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (event: SelectChangeEvent<any>) => void;
  handleDateChange: (field: string, date: Date | null) => void;
}

const PermitDetails: React.FC<PermitDetailsProps> = ({
  tripFromFields,
  handleFormDataChange,
  handleSelectChange,
  handleDateChange,
}) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <CustomInput
          required
          id="add_asset_assingment_imei_field"
          placeHolder="Enter IMEI Number"
          name="imei"
          label="Trip End Date"
          onChange={handleFormDataChange}
          value={tripFromFields.imei?.value}
          error={tripFromFields.imei?.error}
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
        <Box>
          <Stack direction="column">
            <InputLabel className={classes.inputLabel} shrink>
              Material
              <Box ml={0.4} className={classes.star}>
                *
              </Box>
            </InputLabel>
            <Select
              className={classes.dropDownStyle}
              id="add_user_status_dropdown"
              name="boxSet"
              value={tripFromFields?.boxSet?.value || ""}
              onChange={handleSelectChange}
              displayEmpty
            >
              {["A", "B", "C"].map((item, index) => (
                <MenuItem
                  key={index}
                  value={item}
                  className={classes.dropDownOptionsStyle}
                >
                  {item}
                </MenuItem>
              ))}
            </Select>
            {!isTruthy(tripFromFields.boxSet?.value) && (
              <FormHelperText error className={classes.errorStyle}>
                {tripFromFields.boxSet?.error}
              </FormHelperText>
            )}
          </Stack>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <CustomInput
          required
          id="add_asset_assingment_imei_field"
          placeHolder="Enter Permit Number"
          name="permitNumber"
          label="Permit Number"
          onChange={handleFormDataChange}
          value={tripFromFields.permitNumber?.value}
          error={tripFromFields.permitNumber?.error}
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

      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <Stack direction="column">
          <InputLabel className={classes.inputLabel} shrink>
            Permit Start Date and Time
            <Box ml={0.4} className={classes.star}>
              *
            </Box>
          </InputLabel>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                value={tripFromFields.startDate?.value}
                onChange={(date) => handleDateChange("startDate", date)}
                format="dd/MM/yyyy hh:mm a"
                ampm={true}
                slotProps={{
                  textField: {
                    className: classes.datePicker,
                    variant: "outlined",
                    fullWidth: true,
                    error: isTruthy(tripFromFields.startDate?.error),
                    helperText: tripFromFields.startDate?.error,
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

      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <Stack direction="column">
          <InputLabel className={classes.inputLabel} shrink>
            Permit End Date and Time
            <Box ml={0.4} className={classes.star}>
              *
            </Box>
          </InputLabel>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                value={tripFromFields.endDate?.value}
                onChange={(date) => handleDateChange("endDate", date)}
                format="dd/MM/yyyy hh:mm a"
                ampm={true}
                slotProps={{
                  textField: {
                    className: classes.datePicker,
                    variant: "outlined",
                    fullWidth: true,
                    error: isTruthy(tripFromFields.endDate?.error),
                    helperText: tripFromFields.endDate?.error,
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

export default PermitDetails;
