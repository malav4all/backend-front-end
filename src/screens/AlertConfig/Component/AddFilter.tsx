import {
  Box,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  Autocomplete,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import _ from "lodash";
import {
  createUser,
  updateUser,
} from "../../Settings/Users/service/user.service";
import { store } from "../../../utils/store";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../helpers/methods";
import usersStyles from "../../Settings/Users/Users.styles";
import notifiers from "../../../global/constants/NotificationConstants";
import { CustomDialog, CustomInput } from "../../../global/components";
import strings from "../../../global/constants/StringConstants";
import CustomButton from "../../../global/components/NewCustomButton/CustomButton";
import { insertUserField, validateAddUserForm } from "../AlertConfig.helpers";
import { fetchGeozoneHandler } from "../../Geozone/service/geozone.service";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import moment from "moment";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  addAlertConfigRecord,
  updateAlertRecord,
} from "../service/alert.service";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import { SingleInputTimeRangeField } from "@mui/x-date-pickers-pro/SingleInputTimeRangeField";
import { insertDeviceGroupField } from "../../DeviceGroup/DeviceGroupTypeAndValidation";
import { fetchAssetAssingmentDataHandler } from "../../Settings/AssertAssingment/service/AssetAssingment.service";
import { fetchDeviceGroup } from "../../DeviceGroup/service/DeviceGroup.service";
interface CustomProps {
  openAddUserDialog: boolean;
  handleCloseAddUserDialog: Function;
  managerMail: string[];
  roles: any[];
  location?: any;
  tableData: Function;
  isLoading: boolean;
  edit?: boolean;
  selectedUserRowData?: any;
  selectedDeviceGroupRowData?: any;
  setEdit?: any;
}

