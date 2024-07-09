import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import {
  CustomButton,
  CustomDialog,
  CustomInput,
} from "../../../global/components";
import { fetchDeviceModelList } from "../../Inventory/DeviceOnboarding/service/DeviceOnboarding.service";
import { openErrorNotification } from "../../../helpers/methods";
import DeviceOnboardingStyle from "../../Inventory/DeviceOnboarding/DeviceOnboarding.styles";

interface AddDeviceModalProps {
  open: boolean;
  handleClose: () => void;
  formField: any;
  onChangeHandler: (event: React.ChangeEvent<any>) => void;
  handleSave: () => void;
  isLoading: boolean;
}

const AddDeviceModal: React.FC<AddDeviceModalProps> = ({
  open,
  handleClose,
  formField,
  onChangeHandler,
  handleSave,
  isLoading,
}) => {
  const classes = DeviceOnboardingStyle;
  const [deviceModelData, setDeviceModelData] = useState([]);

  useEffect(() => {
    fetchDeviceModel();
  }, []);

  const addDeviceTitle = () => {
    return (
      <Box>
        <Typography
          sx={{
            ...classes.boldFonts,
            textAlign: "center",
            fontSize: "27px",
            fontWeight: "bold",
          }}
        >
          Add Device
        </Typography>
      </Box>
    );
  };

  const fetchDeviceModel = async () => {
    try {
      const res = await fetchDeviceModelList({
        input: { page: -1, limit: 0 },
      });
      setDeviceModelData(res?.fetchDeviceModel?.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const addLocationTypeDialogBody = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <CustomInput
            required
            label="IMEI"
            id="location_type_field"
            type="text"
            name="imei"
            placeHolder="Enter Imei No"
            onChange={onChangeHandler}
            value={formField?.imei?.value}
            error={formField?.imei?.error}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box>
            <Stack direction="column">
              <InputLabel sx={classes.inputLabel} shrink>
                Device Model Code
                <Box ml={0.4} sx={classes.star}>
                  *
                </Box>
              </InputLabel>

              <Select
                sx={classes.dropDownStyle}
                id="add_user_roles_dropdown"
                name="deviceModelCode"
                value={formField?.deviceModelCode?.value}
                onChange={(e: any) => onChangeHandler(e)}
                renderValue={
                  formField?.deviceModelCode?.value !== ""
                    ? undefined
                    : () => "Select a Device Model code"
                }
                MenuProps={classes.menuProps}
                displayEmpty
                error={
                  formField?.deviceModelCode?.value?.length < 4 &&
                  formField?.deviceModelCode?.error?.length !== 0
                }
              >
                {deviceModelData?.map((item: any, index: any) => (
                  <MenuItem
                    key={index}
                    value={item.deviceId}
                    sx={classes.dropDownOptionsStyle}
                  >
                    {item.deviceId}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    );
  };

  const addLocationTypeDialogFooter = () => {
    return (
      <Grid container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            padding: "1rem 0",
            gap: 1,
          }}
        >
          <CustomButton
            id="add_location_type_cancel_button"
            label="Cancel"
            onClick={handleClose}
            customClasses={{ ...classes.cancelButtonStyle }}
          />
          <CustomButton
            id="add_location_type_submit_button"
            label="Add"
            onClick={handleSave}
            loading={isLoading}
          />
        </Box>
      </Grid>
    );
  };

  return (
    <CustomDialog
      isDialogOpen={open}
      closable
      handleDialogClose={handleClose}
      dialogTitleContent={addDeviceTitle()}
      dialogBodyContent={addLocationTypeDialogBody()}
      dialogFooterContent={addLocationTypeDialogFooter()}
      width={"700px"}
      fullScreen={false}
    />
  );
};

export default React.memo(AddDeviceModal);
