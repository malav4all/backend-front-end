import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import moment from "moment";
import alertReportStyles from "./AlertReport.styles";
import { alertRowData, statusDevice } from "./service/alertReport.service";
import { CustomInput, CustomTable } from "../../../../global/components";
import CustomLoader from "../../../../global/components/CustomLoader/CustomLoader";
import {
  debounceEventHandler,
  openErrorNotification,
} from "../../../../helpers/methods";
import strings from "../../../../global/constants/StringConstants";
import SearchIcon from "@mui/icons-material/Search";
const AlertReport = () => {
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

  useEffect(() => {
    if (dateFilter) {
      alertData();
    }
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
        sx={classes.header}
        xs={12}
        md={12}
        lg={12}
        xl={12}
        width="100%"
      >
        <Grid
          item
          xs={12}
          md={5}
          lg={8}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Typography variant="h5" sx={classes.heading}>
            {/* {getSearchBar()} */}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={7}
          lg={4}
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
        placeHolder="Search Reports..."
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

  const alertData = async () => {
    try {
      setIsLoading(true);
      const res = await alertRowData({
        input: {
          startDate: dateFilter.startDate,
          endDate: dateFilter.endDate,
          page,
          limit,
        },
      });

      const alertTableDataValue = res?.getAlertData?.data?.map((item: any) => {
        return {
          imei: item.imei,
          label: item.label,
          mode: item.mode,
          event: item.event,
          message: item.message,
          source: item.source,
          time: moment(item.time).format("DD-MM-YYYY HH:mm:ss A"),
        };
      });
      setAlertTableData(alertTableDataValue);
      setCount(res?.getAlertData?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      openErrorNotification(error.message);
    }
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

  const getAlertsTable = () => {
    return (
      <Box
        id="Alerts_panel"
        sx={{
          padding: "1.5rem 1.5rem",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.07)",
        }}
      >
        <Grid container xs={12} md={12} lg={12} xl={12}>
          <Grid item xs={12} md={12} lg={12} xl={6}>
            <Typography variant="h5" sx={classes.heading}>
              Alerts Report
            </Typography>
          </Grid>

          <Grid item xs={12} md={12} lg={12} xl={6}>
            <Select
              id="campaigns_interval_dropdown"
              sx={classes.dropDownStyle}
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
            </Select>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
            <CustomTable
              headers={[
                { name: "NAME", field: "label" },
                { name: "IMEI", field: "imei" },
                { name: "Event", field: "event" },
                { name: "Mode", field: "mode" },
                { name: "Source", field: "source" },
                { name: "Message", field: "message" },
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
    <Box>
      {getReportHeader()}
      {getReportBody()}
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default AlertReport;
