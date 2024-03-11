import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import customTabsStyles from "./CustomTabs.styles";

interface TabConfig {
  label: string;
  count?: number | null;
  // [key: string]: string[];
}

interface CustomProps {
  changeValue: Function;
  selected: string;
  tabConfig: any;
  redirectTabValue?: string;
  state?: any;
  containerId?: string;
}

const CustomTabs = (props: CustomProps) => {
  const classes = customTabsStyles;
  const [value, setValue] = useState(props.selected);

  useEffect(() => {
    if (props?.redirectTabValue) {
      setValue(props?.redirectTabValue);
    }
  }, [props?.redirectTabValue, props?.state]);

  useEffect(() => {
    setValue(props.selected);
  }, [props.selected]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    props.changeValue(newValue);
    setValue(newValue);
  };

  const getStyle = (isActive: boolean) => {
    return isActive ? classes.active : classes.inActive;
  };

  return (
    <Box id={props?.containerId}>
      <Stack
        direction="row"
        justifyContent={{
          lg: "flex-start",
          sm: "flex-start",
          xs: "flex-start",
        }}
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
          {props.tabConfig?.map((tab: TabConfig) => {
            return (
              <Tab
                sx={{ padding: "8px" }}
                label={
                  <Box
                    sx={classes.tabBox}
                    style={getStyle(value === tab.label)}
                  >
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
            );
          })}
        </Tabs>
      </Stack>
    </Box>
  );
};

export default CustomTabs;
