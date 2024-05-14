import { useState, useEffect } from "react";
import { Box, Chip, Grid, MenuItem, Select, Typography } from "@mui/material";
import { useAppSelector } from "../../utils/hooks";
import { selectName } from "../../redux/authSlice";
import { FcInfo } from "react-icons/fc";
import moment from "moment-timezone";
import dashboardStyles from "./DashboardStyles";
import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import strings from "../../global/constants/StringConstants";
import history from "../../utils/history";
import { useTitle } from "../../utils/UseTitle";
import { alertRowData, statusDevice } from "./service/Dashboard.service";
import { FaBell } from "react-icons/fa6";
import CustomTable from "../../global/components/CustomTable/CustomTable";
import { isTruthy, openErrorNotification } from "../../helpers/methods";
import { weekValue, weekValueNextMonth } from "./DashboardData";
import { CustomButton, CustomDialog } from "../../global/components";
import CustomDatePicker from "../../global/components/CustomDatePicker/CustomDatePicker";
interface CustomDateRange {
  fromDate: string;
  toDate: string;
}

const Dashboard = () => {
  const initialState: any = {
    fromDate: moment().clone().subtract(1, "month").toISOString(),
    toDate: moment().toISOString(),
  };
  useTitle(strings.DashboardTitle);
  const classes = dashboardStyles;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [offlinePage, setOfflinePage] = useState(1);
  const [offlineLimit, setOfflineLimit] = useState(10);
  const [offlineCount, setOfflineCount] = useState<number>(0);
  const [alertTableData, setAlertTableData] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    startDate: moment().clone().subtract(30, "minutes").toISOString(),
    endDate: moment().toISOString(),
  });
  const [offlineDateFilter, setOfflineDateFilter] = useState({
    startDate: moment().clone().subtract(30, "minutes").toISOString(),
    endDate: moment().toISOString(),
  });
  const [selectedRange, setSelectedRange] = useState("Past 30m");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statData, setStatData] = useState<any>([]);
  const [dateRange, setDateRange] = useState<CustomDateRange>(initialState);
  const [openModal, setOpenModal] = useState(false);
  const [lastSelectedRange, setLastSelectedRange] = useState({
    startDate: moment().clone().subtract(30, "minutes").toISOString(),
    endDate: moment().toISOString(),
  });

  useEffect(() => {
    const fetchData = async () => {
      if (dateFilter) {
        try {
          const res = await alertRowData({
            input: {
              startDate: dateFilter.startDate,
              endDate: dateFilter.endDate,
              page,
              limit,
            },
          });
          const alertTableDataValue = res?.getAlertData?.data?.map(
            (item: any) => ({
              imei: item.imei,
              label: item.label,
              mode: item.mode,
              event: item.event,
              message: item.message,
              source: item.source,
              time: moment(item.time).fromNow(),
              action: (
                <span style={{ color: "#845ADF" }}>
                  <FcInfo />
                </span>
              ),
            })
          );
          setAlertTableData(alertTableDataValue);
          setCount(res?.getAlertData?.paginatorInfo?.count);
        } catch (error: any) {
          openErrorNotification(error.message);
        }
      }
    };

    const intervalId = setInterval(fetchData, 500000);
    fetchData();

    return () => clearInterval(intervalId);
  }, [dateFilter, page, limit]);

  useEffect(() => {
    const fetchData = async () => {
      if (offlineDateFilter) {
        try {
          const res = await statusDevice({
            input: {
              startDate: offlineDateFilter.startDate,
              endDate: offlineDateFilter.endDate,
              page: offlinePage,
              limit: offlineLimit,
            },
          });
          setOfflineCount(res?.getStatusDevice?.paginatorInfo?.count);
          const deviceStatus = res?.getStatusDevice?.data?.map(
            (item: any, index: number) => ({
              id: index,
              imei: item.imei,
              label: item.label,
              status: (
                <Chip
                  label={item.status}
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    border: "1px solid white",
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                      "0%": {
                        transform: "scale(1)",
                        opacity: 1,
                      },
                      "50%": {
                        transform: "scale(1.05)",
                        opacity: 0.75,
                      },
                      "100%": {
                        transform: "scale(1)",
                        opacity: 1,
                      },
                    },
                  }}
                  variant="filled"
                />
              ),
              time: moment(item.time).fromNow(),
              action: (
                <span style={{ color: "#845ADF" }}>
                  <FcInfo
                    onClick={() => {
                      history.push({
                        pathname: "/view-offline",
                        state: {
                          data: item,
                        },
                      });
                    }}
                  />
                </span>
              ),
            })
          );
          setStatData(deviceStatus);
        } catch (error: any) {
          openErrorNotification(error.message);
        }
      }
    };

    const intervalId = setInterval(fetchData, 500000);
    fetchData();

    return () => clearInterval(intervalId);
  }, [offlineDateFilter, offlinePage, offlineLimit]);

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
          {/* <Typography variant="h5" sx={classes.heading}>
            Hello, {getUserName()}!
          </Typography> */}
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
            <Select
              id="campaigns_interval_dropdown"
              sx={classes.dropDownStyle}
              value={selectedRange}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              renderValue={() => selectedRange}
            >
              <MenuItem value="Past 1m" sx={classes.optionStyle}>
                Past 1m
              </MenuItem>
              <MenuItem value="Past 5m" sx={classes.optionStyle}>
                Past 5m
              </MenuItem>
              <MenuItem value="Past 15m" sx={classes.optionStyle}>
                Past 15m
              </MenuItem>
              <MenuItem value="Past 30m" sx={classes.optionStyle}>
                Past 30m
              </MenuItem>
              <MenuItem
                value="Custom"
                onClick={CustomChange}
                sx={classes.optionStyle}
              >
                Custom
              </MenuItem>
            </Select>
          </Box>
        </Grid>
      </Grid>
    );
  };

  const CustomChange = () => {
    setOpenModal(true);
    setDateRange({
      fromDate: lastSelectedRange.startDate,
      toDate: lastSelectedRange.endDate,
    });
  };

  const handleCloseModel = () => {
    setOpenModal(false);
  };

  const datePickerChanged = () => {
    setDateFilter({
      startDate: dateRange.fromDate,
      endDate: dateRange.toDate,
    });
    setOfflineDateFilter({
      startDate: dateRange.fromDate,
      endDate: dateRange.toDate,
    });
    handleCloseModel();
  };

  const addEmailsDialogFooter = () => {
    return (
      <>
        <Box mt={3} width={"100%"} mb={3}>
          <Box sx={classes.buttonWrapper} gap={3}>
            <CustomButton
              label="Cancel"
              onClick={() => handleCloseModel()}
              customClasses={{ width: "110px" }}
              // variant={"outlined"}
            />
            <CustomButton
              label={"Submit"}
              onClick={() => {
                datePickerChanged();
              }}
              customClasses={{ width: "110px" }}
              // buttonType={"contained"}
            />
          </Box>
        </Box>
      </>
    );
  };

  const handleDaterangeChange = (value: string, date: string) => {
    const formattedDate =
      value && value != "Invalid Date" ? moment(value).toISOString() : null;
    setDateRange({
      ...dateRange,
      [date]: formattedDate,
    });
  };

  const customDate = () => {
    return (
      <>
        <Box
          mt={5}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box>
            <CustomDatePicker
              handleDaterangeChange={handleDaterangeChange}
              dateRange={dateRange}
              customWidth={{
                xl: "480px",
                lg: "480px",
                md: "320px",
                sm: "260px",
                xs: "260px",
              }}
              toDate="toDate"
              fromDate="fromDate"
              labelFirst="From Date"
              labelSecond="To Date"
              labelWidth={{
                xl: "250px",
                lg: "250px",
                md: "160px",
                sm: "130px",
                xs: "130px",
              }}
              placeholderstart="Select From Date"
              placeholderend="Select To Date"
            />
          </Box>
        </Box>
      </>
    );
  };

  const customDialog = () => {
    return (
      <CustomDialog
        isDialogOpen={openModal}
        handleDialogClose={handleCloseModel}
        dialogBodyContent={customDate()}
        dialogFooterContent={addEmailsDialogFooter()}
        width="550px"
        closable={true}
        // closeIcon={true}
        closeButtonVisibility
        // cancelIcon={true}
        borderRadius="33px"
      />
    );
  };

  const handleChange = (event: any) => {
    setSelectedRange(event.target.value);
    const now = moment();
    let startDate, endDate;
    switch (event.target.value) {
      case "Past 1m":
        startDate = now.clone().subtract(1, "minutes").toISOString();
        endDate = now.toISOString();
        break;
      case "Past 5m":
        startDate = now.clone().subtract(5, "minutes").toISOString();
        endDate = now.toISOString();
        break;
      case "Past 15m":
        startDate = now.clone().subtract(15, "minutes").toISOString();
        endDate = now.toISOString();
        break;
      case "Past 30m":
        startDate = now.clone().subtract(30, "minutes").toISOString();
        endDate = now.toISOString();
        break;
      case "Custom":
        startDate = lastSelectedRange.startDate;
        endDate = lastSelectedRange.endDate;
        break;
      default:
        startDate = now.clone().subtract(30, "minutes").toISOString();
        endDate = now.toISOString();
        break;
    }
    if (event.target.value !== "Custom") {
      setLastSelectedRange({ startDate, endDate });
    }
    setDateFilter({
      startDate: startDate,
      endDate: endDate,
    });

    setOfflineDateFilter({
      startDate: startDate,
      endDate: endDate,
    });
  };

  const getAlerts = () => {
    return (
      <Box
        id="Alerts_pannel"
        sx={{
          marginTop: "1rem",
          backgroundColor: "#ffffff00",
        }}
      >
        {/* <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: "Bold",
            marginTop: "-0.5rem",
          }}
          gutterBottom
        >
          Alerts
        </Typography> */}

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} xl={3} lg={3}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="start"
              component={"div"}
              id="dashboard_stats"
              sx={{
                padding: "2rem 1.5rem",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              }}
            >
              <Box
                sx={{
                  fontFamily: "Geist_Bold",
                  fontWeight: 700,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  color: "#3C424Dad",
                }}
              >
                <Typography sx={{ fontFamily: "Geist_Medium" }}>
                  Tamper/Misc
                </Typography>
                <Typography sx={classes.statsValue}>
                  {
                    alertTableData.filter((item: any) => item.event === "other")
                      .length
                  }
                </Typography>
              </Box>

              <Box
                sx={{
                  fontSize: "1rem",
                  color: "white",
                  padding: "0.7rem",
                  borderRadius: "5px",
                  backgroundColor: "#855BDE",
                }}
              >
                <FaBell />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} xl={3} lg={3}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="start"
              component={"div"}
              id="dashboard_stats"
              sx={{
                padding: "2rem 1.5rem",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              }}
            >
              <Box
                sx={{
                  fontFamily: "Geist_Bold",
                  fontWeight: 700,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  color: "#3C424D",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Geist_Medium",
                    color: "#3C424Dad",
                    fontSize: "18px",
                  }}
                >
                  Lock/Unlock
                </Typography>

                <Typography sx={classes.statsValue}>
                  {alertTableData.filter((item: any) => item.event === "locked")
                    .length +
                    alertTableData.filter(
                      (item: any) => item.event === "unlocked"
                    ).length}
                </Typography>
              </Box>

              <Box
                sx={{
                  fontSize: "1rem",
                  color: "white",
                  padding: "0.7rem",
                  borderRadius: "5px",
                  backgroundColor: "#855BDE",
                }}
              >
                <FaBell />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} xl={3} lg={3}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="start"
              component={"div"}
              id="dashboard_stats"
              sx={{
                padding: "2rem 1.5rem",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              }}
            >
              <Box
                sx={{
                  fontFamily: "Geist_Bold",
                  fontWeight: 700,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  color: "#3C424D",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Geist_Medium",
                    color: "#3C424Dad",
                    fontSize: "18px",
                  }}
                >
                  Geozone In/Out
                </Typography>
                <Typography sx={classes.statsValue}>
                  {alertTableData.filter(
                    (item: any) => item.event === "geo_exit"
                  ).length +
                    alertTableData.filter(
                      (item: any) => item.event === "geo_entry"
                    ).length}
                </Typography>
              </Box>

              <Box
                sx={{
                  fontSize: "1rem",
                  color: "white",
                  padding: "0.7rem",
                  borderRadius: "5px",
                  backgroundColor: "#855BDE",
                }}
              >
                <FaBell />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} xl={3} lg={3}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="start"
              component={"div"}
              id="dashboard_stats"
              sx={{
                padding: "2rem 1.5rem",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              }}
            >
              <Box
                sx={{
                  fontFamily: "Geist_Bold",
                  fontWeight: 700,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  color: "#3C424D",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Geist_Medium",
                    color: "#3C424Dad",
                    fontSize: "18px",
                  }}
                >
                  Total Alerts
                </Typography>
                <Typography sx={classes.statsValue}>
                  {alertTableData.length}
                </Typography>
              </Box>

              <Box
                sx={{
                  fontSize: "1rem",
                  color: "white",
                  padding: "0.7rem",
                  borderRadius: "5px",
                  backgroundColor: "#855BDE",
                }}
              >
                <FaBell />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleStatusChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setOfflinePage(newPage);
  };

  const handlePerPageData = (event: any) => {
    setPage(1);
    setLimit(event.target.value);
  };

  const handlePerOfflinePageData = (event: any) => {
    setOfflinePage(1);
    setOfflineLimit(event.target.value);
  };

  const getAlertsTable = () => {
    return (
      <Grid container spacing={3} sx={{paddingLeft: "24px", paddingTop: "24px", display: "flex", justifyContent: "space-between"}}>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          xl={5.9}
          lg={5.9}
          sx={{
            padding: "1.5rem 1.5rem",
            backgroundColor: "white",
            border: "1px solid #E8ECF0",
            borderRadius: "8px",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Geist_Light",
              fontSize: "1.5rem",
              marginBottom: "0.5rem",
              padding: "0.2rem 0.8rem",
              borderRadius: "5px",
              borderLeft: "7px solid #5F22E1",
              backgroundColor: "#e8ecf06b"
            }}
          >
            Alert Logs
          </Typography>

          <CustomTable
            headers={[
              { name: "Name", field: "label" },
              { name: "IMEI", field: "imei" },
              { name: "Alert Time", field: "time" },
              { name: "Event", field: "event" },
              { name: "Mode", field: "mode" },
              { name: "Source", field: "source" },
              { name: "Message", field: "message" },
            ]}
            rows={alertTableData}
            paginationCount={count}
            rowsPerPage={limit}
            pageNumber={page}
            perPageData={limit}
            isRowPerPageEnable={false}
            setPage={setPage}
            handlePageChange={handleChangePage}
            handlePerPageData={handlePerPageData}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          xl={5.9}
          lg={5.9}
          sx={{
            padding: "1.5rem 1.5rem",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.07)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Geist_Light",
              fontSize: "1.5rem",
              marginBottom: "0.5rem",
              padding: "0.2rem 0.8rem",
              borderRadius: "5px",
              borderLeft: "7px solid #5F22E1",
              backgroundColor: "#e8ecf06b"
            }}
          >
            Offline Devices
          </Typography>

          <CustomTable
            headers={[
              { name: "Name", field: "label" },
              { name: "IMEI", field: "imei" },
              { name: "Status", field: "status" },
              { name: "Last Ping", field: "time" },
              { name: "Action", field: "action" },
            ]}
            rows={statData}
            isRowPerPageEnable={false}
            rowsPerPage={offlineLimit}
            perPageData={offlineLimit}
            paginationCount={offlineCount}
            pageNumber={offlinePage}
            setPage={setOfflinePage}
            handlePageChange={handleStatusChangePage}
            handlePerPageData={handlePerOfflinePageData}
          />
        </Grid>
      </Grid>
    );
  };

  const getDashboardBody = () => {
    return (
      <Grid md={12} xs={12} sx={{ margin: "auto" }}>
        <Grid
          container
          spacing={3}
          xs={12}
          sm={12}
          xl={12}
          md={12}
          lg={12}
          sx={{ margin: "-70px auto", width: " 97%" }}
        >
          <Grid item xs={12} md={12} lg={12} xl={12}>
            {getAlerts()}
          </Grid>

          <Grid item spacing={2} xs={12} md={12} lg={12} xl={12}>
            {getAlertsTable()}
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F1F5F9",
        width: "100%",
        height: "100%",
        margin: "auto",
      }}
    >
      {getDashboardHeader()}
      {getDashboardBody()}
      {customDialog()}
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default Dashboard;
