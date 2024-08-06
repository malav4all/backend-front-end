import { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Grid,
  InputAdornment,
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
  useTitle(strings.DashboardTitle);
  const classes = dashboardStyles;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tripDashboardData, setTripDashboardData] = useState<Trip[]>([]);
  const [searchData, setSearchData] = useState<string>("");
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalActiveTrips, setTotalActiveTrips] = useState<number>(0);

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

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const variables = {
          input: {
            accountId: "IMZ113343",
          },
        };
        const response = await ListAllTrips(variables);
        setTrips(response?.tripList?.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
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
            fontFamily: "Geist_Light",
            fontSize: "1.5rem",
            marginBottom: "0.5rem",
            padding: "0.2rem 0.8rem",
            borderRadius: "5px",
            borderLeft: "7px solid #5F22E1",
          }}
        >
          Trip List
        </Typography>
        <Box my={3}>{getSearchBar()}</Box>
        <Box sx={{ height: "400px", overflowY: "auto", padding: "1rem" }}>
          {trips.map((trip) => (
            <ListItem
              key={trip.tripId}
              sx={{
                border: "1px solid rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "12px",
                backgroundColor: theme.palette.background.paper,
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  transform: "translateY(-2px)",
                },
              }}
              onClick={() => setSelectedTrip(trip)}
            >
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontFamily: "Geist_Bold",
                      fontSize: "1.2rem",
                      color: "#333",
                      marginTop: "-0.5rem",
                      marginBottom: "0.5rem",
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
                        marginTop: "4px",
                      }}
                    >
                      <LocationOnIcon
                        sx={{
                          color: "#00C532",
                          marginRight: "4px",
                          fontSize: "1rem",
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily: "Geist_Regular",
                          fontSize: "0.8rem",
                          color: "#999",
                        }}
                      >
                        Source: {trip.startPoint?.name}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "2px",
                      }}
                    >
                      <FlagIcon
                        sx={{
                          color: "#F75151",
                          marginRight: "4px",
                          fontSize: "1rem",
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily: "Geist_Regular",
                          fontSize: "0.8rem",
                          color: "#999",
                        }}
                      >
                        Destination: {trip.endPoint?.name}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: "Geist_Bold",
                        fontSize: "0.9rem",
                        color: "#333",
                        marginTop: "12px",
                      }}
                    >
                      ETA: {trip?.tripEndDate}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </Box>
      </Box>
    );
  };

  const fetchTripDashboardHandler = async () => {
    try {
      setIsLoading(true);
      // Replace dummyData with actual data fetching logic
      setTripDashboardData(dummyData as any);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      openErrorNotification(error.message);
    }
  };

  const getStatsCard = () => {
    return (
      <Grid container spacing={2}>
        {Object.values(stats).map((stat) => (
          <Grid item xs={12} sm={12} md={6} xl={6} lg={6} key={stat.title}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              component={"div"}
              id="dashboard_stats"
              sx={{
                padding: "2rem 1.5rem",
                backgroundColor: theme.palette.background.paper,
                border: "1px solid",
                borderColor: theme.palette.divider,
                borderRadius: "8px",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              }}
              onClick={() =>
                isTruthy(stat.redirection)
                  ? history.push(stat.redirection.pathname || "")
                  : null
              }
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
                    fontSize: "18px",
                  }}
                >
                  {stat.title}
                </Typography>
                <Typography sx={classes.statsValue}>{stat.value}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  };

  const getMap = () => {
    return (
      <Box sx={{ position: "relative", height: "670px" }}>
        <HereMap />
        {selectedTrip && (
          <Paper
            sx={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              padding: "1rem",
              backgroundColor: "#ffffffcc", // Semi-transparent white
              border: "1px solid",
              borderColor: theme.palette.divider,
              borderRadius: "12px",
              boxShadow:
                "0 10px 30px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05)",
              zIndex: 10,
              width: "40%",
              minWidth: "385px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Geist_Medium",
                fontSize: "1.2rem",
                marginBottom: "1rem",
                color: "#333",
              }}
            >
              {selectedTrip.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Geist_Light",
                fontSize: "1rem",
                color: "#666",
              }}
            >
              Trip ID: {selectedTrip?.tripId}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Geist_Light",
                fontSize: "1rem",
                marginTop: "0.5rem",
                color: "#666",
              }}
            >
              Source: {selectedTrip?.startPoint?.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Geist_Light",
                fontSize: "1rem",
                marginTop: "0.5rem",
                color: "#666",
              }}
            >
              Destination: {selectedTrip?.endPoint?.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
                width: "100%",
              }}
            >
              <CustomButton
                label="Unlock"
                onClick={() => {
                  // Add your onClick
                }}
              />
              <CustomButton
                label="Device Details"
                onClick={() => {
                  // Add your onClick
                }}
              />
              <CustomButton
                label="Trip Details"
                onClick={() => {
                  // Add your onClick
                }}
              />
            </Box>
          </Paper>
        )}
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
              {getStatsCard()}
            </Grid>
            <Grid item xs={12}>
              {getTripList()}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8}>
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
                fontFamily: "Geist_Light",
                fontSize: "1.5rem",
                marginBottom: "0.5rem",
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

  useEffect(() => {
    fetchTripDashboardHandler();
  }, []);

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

export default TripDashboard;
