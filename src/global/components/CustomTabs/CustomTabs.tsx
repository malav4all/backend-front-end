import React, { useEffect, useState } from "react";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import customTabsStyles from "./CustomTabs.styles";

interface TabConfig {
  label: string;
  count?: number | null;
}

interface CustomProps {
  changeValue: (value: string) => void;
  selected: string;
  tabConfig: TabConfig[];
  redirectTabValue?: string;
  state?: any;
  containerId?: string;
}

const CustomTabs: React.FC<CustomProps> = ({
  changeValue,
  selected,
  tabConfig,
  redirectTabValue,
  state,
  containerId,
}) => {
  const classes = customTabsStyles;
  const [value, setValue] = useState<string>(selected);

  useEffect(() => {
    if (redirectTabValue) {
      setValue(redirectTabValue);
    }
  }, [redirectTabValue, state]);

  useEffect(() => {
    setValue(selected);
  }, [selected]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    changeValue(newValue);
    setValue(newValue);
  };

  const getStyle = (isActive: boolean) => {
    return isActive ? classes.active : classes.inActive;
  };

  return (
    <Box id={containerId}>
      <Stack
        direction="row"
        justifyContent={{ lg: "flex-start", sm: "flex-start", xs: "flex-start" }}
      >
        <Tabs
          sx={classes.tab}
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{
            style: {
              display: "none",
            },
          }}
        >
          {tabConfig.map((tab) => (
            <Tab
              key={tab.label}
              sx={{ padding: "8px" }}
              label={
                <Box sx={classes.tabBox} style={getStyle(value === tab.label)}>
                  <Typography sx={classes.tabText}>
                    {tab.label}
                    {tab.count !== 0 && (
                      <Box sx={classes.counts}> {tab.count} </Box>
                    )}
                  </Typography>
                </Box>
              }
              value={tab.label}
            />
          ))}
        </Tabs>
      </Stack>
    </Box>
  );
};

export default CustomTabs;
