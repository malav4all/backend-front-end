import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  CustomButton,
  CustomInput,
  CustomDialog,
} from "../../../../global/components";
import { fetchAccountTableHandler } from "../../../Settings/Account/service/account.service";
import { openErrorNotification, isTruthy } from "../../../../helpers/methods";

const AddTripType = ({
  open,
  handleClose,
  tripTypeFormData,
  modulesData,
  onChangeHandler,
  handleSave,
  isLoading,
  classes,
  setTripTypeFormData,
  edit,
}: any) => {
  useEffect(() => {
    fetchTableAccount();
  }, []);

  const theme = useTheme();
  const [data, setData] = useState([]);

  const addTripTypeDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>
          {edit ? "Update TripType" : "Add TripType"}
        </Typography>
      </Box>
    );
  };

  const fetchTableAccount = async () => {
    try {
      const res = await fetchAccountTableHandler({
        input: { page: -1, limit: 10000000 },
      });
      setData(res?.fetchAccountModuleList?.data);
      if (res?.fetchAccountModuleList?.data.length === 1) {
        setTripTypeFormData({
          ...tripTypeFormData,
          accountId: {
            value: res?.fetchAccountModuleList?.data[0]?.accountId,
            error: "",
          },
        });
      }
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const validateFields = () => {
    let isValid = true;
    const newFormData = { ...tripTypeFormData };

    if (!isTruthy(newFormData.accountId.value)) {
      newFormData.accountId.error = "Please select an Account ID.";
      isValid = false;
    } else {
      newFormData.accountId.error = "";
    }

    if (!isTruthy(newFormData.name.value)) {
      newFormData.name.error = "Please enter a Name.";
      isValid = false;
    } else {
      newFormData.name.error = "";
    }

    if (!isTruthy(newFormData.minBatteryPercentage.value)) {
      newFormData.minBatteryPercentage.error =
        "Please enter the Min Battery Percentage.";
      isValid = false;
    } else {
      newFormData.minBatteryPercentage.error = "";
    }

    if (!isTruthy(newFormData.tripRate.value)) {
      newFormData.tripRate.error = "Please enter the Trip Rate.";
      isValid = false;
    } else {
      newFormData.tripRate.error = "";
    }

    if (!isTruthy(newFormData.gstPercentage.value)) {
      newFormData.gstPercentage.error = "Please enter the GST Percentage.";
      isValid = false;
    } else {
      newFormData.gstPercentage.error = "";
    }

    setTripTypeFormData(newFormData);
    return isValid;
  };

  const handleSaveWithValidation = () => {
    if (validateFields()) {
      handleSave();
    }
  };

  const addTripTypeDialogBody = () => {
    return (
      <Grid container spacing={2} sx={{ padding: "1rem" }}>
        <Grid item xs={12} sm={12} lg={6} xl={6}>
          <Box>
            <Stack direction="column">
              <InputLabel sx={classes.inputLabel} shrink>
                Account
              </InputLabel>
              <Select
                sx={classes.dropDownStyle}
                id="add_user_roles_dropdown"
                name="accountId"
                value={tripTypeFormData?.accountId?.value}
                onChange={onChangeHandler}
                renderValue={
                  tripTypeFormData?.accountId?.value !== ""
                    ? undefined
                    : () => "Select From Account Id"
                }
                MenuProps={classes.menuProps}
                displayEmpty
              >
                {data
                  .filter((val: any) => val.accountId !== "")
                  ?.map((item: any, index: any) => (
                    <MenuItem
                      key={index}
                      value={item.accountId}
                      sx={classes.dropDownOptionsStyle}
                    >
                      {item.accountId}
                    </MenuItem>
                  ))}
              </Select>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <CustomInput
            required
            label="Name"
            id="trip_name_field"
            type="text"
            name="name"
            placeHolder="Enter Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 25 }}
            value={tripTypeFormData.name.value}
            error={tripTypeFormData.name.error}
          />
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>
          <CustomInput
            required
            label="Min Battery Percentage"
            id="trip_name_field"
            type="number"
            name="minBatteryPercentage"
            placeHolder="Enter Minimum Battery Percentage"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 25 }}
            value={tripTypeFormData.minBatteryPercentage.value}
            error={tripTypeFormData.minBatteryPercentage.error}
          />
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>
          <CustomInput
            required
            label="Trip Rate"
            id="trip_name_field"
            type="number"
            name="tripRate"
            placeHolder="Enter Trip Rate"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 25 }}
            value={tripTypeFormData.tripRate.value}
            error={tripTypeFormData.tripRate.error}
          />
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>
          <CustomInput
            required
            label="GST Percentage"
            id="trip_name_field"
            type="text"
            name="gstPercentage"
            disabled
            placeHolder="Enter GST Percentage"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 25 }}
            value={tripTypeFormData?.gstPercentage?.value}
            error={tripTypeFormData?.gstPercentage?.error}
          />
        </Grid>
      </Grid>
    );
  };

  const addTripTypeDialogFooter = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <Box sx={classes.dialogFooter}>
          <CustomButton
            id="add_tripType_cancel_button"
            label="Cancel"
            onClick={handleClose}
            customClasses={{
              ...classes.cancelButtonStyle,
              backgroundColor: "#00000000",
              color: theme.palette.text.primary,
            }}
          />
          <CustomButton
            id="add_tripType_submit_button"
            label={edit ? "Update" : "Add"}
            onClick={handleSaveWithValidation}
            loading={isLoading}
          />
        </Box>
      </Grid>
    );
  };

  const addTripTypeHeaderImg = () => {
    return (
      <Box display={"flex"}>
        {/* <img src={} alt="Add tripType not found!" /> */}
      </Box>
    );
  };

  return (
    <CustomDialog
      isDialogOpen={open}
      closable
      handleDialogClose={handleClose}
      dialogHeaderContent={addTripTypeHeaderImg()}
      dialogTitleContent={addTripTypeDialogTitle()}
      dialogBodyContent={addTripTypeDialogBody()}
      dialogFooterContent={addTripTypeDialogFooter()}
      width={"700px"}
      fullScreen={false}
    />
  );
};

export default AddTripType;
