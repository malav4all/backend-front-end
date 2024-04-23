import {
  Box,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import _ from "lodash";
import {
  createUser,
  updateUser,
} from "../../Settings/Users/service/user.service";
import { store } from "../../../utils/store";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../helpers/methods";
import usersStyles from "../../Settings/Users/Users.styles";
import notifiers from "../../../global/constants/NotificationConstants";
import { CustomDialog, CustomInput } from "../../../global/components";
import strings from "../../../global/constants/StringConstants";
import CustomButton from "../../../global/components/NewCustomButton/CustomButton";
import { insertUserField, validateAddUserForm } from "../AlertConfig.helpers";
import { fetchGeozoneHandler } from "../../Geozone/service/geozone.service";
import moment from "moment";
import {
  addAlertConfigRecord,
  updateAlertRecord,
} from "../service/alert.service";
interface CustomProps {
  openAddUserDialog: boolean;
  handleCloseAddUserDialog: Function;
  managerMail: string[];
  roles: any[];
  location?: any;
  tableData: Function;
  isLoading: boolean;
  edit?: boolean;
  selectedUserRowData?: any;
  setEdit?: any;
}

const AddFilter = (props: CustomProps) => {
  const classes = usersStyles;
  const [selectedValues, setSelectedValues] = React.useState<any>({});
  const [locationType, setLocationType] = useState([]);
  const [userFormFields, setUserFormFields] = useState<any>(
    insertUserField(props?.selectedUserRowData)
  );
  const [alertData, setAlertData] = useState<any>([]);
  const [finalLocationIds, setFinalLocationIds] = useState<string[]>([]);
  const [alertDataInput, setAlertDataInput] = useState<any>({
    event: "",
    location: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchLocationTypeHandler();
  }, []);

  useEffect(() => {
    props.setEdit?.(false);
    setUserFormFields(insertUserField());
  }, [props?.openAddUserDialog]);

  useEffect(() => {
    if (props?.edit && props?.selectedUserRowData) {
      props.setEdit?.(true);
      setUserFormFields(insertUserField(props?.selectedUserRowData));
    }
  }, [props?.selectedUserRowData]);

  const handleFormDataChange = (
    formFillEvent: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserFormFields({
      ...userFormFields,
      [formFillEvent?.target?.name]: {
        ...userFormFields[formFillEvent?.target?.name],
        value: formFillEvent?.target?.value,
        error: "",
      },
    });
  };

  const handleValidation = () => {
    const { isValid, errors }: any = validateAddUserForm(
      userFormFields,
      props?.edit
    );
    setUserFormFields({ ...errors });
    return isValid;
  };

  const handleAutocompleteChange = (newValue: any) => {
    if (
      newValue?.value &&
      newValue?.value?._id &&
      !finalLocationIds.includes(newValue?.value?._id)
    ) {
      setFinalLocationIds((prevIds) => [...prevIds, newValue?.value?._id]);
      setAlertDataInput({
        ...alertDataInput,
        location: newValue?.value,
      });
      setSelectedValues((prev: any) => ({
        ...prev,
        [newValue?.value?._id]: newValue,
      }));
    }
  };

  const addUserDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>
          {props.edit ? "Update Filter" : "Add Filter"}
        </Typography>
      </Box>
    );
  };

  const insertUserDetails = async () => {
    try {
      const insertUserBody = {
        mobileNo: userFormFields.mobileNo.value,
        alertName: userFormFields.alertName.value,
        alertConfig: {
          imei: userFormFields.imei.value,
          alertData: alertData,
        },
      };

      if (props.edit) {
        const res = await updateAlertRecord({
          input: {
            _id: props?.selectedUserRowData?._id,
            ...insertUserBody,
            createdBy: store.getState().auth.userName,
          },
        });
        props.handleCloseAddUserDialog(false);
        openSuccessNotification(res?.updateAlert?.message);
        await props.tableData?.();
      } else {
        const res = await addAlertConfigRecord({
          input: {
            ...insertUserBody,
            createdBy: store.getState().auth.userName,
          },
        });
        props.handleCloseAddUserDialog(false);
        openSuccessNotification(res?.addAlert?.message);
        await props.tableData?.();
      }
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error?.message) ? error?.message : notifiers?.GENERIC_ERROR
      );
    }
  };

  const fetchLocationTypeHandler = async () => {
    try {
      const res = await fetchGeozoneHandler({
        input: {
          page: -1,
          limit: 0,
        },
      });
      setLocationType(res?.listGeozone?.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const addUserDialogBody = () => {
    return (
      <Grid container spacing={2} sx={{ padding: "1rem" }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <CustomInput
            label="Alert Name"
            placeHolder="Enter Alert name"
            value={userFormFields?.alertName?.value}
            required
            name="alertName"
            onChange={handleFormDataChange}
            error={userFormFields?.alertName?.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <CustomInput
            required
            id="add_mobile_number_field"
            placeHolder="Enter Mobile Number"
            name="mobileNo"
            label="Mobile Number"
            onChange={handleFormDataChange}
            value={userFormFields?.mobileNo?.value}
            error={userFormFields?.mobileNo?.error}
            propsToInputElement={{ maxLength: strings.USER_LAST_NAME_LIMIT }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{ marginBottom: "0.5rem" }}
        >
          <CustomInput
            required
            id="add_field"
            placeHolder="Enter IMEI number"
            name="imei"
            label="IMEI"
            onChange={handleFormDataChange}
            value={userFormFields?.imei?.value}
            error={userFormFields?.imei?.error}
            propsToInputElement={{ maxLength: strings.USER_FIRST_NAME_LIMIT }}
          />
        </Grid>

        <Grid item xs={12} sm={5.2} md={5.2} lg={5.2} xl={5.2}>
          <Box>
            <Stack direction="column">
              <InputLabel sx={classes.inputLabel} shrink>
                Event
                <Box ml={0.4} sx={classes.star}>
                  *
                </Box>
              </InputLabel>
              <Select
                id="add_filter_status_dropdown"
                name="eventName"
                value={alertDataInput.event}
                onChange={(e: any) => {
                  setAlertDataInput({
                    ...alertDataInput,
                    event: e.target.value,
                  });
                }}
                MenuProps={classes.menuProps}
                displayEmpty
                renderValue={(selectedValue: any) => {
                  const selectedItem = [
                    { code: "geo_in", value: "Geo In" },
                    { code: "geo_out", value: "Geo Out" },
                    { code: "locked", value: "Locked" },
                    { code: "unlocked", value: "Unlocked" },
                    { code: "other", value: "Tamper" },
                  ].find((item: any) => item.code === selectedValue);
                  return selectedItem ? selectedItem.value : "Select Event";
                }}
              >
                {[
                  { code: "geo_in", value: "Geo In" },
                  { code: "geo_out", value: "Geo Out" },
                  { code: "locked", value: "Locked" },
                  { code: "unlocked", value: "Unlocked" },
                  { code: "other", value: "Tamper" },
                ].map((item: any, index: any) => (
                  <MenuItem
                    key={index}
                    value={item.code}
                    sx={classes.dropDownOptionsStyle}
                  >
                    {item.value}
                  </MenuItem>
                ))}
              </Select>

              {!isTruthy(userFormFields?.status?.value) && (
                <FormHelperText error sx={classes.errorStyle}>
                  {userFormFields.status?.error}
                </FormHelperText>
              )}
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} sm={5.2} md={5.2} lg={5.2} xl={5.2}>
          <Box>
            <InputLabel sx={classes.inputLabel} shrink>
              Location
              <Box ml={0.4} sx={classes.star}>
                *
              </Box>
            </InputLabel>

            <Autocomplete
              sx={classes.emailDropDownStyle}
              inputValue={alertDataInput.location.name || ""}
              options={
                locationType
                  ?.filter(
                    (tItem) =>
                      !Object.values(selectedValues).find(
                        (selected: any) => selected?.value === tItem
                      )
                  )
                  .map((item: any) => ({
                    key: item._id,
                    label: `${item.name}`,
                    value: item,
                  })) || []
              }
              onChange={(event, newValue) => {
                handleAutocompleteChange(newValue);
              }}
              renderInput={(params) => {
                const InputProps = { ...params.InputProps };
                InputProps.endAdornment = null;
                return (
                  <TextField
                    sx={classes.select2}
                    {...params}
                    value={alertDataInput.location.name}
                    name="startLocation"
                    placeholder="Search location"
                    onSelect={() => {}}
                    InputProps={InputProps}
                  />
                );
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={1} md={1} lg={1} xl={1} mt={4}>
          <Box
            component={"div"}
            onClick={() => {
              if (alertDataInput.location.name !== "") {
                setAlertData((prev: any) => [...prev, alertDataInput]);
                setAlertDataInput({
                  event: "",
                  location: {
                    name: "",
                  },
                  startDate: "",
                  endDate: "",
                });
              }
            }}
          >
            <AddIcon fontSize="large" style={{ cursor: "pointer" }} />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box>
            <CustomInput
              label="Start Date"
              type="datetime-local"
              id="scheduleTime"
              name="startDate"
              value={alertDataInput?.startDate}
              onChange={(e: any) => {
                setAlertDataInput({
                  ...alertDataInput,
                  startDate: e.target.value,
                });
              }}
              propsToInputElement={{
                min: moment().format("YYYY-MM-DDTHH:mm"),
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box>
            <CustomInput
              label="End Date"
              type="datetime-local"
              id="scheduleTime"
              name="endDate"
              value={alertDataInput.endDate}
              onChange={(e: any) => {
                setAlertDataInput({
                  ...alertDataInput,
                  endDate: e.target.value,
                });
              }}
              propsToInputElement={{
                min: moment().format("YYYY-MM-DDTkk:mm A"),
              }}
            />
          </Box>
        </Grid>
      </Grid>
    );
  };

  const addUserDialogFooter = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <Box sx={classes.dialogFooter}>
          <CustomButton
            id="add_user_cancel_button"
            label="Cancel"
            onClick={() => {
              props?.handleCloseAddUserDialog();
              console.log(userFormFields);
            }}
            customClasses={classes.cancelButtonStyle}
          />
          <CustomButton
            id="add_user_submit_button"
            // label="Add"
            label={props.edit ? "Update" : "Add"}
            onClick={insertUserDetails}
          />
        </Box>
      </Grid>
    );
  };

  const getAddUserDialog = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <CustomDialog
          isDialogOpen={props.openAddUserDialog}
          closable
          closeButtonVisibility
          handleDialogClose={props.handleCloseAddUserDialog}
          dialogTitleContent={addUserDialogTitle()}
          dialogBodyContent={addUserDialogBody()}
          dialogFooterContent={addUserDialogFooter()}
          width={"700px"}
          fullScreen={false}
        />
      </Grid>
    );
  };

  return <Box>{getAddUserDialog()}</Box>;
};

export default AddFilter;
