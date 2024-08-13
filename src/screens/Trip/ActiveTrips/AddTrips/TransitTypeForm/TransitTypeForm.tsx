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
import { fetchTripTypeTableHandler } from "../../../TripType/service/TripType.service";
import { openErrorNotification } from "../../../../../helpers/methods";
import { fetchRoutes } from "../../../../Routes/service/routes.service";
import transitTypeStyles from "./TransitTypeForm.styles";
import { store } from "../../../../../utils/store";

interface TransitTypeProps {
  setTransitTypeForm: any;
  transitTypeForm: any;
}

const TransitTypeForm: React.FC<TransitTypeProps> = ({
  transitTypeForm,
  setTransitTypeForm,
}) => {
  const classes = transitTypeStyles();
  const [tripTypeData, setTripTypeData] = useState([]);
  const [routesTableData, setRoutesTableData] = useState<any>([]);

  useEffect(() => {
    fetchTableTripType();
    fetchRoutesHandler();
  }, []);

  const fetchTableTripType = async () => {
    try {
      const res = await fetchTripTypeTableHandler({
        input: {
          accountId: store.getState().auth.tenantId,
          page: -1,
          limit: 1000000,
        },
      });
      setTripTypeData(res.tripTypeList.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const fetchRoutesHandler = async () => {
    try {
      const res = await fetchRoutes({
        input: {
          accountId: store.getState().auth.tenantId,
          page: -1,
          limit: 10000,
        },
      });
      setRoutesTableData(res?.fetchRoute?.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const handleSelectChange = async (event: SelectChangeEvent<any>) => {
    const { name, value } = event?.target;

    if (name === "routeId") {
      const selectedRoute = routesTableData?.find(
        (route: any) => route?.routeId === value
      );
      if (selectedRoute) {
        const formattedRoute = {
          _id: selectedRoute?._id,
          totalDuration: selectedRoute?.totalDuration,
          totalDistance: selectedRoute?.totalDistance,
          createdBy: selectedRoute?.createdBy,
          routesData: selectedRoute?.routeDetails.map(
            (detail: any) => detail?._id
          ),
          routeName: selectedRoute?.routeName,
          routeId: selectedRoute?.routeId,
          accountId: store?.getState()?.auth?.tenantId,
        };

        setTransitTypeForm((prevFields: any) => ({
          ...prevFields,
          routeId: {
            ...prevFields.routeId,
            value,
            error: "",
          },
          route: formattedRoute,
        }));
      }
    } else {
      setTransitTypeForm((prevFields: any) => ({
        ...prevFields,
        [name]: {
          ...prevFields[name as keyof typeof prevFields],
          value,
          error: "",
        },
      }));
    }
  };
  return (
    <Grid container spacing={2} padding={5}>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <Box>
          <Stack direction="column">
            <InputLabel className={classes.inputLabel} shrink>
              Transit Type
              <Box ml={0.4} color={"red"}>
                *
              </Box>
            </InputLabel>
            <Select
              className={classes.dropDownStyle}
              id="add_user_status_dropdown"
              name="transitType"
              value={transitTypeForm?.transitType?.value || ""}
              onChange={handleSelectChange}
              displayEmpty
              renderValue={() =>
                transitTypeForm?.transitType?.value !== ""
                  ? transitTypeForm?.transitType?.value
                  : "Select Transit Type"
              }
            >
              {tripTypeData?.map((item: any, index: any) => (
                <MenuItem
                  key={index}
                  value={item?.tripName}
                  className={classes.dropDownOptionsStyle}
                >
                  {item?.tripName}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <Box>
          <Stack direction="column">
            <InputLabel className={classes.inputLabel} shrink>
              Trip Route
            </InputLabel>
            <Select
              className={classes.dropDownStyle}
              id="add_user_status_dropdown"
              name="routeId"
              value={transitTypeForm?.routeId?.value || ""}
              onChange={handleSelectChange}
              displayEmpty
              renderValue={() =>
                transitTypeForm?.routeId?.value !== ""
                  ? transitTypeForm?.routeId?.value
                  : "Select Trip Route"
              }
            >
              {routesTableData?.map((item: any, index: any) => (
                <MenuItem
                  key={index}
                  value={item?.routeId}
                  className={classes.dropDownOptionsStyle}
                >
                  {item?.routeId} - {item?.routeName}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default TransitTypeForm;
