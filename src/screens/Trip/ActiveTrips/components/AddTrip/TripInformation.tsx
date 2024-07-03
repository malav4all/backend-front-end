import React from "react";
import { Box, Stack, InputLabel, Select, MenuItem, Grid, useTheme, FormHelperText, SelectChangeEvent } from "@mui/material";
import useStyles from "./AddTrip.styles";
import { isTruthy } from "../../../../../helpers/methods";
import { CustomInput } from "../../../../../global/components";
import strings from "../../../../../global/constants/StringConstants";

interface TripInformationProps {
  tripFromFields: any;
  handleFormDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (event: SelectChangeEvent<any>) => void;
}

const TripInformation: React.FC<TripInformationProps> = ({ tripFromFields, handleFormDataChange, handleSelectChange }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <Box>
          <Stack direction="column">
            <InputLabel
              className={classes.inputLabel}
              shrink
            >
              Distributor
              <Box ml={0.4} className={classes.star}>
                *
              </Box>
            </InputLabel>
            <Select
              className={classes.dropDownStyle}
              id="add_user_status_dropdown"
              name="distributor"
              value={tripFromFields?.distributor?.value || ""}
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
            {!isTruthy(tripFromFields.distributor?.value) && (
              <FormHelperText error className={classes.errorStyle}>
                {tripFromFields.distributor?.error}
              </FormHelperText>
            )}
          </Stack>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <Box>
          <Stack direction="column">
            <InputLabel
              className={classes.inputLabel}
              shrink
            >
              Transporter
              <Box ml={0.4} className={classes.star}>
                *
              </Box>
            </InputLabel>
            <Select
              className={classes.dropDownStyle}
              id="add_user_status_dropdown"
              name="transporter"
              value={tripFromFields?.transporter?.value || ""}
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
            {!isTruthy(tripFromFields.transporter?.value) && (
              <FormHelperText error className={classes.errorStyle}>
                {tripFromFields.transporter?.error}
              </FormHelperText>
            )}
          </Stack>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <Box>
          <Stack direction="column">
            <InputLabel
              className={classes.inputLabel}
              shrink
            >
              Source
              <Box ml={0.4} className={classes.star}>
                *
              </Box>
            </InputLabel>
            <Select
              className={classes.dropDownStyle}
              id="add_user_status_dropdown"
              name="source"
              value={tripFromFields?.source?.value || ""}
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
            {!isTruthy(tripFromFields.source?.value) && (
              <FormHelperText error className={classes.errorStyle}>
                {tripFromFields.source?.error}
              </FormHelperText>
            )}
          </Stack>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <Box>
          <Stack direction="column">
            <InputLabel
              className={classes.inputLabel}
              shrink
            >
              Destination
              <Box ml={0.4} className={classes.star}>
                *
              </Box>
            </InputLabel>
            <Select
              className={classes.dropDownStyle}
              id="add_user_status_dropdown"
              name="destination"
              value={tripFromFields?.destination?.value || ""}
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
            {!isTruthy(tripFromFields.destination?.value) && (
              <FormHelperText error className={classes.errorStyle}>
                {tripFromFields.destination?.error}
              </FormHelperText>
            )}
          </Stack>
        </Box>
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

      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <CustomInput
          required
          id="add_device_group_name_field"
          placeHolder="Enter Vehicle Number"
          name="vehicleNumber"
          label="Vehicle Number"
          onChange={handleFormDataChange}
          value={tripFromFields.vehicleNumber?.value}
          error={tripFromFields.vehicleNumber?.error}
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

export default TripInformation;
