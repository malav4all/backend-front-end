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
} from "@mui/material";
import { useEffect, useState } from "react";
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
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  addDeviceGroup,
  fetchDeviceList,
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
  const theme = useTheme();
  const classes = addDeviceGroupStyles;
  const [deviceGroupFromFields, setDeviceGroupFromFields] = useState<any>(
    insertDeviceGroupField(props?.selectedDeviceGroupRowData)
  );
  const [imeiData, setImeiData] = useState<any>([]);
  const [selectedImeis, setSelectedImeis] = useState<any>([]);
  useEffect(() => {
    props.setEdit?.(false);
    setDeviceGroupFromFields(insertDeviceGroupField());

    setSelectedImeis(props.selectedDeviceGroupRowData?.imeiData);
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
      const res = await fetchDeviceList({
        input: { accountId: store.getState().auth.tenantId },
      });
      setImeiData(res?.getImeiList?.imeiList);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const insertDeviceGroupDetails = async () => {
    try {
      const insertDeviceGroupBody = {
        accountId: store.getState().auth.tenantId,
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
    return selectedImeis?.includes(option);
  };

  const handleSelectAll = (event: any) => {
    if (event.target.checked) {
      setSelectedImeis(imeiData);
      setDeviceGroupFromFields({
        ...deviceGroupFromFields,
        imeiList: {
          value: imeiData,
          error: "",
        },
      });
    } else {
      setSelectedImeis([]);
      setDeviceGroupFromFields({
        ...deviceGroupFromFields,
        imeiList: {
          value: [],
          error: "",
        },
      });
    }
  };

  const handleChange = (event: any, value: any) => {
    const filteredValues = value.filter((v: any) => v !== "Select All");
    setSelectedImeis(filteredValues);
    setDeviceGroupFromFields({
      ...deviceGroupFromFields,
      imeiList: {
        value: filteredValues,
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
            <InputLabel
              sx={{ ...classes.inputLabel, color: theme.palette.text.primary }}
              shrink
            >
              Device Name
              <Box ml={0.4} sx={classes.star}>
                *
              </Box>
            </InputLabel>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={["Select All", ...imeiData]}
              disableCloseOnSelect
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option
              }
              value={selectedImeis}
              sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: "5px",
                height: "47px",
              }}
              onChange={handleChange}
              placeholder="Enter Device Group Name"
              renderOption={(props, option, { selected }) => {
                if (option === "Select All") {
                  return (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selectedImeis?.length === imeiData?.length}
                        indeterminate={
                          selectedImeis?.length > 0 &&
                          selectedImeis?.length < imeiData?.length
                        }
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
                    {option}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    sx: {
                      height: "47px",
                      display: "flex",
                      alignItems: "center",
                      color: "white",
                      backgroundColor: "#060b25",
                    },
                  }}
                  placeholder={selectedImeis?.length === 0 ? "Select IMEI" : ""}
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
            customClasses={{
              ...classes.cancelButtonStyle,
              color: theme.palette.text.primary,
              backgroundColor: "#00000000",
            }}
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
