import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Grid,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
  Autocomplete,
} from "@mui/material";
import {
  CustomButton,
  CustomInput,
  CustomDialog,
} from "../../../../global/components";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { isTruthy, openErrorNotification } from "../../../../helpers/methods";
import { fetchEntityTypeTableHandler } from "../../EntityType/service/EntityType.service";
import { store } from "../../../../utils/store";
import { getAddressDetailsByPincode } from "../../../Geozone/service/geozone.service";
import { fetchTripTypeTableHandler } from "../../TripType/service/TripType.service";
import EntityStyles from "../Entity.styles";

const AddEntity = ({
  open,
  handleClose,
  entityFormData,
  modulesData,
  onChangeHandler,
  handleModuleChange,
  checkExitsRoleHandler,
  handleFileChange,
  handleSave,
  isLoading,
  MenuProps,
  setEntityFormData,
}: any) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const theme = useTheme();
  const classes = EntityStyles;
  const [tableData, setTableData] = useState([]);
  const [zipCodeDate, setZipCodeData] = useState([]);
  const [tripType, setTripType] = useState<any>([]);
  const [selectedTripType, setSelectedTripType] = useState<any>([]);

  const fetchZipCodeHandler = async (value: any) => {
    try {
      const res = await getAddressDetailsByPincode(value);
      setZipCodeData(res);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  useEffect(() => {
    fetchTableEntityType();
    fetchTableTripType();
  }, []);

  const addEntityDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>Add Entity</Typography>
      </Box>
    );
  };

  const fetchTableTripType = async () => {
    try {
      const res = await fetchTripTypeTableHandler({
        input: {
          accountId: store.getState().auth.tenantId,
          page: -1,
          limit: 10000,
        },
      });
      setTripType(res?.tripTypeList?.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const fetchTableEntityType = async () => {
    try {
      const res = await fetchEntityTypeTableHandler({
        input: {
          accountId: store.getState().auth.tenantId,
          page: -1,
          limit: 1000,
        },
      });
      setTableData(res?.fetchEntityType?.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const handleSelectAll = (event: any) => {
    if (event.target.checked) {
      const allTrips = tripType.map((option: any) => option.tripName);
      setSelectedTripType(allTrips);
      setEntityFormData({
        ...entityFormData,
        tripTypeList: {
          value: allTrips,
          error: "",
        },
      });
    } else {
      setSelectedTripType([]);
      setEntityFormData({
        ...entityFormData,
        tripTypeList: {
          value: [],
          error: "",
        },
      });
    }
  };

  const handleChange = (event: any, value: any) => {
    const filteredValues = value.filter((v: any) => typeof v !== "string");
    const selectedNames = filteredValues.map((option: any) => option.tripName);
    setSelectedTripType(selectedNames);
    setEntityFormData({
      ...entityFormData,
      tripTypeList: {
        value: selectedNames,
        error: "",
      },
    });
  };

  const isOptionSelected = (option: any) => {
    return selectedTripType.includes(option.tripName);
  };

  const addEntityDialogBody = () => {
    return (
      <Grid container spacing={2} sx={{ padding: "1rem" }}>
        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            required
            label="Entity Name"
            id="entity_name_field"
            type="text"
            name="name"
            placeHolder="Enter Entity Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 25 }}
            value={entityFormData.name.value}
            // onBlur={checkExitsRoleHandler}
            error={entityFormData.name.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <Box>
            <InputLabel sx={classes.inputLabel} shrink>
              Trip Type
            </InputLabel>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={["Select All", ...tripType]}
              disableCloseOnSelect
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.tripName
              }
              value={selectedTripType.map((tripName: any) =>
                tripType.find((option: any) => option.tripName === tripName)
              )}
              sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: "5px",
              }}
              onChange={handleChange}
              placeholder="Enter Device Group Name"
              renderOption={(props, option, { selected }) => {
                if (typeof option === "string") {
                  return (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selectedTripType.length === tripType.length}
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
                    {option.tripName}
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
                  placeholder={
                    selectedTripType.length === 0 ? "Select Trip Type" : ""
                  }
                />
              )}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <Box sx={classes.formInput} display={"flex"} flexDirection={"column"}>
            <Box>
              <Box display={"flex"}>
                <Typography sx={classes.label}>Entity Type</Typography>
                <Typography sx={classes.star}>*</Typography>
              </Box>
              <Select
                id="role_management_select_permission_dropdown"
                name="type"
                sx={classes.dropDownStyle}
                displayEmpty
                value={entityFormData.type.value || ""}
                onChange={handleModuleChange}
                renderValue={() =>
                  entityFormData.type.value !== ""
                    ? entityFormData.type.value
                    : "Select Entity Type"
                }
              >
                {tableData.map((item: any) => (
                  <MenuItem
                    key={item._id}
                    value={item.name}
                    sx={classes.optionStyle}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            {!isTruthy(entityFormData.code?.value) && (
              <FormHelperText error sx={{ paddingLeft: "20px" }}>
                {entityFormData.code?.error}
              </FormHelperText>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box>
            <InputLabel
              sx={{ ...classes.inputLabel, color: theme.palette.text.primary }}
              shrink
            >
              PinCode
            </InputLabel>
            <Autocomplete
              id="zipCode"
              options={
                zipCodeDate?.map((item: any) => ({
                  label: `${item.Pincode} - ${item.Country} - ${item.State} - ${item.Name} - ${item.Block} - ${item.District}`,
                  value: item,
                })) || []
              }
              onChange={(event, newValue) => {
                setEntityFormData({
                  ...entityFormData,
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
              value={entityFormData.pinCode.value}
              renderInput={(params) => (
                <TextField
                  sx={classes.select}
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
                  value={entityFormData.pinCode.value}
                  name="zipCode"
                  placeholder="Enter PinCode"
                  onSelect={() => {}}
                  onChange={(e) => {
                    const regex = /^\D*\d{0,6}\D*$/;
                    const value = e.target.value;
                    if (regex.test(value)) {
                      setEntityFormData({
                        ...entityFormData,
                        pinCode: {
                          value: value,
                          error: "",
                        },
                      });
                    }
                    if (value.length >= 6) {
                      fetchZipCodeHandler(value);
                    }
                  }}
                />
              )}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            required
            label="Address"
            id="address_field"
            type="text"
            name="address"
            placeHolder="Enter Address"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.address.value}
            // onBlur={checkExitsRoleHandler}
            error={entityFormData.address.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            required
            label="City"
            id="city_field"
            type="text"
            name="city"
            placeHolder="Enter city"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.city.value}
            // onBlur={checkExitsRoleHandler}
            error={entityFormData.city.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            required
            label="State"
            id="city_field"
            type="text"
            name="state"
            placeHolder="Enter State"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.state.value}
            // onBlur={checkExitsRoleHandler}
            error={entityFormData.state.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            required
            label="Area"
            id="city_field"
            type="text"
            name="area"
            placeHolder="Enter area"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.area.value}
            // onBlur={checkExitsRoleHandler}
            error={entityFormData.area.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            required
            label="District"
            id="city_field"
            type="text"
            name="district"
            placeHolder="Enter district"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.district.value}
            // onBlur={checkExitsRoleHandler}
            error={entityFormData.district.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            required
            label="Contact Name"
            id="city_field"
            type="text"
            name="address"
            placeHolder="Enter Entity Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.name.value}
            // onBlur={checkExitsRoleHandler}
            error={entityFormData.name.error}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            required
            label="Contact Name"
            id="city_field"
            type="text"
            name="contactName"
            placeHolder="Enter Contact Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.contactName.value}
            // onBlur={checkExitsRoleHandler}
            error={entityFormData.contactName.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            required
            label="Contact Email"
            id="city_field"
            type="text"
            name="contactEmail"
            placeHolder="Enter Contact Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.contactEmail.value}
            // onBlur={checkExitsRoleHandler}
            error={entityFormData.contactEmail.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            required
            label="Contact Phone"
            id="city_field"
            type="text"
            name="contactPhone"
            placeHolder="Enter Contact Phone"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.contactPhone.value}
            // onBlur={checkExitsRoleHandler}
            error={entityFormData.contactPhone.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            label="GST"
            id="city_field"
            type="text"
            name="gstIn"
            placeHolder="Enter GST no"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.gstIn.value}
            // onBlur={checkExitsRoleHandler}
            error={entityFormData.gstIn.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            label="Aadhar Number"
            id="city_field"
            type="text"
            name="aadharCardNo"
            placeHolder="Enter Entity Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.aadharCardNo.value}
            // onBlur={checkExitsRoleHandler}
            error={entityFormData.aadharCardNo.error}
          />
        </Grid>
      </Grid>
    );
  };

  const addEntityDialogFooter = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <Box sx={classes.dialogFooter}>
          <CustomButton
            id="add_entity_cancel_button"
            label="Cancel"
            onClick={handleClose}
            customClasses={{
              ...classes.cancelButtonStyle,
              backgroundColor: "#00000000",
              color: theme.palette.text.primary,
            }}
          />
          <CustomButton
            id="add_entity_submit_button"
            label="Add"
            onClick={handleSave}
            loading={isLoading}
          />
        </Box>
      </Grid>
    );
  };

  const addEntityHeaderImg = () => {
    return (
      <Box display={"flex"}>
        {/* <img src={} alt="Add entity not found!" /> */}
      </Box>
    );
  };

  return (
    <CustomDialog
      isDialogOpen={open}
      closable
      //   closeButtonVisibility
      handleDialogClose={handleClose}
      dialogHeaderContent={addEntityHeaderImg()}
      dialogTitleContent={addEntityDialogTitle()}
      dialogBodyContent={addEntityDialogBody()}
      dialogFooterContent={addEntityDialogFooter()}
      width={"700px"}
      fullScreen={false}
    />
  );
};

export default AddEntity;
