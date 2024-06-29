import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormHelperText,
  Grid,
  InputLabel,
  TextField,
  Typography,
  useTheme,
  Stepper,
  Step,
  StepLabel,
  Button,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  CustomButton,
  CustomDialog,
  CustomInput,
} from "../../../../global/components";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../../helpers/methods";
import strings from "../../../../global/constants/StringConstants";
import notifiers from "../../../../global/constants/NotificationConstants";
import { store } from "../../../../utils/store";
import addTripStyles from "./AddTrip.styles";
import {
  insertTripField,
  validateAddTripForm,
} from "../../TripTypeAndValidation";
import {
  addTrip,
  fetchDeviceList,
  updateTrip,
} from "../../service/Trip.service";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface CustomProps {
  openAddTripDialog: boolean;
  handleCloseAddTripDialog: Function;
  roles: any[];
  tableData: Function;
  isLoading: boolean;
  edit?: boolean;
  selectedTripRowData?: any;
  setEdit?: any;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const steps = [
  " Transit Type",
  " Trip Information",
  " Permit Details",
  " Driver Information",
];

const AddTrip = (props: CustomProps) => {
  const theme = useTheme();
  const classes = addTripStyles;
  const [tripFromFields, setTripFromFields] = useState<any>(
    insertTripField(props?.selectedTripRowData)
  );
  const [imeiData, setImeiData] = useState<any>([]);
  const [selectedImeis, setSelectedImeis] = useState<any>([]);
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
    const { isValid, errors }: any = validateAddTripForm(
      tripFromFields,
      props.edit
    );
    setTripFromFields({ ...errors });
    return isValid;
  };

  const handleFormDataChange = (formFillEvent: any) => {
    setTripFromFields({
      ...tripFromFields,
      [formFillEvent.target.name]: {
        ...tripFromFields[formFillEvent.target.name],
        value: formFillEvent.target.value,
        error: "",
      },
    });
  };

  const addTripDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>
          {props.edit ? "Update Trip" : "Add Trip"}
        </Typography>
      </Box>
    );
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
          props.handleCloseAddTripDialog(false);
          openSuccessNotification(res?.updateTrip?.message);
          await props.tableData?.();
        } else {
          const res = await addTrip({
            input: {
              ...insertTripBody,
              createdBy: store?.getState()?.auth?.userName,
            },
          });
          props.handleCloseAddTripDialog(false);
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

  const isOptionSelected = (option: any) => {
    return selectedImeis?.includes(option?.imei);
  };

  const handleSelectAll = (event: any) => {
    if (event?.target?.checked) {
      setSelectedImeis(imeiData?.map((option: any) => option?.imei));
      const newData = imeiData?.map((option: any) => option?._id);
      setTripFromFields({
        ...tripFromFields,
        imeiList: {
          value: newData,
          error: "",
        },
      });
    } else {
      setSelectedImeis([]);
    }
  };

  const handleChange = (event: any, value: any) => {
    const filteredValues = value?.filter((v: any) => typeof v !== "string");
    setSelectedImeis(filteredValues?.map((option: any) => option?.imei));
    const filteredImeis = filteredValues?.map((option: any) => option?._id);
    setTripFromFields({
      ...tripFromFields,
      imeiList: {
        value: filteredImeis,
        error: "",
      },
    });
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

  const addTripDialogBody = () => {
    return (
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

        {activeStep === 0 && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box>
              <Stack direction="column">
                <InputLabel
                  sx={{
                    ...classes.inputLabel,
                    color: theme.palette.text.primary,
                  }}
                  shrink
                >
                  Transit Type
                </InputLabel>
                <Select
                  sx={{
                    ...classes.dropDownStyle,
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    "& .MuiSelect-select": {
                      color: theme.palette.text.primary,
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: theme.palette.divider,
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                  id="add_user_status_dropdown"
                  name="journey"
                  // value={assetAssingmentFormFields?.journey?.value}
                  // onChange={handleSelectJourneyStatus}
                  // renderValue={(selectedValue) => {
                  //   const selectedItem = journeyData.find(
                  //     (item: any) => item._id === selectedValue
                  //   );
                  //   return selectedItem
                  //     ? selectedItem.journeyName
                  //     : "Select Journey";
                  // }}
                  // MenuProps={classes.menuProps}
                  displayEmpty
                >
                  {[
                    { name: "CSD" },
                    { name: "Export" },
                    { name: "IDT" },
                    { name: "IMFL" },
                    { name: "IML" },
                  ].map((item: any, index: any) => (
                    <MenuItem
                      key={index}
                      value={item._id}
                      sx={{
                        ...classes.dropDownOptionsStyle,
                        color: theme.palette.text.primary,
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Box>
          </Grid>
        )}

        {activeStep === 1 && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box>
                <Stack direction="column">
                  <InputLabel
                    sx={{
                      ...classes.inputLabel,
                      color: theme.palette.text.primary,
                    }}
                    shrink
                  >
                    Distributor
                    <Box ml={0.4} sx={classes.star}>
                      *
                    </Box>
                  </InputLabel>
                  <Select
                    sx={{
                      ...classes.dropDownStyle,
                      backgroundColor: theme.palette.background.paper,
                      color: theme.palette.text.primary,
                      "& .MuiSelect-select": {
                        color: theme.palette.text.primary,
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: theme.palette.divider,
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    id="add_user_status_dropdown"
                    name="boxSet"
                    // value={assetAssingmentFormFields?.boxSet?.value}
                    onChange={handleFormDataChange}
                    // renderValue={() =>
                    //   assetAssingmentFormFields?.boxSet?.value ||
                    //   "Select Box set"
                    // }
                    // MenuProps={classes.menuProps}
                    displayEmpty
                    // error={
                    //   !isTruthy(assetAssingmentFormFields.boxSet?.value) &&
                    //   assetAssingmentFormFields.boxSet?.error
                    // }
                  >
                    {["Malav", "Lalit", "Vimal"].map(
                      (item: any, index: any) => (
                        <MenuItem
                          key={index}
                          value={item}
                          sx={{
                            ...classes.dropDownOptionsStyle,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {item}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {/* {!isTruthy(assetAssingmentFormFields.boxSet?.value) && (
                    <FormHelperText error sx={classes.errorStyle}>
                      {assetAssingmentFormFields.boxSet?.error}
                    </FormHelperText>
                  )} */}
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box>
                <Stack direction="column">
                  <InputLabel
                    sx={{
                      ...classes.inputLabel,
                      color: theme.palette.text.primary,
                    }}
                    shrink
                  >
                    Transporter
                    <Box ml={0.4} sx={classes.star}>
                      *
                    </Box>
                  </InputLabel>
                  <Select
                    sx={{
                      ...classes.dropDownStyle,
                      backgroundColor: theme.palette.background.paper,
                      color: theme.palette.text.primary,
                      "& .MuiSelect-select": {
                        color: theme.palette.text.primary,
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: theme.palette.divider,
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    id="add_user_status_dropdown"
                    name="boxSet"
                    // value={assetAssingmentFormFields?.boxSet?.value}
                    onChange={handleFormDataChange}
                    // renderValue={() =>
                    //   assetAssingmentFormFields?.boxSet?.value ||
                    //   "Select Box set"
                    // }
                    // MenuProps={classes.menuProps}
                    displayEmpty
                    // error={
                    //   !isTruthy(assetAssingmentFormFields.boxSet?.value) &&
                    //   assetAssingmentFormFields.boxSet?.error
                    // }
                  >
                    {["Shubham", "Seema", "Akash"].map(
                      (item: any, index: any) => (
                        <MenuItem
                          key={index}
                          value={item}
                          sx={{
                            ...classes.dropDownOptionsStyle,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {item}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {/* {!isTruthy(assetAssingmentFormFields.boxSet?.value) && (
                    <FormHelperText error sx={classes.errorStyle}>
                      {assetAssingmentFormFields.boxSet?.error}
                    </FormHelperText>
                  )} */}
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <CustomInput
                required
                id="add_asset_assingment_imei_field"
                placeHolder="Enter IMEI Number"
                name="imei"
                label="IMEI Number"
                onChange={handleFormDataChange}
                // value={assetAssingmentFormFields.imei?.value}
                // error={assetAssingmentFormFields.imei?.error}
                propsToInputElement={{
                  maxLength: strings.USER_FIRST_NAME_LIMIT,
                }}
                sx={{
                  input: {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.default,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <CustomInput
                required
                id="add_asset_assingment_imei_field"
                placeHolder="Enter Vehicle Number"
                name="imei"
                label="Vehicle Number"
                onChange={handleFormDataChange}
                // value={assetAssingmentFormFields.imei?.value}
                // error={assetAssingmentFormFields.imei?.error}
                propsToInputElement={{
                  maxLength: strings.USER_FIRST_NAME_LIMIT,
                }}
                sx={{
                  input: {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.default,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box>
                <Stack direction="column">
                  <InputLabel
                    sx={{
                      ...classes.inputLabel,
                      color: theme.palette.text.primary,
                    }}
                    shrink
                  >
                    Source
                    <Box ml={0.4} sx={classes.star}>
                      *
                    </Box>
                  </InputLabel>
                  <Select
                    sx={{
                      ...classes.dropDownStyle,
                      backgroundColor: theme.palette.background.paper,
                      color: theme.palette.text.primary,
                      "& .MuiSelect-select": {
                        color: theme.palette.text.primary,
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: theme.palette.divider,
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    id="add_user_status_dropdown"
                    name="boxSet"
                    // value={assetAssingmentFormFields?.boxSet?.value}
                    onChange={handleFormDataChange}
                    // renderValue={() =>
                    //   assetAssingmentFormFields?.boxSet?.value ||
                    //   "Select Box set"
                    // }
                    // MenuProps={classes.menuProps}
                    displayEmpty
                    // error={
                    //   !isTruthy(assetAssingmentFormFields.boxSet?.value) &&
                    //   assetAssingmentFormFields.boxSet?.error
                    // }
                  >
                    {["A", "B", "C"].map((item: any, index: any) => (
                      <MenuItem
                        key={index}
                        value={item}
                        sx={{
                          ...classes.dropDownOptionsStyle,
                          color: theme.palette.text.primary,
                        }}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* {!isTruthy(assetAssingmentFormFields.boxSet?.value) && (
                    <FormHelperText error sx={classes.errorStyle}>
                      {assetAssingmentFormFields.boxSet?.error}
                    </FormHelperText>
                  )} */}
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box>
                <Stack direction="column">
                  <InputLabel
                    sx={{
                      ...classes.inputLabel,
                      color: theme.palette.text.primary,
                    }}
                    shrink
                  >
                    Destination
                    <Box ml={0.4} sx={classes.star}>
                      *
                    </Box>
                  </InputLabel>
                  <Select
                    sx={{
                      ...classes.dropDownStyle,
                      backgroundColor: theme.palette.background.paper,
                      color: theme.palette.text.primary,
                      "& .MuiSelect-select": {
                        color: theme.palette.text.primary,
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: theme.palette.divider,
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    id="add_user_status_dropdown"
                    name="boxSet"
                    // value={assetAssingmentFormFields?.boxSet?.value}
                    onChange={handleFormDataChange}
                    // renderValue={() =>
                    //   assetAssingmentFormFields?.boxSet?.value ||
                    //   "Select Box set"
                    // }
                    // MenuProps={classes.menuProps}
                    displayEmpty
                    // error={
                    //   !isTruthy(assetAssingmentFormFields.boxSet?.value) &&
                    //   assetAssingmentFormFields.boxSet?.error
                    // }
                  >
                    {["A", "B", "C"].map((item: any, index: any) => (
                      <MenuItem
                        key={index}
                        value={item}
                        sx={{
                          ...classes.dropDownOptionsStyle,
                          color: theme.palette.text.primary,
                        }}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* {!isTruthy(assetAssingmentFormFields.boxSet?.value) && (
                    <FormHelperText error sx={classes.errorStyle}>
                      {assetAssingmentFormFields.boxSet?.error}
                    </FormHelperText>
                  )} */}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        )}

        {activeStep === 2 && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <CustomInput
                required
                id="add_asset_assingment_imei_field"
                placeHolder="Enter Trip End Date"
                name="imei"
                label="Trip End Date"
                onChange={handleFormDataChange}
                // value={assetAssingmentFormFields.imei?.value}
                // error={assetAssingmentFormFields.imei?.error}
                propsToInputElement={{
                  maxLength: strings.USER_FIRST_NAME_LIMIT,
                }}
                sx={{
                  input: {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.default,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box>
                <Stack direction="column">
                  <InputLabel
                    sx={{
                      ...classes.inputLabel,
                      color: theme.palette.text.primary,
                    }}
                    shrink
                  >
                    Material
                    <Box ml={0.4} sx={classes.star}>
                      *
                    </Box>
                  </InputLabel>
                  <Select
                    sx={{
                      ...classes.dropDownStyle,
                      backgroundColor: theme.palette.background.paper,
                      color: theme.palette.text.primary,
                      "& .MuiSelect-select": {
                        color: theme.palette.text.primary,
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: theme.palette.divider,
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    id="add_user_status_dropdown"
                    name="boxSet"
                    // value={assetAssingmentFormFields?.boxSet?.value}
                    onChange={handleFormDataChange}
                    // renderValue={() =>
                    //   assetAssingmentFormFields?.boxSet?.value ||
                    //   "Select Box set"
                    // }
                    // MenuProps={classes.menuProps}
                    displayEmpty
                    // error={
                    //   !isTruthy(assetAssingmentFormFields.boxSet?.value) &&
                    //   assetAssingmentFormFields.boxSet?.error
                    // }
                  >
                    {["A", "B", "C"].map((item: any, index: any) => (
                      <MenuItem
                        key={index}
                        value={item}
                        sx={{
                          ...classes.dropDownOptionsStyle,
                          color: theme.palette.text.primary,
                        }}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* {!isTruthy(assetAssingmentFormFields.boxSet?.value) && (
                  <FormHelperText error sx={classes.errorStyle}>
                    {assetAssingmentFormFields.boxSet?.error}
                  </FormHelperText>
                )} */}
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <CustomInput
                required
                id="add_asset_assingment_imei_field"
                placeHolder="Enter Permit Number"
                name="imei"
                label="Permit Number"
                onChange={handleFormDataChange}
                // value={assetAssingmentFormFields.imei?.value}
                // error={assetAssingmentFormFields.imei?.error}
                propsToInputElement={{
                  maxLength: strings.USER_FIRST_NAME_LIMIT,
                }}
                sx={{
                  input: {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.default,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Stack direction="column">
                <InputLabel
                  sx={{
                    ...classes.inputLabel,
                    color: theme.palette.text.primary,
                  }}
                  shrink
                >
                  Permit Start Date & Time
                  <Box ml={0.4} sx={classes.star}>
                    *
                  </Box>
                </InputLabel>
                <Box>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      // value={formField?.startDate?.value}
                      // onChange={handleStartDate}
                      format="dd/MM/yyyy hh:mm a"
                      ampm={true}
                      slotProps={{
                        textField: {
                          sx: classes.datePicker,
                          variant: "outlined",
                          fullWidth: true,
                          // error: isTruthy(formField?.startDate?.error),
                          // helperText: formField?.startDate?.error,
                          inputProps: {
                            placeholder: "DD/MM/YYYY",
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Stack direction="column">
                <InputLabel
                  sx={{
                    ...classes.inputLabel,
                    color: theme.palette.text.primary,
                  }}
                  shrink
                >
                  Permit End Date & Time
                  <Box ml={0.4} sx={classes.star}>
                    *
                  </Box>
                </InputLabel>
                <Box>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      // value={formField?.startDate?.value}
                      // onChange={handleStartDate}
                      format="dd/MM/yyyy hh:mm a"
                      ampm={true}
                      slotProps={{
                        textField: {
                          sx: classes.datePicker,
                          variant: "outlined",
                          fullWidth: true,
                          // error: isTruthy(formField?.startDate?.error),
                          // helperText: formField?.startDate?.error,
                          inputProps: {
                            placeholder: "DD/MM/YYYY",
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        )}

        {activeStep === 3 && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <CustomInput
                required
                id="add_asset_assingment_imei_field"
                placeHolder="Enter Driver Name"
                name="imei"
                label="Driver Name"
                onChange={handleFormDataChange}
                // value={assetAssingmentFormFields.imei?.value}
                // error={assetAssingmentFormFields.imei?.error}
                propsToInputElement={{
                  maxLength: strings.USER_FIRST_NAME_LIMIT,
                }}
                sx={{
                  input: {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.default,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <CustomInput
                required
                id="add_asset_assingment_imei_field"
                placeHolder="Enter Driver Phone"
                name="imei"
                label="Driver Phone"
                onChange={handleFormDataChange}
                // value={assetAssingmentFormFields.imei?.value}
                // error={assetAssingmentFormFields.imei?.error}
                propsToInputElement={{
                  maxLength: strings.USER_FIRST_NAME_LIMIT,
                }}
                sx={{
                  input: {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.default,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <CustomInput
                required
                id="add_asset_assingment_imei_field"
                placeHolder="Enter Alert SMS Phone No"
                name="imei"
                label="Alert SMS Phone"
                onChange={handleFormDataChange}
                // value={assetAssingmentFormFields.imei?.value}
                // error={assetAssingmentFormFields.imei?.error}
                propsToInputElement={{
                  maxLength: strings.USER_FIRST_NAME_LIMIT,
                }}
                sx={{
                  input: {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.default,
                  },
                }}
              />
            </Grid>
          </Grid>
        )}
      </Box>
    );
  };

  const addTripDialogFooter = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <Box sx={classes.dialogFooter}>
          <CustomButton
            id="device_group_cancel_button"
            label="Cancel"
            onClick={() => props?.handleCloseAddTripDialog()}
            customClasses={{
              ...classes.cancelButtonStyle,
              color: theme.palette.text.primary,
              backgroundColor: "#00000000",
            }}
          />
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </Grid>
    );
  };

  const getAddTripDialog = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
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
  };

  return <Box>{getAddTripDialog()}</Box>;
};

export default AddTrip;
