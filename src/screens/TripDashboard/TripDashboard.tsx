import { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Grid,
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
import dummyData from "./TripDashboard.helper";
import dashboardStyles from "./TripDashboardStyles";
import HereMap from "./components/HereMap";
import DashboardHeader from "./components/DashboardHeader";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlagIcon from "@mui/icons-material/Flag";
const TripDashboard = () => {
  const theme = useTheme();
  useTitle(strings.DashboardTitle);
  const classes = dashboardStyles;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tripDashboardData, setTripDashboardData] = useState([{}]);
  const [searchData, setSearchData] = useState<any>([]);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const trips = [
    {
      id: 1,
      name: "Name of Trip 1",
      tripID: "123123123212",
      vehicleNumber: "DL6T1234",
      ETA: "3hr 30min",
      source: "Source 1",
      destination: "Destination 1",
      progress: "40%",
    },
    {
      id: 2,
      name: "Name of Trip 2",
      tripID: "234234234323",
      vehicleNumber: "MH12AB5678",
      ETA: "2hr 15min",
      source: "Source 2",
      destination: "Destination 2",
      progress: "75%",
    },
    {
      id: 3,
      name: "Name of Trip 3",
      tripID: "345345345434",
      vehicleNumber: "KA05CD9876",
      ETA: "4hr 20min",
      source: "Source 3",
      destination: "Destination 3",
      progress: "20%",
    },
    {
      id: 4,
      name: "Name of Trip 4",
      tripID: "456456456545",
      vehicleNumber: "TN10EF6543",
      ETA: "1hr 45min",
      source: "Source 4",
      destination: "Destination 4",
      progress: "90%",
    },
    {
      id: 5,
      name: "Name of Trip 5",
      tripID: "567567567656",
      vehicleNumber: "UP32GH4321",
      ETA: "5hr 10min",
      source: "Source 5",
      destination: "Destination 5",
      progress: "60%",
    },
    {
      id: 6,
      name: "Name of Trip 6",
      tripID: "678678678767",
      vehicleNumber: "WB20IJ1234",
      ETA: "3hr 50min",
      source: "Source 6",
      destination: "Destination 6",
      progress: "30%",
    },
    {
      id: 7,
      name: "Name of Trip 7",
      tripID: "789789789878",
      vehicleNumber: "CG15KL5678",
      ETA: "2hr 05min",
      source: "Source 7",
      destination: "Destination 7",
      progress: "80%",
    },
    {
      id: 8,
      name: "Name of Trip 8",
      tripID: "890890890989",
      vehicleNumber: "HR26MN4321",
      ETA: "6hr 30min",
      source: "Source 8",
      destination: "Destination 8",
      progress: "50%",
    },
    {
      id: 9,
      name: "Name of Trip 9",
      tripID: "901901901010",
      vehicleNumber: "GJ01OP9876",
      ETA: "1hr 25min",
      source: "Source 9",
      destination: "Destination 9",
      progress: "95%",
    },
    {
      id: 10,
      name: "Name of Trip 10",
      tripID: "012012012121",
      vehicleNumber: "RJ14QR6543",
      ETA: "4hr 05min",
      source: "Source 10",
      destination: "Destination 10",
      progress: "70%",
    },
    {
      id: 11,
      name: "Name of Trip 11",
      tripID: "123456789012",
      vehicleNumber: "MP09ST1234",
      ETA: "3hr 10min",
      source: "Source 11",
      destination: "Destination 11",
      progress: "25%",
    },
  ];

  const stats = {
    executed: {
      title: "Total Trips Today",
      value: 56,
      resource: strings.campaign,
      redirection: {
        pathname: "",
      },
    },
    outbounds: {
      title: "Active Trips",
      value: 98,
      resource: strings.campaign,
      redirection: {},
    },
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
              key={trip.id}
              sx={{
                border: "1px solid rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                padding: "12px", // Reduced padding
                borderRadius: "8px",
                marginBottom: "12px", // Reduced margin
                backgroundColor: "#fff",
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
                      fontSize: "1.2rem", // Reduced font size
                      color: "#333",
                      marginTop: "-0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {trip.vehicleNumber}
                  </Typography>
                }
                secondary={
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "4px", // Reduced margin
                      }}
                    >
                      <LocationOnIcon
                        sx={{
                          color: "#00C532",
                          marginRight: "4px", // Reduced margin
                          fontSize: "1rem", // Reduced icon size
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily: "Geist_Regular",
                          fontSize: "0.8rem", // Reduced font size
                          color: "#999",
                        }}
                      >
                        Source: {trip.source}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "2px", // Reduced margin
                      }}
                    >
                      <FlagIcon
                        sx={{
                          color: "#F75151",
                          marginRight: "4px", // Reduced margin
                          fontSize: "1rem", // Reduced icon size
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily: "Geist_Regular",
                          fontSize: "0.8rem", // Reduced font size
                          color: "#999",
                        }}
                      >
                        Destination: {trip.destination}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: "Geist_Bold",
                        fontSize: "0.9rem", // Reduced font size
                        color: "#333",
                        marginTop: "12px", // Reduced margin
                      }}
                    >
                      ETA: {trip.ETA}
                    </Typography>
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "Geist_Regular",
                          fontSize: "0.8rem", // Reduced font size
                          color: "#999",
                        }}
                        align="right"
                      >
                        {trip.progress} completed
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={parseInt(trip.progress)}
                      sx={{
                        height: "10px", // Reduced height
                        borderRadius: "5px",
                        backgroundColor: "#e0e0e0",
                        "& .MuiLinearProgress-bar": {
                          backgroundImage:
                            "linear-gradient(90deg, #783aff, #5F22E1)",
                          borderRadius: "5px",
                        },
                      }}
                    />
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
      setTripDashboardData(dummyData);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      openErrorNotification(error.message);
    }
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
                  ? history.push(stat.redirection)
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
              Trip ID: {selectedTrip.tripID}
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
              Source: {selectedTrip.source}
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
              Destination: {selectedTrip.destination}
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
      {/* {getDashboardHeader()} */}
      <Box>
        <DashboardHeader />
      </Box>
      {getDashboardBody()}
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default TripDashboard;
