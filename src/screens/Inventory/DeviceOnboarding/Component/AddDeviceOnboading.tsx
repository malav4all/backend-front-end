import React, { useEffect, useState } from "react";
import { insertDeviceOnboardingField } from "../DeviceOnboarding.helpers";
import DeviceOnboardingStyle from "../DeviceOnboarding.styles";
import {
  Autocomplete,
  Box,
  Chip,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  addDeviceOnboarding,
  fetchAccountHandler,
  fetchDeviceModelList,
  fetchGeozoneHandler,
  filterRecord,
  updateDeviceOnboardingList,
} from "../service/DeviceOnboarding.service";
import { store } from "../../../../utils/store";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../../helpers/methods";
import notifiers from "../../../../global/constants/NotificationConstants";
import {
  CustomButton,
  CustomDialog,
  CustomInput,
} from "../../../../global/components";
import uploadUser from "../../../../assets/images/uploadUser.svg";
import _ from "lodash";
import { theme } from "../../../../utils/styles";
import UploadAssetGroup from "./UploadAsset/UploadAssetModal";
import { fetchDeviceList } from "../../../AddDevice/service/add-device.service";
interface CustomProps {
  openAddUserDialog: boolean;
  handleCloseAddUserDialog?: Function;
  edit?: boolean;
  tableData?: Function;
  isLoading?: boolean;
  selectedRowData?: any;
  setDeviceFormFields?: any;
  userDeviceFields?: any;
}

