import { useEffect, useState } from "react";
import { CustomAppHeader } from "../../global/components";
import SettingStyles from "./Reports.styles";
import { Box, Grid, Stack, Typography } from "@mui/material";
import CustomTabs from "../../global/components/CustomTabs/CustomTabs";
import strings from "../../global/constants/StringConstants";
import { tabConfig } from "./ReportsHelpers";
import { isAdmin } from "../../utils/AuthorizationManager";
import UnauthorizedPage from "../UnauthorizedPage/UnauthorizedPage";

// import Users from "./Users/Users";
import { useLocation } from "react-router-dom";
import { validateTabValue } from "../../helpers/methods";
import Users from "../Settings/Users/Users";
// import AssetAssingment from "./AssertAssingment/AssetAssingment";
// import LocationType from "./LocationType/LocationType";

const Reports = () => {
  const classes = SettingStyles;
  const urlParams = new URLSearchParams(useLocation().search);
  const tabValueName = validateTabValue(urlParams.get("tabValue"));
  const [tabValue, setTabValue] = useState<string>(tabValueName!);

  useEffect(() => {
    window.history.replaceState(null, "", `?tabValue=${tabValue}`);
  }, [tabValue]);

  const handleChange = (newValue: string) => {
    setTabValue(newValue);
  };

  const tabDataHandler = () => {
    return (
      <CustomAppHeader className={classes.headerBackgroundColor}>
        <Box ml={1}>
          <Typography style={classes.settingsTitle}>My Reports</Typography>
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
      // case strings.ASSETASSIGNMENT:
      //   // return <AssetAssingment />;
      // case strings.LOCATIONTYPE:
      //   // return <LocationType />;
      // default:
      //   // return <Users />;
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

export default Reports;
