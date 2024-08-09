import { Grid, Stack, Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ViewAlertConfigurationDetails from "./ViewAlertConfigurationDetails";
import ViewTripInformationDetails from "./ViewTripInformationDetails";
import ViewTransitTypeDetails from "./ViewTransitTypeDetails";
import ViewHeaderComponent from "../../../../global/components/viewProfile/ViewHeaderComponent";
import viewTripStyle from "./ViewTripStyle";
import CustomLoader from "../../../../global/components/CustomLoader/CustomLoader";
import { isTruthy, openErrorNotification } from "../../../../helpers/methods";
import {
  alertConfigurationFormInitialState,
  transitTypeFormInitialState,
  tripInformationFormInitialState,
} from "./ViewTripTypes";
import urls from "../../../../global/constants/UrlConstants";
import { store } from "../../../../utils/store";
import { fetchTripbyId } from "../TripServices";
import notifiers from "../../../../global/constants/NotificationConstants";

const ViewTrip = () => {
  const classes = viewTripStyle;
  const [loader, setLoader] = useState<boolean>(false);
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
          tripId: id, // use the actual trip ID from the route params
        },
      });

      const tripData = res?.fetchTripById?.data[0];

      setTripInformationForm({
        tripName: tripData?.route?.routeName || "",
        tripId: tripData?.tripId || "",
        startPoint: tripData?.startPoint?.finalAddress || "",
        endPoint: tripData?.endPoint?.finalAddress || "",
        tripStartDate: tripData?.tripStartDate || "",
        tripEndDate: tripData?.tripEndDate || "",
        status: tripData?.status || "",
        remarks: tripData?.tripData[0]?.remarks || "",
        tripData: tripData?.tripData || [],
        vehicleNumber: tripData?.tripData[0]?.vehicleNo || "",
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
        transitType: tripData?.route?.routeName || "",
        vehicleType: tripData?.tripData[0]?.vehicleNo || "",
        numberOfPassengers: 0, // Assuming this data is not provided in the API response
        specialRequirements: "", // Assuming this data is not provided in the API response
      });

      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
      setIsLoading(false);
    }
  };

  console.log({ transitTypeForm });
  console.log({ tripInformationForm });
  console.log({ alertConfigurationForm });
  const getGeneralTabData = () => (
    <Grid container sx={classes.mainBox} spacing={2}>
      <Grid item xl={12} lg={12} sm={12} xs={12}>
        <Grid container spacing={2} display={"block"}>
          <Grid item xl={3} lg={3} sm={12} xs={12}>
            <ViewTripInformationDetails
              tripInformationForm={tripInformationForm}
            />
          </Grid>
          <Grid item xl={3} lg={3} sm={12} xs={12}>
            <ViewAlertConfigurationDetails
              alertConfigurationForm={alertConfigurationForm}
            />
          </Grid>
          <Grid item xl={3} lg={3} sm={12} xs={12}>
            <ViewTransitTypeDetails transitTypeForm={transitTypeForm} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const getTripDetails = () => (
    <>
      {loader ? (
        <CustomLoader />
      ) : (
        <>
          <Grid container>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <ViewHeaderComponent
                showEditButton
                hideAssignTask
                from={`${urls.editTripViewPath}/${id}`}
                tripInformationForm={tripInformationForm}
                alertConfigurationForm={alertConfigurationForm}
                transitTypeForm={transitTypeForm}
                personId={id}
              />
            </Grid>
          </Grid>
          {getGeneralTabData()}
        </>
      )}
    </>
  );

  return getTripDetails();
};

export default ViewTrip;
