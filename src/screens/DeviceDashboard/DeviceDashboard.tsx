import { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { options } from "./DashboardData";
import { useAppSelector } from "../../utils/hooks";
import { selectName } from "../../redux/authSlice";

import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
} from "../../helpers/methods";

import dashboardStyles from "./DashboardStyles";

import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import strings from "../../global/constants/StringConstants";
import history from "../../utils/history";
import { useTitle } from "../../utils/UseTitle";
import { fetchDashboardDetail } from "./service/Dashboard.service";
import dummyData, {
  deviceDashboardTableHeader,
} from "./DeviceDashboard.helper";
import { CustomInput, CustomTable } from "../../global/components";

const DeviceDashboard = () => {
  useTitle(strings.DashboardTitle);
  const classes = dashboardStyles;
  const userName = useAppSelector(selectName);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deviceDashboardData, setDeviceDashboardData] = useState([{}]);
  const [statData, setStatData] = useState<any>();

  const getStatData = async () => {
    try {
      const statData = await fetchDashboardDetail();
      setStatData(statData.fetchDashboardDetail.data);
    } catch (err) {
      console.log(err);
    }
  };

  const stats = {
    executed: {
      title: "Online Devices",
      value: statData?.totalJourney,
      //   icon: campaigns,
      resource: strings.campaign,
      redirection: {
        pathname: "",
      },
    },
    outbounds: {
      title: "Offline Devices",
      value: statData?.totalUser,
      //   icon: campaigns,
      resource: strings.campaign,
      redirection: {},
    },
    audience: {
      title: "Total Devices",
      value: statData?.ongoingJourney,
      //   icon: campaigns,
      resource: strings.contact,
      redirection: {},
    },
  };

  const fetchDeviceDashboardHandler = async () => {
    try {
      setIsLoading(true);
      //   const res = await fetchJourney({
      //     input: {
      //       page,
      //       limit: 10,
      //     },
      //   });

      //   const data = tableRender(res.fetchJourney.data);
      setDeviceDashboardData(dummyData);
      //   setCount(res.fetchJourney.paginatorInfo.count);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      openErrorNotification(error.message);
    }
  };

  const getDashboardHeader = () => {
    return (
      <Grid
        container
        sx={classes.header}
        xs={12}
        md={12}
        lg={12}
        xl={12}
        width="100%"
      >
        <Grid item xs={12} md={5} lg={8} sx={{ display: "flex" }}>
          <Typography variant="h5" sx={classes.heading}></Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={7}
          lg={4}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Typography
              sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              Interval
            </Typography>
            <Select
              id="Dashboard_Interval_Dropdown"
              sx={classes.dropdown}
              value={""}
              onChange={(event: any) => {}}
            >
              {options.map((data) => (
                <MenuItem
                  key={data.label}
                  value={data.value}
                  sx={classes.dropdownOptions}
                >
                  {data.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>
      </Grid>
    );
  };

  const getStatsCard = () => {
    return (
      <Grid container spacing={2}>
        {Object.values(stats).map((stat: any) => (
          <Grid item xs={12} sm={12} md={4} xl={4} lg={4}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              component={"div"}
              id="dashboard_stats"
              sx={{
                padding: "1rem 1.5rem",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.07)",
                cursor: isTruthy(stat.redirection) ? "pointer" : "auto",
              }}
              onClick={() =>
                isTruthy(stat.redirection)
                  ? history.push(stat.redirection)
                  : null
              }
            >
              <Box>
                <Typography sx={classes.statsTitle}>{stat.title}</Typography>
                <Typography sx={classes.statsValue}>10</Typography>
              </Box>

              <Box>
                <img src={stat.icon} width={60} height={60} />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  };

  const getCustomTable = () => {
    return (
      <Box
        id="campaign_history_display_table"
        sx={{
          minWidth: "300px",
          width: "100%",
          overflow: "auto",
        }}
      >
        <CustomTable
          headers={deviceDashboardTableHeader}
          rows={deviceDashboardData}
          //   size={[5]}
          //   handlePageChange={
          //     searchJourney ? handleSearchChangePage : handleChangePage
          //   }
          //   handleRowsPerPage={handlePerPageData}
          //   paginationCount={count}
          // rowsPerPage={rowsPerPage}
          //   pageNumber={page}
          //   setPage={setPage}
          //   handlePerPageData={handlePerPageData}
          //   perPageData={rowsPerPage}
          //   rowsPerPage={rowsPerPage}
        />
      </Box>
    );
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search Devices..."
        id="assetAssingment_search_field"
        onChange={debounceEventHandler(
          handleSearchOnChange,
          strings.SEARCH_TIME_OUT
        )}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  };

  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      // setSearchJourney(SearchEvent.target.value.replace(/\s/g, ""));
      // setPage(1);
      // setRowsPerPage(10);
    } else {
      // setSearchJourney("");
    }
  };

  const getDashboardBody = () => {
    return (
      <Grid
        container
        spacing={2}
        sx={{ padding: "0 16px", marginTop: "-48px" }}
        xs={12}
      >
        <Grid item xs={12} sm={12} xl={12} md={9} lg={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              {getStatsCard()}
            </Grid>

            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Grid container xs={12} md={12} lg={12} xl={12} width="100%">
                <Grid
                  item
                  xs={12}
                  md={5}
                  lg={8}
                  sx={{ display: "flex", margin: "1rem 0rem" }}
                ></Grid>

                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexWrap: "wrap",
                    backgroundColor: "white",
                    boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.07)",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "2rem",
                    }}
                  >
                    <Typography variant="h5" sx={classes.heading}>
                      All Devices table
                    </Typography>

                    {getSearchBar()}
                  </Grid>
                  {getCustomTable()}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  useEffect(() => {
    fetchDeviceDashboardHandler();
  }, []);

  useEffect(() => {
    getStatData();
  }, []);

  return (
    <Box>
      {getDashboardHeader()}
      {getDashboardBody()}
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default DeviceDashboard;
