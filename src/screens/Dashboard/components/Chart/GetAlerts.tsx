import { Box, Grid, Typography, useTheme } from "@mui/material";
import { FaBell } from "react-icons/fa6";
import dashboardStyles from "../../DashboardStyles";

const GetAlerts = () => {
  const theme = useTheme();
  const classes = dashboardStyles;
  return (
    <Box
      id="Alerts_pannel"
      sx={{
        marginTop: "1rem",
        backgroundColor: "transparent",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} xl={3} lg={3}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="start"
            component={"div"}
            id="dashboard_stats"
            sx={{
              padding: "2rem 1.5rem",
              backgroundColor: theme.palette.background.paper,
              borderRadius: "8px",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              border: "1px solid",
              borderColor: theme.palette.divider,
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
                  color: theme.palette.text.secondary,
                  fontSize: "18px",
                }}
              >
                Tamper/Misc
              </Typography>
              <Typography sx={classes.statsValue}>
                79
              </Typography>
            </Box>

            <Box
              sx={{
                fontSize: "1rem",
                color: "white",
                padding: "0.7rem",
                borderRadius: "5px",
                backgroundColor: "#855BDE",
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
            alignItems="start"
            component={"div"}
            id="dashboard_stats"
            sx={{
              padding: "2rem 1.5rem",
              backgroundColor: theme.palette.background.paper,
              borderRadius: "8px",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              border: "1px solid",
              borderColor: theme.palette.divider,
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
                  color: theme.palette.text.secondary,
                  fontSize: "18px",
                }}
              >
                Lock/Unlock
              </Typography>

              <Typography sx={classes.statsValue}>
                357
              </Typography>
            </Box>

            <Box
              sx={{
                fontSize: "1rem",
                color: "white",
                padding: "0.7rem",
                borderRadius: "5px",
                backgroundColor: "#855BDE",
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
            alignItems="start"
            component={"div"}
            id="dashboard_stats"
            sx={{
              padding: "2rem 1.5rem",
              backgroundColor: theme.palette.background.paper,
              borderRadius: "8px",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              border: "1px solid",
              borderColor: theme.palette.divider,
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
                  color: theme.palette.text.secondary,
                  fontSize: "18px",
                }}
              >
                Geozone In/Out
              </Typography>
              <Typography sx={classes.statsValue}>
                951
              </Typography>
            </Box>

            <Box
              sx={{
                fontSize: "1rem",
                color: "white",
                padding: "0.7rem",
                borderRadius: "5px",
                backgroundColor: "#855BDE",
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
            alignItems="start"
            component={"div"}
            id="dashboard_stats"
            sx={{
              padding: "2rem 1.5rem",
              backgroundColor: theme.palette.background.paper,
              borderRadius: "8px",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              border: "1px solid",
              borderColor: theme.palette.divider,
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
                  color: theme.palette.text.secondary,
                  fontSize: "18px",
                }}
              >
                Total Alerts
              </Typography>
              <Typography sx={classes.statsValue}>456</Typography>
            </Box>

            <Box
              sx={{
                fontSize: "1rem",
                color: "white",
                padding: "0.7rem",
                borderRadius: "5px",
                backgroundColor: "#855BDE",
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

export default GetAlerts;
