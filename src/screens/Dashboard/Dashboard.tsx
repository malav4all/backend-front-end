import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import moment from "moment-timezone";
import { useTheme } from "@mui/material/styles";
import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import strings from "../../global/constants/StringConstants";
import { useTitle } from "../../utils/UseTitle";
import CustomTableDashboard from "../../global/components/CustomTableDashboard/CustomTableDashboard";
import LineChart from "./components/Chart/LineChart";
import OfflinePieChart from "./components/Chart/OfflinePieChart";
import GetAlerts from "./components/Chart/GetAlerts";
import DashboardHeader from "./components/DashboardHeader";
import OnlinePieChart from "./components/Chart/OnlinePieChart";
import { gql, useSubscription } from "@apollo/client";

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
  // const classes = dashboardStyles;
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  // const [count, setCount] = useState(0);
  const [offlinePage, setOfflinePage] = useState(1);
  const [offlineLimit, setOfflineLimit] = useState(10);
  const [offlineCount, setOfflineCount] = useState<number>(0);
  // const [alertTableData, setAlertTableData] = useState([]);
  // const [dateFilter, setDateFilter] = useState({
  //   startDate: moment().clone().subtract(30, "minutes").toISOString(),
  //   endDate: moment().toISOString(),
  // });
  // const [offlineDateFilter, setOfflineDateFilter] = useState({
  //   startDate: moment().clone().subtract(30, "minutes").toISOString(),
  //   endDate: moment().toISOString(),
  // });
  // const [selectedRange, setSelectedRange] = useState("Past 30m");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statData, setStatData] = useState<any>([]);
  // const [dateRange, setDateRange] = useState<CustomDateRange>(initialState);
  // const [openModal, setOpenModal] = useState(false);
  // const [lastSelectedRange, setLastSelectedRange] = useState({
  //   startDate: moment().clone().subtract(30, "minutes").toISOString(),
  //   endDate: moment().toISOString(),
  // });

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
              fontFamily: "Geist_Light",
              fontSize: "1.5rem",
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
              { name: "Name", field: "label" },
              { name: "IMEI", field: "imei" },
              { name: "Status", field: "status" },
              { name: "Last Ping", field: "time" },
              { name: "Action", field: "action" },
            ]}
            rows={statData}
            isRowPerPageEnable={false}
            rowsPerPage={offlineLimit}
            perPageData={offlineLimit}
            paginationCount={offlineCount}
            pageNumber={offlinePage}
            setPage={setOfflinePage}
          />
        </Grid>
      </Grid>
    );
  };

  const getDashboardBody = () => {
    return (
      <Grid md={12} xs={12} sx={{ margin: "auto" }}>
        <Grid
          container
          spacing={3}
          xs={12}
          sm={12}
          xl={12}
          md={12}
          lg={12}
          sx={{ margin: "-30px auto", width: " 97%" }}
        >
          <Grid item xs={12} md={12} lg={12} xl={12} mt={2}>
            <GetAlerts />
          </Grid>

          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
              <LineChart height={300} />
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
                <Box>
                  <OnlinePieChart />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box>
                  <OfflinePieChart />
                </Box>
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

  const SUBSCRIBE_LOGS = gql`
    subscription SubscribeLogs($accountId: String!) {
      subscribeLogs(accountId: $accountId) {
        accountId
        imeiStatus {
          imei
          status
          connectedTime
          disconnectedTime
        }
        totalConnectedCount
        totalDisconnectedCount
      }
    }
  `;

  const { data, loading, error } = useSubscription(SUBSCRIBE_LOGS, {
    variables: { accountId: "IMZ765352" },
  });

  useEffect(() => {
    if (loading) {
      console.log("Loading...");
    }

    if (error) {
      console.error("Error:", error.message);
    }

    if (data && data.subscribeLogs) {
      console.log("Live Data:", data.subscribeLogs);
    }
  }, [data, loading, error]);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        width: "100%",
        height: "auto",
        margin: "auto",
      }}
    >
      <Box>
        <DashboardHeader />
      </Box>
      {getDashboardBody()}
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default Dashboard;
