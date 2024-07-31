import React, { FC, useState } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  useTheme,
  Box,
  TextField,
  Autocomplete,
} from "@mui/material";

import { connect } from "react-redux";
import dashboardStyles from "../../Dashboard/DashboardStyles";

interface HeaderProps {
  local_varaiable: any;
}

const deviceGroups = [
  { label: "Group 1" },
  { label: "Group 2" },
  { label: "Group 3" },
  { label: "Group 4" },
];

const Header: FC<HeaderProps> = ({ local_varaiable }) => {
  const theme = useTheme();
  const classes = dashboardStyles;
  const [selectedDeviceGroup, setSelectedDeviceGroup] = useState<string | null>(
    null
  );

  return (
    <>
      <AppBar
        position="static"
        className="app-header"
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
        }}
      >
        <Toolbar className="main-header">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item></Grid>

            <Grid
              item
              xs={12}
              md={7}
              lg={4}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box sx={{ marginRight: "1rem" }}>
                <Autocomplete
                  sx={{
                    ...classes.emailDropDownStyle,
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    borderRadius: "5px",
                    width: "300px",
                  }}
                  value={selectedDeviceGroup}
                  onChange={(event, newValue) =>
                    setSelectedDeviceGroup(newValue)
                  }
                  options={deviceGroups.map((group) => group.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Device Group Filter"
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        sx: {
                          "& input": {
                            display: "flex",
                            alignItems: "center", 
                          },
                          "& .MuiInputBase-input::placeholder": {
                            textAlign: "center", 
                            opacity: 1, 
                          },
                          display: "flex",
                          alignItems: "center", 
                        },
                      }}
                    />
                  )}
                />
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps)(Header);
