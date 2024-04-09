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
  Last3DaysCampaigns,
} from "./DashboardData";
import { useAppSelector } from "../../utils/hooks";
import { selectName } from "../../redux/authSlice";
import campaigns from "../../assets/images/dashboard/campaigns.svg";

import { theme, regularFont } from "../../utils/styles";
import {
  convertESTtoUserLocalTime,
  isTruthy,
  openErrorNotification,
} from "../../helpers/methods";

import moment from "moment-timezone";
import dashboardStyles from "./DashboardStyles";

import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import strings from "../../global/constants/StringConstants";
import history from "../../utils/history";
import { useTitle } from "../../utils/UseTitle";
import { useDispatch } from "react-redux";
import { fetchDashboardDetail } from "./service/Dashboard.service";
import { FaBell } from "react-icons/fa6";
import dummyData, {
  deviceDashboardTableHeader,
} from "./DeviceDashboard.helper";
import { CustomTable } from "../../global/components";

const CAMPAIGN_COLORS = ["#FFCDEE", "#0069A9", "#C20C85", "#ACC837", "#FFCE31"];

const DeviceDashboard = () => {
  useTitle(strings.DashboardTitle);
  const classes = dashboardStyles;
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const userName = useAppSelector(selectName);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deviceDashboardData, setDeviceDashboardData] = useState([{}]);
  const [myCampaign, setMyCampaign] = useState<Last3DaysCampaigns>(
    {} as Last3DaysCampaigns
  );
  const [statData, setStatData] = useState<any>();

  const getStatData = async () => {
    try {
      const statData = await fetchDashboardDetail();
      setStatData(statData.fetchDashboardDetail.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStatData();
  }, []);

  const [stats, setStats] = useState({
    executed: {
      title: "Online Devices",
      value: statData?.totalJourney,
      //   icon: campaigns,
      resource: strings.campaign,
      redirection: {
        pathname: "",
      },
    },
    outbounds: {
      title: "Offline Devices",
      value: statData?.totalUser,
      //   icon: campaigns,
      resource: strings.campaign,
      redirection: {},
    },
    audience: {
      title: "Total Devices",
      value: statData?.ongoingJourney,
      //   icon: campaigns,
      resource: strings.contact,
      redirection: {},
    },
  });

  const getUserName = () => {
    const name = userName.split(" ");
    if (name.length > 0) {
      return name[0];
    }
    return userName;
  };

  useEffect(() => {
    fetchDeviceDashboardHandler();
  }, []);

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
            <Typography
              sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              Interval
            </Typography>
            <Select
              id="Dashboard_Interval_Dropdown"
              sx={classes.dropdown}
              value={""}
              onChange={(event: any) => {}}
            >
              {options.map((data) => (
                <MenuItem
                  key={data.label}
                  value={data.value}
                  sx={classes.dropdownOptions}
                >
                  {data.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>
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

  const getCustomTable = () => {
    return (
      <Box
        id="campaign_history_display_table"
        sx={{
          minWidth: "300px",
          width: "100%",
          overflow: "auto",
          padding: "1rem",
          backgroundColor: "white",
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.07)",
        }}
      >
        <CustomTable
          headers={deviceDashboardTableHeader}
          rows={deviceDashboardData}
          //   size={[5]}
          //   handlePageChange={
          //     searchJourney ? handleSearchChangePage : handleChangePage
          //   }
          //   handleRowsPerPage={handlePerPageData}
          //   paginationCount={count}
          // rowsPerPage={rowsPerPage}
          //   pageNumber={page}
          //   setPage={setPage}
          //   handlePerPageData={handlePerPageData}
          //   perPageData={rowsPerPage}
          //   rowsPerPage={rowsPerPage}
        />
      </Box>
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
              <Grid container xs={12} md={12} lg={12} xl={12} width="100%">
                <Grid
                  item
                  xs={12}
                  md={5}
                  lg={8}
                  sx={{ display: "flex", margin: "1rem 0rem" }}
                >
                  <Typography variant="h5" sx={classes.heading}>
                    All Devices table
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
                ></Grid>
              </Grid>

              {getCustomTable()}
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

export default DeviceDashboard;
