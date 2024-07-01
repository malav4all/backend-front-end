import React, { ChangeEvent, useEffect, useState, lazy, Suspense } from "react";
import { Box, Stepper, Step, StepLabel, Button, Grid, Typography, useTheme, SelectChangeEvent } from "@mui/material";
import useStyles from "./AddTrip.styles";
import { insertTripField, validateAddTripForm } from "../../TripTypeAndValidation";
import { addTrip, updateTrip, fetchDeviceList } from "../../service/Trip.service";
import { store } from "../../../../../utils/store";
import { openErrorNotification, openSuccessNotification, isTruthy } from "../../../../../helpers/methods";
import { CustomDialog, CustomButton } from "../../../../../global/components";
import strings from "../../../../../global/constants/StringConstants";
import notifiers from "../../../../../global/constants/NotificationConstants";
import CustomLoader from "../../../../../global/components/CustomLoader/CustomLoader";

const TransitType = lazy(() => import("./TransitType"));
const TripInformation = lazy(() => import("./TripInformation"));
const PermitDetails = lazy(() => import("./PermitDetails"));
const DriverInformation = lazy(() => import("./DriverInformation"));

const steps = [
  "Transit Type",
  "Trip Information",
  "Permit Details",
  "Driver Information",
];

interface CustomProps {
  openAddTripDialog: boolean;
  handleCloseAddTripDialog: () => void;
  roles: any[];
  tableData: () => void;
  isLoading: boolean;
  edit?: boolean;
  selectedTripRowData?: any;
  setEdit?: (edit: boolean) => void;
}

const AddTrip: React.FC<CustomProps> = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const [tripFromFields, setTripFromFields] = useState(insertTripField(props?.selectedTripRowData));
  const [imeiData, setImeiData] = useState([]);
  const [selectedImeis, setSelectedImeis] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    props.setEdit?.(false);
    setTripFromFields(insertTripField());
  }, [props.openAddTripDialog]);

  useEffect(() => {
    if (props.edit && props.selectedTripRowData) {
      props.setEdit?.(true);
      setTripFromFields(insertTripField(props.selectedTripRowData));
    }
  }, [props.selectedTripRowData]);

  useEffect(() => {
    fetchImeiData();
  }, []);

  const handleValidation = () => {
    const { isValid, errors } = validateAddTripForm(tripFromFields, props.edit);
    setTripFromFields({ ...errors });
    return isValid;
  };

  const handleFormDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTripFromFields({
      ...tripFromFields,
      [event.target.name]: {
        ...tripFromFields[event.target.name],
        value: event.target.value,
        error: "",
      },
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<any>) => {
    setTripFromFields({
      ...tripFromFields,
      [event.target.name]: {
        ...tripFromFields[event.target.name],
        value: event.target.value,
        error: "",
      },
    });
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setTripFromFields({
      ...tripFromFields,
      [name]: {
        ...tripFromFields[name],
        value: date,
        error: "",
      },
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

  const insertTripDetails = async () => {
    try {
      const insertTripBody = {
        imeiData: tripFromFields.imeiList?.value,
        tripName: tripFromFields.tripName?.value?.trim(),
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
          props.handleCloseAddTripDialog();
          openSuccessNotification(res?.updateTrip?.message);
          await props.tableData?.();
        } else {
          const res = await addTrip({
            input: {
              ...insertTripBody,
              createdBy: store?.getState()?.auth?.userName,
            },
          });
          props.handleCloseAddTripDialog();
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

  const addTripDialogTitle = () => (
    <Box>
      <Typography className={classes.boldFonts}>
        {props.edit ? "Update Trip" : "Add Trip"}
      </Typography>
    </Box>
  );

  const addTripDialogBody = () => (
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
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
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
          />
        )}
        {activeStep === 2 && (
          <PermitDetails
            tripFromFields={tripFromFields}
            handleFormDataChange={handleFormDataChange}
            handleSelectChange={handleSelectChange}
            handleDateChange={handleDateChange}
          />
        )}
        {activeStep === 3 && (
          <DriverInformation
            tripFromFields={tripFromFields}
            handleFormDataChange={handleFormDataChange}
          />
        )}
      </Suspense>
    </Box>
  );

  const addTripDialogFooter = () => (
    <Grid container className={classes.centerItemFlex}>
      <Box className={classes.dialogFooter}>
        <CustomButton
          id="device_group_cancel_button"
          label="Cancel"
          onClick={() => props?.handleCloseAddTripDialog()}
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

  const getAddTripDialog = () => (
    <Grid container className={classes.centerItemFlex}>
      <CustomDialog
        isDialogOpen={props?.openAddTripDialog}
        closable
        closeButtonVisibility
        handleDialogClose={props.handleCloseAddTripDialog}
        dialogTitleContent={addTripDialogTitle()}
        dialogBodyContent={addTripDialogBody()}
        dialogFooterContent={addTripDialogFooter()}
        width={"700px"}
        fullScreen={false}
      />
    </Grid>
  );

  return <Box>{getAddTripDialog()}</Box>;
};

export default AddTrip;
