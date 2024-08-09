import { Box, Grid, Typography, useTheme } from "@mui/material";
import { FaBell } from "react-icons/fa6";
import dashboardStyles from "../../DashboardStyles";
import { headerColor } from "../../../../utils/styles";
import { IoLockClosed } from "react-icons/io5";
import { PiPlugsConnectedBold } from "react-icons/pi";
import { TbPlugConnected } from "react-icons/tb";
const GetAlerts = ({ data }: any) => {
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
        <Grid item xs={12} sm={12} md={12} xl={4} lg={4}>
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
                Total Devices
              </Typography>
              <Typography sx={classes.statsValue}>
                {data?.totalDeviceCount}
              </Typography>
            </Box>

            <Box
              sx={{
                fontSize: "2rem",
                color: "white",
                padding: "0.7rem",
                borderRadius: "5px",
                backgroundColor: headerColor,
              }}
            >
              <IoLockClosed />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={12} xl={4} lg={4}>
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
                Online Devices
              </Typography>
              <Typography sx={classes.statsValue}>{data?.online}</Typography>
            </Box>

            <Box
              sx={{
                fontSize: "2rem",
                color: "white",
                padding: "0.7rem",
                borderRadius: "5px",
                backgroundColor: headerColor,
              }}
            >
              <PiPlugsConnectedBold />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={12} xl={4} lg={4}>
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
                Offline Devices
              </Typography>
              <Typography sx={classes.statsValue}> {data?.offline}</Typography>
            </Box>

            <Box
              sx={{
                fontSize: "2rem",
                color: "white",
                padding: "0.7rem",
                borderRadius: "5px",
                backgroundColor: headerColor,
              }}
            >
              <TbPlugConnected />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GetAlerts;
