import React from "react";
import {
  Box,
  Stack,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  useTheme,
  SelectChangeEvent,
} from "@mui/material";
import useStyles from "./AddTrip.styles";

interface TransitTypeProps {
  tripFromFields: any;
  handleSelectChange: (event: SelectChangeEvent<any>, child: React.ReactNode) => void;
}

const TransitType: React.FC<TransitTypeProps> = ({ tripFromFields, handleSelectChange }) => {
  const theme = useTheme();
  const classes = useStyles();

  const journeys = [
    { _id: "1", journeyName: "Journey 1" },
    { _id: "2", journeyName: "Journey 2" }
  ];

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <Box>
        <Stack direction="column">
          <InputLabel
            className={classes.inputLabel}
            shrink
          >
            Transit Type
          </InputLabel>
          <Select
            className={classes.dropDownStyle}
            id="add_user_status_dropdown"
            name="journey"
            value={tripFromFields?.journey?.value || ""}
            onChange={handleSelectChange}
            displayEmpty
          >
            {journeys.map((item, index) => (
              <MenuItem
                key={index}
                value={item._id}
                className={classes.dropDownOptionsStyle}
              >
                {item.journeyName}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Box>
    </Grid>
  );
};

export default TransitType;
