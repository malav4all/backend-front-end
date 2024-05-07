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
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import journeyStyles from "./Journey.styles";
import {
  getRelativeFontSize,
  primaryHeadingColor,
  boldFont,
  disabledBackgroundColor,
  chipBackgroundColor,
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
import {
  createJourney,
  fetchJourney,
  searchJourneys,
} from "./service/journey.service";
import { store } from "../../utils/store";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import history from "../../utils/history";
import { journeyTableHeader, validateJourneyForm } from "./Journey.helper";
import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import strings from "../../global/constants/StringConstants";
import { RiCloseCircleFill } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";

const Journey = () => {
  const classes = journeyStyles;
  const [page, setPage] = useState<number>(1);
  const [formField, setFormField] = useState<any>({
    journeyName: {
      value: "",
      error: "",
    },
    startDate: {
      value: "",
      error: "",
    },
    endDate: {
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
  const [journeyTableData, setJourneyTableData] = useState([]);
  const [finalLocationIds, setFinalLocationIds] = useState<string[]>([]);
  const [counter, setCounter] = useState(66);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [searchJourney, setSearchJourney] = useState<string>("");
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
    fetchJourneyHandler();
  }, []);

  useEffect(() => {
    if (searchJourney) {
      getSearchData();
    } else {
      fetchGeozone();
      fetchJourneyHandler();
    }
  }, [searchJourney, page, rowsPerPage, searchPageNumber]);

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
    const { isValid, errors } = validateJourneyForm(formField);
    setFormField({ ...errors });
    return isValid;
  };

  const addJourneyHandler = async () => {
    try {
      if (handleValidation()) {
        setIsLoading(true);
        const { totalDistance, totalDuration } = await calculateDistance();
        const res = await createJourney({
          input: {
            journeyName: formField.journeyName?.value,
            startDate: formField.startDate?.value,
            endDate: formField.endDate?.value,
            journeyData: finalLocationIds,
            createdBy: store.getState()?.auth?.userName,
            totalDistance: Number(totalDistance),
            totalDuration: Number(totalDuration),
          },
        });
        openSuccessNotification(res.addJourney.message);
        setFormField({
          journeyName: {
            value: "",
            error: "",
          },
          startDate: {
            value: "",
            error: "",
          },
          endDate: {
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
        await fetchJourneyHandler();
        setIsLoading(false);
      }
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
      const coordinates = item?.journeyData?.map((coor: any) => {
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
        journeyName: item?.journeyName,
        startDate: moment(item.startDate).format("DD-MMM-YYYY hh:mm A"),
        endDate: moment(item.endDate).format("DD-MMM-YYYY hh:mm A"),
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
              <VisibilityIcon
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
                    {"View Journey"}
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
                onClick={() => {
                  history.push({
                    pathname: "/view-journey",
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

  const fetchJourneyHandler = async () => {
    try {
      setIsLoading(true);
      const res = await fetchJourney({
        input: {
          page,
          limit: 10,
        },
      });
      const data = tableRender(res.fetchJourney.data);
      setJourneyTableData(data);
      setCount(res.fetchJourney.paginatorInfo.count);
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
        <Typography sx={classes.mainCardHeading}>Active Journey</Typography>
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
      const res = await searchJourneys({
        input: {
          search: searchJourney,
          page: 1,
          limit: 10,
        },
      });
      const data = tableRender(res.searchJourneys.data);
      setJourneyTableData(data);
      setCount(res?.searchJourneys?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      setSearchJourney(SearchEvent.target.value.trim());
      setPage(1);
      setRowsPerPage(10);
    } else {
      setSearchJourney("");
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
          headers={journeyTableHeader}
          rows={journeyTableData}
          size={[5]}
          handlePageChange={
            searchJourney ? handleSearchChangePage : handleChangePage
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
    const arr = [];

    arr.push(...locationData, {
      name,
      field,
      type: "",
      fieldMapping: "",
      required: true,
      error: "",
    });

    setLocationData(arr);
    setCounter(counter + 1);
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search Journey..."
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
        <Grid container spacing={4} direction="column">
          <Grid item sx={{ display: "flex", gap: "1rem" }}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <CustomInput
                label="Journey Name"
                placeHolder="Enter Journey name"
                value={formField?.journeyName?.value}
                required
                name="journeyName"
                onChange={handleOnChange}
                error={formField?.journeyName?.error}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <CustomInput
                label="Start Date"
                type="datetime-local"
                id="scheduleTime"
                name="startDate"
                required
                propsToInputElement={{
                  min: moment().format("YYYY-MM-DDTkk:mm"),
                }}
                value={formField?.startDate?.value}
                onChange={handleOnChange}
                error={
                  (!isTruthy(formField?.startDate?.value) ||
                    formField?.startDate?.value.length >= 50) &&
                  formField?.startDate?.error
                }
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <CustomInput
                label="End Date"
                type="datetime-local"
                id="scheduleTime"
                name="endDate"
                required
                propsToInputElement={{
                  min: formField?.startDate?.value
                    ? moment(formField.startDate.value)
                        .add(1, "minutes")
                        .format("YYYY-MM-DDTHH:mm")
                    : moment().format("YYYY-MM-DDTHH:mm"),
                }}
                value={formField?.endDate?.value}
                onChange={handleOnChange}
                error={
                  (!isTruthy(formField?.endDate?.value) ||
                    formField?.endDate?.value.length >= 50 ||
                    (formField?.startDate?.value &&
                      formField?.endDate?.value <=
                        formField?.startDate?.value)) &&
                  formField?.endDate?.error
                }
              />
            </Grid>
          </Grid>

          <Stack
            sx={{
              display: "flex",
              height: "250px",
              overflowY: "scroll",
              padding: "0.5rem",
              marginTop: "2rem",
            }}
          >
            <Grid item xs={12} sm={3} md={3} lg={3} xl={3} ml={4}>
              <Box>
                <InputLabel sx={classes.inputLabel} shrink>
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
                          !isTruthy(formField.startLocation.value) &&
                          formField.startLocation.error
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
              <Box sx={{ display: "flex", alignItems: "center" }}>
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
                  <Box>
                    <InputLabel sx={classes.inputLabel} shrink>
                      {item.name.slice(0, -1) + " " + (index + 1)}
                      <Box ml={0.4} sx={classes.star}>
                        *
                      </Box>
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
                    style={{ marginTop: "50px" }}
                    onClick={() =>
                      setLocationData(
                        locationData.filter((_: any, i: any) => i !== index)
                      )
                    }
                  />
                </Grid>
              </Box>
            ))}

            <Grid item xs={12} sm={3} md={3} lg={3} xl={3} ml={4} mt={2}>
              <Box>
                <InputLabel sx={classes.inputLabel} shrink>
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
                          !isTruthy(formField.startLocation.value) &&
                          formField.startLocation.error
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
          </Stack>
        </Grid>
      </>
    );
  };

  return (
    <>
      <CustomAppHeader
        className={{
          backgroundColor: "#f1edff",
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
              color: primaryHeadingColor,
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
        sx={{ display: "flex", justifyContent: "flex-end", flexWrap: "wrap" }}
        mt={2}
        mr={2}
      >
        {!isHideForm ? (
          <CustomButton
            id="users_add_button"
            label={"Create Journey"}
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
            backgroundColor: "white",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            marginBottom: "2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexWrap: "wrap",
              padding: "1rem 1rem",
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
              onClick={addJourneyHandler}
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
        sx={classes.mainSection}
      >
        {getCustomTable()}
        <CustomLoader isLoading={isLoading} />
      </Grid>
    </>
  );
};

export default React.memo(Journey);
