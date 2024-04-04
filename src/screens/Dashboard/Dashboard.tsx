import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import {
  options,
  Counts,
  CampaignRecipientCounts,
  RecentCampaignStats,
  CampaignCounts,
  Last3DaysCampaigns,
  getRecentActivityOptions,
} from "./DashboardData";
import { useAppSelector } from "../../utils/hooks";
import { selectName } from "../../redux/authSlice";
import thoughtsimg from "../../assets/images/dashboard/quotesimage.webp";
import upgradenow from "../../assets/images/dashboard/upgradenow.svg";
import spaceshuttle from "../../assets/images/dashboard/spaceshuttle.svg";
import campaigns from "../../assets/images/dashboard/campaigns.svg";
import email from "../../assets/images/dashboard/emails.svg";
import recipients from "../../assets/images/dashboard/recipients.svg";
import { theme, regularFont } from "../../utils/styles";
import {
  convertESTtoUserLocalTime,
  getFormattedStatsCount,
  isTruthy,
  openErrorNotification,
} from "../../helpers/methods";
import notifiers from "../../global/constants/NotificationConstants";
import moment from "moment-timezone";
import dashboardStyles from "./DashboardStyles";
import RecentCampaignStatsChart from "./components/Chart/RecentCampaignStatschart";
import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import CampaignRecipientPieChart from "./components/Chart/CampaignRecipientPieChart";
import strings from "../../global/constants/StringConstants";
import history from "../../utils/history";
import norecentactivity from "../../assets/images/dashboard/norecentactivity.svg";
import { useTitle } from "../../utils/UseTitle";
import { useDispatch } from "react-redux";
import { fetchDashboardDetail } from "./service/Dashboard.service";

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
      icon: campaigns,
      resource: strings.campaign,
      redirection: {
        pathname: "",
      },
    },
    outbounds: {
      title: "Total Users",
      value: statData?.totalUser,
      icon: email,
      resource: strings.campaign,
      redirection: {},
    },
    audience: {
      title: "Ongoing Journey",
      value: statData?.ongoingJourney,
      icon: recipients,
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

  const fillCampaignRecipientState = (campaignRecipientCount: Counts[]) => {
    const localCampaignRecipientStats = campaignRecipientStats;
    let outboundCount = 0;
    campaignRecipientCount.forEach((stat: Counts) => {
      if (stat.name === "Requested") {
        localCampaignRecipientStats["Total"].value = stat.count;
        outboundCount = stat.count;
      }
      if (localCampaignRecipientStats.hasOwnProperty(stat.name)) {
        localCampaignRecipientStats[stat.name].value = stat.count;
      }
    });
    return { localCampaignRecipientStats, outboundCount };
  };

  const fillRecentCampaignState = (campaignStats: Counts[]) => {
    const localState = campaignStats;
    const returnObj: CampaignCounts = recentCampaignStats.stats;
    localState.forEach((stat) => {
      if (returnObj.hasOwnProperty(stat.name)) {
        returnObj[stat.name].value = stat.count;
      }
    });
    return returnObj;
  };

  const updateExecutedCampaigns = (campaignMetrics: Counts[]) => {
    let count = 0;
    campaignMetrics.forEach((data) => {
      if (data.name === "Completed" || data.name === "Failed") {
        count += data.count;
      }
    });
    return count;
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
          <Box>
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
                padding: "8px",
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

  const getPermissionPlaceholder = (name: string) => {
    return (
      <Stack direction="column" justifyContent="center" alignItems="center">
        <img src={norecentactivity} alt="forbidden" width="70%" />
        <Box sx={{ textAlign: "center" }} p={1}></Box>
      </Stack>
    );
  };

  const getNoActivityPlaceholder = (title: string, subtitle: string) => {
    return (
      <Stack direction="column" justifyContent="center" alignItems="center">
        <img src={norecentactivity} alt={title} width="100%" />
        <Box sx={{ textAlign: "center" }} p={1}>
          <Typography sx={classes.noactivityheading}>{title}</Typography>
          <Typography sx={{ ...regularFont, textAlign: "center" }}>
            {subtitle}
          </Typography>
        </Box>
      </Stack>
    );
  };

  const getCampaignerRecipientsGraph = () => {
    return (
      <Box id="Dashboard_Campaign_Recipients" sx={classes.container}>
        <Typography sx={classes.containerTitle} gutterBottom>
          Ongoing Journey
        </Typography>
        {getPermissionPlaceholder("Campaign Recipients")}
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

  const getRecentActivitiesCampaign = () => {
    return (
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={6}
          alignItems="center"
          justifyContent="center"
          id="Dashboard_Recent_Activities"
        >
          <Box sx={classes.container}>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={classes.containerTitle}>
                Recent Activities
              </Typography>
              <FormControl>
                <Select
                  id="Dashboard_Recent_Activity_Dropdown"
                  sx={classes.recactivitydropdown}
                  value={selectedRecActivityFilter}
                  onChange={(event: any) =>
                    setSelectedRecActivityFilter(event.target.value)
                  }
                >
                  {[].map((data: any) => (
                    <MenuItem
                      key={data.label}
                      sx={classes.dropdownOptions}
                      value={data.value}
                    >
                      {data.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Box
              minHeight={isDesktop ? "300px" : "250px"}
              height={isDesktop ? "325px" : "250px"}
              display="flex"
              justifyContent="center"
              sx={{
                overflow: "auto",
                scrollbarWidth: "thin",
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <Box sx={{ width: "100%" }}>
                {isTruthy(activities) ? (
                  activities.map((activity: any) => {
                    return (
                      <Stack direction="column" mt={2}>
                        <Stack direction="row">
                          <Typography sx={classes.dashboardDataSize}>
                            {activity.event == "Audience" ? (
                              `${activity.metadata.count} contacts were imported for ${activity.metadata.name}`
                            ) : (
                              <Stack direction="row" alignItems="center">
                                <Typography sx={classes.dashboardDataSize}>
                                  {activity.metadata.name}
                                </Typography>{" "}
                                <Box sx={classes.statusBox}>
                                  {activity.metadata.status}
                                </Box>
                              </Stack>
                            )}
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          mb={1}
                        >
                          <Typography sx={classes.dates}>
                            {moment(activity.eventDate).format("MMMM Do, yyyy")}
                          </Typography>
                          <Box
                            sx={{
                              borderRadius: "50%",
                              height: "5px",
                              width: "5px",
                              backgroundColor: "#595959",
                            }}
                          ></Box>
                          <Typography sx={classes.tags}>
                            {activity.event}
                          </Typography>
                        </Stack>
                        <Divider />
                      </Stack>
                    );
                  })
                ) : (
                  <Box minHeight="300px" display="flex">
                    {getNoActivityPlaceholder(
                      "No Activity",
                      "It appears that nothing has happened recently!"
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={6}
          mt={{ sm: 2, xs: 2, md: 0, lg: 0, xl: 0 }}
          id="Dashboard_Recent_Campaigns"
        >
          <Box sx={classes.container} minHeight="300px">
            <Typography sx={classes.containerTitle}>Recent Activity</Typography>
            <Box onClick={() => {}} sx={{ cursor: "pointer" }}>
              <Typography sx={{ ...regularFont, color: "#929292" }}>
                {recentCampaignStats.name}
              </Typography>
            </Box>
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
              {getStatsCard()}
            </Grid>
            <Grid mb={isDesktop ? 2 : 0} item xs={12} md={8} lg={9} xl={9}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  {getCampaignerRecipientsGraph()}
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <Box mb={2}>{getRecentActivitiesCampaign()}</Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3} lg={3} xl={3}>
              {getCampaignsList()}
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
