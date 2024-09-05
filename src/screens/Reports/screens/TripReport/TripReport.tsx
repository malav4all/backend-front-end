import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import CustomLoader from "../../../../global/components/CustomLoader/CustomLoader";
import {
  CustomDialog,
  CustomInput,
  CustomTable,
  CustomButton,
  CustomPaper,
} from "../../../../global/components";
import strings from "../../../../global/constants/StringConstants";
import { debounceEventHandler } from "../../../../helpers/methods";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";
import routesReportStyles from "./TripReport.styles";
import HereMap from "../../../TripDashboard/components/HereMap";
import CustomDatePicker from "../../../../global/components/CustomDatePicker/CustomDatePicker";
import { MdFileDownload } from "react-icons/md";
import { store } from "../../../../utils/store";
import { fetchTrips } from "../../../Trip/ActiveTrips/TripServices";

import {
  disabledBackgroundColor,
  primaryHeaderColor,
} from "../../../../utils/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import history from "../../../../utils/history";
interface CustomDateRange {
  fromDate: string;
  toDate: string;
}
const tripTableHeader = [
  { name: "Trip Id", field: "tripId" },
  {
    name: "Account Name",
    field: "accountName",
  },
  {
    name: "IMEI Number",
    field: "imeiNumber",
  },
  {
    name: "Vehicle Number",
    field: "vehicleNumber",
  },

  {
    name: "Source",
    field: "source",
  },
  {
    name: "Destination",
    field: "destination",
  },
  {
    name: "Driver Name",
    field: "driverName",
  },
  {
    name: "Driver Number",
    field: "driverContactNumber",
  },

  { name: "Trip Start Date", field: "tripStartDate" },
  { name: "Trip End Date", field: "tripEndDate" },
  { name: "Created By", field: "createdBy" },
  { name: "Action", field: "action" },
];
const TripReport = () => {
  const theme = useTheme();
  const initialState: any = {
    fromDate: moment().clone().subtract(1, "hour").toISOString(),
    toDate: moment().toISOString(),
  };
  const classes = routesReportStyles;
  const [isLoading, setIsLoading] = useState<any>(false);
  const [count, setCount] = useState<number>(0);
  const [routesTableData, setRoutesTableData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [dateFilter, setDateFilter] = useState({
    startDate: moment().clone().subtract(30, "minutes").toISOString(),
    endDate: moment().toISOString(),
  });
  const [selectedRange, setSelectedRange] = useState("Past 30m");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<any[]>([]);
  const [tripTableData, setTripTableData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dateRange, setDateRange] = useState<CustomDateRange>(initialState);
  const [showButtons, setShowButtons] = useState(false);
  const [lastSelectedRange, setLastSelectedRange] = useState({
    startDate: moment().clone().subtract(1, "hour").toISOString(),
    endDate: moment().toISOString(),
  });

  useEffect(() => {
    getTripData();
  }, [page, rowsPerPage]);

  const handleDownloadClick = () => {
    setShowButtons(!showButtons);
  };

  const handleCloseModel = () => {
    setOpenModal(false);
  };

  const datePickerChanged = () => {
    setDateFilter({
      startDate: dateRange.fromDate,
      endDate: dateRange.toDate,
    });

    handleCloseModel();
  };

  const CustomChange = () => {
    setOpenModal(true);
    setDateRange({
      fromDate: lastSelectedRange.startDate,
      toDate: lastSelectedRange.endDate,
    });
  };

  const getTripData = async () => {
    try {
      setIsLoading(true);
      const res = await fetchTrips({
        input: {
          page,
          limit: rowsPerPage,
          accountId: store.getState().auth.tenantId,
          status: "closed",
        },
      });

      const mappedData = mapTripDataToTableRows(res?.tripList?.data || []);
      setTripTableData(mappedData);
      setCount(res?.tripList?.paginatorInfo?.count || 0);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching trip data:", error);
      setIsLoading(false);
    }
  };

  const mapTripDataToTableRows = (tripData: any) => {
    return tripData.map((trip: any) => ({
      imeiNumber: trip.tripData[0]?.imei?.join(", ") || "N/A",
      tripId: trip.tripId || "N/A",
      accountName: trip?.primaryAccount,
      source: trip?.startPoint?.name,
      destination: trip?.endPoint?.name,
      driverName: trip?.tripData[0]?.driverName,
      driverContactNumber: trip?.tripData[0]?.driverContactNumber,
      vehicleNumber: trip?.tripData[0]?.vehicleNo,
      tripStartDate:
        moment(trip?.tripStartDate).utc().format("MM/DD/YYYY, h:mm:ss a") ||
        "N/A",
      tripEndDate:
        moment(trip?.tripEndDate).utc().format("MM/DD/YYYY, h:mm:ss a") ||
        "N/A",
      createdBy: trip.createdBy || "N/A",
      action: (
        <Box
          sx={{
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <Tooltip
            title={
              <CustomPaper
                className={{ backgroundColor: disabledBackgroundColor }}
              >
                <Typography>{"View Trackplay"}</Typography>
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
              style={{ color: primaryHeaderColor, cursor: "pointer" }}
              onClick={() => {
                history.push({
                  pathname: "/tripAlertReport",
                  state: {
                    imei: trip.tripData[0]?.imei[0],
                    startDate: trip?.tripStartDate,
                    endDate: trip?.tripEndDate,
                  },
                });
              }}
            />
          </Tooltip>
          <Tooltip
            title={
              <CustomPaper
                className={{ backgroundColor: disabledBackgroundColor }}
              >
                <Typography>{"View Alert Report"}</Typography>
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
              style={{ color: primaryHeaderColor, cursor: "pointer" }}
              onClick={() => {
                history.push({
                  pathname: "/triptrackplay",
                  state: {
                    imei: trip.tripData[0]?.imei[0],
                    startDate: trip?.tripStartDate,
                    endDate: trip?.tripEndDate,
                  },
                });
              }}
            />
          </Tooltip>
        </Box>
      ),
    }));
  };

  const handleDaterangeChange = (value: string, date: string) => {
    const formattedDate =
      value && value != "Invalid Date" ? moment(value).toISOString() : null;
    setDateRange({
      ...dateRange,
      [date]: formattedDate,
    });
  };

  const handleChange = (event: any) => {
    setSelectedRange(event.target.value);
    const now = moment();
    let startDate, endDate;
    switch (event.target.value) {
      case "Past 1m":
        startDate = now.clone().subtract(1, "minutes").toISOString();
        endDate = now.toISOString();
        break;
      case "Past 5m":
        startDate = now.clone().subtract(5, "minutes").toISOString();
        endDate = now.toISOString();
        break;
      case "Past 15m":
        startDate = now.clone().subtract(15, "minutes").toISOString();
        endDate = now.toISOString();
        break;
      case "Past 30m":
        startDate = now.clone().subtract(30, "minutes").toISOString();
        endDate = now.toISOString();
        break;
      case "Past 1h":
        startDate = now.clone().subtract(1, "hour").toISOString();
        endDate = now.toISOString();
        break;
      case "Past 3h":
        startDate = now.clone().subtract(3, "hours").toISOString();
        endDate = now.toISOString();
        break;
      case "Past 6h":
        startDate = now.clone().subtract(6, "hours").toISOString();
        endDate = now.toISOString();
        break;
      case "Past 12h":
        startDate = now.clone().subtract(12, "hours").toISOString();
        endDate = now.toISOString();
        break;
      case "Past 24h":
        startDate = now.clone().subtract(24, "hours").toISOString();
        endDate = now.toISOString();
        break;
      case "Past 2d":
        startDate = now.clone().subtract(2, "days").toISOString();
        endDate = now.toISOString();
        break;
      case "Past 30d":
        startDate = now.clone().subtract(30, "days").toISOString();
        endDate = now.toISOString();
        break;
      default:
        startDate = now.clone().subtract(30, "minutes").toISOString();
        endDate = now.toISOString();
        break;
    }

    setDateFilter({
      startDate: startDate,
      endDate: endDate,
    });
  };

  const handlePerPageData = (event: any) => {
    setPage(1);
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const DialogFooter = () => {
    return (
      <>
        <Box mt={3} width={"100%"} mb={3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
              alignSelf: "center",
            }}
            gap={3}
          >
            <CustomButton
              label="Cancel"
              onClick={() => handleCloseModel()}
              customClasses={{ width: "110px" }}
            />
            <CustomButton
              label={"Submit"}
              onClick={() => {
                datePickerChanged();
              }}
              customClasses={{ width: "110px" }}
            />
          </Box>
        </Box>
      </>
    );
  };

  const handleSearchOnChange = (searchEvent: ChangeEvent<HTMLInputElement>) => {
    const value = searchEvent?.target?.value.toLowerCase().trim();
    if (value) {
      setIsLoading(true);
      const searchedReports = routesTableData?.filter(
        (data: any) =>
          data?.routesName?.toLowerCase()?.includes(value) ||
          data?.createdBy?.toLowerCase()?.includes(value) ||
          data?.startDate?.toLowerCase()?.includes(value) ||
          data?.endDate?.toLowerCase()?.includes(value) ||
          data!?.totalDistance!?.toLowerCase()?.includes(value) ||
          data?.totalDuration?.toLowerCase()?.includes(value)
      );
      setFilterData(searchedReports);
      setIsSearching(true);
      setIsLoading(false);
    } else {
      setFilterData([...routesTableData]);
      setIsSearching(false);
    }
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search Report"
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

  const getDashboardHeader = () => {
    return (
      <Grid
        container
        sx={{
          ...classes.header,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Grid item xs={12} md={5} lg={6} xl={6}>
          <Typography
            variant="h5"
            sx={{ ...classes.heading, color: theme.palette.text.primary }}
          >
            Trip Reports
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={7}
          lg={6}
          xl={6}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="h5" sx={classes.heading}>
            {getSearchBar()}
          </Typography>
          <Select
            id="campaigns_interval_dropdown"
            sx={{
              ...classes.dropDownStyle,
              backgroundColor: theme.palette.background.paper,
            }}
            value={selectedRange}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            renderValue={() => selectedRange}
          >
            <MenuItem value="Past 1h" sx={classes.optionStyle}>
              Past 1h
            </MenuItem>
            <MenuItem value="Past 3h" sx={classes.optionStyle}>
              Past 3h
            </MenuItem>
            <MenuItem value="Past 12h" sx={classes.optionStyle}>
              Past 12h
            </MenuItem>
            <MenuItem value="Past 2d" sx={classes.optionStyle}>
              Past 2d
            </MenuItem>
            <MenuItem value="Past 30d" sx={classes.optionStyle}>
              Past 30d
            </MenuItem>
            <MenuItem
              value="Custom"
              onClick={CustomChange}
              sx={classes.optionStyle}
            >
              Custom
            </MenuItem>
          </Select>
        </Grid>
      </Grid>
    );
  };

  const getDashboardBody = () => {
    return (
      <Grid container spacing={2} sx={{ padding: "1rem" }}>
        <Grid item xs={12} sm={12} md={12} lg={4}></Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} mt={-8}>
          <Box
            sx={{
              padding: "2rem 1.5rem",
              backgroundColor: theme.palette.background.paper,
              border: "1px solid",
              borderColor: theme.palette.divider,
              borderRadius: "8px",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Geist_Light",
                fontSize: "1.5rem",
                marginBottom: "0.5rem",
                padding: "0.2rem 0.8rem",
                borderRadius: "5px",
                borderLeft: "7px solid #5F22E1",
              }}
            >
              Trip Map View
            </Typography>
            {getMap()}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box
            sx={{
              padding: "2rem 1.5rem",
              backgroundColor: theme.palette.background.paper,
              border: "1px solid",
              borderColor: theme.palette.divider,
              borderRadius: "8px",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            }}
          >
            {/* <Typography
              variant="h5"
              sx={{
                fontFamily: "Geist_Light",
                fontSize: "1.5rem",
                marginBottom: "0.5rem",
                padding: "0.2rem 0.8rem",
                borderRadius: "5px",
                borderLeft: "7px solid #5F22E1",
              }}
            >
              Trip Records
            </Typography> */}
            <Box display={"flex"} gap={2} mt={5}>
              <CustomButton label={"Trip Details"} onClick={() => {}} />
              <CustomButton label={"Alert Details"} onClick={() => {}} />
            </Box>
            <Box>
              <Box
                display={"flex"}
                justifyContent={"end"}
                alignItems={"end"}
                gap={2}
              >
                {showButtons ? (
                  <Button
                    sx={{
                      fontSize: "1rem",
                      width: "1rem",
                      height: "2.5rem",
                      color: "white",
                      marginTop: "-1rem",
                      backgroundColor: "#F75151",
                      "&:hover": {
                        backgroundColor: "#fd3030",
                      },
                    }}
                    type="button"
                    onClick={handleDownloadClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                      style={{ width: "35px", height: "30px" }}
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                ) : (
                  <CustomButton
                    label={"Download"}
                    onClick={handleDownloadClick}
                    startIcon={<MdFileDownload />}
                  />
                )}

                {showButtons && (
                  <Box display={"flex"} justifyContent={"end"} gap={2} mt={2}>
                    <CustomButton label={"GeoJSON"} onClick={() => {}} />
                    <CustomButton label={"YML"} onClick={() => {}} />
                    <CustomButton label={"Download PDF"} onClick={() => {}} />
                  </Box>
                )}
              </Box>

              <Box sx={{ padding: "1rem" }}>
                {/* <Typography variant="h5">Trip Reports</Typography> */}
                <CustomTable
                  headers={tripTableHeader}
                  rows={tripTableData}
                  paginationCount={count}
                  rowsPerPage={rowsPerPage}
                  pageNumber={page}
                  perPageData={rowsPerPage}
                  isRowPerPageEnable={true}
                  setPage={setPage}
                  handlePageChange={handleChangePage}
                  handlePerPageData={handlePerPageData}
                />
                <CustomLoader isLoading={isLoading} />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
  };

  const getMap = () => {
    return (
      <Box sx={{ position: "relative", height: "400px" }}>
        <HereMap />
      </Box>
    );
  };

  const customDialog = () => {
    return (
      <CustomDialog
        isDialogOpen={openModal}
        handleDialogClose={handleCloseModel}
        dialogBodyContent={customDate()}
        dialogFooterContent={DialogFooter()}
        width="550px"
        closable={true}
        // closeIcon={true}
        closeButtonVisibility
        // cancelIcon={true}
        borderRadius="5px"
      />
    );
  };

  const customDate = () => {
    return (
      <>
        <Box
          mt={5}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box>
            <CustomDatePicker
              handleDaterangeChange={handleDaterangeChange}
              dateRange={dateRange}
              customWidth={{
                xl: "480px",
                lg: "480px",
                md: "320px",
                sm: "260px",
                xs: "260px",
              }}
              toDate="toDate"
              fromDate="fromDate"
              labelFirst="From Date"
              labelSecond="To Date"
              labelWidth={{
                xl: "250px",
                lg: "250px",
                md: "160px",
                sm: "130px",
                xs: "130px",
              }}
              placeholderstart="Select From Date"
              placeholderend="Select To Date"
            />
          </Box>
        </Box>
      </>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        paddingTop: "3.5rem",
      }}
    >
      {getDashboardHeader()}
      {getDashboardBody()}
      {customDialog()}
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default TripReport;
