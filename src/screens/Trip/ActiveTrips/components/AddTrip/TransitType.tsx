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
import { fetchRoutes } from "../../../../Routes/service/routes.service";

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
  const [routesTableData, setRoutesTableData] = useState([]);

  useEffect(() => {
    fetchTableTripType();
    fetchRoutesHandler();
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

  const fetchRoutesHandler = async () => {
    try {
      const res = await fetchRoutes({
        input: {
          accountId: "IMZ113343",
          page: -1,
          limit: 10000,
        },
      });
      setRoutesTableData(res?.fetchRoute?.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };
  return (
    <>
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
                tripFromFields?.transitType?.value !== ""
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
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={2}>
        <Box>
          <Stack direction="column">
            <InputLabel className={classes.inputLabel} shrink>
              Trip Route
            </InputLabel>
            <Select
              className={classes.dropDownStyle}
              id="add_user_status_dropdown"
              name="routeId"
              value={tripFromFields?.routeId?.value || ""}
              onChange={handleSelectChange}
              displayEmpty
              renderValue={() =>
                tripFromFields?.routeId?.value !== ""
                  ? tripFromFields?.routeId?.value
                  : "Select Trip Route"
              }
            >
              {routesTableData.map((item: any, index: any) => (
                <MenuItem
                  key={index}
                  value={item.routeId}
                  className={classes.dropDownOptionsStyle}
                >
                  {item.routeId} - {item.routeName}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Box>
      </Grid>
    </>
  );
};

export default TransitType;
