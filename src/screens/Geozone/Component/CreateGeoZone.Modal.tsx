import {
  Autocomplete,
  Box,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  CustomButton,
  CustomDialog,
  CustomInput,
} from "../../../global/components";
import addGeozone from "../../../assets/images/uploadUser.svg";
import geozoneStyle from "../Geozone.styles";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { isTruthy, openErrorNotification } from "../../../helpers/methods";
import strings from "../../../global/constants/StringConstants";
import { getAddressDetailsByPincode } from "../service/geozone.service";
import _ from "lodash";
import InputMask from "react-input-mask";

interface GeoZoneProps {
  isOpenModal: boolean;
  handleUpdateDialogClose: Function;
  setFormField: any;
  formField: any;
  addGeozoneHandler: any;
  locationType: any;
}
const CreateGeoZone = ({
  isOpenModal,
  handleUpdateDialogClose,
  setFormField,
  formField,
  addGeozoneHandler,
  locationType,
}: GeoZoneProps) => {
  const classes = geozoneStyle;
  const theme = useTheme();
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

  const handleZipCodeChange = (e: any) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setFormField({
        ...formField,
        zipCode: {
          value,
          error: "",
        },
      });
      fetchZipCodeHandler(value);
    }
  };

  const myAutocompleteRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (myAutocompleteRef.current) {
      myAutocompleteRef.current.focus();
    }
  };

  const updateUserDialogFooter = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <Box sx={classes.dialogFooter}>
          <CustomButton
            id="update_user_cancel_button"
            label="Cancel"
            onClick={handleCancelUpdateModal}
            customClasses={{
              ...classes.cancelButtonStyle,
              backgroundColor: "#00000000",
              color: theme.palette.text.primary,
            }}
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
  const getFormattedNumbers = (value: string) => {
    const matches = value.match(/\d+/g);
    let number = "";
    if (matches !== null) {
      matches.forEach((match) => {
        number += match;
      });
    }
    if (number.length === 10) {
      value = number.replace(/^(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }
    return { number: number, maskedNumber: value };
  };
  const handleMaskInputChange = (event: React.ChangeEvent<any>) => {
    const response = getFormattedNumbers(event.target.value);
    setFormField({
      ...formField,
      [event.target.name]: {
        ...formField[event.target.name],
        value: response.number,
      },
    });
  };

  const geoZoneBody = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box>
            <Stack direction="column">
              <InputLabel
                sx={{
                  ...classes.inputLabel,
                  color: theme.palette.text.primary,
                }}
                shrink
              >
                Location Type
                <Box ml={0.4} sx={classes.star}>
                  *
                </Box>
              </InputLabel>
              <Select
                sx={{
                  ...classes.dropDownStyle,
                  backgroundColor: theme.palette.background.paper,
                }}
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
                {[{ type: "Malav" }].map((item: any, index: number) => (
                  <MenuItem
                    key={index}
                    value={item.type}
                    sx={classes.dropDownOptionsStyle}
                  >
                    {item.type}
                  </MenuItem>
                ))}
              </Select>
              {!isTruthy(formField?.locationType?.value) && (
                <FormHelperText error sx={classes.errorStyle}>
                  {formField?.locationType?.error}
                </FormHelperText>
              )}
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <CustomInput
            required
            label="Name"
            id="Name"
            placeHolder="Enter Name"
            maxLength={100}
            name="name"
            value={formField?.name?.value}
            error={formField?.name?.error}
            onChange={handleOnChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Stack direction="column">
            <InputLabel
              sx={{ ...classes.inputLabel, color: theme.palette.text.primary }}
              shrink
            >
              Mobile Number
              <Box ml={0.4} sx={classes.star}>
                *
              </Box>
            </InputLabel>
            <Box>
              <InputMask
                mask="999 999 9999"
                name="mobileNumber"
                placeholder="(999) 999-9999"
                value={formField?.mobileNumber?.value}
                onChange={handleMaskInputChange}
              >
                {() => (
                  <TextField
                    required
                    id="mobile-number"
                    sx={{
                      ...classes.mobileNumber,
                      backgroundColor: theme.palette.background.paper,
                      color: theme.palette.text.primary,
                      borderRadius: "5px",
                    }}
                    placeholder="(999) 999-9999"
                    value={formField?.mobileNumber?.value}
                    onChange={handleMaskInputChange}
                    name="mobileNumber"
                    error={formField?.mobileNumber?.error}
                  />
                )}
              </InputMask>
              {!isTruthy(formField?.mobileNumber?.value) &&
                formField?.mobileNumber?.error && (
                  <FormHelperText error sx={{ ml: "14px" }}>
                    {formField?.mobileNumber?.error}
                  </FormHelperText>
                )}
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box>
            <InputLabel
              sx={{ ...classes.inputLabel, color: theme.palette.text.primary }}
              shrink
            >
              Zip Code
              <Box ml={0.4} sx={classes.star}>
                *
              </Box>
            </InputLabel>
            <Autocomplete
              sx={{
                ...classes.emailDropDownStyle,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: "5px",
              }}
              id="zipCode"
              options={
                zipCodeDate?.map((item: any) => ({
                  label: `${item.Pincode} - ${item.Country} - ${item.State} - ${item.Name} - ${item.Block} - ${item.District}`,
                  value: item,
                })) || []
              }
              onChange={(event, newValue) => {
                setFormField({
                  ...formField,
                  country: { value: newValue?.value?.Country },
                  state: { value: newValue?.value?.State },
                  area: { value: newValue?.value?.Name },
                  district: { value: newValue?.value?.District },
                  city: { value: newValue?.value?.Block },
                  zipCode: { value: newValue?.value?.Pincode },
                  address: {
                    value: `${newValue?.value?.Country} - ${newValue?.value?.State} - ${newValue?.value?.Name} - ${newValue?.value?.District} - ${newValue?.value?.Block}`,
                  },
                });
              }}
              value={formField?.zipCode?.value}
              renderInput={(params) => (
                <TextField
                  sx={classes.select}
                  {...params}
                  value={formField.zipCode?.value}
                  name="zipCode"
                  placeholder="Enter Zipcode"
                  onSelect={() => {}}
                  onChange={(e) => {
                    const regex = /^\D*\d{0,6}\D*$/;
                    const value = e.target.value;
                    if (regex.test(value)) {
                      setFormField({
                        ...formField,
                        zipCode: {
                          value: value,
                          error: "",
                        },
                      });
                    }
                    if (value.length >= 6) {
                      fetchZipCodeHandler(value);
                    }
                  }}
                  error={
                    !isTruthy(formField.zipCode.value) &&
                    formField.zipCode.error
                  }
                />
              )}
            />

            {!isTruthy(formField?.zipCode?.value) && (
              <FormHelperText error sx={classes.errorStyle}>
                {formField?.zipCode?.error}
              </FormHelperText>
            )}
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
        {formField.area?.value && (
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
        )}

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

        {formField.district.value && (
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
        )}

        <Grid xs={12} sm={12} md={6} lg={6} xl={6} item>
          <Box display={"flex"}>
            <Typography sx={classes.label}>Address</Typography>
            <Typography sx={classes.star}>*</Typography>
          </Box>
          <TextField
            multiline
            minRows={2}
            inputProps={{ maxLength: 300 }}
            sx={{
              ...classes.testAreaStyle,
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              borderRadius: "5px",
            }}
            name="address"
            id="address"
            placeholder="Enter your Address"
            value={formField.address?.value}
            error={
              !isTruthy(formField.address?.value) && formField.address?.error
            }
            onChange={(event: any) => handleOnChange(event)}
          />
          {!isTruthy(formField.address?.value) && (
            <FormHelperText error sx={classes.errorStyle}>
              {formField.address?.error}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box sx={classes.formInput} display={"flex"} flexDirection={"column"}>
            <Box display={"flex"}>
              <Typography sx={classes.label}>Description </Typography>
              <Typography sx={classes.star}>*</Typography>
            </Box>
            <TextField
              multiline
              minRows={2}
              inputProps={{ maxLength: 300 }}
              sx={{
                ...classes.testAreaStyle,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: "5px",
              }}
              name="description"
              id="comment"
              placeholder="Enter Description"
              value={formField?.description?.value}
              error={
                !isTruthy(formField?.description?.value) &&
                formField?.description?.error
              }
              onChange={handleOnChange}
            />
            {!isTruthy(formField?.description?.value) && (
              <FormHelperText error sx={classes.errorStyle}>
                {formField?.description?.error}
              </FormHelperText>
            )}
          </Box>
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
