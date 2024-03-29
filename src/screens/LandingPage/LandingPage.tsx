import { useMediaQuery, Box, Grid } from "@mui/material";
import { theme } from "../../utils/styles";
import landingPageStyles from "./LandingPage.styles";
import { useAppSelector } from "../../utils/hooks";
import { selectAuthenticated } from "../../redux/authSlice";
import history from "../../utils/history";
import { Location } from "history";
import strings from "../../global/constants/StringConstants";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import logo from "../../assets/icons/IMZ-logo.png";
import loginvector from "../../assets/images/login_vector.png";
import ResetPassword from "./components/ResetPassword";
import ActivateUser from "./components/ActivateUser";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

interface CustomProps {
  location?: Location;
}

const LandingPage = (props: CustomProps) => {
  const classes = landingPageStyles;
  const siteKeyReCaptch = strings.siteKey;
  const reRef = useRef<ReCAPTCHA | null>(null);
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const isAuthenticated = useAppSelector(selectAuthenticated);

  const staticImageComponent = () => {
    return (
      <Box
        sx={{
          height: "100vh",
          backgroundColor: "#EBEDFF",
          display: "flex",
          justifyItems: "center",
        }}
      >
        <img
          src={"https://i.ibb.co/k1WbZGS/login-screen-1.png"}
          height="auto"
          width="100%"
          style={{ objectFit: "fill" }}
        />
      </Box>
    );
  };

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
        <Grid container justifyContent="center">
          {isDesktop && (
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
              {staticImageComponent()}
            </Grid>
          )}
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={4}
            xl={4}
            position="relative"
            style={{
              background: "#F9F9F9",
              height: "100vh",
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "2rem"
              }}
            >
              <Box
                component="img"
                src={"https://i.ibb.co/d4SVSTp/Microsoft-Teams-image.png"}
                sx={classes.logo}
                height={"50px"}
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
