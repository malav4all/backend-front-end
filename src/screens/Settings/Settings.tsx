import { useEffect, useState } from "react";
import { CustomAppHeader } from "../../global/components";
import SettingStyles from "./Setting.styles";
import { Box, Grid, Stack, Typography } from "@mui/material";
import CustomTabs from "../../global/components/CustomTabs/CustomTabs";
import strings from "../../global/constants/StringConstants";
import { tabConfig } from "./SettingsHelpers";
import { isAdmin } from "../../utils/AuthorizationManager";
import UnauthorizedPage from "../UnauthorizedPage/UnauthorizedPage";

import Users from "./Users/Users";
import { useLocation, useHistory } from "react-router-dom";
import { validateTabValue } from "../../helpers/methods";
import AssetAssingment from "./AssertAssingment/AssetAssingment";
import LocationType from "./LocationType/LocationType";
import Account from "./Account/Account";
import Industry from "./Industry/Industry";
import CustomerModule from "./CustomerModule/CustomerModule";
import { RoleManagement } from "./RoleManagement/RoleManagement";

const Settings = () => {
  const classes = SettingStyles;
  const location = useLocation();
  const history = useHistory();
  const urlParams = new URLSearchParams(location.search);
  const tabValueName = validateTabValue(urlParams.get("tabValue"));
  const [tabValue, setTabValue] = useState<string>(tabValueName!);

  useEffect(() => {
    const tabValueName = validateTabValue(urlParams.get("tabValue"));
    if (tabValueName !== tabValue) {
      setTabValue(tabValueName!);
    }
  }, [location.search]);

  const handleChange = (newValue: string) => {
    setTabValue(newValue);
    history.push(`?tabValue=${newValue}`);
  };

  const tabDataHandler = () => {
    return (
      <CustomAppHeader className={classes.headerBackgroundColor}>
        <Box ml={1}>
          <Typography style={classes.settingsTitle}>Settings</Typography>
        </Box>
        <Stack
          direction={{ lg: "row", md: "column", sm: "column", xs: "column" }}
          justifyContent="space-between"
          mt={2}
        >
          <CustomTabs
            changeValue={handleChange}
            selected={tabValue}
            tabConfig={tabConfig()}
          />
        </Stack>
      </CustomAppHeader>
    );
  };

  const viewTabDataHandler = () => {
    switch (tabValue) {
      case strings.USERS:
        return isAdmin() ? (
          <Users />
        ) : (
          <UnauthorizedPage pageName={strings.USERS} />
        );
      case strings.INDUSTRY:
        return <Industry />;
      case strings.MODULE:
        return <CustomerModule />;
      case strings.ROLE_MANAGEMENT:
        return <RoleManagement />;
      case strings.ACCOUNT:
        return <Account />;
      case strings.LOCATIONTYPE:
        return <LocationType />;
      default:
        return <Users />;
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box>{tabDataHandler()}</Box>
        </Grid>
      </Grid>
      {viewTabDataHandler()}
    </>
  );
};

export default Settings;
