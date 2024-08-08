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

  useEffect(() => {
    getTrip();
  }, []);

  const getTrip = async () => {
    try {
      setLoader(true);
      // Simulate API call
      const response = {
        _id: "66a8c67befd9368381a27d5f",
        updatedBy: "vimal",
        createdBy: "vimal",
        accessAccount: ["account1", "account2"],
        transitType: "transitType",
        vehicleType: "vehicleType",
        specialRequirements: "specialRequirements",
        vehicleNumber: "2983479283",
        tripName: "Trip",
        metaData: {
          dynamicForm: [
            {
              distributorForm: {
                formId: "",
                formTitle: "optional",
                formFieldsData: [
                  {
                    fieldName: "",
                    isMandatory: true,
                    type: "text",
                    value: "abc",
                  },
                  {
                    fieldName: "",
                    isMandatory: true,
                    type: "text",
                    value: "abc",
                  },
                  {
                    fieldName: "",
                    isMandatory: true,
                    type: "text",
                    value: "abc",
                  },
                ],
              },
            },
            {
              bottlerForm: {
                formId: "",
                formTitle: "optional",
                formFieldsData: [
                  {
                    fieldName: "",
                    isMandatory: true,
                    type: "text",
                    value: "abc",
                  },
                  {
                    fieldName: "",
                    isMandatory: true,
                    type: "text",
                    value: "abc",
                  },
                  {
                    fieldName: "",
                    isMandatory: true,
                    type: "text",
                    value: "abc",
                  },
                ],
              },
            },
          ],
        },
        endPoint: {
          _id: "668e7ce9128dadbd2fa1bb3f",
          createdBy: "malav",
          finalAddress: "India - Delhi - Chilla - East Delhi - NA",
          geoCodeData: {
            type: "Feature",
            geometry: {
              type: "Geozone",
              coordinates: [28.60795246278739, 77.20838450634525],
              radius: 219.36557696456916,
            },
            properties: { name: null },
          },
          address: {
            zipCode: "110091",
            country: "India",
            state: "Delhi",
            area: "Chilla",
            city: "NA",
            district: "East Delhi",
          },
          mobileNumber: 7053190777,
          locationType: "Malav",
          description: "This is ",
          name: "Seond Route",
          accountId: "IMZ113343",
          locationId: "LN551803",
          createdAt: "2024-07-10T12:22:01.111Z",
          updatedAt: "2024-07-10T12:22:01.111Z",
        },
        startPoint: {
          _id: "668bb69321638fb7f8c17bd6",
          createdBy: "Excise Super User",
          finalAddress: "India - Delhi - Gheora - North West Delhi - Delhi",
          geoCodeData: {
            type: "Feature",
            geometry: {
              type: "Geozone",
              coordinates: [28.62418291806016, 77.14568053569782],
              radius: 234.54648199042813,
            },
            properties: { name: null },
          },
          address: {
            zipCode: "110081",
            country: "India",
            state: "Delhi",
            area: "Gheora",
            city: "Delhi",
            district: "North West Delhi",
          },
          mobileNumber: 7053190777,
          locationType: "Malav",
          description: "This is Location",
          name: "Test GeoZone",
          accountId: "IMZ113343",
          locationId: "LN674553",
          createdAt: "2024-07-08T09:51:15.535Z",
          updatedAt: "2024-07-08T09:51:15.535Z",
        },
        alertConfig: {
          subscribedAlerts: ["Lock", "unlock", "tamper", "overSpeed"],
          alertMedium: {
            sms: { contact: "123456789", isEnable: true },
            whatsapp: { contact: "1321239712", isEnable: true },
            email: { contact: "admin@gmail.com", isEnable: true },
          },
        },
        route: {
          _id: "668e82bc3f2aed8666a8475f",
          updatedAt: "2024-07-10T12:45:21.573Z",
          createdAt: "2024-07-10T12:45:21.573Z",
          totalDuration: 2.59,
          totalDistance: 98.83,
          createdBy: "master",
          routesData: ["668e7d1a128dadbd2fa1bb67", "668bb69321638fb7f8c17bd6"],
          routeName: "Delhi To manali",
          routeId: "RT007443",
          accountId: "IMZ113343",
        },
        tripData: [
          {
            imei: ["123456789012345"],
            vehicleNo: "ABC123",
            tripDate: "2024-07-25",
            remarks: "No issues",
          },
        ],
        tripEndDate: "2024-07-26T12:00:00Z",
        tripStartDate: "2024-07-25T12:00:00Z",
        primaryAccount: "primary_account_id",
        status: "ongoing",
        tripId: "ZX3ZGF",
        accountId: "IMZ113343",
        createdAt: "Tue Jul 30 2024 16:24:51 GMT+0530 (India Standard Time)",
        updatedAt: "2024-07-30T10:54:51.000Z",
        __v: 0,
      };

      setTransitTypeForm({
        transitType: response?.transitType,
        vehicleType: response?.vehicleType,
        specialRequirements: response?.specialRequirements,
      });
      setTripInformationForm({
        tripId: response.tripId,
        startPoint: response?.startPoint?.name,
        endPoint: response?.endPoint?.name,
        tripStartDate: response?.tripStartDate,
        tripEndDate: response?.tripEndDate,
        status: response?.status,
        tripData: response?.tripData,
        vehicleNumber: response?.vehicleNumber,
        tripName: response?.tripName,
      });
      setAlertConfigurationForm({
        subscribedAlerts: response?.alertConfig?.subscribedAlerts,
        alertMedium: {
          sms: {
            contact: response?.alertConfig?.alertMedium?.sms?.contact,
            isEnable: response?.alertConfig?.alertMedium?.sms?.isEnable,
          },
          whatsapp: {
            contact: response?.alertConfig?.alertMedium?.whatsapp?.contact,
            isEnable: response?.alertConfig?.alertMedium?.whatsapp?.isEnable,
          },
          email: {
            contact: response?.alertConfig?.alertMedium?.email?.contact,
            isEnable: response?.alertConfig?.alertMedium?.email?.isEnable,
          },
        },
      });
      setLoader(false);
    } catch (error: any) {
      setLoader(false);
      openErrorNotification(
        isTruthy(error.message) ? error.message : "An error occurred"
      );
    }
  };

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
