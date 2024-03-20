import {
  Autocomplete,
  Box,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  CustomButton,
  CustomDialog,
  CustomInput,
} from "../../../global/components";
import addGeozone from "../../../assets/images/uploadUser.svg";
import geozoneStyle from "../Geozone.styles";
import React, { ChangeEvent, useEffect, useState } from "react";
import { isTruthy, openErrorNotification } from "../../../helpers/methods";
import strings from "../../../global/constants/StringConstants";
import { getAddressDetailsByPincode } from "../service/geozone.service";
import _ from "lodash";

interface GeoZoneProps {
  isOpenModal: boolean;
  handleUpdateDialogClose: Function;
  setFormField: any;
  formField: any;
  addGeozoneHandler: any;
  zipcode: string;
}
const CreateGeoZone = ({
  isOpenModal,
  handleUpdateDialogClose,
  setFormField,
  formField,
  addGeozoneHandler,
  zipcode,
}: GeoZoneProps) => {
  const classes = geozoneStyle;
  const [zipCodeDate, setZipCodeData] = useState([]);

  const fetchZipCodeHandler = async (value: any) => {
    try {
      const res = await getAddressDetailsByPincode(value);
      setZipCodeData(res);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const updateUserDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>Create GeoZone</Typography>
      </Box>
    );
  };

  const handleCancelUpdateModal = () => {
    handleUpdateDialogClose();
  };

  const modalHeader = () => {
    return (
      <Box display={"flex"}>
        <img src={addGeozone} alt="Update user image not found!" />
      </Box>
    );
  };

  const handleOnChange = (e: any) => {
    setFormField({
      ...formField,
      [e.target.name]: {
        ...formField[e.target.name],
        value: e.target.value,
        error: "",
      },
    });
  };

  const updateUserDialogFooter = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <Box sx={classes.dialogFooter}>
          <CustomButton
            id="update_user_cancel_button"
            label="Cancel"
            onClick={handleCancelUpdateModal}
            customClasses={classes.cancelButtonStyle}
          />
          <CustomButton
            id="update_user_submit_button"
            label="Save"
            onClick={addGeozoneHandler}
          />
        </Box>
      </Grid>
    );
  };

  const geoZoneBody = () => {
    return (
      <Grid container spacing={2}>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box>
            <Stack direction="column">
              <InputLabel sx={classes.inputLabel} shrink>
                Location Type
                <Box ml={0.4} sx={classes.star}>
                  *
                </Box>
              </InputLabel>
              <Select
                sx={classes.dropDownStyle}
                id="add_user_status_dropdown"
                name="locationType"
                value={formField.locationType?.value}
                onChange={handleOnChange}
                MenuProps={classes.menuProps}
                displayEmpty
                renderValue={() =>
                  formField.locationType?.value || "Select Location Type"
                }
                error={
                  !isTruthy(formField.locationType?.value) &&
                  formField.locationType?.error
                }
              >
                {["PointA", "PointB"].map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item}
                    sx={classes.dropDownOptionsStyle}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <CustomInput
            required
            label="Name"
            id="Name"
            placeHolder="Enter Name"
            name="name"
            value={formField.name?.value}
            onChange={handleOnChange}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box sx={classes.formInput} display={"flex"} flexDirection={"column"}>
            <Box display={"flex"}>
              <Typography sx={classes.label}>Description </Typography>
              <Typography sx={classes.star}>*</Typography>
            </Box>
            <TextField
              multiline
              minRows={3}
              inputProps={{ maxLength: 500 }}
              sx={classes.testAreaStyle}
              name="description"
              id="comment"
              placeholder="Enter your description"
              value={formField.description?.value}
              onChange={handleOnChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <CustomInput
            required
            type="number"
            label="Mobile No"
            id="mobileNo"
            name="mobileNumber"
            placeHolder="Enter Mobile No"
            value={formField.mobileNumber?.value}
            onChange={handleOnChange}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box>
            <InputLabel sx={classes.inputLabel} shrink>
              Zip Code
              <Box ml={0.4} sx={classes.star}>
                *
              </Box>
            </InputLabel>
            <Autocomplete
              sx={classes.emailDropDownStyle}
              id="update_user_manager_field"
              options={
                zipCodeDate?.map((item: any) => ({
                  label: `${item.Pincode} - ${item.Country} - ${item.State} - ${item.Name} - ${item.Block} - ${item.District}`,
                  value: item,
                })) || []
              }
              onChange={(event, newValue) => {
                setFormField({
                  ...formField,
                  country: {
                    value: newValue?.value?.Country,
                  },
                  state: {
                    value: newValue?.value?.State,
                  },
                  area: {
                    value: newValue?.value?.Name,
                  },
                  district: {
                    value: newValue?.value?.District,
                  },
                  city: {
                    value: newValue?.value?.Block,
                  },
                  zipCode: {
                    value: newValue?.value?.Pincode,
                  },
                  address: {
                    value: `${newValue?.value?.Country} - ${newValue?.value?.State}-${newValue?.value?.Name}-${newValue?.value?.District}-${newValue?.value?.Block}`,
                  },
                });
              }}
              value={formField.zipCode.value}
              renderInput={params => (
                <TextField
                  sx={classes.select}
                  {...params}
                  value={formField.zipCode?.value}
                  name="assignBy"
                  placeholder="Enter zipcode here....."
                  onSelect={() => {}}
                  onChange={e => {
                    const value = e.target.value;
                    setFormField({
                      ...formField,
                      zipCode: {
                        value: value,
                        error: "",
                      },
                    });
                    if (value.length >= 6) {
                      fetchZipCodeHandler(value);
                    }
                  }}
                />
              )}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <CustomInput
            required
            label="Country"
            id="country"
            name="country"
            placeHolder="Enter Country"
            value={formField.country?.value}
            disabled={true}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <CustomInput
            required
            label="State"
            id="state"
            name="state"
            placeHolder="Enter State"
            value={formField.state?.value}
            disabled={true}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <CustomInput
            required
            label="Area"
            id="area"
            name="area"
            placeHolder="Enter Area"
            value={formField.area?.value}
            disabled={true}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <CustomInput
            required
            label="City"
            id="city"
            name="city"
            placeHolder="Enter City"
            value={formField.city?.value}
            disabled={true}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <CustomInput
            required
            label="District"
            id="district"
            name="district"
            placeHolder="Enter District"
            value={formField.district?.value}
            disabled={true}
          />
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={6} xl={6} item>
          <Box display={"flex"}>
            <Typography sx={classes.label}>Address</Typography>
            <Typography sx={classes.star}>*</Typography>
          </Box>
          <TextField
            multiline
            minRows={3}
            inputProps={{ maxLength: 500 }}
            sx={classes.testAreaStyle}
            name="address"
            id="address"
            placeholder="Enter your Address"
            value={formField.address?.value}
            onChange={(event: any) => handleOnChange(event)}
          />
        </Grid>
      </Grid>
    );
  };

  const geoZone = () => {
    return (
      <CustomDialog
        isDialogOpen={isOpenModal}
        closable
        closeButtonVisibility
        handleDialogClose={handleUpdateDialogClose}
        dialogHeaderContent={modalHeader()}
        dialogTitleContent={updateUserDialogTitle()}
        dialogBodyContent={geoZoneBody()}
        dialogFooterContent={updateUserDialogFooter()}
        width={"650px"}
      />
    );
  };

  return <Box>{geoZone()}</Box>;
};

export default React.memo(CreateGeoZone);
