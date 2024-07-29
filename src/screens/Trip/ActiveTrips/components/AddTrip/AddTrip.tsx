import React, { ChangeEvent, useEffect, useState, lazy, Suspense } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  Typography,
  useTheme,
  SelectChangeEvent,
} from "@mui/material";
import useStyles from "./AddTrip.styles";
import {
  insertTripField,
  validateAddTripForm,
  TripFields,
} from "../../TripTypeAndValidation";
import {
  addTrip,
  updateTrip,
  fetchDeviceList,
} from "../../service/Trip.service";
import { store } from "../../../../../utils/store";
import {
  openErrorNotification,
  openSuccessNotification,
  isTruthy,
} from "../../../../../helpers/methods";
import strings from "../../../../../global/constants/StringConstants";
import notifiers from "../../../../../global/constants/NotificationConstants";
import CustomLoader from "../../../../../global/components/CustomLoader/CustomLoader";
import { CustomButton } from "../../../../../global/components";
import AlertConfiguration from "./AlertConfiguration";
import { fetchFormBuilder } from "../../../../FormBuilder/service/form-builder.service";

const TransitType = lazy(() => import("./TransitType"));
const TripInformation = lazy(() => import("./TripInformation"));
const PermitDetails = lazy(() => import("./AlertConfiguration"));
const DriverInformation = lazy(() => import("./DriverInformation"));

const steps = [
  "Transit Type",
  "Trip Information",
  "Alert Detail",
  // "Driver Information",
];

interface CustomProps {
  openAddTripForm: boolean;
  handleCloseAddTripForm: () => void;
  roles: any[];
  tableData: () => void;
  isLoading: boolean;
  edit?: boolean;
  selectedTripRowData?: any;
  setEdit?: (edit: boolean) => void;
}

