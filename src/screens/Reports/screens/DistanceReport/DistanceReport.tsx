import { ChangeEvent, useEffect, useState } from "react";
import { fetchRoutes } from "../../../Routes/service/routes.service";
import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  CustomInput,
  CustomPaper,
  CustomTable,
} from "../../../../global/components";
import moment from "moment";
import {
  debounceEventHandler,
  openErrorNotification,
} from "../../../../helpers/methods";
import strings from "../../../../global/constants/StringConstants";
import CustomLoader from "../../../../global/components/CustomLoader/CustomLoader";

// import { getDistanceReport } from "./service/distance.service";
import { getDistance } from "geolib";
import { time } from "console";
import distanceReportStyles from "./DistanceReport.styles";
import { getDistanceReport } from "./service/distance.service";
import { store } from "../../../../utils/store";
import {
  disabledBackgroundColor,
  primaryHeaderColor,
} from "../../../../utils/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import history from "../../../../utils/history";
interface CustomProps {
  isFromRoutesReport: boolean;
}

const DistanceReport = (props: CustomProps) => {
  const classes = distanceReportStyles;
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState<any>(false);
  const [count, setCount] = useState<number>(0);
  const [tableData, setTableData] = useState([]);
  const [routesTableData, setRoutesTableData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchRoutes, setSearchRoutes] = useState<string>("");
  const [dateFilter, setDateFilter] = useState({
    startDate: moment().clone().subtract(30, "minutes").toISOString(),
    endDate: moment().toISOString(),
  });
  const [selectedRange, setSelectedRange] = useState("Past 1h");
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
  const [filterData, setFilterData] = useState<any>([]);
  const [isSearching, setIsSearching] = useState(false);
  useEffect(() => {
    fetchRoutesHandler();
  }, [dateFilter]);

  const fetchRoutesHandler = async () => {
    try {
      setIsLoading(true);
      const res = await getDistanceReport({
        input: {
          accountId: store.getState().auth.tenantId,
          startDate: dateFilter.startDate,
          endDate: dateFilter.endDate,
        },
      });

      const data = tableRender(res.getDistanceReportData);

      setRoutesTableData(data);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      openErrorNotification(error.message);
    }
  };

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
      case "Past 7d":
        startDate = now.clone().subtract(7, "days").toISOString();
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
  const formatDistance = (distanceInMeters: number) => {
    if (distanceInMeters < 1000) {
      return `${distanceInMeters} m`;
    } else {
      const distanceInKm = distanceInMeters / 1000;
      return `${distanceInKm.toFixed(2)} km`;
    }
  };

  const tableRender = (tableData: any) => {
    let totalDistance = 0;
    let totalTime = 0;

    const data = tableData?.map((item: any, index: number) => {
      let distance = 0;
      let timeee = 0;
      for (let i = 0; i < item.coordinates.length - 1; i++) {
        const startCoord = item.coordinates[i];
        const endCoord = item.coordinates[i + 1];
        const startMoment = moment(startCoord.time);
        const endMoment = moment(endCoord.time);
        const duration = moment.duration(endMoment.diff(startMoment));
        timeee += duration.asSeconds();
        distance += getDistance(
          { latitude: startCoord.latitude, longitude: startCoord.longitude },
          { latitude: endCoord.latitude, longitude: endCoord.longitude }
        );
      }
      totalDistance += distance;
      totalTime += timeee;
      const formattedDistance = formatDistance(distance);
      return {
        imei: item.imei,
        distance: formattedDistance,
        duration: calculateApproxTime(formattedDistance),
        action: (
          <Tooltip
            title={
              <CustomPaper
                className={{ backgroundColor: disabledBackgroundColor }}
              >
                <Typography>{"View Routes"}</Typography>
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
                  pathname: "/trackplay",
                  state: {
                    imei: item.imei,
                    startDate: dateFilter.startDate,
                    endDate: dateFilter.endDate,
                  },
                });
              }}
            />
          </Tooltip>
        ),
      };
    });

    return data;
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

  const handleSearchOnChange = (searchEvent: ChangeEvent<HTMLInputElement>) => {
    const value = searchEvent?.target?.value.toLowerCase().trim();
    if (value) {
      setIsLoading(true);
      const searchedReports = routesTableData?.filter(
        (data: any) =>
          data?.imei?.toLowerCase()?.includes(value) ||
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

  const calculateApproxTime = (formattedDistance: string) => {
    const speedKmPerHour = 40;
    let distanceInKm: number = 0;

    if (formattedDistance.includes("m")) {
      distanceInKm = parseFloat(formattedDistance) / 1000;
    }
    if (formattedDistance.includes("km")) {
      distanceInKm = parseFloat(formattedDistance.split(" ")[0]);
    }

    const timeInHours = distanceInKm / speedKmPerHour;
    const timeInMinutes = timeInHours * 60;

    if (timeInMinutes < 60) {
      return `${Math.round(timeInMinutes)} minutes`;
    } else {
      const hours = Math.floor(timeInMinutes / 60);
      const remainingMinutes = Math.round(timeInMinutes % 60);
      if (remainingMinutes === 0) {
        return `${hours} hour${hours > 1 ? "s" : ""}`;
      } else {
        return `${hours} hour${
          hours > 1 ? "s" : ""
        } and ${remainingMinutes} minutes`;
      }
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
            Distance Reports
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
            <MenuItem value="Past 2d" sx={classes.optionStyle}>
              Past 7d
            </MenuItem>
            <MenuItem value="Past 30d" sx={classes.optionStyle}>
              Past 30d
            </MenuItem>
          </Select>
        </Grid>
      </Grid>
    );
  };

  const getDistanceHeader = () => {
    <Grid container sx={classes.header}>
      <Grid item xs={12} md={5} lg={6} xl={6}>
        <Typography variant="h5" sx={classes.heading}>
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
    </Grid>;
  };

  const getDashboardBody = () => {
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
        <Grid container xs={12} md={12} lg={12} xl={12} width="100%">
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{ display: "flex", margin: "1rem 0rem" }}
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
              Distance Report
            </Typography> */}
          </Grid>

          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexWrap: "wrap",
            }}
          ></Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
            <CustomTable
              headers={[
                { name: "IMEI", field: "imei" },
                { name: "Total Distance (Approx)", field: "distance" },
                { name: "Total Duration (Approx)", field: "duration" },
                { name: "Action", field: "action" },
              ]}
              rows={isSearching ? filterData : routesTableData}
              size={[5]}
              handlePageChange={handleChangePage}
              handleRowsPerPage={handlePerPageData}
              paginationCount={routesTableData?.length}
              // rowsPerPage={rowsPerPage}
              pageNumber={page}
              setPage={setPage}
              handlePerPageData={handlePerPageData}
              perPageData={rowsPerPage}
              rowsPerPage={rowsPerPage}
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
      }}
    >
      {getDashboardHeader()}
      {/* {getDistanceHeader()} */}
      {getDashboardBody()}
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default DistanceReport;
