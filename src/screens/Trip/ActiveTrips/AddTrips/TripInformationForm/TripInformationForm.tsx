import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Stack,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  useTheme,
  Autocomplete,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { CustomInput } from "../../../../../global/components";
import {
  isTruthy,
  openErrorNotification,
  openInfoNotification,
  openSuccessNotification,
} from "../../../../../helpers/methods";
import {
  checkBattery,
  fetchDeviceList,
  fetchGeozoneHandler,
} from "../AddTripService";
import { store } from "../../../../../utils/store";
import strings from "../../../../../global/constants/StringConstants";
import transitTypeStyles from "../../AddTrips/TransitTypeForm/TransitTypeForm.styles";

const checkedIcon = <CheckBoxIcon fontSize="small" />;
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

interface TripInformationProps {
  tripInformationForm: any;
  transitTypeForm: any;
  setTripInformationForm: Function;
  edit?: boolean;
}

const TripInformationForm: React.FC<TripInformationProps> = ({
  tripInformationForm,
  setTripInformationForm,
  transitTypeForm,
  edit,
}) => {
  const theme = useTheme();
  const classes = transitTypeStyles();
  const [locationTypeData, setLocationTypeData] = useState<any>();
  const [imeiOptions, setImeiOptions] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    if (
      tripInformationForm?.tripStartDate?.value &&
      typeof tripInformationForm.tripStartDate.value === "string"
    ) {
      const startDate = new Date(tripInformationForm.tripStartDate.value);
      handleTripDateChange("tripStartDate", startDate);
    }

    if (
      tripInformationForm?.tripEndDate?.value &&
      typeof tripInformationForm.tripEndDate.value === "string"
    ) {
      const endDate = new Date(tripInformationForm.tripEndDate.value);
      handleTripDateChange("tripEndDate", endDate);
    }
  }, [
    tripInformationForm?.tripStartDate?.value,
    tripInformationForm?.tripEndDate?.value,
  ]);
  useEffect(() => {
    if (edit) {
      setTripInformationForm((prevFields: any) => ({
        ...prevFields,
        startPoint: {
          ...tripInformationForm?.startPoint?.value,
          ...tripInformationForm?.startPoint?.label,
          ...tripInformationForm?.startPoint?.data,
          error: "",
        },
        endPoint: {
          ...tripInformationForm?.endPoint?.value,
          ...tripInformationForm?.endPoint?.label,
          ...tripInformationForm?.endPoint?.data,
          error: "",
        },
      }));
    }
    if (transitTypeForm?.startPoint && transitTypeForm?.endPoint && !edit) {
      setTripInformationForm((prevFields: any) => ({
        ...prevFields,
        startPoint: {
          value: transitTypeForm?.startPoint?.locationId,
          label: `${transitTypeForm?.startPoint?.name} - ${transitTypeForm?.startPoint?.locationId}`,
          data: transitTypeForm?.startPoint,
          error: "",
        },
        endPoint: {
          value: transitTypeForm?.endPoint?.locationId,
          label: `${transitTypeForm?.endPoint?.name} - ${transitTypeForm?.endPoint?.locationId}`,
          data: transitTypeForm?.endPoint,
          error: "",
        },
      }));
    }
  }, [transitTypeForm]);

  useEffect(() => {
    fetchGeozone();
  }, []);

  const fetchGeozone = async () => {
    try {
      setLoading(true);
      const res = await fetchGeozoneHandler({
        input: {
          accountId: store.getState().auth.tenantId,
          page,
          limit,
        },
      });
      setLocationTypeData(res?.listGeozone?.data);
      setLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const fetchImeiData = async (locationId: string) => {
    try {
      const res = await fetchDeviceList({
        input: {
          accountId: store?.getState()?.auth?.tenantId,
          location: locationId,
          page,
          limit,
        },
      });
      setImeiOptions(res?.fetchDeviceOnboardingListWithLocation?.data || []);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const filterOptions = (excludeId: string | null) => {
    return locationTypeData?.filter(
      (item: any) => item?.locationId !== excludeId
    );
  };

  const handleFormDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTripInformationForm((prevFields: any) => ({
      ...prevFields,
      [name]: {
        ...prevFields[name as keyof typeof prevFields],
        value,
        error: "",
      },
    }));
  };

  const handleStartEndPointChange = (event: SelectChangeEvent<any>) => {
    const { name, value } = event?.target;
    const selectedItem = locationTypeData?.find(
      (item: any) => item?.locationId === value
    );

    if (selectedItem) {
      const formattedPoint = {
        _id: selectedItem?._id,
        createdBy: selectedItem?.createdBy,
        finalAddress: selectedItem?.finalAddress,
        geoCodeData: selectedItem?.geoCodeData,
        address: selectedItem?.address,
        mobileNumber: selectedItem?.mobileNumber,
        locationType: selectedItem?.locationType,
        description: selectedItem?.description,
        name: selectedItem?.name,
        accountId: selectedItem?.accountId,
        locationId: selectedItem?.locationId,
        createdAt: selectedItem?.createdAt,
        updatedAt: selectedItem?.updatedAt,
      };

      setTripInformationForm((prevFields: any) => ({
        ...prevFields,
        [name]: {
          value: formattedPoint?.locationId,
          label: `${formattedPoint?.name} - ${formattedPoint?.locationId}`,
          data: formattedPoint,
          error: "",
        },
      }));

      if (name === "startPoint") {
        fetchImeiData(selectedItem._id); // Fetch IMEI data based on the selected start point
      }
    }
  };

  const handleTripDateChange = (field: string, date: Date | null) => {
    setTripInformationForm((prevFields: any) => {
      let updatedFields = {
        ...prevFields,
        [field]: { value: date, error: "" },
      };

      // Validate date fields
      if (field === "tripEndDate" && date && prevFields?.tripEndDate.value) {
        if (date > prevFields?.tripEndDate.value) {
          updatedFields.tripEndDate.error =
            "Trip End Date & Time cannot be before Trip Start Date & Time";
        } else {
          updatedFields.tripEndDate.error = "";
        }
      }

      if (field === "tripEndDate" && date && prevFields?.tripEndDate.value) {
        if (date < prevFields?.tripEndDate?.value) {
          updatedFields.tripEndDate.error =
            "Trip End Date & Time cannot be before Trip Start Date & Time";
        } else {
          updatedFields.tripEndDate.error = "";
        }
      }

      return updatedFields;
    });
  };

  const checkBatteryForTrip = async (imei: string) => {
    const accountId = transitTypeForm?.accountId;
    const threshold = transitTypeForm?.minBatteryPercentage;
    try {
      const response = await checkBattery({
        input: {
          accountId,
          imei: imei,
          threshold,
        },
      });

      if (response.checkBattery.success) {
        openSuccessNotification(response?.checkBattery?.message);
      } else {
        openInfoNotification(response?.checkBattery?.message);
      }
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };
  const handleImeiChange = (event: any, newValue: any) => {
    const selectedImei = newValue.map(
      (item: any) => item?.deviceOnboardingIMEINumber
    );

    setTripInformationForm((prevFields: any) => ({
      ...prevFields,
      imeiNumber: {
        ...prevFields?.imeiNumber,
        value: selectedImei,
        error: "",
      },
    }));
    selectedImei?.forEach((imei: string) => {
      checkBatteryForTrip(imei);
    });
  };

  return (
    <Grid container spacing={2} padding={5}>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <Box>
          <Stack direction="column">
            <InputLabel className={classes.inputLabel} shrink>
              Start Point
              <Box ml={0.4} color={"red"}>
                *
              </Box>
            </InputLabel>
            <Select
              className={classes.dropDownStyle}
              id="startPoint"
              name="startPoint"
              value={tripInformationForm?.startPoint?.value || ""}
              onChange={handleStartEndPointChange}
              displayEmpty
              disabled={!!transitTypeForm?.startPoint || edit}
              renderValue={(selected) =>
                selected
                  ? tripInformationForm?.startPoint?.label
                  : "Select Start Point"
              }
              error={
                !tripInformationForm?.startPoint?.value &&
                tripInformationForm?.startPoint?.error
              }
            >
              {filterOptions(tripInformationForm?.endPoint?.value)?.map(
                (item: any, index: any) => (
                  <MenuItem
                    key={index}
                    value={item?.locationId}
                    className={classes.dropDownOptionsStyle}
                  >
                    {`${item?.name} - ${item?.locationId}`}
                  </MenuItem>
                )
              )}
            </Select>
            {tripInformationForm?.startPoint?.error && (
              <FormHelperText error className={classes.errorStyle}>
                {tripInformationForm?.startPoint?.error}
              </FormHelperText>
            )}
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <Box>
          <Stack direction="column">
            <InputLabel className={classes.inputLabel} shrink>
              End Point
              <Box ml={0.4} color={"red"}>
                *
              </Box>
            </InputLabel>
            <Select
              className={classes.dropDownStyle}
              id="endPoint"
              name="endPoint"
              value={tripInformationForm?.endPoint?.value || ""}
              onChange={handleStartEndPointChange}
              displayEmpty
              disabled={!!transitTypeForm?.endPoint || edit} // Disable if auto-populated
              renderValue={(selected) =>
                selected
                  ? tripInformationForm?.endPoint?.label
                  : "Select End Point"
              }
              error={
                !tripInformationForm?.endPoint?.value &&
                tripInformationForm?.endPoint?.error
              }
            >
              {filterOptions(tripInformationForm?.startPoint?.value)?.map(
                (item: any, index: any) => (
                  <MenuItem
                    key={index}
                    value={item.locationId}
                    className={classes.dropDownOptionsStyle}
                  >
                    {`${item.name} - ${item.locationId}`}
                  </MenuItem>
                )
              )}
            </Select>
            {tripInformationForm?.endPoint?.error && (
              <FormHelperText error className={classes.errorStyle}>
                {tripInformationForm?.endPoint?.error}
              </FormHelperText>
            )}
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <Box>
          <Stack direction="column">
            <InputLabel
              style={{
                display: "flex",
                fontSize: "18px",
                color: theme.palette.text.primary,
                fontWeight: 600,
              }}
              shrink
            >
              Trip Start Date & Time
              <Box ml={0.4} style={{ color: "red" }}>
                *
              </Box>
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                disabled={edit}
                value={tripInformationForm?.tripStartDate?.value}
                onChange={(date) => handleTripDateChange("tripStartDate", date)} // Use handleDateChange for date fields
                format="dd/MM/yyyy hh:mm a"
                ampm={true}
                minDate={new Date()} // Disable past dates
                slotProps={{
                  textField: {
                    variant: "outlined",
                    required: true,
                    fullWidth: true,
                    error: isTruthy(tripInformationForm?.tripStartDate?.error),
                    helperText: tripInformationForm?.tripStartDate?.error,
                    inputProps: {
                      placeholder: "DD/MM/YYYY",
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Stack>
        </Box>
      </Grid>

      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <Box>
          <Stack direction="column">
            <InputLabel
              style={{
                display: "flex",
                fontSize: "18px",
                color: theme.palette.text.primary,
                fontWeight: 600,
              }}
              shrink
            >
              Trip End Date & Time
              <Box ml={0.4} style={{ color: "red" }}>
                *
              </Box>
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                disabled={edit}
                value={tripInformationForm?.tripEndDate?.value}
                onChange={(date) => handleTripDateChange("tripEndDate", date)} // Use handleDateChange for date fields
                format="dd/MM/yyyy hh:mm a"
                ampm={true}
                minDate={
                  tripInformationForm?.tripStartDate?.value || new Date()
                } // Disable past dates and dates before Trip Start Date & Time
                slotProps={{
                  textField: {
                    variant: "outlined",
                    required: true,
                    fullWidth: true,
                    error: isTruthy(tripInformationForm?.tripEndDate?.error),
                    helperText: tripInformationForm?.tripEndDate?.error,
                    inputProps: {
                      placeholder: "DD/MM/YYYY",
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <Box>
          <InputLabel
            style={{
              display: "flex",
              fontSize: "18px",
              color: theme.palette.text.primary,
              fontWeight: 600,
            }}
            shrink
          >
            IMEI
            <Box ml={0.4} style={{ color: "red" }}>
              *
            </Box>
          </InputLabel>
          <Autocomplete
            multiple
            id="imei"
            options={imeiOptions}
            disableCloseOnSelect
            getOptionLabel={(option: any) => option?.deviceOnboardingIMEINumber}
            isOptionEqualToValue={(option, value) =>
              option?.deviceOnboardingIMEINumber ===
              value?.deviceOnboardingIMEINumber
            }
            onChange={handleImeiChange}
            value={imeiOptions?.filter((option: any) =>
              tripInformationForm?.imeiNumber?.value?.includes(
                option?.deviceOnboardingIMEINumber
              )
            )}
            renderOption={(props: any, option: any, { selected }: any) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option?.deviceOnboardingIMEINumber}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select IMEIs"
                // error={Boolean(tripInformationForm?.imeiNumber?.error)}
                // helperText={tripInformationForm?.imeiNumber?.error}
              />
            )}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <CustomInput
          required
          disabled={edit}
          id="add_device_group_name_field"
          placeHolder="Enter Vehicle Number"
          name="vehicleNumber"
          label="Vehicle Number"
          onChange={handleFormDataChange}
          value={tripInformationForm?.vehicleNumber?.value}
          error={tripInformationForm?.vehicleNumber?.error}
          propsToInputElement={{ maxLength: strings.USER_LAST_NAME_LIMIT }}
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
          disabled={edit}
          id="add_driver_name_field"
          placeHolder="Enter Driver name"
          name="driverName"
          label="Driver Name"
          onChange={handleFormDataChange}
          value={tripInformationForm?.driverName?.value}
          error={tripInformationForm?.driverName?.error}
          propsToInputElement={{ maxLength: strings.USER_FIRST_NAME_LIMIT }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <CustomInput
          disabled={edit}
          label="Driver Contact Number"
          name="driverContactNumber"
          required={true}
          id="add_driver_contact_number_filed"
          value={tripInformationForm?.driverContactNumber?.value}
          placeHolder="Enter Driver Contact Number"
          onChange={handleFormDataChange}
          error={tripInformationForm?.driverContactNumber?.error}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <CustomInput
          disabled={edit}
          id="add_remarks"
          placeHolder="Enter Remarks"
          name="remarks"
          label="Remarks"
          onChange={handleFormDataChange}
          value={tripInformationForm?.remarks?.value}
          propsToInputElement={{ maxLength: strings.USER_LAST_NAME_LIMIT }}
          sx={{
            input: {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.default,
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default TripInformationForm;
