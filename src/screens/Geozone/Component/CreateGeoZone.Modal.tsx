import React, { ChangeEvent, useEffect, useState } from "react";
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
import { isTruthy, openErrorNotification } from "../../../helpers/methods";
import { getAddressDetailsByPincode } from "../service/geozone.service";
import { fetchLocationType } from "../../Settings/LocationType/service/location-type.service";
import { store } from "../../../utils/store";

interface GeoZoneProps {
  isOpenModal: boolean;
  handleUpdateDialogClose: () => void;
  setFormField: (formField: any) => void;
  formField: any;
  addGeozoneHandler: () => void;
  locationType: any;
  edit: boolean;
}

const CreateGeoZone: React.FC<GeoZoneProps> = ({
  isOpenModal,
  handleUpdateDialogClose,
  setFormField,
  formField,
  addGeozoneHandler,
  locationType,
  edit,
}) => {
  const classes = geozoneStyle;
  const theme = useTheme();
  const [zipCodeDate, setZipCodeData] = useState([]);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetchLocationTypeHandler();
  }, []);

  const fetchZipCodeHandler = async (value: string) => {
    try {
      const res = await getAddressDetailsByPincode(value);
      setZipCodeData(res);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const fetchLocationTypeHandler = async () => {
    try {
      const res = await fetchLocationType({
        input: {
          accountId: store.getState().auth.tenantId,
          page,
          limit,
        },
      });
      setData(res.fetchLocationType.data);
      setCount(res.fetchLocationType.paginatorInfo.count);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const handleOnChange = (e: any) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormField({
      ...formField,
      [name]: {
        ...formField[name],
        value: value,
        error: "",
      },
    });
  };

  const modalHeader = () => (
    <Box display={"flex"}>
      <img src={addGeozone} alt="Create Geozone" />
    </Box>
  );

  const geoZoneBody = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Stack direction="column">
          <InputLabel
            sx={{ ...classes.inputLabel, color: theme.palette.text.primary }}
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
            error={!!formField.locationType?.error}
          >
            {data.map((item: any, index: number) => (
              <MenuItem
                key={index}
                value={item.type}
                sx={classes.dropDownOptionsStyle}
              >
                {item.type}
              </MenuItem>
            ))}
          </Select>
          {formField.locationType?.error && (
            <FormHelperText error sx={classes.errorStyle}>
              {formField.locationType?.error}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <CustomInput
          required
          label="Name"
          id="Name"
          placeHolder="Enter Name"
          maxLength={100}
          name="name"
          value={formField.name?.value}
          error={formField.name?.error}
          onChange={handleOnChange}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <CustomInput
          required
          label="Mobile No"
          id="Name"
          placeHolder="Enter Mobile No"
          name="mobileNumber"
          value={formField.mobileNumber?.value}
          error={formField.mobileNumber?.error}
          onChange={handleOnChange}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Stack direction="column">
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
            }}
            id="zipCode"
            options={zipCodeDate.map((item: any) => ({
              label: `${item.Pincode} - ${item.Country} - ${item.State} - ${item.Name} - ${item.Block} - ${item.District}`,
              value: item,
            }))}
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
                placeholder="Enter Zipcode"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\D*\d{0,6}\D*$/.test(value)) {
                    setFormField({
                      ...formField,
                      zipCode: { value, error: "" },
                    });
                    if (value.length >= 6) fetchZipCodeHandler(value);
                  }
                }}
                error={!!formField.zipCode?.error}
              />
            )}
          />
          {formField.zipCode?.error && (
            <FormHelperText error sx={classes.errorStyle}>
              {formField.zipCode?.error}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <CustomInput
          required
          label="Country"
          id="country"
          name="country"
          placeHolder="Enter Country"
          value={formField.country?.value}
          disabled
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
          disabled
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
            disabled
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
          disabled
        />
      </Grid>

      {formField.district?.value && (
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <CustomInput
            required
            label="District"
            id="district"
            name="district"
            placeHolder="Enter District"
            value={formField.district?.value}
            disabled
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
          }}
          name="address"
          id="address"
          placeholder="Enter your Address"
          value={formField.address?.value}
          error={!!formField.address?.error}
          onChange={handleOnChange}
        />
        {formField.address?.error && (
          <FormHelperText error sx={classes.errorStyle}>
            {formField.address?.error}
          </FormHelperText>
        )}
      </Grid>
    </Grid>
  );

  const updateUserDialogFooter = () => (
    <Grid container sx={classes.centerItemFlex}>
      <Box sx={classes.dialogFooter}>
        <CustomButton
          id="update_user_cancel_button"
          label="Cancel"
          onClick={handleUpdateDialogClose}
          customClasses={{
            ...classes.cancelButtonStyle,
            backgroundColor: "#00000000",
            color: theme.palette.text.primary,
          }}
        />
        <CustomButton
          id="update_user_submit_button"
          label={edit ? "Update" : "Add"}
          onClick={addGeozoneHandler}
        />
      </Box>
    </Grid>
  );

  const updateUserDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>
          {edit ? "Update Geozone" : "Create GeoZone"}
        </Typography>
      </Box>
    );
  };

  const geoZone = () => (
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

  return <Box>{geoZone()}</Box>;
};

export default React.memo(CreateGeoZone);
