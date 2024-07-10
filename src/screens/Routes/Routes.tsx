import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CustomAppHeader,
  CustomButton,
  CustomInput,
  CustomPaper,
  CustomTable,
} from "../../global/components";
import {
  Autocomplete,
  Box,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import routesStyles from "./Routes.styles";
import {
  getRelativeFontSize,
  primaryHeadingColor,
  boldFont,
  disabledBackgroundColor,
  chipBackgroundColor,
  headerColor,
  primaryHeaderColor,
} from "../../utils/styles";
import SearchIcon from "@mui/icons-material/Search";
import { fetchGeozoneHandler } from "../Geozone/service/geozone.service";
import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../helpers/methods";
import DeleteIcon from "@mui/icons-material/Delete";
import SensorsRoundedIcon from "@mui/icons-material/SensorsRounded";
import {
  createRoutes,
  fetchRoutes,
  searchRoutess,
} from "./service/routes.service";
import { store } from "../../utils/store";
import VisibilityIcon from "@mui/icons-material/Visibility";
import history from "../../utils/history";
import { routesTableHeader, validateRoutesForm } from "./Routes.helper";
import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import strings from "../../global/constants/StringConstants";
import { RiCloseCircleFill } from "react-icons/ri";

const Routes = () => {
  const classes = routesStyles;
  const theme = useTheme();
  const [page, setPage] = useState<number>(1);
  const [formField, setFormField] = useState<any>({
    routeName: {
      value: "",
      error: "",
    },
    startLocation: {
      value: "",
      error: "",
    },
    endLocation: {
      value: "",
      error: "",
    },
  });
  const [coordinatesArray, setCoordinatesArray] = useState<any>([]);
  const [isHideForm, setIsHideForm] = useState<boolean>(false);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [tableData, setTableData] = useState([]);
  const [routesTableData, setRoutesTableData] = useState([]);
  const [finalLocationIds, setFinalLocationIds] = useState<string[]>([]);
  const [counter, setCounter] = useState(66);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [searchRoutes, setSearchRoutes] = useState<string>("");
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
  const [selectedValues, setSelectedValues] = React.useState<any>({});
  const [locationData, setLocationData] = useState<any>([
    {
      name: "LocationA",
      field: "locationA",
      type: "String",
      fieldMapping: "",
      required: true,
      error: "",
    },
  ]);

  useEffect(() => {
    fetchGeozone();
    fetchRoutesHandler();
  }, []);

  useEffect(() => {
    if (searchRoutes) {
      getSearchData();
    } else {
      fetchGeozone();
      fetchRoutesHandler();
    }
  }, [searchRoutes, page, rowsPerPage, searchPageNumber]);

  const handleOnChange = (event: React.ChangeEvent<any>) => {
    if (event.target.value.length <= 50) {
      setFormField({
        ...formField,
        [event.target.name]: {
          ...formField[event?.target?.name],
          value: event?.target?.value,
          error: "",
        },
      });
    }
  };

  const handleAutocompleteChange = (newValue: any, name: string) => {
    if (
      newValue?.value &&
      newValue?.value?._id &&
      !finalLocationIds.includes(newValue?.value?._id)
    ) {
      setFinalLocationIds((prevIds) => [...prevIds, newValue?.value?._id]);
      setCoordinatesArray((prev: any) => [
        ...prev,
        {
          latitude: newValue?.value?.geoCodeData?.geometry?.coordinates[0],
          longitude: newValue?.value?.geoCodeData?.geometry?.coordinates[1],
        },
      ]);
      setSelectedValues((prev: any) => ({ ...prev, [name]: newValue }));
    }
  };

  const calculateDistance = async () => {
    const firstCoordinate = coordinatesArray?.shift();
    const lastCoordinate = coordinatesArray?.pop();
    const viaParams = coordinatesArray.map(
      (point: any) => `via=${point.latitude},${point.longitude}`
    );

    const viaQueryString = viaParams.join("&");
    const routeRequestParams = {
      routingMode: "fast",
      transportMode: "car",
      origin: `${firstCoordinate.latitude},${firstCoordinate.longitude}`,
      destination: `${lastCoordinate.latitude},${lastCoordinate.longitude}`,
      return: "travelSummary",
    };
    const url = `https://router.hereapi.com/v8/routes?routingMode=${
      routeRequestParams.routingMode
    }&transportMode=${routeRequestParams.transportMode}&origin=${
      routeRequestParams.origin
    }&destination=${routeRequestParams.destination}&${viaQueryString}&return=${
      routeRequestParams.return
    }&apiKey=${"B2MP4WbkH6aIrC9n0wxMrMrZhRCjw3EV7loqVzkBbEo"}`;
    const res = await fetch(url);
    const data = await res.json();
    const route = data.routes[0];
    let totalDistance = 0;
    let totalDuration = 0;
    route.sections.forEach((section: any) => {
      totalDistance += section.travelSummary.length;
      totalDuration += section.travelSummary.duration;
    });
    totalDistance /= 1000;
    totalDuration /= 3600;
    return {
      totalDistance: totalDistance.toFixed(2),
      totalDuration: totalDuration.toFixed(2),
    };
  };

  const handleValidation = () => {
    const { isValid, errors } = validateRoutesForm(formField);
    setFormField({ ...errors });
    return isValid;
  };

  const addRoutesHandler = async () => {
    try {
      // if (handleValidation()) {
      setIsLoading(true);
      const { totalDistance, totalDuration } = await calculateDistance();
      const res = await createRoutes({
        input: {
          accountId: "IMZ113343",
          routeName: formField?.routeName?.value,
          routesData: finalLocationIds,
          createdBy: store.getState()?.auth?.userName,
          totalDistance: Number(totalDistance),
          totalDuration: Number(totalDuration),
        },
      });
      openSuccessNotification(res?.addRoute?.message);
      setFormField({
        routesName: {
          value: "",
          error: "",
        },
        endLocation: {
          value: "",
          error: "",
        },
        startLocation: {
          value: "",
          error: "",
        },
      });
      setLocationData([
        {
          name: "LocationA",
          field: "locationA",
          type: "String",
          fieldMapping: "",
          required: true,
          error: "",
        },
      ]);
      setFinalLocationIds([]);
      await fetchRoutesHandler();
      setIsLoading(false);
      // }
    } catch (error: any) {
      setIsLoading(false);
      openErrorNotification(error.message);
    }
  };

  const formatDuration = (durationInHours: number) => {
    if (durationInHours < 1) {
      const minutes = Math.round(durationInHours * 60);
      return `${minutes} Minutes`;
    } else {
      return `${durationInHours.toFixed(2)} Hours`;
    }
  };

  const formatDistance = (distanceInKm: number) => {
    const distance = Number(distanceInKm);
    if (distance < 1) {
      const meters = Math.round(distance * 1000);
      return `${meters} m`;
    } else {
      return `${distance.toFixed(2)} Km`;
    }
  };

  const handleSearchChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setSearchPageNumber(newPage);
  };

  const tableRender = (tableData: any) => {
    const data = tableData?.map((item: any, index: number) => {
      const coordinates = item?.routesData?.map((coor: any) => {
        const [lat, lng] = coor?.geoCodeData?.geometry?.coordinates;
        return { lat, lng };
      });
      const firstCoordinate = coordinates?.shift();
      const lastCoordinate = coordinates?.pop();
      const routeOrigin: { lat: number; lng: number }[] = [];
      if (firstCoordinate) {
        const { lat: firstLat, lng: firstLong } = firstCoordinate;
        routeOrigin.push({ lat: firstLat, lng: firstLong });
      }
      if (lastCoordinate) {
        const { lat: lastLat, lng: lastLong } = lastCoordinate;
        routeOrigin.push({ lat: lastLat, lng: lastLong });
      }
      return {
        key: item._id,
        routeId: item.routeId,
        routesName: item?.routeName,
        createdBy: item?.createdBy,
        totalDistance: formatDistance(item?.totalDistance),
        totalDuration: formatDuration(item?.totalDuration),
        action: (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip
              title={
                <CustomPaper
                  className={{ backgroundColor: disabledBackgroundColor }}
                >
                  <Typography sx={classes.liveTrackingTooltipText}>
                    {"Live Tracking"}
                  </Typography>
                </CustomPaper>
              }
              placement="top"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    background: "none",
                  },
                },
              }}
            >
              <SensorsRoundedIcon
                style={{ color: primaryHeaderColor, cursor: "pointer" }}
                onClick={() => {
                  history.push({
                    pathname: "/live-tracking",
                  });
                }}
              />
            </Tooltip>

            <Tooltip
              title={
                <CustomPaper
                  className={{ backgroundColor: disabledBackgroundColor }}
                >
                  <Typography sx={classes.liveTrackingTooltipText}>
                    {"View Routes"}
                  </Typography>
                </CustomPaper>
              }
              placement="top"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    background: "none",
                  },
                },
              }}
            >
              <VisibilityIcon
                key={item._id}
                style={{ color: primaryHeaderColor, cursor: "pointer" }}
                onClick={() => {
                  history.push({
                    pathname: "/view-routes",
                    state: {
                      coordinates: coordinates,
                      routeOrigin,
                    },
                  });
                }}
              />
            </Tooltip>
          </Box>
        ),
      };
    });
    return data;
  };

  const fetchRoutesHandler = async () => {
    try {
      setIsLoading(true);
      const res = await fetchRoutes({
        input: {
          accountId: "IMZ113343",
          page,
          limit: 10,
        },
      });
      const data = tableRender(res?.fetchRoute?.data);
      setRoutesTableData(data);
      setCount(res.fetchRoute?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      openErrorNotification(error.message);
    }
  };

  const fetchGeozone = async () => {
    try {
      const res = await fetchGeozoneHandler({
        input: {
          accountId: "IMZ113343",
          page: -1,
          limit: 0,
        },
      });
      setTableData(res?.listGeozone?.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const getHeader = () => {
    return (
      <Box>
        <Typography sx={{ ...classes.mainCardHeading, color: "white" }}>
          Active Routes
        </Typography>
      </Box>
    );
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handlePerPageData = (event: any) => {
    setPage(1);
    setSearchPageNumber(1);
    setRowsPerPage(event?.target?.value);
  };

  const getSearchData = async () => {
    try {
      setIsLoading(true);
      const res = await searchRoutess({
        input: {
          search: searchRoutes,
          page: 1,
          limit: 10,
        },
      });
      const data = tableRender(res.searchRoutess.data);
      setRoutesTableData(data);
      setCount(res?.searchRoutess?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      setSearchRoutes(SearchEvent.target.value.trim());
      setPage(1);
      setRowsPerPage(10);
    } else {
      setSearchRoutes("");
    }
  };

  const getCustomTable = () => {
    return (
      <Box
        id="campaign_history_display_table"
        sx={{
          minWidth: "300px",
          width: "100%",
          overflow: "auto",
        }}
      >
        <CustomTable
          headers={routesTableHeader}
          rows={routesTableData}
          size={[5]}
          handlePageChange={
            searchRoutes ? handleSearchChangePage : handleChangePage
          }
          handleRowsPerPage={handlePerPageData}
          paginationCount={count}
          // rowsPerPage={rowsPerPage}
          pageNumber={page}
          setPage={setPage}
          handlePerPageData={handlePerPageData}
          perPageData={rowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </Box>
    );
  };

  const addMoreLocation = () => {
    const name = `Location${String.fromCharCode(counter)}`;
    const field = `location${String.fromCharCode(counter)}`;
    const arr = [
      ...locationData,
      {
        name,
        field,
        type: "",
        fieldMapping: "",
        required: true,
        error: "",
      },
    ];

    setLocationData(arr);
    setCounter(counter + 1);
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search Routes..."
        id="assetAssingment_search_field"
        onChange={debounceEventHandler(
          handleSearchOnChange,
          strings.SEARCH_TIME_OUT
        )}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  };

  const inputSection = () => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item sx={{ display: "flex", gap: "1rem", width: "95%" }}>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <CustomInput
                label="Routes Name"
                placeHolder="Enter Routes name"
                value={formField?.routeName?.value}
                maxLength={100}
                required
                name="routeName"
                onChange={handleOnChange}
                error={formField?.routeName?.error}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={12} lg={6} xl={6}>
            <Box>
              <InputLabel
                sx={{
                  ...classes.inputLabel,
                  color: theme.palette.text.primary,
                }}
                shrink
              >
                Start Location
                <Box ml={0.4} sx={classes.star}>
                  *
                </Box>
              </InputLabel>

              <Autocomplete
                sx={classes.emailDropDownStyle}
                id="update_user_manager_field"
                options={
                  tableData
                    ?.filter(
                      (tItem) =>
                        !Object.values(selectedValues).find(
                          (selected: any) => selected?.value === tItem
                        )
                    )
                    .map((item: any) => ({
                      key: item._id,
                      label: `${item.name} - ${item.description}`,
                      value: item,
                    })) || []
                }
                onChange={(event, newValue) =>
                  handleAutocompleteChange(newValue, "startLocation")
                }
                renderInput={(params) => {
                  const InputProps = { ...params.InputProps };
                  InputProps.endAdornment = null;
                  return (
                    <TextField
                      sx={classes.select}
                      {...params}
                      name="startLocation"
                      placeholder="Select Start location"
                      onSelect={handleOnChange}
                      InputProps={InputProps}
                      error={
                        !isTruthy(formField.startLocation?.value) &&
                        formField?.startLocation?.error
                      }
                    />
                  );
                }}
              />
              {!formField.startLocation.value && (
                <FormHelperText error sx={classes.errorStyle}>
                  {formField.startLocation?.error}
                </FormHelperText>
              )}
            </Box>
          </Grid>

          {locationData?.map((item: any, index: number) => (
            <Box sx={{ display: "flex", alignItems: "center", width: "30%" }}>
              <Grid
                item
                xs={12}
                sm={3}
                md={3}
                lg={3}
                xl={3}
                ml={4}
                mt={2}
                key={index}
              >
                <Box sx={{ width: "100%" }}>
                  <InputLabel
                    sx={{
                      ...classes.inputLabel,
                      color: theme.palette.text.primary,
                    }}
                    shrink
                  >
                    {item.name.slice(0, -1) + " " + (index + 1)}
                  </InputLabel>
                  <Box>
                    <Autocomplete
                      sx={classes.emailDropDownStyle}
                      id={`location-${item._id}`}
                      options={
                        tableData
                          ?.filter(
                            (tItem) =>
                              !Object.values(selectedValues).find(
                                (selected: any) => selected?.value === tItem
                              )
                          )
                          .map((tItem: any) => ({
                            key: tItem._id,
                            label: `${tItem.name} - ${tItem.description}`,
                            value: tItem,
                          })) || []
                      }
                      onChange={(event, newValue) =>
                        handleAutocompleteChange(newValue, item.name)
                      }
                      renderInput={(params) => {
                        const InputProps = { ...params.InputProps };
                        InputProps.endAdornment = null;
                        return (
                          <TextField
                            sx={classes.select}
                            {...params}
                            name={`location-${item._id}`}
                            placeholder="Search location"
                            onSelect={() => {}}
                            InputProps={InputProps}
                          />
                        );
                      }}
                    />
                  </Box>
                </Box>
              </Grid>

              <Grid
                item
                xs={0.5}
                sm={0.5}
                md={0.5}
                lg={0.5}
                xl={0.5}
                key={index}
              >
                <DeleteIcon
                  style={{
                    marginTop: "50px",
                    marginLeft: "15px",
                    color: theme.palette.text.primary,
                  }}
                  onClick={() =>
                    setLocationData(
                      locationData.filter((_: any, i: any) => i !== index)
                    )
                  }
                />
              </Grid>
            </Box>
          ))}

          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Box>
              <InputLabel
                sx={{
                  ...classes.inputLabel,
                  color: theme.palette.text.primary,
                }}
                shrink
              >
                End Location
                <Box ml={0.4} sx={classes.star}>
                  *
                </Box>
              </InputLabel>
              <Autocomplete
                sx={classes.emailDropDownStyle}
                id="update_user_manager_field"
                options={
                  tableData
                    ?.filter(
                      (tItem) =>
                        !Object.values(selectedValues).find(
                          (selected: any) => selected?.value === tItem
                        )
                    ) // Filter out selected values
                    .map((item: any) => ({
                      key: item._id,
                      label: `${item.name} - ${item.description}`,
                      value: item,
                    })) || []
                }
                onChange={(event, newValue) =>
                  handleAutocompleteChange(newValue, "endLocation")
                }
                renderInput={(params) => {
                  const InputProps = { ...params.InputProps };
                  InputProps.endAdornment = null;
                  return (
                    <TextField
                      sx={classes.select}
                      {...params}
                      name="endLocation"
                      placeholder="Select End location"
                      onSelect={handleOnChange}
                      InputProps={InputProps}
                      error={
                        !isTruthy(formField.startLocation?.value) &&
                        formField.startLocation?.error
                      }
                    />
                  );
                }}
              />
              {!formField.endLocation.value && (
                <FormHelperText error sx={classes.errorStyle}>
                  {formField.endLocation?.error}
                </FormHelperText>
              )}
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        height: "100%",
      }}
    >
      <CustomAppHeader
        className={{
          backgroundColor: headerColor,
          padding: "10px 20px 15px 18px",
        }}
      >
        <Stack
          px={4}
          pt={2}
          direction={{ lg: "row", xs: "column" }}
          justifyContent="space-between"
          alignItems={{ lg: "center" }}
        >
          <Typography
            sx={{
              fontSize: getRelativeFontSize(6),
              ...boldFont,
              color: theme.palette.text.primary,
            }}
          >
            {getHeader()}
          </Typography>

          <Stack
            direction={{ sm: "row", xs: "column" }}
            alignItems={{ sm: "center" }}
            spacing={1}
          >
            {getSearchBar()}
          </Stack>
        </Stack>
      </CustomAppHeader>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          flexWrap: "wrap",
          backgroundColor: theme.palette.background.paper,
        }}
        mt={2}
        mr={2}
      >
        {!isHideForm ? (
          <CustomButton
            id="users_add_button"
            label={"Create Routes"}
            onClick={() => {
              setIsHideForm(!isHideForm);
            }}
            customClasses={{
              width: "150px",
            }}
          />
        ) : (
          <Box
            sx={{
              padding: "0rem 2rem",
              fontSize: "2rem",
              cursor: "pointer",
              borderRadius: "100%",
              color: theme.palette.text.primary,
            }}
            onClick={() => {
              setIsHideForm(!isHideForm);
            }}
          >
            <RiCloseCircleFill />
          </Box>
        )}
      </Box>

      {isHideForm && (
        <Box
          sx={{
            width: "90%",
            margin: "auto",
            padding: "2rem",
            borderRadius: "5px",
            backgroundColor: theme.palette.dialogColor.body,
            borderColor: theme.palette.dialogColor.border,
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            border: "1px",
            marginBottom: "2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexWrap: "wrap",
              padding: "1rem 1rem",
              backgroundColor: theme.palette.dialogColor.body,
            }}
            mt={2}
            mr={2}
          >
            <CustomButton
              id="users_add_button"
              label={"Add location"}
              onClick={addMoreLocation}
              customClasses={{
                width: "150px",
                color: "#ffffff",
              }}
            />
          </Box>

          <Box p={2}>{inputSection()}</Box>

          <Box
            sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
            mt={2}
            mr={2}
          >
            <CustomButton
              id="users_add_button"
              label={"Submit"}
              onClick={addRoutesHandler}
              customClasses={{
                width: "150px",
              }}
            />
          </Box>
        </Box>
      )}

      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        sx={{
          padding: "30px",
          paddingTop: "2px",
          marginTop: "10px",
          [theme.breakpoints.down("md")]: {
            marginTop: theme.spacing(0),
          },
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {getCustomTable()}
        <CustomLoader isLoading={isLoading} />
      </Grid>
    </Box>
  );
};

export default React.memo(Routes);