const AddDeviceOnboarding = ({
  openAddUserDialog,
  edit,
  handleCloseAddUserDialog,
  isLoading,
  selectedRowData,
  setDeviceFormFields,
  tableData,
  userDeviceFields,
}: CustomProps) => {
  const classes = DeviceOnboardingStyle;
  const [loading, setLoading] = useState<boolean>(false);
  const [accountData, setAccountData] = useState<any>([]);
  const [geozoneData, setGeozoneData] = useState([]);
  const [simNo, setSimNo] = useState([]);
  const [deviceModelData, setDeviceModelData] = useState([]);
  const [tenantId, setTenantId] = useState<string>("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAccountData();
    fetchDeviceModel();
    fetchDeviceListData();
  }, []);

  useEffect(() => {
    if (edit && selectedRowData) {
      setSimNo(selectedRowData?.deviceOnboardingSimNo);
    }
  }, [selectedRowData]);

  useEffect(() => {
    if (userDeviceFields?.deviceOnboardingAccount?.value) {
      fetchGeozone();
    }
  }, [userDeviceFields?.deviceOnboardingAccount?.value]);

  const handleValidation = () => {
    let isValid = true;

    if (!isTruthy(userDeviceFields?.deviceOnboardingIMEINumber?.value)) {
      setDeviceFormFields((prevData: any) => ({
        ...prevData,
        deviceOnboardingIMEINumber: {
          ...prevData.deviceOnboardingIMEINumber,
          error: "IMEI number is required.",
        },
      }));
      isValid = false;
    }

    if (!isTruthy(userDeviceFields?.deviceOnboardingAccount?.value)) {
      setDeviceFormFields((prevData: any) => ({
        ...prevData,
        deviceOnboardingAccount: {
          ...prevData.deviceOnboardingAccount,
          error: "Account is required.",
        },
      }));
      isValid = false;
    }

    if (!isTruthy(simNo.length)) {
      setDeviceFormFields((prevData: any) => ({
        ...prevData,
        deviceOnboardingSimNo: {
          ...prevData.deviceOnboardingSimNo,
          error: "Sim No is required.",
        },
      }));
      isValid = false;
    }

    return isValid;
  };

  const fetchAccountData = async () => {
    try {
      const res = await fetchAccountHandler({
        input: { page: -1, limit: 10000 },
      });
      setAccountData(res?.fetchAccountModuleList?.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
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

  const addUserDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>
          {edit ? "Update Device Onboarding" : "Add Device Onboarding"}
        </Typography>
      </Box>
    );
  };

  const insertUserDetails = async () => {
    if (!handleValidation()) {
      setLoading(false);
      return;
    }
    setLoading(true);
    // if (handleValidation()) {
    const insertUserBody: any = {
      location: userDeviceFields.locationId.value,
      accountId: userDeviceFields?.deviceOnboardingAccount?.value,
      deviceOnboardingSimNo: simNo,
      createdBy: userDeviceFields.createdBy.value,
      deviceOnboardingIMEINumber:
        userDeviceFields.deviceOnboardingIMEINumber.value,
      businessModel: userDeviceFields.businessModel.value,
    };

    try {
      if (edit) {
        const res = await updateDeviceOnboardingList({
          input: {
            _id: selectedRowData._id,
            ...insertUserBody,
          },
        });
        openSuccessNotification(res?.updateDeviceOnboarding?.message);
      } else {
        const res = await addDeviceOnboarding({
          input: {
            ...insertUserBody,
          },
        });
        openSuccessNotification(res?.createDeviceOnboarding?.message);
      }
      handleCloseAddUserDialog?.(false);
      await tableData?.();
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
    }
    // }
    setLoading(false);
  };

  const validateSimNo = () => {
    if (!isTruthy(userDeviceFields.deviceOnboardingSimNo.value)) {
      setDeviceFormFields((prevData: any) => ({
        ...prevData,
        deviceOnboardingSimNo: {
          ...prevData.deviceOnboardingSimNo,
          error: "Sim No can be empty",
        },
      }));
      return false;
    }
    const checkExistingValue = simNo?.some(
      (item: any) => item === userDeviceFields.deviceOnboardingSimNo.value
    );
    if (checkExistingValue) {
      setDeviceFormFields((prevData: any) => ({
        ...prevData,
        deviceOnboardingSimNo: {
          ...prevData.deviceOnboardingSimNo,
          error: "You cannot add duplicate Sim No",
        },
      }));
      return false;
    }
    return true;
  };

  const addSimNoHandler = () => {
    if (validateSimNo()) {
      const arrSimNo: any[] = [];
      arrSimNo.push(...simNo, userDeviceFields.deviceOnboardingSimNo.value);
      const filterValue: any = _.uniqWith(arrSimNo, _.isEqual);
      setSimNo(filterValue);
      setDeviceFormFields((prevData: any) => ({
        ...prevData,
        deviceOnboardingSimNo: {
          value: "",
          error: "",
        },
      }));
    }
  };

  const removeSimNoHandler = (index: number) => {
    setSimNo(simNo.filter((v: any, i: number) => i !== index));
  };

  const fetchGeozone = async () => {
    try {
      setLoading(true);
      const res = await fetchGeozoneHandler({
        input: {
          accountId: userDeviceFields?.deviceOnboardingAccount?.value,
          page: -1,
          limit: 0,
        },
      });

      setGeozoneData(res?.listGeozone?.data);
      setLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const fetchDeviceListData = async () => {
    try {
      const res = await fetchDeviceList({
        input: {
          page: -1,
          limit: 1000000,
        },
      });
      setData(res?.fetchDeviceList?.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const handleOnChange = (newValue: any) => {
    setDeviceFormFields({
      ...userDeviceFields,
      deviceOnboardingIMEINumber: {
        value: newValue ? newValue.label : "",
        error: "",
      },
    });
  };
  const addUserDialogBody = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box>
            <Stack direction="column">
              <InputLabel sx={classes.inputLabel} shrink>
                Device Assignment Account
                <Box ml={0.4} sx={classes.star}>
                  *
                </Box>
              </InputLabel>
              <Select
                sx={classes.dropDownStyle}
                id="add_user_roles_dropdown"
                name="deviceOnboardingAccount"
                value={userDeviceFields.deviceOnboardingAccount.value}
                onChange={(e) => {
                  const getTenantId = accountData.find(
                    (item: any) => item.accountId === e.target.value
                  );
                  setDeviceFormFields({
                    ...userDeviceFields,
                    deviceOnboardingAccount: {
                      value: e.target.value,
                    },
                  });
                  setTenantId(getTenantId?.tenantId);
                }}
                renderValue={
                  userDeviceFields.deviceOnboardingAccount.value !== ""
                    ? undefined
                    : () => "Select a Account"
                }
                MenuProps={classes.menuProps}
                displayEmpty
                error={
                  userDeviceFields.deviceOnboardingAccount.value?.length < 4 &&
                  userDeviceFields.deviceOnboardingAccount.error?.length !== 0
                }
              >
                {accountData?.map((item: any, index: any) => (
                  <MenuItem
                    key={index}
                    value={item.accountId}
                    sx={classes.dropDownOptionsStyle}
                  >
                    {item.accountId} - {item.accountName}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Box>
        </Grid>
        {userDeviceFields.deviceOnboardingAccount.value && (
          <>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box>
                <InputLabel sx={classes.inputLabel} shrink>
                  IMEI
                  <Box ml={0.4} sx={classes.star}>
                    *
                  </Box>
                </InputLabel>

                <Autocomplete
                  sx={classes.emailDropDownStyle}
                  id="update_user_manager_field"
                  options={
                    data.map((item: any) => ({
                      key: item._id,
                      label: `${item.imei}`,
                      value: item,
                    })) || []
                  }
                  value={
                    edit
                      ? selectedRowData?.deviceOnboardingIMEINumber
                      : userDeviceFields?.deviceOnboardingIMEINumber?.value
                  }
                  onChange={(event, newValue) => handleOnChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select IMEI"
                      sx={classes.select}
                    />
                  )}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Grid container gap={2}>
                <Grid item xs={12} sm={6} md={6} lg={8} xl={8}>
                  <CustomInput
                    label="Device Onboarding Sim No"
                    id="recipient_modal_tags_field"
                    type="text"
                    name="tagsValue"
                    placeHolder="Enter Sim No"
                    required
                    error={userDeviceFields.deviceOnboardingSimNo.error}
                    onChange={(e: any) => {
                      setDeviceFormFields({
                        ...userDeviceFields,
                        deviceOnboardingSimNo: {
                          value: e.target.value,
                        },
                      });
                    }}
                    value={userDeviceFields.deviceOnboardingSimNo.value}
                  />
                </Grid>
                <Grid xs={12} sm={6} md={4} lg={3} xl={3}>
                  <CustomButton
                    id="recipient_modal_add_tag_button"
                    customClasses={{
                      width: "100%",
                      marginTop: "30px",
                      [theme.breakpoints.down("lg")]: {
                        marginTop: theme.spacing(0),
                      },
                    }}
                    onClick={addSimNoHandler}
                    label="Add"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xl={6}>
                  {simNo.map((tag: any, index: any) => (
                    <Chip
                      key={index}
                      label={tag}
                      sx={{
                        marginLeft: "5px",
                        marginTop: "8px",
                        borderRadius: "5px",
                        fontSize: "15px",
                        backgroundColor: "red",
                      }}
                      variant="filled"
                      onDelete={() => removeSimNoHandler(index)}
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box>
                <Stack direction="column">
                  <InputLabel sx={classes.inputLabel} shrink>
                    Business Model
                    <Box ml={0.4} sx={classes.star}>
                      *
                    </Box>
                  </InputLabel>
                  <Select
                    sx={classes.dropDownStyle}
                    id="add_user_roles_dropdown"
                    name="deviceOnboardingModel"
                    value={userDeviceFields.businessModel.value}
                    onChange={(e) => {
                      setDeviceFormFields({
                        ...userDeviceFields,
                        businessModel: {
                          value: e.target.value,
                        },
                      });
                    }}
                    renderValue={
                      userDeviceFields.businessModel.value !== ""
                        ? undefined
                        : () => "Select a Device Model"
                    }
                    MenuProps={classes.menuProps}
                    displayEmpty
                    error={
                      userDeviceFields.businessModel.value?.length < 4 &&
                      userDeviceFields.businessModel.error?.length !== 0
                    }
                  >
                    {["CAPEX", "OPEX"]?.map((item: any, index: any) => (
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
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box>
                <Stack direction="column">
                  <InputLabel sx={classes.inputLabel} shrink>
                    Account Location
                  </InputLabel>
                  <Select
                    sx={classes.dropDownStyle}
                    id="add_user_roles_dropdown"
                    name="location"
                    value={userDeviceFields.locationId.value}
                    onChange={(e) => {
                      setDeviceFormFields({
                        ...userDeviceFields,
                        locationId: {
                          value: e.target.value,
                        },
                      });
                    }}
                    renderValue={
                      userDeviceFields.locationId.value !== ""
                        ? undefined
                        : () => "Select Location"
                    }
                    MenuProps={classes.menuProps}
                    displayEmpty
                  >
                    {geozoneData?.map((item: any, index: any) => (
                      <MenuItem
                        key={index}
                        value={item._id}
                        sx={classes.dropDownOptionsStyle}
                      >
                        {item.locationId} - {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
              </Box>
            </Grid>
          </>
        )}
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
            onClick={() => handleCloseAddUserDialog?.()}
            customClasses={classes.cancelButtonStyle}
          />
          <CustomButton
            id="add_user_submit_button"
            label={edit ? "Update" : "Add"}
            onClick={insertUserDetails}
            loading={loading}
          />
        </Box>
      </Grid>
    );
  };

  const addUserHeaderImg = () => {
    return (
      <Box display={"flex"}>
        <img src={uploadUser} alt="Add user not found!" />
      </Box>
    );
  };

  const getAddUserDialog = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <CustomDialog
          isDialogOpen={openAddUserDialog}
          closable
          closeButtonVisibility
          handleDialogClose={handleCloseAddUserDialog}
          dialogHeaderContent={addUserHeaderImg()}
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

export default React.memo(AddDeviceOnboarding);
