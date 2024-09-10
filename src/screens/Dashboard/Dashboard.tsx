import { useEffect, useState } from "react";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import moment from "moment-timezone";
import { useTheme } from "@mui/material/styles";
import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import strings from "../../global/constants/StringConstants";
import { useTitle } from "../../utils/UseTitle";
import {
  dashboardGraphOnlineOrOffline,
  lineChartGraphStatus,
  offlineGraphStatus,
  onlineGraphStatus,
} from "./service/Dashboard.service";
import CustomTableDashboard from "../../global/components/CustomTableDashboard/CustomTableDashboard";
import LineChart from "./components/Chart/LineChart";
import OfflinePieChart from "./components/Chart/OfflinePieChart";
import GetAlerts from "./components/Chart/GetAlerts";
import OnlinePieChart from "./components/Chart/OnlinePieChart";
import { Link } from "react-router-dom";
import { FaMapLocationDot } from "react-icons/fa6";
import { store } from "../../utils/store";
import {
  Battery0Icon,
  Battery1Icon,
  Battery2Icon,
  Battery3Icon,
  Battery4Icon,
  BatteryChargingIcon,
  BatteryNeverIcon,
  GpsFalseIcon,
  GpsTrueIcon,
  OfflineIcon,
  OnlineIcon,
} from "./components/DashbordIcons";
interface CustomDateRange {
  fromDate: string;
  toDate: string;
}

