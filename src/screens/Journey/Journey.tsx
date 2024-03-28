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
  Typography,
} from "@mui/material";
import journeyStyles from "./Journey.styles";
import {
  getRelativeFontSize,
  primaryHeadingColor,
  boldFont,
} from "../../utils/styles";
import SearchIcon from "@mui/icons-material/Search";
import { fetchGeozoneHandler } from "../Geozone/service/geozone.service";
import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../helpers/methods";
import {
  createJourney,
  fetchJourney,
  searchJourneys,
} from "./service/journey.service";
import { store } from "../../utils/store";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getDistance } from "geolib";
import history from "../../utils/history";
import { journeyTableHeader, validateJourneyForm } from "./Journey.helper";
import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import strings from "../../global/constants/StringConstants";

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
  });
  const [coordinatesArray, setCoordinatesArray] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [tableData, setTableData] = useState([]);
  const [journeyTableData, setJourneyTableData] = useState([]);
  const [finalLocationIds, setFinalLocationIds] = useState<string[]>([]);
  const [counter, setCounter] = useState(66);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [searchJourney, setSearchJourney] = useState<string>("");
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
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
    setFormField({
      ...formField,
      [event.target.name]: {
        ...formField[event?.target?.name],
        value: event?.target?.value,
        error: "",
      },
    });
  };

  const handleAutocompleteChange = (newValue: any) => {
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
    }
  };

  const calculateDistance = async () => {
    const routeRequestParams = {
      routingMode: "fast",
      transportMode: "car",
      origin: `${coordinatesArray[0].latitude},${coordinatesArray[0].longitude}`,
      destination: `${coordinatesArray[coordinatesArray.length - 1].latitude},${
        coordinatesArray[coordinatesArray.length - 1].longitude
      }`,
      return: "travelSummary",
    };
    const url = `https://router.hereapi.com/v8/routes?routingMode=${
      routeRequestParams.routingMode
    }&transportMode=${routeRequestParams.transportMode}&origin=${
      routeRequestParams.origin
    }&destination=${routeRequestParams.destination}&return=${
      routeRequestParams.return
    }&apiKey=${"7snf2Sz_ORd8AClElg9h43HXV8YPI1pbVHyz2QvPsZI"}`;
    const res = await fetch(url);
    const data = await res.json();
    const route = data.routes[0];
    const section = route.sections[0];
    const totalDistance = section.travelSummary.length / 1000;
    const totalDuration = section.travelSummary.duration / 3600;
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
      }
    } catch (error: any) {
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
    const data = tableData.map((item: any, index: number) => {
      const coordinates = item.journeyData.map(
        (coor: any) => coor?.geoCodeData?.geometry?.coordinates
      );

      return {
        journeyName: item?.journeyName,
        startDate: moment(item.startDate).format("DD-MMM-YYYY hh:mm A"),
        endDate: moment(item.endDate).format("DD-MMM-YYYY hh:mm A"),
        journeyData: (
          <>
            <VisibilityIcon
              onClick={() => {
                history.push({
                  pathname: "/view-journey",
                  state: {
                    coordinates: coordinates.flat(),
                  },
                });
              }}
            />
          </>
        ),
        createdBy: item?.createdBy,
        totalDistance: formatDistance(item?.totalDistance),
        totalDuration: formatDuration(item?.totalDuration),
        action: (
          <>
            <VisibilityIcon
              onClick={() => {
                history.push({
                  pathname: "/live-tracking",
                });
              }}
            />
          </>
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
        <Typography sx={classes.mainCardHeading}>Journey</Typography>
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
      setSearchJourney(SearchEvent.target.value.replace(/\s/g, ""));
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
          pageNumber={searchJourney ? searchPageNumber : page}
          setPage={searchJourney ? setSearchPageNumber : setPage}
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
    setCounter(counter + 1); // Increment the counter for the next iteration
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search asset..."
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
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
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
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
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
                  tableData?.map((item: any) => ({
                    label: `${item.name} - ${item.description}`,
                    value: item,
                  })) || []
                }
                onChange={(event, newValue) =>
                  handleAutocompleteChange(newValue)
                }
                renderInput={(params) => (
                  <TextField
                    sx={classes.select}
                    {...params}
                    name="startLocation"
                    placeholder="Search Start location here....."
                    onSelect={() => {}}
                  />
                )}
              />
            </Box>
          </Grid>
          {locationData?.map((item: any, index: number) => (
            <Grid item xs={12} sm={3} md={3} lg={3} xl={3} key={index}>
              <Box>
                <InputLabel sx={classes.inputLabel} shrink>
                  {item.name}
                  <Box ml={0.4} sx={classes.star}>
                    *
                  </Box>
                </InputLabel>
                <Autocomplete
                  sx={classes.emailDropDownStyle}
                  id="update_user_manager_field"
                  options={
                    tableData?.map((item: any) => ({
                      label: `${item.name} - ${item.description}`,
                      value: item,
                    })) || []
                  }
                  onChange={(event, newValue) =>
                    handleAutocompleteChange(newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      sx={classes.select}
                      {...params}
                      name="assignBy"
                      placeholder="Search location here....."
                      onSelect={() => {}}
                    />
                  )}
                />
              </Box>
            </Grid>
          ))}
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
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
                  tableData?.map((item: any) => ({
                    label: `${item.name} - ${item.description}`,
                    value: item,
                  })) || []
                }
                onChange={(event, newValue) =>
                  handleAutocompleteChange(newValue)
                }
                renderInput={(params) => (
                  <TextField
                    sx={classes.select}
                    {...params}
                    name="startLocation"
                    placeholder="Search End location here....."
                    onSelect={() => {}}
                  />
                )}
              />
            </Box>
          </Grid>
          {/* start data */}
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
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
                !isTruthy(formField?.startDate?.value) &&
                formField?.startDate?.error
              }
            />
          </Grid>
          {/* end date */}
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <CustomInput
              label="End Date"
              type="datetime-local"
              id="scheduleTime"
              name="endDate"
              required
              propsToInputElement={{
                min: moment().format("YYYY-MM-DDTkk:mm"),
              }}
              value={formField?.endDate?.value}
              onChange={handleOnChange}
              error={
                !isTruthy(formField?.endDate?.value) &&
                formField?.endDate?.error
              }
            />
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <>
      <CustomAppHeader
        className={{
          backgroundColor: "#ECF9FF",
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
        <CustomButton
          id="users_add_button"
          label={"Add"}
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
