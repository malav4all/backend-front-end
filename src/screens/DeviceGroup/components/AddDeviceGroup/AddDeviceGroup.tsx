import { Box, Grid, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
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

const AddDeviceGroup = (props: CustomProps) => {
  const theme = useTheme();
  const classes = addDeviceGroupStyles;
  const [deviceGroupFromFields, setDeviceGroupFromFields] = useState<any>(
    insertDeviceGroupField(props?.selectedDeviceGroupRowData)
  );

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

  const insertDeviceGroupDetails = async () => {
    try {
      const accountId = store.getState().auth.accountId;
      const insertDeviceGroupBody = {
        deviceGroupName: deviceGroupFromFields.deviceGroupName?.value?.trim(),
        accountId,
      };

      if (props.edit) {
        const res = await updateDeviceGroup({
          input: {
            _id: props?.selectedDeviceGroupRowData?._id,
            ...insertDeviceGroupBody,
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
    } catch (error: any) {
      console.error("Error:", error);
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
    }
  };

  const addDeviceGroupDialogBody = () => {
    return (
      <Grid container spacing={2} sx={{ padding: "1rem" }}>
        <Grid item xs={12}>
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
