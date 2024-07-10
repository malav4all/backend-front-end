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
import { openErrorNotification } from "../../../../helpers/methods";

const AddTripType = ({
  open,
  handleClose,
  tripTypeFormData,
  modulesData,
  onChangeHandler,
  handleSave,
  isLoading,
  classes,
}: any) => {
  useEffect(() => {
    fetchTableAccount();
  }, []);
  const theme = useTheme();
  const [data, setData] = useState([]);

  const addTripTypeDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>Add TripType</Typography>
      </Box>
    );
  };

  const fetchTableAccount = async () => {
    try {
      const res = await fetchAccountTableHandler({
        input: { page: -1, limit: 10000000 },
      });
      setData(res?.fetchAccountModuleList?.data);
    } catch (error: any) {
      openErrorNotification(error.message);
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
            // onBlur={checkExitsRoleHandler}
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
            placeHolder="Enter Minimun Battery Percentage"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 25 }}
            value={tripTypeFormData.minBatteryPercentage.value}
            // onBlur={checkExitsRoleHandler}
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
            // onBlur={checkExitsRoleHandler}
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
            placeHolder="Enter GST Percentage"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 25 }}
            value={tripTypeFormData.gstPercentage.value}
            // onBlur={checkExitsRoleHandler}
            error={tripTypeFormData.gstPercentage.error}
          />
        </Grid>

        {/* <Grid item xs={12} sm={12} lg={6}>
          <CustomInput
            required
            label="Disabled Field"
            id="trip_name_field"
            type="text"
            name="name"
            placeHolder="Enter Entity Type Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 25 }}
            value={tripTypeFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={tripTypeFormData.name.error}
          />
        </Grid> */}

        {/* <Grid item xs={12} sm={12} lg={6}>
          <CustomInput
            required
            label="Filtration Field"
            id="trip_name_field"
            type="text"
            name="name"
            placeHolder="Enter Entity Type Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 25 }}
            value={tripTypeFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={tripTypeFormData.name.error}
          />
        </Grid> */}
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
            label="Add"
            onClick={handleSave}
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
      //   closeButtonVisibility
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
