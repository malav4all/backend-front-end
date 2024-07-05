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
import Geozone from "../../Geozone/Geozone";
import Journey from "../../Journey/Journey";
import ShowJourneyModal from "../../Journey/Component/ShowJourneyModal";
import ViewLiveTracking from "../../Journey/Component/LiveTracking";
import Trackplay from "../../Trackplay/Trackplay";
// import Reports from "../../Reports/screens/Reports";
import DistanceReport from "../../Reports/screens/DistanceReport/DistanceReport";
import AlertReport from "../../Reports/screens/AlertReport/AlertReport";
import DeviceDashboard from "../../DeviceDashboard/DeviceDashboard";
import { useSubscription } from "@apollo/client";
import { ALERTS_SUBSCRIPTION } from "../../Dashboard/service/Dashboard.mutation";
import {
  openErrorAlertNotification,
  openErrorNotification,
} from "../../../helpers/methods";
import Reports from "../../Reports/Report";
import ViewOfflineDevice from "../../Dashboard/components/ViewOfflineDevice";
import JourneyReport from "../../Reports/screens/JourneyReport/JourneyReport";
import UpcomingJourney from "../../Journey/screens/UpcomingJourney/UpcomingJourney";
import ArchivedJoruney from "../../Journey/screens/ArchivedJourney/ArchivedJourney";
import AssetAssingment from "../../Settings/AssertAssingment/AssetAssingment";
import AlertConfig from "../../AlertConfig/AlertConfig";
import DeviceGroup from "../../DeviceGroup/DeviceGroup";
import ViewDeviceGroupList from "../../DeviceGroup/components/ViewDeviceGroupList/ViewDeviceGroupList";
import Trip from "../../Trip/ActiveTrips/Trip";
import ArchivedTrips from "../../Trip/ArchivedTrips/ArchivedTrips";
import DeviceHistory from "../../Inventory/DeviceHistory/DeviceHistory";
import DeviceOnboarding from "../../Inventory/DeviceOnboarding/DeviceOnboarding";
import DeviceModule from "../../Inventory/DeviceModule/DeviceModule";

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
      // const _id = localStorage.getItem("userId");
      // onLogout({ input: { _id } });
      localStorage.removeItem("userId");
      setTimeout(() => {
        history.push("/");
        store.dispatch(logOutAction());
      }, 1000);
    }
  };

  const { data } = useSubscription(ALERTS_SUBSCRIPTION, {
    variables: { topic: "alerts/#" },
  });

  useEffect(() => {
    if (data?.alertUpdated?.message) {
      openErrorAlertNotification(data?.alertUpdated?.message);
    }
  }, [data]);

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
            path={"/asset-assignment"}
            component={AssetAssingment}
            componentName={strings.ASSET_ASSIGNMENT}
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
            path={"/location"}
            component={Geozone}
            componentName={strings.LOCATION}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/journey"}
            component={Journey}
            componentName={strings.JOURNEY}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/view-journey"}
            component={ShowJourneyModal}
            componentName={strings.VIEW_JOURNEY}
          />

          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/live-tracking"}
            component={ViewLiveTracking}
            componentName={strings.LIVE_TRACKING}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/reports"}
            component={Reports}
            componentName={strings.REPORTS}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/alert-reports"}
            component={AlertReport}
            componentName={strings.ALERT_REPORTS}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/distance-reports"}
            component={DistanceReport}
            componentName={strings.DISTANCE_REPORTS}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/journey-reports"}
            component={JourneyReport}
            componentName={strings.JOURNEY_REPORTS}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/live-tracking"}
            component={Trackplay}
            componentName={strings.TRACK_PLAY}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/device-dashboard"}
            component={DeviceDashboard}
            componentName={strings.DEVICEDASHBOARD}
          />

          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/trackplay"}
            component={Trackplay}
            componentName={strings.ACTIVE_JOURNEY}
          />

          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/upcoming-journey"}
            component={UpcomingJourney}
            componentName={strings.UPCOMING_JOURNEY}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/view-offline"}
            component={ViewOfflineDevice}
            componentName={strings.VIEW_OFFLINE}
          />

          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/archived-journey"}
            component={ArchivedJoruney}
            componentName={strings.ARCHIVED_JOURNEY}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/device-group"}
            component={DeviceGroup}
            componentName={strings.DEVICE_GROUP}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={`/device-group/view/:id`}
            component={ViewDeviceGroupList}
            componentName={strings.DEVICE_GROUP}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/alert-config"}
            component={AlertConfig}
            componentName={strings.ALERT_CONFIG}
          />

          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/alert-config"}
            component={AlertConfig}
            componentName={strings.ALERT_CONFIG}
          />

          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/active-trips"}
            component={Trip}
            componentName={strings.ACTIVE_TRIPS}
          />

          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/archived-trips"}
            component={ArchivedTrips}
            componentName={strings.ARCHIVED_TRIPS}
          />

          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/device-history"}
            component={DeviceHistory}
            componentName={strings.ARCHIVED_TRIPS}
          />

          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/device-module"}
            component={DeviceModule}
            componentName={strings.ARCHIVED_TRIPS}
          />

          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/device-onboarding"}
            component={DeviceOnboarding}
            componentName={strings.ARCHIVED_TRIPS}
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
