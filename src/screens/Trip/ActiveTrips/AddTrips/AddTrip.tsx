import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Select,
  MenuItem,
  useTheme,
  TextField,
  Divider,
} from "@mui/material";
import { CustomButton } from "../../../../global/components";
import { createTrip, fetchEntityByTripTypeAndType } from "./AddTripService";
import { GetForms } from "../../../FormBuild/formBuilder.service"; // Adjust the import path as needed
import {
  openErrorNotification,
  openSuccessNotification,
} from "../../../../helpers/methods";
import strings from "../../../../global/constants/StringConstants";
import {
  alertConfigurationFormInitialState,
  dynamicFormInitialState,
  transitTypeFormInitialState,
  tripInformationFormInitialState,
} from "./AddTripsTypes";
import {
  validateAlertConfigurationForm,
  validateTransitTypeForm,
  validateTripInformationForm,
} from "./AddTripFormValidation";
import addTripStyles from "./AddTrips.styles";
import TransitTypeForm from "./TransitTypeForm/TransitTypeForm";
import TripInformationForm from "./TripInformationForm/TripInformationForm";
import AlertConfigurationForm from "./AlertConfigurationForm/AlertConfigurationForm";
import { useHistory } from "react-router-dom";
import notifiers from "../../../../global/constants/NotificationConstants";
import urls from "../../../../global/constants/UrlConstants";
import { store } from "../../../../utils/store";
import DynamicForm from "./DynamicForm/DynamicForm";

const steps = ["Transit Type", "Trip Information", "Alert Detail"];

