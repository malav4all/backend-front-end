import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Switch, useLocation } from "react-router-dom";
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
import { DEVICE_DATA } from "../../Dashboard/service/Dashboard.mutation";
import { openWarningNotification } from "../../../helpers/methods";
import Reports from "../../Reports/Report";
import ViewOfflineDevice from "../../Dashboard/components/ViewOfflineDevice";
import UpcomingRoutes from "../../Routes/screens/UpcomingRoutes/UpcomingRoutes";
import ArchivedJoruney from "../../Routes/screens/ArchivedRoutes/ArchivedRoutes";
import AssetAssingment from "../../Settings/AssertAssingment/AssetAssingment";
import AlertConfig from "../../AlertConfig/AlertConfig";
import DeviceGroup from "../../DeviceGroup/DeviceGroup";
import ViewDeviceGroupList from "../../DeviceGroup/components/ViewDeviceGroupList/ViewDeviceGroupList";
import ArchivedTrips from "../../Trip/ArchivedTrips/ArchivedTrips";
import DeviceHistory from "../../Inventory/DeviceHistory/DeviceHistory";
import DeviceOnboarding from "../../Inventory/DeviceOnboarding/DeviceOnboarding";
import DeviceModule from "../../Inventory/DeviceModule/DeviceModule";
import Users from "../../Settings/Users/Users";
import Industry from "../../Settings/Industry/Industry";
import CustomerModule from "../../Settings/CustomerModule/CustomerModule";
import Account from "../../Settings/Account/Account";
import LocationType from "../../Settings/LocationType/LocationType";
import Entity from "../../Trip/Entity/Entity";
import EntityType from "../../Trip/EntityType/EntityType";
import TripType from "../../Trip/TripType/TripType";
import AddDevice from "../../AddDevice/AddDevice";
import DeviceTransfer from "../../DeviceTransfer/DeviceTransfer";
import TripDashboard from "../../TripDashboard/TripDashboard";
import Datapush from "../../Settings/DataPush/Datapush";
import TripReport from "../../Reports/screens/TripReport/TripReport";
import MapView from "../../MapView/MapView";
import FormBuilder from "../../FormBuild/FormBuild";
import Builder from "../../FormBuild/components/Builder";
import AddTrip from "../../Trip/ActiveTrips/AddTrips/AddTrip";
import ViewTrip from "../../Trip/ActiveTrips/ViewTrip/ViewTrip";
import Trips from "../../Trip/ActiveTrips/Trips";
import urls from "../../../global/constants/UrlConstants";
import TripAccess from "../../Trip/UserAccess/UserAccess";
import DeviceList from "../../DeviceList/DeviceList";
import HeaderNavbar from "../../Dashboard/components/HeaderNavbar";
import { RoleManagement } from "../../Settings/RoleManagement/RoleManagement";
import TripTrackplay from "../../TripTrackplay/TripTrackplay";
import TripAlertReport from "../../TripAlertReport/TripAlertReport";

const Layout = () => {
  const classes = layoutStyles;
  const [isLoading, setIsLoading] = useState(false);
  const [idleModal, setIdleModal] = useState(false);
  const isAuthenticated = useAppSelector(selectAuthenticated);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const location = useLocation();
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

  const { data } = useSubscription(DEVICE_DATA, {
    variables: {
      topicType: "alert",
      accountId: store.getState().auth.tenantId,
      imeis: [],
    },
  });

  useEffect(() => {
    if (data?.track) {
      const trackJson = JSON.parse(data.track);
      openWarningNotification(
        `${trackJson?.alert}`,
        trackJson?.parsedData?.imei
      );
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
        {!(
          location.pathname === "/map-view" ||
          location.pathname === "/location" ||
          location.pathname === "/geozone"
        ) && (
          <Box sx={classes.navbarPosition}>
            <HeaderNavbar />
          </Box>
        )}
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
            path={"/trip-view"}
            component={TripDashboard}
            componentName={strings.TRIPVIEW}
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
            path={"/geozone"}
            component={Geozone}
            componentName={strings.GEOZONE}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/device-list"}
            component={DeviceList}
            componentName={strings.DEVICE_LIST}
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
            componentName={strings.ALERT}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/distance-reports"}
            component={DistanceReport}
            componentName={strings.DISTANCE}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/trip-reports"}
            component={TripReport}
            componentName={strings.TRIP}
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
            path={"/triptrackplay"}
            component={TripTrackplay}
            componentName={"TripTrackplay"}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/tripAlertReport"}
            component={TripAlertReport}
            componentName={"TripAlertReport"}
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
            path={"/alerts"}
            component={AlertConfig}
            componentName={strings.ALERT_CONFIG}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            componentName={strings.TRIPS}
            path={urls.tripsViewPath}
            component={Trips}
          />

          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            componentName={strings.TRIPS}
            path={[urls.addTripViewPath, `${urls.editTripViewPath}`]}
            component={AddTrip}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            componentName={strings.TRIPS}
            path={`${urls.viewTripViewPath}/:id`}
            component={ViewTrip}
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
            component={FormBuilder}
            componentName={strings.FORM_BUILDER}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={`/builder/:id`}
            component={Builder}
            componentName={"BUILDER"}
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
            component={DeviceOnboarding}
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
            componentName={strings.DEVICE_ONBOARDING}
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
            componentName={strings.CUSTOMER_MODULE}
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
            path={"/LocationType"}
            component={LocationType}
            componentName={strings.LOCATIONTYPE}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/settings/Role"}
            component={RoleManagement}
            componentName={strings.ROLE_MANAGEMENT}
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
            componentName={strings.ENTITY}
          />
          <PrivateRoute
            exact
            isLoggedIn={isAuthenticated}
            path={"/entity-type"}
            component={EntityType}
            componentName={strings.ENTITY_TYPE}
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
            path={"/trip-access"}
            component={TripAccess}
            componentName={strings.TRIP_ACCESS}
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