const AddTrip: React.FC<CustomProps> = (props) => {
  const classes = useStyles();
  const [tripFromFields, setTripFromFields] = useState<TripFields>(
    insertTripField(props?.selectedTripRowData)
  );
  const [imeiData, setImeiData] = useState([]);
  const [dynamicForm, setDynamicForm] = useState<any>(null);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    props.setEdit?.(false);
    setTripFromFields(insertTripField());
  }, [props.openAddTripForm]);

  useEffect(() => {
    if (props.edit && props.selectedTripRowData) {
      props.setEdit?.(true);
      setTripFromFields(insertTripField(props.selectedTripRowData));
    }
  }, [props.selectedTripRowData]);

  useEffect(() => {
    fetchImeiData();
    fetchFormbuilderForm();
  }, []);

  const handleValidation = () => {
    const { isValid, errors } = validateAddTripForm(tripFromFields, props.edit);
    setTripFromFields({ ...errors });
    return isValid;
  };

  const handleFormDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTripFromFields((prevFields) => ({
      ...prevFields,
      [name]: {
        ...prevFields[name as keyof TripFields],
        value,
        error: "",
      },
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<any>) => {
    const { name, value } = event.target;
    setTripFromFields((prevFields) => ({
      ...prevFields,
      [name]: {
        ...prevFields[name as keyof TripFields],
        value,
        error: "",
      },
    }));
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setTripFromFields((prevFields) => ({
      ...prevFields,
      [name]: {
        ...prevFields[name as keyof TripFields],
        value: date,
        error: "",
      },
    }));
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setTripFromFields((prevFields) => {
      let updatedField;

      if (
        [
          "lock",
          "Unlock",
          "Geozone-In",
          "Geozone-out",
          "Trip created",
          "Trip ended",
          "Tamper Alert",
          "Overspeeding",
          "low battery",
        ].includes(name)
      ) {
        // Update alertTypes
        updatedField = checked
          ? [...(prevFields.alertTypes.value || []), name]
          : prevFields.alertTypes.value.filter((type: string) => type !== name);
        return {
          ...prevFields,
          alertTypes: {
            ...prevFields.alertTypes,
            value: updatedField,
            error: "",
          },
        };
      } else if (["SMS", "WhatsApp", "Email"].includes(name)) {
        updatedField = checked
          ? [...(prevFields.getAlerts.value || []), name]
          : prevFields.getAlerts.value.filter((type: string) => type !== name);
        return {
          ...prevFields,
          getAlerts: {
            ...prevFields.getAlerts,
            value: updatedField,
            error: "",
          },
        };
      }

      return prevFields;
    });
  };

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
      const res = await fetchFormBuilder({
        input: {
          accountId: "IMZ113343",
          page: -1,
          limit: 10000,
        },
      });
      setDynamicForm(res.fetchFormBuilder.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const renderDynamicFormFields = (form: any) => {
    return form.fields.map((field: any) => (
      <Box key={field.id}>
        <label>{field.label}</label>
        <input
          type={field.type}
          required={field.required}
          onChange={(e) =>
            handleFormDataChange(e as ChangeEvent<HTMLInputElement>)
          }
        />
      </Box>
    ));
  };

  const insertTripDetails = async () => {
    try {
      const insertTripBody = {
        imeiData: tripFromFields.imeiList.value,
        tripName: tripFromFields.tripName.value?.trim(),
      };

      if (handleValidation()) {
        if (props.edit) {
          const res = await updateTrip({
            input: {
              _id: props?.selectedTripRowData?._id,
              ...insertTripBody,
              createdBy: store.getState().auth.userName,
            },
          });
          props.handleCloseAddTripForm();
          openSuccessNotification(res?.updateTrip?.message);
          await props.tableData?.();
        } else {
          const res = await addTrip({
            input: {
              ...insertTripBody,
              createdBy: store?.getState()?.auth?.userName,
            },
          });
          props.handleCloseAddTripForm();
          openSuccessNotification(res?.createTrip?.message);
          await props.tableData?.();
        }
      }
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      insertTripDetails();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const addTripTitle = () => (
    <Box>
      <Typography className={classes.boldFonts}>
        {props.edit ? "Update Trip" : "Create Trip"}
      </Typography>
    </Box>
  );

  const addTripBody = () => (
    <Box>
      <Stepper
        activeStep={activeStep}
        sx={{
          marginBottom: "3rem",
          marginTop: "3rem",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {steps?.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
        {dynamicForm.map(
          (form: any, index: any) =>
            activeStep === steps.length + index && (
              <Box key={index}>{renderDynamicFormFields(form)}</Box>
            )
        )}
      </Stepper>

      <Suspense fallback={<CustomLoader isLoading={true} />}>
        {activeStep === 0 && (
          <TransitType
            tripFromFields={tripFromFields}
            handleSelectChange={handleSelectChange}
          />
        )}
        {activeStep === 1 && (
          <TripInformation
            tripFromFields={tripFromFields}
            handleFormDataChange={handleFormDataChange}
            handleSelectChange={handleSelectChange}
            handleDateChange={handleDateChange} // Pass handleDateChange prop
          />
        )}
        {activeStep === 2 && (
          <AlertConfiguration
            tripFromFields={tripFromFields}
            handleFormDataChange={handleFormDataChange}
            handleSelectChange={handleSelectChange}
            handleDateChange={handleDateChange}
            handleCheckboxChange={handleCheckboxChange}
          />
        )}

        {dynamicForm.map(
          (form: any, index: any) =>
            activeStep === steps.length + index && (
              <Box key={index}>{renderDynamicFormFields(form)}</Box>
            )
        )}
      </Suspense>
    </Box>
  );

  const addTripFooter = () => (
    <Grid container className={classes.centerItemFlex}>
      <Box className={classes.dialogFooter}>
        <CustomButton
          id="device_group_cancel_button"
          label="Cancel"
          onClick={() => props?.handleCloseAddTripForm()}
          customClasses={classes.cancelButtonStyle}
        />
        <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Grid>
  );

  return (
    <Box
      sx={{
        maxWidth: "700px",
        margin: "auto",
      }}
    >
      {addTripTitle()}
      {addTripBody()}
      {addTripFooter()}
    </Box>
  );
};

export default AddTrip;
