import { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Chip,
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
import dummyData from "./TripDashboard.helper";
import dashboardStyles from "./TripDashboardStyles";
import HereMap from "./components/HereMap";
import DashboardHeader from "./components/DashboardHeader";
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
      source: "Source 1",
      destination: "Destination 1",
    },
    {
      id: 2,
      name: "Name of Trip 2",
      tripID: "123123123212",
      source: "Source 2",
      destination: "Destination 2",
    },
    {
      id: 3,
      name: "Name of Trip 3",
      tripID: "123123123212",
      source: "Source 3",
      destination: "Destination 3",
    },
    {
      id: 4,
      name: "Name of Trip 4",
      tripID: "123123123212",
      source: "Source 4",
      destination: "Destination 4",
    },
    {
      id: 5,
      name: "Name of Trip 5",
      tripID: "123123123212",
      source: "Source 5",
      destination: "Destination 5",
    },
    {
      id: 6,
      name: "Name of Trip 6",
      tripID: "123123123212",
      source: "Source 6",
      destination: "Destination 6",
    },
    {
      id: 7,
      name: "Name of Trip 7",
      tripID: "123123123212",
      source: "Source 7",
      destination: "Destination 7",
    },
    {
      id: 8,
      name: "Name of Trip 8",
      tripID: "123123123212",
      source: "Source 8",
      destination: "Destination 8",
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
        <Box sx={{ height: "400px", overflowY: "auto" }}>
          {console.log(trips)}
          {trips.map((trip) => (
            <ListItem
              key={trip.id}
              sx={{ borderBottom: "1px solid #ddd", cursor: "pointer" }}
              onClick={() => setSelectedTrip(trip)}
            >
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontFamily: "Geist_Bold",
                      fontSize: "1rem",
                    }}
                  >
                    {trip.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      sx={{
                        fontFamily: "Geist_Regular",
                        fontSize: "0.8rem",
                      }}
                    >
                      Trip ID: {trip.tripID}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Geist_Light",
                        fontSize: "0.9rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      Source: {trip.source}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Geist_Light",
                        fontSize: "0.9rem",
                      }}
                    >
                      Destination: {trip.destination}
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
              backgroundColor: theme.palette.background.paper,
              border: "1px solid",
              borderColor: theme.palette.divider,
              borderRadius: "8px",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
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
              }}
            >
              {selectedTrip.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontFamily: "Geist_Light", fontSize: "1rem" }}
            >
              Trip ID: {selectedTrip.tripID}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Geist_Light",
                fontSize: "1rem",
                marginTop: "0.5rem",
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
                label={"Request OTP"}
                onClick={() => {
                  // Add your onClick handler here
                }}
              />
              <CustomButton
                label={"Device Details"}
                onClick={() => {
                  // Add your onClick handler here
                }}
              />
              <CustomButton
                label={"Trip Details"}
                onClick={() => {
                  // Add your onClick handler here
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
              All Devices Table
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
