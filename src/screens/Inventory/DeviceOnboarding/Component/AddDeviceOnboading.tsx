import React, { useEffect, useState } from "react";
import { insertDeviceOnboardingField } from "../DeviceOnboarding.helpers";
import DeviceOnboardingStyle from "../DeviceOnboarding.styles";
import {
  Box,
  Chip,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import {
  addDeviceOnboarding,
  fetchAccountHandler,
  fetchDeviceModelList,
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

interface CustomProps {
  openAddUserDialog: boolean;
  handleCloseAddUserDialog?: Function;
  edit?: boolean;
  tableData?: Function;
  isLoading?: boolean;
  selectedRowData?: any;
}

const AddDeviceOnboarding = (props: CustomProps) => {
  const classes = DeviceOnboardingStyle;
  const [userDeviceFields, setDeviceFormFields] = useState<any>(
    insertDeviceOnboardingField(props?.selectedRowData)
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [accountData, setAccountData] = useState<any>([]);
  const [userData, setUserData] = useState([]);
  const [simNo, setSimNo] = useState([]);
  const [deviceModelData, setDeviceModelData] = useState([]);
  const [tenantId, setTenantId] = useState<string>("");

  useEffect(() => {
    fetchAccountData();
    fetchDeviceModel();
  }, []);

  useEffect(() => {
    if (userDeviceFields.deviceOnboardingAccount.value) {
      fetchAccountUser();
    }
  }, [userDeviceFields.deviceOnboardingAccount.value]);

  useEffect(() => {
    setDeviceFormFields(insertDeviceOnboardingField());
    setSimNo([]);
  }, [props.openAddUserDialog]);

  useEffect(() => {
    if (props.edit && props.selectedRowData) {
      setDeviceFormFields(insertDeviceOnboardingField(props.selectedRowData));
      setSimNo(props?.selectedRowData?.deviceOnboardingSimNo);
    }
  }, [props.selectedRowData]);

  const fetchAccountUser = async () => {
    try {
      const res = await filterRecord({
        input: { accountId: userDeviceFields.deviceOnboardingAccount.value },
      });
      setUserData(res.filterRecordUerAccountId);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const fetchAccountData = async () => {
    try {
      const res = await fetchAccountHandler({
        input: { page: -1, limit: 0 },
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

  const handleFormDataChange = (formFillEvent: React.ChangeEvent<any>) => {
    setDeviceFormFields({
      ...userDeviceFields,
      [formFillEvent.target.name]: {
        ...userDeviceFields[formFillEvent.target.name],
        value: formFillEvent.target.value,
      },
    });
  };

  const addUserDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>Add Device Onboarding</Typography>
      </Box>
    );
  };

  const insertUserDetails = async () => {
    setLoading(true);
    // if (handleValidation()) {
    const insertUserBody: any = {
      accountId: userDeviceFields.deviceOnboardingAccount.value,
      deviceOnboardingSimNo: simNo,
      deviceOnboardingModel: userDeviceFields.deviceOnboardingModel.value,
      createdBy: userDeviceFields.createdBy.value,
      deviceOnboardingStatus: "Active",
      deviceOnboardingIMEINumber:
        userDeviceFields.deviceOnboardingIMEINumber.value,
    };
    try {
      if (props.edit) {
        const res = await updateDeviceOnboardingList({
          input: {
            _id: props.selectedRowData._id,
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
      props.handleCloseAddUserDialog?.(false);
      await props.tableData?.();
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

  const addUserDialogBody = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box>
            <Stack direction="column">
              <InputLabel sx={classes.inputLabel} shrink>
                Device Onboarding Account
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
                    (item: any) => item._id === e.target.value
                  );
                  setDeviceFormFields({
                    ...userDeviceFields,
                    deviceOnboardingAccount: {
                      value: e.target.value,
                    },
                  });
                  setTenantId(getTenantId.tenantId);
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
                    value={item._id}
                    sx={classes.dropDownOptionsStyle}
                  >
                    {item.accountName}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Box>
        </Grid>
        {userDeviceFields.deviceOnboardingAccount.value && (
          <>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <CustomInput
                required
                id="add_user_first_name_field"
                placeHolder="Enter IMEI Number"
                name="deviceOnboardingIMEINumber"
                label="Device Onboarding IMEI No"
                onChange={handleFormDataChange}
                value={userDeviceFields.deviceOnboardingIMEINumber.value}
              />
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
                        backgroundColor: "#ECF9FF",
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
                    Device Model
                    <Box ml={0.4} sx={classes.star}>
                      *
                    </Box>
                  </InputLabel>
                  <Select
                    sx={classes.dropDownStyle}
                    id="add_user_roles_dropdown"
                    name="deviceOnboardingModel"
                    value={userDeviceFields.deviceOnboardingModel.value}
                    onChange={(e) => {
                      setDeviceFormFields({
                        ...userDeviceFields,
                        deviceOnboardingModel: {
                          value: e.target.value,
                        },
                      });
                    }}
                    renderValue={
                      userDeviceFields.deviceOnboardingModel.value !== ""
                        ? undefined
                        : () => "Select a Device Model"
                    }
                    MenuProps={classes.menuProps}
                    displayEmpty
                    error={
                      userDeviceFields.deviceOnboardingModel.value?.length <
                        4 &&
                      userDeviceFields.deviceOnboardingModel.error?.length !== 0
                    }
                  >
                    {deviceModelData?.map((item: any, index: any) => (
                      <MenuItem
                        key={index}
                        value={item._id}
                        sx={classes.dropDownOptionsStyle}
                      >
                        {item.deviceModelName}
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
            onClick={() => props?.handleCloseAddUserDialog?.()}
            customClasses={classes.cancelButtonStyle}
          />
          <CustomButton
            id="add_user_submit_button"
            label={props.edit ? "Update" : "Add"}
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
          isDialogOpen={props.openAddUserDialog}
          closable
          closeButtonVisibility
          handleDialogClose={props.handleCloseAddUserDialog}
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
