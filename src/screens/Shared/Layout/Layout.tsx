import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../../global/components/PrivateRoute/PrivateRoute";

import Dashboard from "../../Dashboard/Dashboard";

import AppDrawer from "../AppDrawer/AppDrawer";
import AppHeader from "../AppHeader/AppHeader";
import layoutStyles from "./Layout.styles";
import { useMediaQuery, useTheme } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { logOutAction, selectAuthenticated } from "../../../redux/authSlice";
import PageNotFound from "../../PageNotFound/PageNotFound";
import strings from "../../../global/constants/StringConstants";

import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import Settings from "../../Settings/Settings";
import { useIdleTimer } from "react-idle-timer";
import { onLogout } from "../../LandingPage/landingPageService";
import { store } from "../../../utils/store";
import history from "../../../utils/history";

const Layout = () => {
  const classes = layoutStyles;
  const [isLoading, setIsLoading] = useState(false);
  const [idleModal, setIdleModal] = useState(false);
  const isAuthenticated = useAppSelector(selectAuthenticated);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const handleOnIdle = () => {
    setIdleModal(true);
    const idleLogoutTime = 15;
    const lastActiveTime = getLastActiveTime();
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - lastActiveTime) / 1000 / 60;

    if (elapsedTime >= idleLogoutTime) {
      const _id = localStorage.getItem("userId");
      onLogout({ input: { _id } });
      localStorage.removeItem("userId");
      setTimeout(() => {
        history.push("/");
        store.dispatch(logOutAction());
      }, 1000);
    }
  };

  const { getLastActiveTime } = useIdleTimer({
    timeout: 15 * 1000 * 60,
    onIdle: handleOnIdle,
    debounce: 500,
  });

  const getContent = () => {
    return (
      <Box sx={classes.content}>
        <Switch>
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/dashboard"}
            component={Dashboard}
            componentName={strings.DASHBOARD}
          />

          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/settings"}
            component={Settings}
            componentName={strings.SETTINGS}
          />

          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={""}
            component={PageNotFound}
            componentName={strings.PAGENOTFOUND}
          />
        </Switch>
      </Box>
    );
  };

  const getLayout = () => {
    return isLoading ? (
      <CustomLoader isLoading />
    ) : (
      <>
        <Box>{!isDesktop && <AppHeader />}</Box>
        <Box sx={classes.root}>
          {isDesktop && <AppDrawer />}
          {getContent()}
        </Box>
      </>
    );
  };

  return getLayout();
};

export default Layout;
