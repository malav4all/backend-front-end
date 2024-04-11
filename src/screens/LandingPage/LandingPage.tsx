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
import ROUTEYE_LOGO from "../../assets/images/ROUTEYE_LOGO.png";
interface CustomProps {
  location?: Location;
}

const LandingPage = (props: CustomProps) => {
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
            backgroundColor: "#5F22E2",
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
              background: "#ffffff",
              overflowY: "auto",
              padding: "2rem",
              width: "40px",
              border: "1px solid rgb(236 239 241)",
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
                marginBottom: "2rem",
              }}
            >
              <Box component="img" src={ROUTEYE_LOGO} height={"50px"} />
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
