import { ChangeEvent, useEffect, useState } from "react";
import { fetchJourney } from "../../../Journey/service/journey.service";
import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CustomInput, CustomTable } from "../../../../global/components";
import moment from "moment";
import {
  debounceEventHandler,
  openErrorNotification,
} from "../../../../helpers/methods";
import strings from "../../../../global/constants/StringConstants";
import CustomLoader from "../../../../global/components/CustomLoader/CustomLoader";
import journeyReportStyles from "./JourneyReport.styles";
import { getDistanceReport } from "./service/distance.service";
import { getDistance } from "geolib";
import { time } from "console";
interface CustomProps {
  isFromDistanceReport: boolean;
}

const JourneyReport = (props: CustomProps) => {
  const classes = journeyReportStyles;
  const [isLoading, setIsLoading] = useState<any>(false);
  const [count, setCount] = useState<number>(0);
  const [tableData, setTableData] = useState([]);
  const [journeyTableData, setJourneyTableData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchJourney, setSearchJourney] = useState<string>("");
  const [dateFilter, setDateFilter] = useState({
    startDate: moment().clone().subtract(30, "minutes").toISOString(),
    endDate: moment().toISOString(),
  });
  const [selectedRange, setSelectedRange] = useState("Past 30m");
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);

  useEffect(() => {
    fetchJourneyHandler();
  }, [dateFilter]);

  const fetchJourneyHandler = async () => {
    try {
      setIsLoading(true);
      const res = await getDistanceReport({
        input: {
          startDate: dateFilter.startDate,
          endDate: dateFilter.endDate,
        },
      });

      const data = tableRender(res.fetchDistanceReport);

      setJourneyTableData(data);
      setIsLoading(false);
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

  const formatDistance = (distanceInKm: number) => {
    const distance = Number(distanceInKm);
    if (distance < 1) {
      const meters = Math.round(distance * 1000);
      return `${meters} m`;
    } else {
      return `${distance.toFixed(2)} Km`;
    }
  };

  const tableRender = (tableData: any) => {
    let totalDistance = 0;
    let totalTime = 0; // in seconds

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
      return {
        imei: item.imei,
        distance: distance,
        duration: timeee,
      };
    });
    console.log(totalDistance, totalTime);

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

  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      setSearchJourney(SearchEvent.target.value.trim());
      setPage(1);
      setRowsPerPage(10);
    } else {
      setSearchJourney("");
    }
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search Report..."
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
        sx={classes.header}
        xs={12}
        md={12}
        lg={12}
        xl={12}
        width="100%"
      >
        <Grid item xs={12} md={5} lg={8} sx={{ display: "flex" }}>
          <Typography variant="h5" sx={classes.heading}>
            {getSearchBar()}
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
          }}
        >
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Typography
              sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              Duration
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
              <MenuItem value="Past 1m" sx={classes.optionStyle}>
                Past 1m
              </MenuItem>
              <MenuItem value="Past 5m" sx={classes.optionStyle}>
                Past 5m
              </MenuItem>
              <MenuItem value="Past 15m" sx={classes.optionStyle}>
                Past 15m
              </MenuItem>
              <MenuItem value="Past 30m" sx={classes.optionStyle}>
                Past 30m
              </MenuItem>
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
          </Box>
        </Grid>
      </Grid>
    );
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
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.07)",
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
            <Typography variant="h5" sx={classes.heading}>
              {`${
                props.isFromDistanceReport
                  ? "Distance Report"
                  : "Journey Report"
              }`}
            </Typography>
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
                { name: "Total Distance", field: "distance" },
                { name: "Total Duration", field: "totalDuration" },
              ]}
              rows={journeyTableData}
              size={[5]}
              handlePageChange={handleChangePage}
              handleRowsPerPage={handlePerPageData}
              paginationCount={count}
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
    <Box>
      {getDashboardHeader()}
      {getDashboardBody()}
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default JourneyReport;
