import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  InputAdornment,
  Stack,
  Typography,
  useTheme,
  Tooltip,
  Modal,
  Button,
} from "@mui/material";
import tripStyles from "./Trips.styles";
import { useHistory } from "react-router-dom";
import {
  CustomAppHeader,
  CustomButton,
  CustomInput,
  CustomModal,
  CustomTable,
} from "../../../global/components";
import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../helpers/methods";
import strings from "../../../global/constants/StringConstants";
import SearchIcon from "@mui/icons-material/Search";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import { tripTableHeader } from "./AddTrips/AddTripFormValidation";
import {
  fetchTripMetrics,
  fetchTrips,
  generateOtps,
  otpVerify,
  searchTrip,
  updateTripStatus,
} from "./TripServices";
import notifiers from "../../../global/constants/NotificationConstants";
import { PiPencilSimpleBold } from "react-icons/pi";
import urls from "../../../global/constants/UrlConstants";
import CustomTabs from "../../../global/components/CustomTabs/CustomTabs";
import { store } from "../../../utils/store";
import { headerColor } from "../../../utils/styles";
import moment from "moment";
import axios from "axios";
import {
  LockIcon,
  TripEndedIcon,
} from "./AddTrips/AlertConfigurationForm/AlertIcons";
import EditIcon from "@mui/icons-material/Edit";
const Trips = () => {
  const theme = useTheme();
  const classes = tripStyles;
  const history = useHistory();
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
  const [searchTrips, setSearchTrips] = useState<any>("");
  const [tripData, setTripData] = useState<any>([]);
  console.log({ tripData });
  const [tabValue, setTabValue] = useState(strings.Created);
  const [open, setOpen] = useState<boolean>(false);
  // States for trip counts
  const [createdCount, setCreatedCount] = useState<number | null>(null);
  const [startedCount, setStartedCount] = useState<number | null>(null);
  const [endedCount, setEndedCount] = useState<number | null>(null);
  const [closedCount, setClosedCount] = useState<number | null>(null);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const tabs = [
    { label: strings.Created, count: createdCount },
    { label: strings.Started, count: startedCount },
    { label: strings.Ended, count: endedCount },
  ];
  const [tripId, setTripId] = useState<string>("");
  const [imei, setImei] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<any>("");
  useEffect(() => {
    if (searchTrips) {
      getSearchData(tabValue, searchTrips);
    } else {
      getTripData(tabValue, page);
      getTripMetrics();
    }
  }, [searchTrips, page, rowsPerPage, tabValue]);

  const getTripMetrics = async () => {
    try {
      setIsLoading(true);
      const res = await fetchTripMetrics({
        input: { accountId: store.getState().auth.tenantId },
      });

      const metrics = res?.getTripStatusMetrics.data || [];

      setCreatedCount(
        metrics.find((metric: any) => metric.status === "created")?.count || 0
      );
      setStartedCount(
        metrics.find((metric: any) => metric.status === "started")?.count || 0
      );
      setEndedCount(
        metrics.find((metric: any) => metric.status === "ended")?.count || 0
      );
      setClosedCount(
        metrics.find((metric: any) => metric.status === "closed")?.count || 0
      );

      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
      setIsLoading(false);
    }
  };

  const handleUnlockModalOpen = (trip: any) => {
    console.log("Unlock modal opened for trip:", trip);
    setSelectedTrip(trip);
    setIsUnlockModalOpen(true);
  };

  const handleUnlockModalClose = () => {
    setIsUnlockModalOpen(false);
    setSelectedTrip(null);
  };

  const getSearchData = async (tab: string, search: string) => {
    try {
      setIsLoading(true);
      const res = await searchTrip({
        input: {
          search,
          page: 1,
          limit: 10,
          status: tab.toLowerCase(),
        },
      });
      tableRender(res?.searchTrip?.data);
      setCount(res?.searchTrip?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const handleChange = (newValue: string) => {
    setTabValue(newValue);
    setPage(1);
    setRowsPerPage(10);
    setSearchTrips("");
  };

  const generateOtp = async () => {
    console.log("generta");
    console.log({ tripId });
    console.log({ mobileNumber });
    const response = await generateOtps({
      input: {
        accountId: store.getState().auth.tenantId,
        tripId,
        mobileNumber: Number(mobileNumber),
      },
    });
    console.log({ response });
    if (response?.data?.sendTripOtp?.success === 1) {
      const otp = prompt("Enter OTP received:");
      if (otp) {
        await verifyOtp(otp);
      }
    }
  };

  const verifyOtp = async (otp: any) => {
    try {
      const response = await otpVerify({
        input: {
          accountId: store.getState().auth.tenantId,
          tripId,
          mobileNumber: Number(mobileNumber),
          otp: Number(otp),
        },
      });

      if (response?.verifyOtp?.success === 1) {
        openSuccessNotification("OTP verified successfully.");

        const res: any = await unlockTrip();
        if (res === 200) {
          await handleStatusChange("closed");
        } else {
          openErrorNotification(response?.message);
        }
      } else {
        openErrorNotification("Failed to verify OTP.");
      }
    } catch (error: any) {
      openErrorNotification(error.message || "Something went wrong.");
    }
  };

  const unlockTrip = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.20:5030/send-command",
        {
          imei: imei,
        }
      );
      if (response?.data?.statusCode === 200) {
        openSuccessNotification("Lock successfully unlocked!");
        return response?.data?.statusCode;
      } else {
        openErrorNotification("Failed to unlock the lock.");
      }
    } catch (error: any) {
      openErrorNotification(
        error.message || "An error occurred while unlocking."
      );
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      const accountId = store.getState().auth.tenantId;

      const response = await updateTripStatus({
        input: { accountId, tripId, status: newStatus },
      });

      if (response?.data?.updateTripStatus?.success === 1) {
        openSuccessNotification(`Trip status updated to ${newStatus}`);
        history.push("/trips");
      } else {
        openErrorNotification("Failed to update trip status.");
      }
    } catch (error: any) {
      openErrorNotification("Error updating trip status: " + error.message);
    }
  };

  const getActionIcons = (trip: any) => {
    return (
      <>
        {tabValue === "Ended" ? (
          <LockIcon
            onClick={() => {
              console.log("Lock icon clicked");
              handleUnlockModalOpen(trip);
            }}
            style={{ cursor: "pointer", fontSize: "20px" }}
          />
        ) : (
          <TripEndedIcon style={{ fontSize: "20px" }} />
        )}
      </>
    );
  };

  const renderUnlockModal = () => (
    <Modal open={isUnlockModalOpen} onClose={handleUnlockModalClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography>Are you sure you want to unlock the lock?</Typography>
        <Stack direction="row" spacing={2} mt={2}>
          <Button variant="outlined" onClick={handleUnlockModalClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => generateOtp()}>
            Unlock
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      setSearchTrips(SearchEvent.target.value.trim());
      setPage(1);
      setRowsPerPage(10);
    } else {
      setSearchTrips("");
    }
  };

  const getTripData = async (tab: string, page: number) => {
    try {
      setIsLoading(true);
      const res = await fetchTrips({
        input: {
          page,
          limit: rowsPerPage,
          accountId: store.getState().auth.tenantId,
          status: tab.toLowerCase(),
        },
      });
      tableRender(res?.tripList?.data);
      setCount(res?.tripList?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
      setIsLoading(false);
    }
  };
  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search Trips"
        id="trip_search_field"
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

  const getRedirectionUrl = (id: string, item: any) => {
    history.push({
      pathname: `${urls.viewTripViewPath}/${item?.tripId}`,
      state: {
        coordinates: [],
        // eslint-disable-next-line no-sparse-arrays
        routeOrigin: [
          {
            lat: item?.startPoint?.geoCodeData?.geometry?.coordinates[0],
            lng: item?.startPoint?.geoCodeData?.geometry?.coordinates[1],
          },
          {
            lat: item?.endPoint?.geoCodeData?.geometry?.coordinates[0],
            lng: item?.endPoint?.geoCodeData?.geometry?.coordinates[1],
          },
        ],
      },
    });
  };

  const tableRender = (tableData: any) => {
    const data = tableData?.map((item: any, index: number) => ({
      key: item._id,
      imeiNumber: item?.tripData[0]?.imei,
      accountName: store.getState().auth.account,
      driverName: item?.tripData[0]?.driverName,
      driverContactNumber: item?.tripData[0]?.driverContactNumber,
      source: item?.startPoint?.name,
      destination: item?.endPoint?.name,
      vehicleNumber: item?.tripData[0]?.vehicleNo,
      totalDistance: item?.route?.totalDistance,
      totalDuration: item?.route?.totalDuration,
      tripStartDate: moment(item?.tripStartDate)
        .local()
        .format("MM/DD/YYYY, h:mm:ss a"),
      tripEndDate: moment(item?.tripEndDate)
        .local()
        .format("MM/DD/YYYY, h:mm:ss a"),
      createdBy: item?.createdBy,
      tripId: (
        <Box
          sx={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={() => getRedirectionUrl(item?.tripId, item)}
        >
          {item?.tripId}
        </Box>
      ),

      action: (
        <Box
          sx={{
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <Tooltip
            title="Edit"
            onClick={() => {
              setTripId(item.tripId);
              setImei(item?.tripData[0]?.imei[0]);
              setMobileNumber(item?.alertConfig?.alertMedium?.sms?.contact);
              handleUnlockModalOpen(item);
            }}
          >
            <EditIcon sx={{ color: "#7c58cb", cursor: "pointer" }} />
          </Tooltip>
        </Box>
      ),
    }));

    setTripData([...data]);
  };

  const handleAdd = () => {
    history.push({ pathname: urls.addTripViewPath });
  };

  const handlePerPageData = (event: any) => {
    setPage(1);
    setSearchPageNumber(1);
    setRowsPerPage(event?.target?.value);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const getTripPage = () => (
    <Box sx={{ background: "#060B25", height: "100vh", paddingTop: "4.5rem" }}>
      <Box sx={classes.mainBox}>
        <Typography
          style={{
            ...classes.settingsTitle,
            color: theme.palette.text.primary,
          }}
        >
          Manage Trip
        </Typography>
        <Stack
          sx={classes.outerTabBox}
          direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
          justifyContent={{
            lg: "space-between",
            md: "space-between",
            sm: "space-between",
            xs: "flex-start",
          }}
          alignItems={{ lg: "center", sm: "center" }}
        >
          <Box sx={{ marginRight: "1rem" }}>
            <CustomTabs
              changeValue={handleChange}
              selected={tabValue}
              tabConfig={tabs}
            />
          </Box>
          <Stack direction="row" spacing={1} sx={classes.inputWrapper}>
            <Box>{getSearchBar()}</Box>
            <Stack direction="row" justifyContent="center">
              <CustomButton
                label={"Add Trip"}
                onClick={handleAdd}
                buttonType="primaryBtn"
              />
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Box px={2} sx={classes.tableWrapper}>
        {isLoading ? (
          <CustomLoader />
        ) : (
          <CustomTable
            headers={
              tabValue === "Ended"
                ? tripTableHeader.concat([{ name: "Action", field: "action" }])
                : tripTableHeader
            }
            rows={tripData}
            size={[5]}
            handlePageChange={handleChangePage}
            handleRowsPerPage={handlePerPageData}
            paginationCount={count}
            pageNumber={page}
            setPage={setPage}
            handlePerPageData={handlePerPageData}
            perPageData={rowsPerPage}
            rowsPerPage={rowsPerPage}
          />
        )}
      </Box>
      {renderUnlockModal()}
    </Box>
  );
  return getTripPage();
};

export default Trips;
