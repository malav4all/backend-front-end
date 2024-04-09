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
import { fetchDashboardDetail } from "./service/Dashboard.service";
import { FaBell } from "react-icons/fa6";
import CustomTable from "../../global/components/CustomTable/CustomTable";

const CAMPAIGN_COLORS = ["#FFCDEE", "#0069A9", "#C20C85", "#ACC837", "#FFCE31"];

const Dashboard = () => {
  useTitle(strings.DashboardTitle);
  const classes = dashboardStyles;
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const userName = useAppSelector(selectName);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [myCampaign, setMyCampaign] = useState<Last3DaysCampaigns>(
    {} as Last3DaysCampaigns
  );
  const [statData, setStatData] = useState<any>();

  const [campaignRecipientStats, setCampaignRecipientStats] =
    useState<CampaignRecipientCounts>({
      Total: {
        name: "Total",
        value: 0,
      },
      Success: {
        name: "Success",
        value: 0,
      },
      Opened: {
        name: "Opened",
        value: 0,
      },
      Clicked: {
        name: "Clicked",
        value: 0,
      },
      Failed: {
        name: "Failed",
        value: 0,
      },
      Unsubscribed: {
        name: "Unsubscribed",
        value: 0,
      },
    });

  const [recentCampaignStats, setRecentCampaignStats] =
    useState<RecentCampaignStats>({
      id: "",
      name: "",
      createdOn: "",
      stats: {
        Requested: {
          name: "Requested",
          value: 0,
          fill: "#0069A9",
        },
        Success: {
          name: "Success",
          value: 0,
          fill: "#C20C85",
        },
        Failed: {
          name: "Failed",
          value: 0,
          fill: "#462682",
        },
        Unsubscribed: {
          name: "Unsubscribed",
          value: 0,
          fill: "#C3D772",
        },
      },
    });

  const [activities, setActivities] = useState([]);

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

  const [selectedRecActivityFilter, setSelectedRecActivityFilter] =
    useState<string>("");

  const fillMyCampaigns = (last3DaysCampaignData: any) => {
    const sortedCampaigns = last3DaysCampaignData.sort(
      (a: any, b: any) =>
        moment(b.scheduleTime).valueOf() - moment(a.scheduleTime).valueOf()
    );
    return sortedCampaigns.reduce((acc: any, val: any) => {
      acc[moment(val.scheduleTime).format("MMMM D")] =
        acc[moment(val.scheduleTime).format("MMMM D")] || [];
      acc[moment(val.scheduleTime).format("MMMM D")].push(val);
      return acc;
    }, {});
  };

  const [stats, setStats] = useState({
    executed: {
      title: "Total Journey",
      value: statData?.totalJourney,
      // icon: campaigns,
      resource: strings.campaign,
      redirection: {
        pathname: "",
      },
    },
    outbounds: {
      title: "Total Users",
      value: statData?.totalUser,

      resource: strings.campaign,
      redirection: {},
    },
    audience: {
      title: "Ongoing Journey",
      value: statData?.ongoingJourney,

      resource: strings.contact,
      redirection: {},
    },
  });

  const fillActivities = (activitiesData: any) => {
    const data = activitiesData.map((activity: any) => {
      return {
        ...activity,
        metadata: JSON.parse(activity.metadata),
      };
    });
    return data.sort(
      (a: any, b: any) =>
        moment(b.scheduleTime).valueOf() - moment(a.scheduleTime).valueOf()
    );
  };

  const updateAudienceChanged = (audience: Counts[]) => {
    let count = 0;
    audience.map((data) => {
      count = data.count;
    });
    return count;
  };

  const getUserName = () => {
    const name = userName.split(" ");
    if (name.length > 0) {
      return name[0];
    }
    return userName;
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

  const getAlerts = () => {
    const data = [
      {
        user: "User 1",
        journey: "Journey 1",
        startDate: "2024-01-01",
        endDate: "2024-01-10",
        imei: "5134634513663",
      },
      {
        user: "User 1",
        journey: "Journey 2",
        startDate: "2024-01-05",
        endDate: "2024-01-15",
        imei: "0917591237514",
      },
      {
        user: "User 1",
        journey: "Journey 3",
        startDate: "2024-01-10",
        endDate: "2024-01-20",
        imei: "089838592620",
      },
      {
        user: "User 1",
        journey: "Journey 4",
        startDate: "2024-01-15",
        endDate: "2024-01-25",
        imei: "25059710451920",
      },
    ];
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
                <Typography sx={classes.statsValue}>10</Typography>
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
                <Typography sx={classes.statsValue}>10</Typography>
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
                <Typography sx={classes.statsValue}>10</Typography>
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
                <Typography sx={classes.statsValue}>30</Typography>
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

  const getCampaignsList = () => {
    return (
      <Box id="Dashboard_My_Campaigns" sx={classes.container}>
        <Typography
          sx={classes.containerTitle}
          mt={0}
          position="static"
          top="0"
        >
          My Journeys
        </Typography>
        <Box
          minHeight={isDesktop ? "500px" : "250px"}
          height={isDesktop ? "660px" : "250px"}
          display="flex"
          sx={{
            overflow: "auto",
            scrollbarWidth: "thin",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box py={1} justifyContent="flex-start">
            {Object.keys(myCampaign)?.map((data: any) => {
              return (
                <>
                  <Typography sx={classes.campaignDate}>{data}</Typography>
                  {myCampaign[data].map((camp: any, index: number) => (
                    <Box display="flex" mb={2}>
                      <Box
                        sx={{
                          minWidth: "75px",
                          marginBottom: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <Typography sx={classes.dateRangeText}>
                          {convertESTtoUserLocalTime(camp.scheduleTime)}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          borderRight:
                            "4px solid " +
                            CAMPAIGN_COLORS[index % CAMPAIGN_COLORS.length],
                          borderRadius: "10px 0 0 10px",
                          marginBottom: "8px",
                        }}
                      ></Box>

                      <Box
                        ml={1}
                        onClick={() =>
                          camp.status === strings.Completed ||
                          camp.status === strings.Failed
                        }
                        sx={{ cursor: "pointer" }}
                      >
                        <Typography
                          sx={{
                            ...regularFont,
                            colo: "#1E1D1D",
                            fontSize: "14px",
                          }}
                        >
                          {camp.name}
                        </Typography>
                        <Typography sx={{ ...regularFont, color: "#B1B1B1" }}>
                          {camp.status}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </>
              );
            })}
          </Box>
          )
        </Box>
      </Box>
    );
  };

  const data = [
    { name: "Online", value: 30 },
    { name: "Offline", value: 20 },
  ];

  const COLORS = ["#845ADF", "#baa6ea"];

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
            md={5}
            lg={8}
            sx={{ display: "flex", margin: "1rem 0rem" }}
          >
            <Typography variant="h5" sx={classes.heading}>
              Alerts table
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

        <Grid container>
          <Grid item xs={12} sm={12} md={9} xl={9} lg={9}>
            <CustomTable
              headers={[
                { name: "IMEI", field: "imei" },
                { name: "Event", field: "event" },
                { name: "Latitude", field: "lat" },
                { name: "Longitude", field: "lng" },
                { name: "Message", field: "message" },
              ]}
              rows={[
                {
                  imei: "124245245154",
                  event: "demo event",
                  lat: "23.465123789",
                  lng: "21.456132198",
                  message: "Source G-310-20221207-0001",
                },
                {
                  imei: "124245245154",
                  event: "demo event",
                  lat: "23.465123789",
                  lng: "21.456132198",
                  message: "Source G-310-20221207-0001",
                },
                {
                  imei: "124245245154",
                  event: "demo event",
                  lat: "23.465123789",
                  lng: "21.456132198",
                  message: "Source G-310-20221207-0001",
                },
                {
                  imei: "124245245154",
                  event: "demo event",
                  lat: "23.465123789",
                  lng: "21.456132198",
                  message: "Source G-310-20221207-0001",
                },
                {
                  imei: "124245245154",
                  event: "demo event",
                  lat: "23.465123789",
                  lng: "21.456132198",
                  message: "Source G-310-20221207-0001",
                },
                {
                  imei: "124245245154",
                  event: "demo event",
                  lat: "23.465123789",
                  lng: "21.456132198",
                  message: "Source G-310-20221207-0001",
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={3} xl={3} lg={3}>
            <CustomTable
              headers={[
                { name: "Offline", field: "offline" },
                { name: "Last Data", field: "lastData" },
              ]}
              rows={[
                {
                  offline: "124245245154",
                  lastData: "05-Apr-2024 02:47 PM",
                },
                {
                  offline: "124245245154",
                  lastData: "05-Apr-2024 02:47 PM",
                },
                {
                  offline: "124245245154",
                  lastData: "05-Apr-2024 02:47 PM",
                },
                {
                  offline: "124245245154",
                  lastData: "05-Apr-2024 02:47 PM",
                },
                {
                  offline: "124245245154",
                  lastData: "05-Apr-2024 02:47 PM",
                },
                {
                  offline: "124245245154",
                  lastData: "05-Apr-2024 02:47 PM",
                },
              ]}
            />
          </Grid>
        </Grid>
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
