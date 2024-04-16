import { useState, useEffect } from "react";
import { Box, Chip, Grid, MenuItem, Select, Typography } from "@mui/material";
import { useAppSelector } from "../../utils/hooks";
import { selectName } from "../../redux/authSlice";
import { FcInfo } from "react-icons/fc";
import moment from "moment-timezone";
import dashboardStyles from "./DashboardStyles";
import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import strings from "../../global/constants/StringConstants";
import history from "../../utils/history";
import { useTitle } from "../../utils/UseTitle";
import { alertRowData, statusDevice } from "./service/Dashboard.service";
import { FaBell } from "react-icons/fa6";
import CustomTable from "../../global/components/CustomTable/CustomTable";
import { isTruthy, openErrorNotification } from "../../helpers/methods";

const Dashboard = () => {
  useTitle(strings.DashboardTitle);
  const classes = dashboardStyles;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);

  const [offlinePage, setOfflinePage] = useState(1);
  const [offlineLimit, setOfflineLimit] = useState(10);
  const [offlineCount, setOfflineCount] = useState<number>(0);
  const [alertTableData, setAlertTableData] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    startDate: moment().clone().subtract(30, "minutes").toISOString(),
    endDate: moment().toISOString(),
  });
  const [offlineDateFilter, setOfflineDateFilter] = useState({
    startDate: moment().clone().subtract(30, "minutes").toISOString(),
    endDate: moment().toISOString(),
  });
  const [selectedRange, setSelectedRange] = useState("Past 30m");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statData, setStatData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (dateFilter) {
        try {
          const res = await alertRowData({
            input: {
              startDate: dateFilter.startDate,
              endDate: dateFilter.endDate,
              page,
              limit,
            },
          });
          const alertTableDataValue = res?.getAlertData?.data?.map(
            (item: any) => ({
              imei: item.imei,
              label: item.label,
              mode: item.mode,
              event: item.event,
              message: item.message,
              source: item.source,
              time: moment(item.time).format("DD-MM-YYYY HH:mm:ss A"),
              action: (
                <span style={{ color: "#845ADF" }}>
                  <FcInfo />
                </span>
              ),
            })
          );
          setAlertTableData(alertTableDataValue);
          setCount(res?.getAlertData?.paginatorInfo?.count);
        } catch (error: any) {
          openErrorNotification(error.message);
        }
      }
    };

    const intervalId = setInterval(fetchData, 500000);
    fetchData();

    return () => clearInterval(intervalId);
  }, [dateFilter, page, limit]);

  useEffect(() => {
    const fetchData = async () => {
      if (offlineDateFilter) {
        try {
          const res = await statusDevice({
            input: {
              startDate: offlineDateFilter.startDate,
              endDate: offlineDateFilter.endDate,
              page: offlinePage,
              limit: offlineLimit,
            },
          });
          setOfflineCount(res?.getStatusDevice?.paginatorInfo?.count);
          const deviceStatus = res?.getStatusDevice?.data?.map(
            (item: any, index: number) => ({
              id: index,
              imei: item.imei,
              label: item.label,
              status: (
                <Chip
                  label={item.status}
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    border: "1px solid white",
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
            })
          );
          setStatData(deviceStatus);
        } catch (error: any) {
          openErrorNotification(error.message);
        }
      }
    };

    const intervalId = setInterval(fetchData, 500000);
    fetchData();

    return () => clearInterval(intervalId);
  }, [offlineDateFilter, offlinePage, offlineLimit]);

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
          {/* <Typography variant="h5" sx={classes.heading}>
            Hello, {getUserName()}!
          </Typography> */}
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
            </Select>
          </Box>
        </Grid>
      </Grid>
    );
  };

  const stats = {
    executed: {
      title: strings.ACTIVE_JOURNEY,
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
      default:
        startDate = now.clone().subtract(30, "minutes").toISOString();
        endDate = now.toISOString();
        break;
    }

    setDateFilter({
      startDate: startDate,
      endDate: endDate,
    });

    setOfflineDateFilter({
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
          widows: "100%",
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

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} xl={3} lg={3}>
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
                <Typography>Tamper/Misc</Typography>
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

          <Grid item xs={12} sm={12} md={12} xl={3} lg={3}>
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

          <Grid item xs={12} sm={12} md={12} xl={3} lg={3}>
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

          <Grid item xs={12} sm={12} md={12} xl={3} lg={3}>
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
    setOfflinePage(newPage);
  };
  const handlePerPageData = (event: any) => {
    setPage(1);
    setLimit(event.target.value);
  };

  const handlePerOfflinePageData = (event: any) => {
    setOfflinePage(1);
    setOfflineLimit(event.target.value);
  };

  const getAlertsTable = () => {
    return (
      <Grid container>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          xl={6}
          lg={12}
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
            Alert Logs
          </Typography>

          <CustomTable
            headers={[
              { name: "Name", field: "label" },
              { name: "IMEI", field: "imei" },
              { name: "Alert Time", field: "time" },
              { name: "Event", field: "event" },
              { name: "Mode", field: "mode" },
              { name: "Source", field: "source" },
              { name: "Message", field: "message" },
            ]}
            rows={alertTableData}
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

        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={6}
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
              { name: "Action", field: "action" },
            ]}
            rows={statData}
            isRowPerPageEnable={false}
            rowsPerPage={offlineLimit}
            perPageData={offlineLimit}
            paginationCount={offlineCount}
            pageNumber={offlinePage}
            setPage={setOfflinePage}
            handlePageChange={handleStatusChangePage}
            handlePerPageData={handlePerOfflinePageData}
          />
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
        md={12}
        xs={12}
      >
        <Grid item xs={12} sm={12} xl={12} md={12} lg={12}>
          <Grid container spacing={2}>
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
