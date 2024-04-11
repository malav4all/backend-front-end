import { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Chip,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { options } from "./DashboardData";
import { useAppSelector } from "../../utils/hooks";
import { selectName } from "../../redux/authSlice";

import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
} from "../../helpers/methods";

import dashboardStyles from "./DashboardStyles";

import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import strings from "../../global/constants/StringConstants";
import history from "../../utils/history";
import { useTitle } from "../../utils/UseTitle";
import {
  fetchDashboardDetail,
  fetchDeviceList,
} from "./service/Dashboard.service";
import dummyData, {
  deviceDashboardTableHeader,
} from "./DeviceDashboard.helper";
import { CustomInput, CustomTable } from "../../global/components";
import { statusDevice } from "../Dashboard/service/Dashboard.service";
import moment from "moment";
import { FcInfo } from "react-icons/fc";

const DeviceDashboard = () => {
  useTitle(strings.DashboardTitle);
  const classes = dashboardStyles;
  const userName = useAppSelector(selectName);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deviceDashboardData, setDeviceDashboardData] = useState([{}]);
  const [statDataTable, setStatDataTable] = useState<any>([]);
  const [selectedRange, setSelectedRange] = useState("Past 30m");
  const [statusPage, setStatusPage] = useState(1);
  const startDeviceIndex = (statusPage - 1) * 10;
  const endDeviceIndex = startDeviceIndex + 10;
  const [dateFilter, setDateFilter] = useState({
    startDate: moment().clone().subtract(30, "minutes").toISOString(),
    endDate: moment().toISOString(),
  });

  const handleStatusChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setStatusPage(newPage);
  };

  useEffect(() => {
    alertData();
  }, [dateFilter]);

  const stats = {
    executed: {
      title: "Online Devices",
      value: statDataTable?.filter(
        (item: any) => item?.deviceStatus === "online"
      )?.length,
      //   icon: campaigns,
      resource: strings.campaign,
      redirection: {
        pathname: "",
      },
    },
    outbounds: {
      title: "Offline Devices",
      value: statDataTable?.filter(
        (item: any) => item?.deviceStatus === "offline"
      )?.length,
      //   icon: campaigns,
      resource: strings.campaign,
      redirection: {},
    },
    audience: {
      title: "Total Devices",
      value: statDataTable?.length,
      //   icon: campaigns,
      resource: strings.contact,
      redirection: {},
    },
  };

  const updateStatus = (devices: any, assignments: any) => {
    const currentTime = new Date();
    const deviceMap: any = {};

    devices.forEach((device: any) => {
      if (
        !(device.imei in deviceMap) ||
        new Date(device.time) > new Date(deviceMap[device.imei].time)
      ) {
        deviceMap[device.imei] = device;
      }
    });

    assignments.forEach((assignment: any) => {
      const imei = assignment.imei;
      const device = deviceMap[imei];

      if (device) {
        const thirtyMinutesAgo = new Date(currentTime.getTime() - 30 * 60000);
        const deviceTime = new Date(device.time);

        const isOnline = deviceTime > thirtyMinutesAgo;
        assignment.status = isOnline ? "online" : "offline";
        assignment.lat = deviceMap[imei]?.lat;
        assignment.lng = deviceMap[imei]?.lng;
        assignment.time = deviceMap[imei]?.time;
      } else {
        assignment.status = "offline";
        assignment.lat = deviceMap[imei]?.lat;
        assignment.lng = deviceMap[imei]?.lng;
        assignment.time = deviceMap[imei]?.time;
      }
    });

    return assignments;
  };
  const alertData = async () => {
    const [res2, res1] = await Promise.all([
      statusDevice({
        input: {
          startDate: dateFilter.startDate,
          endDate: dateFilter.endDate,
        },
      }),
      fetchDeviceList(),
    ]);
    const finalData = updateStatus(res2.getStatusDevice, res1.getAllDeviceList);
    const deviceStatus = finalData.map((item: any, index: number) => {
      return {
        id: index,
        imei: item.imei,
        label: item.labelName,
        deviceStatus: item?.status,
        status: (
          <Chip
            label={item?.status}
            sx={{
              backgroundColor: item.status === "online" ? "green" : "red",
              color: item.status === "online" ? "white" : "white",
              border:
                item.status === "Active"
                  ? "1px solid #37b071"
                  : "1px solid white",
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%": {
                  transform: "scale(1)",
                  opacity: 1,
                },
                "50%": {
                  transform: "scale(1.05)",
                  opacity: 0.75,
                },
                "100%": {
                  transform: "scale(1)",
                  opacity: 1,
                },
              },
            }}
            variant="filled"
          />
        ),
        time: moment(item.time).format("DD-MM-YYYY HH:mm:ss A"),
        action: (
          <span style={{ color: "#845ADF" }}>
            <FcInfo
              onClick={() => {
                history.push({
                  pathname: "/view-offline",
                  state: {
                    data: item,
                  },
                });
              }}
            />
          </span>
        ),
      };
    });
    setStatDataTable(deviceStatus);
  };

  const fetchDeviceDashboardHandler = async () => {
    try {
      setIsLoading(true);
      //   const res = await fetchJourney({
      //     input: {
      //       page,
      //       limit: 10,
      //     },
      //   });

      //   const data = tableRender(res.fetchJourney.data);
      setDeviceDashboardData(dummyData);
      //   setCount(res.fetchJourney.paginatorInfo.count);
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
          <Typography variant="h5" sx={classes.heading}></Typography>
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
        ></Grid>
      </Grid>
    );
  };

  const getStatsCard = () => {
    return (
      <Grid container spacing={2}>
        {Object.values(stats).map((stat: any) => (
          <Grid item xs={12} sm={12} md={4} xl={4} lg={4}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              component={"div"}
              id="dashboard_stats"
              sx={{
                padding: "1rem 1.5rem",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.07)",
                cursor: isTruthy(stat.redirection) ? "pointer" : "auto",
              }}
              onClick={() =>
                isTruthy(stat.redirection)
                  ? history.push(stat.redirection)
                  : null
              }
            >
              <Box>
                <Typography sx={classes.statsTitle}>{stat.title}</Typography>
                <Typography sx={classes.statsValue}>{stat.value}</Typography>
              </Box>

              {/* <Box>
                <img src={stat.icon} width={60} height={60} />
              </Box> */}
            </Box>
          </Grid>
        ))}
      </Grid>
    );
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
          headers={[
            { name: "Name", field: "label" },
            { name: "IMEI", field: "imei" },
            { name: "Status", field: "status" },
            { name: "Last ping", field: "time" },
            { name: "Action", field: "action" },
          ]}
          rows={statDataTable?.slice(startDeviceIndex, endDeviceIndex)}
          isRowPerPageEnable={true}
          rowsPerPage={10}
          paginationCount={statDataTable?.length}
          pageNumber={statusPage}
          setPage={setStatusPage}
          handlePageChange={handleStatusChangePage}
        />
      </Box>
    );
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search Devices..."
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

  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      // setSearchJourney(SearchEvent.target.value.replace(/\s/g, ""));
      // setPage(1);
      // setRowsPerPage(10);
    } else {
      // setSearchJourney("");
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
        <Grid item xs={12} sm={12} xl={12} md={9} lg={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              {getStatsCard()}
            </Grid>

            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Grid container xs={12} md={12} lg={12} xl={12} width="100%">
                <Grid
                  item
                  xs={12}
                  md={5}
                  lg={8}
                  sx={{ display: "flex", margin: "1rem 0rem" }}
                ></Grid>

                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexWrap: "wrap",
                    backgroundColor: "white",
                    boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.07)",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "2rem",
                    }}
                  >
                    <Typography variant="h5" sx={classes.heading}>
                      All Devices Table
                    </Typography>

                    {getSearchBar()}
                  </Grid>
                  {getCustomTable()}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  useEffect(() => {
    fetchDeviceDashboardHandler();
  }, []);

  return (
    <Box>
      {getDashboardHeader()}
      {getDashboardBody()}
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default DeviceDashboard;
