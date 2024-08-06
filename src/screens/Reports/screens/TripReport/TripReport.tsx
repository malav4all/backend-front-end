import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import CustomLoader from "../../../../global/components/CustomLoader/CustomLoader";
import {
  CustomDialog,
  CustomInput,
  CustomTable,
  CustomButton,
} from "../../../../global/components";
import strings from "../../../../global/constants/StringConstants";
import { debounceEventHandler } from "../../../../helpers/methods";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useState } from "react";
import moment from "moment";
import routesReportStyles from "./TripReport.styles";
import HereMap from "../../../TripDashboard/components/HereMap";
import CustomDatePicker from "../../../../global/components/CustomDatePicker/CustomDatePicker";
import { MdFileDownload } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
interface CustomDateRange {
  fromDate: string;
  toDate: string;
}

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
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<any[]>([]);
  const [tripTableData, setTripTableData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [dateRange, setDateRange] = useState<CustomDateRange>(initialState);
  const [showButtons, setShowButtons] = useState(false);
  const [lastSelectedRange, setLastSelectedRange] = useState({
    startDate: moment().clone().subtract(1, "hour").toISOString(),
    endDate: moment().toISOString(),
  });

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
    setSearchPageNumber(1);
    setRowsPerPage(event?.target?.value);
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
      <Grid container sx={classes.header}>
        <Grid item xs={12} md={5} lg={6} xl={6}>
          <Typography variant="h5" sx={{ ...classes.heading, color: "white" }}>
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
            paddingRight: "17px",
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
              Trip Records
            </Typography>
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
                    icon={<MdFileDownload />}
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

              <CustomTable
                headers={[
                  { name: "From", field: "from" },
                  { name: "To", field: "to" },
                  { name: "Duration", field: "duration" },
                  { name: "Status", field: "status" },
                ]}
                rows={isSearching ? filterData : tripTableData}
                paginationCount={count}
                rowsPerPage={limit}
                pageNumber={page}
                perPageData={limit}
                isRowPerPageEnable={false}
                setPage={setPage}
                handlePageChange={handleChangePage}
                handlePerPageData={handlePerPageData}
              />
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