const AddTrip = (props: any) => {
  const classes = addTripStyles;
  const history = useHistory();
  const theme = useTheme();
  const redirectionState: any = props.location?.state;
  const [formData, setFormData] = useState({});
  const [dynamicSteps, setDynamicSteps] = useState<string[]>(steps);
  const [activeStep, setActiveStep] = useState(0);
  const [transitTypeForm, setTransitTypeForm] = useState<any>(
    transitTypeFormInitialState(redirectionState?.transitTypeForm)
  );
  const [tripInformationForm, setTripInformationForm] = useState<any>(
    tripInformationFormInitialState(redirectionState?.tripInformationForm)
  );
  const [alertConfigurationForm, setAlertConfigurationForm] = useState<any>(
    alertConfigurationFormInitialState(redirectionState?.alertConfigurationForm)
  );
  const [dynamicForm, setDynamicForm] = useState(
    dynamicFormInitialState(redirectionState?.dynamicForm)
  );

  useEffect(() => {
    if (transitTypeForm.transitType.value) {
      fetchDataAndSetOptions();
    }
  }, [transitTypeForm.transitType.value]);

  const fetchDataAndSetOptions = async () => {
    try {
      const res = await GetForms({
        input: {
          accountId: store?.getState()?.auth?.tenantId,
          page: -1,
          limit: 10000,
        },
      });

      const forms = res?.fetchFormBuilder?.data;
      setDynamicForm(forms);

      if (forms) {
        const entityFields = forms?.flatMap((form: any) =>
          form?.content?.filter((field: any) => field?.type === "EntityField")
        );
        const tripType = transitTypeForm?.transitType?.value;
        if (tripType) {
          for (const field of entityFields) {
            if (field?.extraAttributes && field?.extraAttributes.entityType) {
              const { entityType } = field?.extraAttributes;
              try {
                const res = await fetchEntityByTripTypeAndType({
                  input: {
                    accountId: store?.getState()?.auth?.tenantId,
                    tripTypeList: [tripType],
                    type: entityType,
                    page: -1,
                    limit: 10000,
                  },
                });

                if (res?.fetchEntityByTripTypeAndType?.data) {
                  field.extraAttributes.options =
                    res.fetchEntityByTripTypeAndType.data.map(
                      (entity: any) => ({
                        label: entity?.name,
                        value: entity?._id,
                      })
                    );
                }
              } catch (error: any) {
                openErrorNotification(error.message);
              }
            }
          }
        }
      }

      setDynamicSteps((prevSteps) => [
        ...prevSteps,
        ...forms.map((item: any) => item.name),
      ]);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setDynamicForm((prevForm: any) =>
      prevForm.map((form: any) => ({
        ...form,
        content: form.content.map((field: any) => {
          if (field.extraAttributes.label === name) {
            return {
              ...field,
              extraAttributes: {
                ...field.extraAttributes,
                value: value,
              },
            };
          }
          return field;
        }),
      }))
    );
  };

  const prepareDynamicFormPayload = (dynamicForm: any) => {
    return dynamicForm.map((form: any) => ({
      ...form,
      content: form.content.map((field: any) => ({
        ...field,
        extraAttributes: {
          ...field.extraAttributes,
          value: field.extraAttributes.value || "",
        },
      })),
    }));
  };

  const getContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <TransitTypeForm
            transitTypeForm={transitTypeForm}
            setTransitTypeForm={setTransitTypeForm}
          />
        );
      case 1:
        return (
          <TripInformationForm
            tripInformationForm={tripInformationForm}
            setTripInformationForm={setTripInformationForm}
            transitTypeForm={transitTypeForm}
          />
        );
      case 2:
        return (
          <AlertConfigurationForm
            alertConfigurationForm={alertConfigurationForm}
            setAlertConfigurationForm={setAlertConfigurationForm}
            handleFormDataChange={(event: any) =>
              handleFormDataChange(event, setAlertConfigurationForm)
            }
          />
        );
      default:
        return (
          <DynamicForm
            dynamicForm={dynamicForm}
            handleInputChange={handleInputChange}
            formData={formData}
          />
        );
    }
  };

  const handleFormDataChange = (
    event: ChangeEvent<HTMLInputElement>,
    setState: Function
  ) => {
    const { name, value } = event.target;
    setState((prevFields: any) => ({
      ...prevFields,
      [name]: {
        ...prevFields[name as keyof typeof prevFields],
        value,
        error: "",
      },
    }));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    if (activeStep === dynamicSteps.length - 1) {
      insertTripDetails();
    } else {
      // if (handleValidation()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // }
    }
  };

  const insertTripDetails = async () => {
    try {
      const dynamicFormPayload = prepareDynamicFormPayload(dynamicForm);
      console.log({ dynamicFormPayload });
      const insertTripBody = {
        accountId: store?.getState()?.auth?.tenantId,
        primaryAccount: store?.getState()?.auth?.tenantId,
        accessAccount: ["account1", "account2"],
        tripStartDate: new Date(
          tripInformationForm?.tripStartDate?.value
        ).toISOString(),
        tripEndDate: new Date(
          tripInformationForm?.tripEndDate?.value
        ).toISOString(),
        tripData: [
          {
            imei: tripInformationForm?.imeiNumber?.value,
            vehicleNo: tripInformationForm?.vehicleNumber?.value,
            tripDate: new Date(tripInformationForm?.tripStartDate?.value)
              .toISOString()
              .split("T")[0],
            remarks: tripInformationForm?.remarks?.value,
          },
        ],
        route: {
          _id: transitTypeForm?.route?._id,
          updatedAt: transitTypeForm?.route?.updatedAt,
          createdAt: transitTypeForm?.route?.createdAt,
          totalDuration: transitTypeForm?.route?.totalDuration,
          totalDistance: transitTypeForm?.route?.totalDistance,
          createdBy: transitTypeForm?.route?.createdBy,
          routesData: transitTypeForm?.route?.routesData,
          routeName: transitTypeForm?.route?.routeName,
          routeId: transitTypeForm?.route?.routeId,
          accountId: transitTypeForm?.route?.accountId,
        },
        alertConfig: {
          subscribedAlerts: alertConfigurationForm?.subscribedAlerts,
          alertMedium: alertConfigurationForm?.alertMedium,
        },
        startPoint: tripInformationForm?.startPoint?.data,
        endPoint: tripInformationForm?.endPoint?.data,
        metaData: {
          dynamicForm: dynamicFormPayload,
        },
        createdBy: store.getState().auth.userName,
      };

      console.log({ insertTripBody });
      // if (handleValidation()) {
      if (props?.edit) {
        // const res = await updateTrip({
        //   input: {
        //     _id: props?.selectedTripRowData?._id,
        //     ...insertTripBody,
        //     createdBy: store.getState().auth.userName,
        //   },
        // });
        // openSuccessNotification(res?.updateTrip?.message);
        await props?.tableData?.();
      } else {
        const res = await createTrip({
          input: {
            ...insertTripBody,
            status: "started",
            createdBy: store?.getState()?.auth?.userName,
          },
        });
        openSuccessNotification(res?.createTrip?.message);
        history.goBack();
        await props?.tableData?.();
      }
      // }
    } catch (error: any) {
      openErrorNotification(error?.message || notifiers.GENERIC_ERROR);
    }
  };

  const handleValidation = () => {
    const { isValid: transitValid, errors: transitErrors } =
      validateTransitTypeForm(transitTypeForm, props?.edit);
    setTransitTypeForm({ ...transitErrors });

    const { isValid: tripValid, errors: tripErrors } =
      validateTripInformationForm(tripInformationForm, props?.edit);
    setTripInformationForm({ ...tripErrors });

    const { isValid: alertValid, errors: alertErrors } =
      validateAlertConfigurationForm(alertConfigurationForm, props?.edit);
    setAlertConfigurationForm({ ...alertErrors });

    return transitValid && tripValid && alertValid;
  };

  const handleGoToClickedStep = (index: number) => {
    setActiveStep(index);
  };

  const handleCancel = () => {
    history.push({
      pathname: urls?.tripsViewPath,
    });
  };

  const getAddTripDetails = () => {
    return (
      <Box sx={classes.headerBox}>
        <Box sx={classes.mainBox}>
          <Typography sx={classes.consultantText} variant="h1">
            Trip Details
          </Typography>
          <Stack
            direction={{ lg: "row", sm: "column", xs: "column" }}
            justifyContent={{
              lg: "space-between",
              sm: "flex-start",
              xs: "flex-start",
            }}
            alignItems={{ lg: "center" }}
            mt={3}
            sx={{ [`@media screen and (max-width: ${1390}px)`]: { mt: 0.438 } }}
          >
            <Stepper
              sx={classes.stepperStyle}
              activeStep={activeStep}
              connector={
                <Divider
                  sx={{ width: "15px", borderColor: "#828282", margin: "4px" }}
                />
              }
            >
              {dynamicSteps.map((label, index) => {
                return (
                  <Step
                    key={index}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <StepLabel onClick={() => handleGoToClickedStep(index)}>
                      {label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <Stack
              direction={{ lg: "row", sm: "row", xs: "row" }}
              justifyContent={{
                lg: "flex-end",
                sm: "flex-start",
                xs: "flex-start",
              }}
              alignItems="center"
              spacing={1}
              mt={2}
            >
              {activeStep === 0 ? (
                <CustomButton
                  label={strings.Cancel}
                  buttonType="secondaryBtn"
                  onClick={handleCancel}
                  customClasses={{
                    background: "blue",
                    "&:hover": {
                      background: "blue",
                    },
                  }}
                />
              ) : (
                <CustomButton
                  label={strings.Previous}
                  buttonType="secondaryBtn"
                  onClick={handleBack}
                  customClasses={{
                    background: "blue",
                    "&:hover": {
                      background: "blue",
                    },
                  }}
                />
              )}
              {activeStep === dynamicSteps.length - 1 ? (
                <CustomButton
                  buttonType="primaryBtn"
                  label={"Trip Start"}
                  onClick={() => insertTripDetails()}
                />
              ) : (
                <CustomButton
                  label={strings.Next}
                  buttonType="primaryBtn"
                  onClick={handleNext}
                />
              )}
            </Stack>
          </Stack>
        </Box>
        <Box padding={"0 250px"}>{getContent(activeStep)}</Box>
      </Box>
    );
  };

  return getAddTripDetails();
};

export default AddTrip;
