import React from "react";
import {
  Box,
  Stack,
  InputLabel,
  Grid,
  useTheme,
  SelectChangeEvent,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import useStyles from "./AddTrip.styles";
import { isTruthy } from "../../../../../helpers/methods";

interface AlertConfigurationProps {
  tripFromFields: any;
  handleFormDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (event: SelectChangeEvent<any>) => void;
  handleDateChange: (field: string, date: Date | null) => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AlertConfiguration: React.FC<AlertConfigurationProps> = ({
  tripFromFields,
  handleFormDataChange,
  handleSelectChange,
  handleDateChange,
  handleCheckboxChange,
}) => {
  const theme = useTheme();
  const classes = useStyles();

  const alertTypes = [
    "lock",
    "Unlock",
    "Geozone-In",
    "Geozone-out",
    "Trip created",
    "Trip ended",
    "Tamper Alert",
    "Overspeeding",
    "low battery",
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Stack direction="column">
          <InputLabel className={classes.inputLabel} shrink>
            Alert Types
            <Box ml={0.4} className={classes.star}>
              *
            </Box>
          </InputLabel>
          <Box>
            {alertTypes.map((alert) => (
              <FormControlLabel
                key={alert}
                control={
                  <Checkbox
                    checked={
                      tripFromFields.alertTypes?.value.includes(alert) || false
                    }
                    onChange={handleCheckboxChange}
                    name={alert}
                  />
                }
                label={alert}
              />
            ))}
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AlertConfiguration;
