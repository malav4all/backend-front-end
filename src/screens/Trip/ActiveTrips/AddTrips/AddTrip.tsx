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
import { CustomButton, CustomInput } from "../../../../global/components";
import {
  fetchDeviceList,
  fetchEntityByTripTypeAndType,
} from "./AddTripService";
import { GetForms } from "../../../FormBuild/formBuilder.service"; // Adjust the import path as needed
import { isTruthy, openErrorNotification } from "../../../../helpers/methods";
import strings from "../../../../global/constants/StringConstants";
import {
  alertConfigurationFormInitialState,
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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import notifiers from "../../../../global/constants/NotificationConstants";
import urls from "../../../../global/constants/UrlConstants";

const steps = ["Transit Type", "Trip Information", "Alert Detail"];

const AddTrip = (props: any) => {
  const classes = addTripStyles;
  const history = useHistory();
  const theme = useTheme();
  const redirectionState: any = props.location?.state;
  const [dynamicForm, setDynamicForm] = useState<any>(null);
  const [dynamicSteps, setDynamicSteps] = useState<string[]>(steps);
  const [imeiData, setImeiData] = useState([]);
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

  useEffect(() => {
    fetchImeiData();
    fetchFormbuilderForm();
  }, []);

  useEffect(() => {
    updateEntityFieldOptions(dynamicForm);
  }, [transitTypeForm]);

  const fetchImeiData = async () => {
    try {
      const res = await fetchDeviceList();
      setImeiData(res.getAllDeviceList);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const fetchFormbuilderForm = async () => {
    try {
      const res = await GetForms({
        input: {
          accountId: "IMZ113343",
          page: -1,
          limit: 10000,
        },
      });
      setDynamicForm(res?.fetchFormBuilder?.data);
      setDynamicSteps((prevSteps) => [
        ...prevSteps,
        ...res.fetchFormBuilder?.data?.map((item: any) => item.name),
      ]);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const updateEntityFieldOptions = async (forms: any) => {
    if (!forms) return;

    const entityFields = forms.flatMap((form: any) =>
      form.content.filter((field: any) => field.type === "EntityField")
    );

    const tripType = transitTypeForm.transitType.value;

    if (tripType) {
      for (const field of entityFields) {
        const { entityType } = field.extraAttributes;
        try {
          const res = await fetchEntityByTripTypeAndType({
            input: {
              accountId: "IMZ113343",
              tripTypeList: [tripType],
              type: entityType,
              page: -1,
              limit: 10000,
            },
          });
          field.extraAttributes.options =
            res.fetchEntityByTripTypeAndType.data.map((entity: any) => ({
              label: entity.name,
              value: entity._id,
            }));
        } catch (error: any) {
          openErrorNotification(error.message);
        }
      }
      // Update the dynamicForm state to trigger a re-render with the new options
      setDynamicForm([...forms]);
    }
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
          <Grid container spacing={2} padding={5}>
            {dynamicForm?.map((form: any, index: any) =>
              step === steps.length + index ? (
                <React.Fragment key={index}>
                  {renderDynamicFormFields(form)}
                </React.Fragment>
              ) : null
            )}
          </Grid>
        );
    }
  };

  const renderDynamicFormFields = (form: any) => {
    return form?.content?.map((field: any) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        key={field.id}
        sx={{ marginBottom: "16px" }}
      >
        <Box display="flex" alignItems="center" mb={1}>
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              fontSize: "18px",
              color: theme.palette.text.primary,
              fontWeight: 600,
            }}
          >
            {field.extraAttributes.label}
          </Typography>
          {field.extraAttributes.required && (
            <Typography color="error" ml={0.5}>
              *
            </Typography>
          )}
        </Box>
        {field.type === "TextField" && (
          <CustomInput
            // required={field.extraAttributes.required}
            placeHolder={field.extraAttributes.placeHolder}
            name={field.extraAttributes.label}
            onChange={(e: any) =>
              handleFormDataChange(e as ChangeEvent<HTMLInputElement>, () => {})
            }
            value={""}
          />
        )}
        {field.type === "NumberField" && (
          <CustomInput
            type="number"
            // required={field.extraAttributes.required}
            placeHolder={field.extraAttributes.placeHolder}
            name={field.extraAttributes.label}
            onChange={(e: any) =>
              handleFormDataChange(e as ChangeEvent<HTMLInputElement>, () => {})
            }
            value={""}
          />
        )}
        {field.type === "TextAreaField" && (
          <TextField
            multiline
            rows={field.extraAttributes.rows}
            // required={field.extraAttributes.required}
            placeholder={field.extraAttributes.placeHolder}
            name={field.extraAttributes.label}
            onChange={(e) =>
              handleFormDataChange(e as ChangeEvent<HTMLInputElement>, () => {})
            }
            value={""}
            fullWidth
          />
        )}
        {(field.type === "SelectField" ||
          field.type === "TripField" ||
          field.type === "EntityField") && (
          <Select
            // required={field.extraAttributes.required}
            name={field.extraAttributes.label}
            value={""} // You can set the value from the state if available
            onChange={(e) =>
              handleFormDataChange(e as ChangeEvent<HTMLInputElement>, () => {})
            }
            displayEmpty
            fullWidth
          >
            {field.extraAttributes.options?.map((option: any, index: any) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
        {field.type === "DateField" && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              value={null} // You can set the value from the state if available
              // onChange={(date) =>
              //   // handleDateChange(field.extraAttributes.label, date)
              // }
              slotProps={{
                textField: {
                  placeholder: field.extraAttributes.placeHolder,
                  required: field.extraAttributes.required,
                  fullWidth: true,
                },
              }}
            />
          </LocalizationProvider>
        )}
        <Typography
          variant="caption"
          sx={{ marginTop: "4px", display: "block" }}
        >
          {field.extraAttributes.helperText}
        </Typography>
      </Grid>
    ));
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

  const handleDateChange = (name: string, date: Date | null) => {
    // setState((prevFields: any) => ({
    //   ...prevFields,
    //   [name]: {
    //     ...prevFields[name as keyof typeof prevFields],
    //     value: date,
    //     error: "",
    //   },
    // }));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    if (activeStep === dynamicSteps.length - 1) {
      // insertTripDetails();
    } else {
      // if (handleValidation()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // }
    }
  };

  const insertTripDetails = async () => {
    try {
      const insertTripBody = {
        transitTypeForm,
        tripInformationForm,
        // alertConfigurationForm: transformToAlertConfig(alertConfigurationForm),
      };

      if (handleValidation()) {
        if (props?.edit) {
          // const res = await updateTrip({
          //   input: {
          //     _id: props?.selectedTripRowData?._id,
          //     ...insertTripBody,
          //     createdBy: store.getState().auth.userName,
          //   },
          // });
          // props?.handleCloseAddTripForm();
          // openSuccessNotification(res?.updateTrip?.message);
          await props?.tableData?.();
        } else {
          // const res = await addTrip({
          //   input: {
          //     ...insertTripBody,
          //     createdBy: store?.getState()?.auth?.userName,
          //   },
          // });
          // props?.handleCloseAddTripForm();
          // openSuccessNotification(res?.createTrip?.message);
          // await props?.tableData?.();
        }
      }
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error?.message) ? error.message : notifiers.GENERIC_ERROR
      );
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
      pathname: urls.tripsViewPath,
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
                />
              ) : (
                <CustomButton
                  label={strings.Previous}
                  buttonType="secondaryBtn"
                  onClick={handleBack}
                />
              )}
              {activeStep === dynamicSteps.length - 1 ? (
                <CustomButton
                  buttonType="primaryBtn"
                  label={strings.Save}
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
