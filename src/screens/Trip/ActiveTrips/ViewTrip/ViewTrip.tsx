import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ViewAlertConfigurationDetails from "./ViewAlertConfigurationDetails";
import ViewTripInformationDetails from "./ViewTripInformationDetails";
import ViewTransitTypeDetails from "./ViewTransitTypeDetails";
import ViewHeaderComponent from "../../../../global/components/viewProfile/ViewHeaderComponent";
import viewTripStyle from "./ViewTripStyle";
import CustomLoader from "../../../../global/components/CustomLoader/CustomLoader";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../../helpers/methods";
import {
  alertConfigurationFormInitialState,
  transitTypeFormInitialState,
  tripInformationFormInitialState,
} from "./ViewTripTypes";
import urls from "../../../../global/constants/UrlConstants";
import { store } from "../../../../utils/store";
import { fetchTripbyId, updateTripStatus } from "../TripServices";
import notifiers from "../../../../global/constants/NotificationConstants";
import { dynamicFormInitialState } from "../AddTrips/AddTripsTypes";
import { useHistory } from "react-router-dom";
import MapComponent from "./component/MapComponent";
import moment from "moment";
const ViewTrip = () => {
  const theme = useTheme();
  const history = useHistory();
  const classes = viewTripStyle;
  const { id } = useParams<{ id: string }>();
  const [transitTypeForm, setTransitTypeForm] = useState<any>(
    transitTypeFormInitialState()
  );
  const [tripInformationForm, setTripInformationForm] = useState<any>(
    tripInformationFormInitialState()
  );
  const [alertConfigurationForm, setAlertConfigurationForm] = useState<any>(
    alertConfigurationFormInitialState()
  );
  const [dynamicForm, setDynamicForm] = useState<any>();
  const [imgSrc, setImgSrc] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getTrip();
  }, []);
  const getTrip = async () => {
    try {
      setIsLoading(true);
      const res = await fetchTripbyId({
        input: {
          accountId: store.getState().auth.tenantId,
          tripId: id,
        },
      });

      const tripData = res?.fetchTripById?.data[0];

      setTripInformationForm({
        tripName: tripData?.route?.routeName || "",
        tripId: tripData?.tripId || "",
        startPoint: tripData?.startPoint?.locationId || "",
        endPoint: tripData?.endPoint?.locationId || "",
        tripStartDate: tripData?.tripStartDate,
        tripEndDate: tripData?.tripEndDate || "",
        status: tripData?.status || "",
        remarks: tripData?.tripData[0]?.remarks || "",
        tripData: tripData?.tripData || [],
        vehicleNumber: tripData?.tripData[0]?.vehicleNo || "",
        driverName: tripData?.tripData[0]?.driverName || "",
        driverContactNumber: tripData?.tripData[0]?.driverContactNumber || "",
        imeiNumber: tripData?.tripData[0]?.imei[0],
      });

      setAlertConfigurationForm({
        subscribedAlerts: tripData?.alertConfig?.subscribedAlerts || [],
        alertMedium: {
          sms: {
            contact: tripData?.alertConfig?.alertMedium?.sms?.contact || "",
            isEnable:
              tripData?.alertConfig?.alertMedium?.sms?.isEnable || false,
          },
          whatsapp: {
            contact:
              tripData?.alertConfig?.alertMedium?.whatsapp?.contact || "",
            isEnable:
              tripData?.alertConfig?.alertMedium?.whatsapp?.isEnable || false,
          },
          email: {
            contact: tripData?.alertConfig?.alertMedium?.email?.contact || "",
            isEnable:
              tripData?.alertConfig?.alertMedium?.email?.isEnable || false,
          },
        },
      });

      setTransitTypeForm({
        transitType: tripData?.transitType || "",
        vehicleType: tripData?.tripData[0]?.vehicleNo || "",
        routeId: tripData?.route?.routeId,
      });
      setImgSrc({
        vehiclenumber: tripData?.tripVerification?.vehiclenumber,
        installLock: tripData?.tripVerification?.installLock,
        permitNumber: tripData?.tripVerification?.permitNumber,
        paymentProofImg: tripData?.tripVerification?.paymentProofImg,
      });
      setDynamicForm(dynamicFormInitialState(tripData?.metaData?.dynamicForm));
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
      setIsLoading(false);
    }
  };
  console.log({ imgSrc });
  console.log({ tripInformationForm });
  const handleStatusChange = async (newStatus: string) => {
    try {
      const accountId = store.getState().auth.tenantId;
      const tripId = tripInformationForm?.tripId;

      const response = await updateTripStatus({
        input: { accountId, tripId, status: newStatus },
      });

      if (response?.data?.updateTripStatus?.success === 1) {
        openSuccessNotification(`Trip status updated to ${newStatus}`);
        history.goBack();
      } else {
        openErrorNotification("Failed to update trip status.");
      }
    } catch (error: any) {
      openErrorNotification("Error updating trip status: " + error.message);
    }
  };

  const getGeneralTabData = () => (
    <Grid container sx={{ ...classes.mainBox, padding: "1rem" }} spacing={2}>
      <Typography variant="h3" sx={classes.headingText}>
        Trip Information
      </Typography>
      <Grid item xs={12}>
        <Box sx={classes.borderStyles}>
          <Box>
            <ViewTripInformationDetails
              tripInformationForm={tripInformationForm}
            />
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ borderRadius: "8px" }}>
          <Box sx={classes.borderStyles}>
            <ViewAlertConfigurationDetails
              alertConfigurationForm={alertConfigurationForm}
            />
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ borderRadius: "8px" }}>
          <Box sx={classes.borderStyles}>
            <ViewTransitTypeDetails transitTypeForm={transitTypeForm} />
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ borderRadius: "8px" }}>
          <Box>{renderDynamicFormContent()}</Box>
        </Box>
      </Grid>
    </Grid>
  );

  const renderDynamicFormContent = () => {
    return dynamicForm?.map((form: any, index: any) => (
      <Card key={index} sx={classes.card}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {form?.name}
          </Typography>
          {form?.content?.map((field: any) => (
            <Box key={field.id} sx={{ marginBottom: "8px" }}>
              <Typography variant="subtitle2">
                {field?.extraAttributes?.label}:{" "}
                <strong>{field?.extraAttributes?.value || "N/A"}</strong>
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    ));
  };

  const getTripDetails = () => (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        padding: "24px",
        paddingTop: "4.5rem",
      }}
    >
      {isLoading ? (
        <CustomLoader />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box>
              <Box>
                <ViewHeaderComponent
                  showEditButton={tripInformationForm?.status === "created"}
                  hideAssignTask
                  from={`${urls.editTripViewPath}/${id}`}
                  tripStatus={tripInformationForm?.status}
                  tripInformationForm={tripInformationForm}
                  alertConfigurationForm={alertConfigurationForm}
                  transitTypeForm={transitTypeForm}
                  dynamicForm={dynamicForm}
                  imgSrc={imgSrc}
                  personId={id}
                  onStatusChange={handleStatusChange}
                />
              </Box>
            </Box>
          </Grid>

          <Grid xs={12} lg={4} sx={{ marginTop: "2rem" }}>
            {getGeneralTabData()}
          </Grid>

          <Grid item xs={12} lg={8}>
            <Card sx={{ borderRadius: "8px", marginTop: "2rem" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "Geist_semibold",
                    fontSize: "1.1rem",
                    marginBottom: "1.7rem",
                    padding: "0.2rem 0.8rem",
                    borderRadius: "5px",
                    borderLeft: "7px solid",
                    borderLeftColor: "#855BDE",
                  }}
                >
                  Map View
                </Typography>
                <MapComponent />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );

  return getTripDetails();
};

export default ViewTrip;
