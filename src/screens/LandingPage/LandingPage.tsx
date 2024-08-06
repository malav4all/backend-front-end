import { useMediaQuery, Box, Grid, useTheme } from "@mui/material";
import landingPageStyles from "./LandingPage.styles";
import { useAppSelector } from "../../utils/hooks";
import { selectAuthenticated } from "../../redux/authSlice";
import history from "../../utils/history";
import { Location } from "history";
import strings from "../../global/constants/StringConstants";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import ROUTEYE_LOGO from "../../assets/images/ROUTEYE_LOGO.png";
import login_background from '../../assets/images/login_background.png'
import { url } from "inspector";
interface CustomProps {
  location?: Location;
}

const LandingPage = (props: CustomProps) => {
  const theme = useTheme();
  const classes = landingPageStyles;
  const siteKeyReCaptch = strings.siteKey;
  const reRef = useRef<ReCAPTCHA | null>(null);
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const isAuthenticated = useAppSelector(selectAuthenticated);

  const getComponentBasedOnURL = () => {
    const location = props.location?.pathname?.split("/")[1].toLowerCase();
    switch (location) {
      case strings.LOGIN: {
        return <Login />;
      }

      case strings.FORGOT_PASSWORD: {
        return <ForgotPassword />;
      }

      case strings.RESET_PASSWORD: {
        return <ResetPassword />;
      }

      default: {
        return <Login />;
      }
    }
  };

  const getLandingPage = () => {
    return (
      <Box>
        <Grid
          container
          justifyContent="center"
          sx={{
            alignItems: "center",
            height: "100vh",
            backgroundImage: `url(${login_background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Grid
            item
            xs={12}
            sm={10}
            md={5}
            lg={4}
            xl={3}
            style={{
              background: theme.palette.dialogColor.body,
              borderColor: theme.palette.dialogColor.border,
              overflowY: "auto",
              padding: "2rem",
              width: "40px",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
              borderRadius: "0.5rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <Box
                component="img"
                src={ROUTEYE_LOGO}
                height={"30px"}
                sx={{ marginBottom: "1rem" }}
              />
            </Box>

            <Box>{getComponentBasedOnURL()}</Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  if (isAuthenticated) {
    history.push("/dashboard");
    return null;
  }
  return getLandingPage();
};

export default LandingPage;