const Dashboard = () => {
  const initialState: any = {
    fromDate: moment().clone().subtract(1, "month").toISOString(),
    toDate: moment().toISOString(),
  };

  useTitle(strings.DashboardTitle);
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [offlinePage, setOfflinePage] = useState(1);
  const [offlineLimit, setOfflineLimit] = useState(10);
  const [statData, setStatData] = useState<any>([]);
  const [dateRange, setDateRange] = useState<CustomDateRange>(initialState);
  const [dataGraph, setGraphData] = useState<any>();
  const [lastSelectedRange, setLastSelectedRange] = useState({
    startDate: moment().clone().subtract(30, "minutes").toISOString(),
    endDate: moment().toISOString(),
  });

  useEffect(() => {
    graphData();
  }, []);

  const graphData = async () => {
    try {
      const [online, offline, chartLine, deviceDashboardData] =
        await Promise.all([
          onlineGraphStatus({
            input: { accountId: store.getState().auth.tenantId },
          }),
          offlineGraphStatus({
            input: { accountId: store.getState().auth.tenantId },
          }),
          lineChartGraphStatus({
            input: { accountId: store.getState().auth.tenantId },
          }),
          dashboardGraphOnlineOrOffline({
            input: { accountId: store.getState().auth.tenantId },
          }),
        ]);
      setGraphData({
        online: online?.onlineDeviceGraph,
        offline: offline?.offlineDeviceGraph,
        lineChart: chartLine?.lineGraphDeviceData,
        deviceDashboardData: deviceDashboardData?.getOnlineOfflineCount,
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const dataRender = () => {
    const startIndex = (page - 1) * 5;
    const endIndex = startIndex + 5;
    return dataGraph?.deviceDashboardData?.data
      ?.slice(startIndex, endIndex)
      .map((item: any) => {
        return {
          accountId: item.accountId,
          imei: item.imei,
          status: (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography variant="body2">
                <Tooltip
                  arrow
                  title={item.status === "online" ? "Online" : "Offline"}
                >
                  <span>
                    {item.status === "online" ? (
                      <OnlineIcon />
                    ) : (
                      <OfflineIcon />
                    )}
                  </span>
                </Tooltip>
              </Typography>

              <Typography variant="body2">
                {item.batteryPercentage !== null &&
                item.batteryPercentage !== undefined ? (
                  <>
                    {item.batteryPercentage >= 0 &&
                      item.batteryPercentage <= 20 && (
                        <Tooltip arrow title={`${item.batteryPercentage}%`}>
                          
                          <span>
                            {" "}
                            <Battery0Icon />
                          </span>
                        </Tooltip>
                      )}
                    {item.batteryPercentage > 20 &&
                      item.batteryPercentage <= 40 && (
                        <Tooltip title={`${item.batteryPercentage}%`}>
                          <span>
                            <Battery1Icon />
                          </span>
                        </Tooltip>
                      )}
                    {item.batteryPercentage > 40 &&
                      item.batteryPercentage <= 60 && (
                        <Tooltip arrow title={`${item.batteryPercentage}%`}>
                          <span>
                            <Battery2Icon />
                          </span>
                        </Tooltip>
                      )}
                    {item.batteryPercentage > 60 &&
                      item.batteryPercentage <= 80 && (
                        <Tooltip arrow title={`${item.batteryPercentage}%`}>
                          <span>
                            {" "}
                            <Battery3Icon />
                          </span>
                        </Tooltip>
                      )}
                    {item.batteryPercentage > 80 &&
                      item.batteryPercentage <= 100 && (
                        <Tooltip arrow title={`${item.batteryPercentage}%`}>
                          <span>
                            <Battery4Icon />
                          </span>
                        </Tooltip>
                      )}
                  </>
                ) : (
                  <Tooltip arrow title="Never Connected">
                    <span>
                      <BatteryNeverIcon />
                    </span>
                  </Tooltip>
                )}
              </Typography>

              <Typography variant="body2">
                <Tooltip arrow title={item.gps ? "GPS Enabled" : "GPS Disabled"}>
                  <span> {item.gps ? <GpsTrueIcon /> : <GpsFalseIcon />}</span>
                </Tooltip>
              </Typography>
            </Box>
          ),
          name: item?.name,
          connectedTime:
            item.lastPing && moment(item.lastPing).isValid() ? (
              <>
                {moment(item.lastPing).format("h:mm:ss a, DD-MM-YY")}
                <br />
                {" (" + moment(item.lastPing).fromNow() + ")"}
              </>
            ) : (
              "Never Connected"
            ),

          action:
            item.status === "offline" ? (
              <span></span>
            ) : (
              <Link
                to={{
                  pathname: "/live-tracking",
                  state: { imei: item.imei, status: item.status },
                }}
              >
                <Tooltip arrow title={"Live View"}>
                  <span>
                    <FaMapLocationDot
                      style={{
                        cursor: "pointer",
                        fontSize: "1.4rem",
                        color: "#7c58cb",
                        marginLeft: "1rem",
                      }}
                    />
                  </span>
                </Tooltip>
              </Link>
            ),
        };
      });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const getDeviceList = () => {
    return (
      <Grid
        container
        spacing={3}
        sx={{
          paddingLeft: "24px",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          xl={12}
          lg={12}
          sx={{
            padding: "1.5rem 1.5rem",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "8px",
            border: "1px solid",
            borderColor: theme.palette.divider,
            boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.07)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Geist_semibold",
              fontSize: "1.1rem",
              marginBottom: "0.5rem",
              padding: "0.2rem 0.8rem",
              borderRadius: "5px",
              borderLeft: "7px solid",
              borderLeftColor: "#855BDE",
            }}
          >
            Device List
          </Typography>

          <CustomTableDashboard
            headers={[
              { name: "AccountId", field: "accountId" },
              { name: "NAME", field: "name" },
              { name: "IMEI", field: "imei" },
              { name: "STATUS", field: "status" },
              { name: "LAST PING", field: "connectedTime" },
              { name: "ACTION", field: "action" },
            ]}
            rows={dataRender()}
            isRowPerPageEnable={true}
            rowsPerPage={5}
            // perPageData={offlineLimit}
            paginationCount={dataGraph?.deviceDashboardData?.data?.length}
            pageNumber={page}
            setPage={setPage}
            handlePageChange={handleChangePage}
          />
        </Grid>
      </Grid>
    );
  };

  const getDashboardBody = () => {
    return (
      <Grid md={12} xs={12}>
        <Grid
          container
          spacing={3}
          xs={12}
          sm={12}
          xl={12}
          md={12}
          lg={12}
          sx={{ margin: "auto", width: " 97%", paddingTop: "3.5rem" }}
        >
          <Grid item xs={12} md={12} lg={12} xl={12} mt={2}>
            <GetAlerts data={dataGraph?.deviceDashboardData} />
          </Grid>

          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
              <LineChart height={300} dataGraph={dataGraph} />
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              xl={6}
              lg={6}
              spacing={2}
            >
              <Grid item xs={12} sm={6} md={6}>
                <OnlinePieChart dataGraph={dataGraph} />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <OfflinePieChart dataGraph={dataGraph} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item spacing={2} xs={12} md={12} lg={12} xl={12}>
            {getDeviceList()}
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        width: "100%",
        height: "auto",
      }}
    >
      {/* <Box>
        <DashboardHeader refresh={graphData} />
      </Box> */}
      {getDashboardBody()}
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default Dashboard;
