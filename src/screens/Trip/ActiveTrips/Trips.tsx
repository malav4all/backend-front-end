import {
  Box,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import tripStyles from "./Trips.styles";
import { useHistory } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import {
  CustomAppHeader,
  CustomButton,
  CustomInput,
  CustomTable,
} from "../../../global/components";
import {
  boldFont,
  BootstrapInput,
  getRelativeFontSize,
  headerColor,
  primaryHeadingColor,
} from "../../../utils/styles";
import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
} from "../../../helpers/methods";
import strings from "../../../global/constants/StringConstants";
import SearchIcon from "@mui/icons-material/Search";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import { tripTableHeader } from "./AddTrips/AddTripFormValidation";
import { fetchTrips, searchTrip } from "./TripServices";
import notifiers from "../../../global/constants/NotificationConstants";
import { PiPencilSimpleBold } from "react-icons/pi";
import urls from "../../../global/constants/UrlConstants";
import CustomTabs from "../../../global/components/CustomTabs/CustomTabs";
import { store } from "../../../utils/store";

const Trips = () => {
  const theme = useTheme();
  const classes = tripStyles;
  const history = useHistory();
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
  const [searchTrips, setSearchTrips] = useState<any>("");
  const [tripData, setTripData] = useState<any>([]);
  const [tabValue, setTabValue] = useState(strings.Created); // Initial tab state

  // New states for counts
  const [createdCount, setCreatedCount] = useState<number | null>(null);
  const [startedCount, setStartedCount] = useState<number | null>(null);
  const [endedCount, setEndedCount] = useState<number | null>(null);
  const [closedCount, setClosedCount] = useState<number | null>(null);

  const tabs = [
    {
      label: strings.Created,
      count: createdCount,
    },
    {
      label: strings.Started,
      count: startedCount,
    },
    {
      label: strings.Ended,
      count: endedCount,
    },
    {
      label: strings.Closed,
      count: closedCount,
    },
  ];

  useEffect(() => {
    if (searchTrips) {
      getSearchData(tabValue, searchTrips);
    } else {
      getTripData(tabValue, page);
    }
  }, [searchTrips, page, rowsPerPage, tabValue]);

  const getSearchData = async (tab: string, search: string) => {
    try {
      setIsLoading(true);
      const res = await searchTrip({
        input: {
          search,
          page: 1,
          limit: 10,
          status: tab.toLowerCase(), // Assume API expects status as lowercase string
        },
      });
      tableRender(res?.searchTrip?.data);
      setCount(res?.searchTrip?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const handleChange = (newValue: string) => {
    setTabValue(newValue);
    setPage(1);
    setRowsPerPage(10);
    setSearchTrips("");
  };

  const handleSearchChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setSearchPageNumber(newPage);
  };
  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      setSearchTrips(SearchEvent.target.value.trim());
      setPage(1);
      setRowsPerPage(10);
    } else {
      setSearchTrips("");
    }
  };

  const getTripData = async (tab: string, page: number) => {
    try {
      setIsLoading(true);
      const res = await fetchTrips({
        input: {
          page,
          limit: rowsPerPage,
          accountId: store.getState().auth.tenantId,
          status: tab.toLowerCase(), // Assume API expects status as lowercase string
        },
      });
      tableRender(res?.tripList?.data);
      setCount(res?.tripList?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
      setIsLoading(false);
    }
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search Trips"
        id="trip_search_field"
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

  const getRedirectionUrl = (id: string) => {
    history.push(`${urls.viewTripViewPath}/${id}`);
  };

  const tableRender = (tableData: any) => {
    const data = tableData?.map((item: any, index: number) => {
      return {
        key: item.key,
        imeiNumber: item?.tripData[0].imei,
        totalDistance: item.route.totalDistance,
        totalDuration: item.route.totalDuration,
        tripStartDate: item.tripStartDate,
        tripEndDate: item.tripEndDate,
        createdBy: item.createdBy,
        tripId: (
          <Box
            sx={{ fontWeight: "bold", cursor: "pointer" }}
            onClick={() => getRedirectionUrl(item?.tripId)}
          >
            {item?.tripId}
          </Box>
        ),
        action: (
          <Tooltip
            title="Edit"
            onClick={() => {
              // editTrip(item);
            }}
            sx={{
              color: theme.palette.text.primary,
            }}
          >
            <PiPencilSimpleBold
              style={{
                margin: "0px 8px -7px 0px",
                cursor: "pointer",
                color: headerColor,
                fontSize: "17px",
              }}
            />
          </Tooltip>
        ),
      };
    });
    setTripData([...data]);
  };

  const handleAdd = () => {
    history.push({
      pathname: urls.addTripViewPath,
    });
  };
  const getHeader = () => {
    return (
      <Box>
        <Typography sx={{ ...classes.mainCardHeading, color: "white" }}>
          Manage Trips
        </Typography>
      </Box>
    );
  };

  const handlePerPageData = (event: any) => {
    setPage(1);
    setSearchPageNumber(1);
    setRowsPerPage(event?.target?.value);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const getTripPage = () => {
    return (
      <Box sx={classes.headerBox}>
        <Box sx={classes.mainBox}>
          <Typography variant="h4" sx={classes.tripText}>
            Manage Trips
          </Typography>
          <Stack
            sx={classes.outerTabBox}
            direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
            justifyContent={{
              lg: "space-between",
              md: "space-between",
              sm: "space-between",
              xs: "flex-start",
            }}
            alignItems={{ lg: "center", sm: "center" }}
          >
            <CustomTabs
              changeValue={handleChange}
              selected={tabValue}
              tabConfig={tabs}
            />
            <Stack direction="row" spacing={1} sx={classes.inputWrapper}>
              <Box>{getSearchBar()}</Box>
              <Stack direction="row" justifyContent="center">
                <CustomButton
                  label={"Add Trip"}
                  onClick={handleAdd}
                  buttonType="primaryBtn"
                  // customClasses={{
                  //   width: "150px",
                  //   backgroud: "#ffffff",
                  // }}
                />
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Box px={2} sx={classes.tableWrapper}>
          {isLoading ? (
            <CustomLoader />
          ) : (
            <CustomTable
              headers={tripTableHeader}
              rows={tripData}
              size={[5]}
              handlePageChange={handleChangePage}
              handleRowsPerPage={handlePerPageData}
              paginationCount={count}
              pageNumber={page}
              setPage={setPage}
              handlePerPageData={handlePerPageData}
              perPageData={rowsPerPage}
              rowsPerPage={rowsPerPage}
            />
          )}
        </Box>
      </Box>
    );
  };

  return getTripPage();
};

export default Trips;
