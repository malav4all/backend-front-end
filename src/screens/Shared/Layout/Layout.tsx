import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../../global/components/PrivateRoute/PrivateRoute";
import Dashboard from "../../Dashboard/Dashboard";
import AppDrawer from "../AppDrawer/AppDrawer";
import AppHeader from "../AppHeader/AppHeader";
import layoutStyles from "./Layout.styles";
import { useMediaQuery, useTheme } from "@mui/material";
import { useAppSelector } from "../../../utils/hooks";
import { logOutAction, selectAuthenticated } from "../../../redux/authSlice";
import PageNotFound from "../../PageNotFound/PageNotFound";
import strings from "../../../global/constants/StringConstants";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import Settings from "../../Settings/Settings";
import { useIdleTimer } from "react-idle-timer";
import { store } from "../../../utils/store";
import history from "../../../utils/history";
import Geozone from "../../Geozone/Geozone";
import Routes from "../../Routes/Routes";
import ShowRoutesModal from "../../Routes/Component/ShowRoutesModal";
import ViewLiveTracking from "../../Routes/Component/LiveTracking";
import Trackplay from "../../Trackplay/Trackplay";
import DistanceReport from "../../Reports/screens/DistanceReport/DistanceReport";
import AlertReport from "../../Reports/screens/AlertReport/AlertReport";
import { useSubscription } from "@apollo/client";
import { ALERTS_SUBSCRIPTION } from "../../Dashboard/service/Dashboard.mutation";
import { openErrorAlertNotification } from "../../../helpers/methods";
import Reports from "../../Reports/Report";
import ViewOfflineDevice from "../../Dashboard/components/ViewOfflineDevice";
import UpcomingRoutes from "../../Routes/screens/UpcomingRoutes/UpcomingRoutes";
import ArchivedJoruney from "../../Routes/screens/ArchivedRoutes/ArchivedRoutes";
import AssetAssingment from "../../Settings/AssertAssingment/AssetAssingment";
import AlertConfig from "../../AlertConfig/AlertConfig";
import DeviceGroup from "../../DeviceGroup/DeviceGroup";
import ViewDeviceGroupList from "../../DeviceGroup/components/ViewDeviceGroupList/ViewDeviceGroupList";
import Trip from "../../Trip/ActiveTrips/Trip";
import ArchivedTrips from "../../Trip/ArchivedTrips/ArchivedTrips";
import DeviceHistory from "../../Inventory/DeviceHistory/DeviceHistory";
import DeviceOnboarding from "../../Inventory/DeviceOnboarding/DeviceOnboarding";
import DeviceModule from "../../Inventory/DeviceModule/DeviceModule";
import FormBuilderPage from "../../FormBuilder/FormBuilderPage";
import Users from "../../Settings/Users/Users";
import Industry from "../../Settings/Industry/Industry";
import CustomerModule from "../../Settings/CustomerModule/CustomerModule";
import Account from "../../Settings/Account/Account";
import LocationType from "../../Settings/LocationType/LocationType";
import Entity from "../../Trip/Entity/Entity";
import EntityType from "../../Trip/EntityType/EntityType";
import TripType from "../../Trip/TripType/TripType";
import UserAccess from "../../Trip/UserAccess/UserAccess";
import AddDevice from "../../AddDevice/AddDevice";
import DeviceTransfer from "../../DeviceTransfer/DeviceTransfer";
import TripDashboard from "../../TripDashboard/TripDashboard";
import Datapush from "../../Settings/DataPush/Datapush";
import TripReport from "../../Reports/screens/TripReport/TripReport";
import MapView from "../../MapView/MapView";

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
            path={"/trip-dashboard"}
            component={TripDashboard}
            componentName={strings.TRIPDASHBOARD}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/map-view"}
            component={MapView}
            componentName={strings.MAPVIEW}
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
            path={"/routes"}
            component={Routes}
            componentName={strings.ROUTES}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/view-routes"}
            component={ShowRoutesModal}
            componentName={strings.VIEW_ROUTES}
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
            path={"/trip-reports"}
            component={TripReport}
            componentName={strings.TRIP_REPORT}
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
            path={"/trackplay"}
            component={Trackplay}
            componentName={strings.ACTIVE_ROUTES}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/upcoming-routes"}
            component={UpcomingRoutes}
            componentName={strings.UPCOMING_ROUTES}
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
            path={"/archived-routes"}
            component={ArchivedJoruney}
            componentName={strings.ARCHIVED_ROUTES}
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
            path={"/form-builder"}
            component={FormBuilderPage}
            componentName={strings.FORM_BUILDER}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/device-history"}
            component={DeviceHistory}
            componentName={strings.DEVICE_HISTORY}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/device-module"}
            component={DeviceModule}
            componentName={strings.DEVICE_MODULE}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/device-list"}
            component={DeviceModule}
            componentName={strings.DEVICE_LIST}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/add-device"}
            component={AddDevice}
            componentName={strings.ADD_DEVICE}
          />

          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/device-transfer"}
            component={DeviceTransfer}
            componentName={strings.DEVICE_TRANSFER}
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
            path={"/settings/Users"}
            component={Users}
            componentName={strings.USERS}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/settings/Industry"}
            component={Industry}
            componentName={strings.INDUSTRY}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/settings/Module"}
            component={CustomerModule}
            componentName={strings.MODULE}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/settings/Account"}
            component={Account}
            componentName={strings.ACCOUNT}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/settings/LocationType"}
            component={LocationType}
            componentName={strings.LOCATIONTYPE}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/settings/Datapush"}
            component={Datapush}
            componentName={strings.DATAPUSH}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/entity"}
            component={Entity}
            componentName={strings.LOCATIONTYPE}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/entity-type"}
            component={EntityType}
            componentName={strings.LOCATIONTYPE}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/trip-type"}
            component={TripType}
            componentName={strings.TRIPT_TYPE}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/user-access"}
            component={UserAccess}
            componentName={strings.TRIPT_TYPE}
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
