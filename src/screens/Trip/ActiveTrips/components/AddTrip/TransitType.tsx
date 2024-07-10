import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import useStyles from "./AddTrip.styles";
import { fetchTripTypeTableHandler } from "../../../TripType/service/TripType.service";
import { openErrorNotification } from "../../../../../helpers/methods";

interface TransitTypeProps {
  tripFromFields: any;
  handleSelectChange: (
    event: SelectChangeEvent<any>,
    child: React.ReactNode
  ) => void;
}

const TransitType: React.FC<TransitTypeProps> = ({
  tripFromFields,
  handleSelectChange,
}) => {
  const classes = useStyles();
  const [tripTypeData, setTripTypeDate] = useState([]);

  useEffect(() => {
    fetchTableTripType();
  }, []);

  const fetchTableTripType = async () => {
    try {
      const res = await fetchTripTypeTableHandler({
        input: { accountId: "IMZ113343", page: -1, limit: 1000000 },
      });
      setTripTypeDate(res.tripTypeList.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <Box>
        <Stack direction="column">
          <InputLabel className={classes.inputLabel} shrink>
            Transit Type
          </InputLabel>
          <Select
            className={classes.dropDownStyle}
            id="add_user_status_dropdown"
            name="transitType"
            value={tripFromFields?.transitType?.value || ""}
            onChange={handleSelectChange}
            displayEmpty
            renderValue={() =>
              tripFromFields?.transitType?.value !== undefined
                ? tripFromFields?.transitType?.value
                : "Select Transit Type"
            }
          >
            {tripTypeData.map((item: any, index: any) => (
              <MenuItem
                key={index}
                value={item.tripName}
                className={classes.dropDownOptionsStyle}
              >
                {item.tripName}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Box>
    </Grid>
  );
};

export default TransitType;
