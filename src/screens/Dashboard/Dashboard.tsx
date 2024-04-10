import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  options,
  Counts,
  CampaignRecipientCounts,
  RecentCampaignStats,
  CampaignCounts,
  Last3DaysCampaigns,
} from "./DashboardData";
import { useAppSelector } from "../../utils/hooks";
import { selectName } from "../../redux/authSlice";
import campaigns from "../../assets/images/dashboard/campaigns.svg";

import { theme, regularFont } from "../../utils/styles";
import { convertESTtoUserLocalTime, isTruthy } from "../../helpers/methods";

import moment from "moment-timezone";
import dashboardStyles from "./DashboardStyles";

import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import strings from "../../global/constants/StringConstants";
import history from "../../utils/history";
import { useTitle } from "../../utils/UseTitle";
import { useDispatch } from "react-redux";
import {
  alertRowData,
  fetchDashboardDetail,
  statusDevice,
} from "./service/Dashboard.service";
import { FaBell } from "react-icons/fa6";
import CustomTable from "../../global/components/CustomTable/CustomTable";
import { useSubscription } from "@apollo/client";
import { ALERT_TABLE_DATA } from "./service/Dashboard.mutation";

const CAMPAIGN_COLORS = ["#FFCDEE", "#0069A9", "#C20C85", "#ACC837", "#FFCE31"];

