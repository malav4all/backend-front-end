import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";
import alertReportStyles from "./TripAlertReport.styles";
import { alertRowData } from "./service/TripAlertReport.service";

import SearchIcon from "@mui/icons-material/Search";

import {
  CustomButton,
  CustomInput,
  CustomTable,
} from "../../global/components";
import CustomDialog from "../../global/components/CustomModal/CustomModal";
import {
  debounceEventHandler,
  openErrorNotification,
} from "../../helpers/methods";
import strings from "../../global/constants/StringConstants";
import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import { store } from "../../utils/store";
import CustomDatePicker from "../../global/components/CustomDatePicker/CustomDatePicker";

interface CustomDateRange {
  fromDate: string;
  toDate: string;
  location?: any;
}

const TripAlertReport = (props: CustomDateRange) => {
  const theme = useTheme();
  const redirectionState = props.location.state;

  console.log({ redirectionState });
  const initialState: any = {
    fromDate: moment().clone().subtract(1, "hour").toISOString(),
    toDate: moment().toISOString(),
  };
  const classes = alertReportStyles;
  const [alertTableData, setAlertTableData] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    startDate: moment().clone().subtract(30, "minutes").toISOString(),
    endDate: moment().toISOString(),
  });
  const [filterData, setFilterData] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState("Past 1h");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [lastSelectedRange, setLastSelectedRange] = useState({
    startDate: moment().clone().subtract(1, "hour").toISOString(),
    endDate: moment().toISOString(),
  });
  const [dateRange, setDateRange] = useState<CustomDateRange>(initialState);

  useEffect(() => {
    const fetchData = async () => {
      if (dateFilter) {
        try {
          const res = await alertRowData({
            input: {
              accountId: store.getState().auth.tenantId,
              startDate: redirectionState.startDate,
              endDate: redirectionState.endDate,
              imei: redirectionState?.imei,
              page,
              limit,
            },
          });

          const alertTableDataValue = res?.getTripAlertData?.rowData?.map(
            (item: any) => {
              return {
                accountId: item.accountId,
                imei: item.imei,
                event: item.event,
                message: item.alertMessage,
                latitude: item.latitude,
                longitude: item.longitude,
                time: moment(item.time).fromNow(),
              };
            }
          );
          setAlertTableData(alertTableDataValue);
          setCount(res?.getTripAlertData.totalCount);
        } catch (error: any) {
          openErrorNotification(error.message);
        }
      }
    };

    fetchData();
  }, [dateFilter, page, limit]);

  const handleChange = (event: any) => {
    setSelectedRange(event.target.value);
    const now = moment();
    let startDate, endDate;
    switch (event.target.value) {
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

    if (event.target.value !== "Custom") {
      setLastSelectedRange({ startDate, endDate });
    }

    console.log({ startDate });
    console.log({ endDate });

    setDateFilter({
      startDate: startDate,
      endDate: endDate,
    });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const getReportHeader = () => {
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
            sx={{
              ...classes.heading,
              color: theme.palette.text.primary,
            }}
          >
            Alerts Reports
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
            paddingRight: "17px",
          }}
        >
          <Typography variant="h5" sx={classes.heading}>
            {getSearchBar()}
          </Typography>
          {/* <Select
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
            <MenuItem value="Past 6h" sx={classes.optionStyle}>
              Past 6h
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
          </Select> */}
        </Grid>
      </Grid>
    );
  };

  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    const value = SearchEvent.target.value.toLocaleLowerCase();
    if (value) {
      setIsLoading(true);
      const searchedReports = alertTableData?.filter(
        (data: any) =>
          data?.imei?.toLowerCase()?.includes(value) ||
          data?.label?.toLowerCase()?.includes(value) ||
          data?.event?.toLowerCase()?.includes(value) ||
          data?.message?.toLowerCase()?.includes(value) ||
          data!?.mode!?.toLowerCase()?.includes(value) ||
          data?.source?.toLowerCase()?.includes(value) ||
          data!?.time!?.toLowerCase()?.includes(value)
      );
      setFilterData(searchedReports);
      setIsSearching(true);
      setIsLoading(false);
    } else {
      setFilterData([...alertTableData]);
      setIsSearching(false);
    }
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search Report"
        id="report_search_field"
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

  const getReportBody = () => {
    return (
      <Grid
        container
        spacing={2}
        sx={{ padding: "0 16px", marginTop: "-48px" }}
        xs={12}
      >
        <Grid item xs={12} sm={12} xl={12} md={12} lg={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              {getAlertsTable()}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const handlePerPageData = (event: any) => {
    setPage(1);
    setLimit(event.target.value);
  };

  const CustomChange = () => {
    setOpenModal(true);
    setDateRange({
      fromDate: lastSelectedRange.startDate,
      toDate: lastSelectedRange.endDate,
    });
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

  const addEmailsDialogFooter = () => {
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
              // variant={"outlined"}
            />
            <CustomButton
              label={"Submit"}
              onClick={() => {
                datePickerChanged();
              }}
              customClasses={{ width: "110px" }}
              // buttonType={"contained"}
            />
          </Box>
        </Box>
      </>
    );
  };

  const customDialog = () => {
    return (
      <CustomDialog
        isDialogOpen={openModal}
        handleDialogClose={handleCloseModel}
        dialogBodyContent={customDate()}
        dialogFooterContent={addEmailsDialogFooter()}
        width="550px"
        closable={true}
        // closeIcon={true}
        closeButtonVisibility
        // cancelIcon={true}
        borderRadius="5px"
      />
    );
  };

  const handleDaterangeChange = (value: string, date: string) => {
    const formattedDate =
      value && value != "Invalid Date" ? moment(value).toISOString() : null;
    setDateRange({
      ...dateRange,
      [date]: formattedDate,
    });
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

  const getAlertsTable = () => {
    return (
      <Box
        id="Alerts_panel"
        sx={{
          padding: "1.5rem 1.5rem",
          backgroundColor: theme.palette.background.paper,
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
          border: "1px solid",
          borderColor: theme.palette.divider,
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={classes.heading}>
            {/* Alerts Report */}
          </Typography>
        </Box>

        <Grid container>
          <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
            <CustomTable
              headers={[
                { name: "Account", field: "accountId" },
                { name: "IMEI", field: "imei" },
                { name: "Event", field: "event" },
                { name: "Message", field: "message" },
                { name: "Latitude", field: "latitude" },
                { name: "Longitude", field: "longitude" },
                { name: "Time", field: "time" },
              ]}
              rows={isSearching ? filterData : alertTableData}
              paginationCount={count}
              rowsPerPage={limit}
              pageNumber={page}
              perPageData={limit}
              isRowPerPageEnable={false}
              setPage={setPage}
              handlePageChange={handleChangePage}
              handlePerPageData={handlePerPageData}
            />
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        height: "100%",
        paddingTop: "3.5rem",
      }}
    >
      {getReportHeader()}
      {getReportBody()}
      {customDialog()}
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default TripAlertReport;
