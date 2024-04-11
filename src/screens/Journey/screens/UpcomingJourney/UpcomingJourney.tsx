import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import moment from "moment";
import {
  CustomAppHeader,
  CustomButton,
  CustomInput,
  CustomTable,
} from "../../../../global/components";
import CustomLoader from "../../../../global/components/CustomLoader/CustomLoader";
import {
  debounceEventHandler,
  openErrorNotification,
} from "../../../../helpers/methods";
import strings from "../../../../global/constants/StringConstants";
import SearchIcon from "@mui/icons-material/Search";
import upcomingJourneyStyles from "./UpcomingJourney.styles";
import {
  alertRowData,
  statusDevice,
} from "../../../Reports/service/Report.service";
import { upComingJourney } from "./service/UpcomingJourney.service";
import { boldFont, primaryHeadingColor } from "../../../../utils/styles";
const UpcomingJourney = () => {
  const classes = upcomingJourneyStyles;
  const [alertTableData, setAlertTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [dateFilter, setDateFilter] = useState({
    startDate: moment().clone().subtract(30, "minutes").toISOString(),
    endDate: moment().toISOString(),
  });
  const [filterData, setFilterData] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState("Past 30m");
  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;
  const [statusPage, setStatusPage] = useState(1);
  const [statData, setStatData] = useState<any>([]);
  const startDeviceIndex = (statusPage - 1) * 10;
  const endDeviceIndex = startDeviceIndex + 10;
  const serachInputValue = useRef<any>("");
  const [upcommingTableData, setUpcommingTableData] = useState([]);
  useEffect(() => {
    if (dateFilter) {
      alertData();
      const intervalId = setInterval(() => {
        alertData();
      }, 30000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [dateFilter.startDate, dateFilter.endDate]);

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

  useEffect(() => {
    upcomingJourneyHandler();
  }, []);

  const upcomingJourneyHandler = async () => {
    try {
      const response = await upComingJourney();
      const res = tableRender(response.upComingJourney.data);
      setUpcommingTableData(res);
    } catch (error: any) {
      setIsLoading(false);
      openErrorNotification(error.message);
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
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

  const tableRender = (tableData: any) => {
    const data = tableData?.map((item: any, index: number) => {
      return {
        key: item._id,
        journeyName: item?.journeyName,
        startDate: moment(item.startDate).format("DD-MMM-YYYY hh:mm A"),
        endDate: moment(item.endDate).format("DD-MMM-YYYY hh:mm A"),
        createdBy: item?.createdBy,
        totalDistance: formatDistance(item?.totalDistance),
        totalDuration: formatDuration(item?.totalDuration),
      };
    });
    return data;
  };

  // const getDashboardHeader = () => {
  //   return (
  //     <Grid
  //       container
  //       sx={classes.header}
  //       xs={12}
  //       md={12}
  //       lg={12}
  //       xl={12}
  //       width="100%"
  //     >
  //       <Grid item xs={12} md={5} lg={8} sx={{ display: "flex" }}>
  //         <Typography variant="h5" sx={classes.heading}>
  //           {/* {getSearchBar()} */}
  //         </Typography>
  //       </Grid>

  //       <Grid
  //         item
  //         xs={12}
  //         md={7}
  //         lg={4}
  //         sx={{
  //           display: "flex",
  //           justifyContent: "flex-end",
  //           flexWrap: "wrap",
  //         }}
  //       ></Grid>
  //     </Grid>
  //   );
  // };

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
      setFilterData([...searchedReports]);
      setIsLoading(false);
    }
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search Upcoming Journey..."
        id="report_search_field"
        // inputRef={serachInputValue}
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

  const getHeader = () => {
    return (
      <Box>
        <Typography sx={classes.mainCardHeading}>Upcoming Journey</Typography>
      </Box>
    );
  };

  const alertData = async () => {
    try {
      setIsLoading(true);
      const [res1, res2] = await Promise.all([
        alertRowData({
          input: {
            startDate: dateFilter.startDate,
            endDate: dateFilter.endDate,
          },
        }),
        statusDevice({
          input: {
            startDate: dateFilter.startDate,
            endDate: dateFilter.endDate,
          },
        }),
      ]);
      const alertTableDataValue = res1.getAlertData.map((item: any) => {
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
      const deviceStatus = res2.getStatusDevice.map((item: any) => {
        return {
          imei: item.imei,
          label: item.label,
          status: item.status,
          time: moment(item.time).format("DD-MM-YYYY HH:mm:ss A"),
        };
      });
      setStatData(deviceStatus);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      openErrorNotification(error.message);
    }
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
            {/* <Typography variant="h5" sx={classes.heading}>
              Alerts Report
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
                { name: "Journey Name", field: "journeyName" },
                { name: "Created By", field: "createdBy" },
                { name: "Start Date", field: "startDate" },
                { name: "End Date", field: "endDate" },
                { name: "Total Distance", field: "totalDistance" },
                { name: "Total Duration", field: "totalDuration" },
              ]}
              rows={upcommingTableData}
              paginationCount={upcommingTableData.length}
              rowsPerPage={10}
              pageNumber={page}
              isRowPerPageEnable={true}
              setPage={setPage}
              handlePageChange={handleChangePage}
            />
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Box>
      <CustomAppHeader
        className={{
          backgroundColor: "#f1edff",
          padding: "10px 20px 15px 18px",
          marginBottom: "5rem",
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
              //   fontSize: getRelativeFontSize(6),
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
      {/* {getDashboardHeader()} */}
      {getDashboardBody()}
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default UpcomingJourney;
