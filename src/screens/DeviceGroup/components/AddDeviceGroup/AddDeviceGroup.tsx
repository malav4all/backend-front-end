import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import _ from "lodash";
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
import addDeviceGroupStyles from "./AddDeviceGroup.styles";
import {
  insertDeviceGroupField,
  validateAddDeviceGroupForm,
} from "../../DeviceGroupTypeAndValidation";
import { fetchAssetAssingmentDataHandler } from "../../../Settings/AssertAssingment/service/AssetAssingment.service";
import CustomAutoComplete from "../../../../global/components/CustomAutoComplete/CustomAutoComplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  addDeviceGroup,
  updateDeviceGroup,
} from "../../service/DeviceGroup.service";
interface CustomProps {
  openAddDeviceGroupDialog: boolean;
  handleCloseAddDeviceGroupDialog: Function;
  roles: any[];
  tableData: Function;
  isLoading: boolean;
  edit?: boolean;
  selectedDeviceGroupRowData?: any;
  setEdit?: any;
}
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const AddDeviceGroup = (props: CustomProps) => {
  const classes = addDeviceGroupStyles;
  const [deviceGroupFromFields, setDeviceGroupFromFields] = useState<any>(
    insertDeviceGroupField(props?.selectedDeviceGroupRowData)
  );
  const [imeiData, setImeiData] = useState<any>([]);
  const [selectedImeis, setSelectedImeis] = useState<any>([]);
  useEffect(() => {
    props.setEdit?.(false);
    setDeviceGroupFromFields(insertDeviceGroupField());
  }, [props.openAddDeviceGroupDialog]);

  useEffect(() => {
    if (props.edit && props.selectedDeviceGroupRowData) {
      props.setEdit?.(true);
      setDeviceGroupFromFields(
        insertDeviceGroupField(props.selectedDeviceGroupRowData)
      );
    }
  }, [props.selectedDeviceGroupRowData]);

  useEffect(() => {
    fetchImeiData();
  }, []);

  const handleValidation = () => {
    const { isValid, errors }: any = validateAddDeviceGroupForm(
      deviceGroupFromFields,
      props.edit
    );
    setDeviceGroupFromFields({ ...errors });
    return isValid;
  };

  const handleFormDataChange = (formFillEvent: any) => {
    setDeviceGroupFromFields({
      ...deviceGroupFromFields,
      [formFillEvent.target.name]: {
        ...deviceGroupFromFields[formFillEvent.target.name],
        value: formFillEvent.target.value,
        error: "",
      },
    });
  };

  const addDeviceGroupDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>
          {props.edit ? "Update Device Group" : "Add Device Group"}
        </Typography>
      </Box>
    );
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
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const insertDeviceGroupDetails = async () => {
    try {
      const insertDeviceGroupBody = {
        imeiData: deviceGroupFromFields.imeiList?.value,
        deviceGroupName: deviceGroupFromFields.deviceGroupName?.value?.trim(),
      };
      if (handleValidation()) {
        if (props.edit) {
          const res = await updateDeviceGroup({
            input: {
              _id: props?.selectedDeviceGroupRowData?._id,
              ...insertDeviceGroupBody,
              createdBy: store.getState().auth.userName,
            },
          });
          props.handleCloseAddDeviceGroupDialog(false);
          openSuccessNotification(res?.updateDeviceGroup?.message);
          await props.tableData?.();
        } else {
          const res = await addDeviceGroup({
            input: {
              ...insertDeviceGroupBody,
              createdBy: store?.getState()?.auth?.userName,
            },
          });
          props.handleCloseAddDeviceGroupDialog(false);
          openSuccessNotification(res?.createDeviceGroup?.message);
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
  const addDeviceGroupDialogBody = () => {
    return (
      <Grid container spacing={2} sx={{ padding: "1rem" }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomInput
            required
            id="add_device_group_name_field"
            placeHolder="Enter Device Group Name"
            name="deviceGroupName"
            label="Device Group Name"
            onChange={handleFormDataChange}
            value={deviceGroupFromFields.deviceGroupName?.value}
            error={deviceGroupFromFields.deviceGroupName?.error}
            propsToInputElement={{ maxLength: strings.USER_LAST_NAME_LIMIT }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
                console.log({ option });
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
              renderInput={params => (
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
      </Grid>
    );
  };

  const addDeviceGroupDialogFooter = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <Box sx={classes.dialogFooter}>
          <CustomButton
            id="device_group_cancel_button"
            label="Cancel"
            onClick={() => props?.handleCloseAddDeviceGroupDialog()}
            customClasses={classes.cancelButtonStyle}
          />
          <CustomButton
            id="add_device_group_submit_button"
            label={props.edit ? "Update" : "Add"}
            onClick={insertDeviceGroupDetails}
          />
        </Box>
      </Grid>
    );
  };

  const getAddDeviceGroupDialog = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <CustomDialog
          isDialogOpen={props?.openAddDeviceGroupDialog}
          closable
          closeButtonVisibility
          handleDialogClose={props.handleCloseAddDeviceGroupDialog}
          dialogTitleContent={addDeviceGroupDialogTitle()}
          dialogBodyContent={addDeviceGroupDialogBody()}
          dialogFooterContent={addDeviceGroupDialogFooter()}
          width={"700px"}
          fullScreen={false}
        />
      </Grid>
    );
  };

  return <Box>{getAddDeviceGroupDialog()}</Box>;
};

export default AddDeviceGroup;
