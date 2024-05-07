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
  Chip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import _ from "lodash";
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
import { insertUserField, validateAddFilterForm } from "../AlertConfig.helpers";
import { fetchGeozoneHandler } from "../../Geozone/service/geozone.service";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import moment from "moment";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  addAlertConfigRecord,
  updateAlertRecord,
} from "../service/alert.service";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
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
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

const AddFilter = (props: CustomProps) => {
  const classes = usersStyles;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [deviceGroupFromFields, setDeviceGroupFromFields] = useState<any>({
    imeiList: [],
  });
  const [deviceGroupId, setDeviceGroupId] = React.useState<any>("");
  const [selectedValues, setSelectedValues] = React.useState<any>({});
  const [locationType, setLocationType] = useState([]);
  const [userFormFields, setUserFormFields] = useState<any>(
    insertUserField(props?.selectedUserRowData)
  );
  const [isLoading, setIsLoading] = useState<any>(false);
  const [imeiData, setImeiData] = useState<any>([]);
  const [imeiUser, setImeiUser] = useState<any>([]);
  const [selectedImeis, setSelectedImeis] = useState<any>([]);
  const [alertData, setAlertData] = useState<any>([]);
  const [deviceName, setDeviceName] = useState<any>([]);
  const [finalLocationIds, setFinalLocationIds] = useState<string[]>([]);
  const [deviceGroupData, setDeviceGroupData] = useState([]);
  const [deviceGroupInput, setDeviceGroupInput] = useState<string>(
    props?.selectedUserRowData?.alertConfig?.alertImeiGroup?.deviceGroupName
  );
  const [alertDataInput, setAlertDataInput] = useState<any>({
    event: "",
    location: "",
    startDate: "",
    endDate: "",
    startAlertTime: "",
    endAlertTime: "",
  });

  const [isAlertActivated, setIsAlertActivated] = useState(true);
  const isGeoEvent =
    alertDataInput.event === "geo_in" ||
    alertDataInput.event === "" ||
    alertDataInput.event === "geo_out";

  const isDeviceAlert =
    alertDataInput.event === "" ||
    alertDataInput.event === "locked" ||
    alertDataInput.event === "unlocked" ||
    alertDataInput.event === "other";

  useEffect(() => {
    fetchLocationTypeHandler();
    fetchImeiData();
    getDeviceGroupData();
  }, []);

  useEffect(() => {
    props.setEdit?.(false);
    setUserFormFields(insertUserField());
    setDeviceGroupInput("");
    setDeviceName([]);
    setAlertData([]);
    setSelectedImeis([]);
    setDeviceGroupId("");
    setDeviceGroupFromFields({
      imeiList: [],
    });
  }, [props?.openAddUserDialog]);

  useEffect(() => {
    if (props?.edit && props?.selectedUserRowData) {
      props.setEdit?.(true);
      setDeviceGroupInput(
        props?.selectedUserRowData?.alertConfig?.alertImeiGroup?.deviceGroupName
      );
      setDeviceName(props?.selectedUserRowData?.alertConfig?.userSelectedImei);
      setAlertData(props?.selectedUserRowData?.alertConfig?.alertData);
      setSelectedImeis(
        props?.selectedUserRowData?.alertConfig?.alertImeiGroup?.imei
      );
      setDeviceGroupFromFields({
        imeiList: props?.selectedUserRowData?.alertConfig?.userSelectedImei,
      });
      setDeviceGroupId(
        props?.selectedUserRowData?.alertConfig?.alertImeiGroup?.deviceGroupId
      );
      setUserFormFields(insertUserField(props?.selectedUserRowData));
    }
  }, [props?.selectedUserRowData, props.edit]);

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

  const handleValidation = () => {
    const { isValid, errors } = validateAddFilterForm(
      userFormFields,
      alertDataInput,
      isDeviceAlert
    );
    setUserFormFields({ ...errors });
    return isValid;
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAlertActivated(event.target.checked);
  };

  const handleEventChange = (event: any) => {
    let eventType = event.target.value;

    setAlertDataInput({
      ...alertDataInput,
      event: eventType,
    });

    setUserFormFields((prev: any, event: any) => ({
      ...prev,
      eventName: {
        ...prev.eventName,
        value: eventType,
        error: "",
      },
    }));
  };

  const fetchImeiData = async () => {
    try {
      const res = await fetchAssetAssingmentDataHandler({
        input: {
          page: -1,
          limit: 10,
        },
      });
      setImeiData(res.fetchAssertAssingmentModule.data);
      setImeiUser(res.fetchAssertAssingmentModule.data);
    } catch (error: any) {
      openErrorNotification(error.message);
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
      <>
        <Box>
          <Typography sx={classes.boldFonts}>
            {props.edit
              ? "Update Alert Configuration"
              : "Add Alert Configuration"}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "end", display: "flex", justifyContent: "end" }}>
          <FormGroup
            sx={{ textAlign: "end", display: "flex", justifyContent: "end" }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={isAlertActivated}
                  onChange={handleSwitchChange}
                  color="warning"
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Enable"
              labelPlacement="start"
            />
          </FormGroup>
        </Box>
      </>
    );
  };

  const insertUserDetails = async () => {
    try {
      const insertUserBody = {
        mobileNo: userFormFields.mobileNo.value,
        alertName: userFormFields.alertName.value,
        isAlertDisable: isAlertActivated,
        alertConfig: {
          alertImeiGroup: {
            deviceGroupName: deviceGroupInput,
            imei: selectedImeis,
            deviceGroupId: deviceGroupId,
          },
          userSelectedImei: deviceGroupFromFields?.imeiList || [],
          alertData: alertData,
        },
      };
      if (handleValidation()) {
        if (props.edit) {
          const res = await updateAlertRecord({
            input: {
              _id: props?.selectedUserRowData?._id,
              ...insertUserBody,
              createdBy: store.getState().auth.userName,
              __typename: undefined,
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

  const getDeviceGroupData = async () => {
    try {
      const res = await fetchDeviceGroup({
        input: {
          page: -1,
          limit: 10,
        },
      });
      setDeviceGroupData(res?.fetchDeviceGroup?.data);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
      setIsLoading(false);
    }
  };

  const handleDeviceGroupSelect = (e: any) => {
    const deviceGroupName = e.target.value;
    setDeviceGroupId(deviceGroupName);
    setDeviceGroupInput(deviceGroupName);

    setUserFormFields((prev: any) => ({
      ...prev,
      deviceGroup: {
        ...prev.deviceGroup,
        value: deviceGroupName,
        error: "",
      },

      deviceName: {
        ...prev.deviceName,
        value: imeiData.join(", "),
        error: "",
      },
    }));

    const matchedImeis: any = deviceGroupData?.find(
      (i: any) => i._id === deviceGroupName
    );
    setDeviceGroupInput(matchedImeis.deviceGroupName);
    const imeiData =
      matchedImeis?.imeiData?.map((item: any) => String(item.imei)) || [];

    setSelectedImeis(imeiData);
  };

  const isOptionSelected = (option: any) => {
    return deviceName?.includes(option?.imei);
  };

  const handleSelectAll = (event: any) => {
    if (event?.target?.checked) {
      setDeviceName(imeiUser?.map((option: any) => option?.imei));
      const newData = imeiUser?.map((option: any) => String(option?.imei));
      setDeviceGroupFromFields({
        ...deviceGroupFromFields,
        imeiList: newData,
      });
    } else {
      setDeviceName([]);
    }
  };

  const handleChange = (event: any, value: any) => {
    const filteredValues = value?.filter((v: any) => typeof v !== "string");
    setDeviceName(filteredValues?.map((option: any) => option?.imei));
    const filteredImeis = filteredValues?.map((option: any) =>
      String(option?.imei)
    );
    setDeviceGroupFromFields({
      ...deviceGroupFromFields,
      imeiList: filteredImeis,
    });

    setUserFormFields((prev: any) => ({
      ...prev,
      deviceName: {
        ...prev.deviceName,
        value: value.map((option: any) => option.labelName).join(", "),
      },
    }));
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

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box>
            <InputLabel sx={classes.inputLabel} shrink>
              Device Name
              <Box ml={0.4} sx={classes.star}>
                *
              </Box>
            </InputLabel>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={["Select All", ...imeiUser]}
              disableCloseOnSelect
              getOptionLabel={(option: any) =>
                typeof option === "string" ? option : option?.labelName
              }
              value={deviceName?.map((imei: any) =>
                imeiUser?.find((option: any) => option?.imei === imei)
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
                        checked={deviceName?.length === imeiUser?.length}
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
                    {option.labelName}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={
                    deviceName?.length === 0 ? "Select Device Name" : ""
                  }
                />
              )}
            />
            {deviceName.length === 0 && (
              <FormHelperText error sx={classes.errorStyle}>
                {userFormFields.deviceName?.error}
              </FormHelperText>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
                value={deviceGroupInput}
                onChange={(e: any) => {
                  handleDeviceGroupSelect(e);
                }}
                MenuProps={classes.menuProps}
                displayEmpty
                renderValue={() => deviceGroupInput || "Select Group"}
              >
                {deviceGroupData.map((item: any, index: any) => (
                  <MenuItem
                    key={index}
                    value={item?._id}
                    sx={classes.dropDownOptionsStyle}
                  >
                    {item?.deviceGroupName}
                  </MenuItem>
                ))}
              </Select>

              {!deviceGroupInput && (
                <FormHelperText error sx={classes.errorStyle}>
                  {userFormFields.deviceGroup?.error}
                </FormHelperText>
              )}
            </Stack>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={5}
          md={!isDeviceAlert ? 5.2 : 5.2}
          lg={!isDeviceAlert ? 5.2 : 5.2}
          xl={!isDeviceAlert ? 5.2 : 10}
        >
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
                renderValue={() => alertDataInput.event || "Select Event"}
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
            </Stack>
            {!alertDataInput.event && (
              <FormHelperText error sx={classes.errorStyle}>
                {userFormFields.eventName?.error}
              </FormHelperText>
            )}
          </Box>
        </Grid>

        {!isDeviceAlert && (
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
              {!alertDataInput.location.name && (
                <FormHelperText error sx={classes.errorStyle}>
                  {userFormFields.startLocation?.error}
                </FormHelperText>
              )}
            </Box>
          </Grid>
        )}

        <Grid item xs={12} sm={1} md={1} lg={1} xl={1} mt={4}>
          <Box
            component={"div"}
            onClick={() => {
              setAlertData((prev: any) => [...prev, alertDataInput]);
              setAlertDataInput({
                event: "",
                location: {
                  name: "",
                },
                startDate: "",
                endDate: "",
                startAlertTime: "",
                endAlertTime: "",
              });
            }}
          >
            <AddIcon fontSize="large" style={{ cursor: "pointer" }} />
          </Box>
        </Grid>

        {!isGeoEvent && (
          <>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
              {!userFormFields.startDate && (
                <FormHelperText error sx={classes.errorStyle}>
                  {userFormFields.startDate?.error}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
              {!userFormFields.endDate && (
                <FormHelperText error sx={classes.errorStyle}>
                  {userFormFields.endDate?.error}
                </FormHelperText>
              )}
            </Grid>
          </>
        )}

        {!isGeoEvent && (
          <>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CustomInput
                label="Start Time"
                type="time"
                id="startAlertTime"
                name="startAlertTime"
                value={alertDataInput.startAlertTime}
                onChange={(event: any) => {
                  setAlertDataInput({
                    ...alertDataInput,
                    startAlertTime: event.target.value,
                  });
                }}
              />
              {!userFormFields.startAlertTime && (
                <FormHelperText error sx={classes.errorStyle}>
                  {userFormFields.startAlertTime?.error}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CustomInput
                label="End Time"
                type="time"
                id="endAlertTime"
                name="endAlertTime"
                value={alertDataInput.endAlertTime}
                onChange={(event: any) => {
                  setAlertDataInput({
                    ...alertDataInput,
                    endAlertTime: event.target.value,
                  });
                }}
              />
              {!userFormFields.endAlertTime && (
                <FormHelperText error sx={classes.errorStyle}>
                  {userFormFields.endAlertTime?.error}
                </FormHelperText>
              )}
            </Grid>
          </>
        )}

        <Grid container>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {alertData?.map((tag: any, index: any) => (
              <Chip
                key={index}
                label={`${tag.event}`}
                sx={{
                  marginLeft: "20px",
                  marginTop: "8px",
                  borderRadius: "5px",
                  fontSize: "15px",
                  backgroundColor: "#ECF9FF",
                }}
                variant="filled"
                onDelete={() =>
                  setAlertData(
                    alertData.filter((item: any, i: any) => i !== index)
                  )
                }
              />
            ))}
          </Box>
        </Grid>
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