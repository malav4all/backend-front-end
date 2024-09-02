import {
  Box,
  Chip,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CustomButton,
  CustomDialog,
  CustomInput,
} from "../../../../global/components";
import { theme } from "../../../../utils/styles";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../../helpers/methods";
import _ from "lodash";
import {
  addDeviceModel,
  deviceModelUpdate,
} from "../service/deviceModule.service";
import { store } from "../../../../utils/store";
import DeviceOnboardingStyle from "../../DeviceOnboarding/DeviceOnboarding.styles";
import {
  deviceModuleInsertField,
  validateDeviceModelForm,
} from "../DeviceModelHelpers";

interface CustomProps {
  openAddUserDialog: boolean;
  handleCloseAddUserDialog?: Function;
  managerMail?: string[];
  edit?: boolean;
  location?: any;
  tableData?: Function;
  isLoading?: boolean;
  selectedRowData?: any;
}

const AddDeviceModule = (props: CustomProps) => {
  const classes = DeviceOnboardingStyle;
  const [deviceFields, setDeviceFields] = useState<any>(
    deviceModuleInsertField(props?.selectedRowData)
  );
  const [commandConfig, setCommandConfig] = useState<any>([]);
  const [commandDetail, setCommandDetail] = useState<any>([]);

  useEffect(() => {
    setDeviceFields(deviceModuleInsertField());
    setCommandConfig([]);
    setCommandDetail([]);
  }, [props.edit, props.openAddUserDialog]);

  useEffect(() => {
    if (props.edit && props.selectedRowData) {
      setDeviceFields(deviceModuleInsertField(props.selectedRowData));
      setCommandConfig(props?.selectedRowData?.deviceModelCommands);
      setCommandDetail(props?.selectedRowData?.deviceModelConfig);
    }
  }, [props.selectedRowData]);

  const onChangeHandler = (event: any) => {
    setDeviceFields({
      ...deviceFields,
      [event?.target?.name]: {
        value: event.target.value,
        error: "",
      },
    });
  };

  const handleValidation = () => {
    const { isValid, errors } = validateDeviceModelForm(deviceFields);
    setDeviceFields(errors);
    return isValid;
  };

  const addUserDialogTitle = () => {
    return (
      <Box>
        <Typography sx={{ ...classes.boldFonts, marginBottom: "1rem" }}>
          {props.edit ? "Update Model" : "Add Model"}
        </Typography>
      </Box>
    );
  };

  const addDeviceModelHandler = async () => {
    if (!handleValidation()) return;

    try {
      const deviceModelPayload = {
        deviceModelName: deviceFields.deviceModelName.value,
        deviceModel: deviceFields.deviceModel.value,
        deviceModelIpAddress: deviceFields.deviceModelIpAddress.value,
        deviceModelPortNumber: Number(deviceFields.deviceModelPortNumber.value),
        deviceModelSimCount: Number(deviceFields.deviceModelSimCount.value),
        deviceModelNetworkType: deviceFields.deviceModelNetworkType.value,
        deviceModelParser: deviceFields.deviceModelParser.value,
        deviceModelType: deviceFields.deviceModelType.value,
        deviceModelCommands: commandDetail,
        deviceModelConfig: commandConfig,
      };
      if (props.edit) {
        const res = await deviceModelUpdate({
          input: {
            ...deviceModelPayload,
            _id: props.selectedRowData._id,
            updatedBy: store.getState().auth.userName,
          },
        });
        openSuccessNotification(res?.updateDeviceModel?.message);
      } else {
        const res = await addDeviceModel({
          input: {
            ...deviceModelPayload,
            createdBy: store.getState().auth.userName,
          },
        });

        openSuccessNotification(res?.createDeviceModel?.message);
      }
      props.handleCloseAddUserDialog?.(false);
      await props.tableData?.();
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const addUserDialogFooter = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <Box sx={classes.dialogFooter}>
          <CustomButton
            id="add_user_cancel_button"
            label="Cancel"
            onClick={() => props?.handleCloseAddUserDialog?.()}
            customClasses={{
              ...classes.cancelButtonStyle,
            }}
          />
          <CustomButton
            id="add_user_submit_button"
            label={props.edit ? "Update" : "Add"}
            onClick={addDeviceModelHandler}
            // loading={loading}
          />
        </Box>
      </Grid>
    );
  };

  const validateAccountConfig = () => {
    if (
      !isTruthy(deviceFields.deviceConfigKey.value) &&
      !isTruthy(deviceFields.deviceConfigValue.value)
    ) {
      setDeviceFields((prevData: any) => ({
        ...prevData,
        deviceConfigKey: {
          ...prevData.tagsValue,
          error: "key cant be empty",
        },
        deviceConfigValue: {
          ...prevData.tagsValue,
          error: "Value cant be empty",
        },
      }));
      return false;
    }
    const checkExistingValue = commandConfig?.some(
      (item: any) =>
        item?.key === deviceFields.deviceConfigKey.value &&
        item?.value === deviceFields.deviceConfigValue.value
    );
    if (checkExistingValue) {
      setDeviceFields((prevData: any) => ({
        ...prevData,
        deviceConfigKey: {
          ...prevData.accountKey,
          error: "You cannot add duplicate Key",
        },
        deviceConfigValue: {
          ...prevData.accountValue,
          error: "You cannot add duplicate value",
        },
      }));
      return false;
    }
    return true;
  };

  const addAccountConfig = () => {
    if (validateAccountConfig()) {
      const addedConfig: any[] = [];
      addedConfig.push(...commandConfig, {
        key: deviceFields.deviceConfigKey.value,
        value: deviceFields.deviceConfigValue.value,
      });

      const filterValue: any = addedConfig.map((obj) => {
        const { __typename, ...rest } = obj;
        return rest;
      });

      setCommandConfig(filterValue);
      setDeviceFields((prevData: any) => ({
        ...prevData,
        deviceConfigKey: { value: "", error: "" },
        deviceConfigValue: { value: "", error: "" },
      }));
    }
  };

  const validateDeviceCommand = () => {
    if (
      !isTruthy(deviceFields.deviceCommandKey.value) &&
      !isTruthy(deviceFields.deviceCommandValue.value)
    ) {
      setDeviceFields((prevData: any) => ({
        ...prevData,
        deviceCommandKey: {
          ...prevData.deviceCommandKey,
          error: "key cant be empty",
        },
        deviceCommandValue: {
          ...prevData.deviceCommandValue,
          error: "Value cant be empty",
        },
      }));
      return false;
    }
    const checkExistingValue = commandDetail?.some(
      (item: any) =>
        item?.key === deviceFields.deviceCommandKey.value &&
        item?.value === deviceFields.deviceCommandValue.value
    );
    if (checkExistingValue) {
      setDeviceFields((prevData: any) => ({
        ...prevData,
        deviceCommandKey: {
          ...prevData.deviceCommandKey,
          error: "You cannot add duplicate Key",
        },
        deviceCommandValue: {
          ...prevData.deviceCommandValue,
          error: "You cannot add duplicate value",
        },
      }));
      return false;
    }
    return true;
  };

  const addAccountCommand = () => {
    if (validateDeviceCommand()) {
      const addedConfig: any[] = [];
      addedConfig.push(...commandConfig, {
        key: deviceFields.deviceCommandKey.value,
        value: deviceFields.deviceCommandValue.value,
      });

      const filterValue: any = addedConfig.map((obj) => {
        const { __typename, ...rest } = obj;
        return rest;
      });
      setCommandDetail(filterValue);
      setDeviceFields((prevData: any) => ({
        ...prevData,
        deviceCommandKey: { value: "", error: "" },
        deviceCommandValue: { value: "", error: "" },
      }));
    }
  };

  const addUserDialogBody = () => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              required
              id="add_user_first_name_field"
              placeHolder="Enter Device Model Name"
              name="deviceModelName"
              label="Device Model Name"
              onChange={onChangeHandler}
              value={deviceFields.deviceModelName.value}
              error={deviceFields.deviceModelName.error}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Box>
              <Stack direction="column">
                <InputLabel sx={classes.inputLabel} shrink>
                  Device Model Type
                  <Box ml={0.4} sx={classes.star}>
                    *
                  </Box>
                </InputLabel>
                <Select
                  sx={classes.dropDownStyle}
                  id="add_user_roles_dropdown"
                  name="deviceModelType"
                  value={deviceFields.deviceModelType.value}
                  onChange={onChangeHandler}
                  renderValue={
                    deviceFields.deviceModelType.value !== ""
                      ? undefined
                      : () => "Select a Device Sim Count"
                  }
                  MenuProps={classes.menuProps}
                  displayEmpty
                  error={
                    deviceFields.deviceModelType.value?.length < 4 &&
                    deviceFields.deviceModelType.error?.length !== 0
                  }
                >
                  {["Lock", "Seal", "Load Cell", "Tracker"]?.map(
                    (item: any, index: any) => (
                      <MenuItem
                        key={index}
                        value={item}
                        sx={classes.dropDownOptionsStyle}
                      >
                        {item}
                      </MenuItem>
                    )
                  )}
                </Select>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              required
              id="add_user_first_name_field"
              placeHolder="Enter Device Model"
              name="deviceModel"
              label="Device Model"
              onChange={onChangeHandler}
              value={deviceFields.deviceModel.value}
              error={deviceFields.deviceModel.error}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              required
              id="add_user_first_name_field"
              placeHolder="Enter Device Ip"
              name="deviceModelIpAddress"
              label="Device Ip Address"
              onChange={onChangeHandler}
              value={deviceFields.deviceModelIpAddress.value}
              error={deviceFields.deviceModelIpAddress.error}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              required
              id="add_user_first_name_field"
              placeHolder="Enter Device Port No"
              name="deviceModelPortNumber"
              label="Device Port No"
              onChange={onChangeHandler}
              value={deviceFields.deviceModelPortNumber.value}
              error={deviceFields.deviceModelPortNumber.error}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Box>
              <Stack direction="column">
                <InputLabel sx={{ ...classes.inputLabel }} shrink>
                  Device Sim Count
                  <Box ml={0.4} sx={classes.star}>
                    *
                  </Box>
                </InputLabel>
                <Select
                  sx={classes.dropDownStyle}
                  id="add_user_roles_dropdown"
                  name="deviceModelSimCount"
                  value={deviceFields.deviceModelSimCount.value}
                  onChange={onChangeHandler}
                  renderValue={
                    deviceFields.deviceModelSimCount.value !== ""
                      ? undefined
                      : () => "Select a Device Sim Count"
                  }
                  MenuProps={classes.menuProps}
                  displayEmpty
                  error={
                    deviceFields.deviceModelSimCount.value?.length < 4 &&
                    deviceFields.deviceModelSimCount.error?.length !== 0
                  }
                >
                  {["1", "2"]?.map((item: any, index: any) => (
                    <MenuItem
                      key={index}
                      value={item}
                      sx={classes.dropDownOptionsStyle}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText
                  error
                  sx={{
                    paddingLeft: "17px",
                    fontWeight: "bolder",
                    fontSize: "12px",
                    letterSpacing: 0,
                  }}
                >
                  {deviceFields.deviceModelNetworkType.error}
                </FormHelperText>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Box>
              <Stack direction="column">
                <InputLabel sx={classes.inputLabel} shrink>
                  Device Network Type
                  <Box ml={0.4} sx={classes.star}>
                    *
                  </Box>
                </InputLabel>
                <Select
                  sx={classes.dropDownStyle}
                  id="add_user_roles_dropdown"
                  name="deviceModelNetworkType"
                  value={deviceFields.deviceModelNetworkType.value}
                  onChange={onChangeHandler}
                  renderValue={
                    deviceFields.deviceModelNetworkType.value !== ""
                      ? undefined
                      : () => "Select a Device Network Type"
                  }
                  MenuProps={classes.menuProps}
                  displayEmpty
                  error={
                    deviceFields.deviceModelNetworkType.value?.length < 4 &&
                    deviceFields.deviceModelNetworkType.error?.length !== 0
                  }
                >
                  {["2G", "3G", "4G", "5G"]?.map((item: any, index: any) => (
                    <MenuItem
                      key={index}
                      value={item}
                      sx={classes.dropDownOptionsStyle}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText
                  error
                  sx={{
                    paddingLeft: "17px",
                    fontWeight: "bolder",
                    fontSize: "12px",
                    letterSpacing: 0,
                  }}
                >
                  {deviceFields.deviceModelNetworkType.error}
                </FormHelperText>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              required
              id="add_user_first_name_field"
              placeHolder="Enter Device Parser Name"
              name="deviceModelParser"
              label="Device Parser Name"
              onChange={onChangeHandler}
              value={deviceFields.deviceModelParser.value}
              error={deviceFields.deviceModelParser.error}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={12} lg={12} xl={12} mt={2}>
          <Grid container gap={2}>
            <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
              <CustomInput
                label="Device Config Key"
                id="recipient_modal_tags_field"
                type="text"
                name="deviceConfigKey"
                placeHolder="Enter Device Config Key"
                error={deviceFields.deviceConfigKey.error}
                onChange={onChangeHandler}
                value={deviceFields.deviceConfigKey.value}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
              <CustomInput
                label="Device Config value"
                id="recipient_modal_tags_field"
                type="text"
                name="deviceConfigValue"
                placeHolder="Enter Account value"
                error={deviceFields.deviceConfigValue.error}
                onChange={onChangeHandler}
                value={deviceFields.deviceConfigValue.value}
              />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3} xl={3}>
              <CustomButton
                id="recipient_modal_add_tag_button"
                customClasses={{
                  width: "100%",
                  marginTop: "30px",
                  [theme.breakpoints.down("lg")]: {
                    marginTop: theme.spacing(0),
                  },
                }}
                onClick={addAccountConfig}
                label="Add"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xl={6}>
              {commandConfig?.map((tag: any, index: any) => (
                <Chip
                  key={index}
                  label={`${tag.key} - ${tag.value}`}
                  sx={{
                    marginLeft: "5px",
                    marginTop: "8px",
                    borderRadius: "5px",
                    fontSize: "15px",
                    backgroundColor: "#ECF9FF",
                  }}
                  variant="filled"
                  onDelete={() => {
                    setCommandConfig(
                      commandConfig
                        .filter((item: any, i: number) => i !== index)
                        .map((obj: any) => {
                          const { __typename, ...rest } = obj;
                          return rest;
                        })
                    );
                  }}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={12} lg={12} xl={12} mt={2}>
          <Grid container gap={2}>
            <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
              <CustomInput
                label="Device Command Name"
                id="recipient_modal_tags_field"
                type="text"
                name="deviceCommandKey"
                placeHolder="Enter Device Command Name"
                error={deviceFields.deviceCommandKey.error}
                onChange={onChangeHandler}
                value={deviceFields.deviceCommandKey.value}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
              <CustomInput
                label="Device Command Value"
                id="recipient_modal_tags_field"
                type="text"
                name="deviceCommandValue"
                placeHolder="Enter Device Command Name"
                error={deviceFields.deviceCommandValue.error}
                onChange={onChangeHandler}
                value={deviceFields.deviceCommandValue.value}
              />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3} xl={3}>
              <CustomButton
                id="recipient_modal_add_tag_button"
                customClasses={{
                  width: "100%",
                  marginTop: "30px",
                  [theme.breakpoints.down("lg")]: {
                    marginTop: theme.spacing(0),
                  },
                }}
                onClick={addAccountCommand}
                label="Add"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xl={6}>
              {commandDetail?.map((tag: any, index: any) => (
                <Chip
                  key={index}
                  label={`${tag.key} - ${tag.value}`}
                  sx={{
                    marginLeft: "5px",
                    marginTop: "8px",
                    borderRadius: "5px",
                    fontSize: "15px",
                    backgroundColor: "#ECF9FF",
                  }}
                  variant="filled"
                  onDelete={() =>
                    setCommandDetail(
                      commandDetail
                        .filter((item: any, i: number) => i !== index)
                        .map((obj: any) => {
                          const { __typename, ...rest } = obj;
                          return rest;
                        })
                    )
                  }
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </>
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
          // dialogHeaderContent={addUserHeaderImg()}
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

export default AddDeviceModule;