const Dashboard = () => {
  useTitle(strings.DashboardTitle);
  const classes = dashboardStyles;
  const [page, setPage] = useState(1);
  const [statusPage, setStatusPage] = useState(1);
  const userName = useAppSelector(selectName);
  const [alertTableData, setAlertTableData] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    startDate: moment().clone().subtract(30, "minutes").toISOString(),
    endDate: moment().toISOString(),
  });
  const [selectedRange, setSelectedRange] = useState("Past 30m");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statData, setStatData] = useState<any>([]);
  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;

  const startDeviceIndex = (statusPage - 1) * 10;
  const endDeviceIndex = startDeviceIndex + 10;

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

  const getUserName = () => {
    const name = userName.split(" ");
    if (name.length > 0) {
      return name[0];
    }
    return userName;
  };

  const alertData = async () => {
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
            Hello, {getUserName()}!
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

  const stats = {
    executed: {
      title: "Active Journey",
      value: statData?.totalJourney,
      // icon: campaigns,
      resource: strings.campaign,
      redirection: {
        pathname: "",
      },
    },

    outbounds: {
      title: "Offline Devices",
      value: statData?.totalUser,

      resource: strings.campaign,
      redirection: {},
    },
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

  const getAlerts = () => {
    return (
      <Box
        id="Alerts_pannel"
        sx={{
          padding: "1.5rem 1.5rem",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.07)",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: "Bold",
            marginTop: "-0.5rem",
          }}
          gutterBottom
        >
          Alerts
        </Typography>

        <Grid container spacing={2} sx={{}}>
          <Grid item xs={12} sm={12} md={3} xl={3} lg={3}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              component={"div"}
              id="dashboard_stats"
              sx={{
                padding: "1rem 1.5rem",
                backgroundColor: "#E13D56",
                borderRadius: "8px",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              }}
            >
              <Box
                sx={{
                  fontFamily: "SourceSans3_Bold",
                  fontWeight: 700,
                  color: "ivory",
                }}
              >
                <Typography>Tamper</Typography>
                <Typography sx={classes.statsValue}>
                  {
                    alertTableData.filter((item: any) => item.event === "other")
                      .length
                  }
                </Typography>
              </Box>

              <Box
                sx={{
                  fontSize: "1.5rem",
                  color: "white",
                  marginTop: "-1rem",
                }}
              >
                <FaBell />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={3} xl={3} lg={3}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              component={"div"}
              id="dashboard_stats"
              sx={{
                padding: "1rem 1.5rem",
                backgroundColor: "#18A0FB",
                borderRadius: "8px",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              }}
            >
              <Box
                sx={{
                  fontFamily: "SourceSans3_Bold",
                  fontWeight: 700,
                  color: "ivory",
                }}
              >
                <Typography>Lock/Unlock</Typography>
                <Typography sx={classes.statsValue}>
                  {alertTableData.filter((item: any) => item.event === "locked")
                    .length +
                    alertTableData.filter(
                      (item: any) => item.event === "unlocked"
                    ).length}
                </Typography>
              </Box>

              <Box
                sx={{
                  fontSize: "1.5rem",
                  color: "white",
                  marginTop: "-1rem",
                }}
              >
                <FaBell />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={3} xl={3} lg={3}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              component={"div"}
              id="dashboard_stats"
              sx={{
                padding: "1rem 1.5rem",
                backgroundColor: "#FF9A02",
                borderRadius: "8px",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              }}
            >
              <Box
                sx={{
                  fontFamily: "SourceSans3_Bold",
                  fontWeight: 700,
                  color: "ivory",
                }}
              >
                <Typography>Geozone In/Out</Typography>
                <Typography sx={classes.statsValue}>
                  {alertTableData.filter(
                    (item: any) => item.event === "geo_exit"
                  ).length +
                    alertTableData.filter(
                      (item: any) => item.event === "geo_entry"
                    ).length}
                </Typography>
              </Box>

              <Box
                sx={{
                  fontSize: "1.5rem",
                  color: "white",
                  marginTop: "-1rem",
                }}
              >
                <FaBell />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={3} xl={3} lg={3}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              component={"div"}
              id="dashboard_stats"
              sx={{
                padding: "1rem 1.5rem",
                backgroundColor: "#855BDE",
                borderRadius: "8px",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              }}
            >
              <Box
                sx={{
                  fontFamily: "SourceSans3_Bold",
                  fontWeight: 700,
                  color: "ivory",
                }}
              >
                <Typography>Total Alerts</Typography>
                <Typography sx={classes.statsValue}>
                  {alertTableData.length}
                </Typography>
              </Box>

              <Box
                sx={{
                  fontSize: "1.5rem",
                  color: "white",
                  marginTop: "-1rem",
                }}
              >
                <FaBell />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleStatusChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setStatusPage(newPage);
  };

  const getAlertsTable = () => {
    return (
      <Box sx={{ display: "flex", gap: "1rem", flexWrap: "nowrap" }}>
        <Grid
          item
          xs={12}
          md={12}
          lg={7}
          id="Alerts_panel"
          sx={{
            padding: "1.5rem 1.5rem",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.07)",
          }}
        >
          <Grid item xs={12} sm={12} md={9} xl={12} lg={12}>
            <Grid
              item
              xs={12}
              md={12}
              lg={7}
              sx={{ display: "flex", margin: "1rem 0rem" }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "Bold", fontSize: "1.2rem" }}
              >
                Alerts logs
              </Typography>
            </Grid>

            <CustomTable
              headers={[
                { name: "Name", field: "label" },
                { name: "IMEI", field: "imei" },
                { name: "Last Ping", field: "time" },
                { name: "Event", field: "event" },
                { name: "Mode", field: "mode" },
                { name: "Source", field: "source" },
                { name: "Message", field: "message" },
              ]}
              rows={alertTableData.slice(startIndex, endIndex)}
              paginationCount={alertTableData.length}
              rowsPerPage={10}
              pageNumber={page}
              isRowPerPageEnable={true}
              setPage={setPage}
              handlePageChange={handleChangePage}
            />
          </Grid>
        </Grid>

        <Grid
          container
          xs={12}
          md={12}
          lg={5}
          xl={5}
          sm={12}
          sx={{
            padding: "1.5rem 1.5rem",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.07)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "Bold",
              fontSize: "1.2rem",
              marginBottom: "1.5rem",
            }}
          >
            Offline Devices
          </Typography>

          <CustomTable
            headers={[
              { name: "Name", field: "label" },
              { name: "IMEI", field: "imei" },
              { name: "Status", field: "status" },
              { name: "Last ping", field: "time" },
            ]}
            rows={statData.slice(startDeviceIndex, endDeviceIndex)}
            isRowPerPageEnable={true}
            rowsPerPage={10}
            paginationCount={statData.length}
            pageNumber={statusPage}
            setPage={setStatusPage}
            handlePageChange={handleStatusChangePage}
          />
        </Grid>
      </Box>
    );
  };

  const getStatsCard = () => {
    return (
      <Grid container spacing={2}>
        {Object.values(stats).map((stat: any) => (
          <Grid item xs={12} sm={12} md={6} xl={6} lg={6} key={stat.title}>
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
                cursor: isTruthy(stat.redirection) ? "pointer" : "pointer",
              }}
              onClick={() => {
                if (stat.title === "Active Journey") {
                  history.push("/journey");
                }
                if (stat.title === "Offline Devices") {
                  history.push("/device-dashboard");
                }
              }}
            >
              <Box>
                <Typography sx={classes.statsTitle}>{stat.title}</Typography>
                <Typography sx={classes.statsValue}>10</Typography>
              </Box>

              <Box>
                <img src={stat.icon} width={60} height={60} />
              </Box>
            </Box>
          </Grid>
        ))}
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
        <Grid item xs={12} sm={12} xl={12} md={9} lg={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              {getStatsCard()}
            </Grid>

            <Grid item xs={12} md={12} lg={12} xl={12}>
              {getAlerts()}
            </Grid>

            <Grid item xs={12} md={12} lg={12} xl={12}>
              {getAlertsTable()}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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

export default Dashboard;