const AddFilter = (props: CustomProps) => {
  const classes = usersStyles;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [deviceGroupFromFields, setDeviceGroupFromFields] = useState<any>(
    insertDeviceGroupField(props?.selectedDeviceGroupRowData, props.edit)
  );
  const [selectedValues, setSelectedValues] = React.useState<any>({});
  const [locationType, setLocationType] = useState([]);
  const [userFormFields, setUserFormFields] = useState<any>(
    insertUserField(props?.selectedUserRowData)
  );
  const [isLoading, setIsLoading] = useState<any>(false);
  const [imeiData, setImeiData] = useState<any>([]);
  const [selectedImeis, setSelectedImeis] = useState<any>([]);
  const [alertData, setAlertData] = useState<any>([]);
  const [finalLocationIds, setFinalLocationIds] = useState<string[]>([]);
  const [alertDataInput, setAlertDataInput] = useState<any>({
    event: "",
    location: "",
    startDate: "",
    endDate: "",
  });
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const [isAlertActivated, setIsAlertActivated] = useState(false);
  const isGeoEvent =
    alertDataInput.event === "geo_in" ||
    alertDataInput.event === "" ||
    alertDataInput.event === "geo_out";

  useEffect(() => {
    fetchLocationTypeHandler();
  }, []);

  useEffect(() => {
    props.setEdit?.(false);
    setUserFormFields(insertUserField());
  }, [props?.openAddUserDialog]);

  useEffect(() => {
    if (props?.edit && props?.selectedUserRowData) {
      props.setEdit?.(true);
      setUserFormFields(insertUserField(props?.selectedUserRowData));
    }
  }, [props?.selectedUserRowData]);

  useEffect(() => {
    fetchImeiData();
    getDeviceGroupData();
  }, []);

  const handleFormDataChange = (
    formFillEvent: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserFormFields({
      ...userFormFields,
      [formFillEvent?.target?.name]: {
        ...userFormFields[formFillEvent?.target?.name],
        value: formFillEvent?.target?.value,
        error: "",
      },
    });
  };

  const handleSwitchChange = (event: any) => {
    setIsAlertActivated(event.target.checked);
  };

  const handleValidation = () => {
    const { isValid, errors }: any = validateAddUserForm(
      userFormFields,
      props?.edit
    );
    setUserFormFields({ ...errors });
    return isValid;
  };

  const handleEventChange = (event: any) => {
    setAlertDataInput({
      ...alertDataInput,
      event: event.target.value,
    });
  };

  const fetchImeiData = async () => {
    try {
      const res = await fetchAssetAssingmentDataHandler({
        input: {
          page: -1,
          limit: 100,
        },
      });
      setImeiData(res.fetchAssertAssingmentModule.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const handleChange = (event: any, value: any) => {
    const filteredValues = value?.filter((v: any) => typeof v !== "string");
    setSelectedImeis(filteredValues?.map((option: any) => option?.imei));
    const filteredImeis = filteredValues?.map((option: any) => option?._id);
    setDeviceGroupFromFields({
      ...deviceGroupFromFields,
      imeiList: {
        value: filteredImeis,
        error: "",
      },
    });
  };

  const handleSelectAll = (event: any) => {
    if (event?.target?.checked) {
      setSelectedImeis(imeiData?.map((option: any) => option?.imei));
      const newData = imeiData?.map((option: any) => option?._id);
      setDeviceGroupFromFields({
        ...deviceGroupFromFields,
        imeiList: {
          value: newData,
          error: "",
        },
      });
    } else {
      setSelectedImeis([]);
    }
  };

  const handleAutocompleteChange = (newValue: any) => {
    if (
      newValue?.value &&
      newValue?.value?._id &&
      !finalLocationIds.includes(newValue?.value?._id)
    ) {
      setFinalLocationIds((prevIds) => [...prevIds, newValue?.value?._id]);
      setAlertDataInput({
        ...alertDataInput,
        location: newValue?.value,
      });
      setSelectedValues((prev: any) => ({
        ...prev,
        [newValue?.value?._id]: newValue,
      }));
    }
  };

  const addUserDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>
          {props.edit ? "Update Filter" : "Add Filter"}
        </Typography>
      </Box>
    );
  };

  const insertUserDetails = async () => {
    try {
      const insertUserBody = {
        mobileNo: userFormFields.mobileNo.value,
        alertName: userFormFields.alertName.value,
        alertConfig: {
          imei: userFormFields.imei.value,
          alertData: alertData,
        },
      };

      if (props.edit) {
        const res = await updateAlertRecord({
          input: {
            _id: props?.selectedUserRowData?._id,
            ...insertUserBody,
            createdBy: store.getState().auth.userName,
          },
        });
        props.handleCloseAddUserDialog(false);
        openSuccessNotification(res?.updateAlert?.message);
        await props.tableData?.();
      } else {
        const res = await addAlertConfigRecord({
          input: {
            ...insertUserBody,
            createdBy: store.getState().auth.userName,
          },
        });
        props.handleCloseAddUserDialog(false);
        openSuccessNotification(res?.addAlert?.message);
        await props.tableData?.();
      }
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error?.message) ? error?.message : notifiers?.GENERIC_ERROR
      );
    }
  };

  const fetchLocationTypeHandler = async () => {
    try {
      const res = await fetchGeozoneHandler({
        input: {
          page: -1,
          limit: 0,
        },
      });
      setLocationType(res?.listGeozone?.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const isOptionSelected = (option: any) => {
    return selectedImeis?.includes(option?.imei);
  };

  const getDeviceGroupData = async () => {
    try {
      const res = await fetchDeviceGroup({
        input: {
          page: -1,
          limit: 100,
        },
      });
      setFinalLocationIds(res?.fetchDeviceGroup?.data);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
      setIsLoading(false);
    }
  };

  const addUserDialogBody = () => {
    return (
      <Grid container spacing={2} sx={{ padding: "1rem" }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <CustomInput
            label="Alert Name"
            placeHolder="Enter Alert name"
            value={userFormFields?.alertName?.value}
            required
            name="alertName"
            onChange={handleFormDataChange}
            error={userFormFields?.alertName?.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <CustomInput
            required
            id="add_mobile_number_field"
            placeHolder="Enter Mobile Number"
            name="mobileNo"
            label="Mobile Number"
            onChange={handleFormDataChange}
            value={userFormFields?.mobileNo?.value}
            error={userFormFields?.mobileNo?.error}
            propsToInputElement={{ maxLength: strings.USER_LAST_NAME_LIMIT }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <Box>
            <InputLabel sx={classes.inputLabel} shrink>
              Imei
              <Box ml={0.4} sx={classes.star}>
                *
              </Box>
            </InputLabel>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={["Select All", ...imeiData]}
              disableCloseOnSelect
              getOptionLabel={(option: any) =>
                typeof option === "string" ? option : option.imei
              }
              value={selectedImeis?.map((imei: any) =>
                imeiData?.find((option: any) => option?.imei === imei)
              )}
              onChange={handleChange}
              placeholder="Enter Device Group Name"
              renderOption={(props, option, { selected }) => {
                if (typeof option === "string") {
                  return (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selectedImeis?.length === imeiData?.length}
                        onChange={handleSelectAll}
                      />
                      Select All
                    </li>
                  );
                }
                return (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={isOptionSelected(option)}
                    />
                    {option.imei}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={selectedImeis.length === 0 ? "Select Imei" : ""}
                  error={
                    !isTruthy(deviceGroupFromFields.imeiList.value) &&
                    deviceGroupFromFields.imeiList.error
                  }
                />
              )}
            />
            {!isTruthy(deviceGroupFromFields.imeiList.value) &&
              deviceGroupFromFields.imeiList.error && (
                <FormHelperText error sx={classes.errorStyle}>
                  {deviceGroupFromFields.imeiList.error}
                </FormHelperText>
              )}
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={2}
          lg={2}
          xl={2}
          spacing={2}
          sx={{ marginTop: "3rem", fontWeight: "bold" }}
        >
          <div style={{ marginLeft: "2.5rem" }}>Or</div>
        </Grid>

        <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
          <Box>
            <Stack direction="column">
              <InputLabel sx={classes.inputLabel} shrink>
                Device Group
                <Box ml={0.4} sx={classes.star}>
                  *
                </Box>
              </InputLabel>
              <Select
                id="add_filter_status_dropdown"
                name="deviceGroup"
                sx={{ padding: "-5rem" }}
                value={alertDataInput.event}
                onChange={(e: any) => {
                  setAlertDataInput({
                    ...alertDataInput,
                    event: e.target.value,
                  });
                }}
                MenuProps={classes.menuProps}
                displayEmpty
                renderValue={(selectedValue: any) => {
                  const selectedItem = [
                    { code: "geo_in", value: "Geo In" },
                    { code: "geo_out", value: "Geo Out" },
                    { code: "locked", value: "Locked" },
                    { code: "unlocked", value: "Unlocked" },
                    { code: "other", value: "Tamper" },
                  ].find((item: any) => item.code === selectedValue);
                  return selectedItem ? selectedItem.value : "Select Group";
                }}
              >
                {finalLocationIds.map((item: any, index: any) => (
                  <MenuItem
                    key={index}
                    value={item?.deviceGroupName}
                    sx={classes.dropDownOptionsStyle}
                  >
                    {item?.deviceGroupName}
                  </MenuItem>
                ))}
              </Select>

              {!isTruthy(userFormFields?.status?.value) && (
                <FormHelperText error sx={classes.errorStyle}>
                  {userFormFields.status?.error}
                </FormHelperText>
              )}
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
          <Box>
            <Stack direction="column">
              <InputLabel sx={classes.inputLabel} shrink>
                Event
                <Box ml={0.4} sx={classes.star}>
                  *
                </Box>
              </InputLabel>
              <Select
                id="add_filter_status_dropdown"
                name="eventName"
                value={alertDataInput.event}
                onChange={handleEventChange}
                displayEmpty
              >
                {[
                  { code: "geo_in", value: "Geo In" },
                  { code: "geo_out", value: "Geo Out" },
                  { code: "locked", value: "Locked" },
                  { code: "unlocked", value: "Unlocked" },
                  { code: "other", value: "Tamper" },
                ].map((item, index) => (
                  <MenuItem key={index} value={item.code}>
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
              {!alertDataInput.event && (
                <FormHelperText error>Please select an event</FormHelperText>
              )}
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} sm={5.2} md={5.2} lg={5.2} xl={5.2}>
          <Box>
            <InputLabel sx={classes.inputLabel} shrink>
              Location
              <Box ml={0.4} sx={classes.star}>
                *
              </Box>
            </InputLabel>

            <Autocomplete
              sx={classes.emailDropDownStyle}
              inputValue={alertDataInput.location.name || ""}
              options={
                locationType
                  ?.filter(
                    (tItem) =>
                      !Object.values(selectedValues).find(
                        (selected: any) => selected?.value === tItem
                      )
                  )
                  .map((item: any) => ({
                    key: item._id,
                    label: `${item.name}`,
                    value: item,
                  })) || []
              }
              onChange={(event, newValue) => {
                handleAutocompleteChange(newValue);
              }}
              renderInput={(params) => {
                const InputProps = { ...params.InputProps };
                InputProps.endAdornment = null;
                return (
                  <TextField
                    sx={classes.select2}
                    {...params}
                    value={alertDataInput.location.name}
                    name="startLocation"
                    placeholder="Search location"
                    onSelect={() => {}}
                    InputProps={InputProps}
                  />
                );
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={1} md={1} lg={1} xl={1} mt={4}>
          <Box
            component={"div"}
            onClick={() => {
              if (alertDataInput.location.name !== "") {
                setAlertData((prev: any) => [...prev, alertDataInput]);
                setAlertDataInput({
                  event: "",
                  location: {
                    name: "",
                  },
                  startDate: "",
                  endDate: "",
                });
              }
            }}
          >
            <AddIcon fontSize="large" style={{ cursor: "pointer" }} />
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={isAlertActivated}
                  onChange={handleSwitchChange}
                />
              }
              label="Activate Alerts"
            />
          </FormGroup>
          {isAlertActivated && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box>
                <MultiInputTimeRangeField
                  slotProps={{
                    textField: ({ position }) => ({
                      label: position === "start" ? "From" : "To",
                    }),
                  }}
                />
              </Box>
            </LocalizationProvider>
          )}
        </Grid>

        <Grid
          container
          spacing={2}
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <CustomInput
              label="Alert Name"
              placeHolder="Enter Alert name"
              value={userFormFields?.alertName?.value}
              required
              name="alertName"
              onChange={handleFormDataChange}
              error={userFormFields?.alertName?.error}
            />
          </Grid>

          {!isGeoEvent && (
            <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  label="Start Date"
                  type="datetime-local"
                  id="startDate"
                  name="startDate"
                  value={alertDataInput.startDate}
                  onChange={(event: any) => {
                    setAlertDataInput({
                      ...alertDataInput,
                      startDate: event.target.value,
                    });
                  }}
                  propsToInputElement={{
                    min: moment().format("YYYY-MM-DDTHH:mm"),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  label="End Date"
                  type="datetime-local"
                  id="endDate"
                  name="endDate"
                  value={alertDataInput.endDate}
                  onChange={(event: any) => {
                    setAlertDataInput({
                      ...alertDataInput,
                      endDate: event.target.value,
                    });
                  }}
                  propsToInputElement={{
                    min: moment().format("YYYY-MM-DDTkk:mm A"),
                  }}
                />
              </Grid>
            </Grid>
          )}
        </Grid>

        {/* <CustomLoader isLoading={isLoading} /> */}
      </Grid>
    );
  };

  const addUserDialogFooter = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <Box sx={classes.dialogFooter}>
          <CustomButton
            id="add_user_cancel_button"
            label="Cancel"
            onClick={() => {
              props?.handleCloseAddUserDialog();
              console.log(userFormFields);
            }}
            customClasses={classes.cancelButtonStyle}
          />
          <CustomButton
            id="add_user_submit_button"
            // label="Add"
            label={props.edit ? "Update" : "Add"}
            onClick={insertUserDetails}
          />
        </Box>
      </Grid>
    );
  };

  const getAddUserDialog = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <CustomDialog
          isDialogOpen={props.openAddUserDialog}
          closable
          closeButtonVisibility
          handleDialogClose={props.handleCloseAddUserDialog}
          dialogTitleContent={addUserDialogTitle()}
          dialogBodyContent={addUserDialogBody()}
          dialogFooterContent={addUserDialogFooter()}
          width={"700px"}
          fullScreen={false}
        />
      </Grid>
    );
  };

  return <Box>{getAddUserDialog()}</Box>;
};

export default AddFilter;
