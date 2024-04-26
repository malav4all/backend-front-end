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
import { insertUserField, validateAddUserForm } from "../AlertConfig.helpers";
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
  const [deviceGroupData, setDeviceGroupData] = useState([]);
  const [deviceGroupInput, setDeviceGroupInput] = useState<string>("");
  const [alertDataInput, setAlertDataInput] = useState<any>({
    event: "",
    location: "",
    startDate: "",
    endDate: "",
    isDailyAlert: false,
    startAlertTime: "",
    endAlertTime: "",
  });

  const [isAlertActivated, setIsAlertActivated] = useState(false);
  const isGeoEvent =
    alertDataInput.event === "geo_in" ||
    alertDataInput.event === "" ||
    alertDataInput.event === "geo_out";

  const isDeviceAlert =
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
  }, [props?.openAddUserDialog]);

  useEffect(() => {
    if (props?.edit && props?.selectedUserRowData) {
      props.setEdit?.(true);
      setUserFormFields(insertUserField(props?.selectedUserRowData));
    }
  }, [props?.selectedUserRowData]);

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
    setIsAlertActivated({
      ...alertDataInput,
      isDailyAlert: event.target.checked,
    });
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
          imei: selectedImeis,
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
    setDeviceGroupInput(deviceGroupName);

    const matchedImeis: any = deviceGroupData?.find(
      (i: any) => i.deviceGroupName === deviceGroupName
    );

    const imeiData =
      matchedImeis?.imeiData?.map((item: any) => String(item.imei)) || [];

    setSelectedImeis(imeiData);
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
                isDailyAlert: false,
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
            </Grid>
          </>
        )}

        {!isGeoEvent && (
          <>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} mt={4}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isAlertActivated}
                      onChange={handleSwitchChange}
                    />
                  }
                  label="Alerts"
                />
              </FormGroup>
            </Grid>

            {isAlertActivated && (
              <>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                  <CustomInput
                    label="Start Time"
                    type="time"
                    id="endDate"
                    name="endDate"
                    value={alertDataInput.startAlertTime}
                    onChange={(event: any) => {
                      setAlertDataInput({
                        ...alertDataInput,
                        startAlertTime: event.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                  <CustomInput
                    label="End Time"
                    type="time"
                    id="endDate"
                    name="endDate"
                    value={alertDataInput.endAlertTime}
                    onChange={(event: any) => {
                      setAlertDataInput({
                        ...alertDataInput,
                        endAlertTime: event.target.value,
                      });
                    }}
                  />
                </Grid>
              </>
            )}
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
