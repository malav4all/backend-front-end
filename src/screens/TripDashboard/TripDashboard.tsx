import { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
} from "../../helpers/methods";
import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import strings from "../../global/constants/StringConstants";
import history from "../../utils/history";
import { useTitle } from "../../utils/UseTitle";
import { CustomButton, CustomInput } from "../../global/components";
import HereMap from "./components/HereMap";
import DashboardHeader from "./components/DashboardHeader";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlagIcon from "@mui/icons-material/Flag";
import { ListAllTrips } from "./service/TripDashboard.service";
import dashboardStyles from "./TripDashboardStyles";
import dummyData from "./TripDashboard.helper";
import { BsFillUnlockFill } from "react-icons/bs";
import { MdAccessTimeFilled } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { primaryColorPurple } from "../../utils/styles";
import { store } from "../../utils/store";
interface Trip {
  tripId: string;
  name: string;
  tripData: {
    vehicleNo: string;
  }[];
  startPoint: {
    name: string;
  };
  endPoint: {
    name: string;
  };
  status: string;
  tripEndDate: string;
  progress: string;
}

interface Stats {
  title: string;
  value: number;
  resource: string;
  redirection: {
    pathname?: string;
  };
}

const TripDashboard = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useTitle(strings.DashboardTitle);
  const classes = dashboardStyles;
  const [tripDashboardData, setTripDashboardData] = useState<Trip[]>([]);
  const [searchData, setSearchData] = useState<string>("");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalActiveTrips, setTotalActiveTrips] = useState<number>(0);
  const [lockStatus, setLockStatus] = useState("Unlock");
  const stats: Record<string, Stats> = {
    executed: {
      title: "Today's Trips",
      value: 56,
      resource: strings.campaign,
      redirection: {
        pathname: "",
      },
    },
    outbounds: {
      title: "Total Active Trips",
      value: totalActiveTrips,
      resource: strings.campaign,
      redirection: {},
    },
  };

  console.log(trips);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const variables = {
          input: {
            accountId: store.getState().auth.tenantId,
          },
        };
        const response = await ListAllTrips(variables);
        setTrips(response?.tripList?.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrips();
  }, []);

  useEffect(() => {
    getOngoingTrips(trips);
  }, [trips]);

  const getOngoingTrips = (trips: Trip[]) => {
    const ongoingTrips = trips.filter((trip) => trip.status === "ongoing");
    setTotalActiveTrips(ongoingTrips.length);
  };

  console.log(trips);

  const getTripList = () => {
    return (
      <Box
        sx={{
          padding: "2rem 1.5rem",
          backgroundColor: theme.palette.background.paper,
          border: "1px solid",
          borderColor: theme.palette.divider,
          borderRadius: "8px",
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
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
            borderLeft: "7px solid #5F22E1",
          }}
        >
          Trip List
        </Typography>
        <Box my={3}>{getSearchBar()}</Box>
        <Box sx={{ height: "75vh", overflowY: "auto", padding: "1rem" }}>
          {trips.map((trip) => {
            const progress = 80;

            return (
              <ListItem
                key={trip.tripId}
                sx={{
                  border: "1px solid",
                  borderColor: theme.palette.divider,
                  cursor: "pointer",
                  padding: "16px",
                  borderRadius: "12px",
                  marginBottom: "20px",
                  backgroundColor: theme.palette.background.paper,
                  transition: "all 0.3s ease",
                  alignItems: "flex-start",
                  "&:hover": {
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontFamily: "Geist_Bold",
                        fontSize: "1.3rem",
                        color: theme.palette.text.primary,
                        marginBottom: "0.8rem",
                      }}
                    >
                      {trip.tripData[0]?.vehicleNo}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <LocationOnIcon
                          sx={{
                            color: "#00C532",
                            marginRight: "8px",
                            fontSize: "1.2rem",
                          }}
                        />
                        <Typography
                          sx={{
                            fontFamily: "Geist_Regular",
                            fontSize: "0.9rem",
                            color: "#777",
                          }}
                        >
                          Source: {trip.startPoint?.name}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <FlagIcon
                          sx={{
                            color: "#F75151",
                            marginRight: "8px",
                            fontSize: "1.2rem",
                          }}
                        />
                        <Typography
                          sx={{
                            fontFamily: "Geist_Regular",
                            fontSize: "0.9rem",
                            color: "#777",
                          }}
                        >
                          Destination: {trip.endPoint?.name}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: "Geist_Bold",
                          fontSize: "1rem",
                          color: theme.palette.text.primary,
                          marginBottom: "12px",
                        }}
                      >
                        ETA: {formatDate(trip?.tripEndDate)}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "8px",
                        }}
                      >
                        <LinearProgress
                          variant="determinate"
                          value={progress}
                          sx={{
                            borderRadius: "6px",
                            height: "18px",
                            backgroundColor: "#ffffff",
                            flexGrow: 1,
                          }}
                        />
                        <Typography
                          sx={{
                            marginLeft: "8px",
                            fontFamily: "Geist_Regular",
                            fontSize: "0.9rem",
                            color: theme.palette.text.secondary,
                          }}
                        >
                          {Math.round(progress)}%
                        </Typography>
                      </Box>
                    </>
                  }
                />

                {/* {
            switch(trip.status) {
  case: "ended":
    <CustomButton
    label="Unlock"
    startIcon={<BsFillUnlockFill />}
    onClick={() => {}}
    customClasses={{
      padding: "8px 16px",
      borderRadius: "8px",
      textTransform: "none",
      backgroundColor: primaryColorPurple,
      color: "#fff",
    }}
  />
    break;
  case: "create":
    <CustomButton
    label="Create"
    startIcon={<BsFillUnlockFill />}
    onClick={() => {}}
    customClasses={{
      padding: "8px 16px",
      borderRadius: "8px",
      textTransform: "none",
      backgroundColor: primaryColorPurple,
      color: "#fff",
    }}
  />
    break;
  default:
    case: "started":
    <CustomButton
    label="Started"
    startIcon={<BsFillUnlockFill />}
    onClick={() => {}}
    customClasses={{
      padding: "8px 16px",
      borderRadius: "8px",
      textTransform: "none",
      backgroundColor: primaryColorPurple,
      color: "#fff",
    }}
  />
}
} */}
                {/* {trip.status === "ended" ? (
                  
                ) : (
                  <></>
                )} */}
              </ListItem>
            );
          })}
        </Box>
      </Box>
    );
  };

  function formatDate(dateString: any) {
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = String(date.getUTCFullYear()).slice(-2);
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return (
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.4rem",
          }}
        >
          <MdDateRange style={{ fontSize: "1.2rem" }} />{" "}
          <span>
            {" "}
            {day}/ {month}/ {year}
          </span>
        </span>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.4rem",
          }}
        >
          <MdAccessTimeFilled style={{ fontSize: "1.2rem" }} />
          <span>
            {hours}:{minutes}
          </span>
        </span>
      </span>
    );
  }

  const getStatsCard = () => {
    return (
      <Grid container spacing={3}>
        {Object.values(stats).map((stat) => (
          <Grid item xs={12} sm={12} md={6} xl={6} lg={6} key={stat.title}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              component={"div"}
              id="dashboard_stats"
              sx={{
                padding: "1rem 2rem",
                backgroundColor: theme.palette.background.paper,
                border: "1px solid",
                borderColor: theme.palette.divider,
                borderRadius: "8px",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                minHeight: "100px",
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Box
                sx={{
                  fontFamily: "Geist_Bold",
                  fontWeight: 700,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  color: theme.palette.text.primary,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Geist_Medium",
                    color: theme.palette.text.primary,
                    fontSize: "16px",
                  }}
                >
                  {stat.title}
                </Typography>
                <Typography sx={{ fontSize: "32px", fontWeight: 700 }}>
                  {stat.value}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  };

  const getMap = () => {
    return (
      <Box sx={{ position: "relative", height: "640px" }}>
        <HereMap />
      </Box>
    );
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search Trips"
        id="assetAssingment_search_field"
        onChange={debounceEventHandler(
          handleSearchOnChange,
          strings.SEARCH_TIME_OUT
        )}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          "& .MuiInputBase-root": {
            color: theme.palette.text.primary,
          },
          "& .MuiInputAdornment-root": {
            color: theme.palette.text.primary,
          },
        }}
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
      setSearchData(SearchEvent.target.value.trim().toLowerCase());
    } else {
      setSearchData("");
    }
  };

  const getDashboardBody = () => {
    return (
      <Grid container spacing={2} sx={{ padding: "1rem" }}>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {getTripList()}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={8}>
          <Grid item xs={12}>
            {getStatsCard()}
          </Grid>
          <Box
            sx={{
              padding: "2rem 1.5rem",
              backgroundColor: theme.palette.background.paper,
              border: "1px solid",
              borderColor: theme.palette.divider,
              borderRadius: "8px",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Geist_semibold",
                fontSize: "1.1rem",
                marginBottom: "1rem",
                padding: "0.2rem 0.8rem",
                borderRadius: "5px",
                borderLeft: "7px solid #5F22E1",
              }}
            >
              Trip Map View
            </Typography>

            {getMap()}
          </Box>
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
        margin: "auto",
      }}
    >
      {getDashboardBody()}
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default TripDashboard;
