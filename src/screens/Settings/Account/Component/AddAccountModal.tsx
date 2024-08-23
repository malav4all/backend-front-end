import React, { useEffect, useState } from "react";
import {
  CustomButton,
  CustomDialog,
  CustomInput,
} from "../../../../global/components";
import {
  Box,
  Chip,
  Grid,
  MenuItem,
  Select,
  Switch,
  Typography,
  useTheme,
  Dialog,
} from "@mui/material";
import AccountStyles from "../Account.styles";
import { insertAccountField } from "../Account.helper";
import { store } from "../../../../utils/store";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../../helpers/methods";
import {
  addAccount,
  fetchIndustryHandler,
  updateAccount,
} from "../service/account.service";
import uploadUser from "../../../../assets/images/uploadUser.svg";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import Datapush from "./DataPush/Datapush";

interface AccountField {
  value: string;
  error: string;
}

interface AccountFields {
  accountName: AccountField;
  accountContactName: AccountField;
  accountContactEmail: AccountField;
  accountAddress: AccountField;
  accountContactMobile: AccountField;
  accountType: AccountField;
  accountPanNo: AccountField;
  accountGstNo: AccountField;
  accountAadharNo: AccountField;
  accountState: AccountField;
  accountCity: AccountField;
  remarks: AccountField;
  accountAuthorizedNo: AccountField;
  accountApiKey: AccountField;
  accountCreatedBy: AccountField;
  accountKey: AccountField;
  accountValue: AccountField;
}

interface RoleData {
  _id: string;
  name: string;
}

interface AddAccountModalProps {
  openAddAccountDialog: boolean;
  handleCloseAddAccountDialog?: () => void;
  edit?: boolean;
  tableData?: () => void;
  selectedRowData?: any;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddAccountModal: React.FC<AddAccountModalProps> = ({
  openAddAccountDialog,
  handleCloseAddAccountDialog,
  edit,
  tableData,
  selectedRowData,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = AccountStyles;
  const [accountFields, setAccountFields] = useState<any>(
    insertAccountField(selectedRowData)
  );
  const [roleData, setRoleData] = useState<RoleData[]>([]);
  const [authAccountNo, setAccountAuthNo] = useState<string[]>([]);
  const [accountConfig, setAccountConfig] = useState<
    { key: string; value: string }[]
  >([]);
  const [dataPushActive, setDataPushActive] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    setAccountFields(insertAccountField(selectedRowData));
    setAccountConfig([]);
    setAccountAuthNo([]);
  }, [openAddAccountDialog]);

  useEffect(() => {
    if (edit && selectedRowData) {
      setAccountFields(insertAccountField(selectedRowData));
      setAccountConfig(selectedRowData?.accountConfiguration || []);
      setAccountAuthNo(selectedRowData?.accountAuthMobile || []);
    }
  }, [selectedRowData, edit]);

  useEffect(() => {
    fetchTableDataHandler();
  }, []);

  const fetchTableDataHandler = async () => {
    try {
      const res = await fetchIndustryHandler({
        input: { page: -1, limit: 0 },
      });
      setRoleData(res?.industryListAll?.data || []);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const onChangeHandler = (event: any) => {
    const { name, value } = event.target as HTMLInputElement;
    setAccountFields({
      ...accountFields,
      [name as keyof AccountFields]: {
        value: value as string,
        error: "",
      },
    });
  };

  const validateFields = (): boolean => {
    let isValid = true;
    const errors: Partial<AccountFields> = {};

    if (!accountFields.accountName.value) {
      errors.accountName = {
        value: accountFields.accountName.value,
        error: "Account Name is required",
      };
      isValid = false;
    }
    if (!accountFields.accountContactName.value) {
      errors.accountContactName = {
        value: accountFields.accountContactName.value,
        error: "Contact Name is required",
      };
      isValid = false;
    }
    if (!accountFields.accountContactEmail.value) {
      errors.accountContactEmail = {
        value: accountFields.accountContactEmail.value,
        error: "Contact Email is required",
      };
      isValid = false;
    }
    if (!accountFields.accountContactMobile.value) {
      errors.accountContactMobile = {
        value: accountFields.accountContactMobile.value,
        error: "Contact Mobile is required",
      };
      isValid = false;
    }
    if (!accountFields.accountType.value) {
      errors.accountType = {
        value: accountFields.accountType.value,
        error: "Account Type is required",
      };
      isValid = false;
    }

    if (!isValid) {
      setAccountFields((prev: any) => ({ ...prev, ...errors }));
    }

    return isValid;
  };

  const addAccountHandler = async () => {
    if (!validateFields()) return;

    const accountPayload = {
      accountName: accountFields.accountName.value,
      accountContactName: accountFields.accountContactName.value,
      accountContactEmail: accountFields.accountContactEmail.value,
      accountAddress: accountFields.accountAddress.value,
      accountContactMobile: String(accountFields.accountContactMobile.value),
      parentId:
        store.getState().auth.account === "Master Admin"
          ? ""
          : store.getState().auth.accountId,
      industryType: accountFields.accountType.value,
      accountPanNo: accountFields.accountPanNo.value,
      accountGstNo: accountFields.accountGstNo.value,
      accountAadharNo: accountFields.accountAadharNo.value,
      accountState: accountFields.accountState.value,
      accountCity: accountFields.accountCity.value,
      remarks: accountFields.remarks.value,
      accountAuthMobile: authAccountNo,
      accountConfiguration: accountConfig,
      createdBy: store.getState().auth.userName,
    };

    try {
      if (edit) {
        const res = await updateAccount({
          input: { ...accountPayload, _id: selectedRowData?._id },
        });
        openSuccessNotification(res?.updateAccount?.message);
      } else {
        const res = await addAccount({
          input: { ...accountPayload },
        });
        openSuccessNotification(res?.createAccount?.message);
      }
      await tableData?.();
      handleCloseAddAccountDialog?.();
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const validateAccountConfig = () => {
    if (
      !isTruthy(accountFields.accountKey.value) &&
      !isTruthy(accountFields.accountValue.value)
    ) {
      setAccountFields((prevData: any) => ({
        ...prevData,
        accountKey: {
          ...prevData.accountKey,
          error: "Key can't be empty",
        },
        accountValue: {
          ...prevData.accountValue,
          error: "Value can't be empty",
        },
      }));
      return false;
    }
    const checkExistingValue = accountConfig.some(
      (item) =>
        item.key === accountFields.accountKey.value &&
        item.value === accountFields.accountValue.value
    );
    if (checkExistingValue) {
      setAccountFields((prevData: any) => ({
        ...prevData,
        accountKey: {
          ...prevData.accountKey,
          error: "You cannot add duplicate Key",
        },
        accountValue: {
          ...prevData.accountValue,
          error: "You cannot add duplicate Value",
        },
      }));
      return false;
    }
    return true;
  };

  const validateAuthorizedNo = () => {
    if (!isTruthy(accountFields.accountAuthorizedNo.value)) {
      setAccountFields((prevData: any) => ({
        ...prevData,
        accountAuthorizedNo: {
          ...prevData.accountAuthorizedNo,
          error: "Account Auth No can't be empty",
        },
      }));
      return false;
    }
    const checkExistingValue = authAccountNo.some(
      (item) => item === accountFields.accountAuthorizedNo.value
    );
    if (checkExistingValue) {
      setAccountFields((prevData: any) => ({
        ...prevData,
        accountAuthorizedNo: {
          ...prevData.accountAuthorizedNo,
          error: "You cannot add duplicate No",
        },
      }));
      return false;
    }
    return true;
  };

  const addAuthNoHandler = () => {
    if (validateAuthorizedNo()) {
      const arrAuthNo = [
        ...authAccountNo,
        accountFields.accountAuthorizedNo.value,
      ];
      const filteredValue = _.uniqWith(arrAuthNo, _.isEqual);
      setAccountAuthNo(filteredValue);
      setAccountFields((prevData: any) => ({
        ...prevData,
        accountAuthorizedNo: {
          value: "",
          error: "",
        },
      }));
    }
  };

  const handleToggleChange = (event: any) => {
    setDataPushActive(event.target.checked);
    if (event.target.checked) {
      setOpenPopup(true);
    }
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const addAccountDialogBody = () => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              required
              label={t("Account Name")}
              id="account_name_field"
              type="text"
              name="accountName"
              placeHolder="Enter Account Name"
              onChange={onChangeHandler}
              value={accountFields.accountName.value}
              error={accountFields.accountName.error}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              required
              label={t("Account Contact Name")}
              id="account_contact_name_field"
              type="text"
              name="accountContactName"
              placeHolder="Enter Account Contact Name"
              onChange={onChangeHandler}
              value={accountFields.accountContactName.value}
              error={accountFields.accountContactName.error}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Box
              sx={classes.formInput}
              display={"flex"}
              flexDirection={"column"}
            >
              <Box>
                <Box display={"flex"}>
                  <Typography sx={classes.label}>
                    {t("Account Type")}
                  </Typography>
                  <Typography sx={classes.star}>*</Typography>
                </Box>
                <Select
                  id="role_select_dropdown"
                  name="accountType"
                  disabled={edit}
                  sx={classes.dropDownStyle}
                  displayEmpty
                  value={accountFields.accountType.value}
                  onChange={onChangeHandler}
                  MenuProps={MenuProps}
                  error={accountFields.accountType.error}
                  renderValue={(value) => {
                    const selectedRole = roleData.find(
                      (role) => role._id === value
                    );
                    return selectedRole
                      ? selectedRole.name
                      : "Select an Account Type";
                  }}
                >
                  {roleData.map((item: any) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                {accountFields.accountType.error && (
                  <Typography sx={classes.accountTypeErrorMessage}>
                    {accountFields.accountType.error}
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              required
              label={t("Account Contact Email")}
              id="account_contact_email_field"
              type="text"
              name="accountContactEmail"
              placeHolder="Enter Account Contact Email"
              onChange={onChangeHandler}
              value={accountFields.accountContactEmail.value}
              error={accountFields.accountContactEmail.error}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              label={t("Account Address")}
              id="account_address_field"
              type="text"
              name="accountAddress"
              placeHolder="Enter Address"
              onChange={onChangeHandler}
              value={accountFields.accountAddress.value}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              required
              label={t("Account Contact Mobile")}
              id="account_contact_mobile_field"
              type="number"
              name="accountContactMobile"
              placeHolder="Enter contact mobile number"
              onChange={onChangeHandler}
              value={accountFields.accountContactMobile.value}
              error={accountFields.accountContactMobile.error}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              label={t("Account PAN Number")}
              id="account_pan_field"
              type="text"
              name="accountPanNo"
              placeHolder="Enter Account Pan No"
              onChange={onChangeHandler}
              value={accountFields.accountPanNo.value}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              label={t("Account GST Number")}
              id="account_gst_field"
              type="text"
              name="accountGstNo"
              placeHolder="Enter Account GST No"
              onChange={onChangeHandler}
              value={accountFields.accountGstNo.value}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              label={t("Account Aadhar Number")}
              id="account_aadhar_field"
              type="number"
              name="accountAadharNo"
              placeHolder="Enter Account Aadhar Card Number"
              onChange={onChangeHandler}
              value={accountFields.accountAadharNo.value}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              label={t("Account State")}
              id="account_state_field"
              type="text"
              name="accountState"
              placeHolder="Enter Account State"
              onChange={onChangeHandler}
              value={accountFields.accountState.value}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              label={t("Account City")}
              id="account_city_field"
              type="text"
              name="accountCity"
              placeHolder="Enter Account City"
              onChange={onChangeHandler}
              value={accountFields.accountCity.value}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              label={t("Remarks")}
              id="remarks_field"
              type="text"
              name="remarks"
              placeHolder="Enter Remarks"
              onChange={onChangeHandler}
              value={accountFields.remarks.value}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={12} xl={12}>
            <Grid container gap={2}>
              <Grid item xs={12} sm={6} md={6} lg={8} xl={8}>
                <CustomInput
                  label={t("Account Auth Mobile")}
                  id="auth_mobile_field"
                  type="text"
                  name="accountAuthorizedNo"
                  placeHolder="Enter Authorized Contact No"
                  error={accountFields.accountAuthorizedNo.error}
                  onChange={onChangeHandler}
                  value={accountFields.accountAuthorizedNo.value}
                />
              </Grid>
              <Grid xs={12} sm={6} md={4} lg={3} xl={3}>
                <CustomButton
                  id="auth_no_add_button"
                  customClasses={{
                    width: "100%",
                    marginTop: "30px",
                    [theme.breakpoints.down("lg")]: {
                      marginTop: theme.spacing(0),
                    },
                  }}
                  onClick={addAuthNoHandler}
                  label="Add"
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xl={6}>
                {authAccountNo?.map((tag: any, index: any) => (
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
                    onDelete={() =>
                      setAccountAuthNo(
                        authAccountNo.filter((item, i) => i !== index)
                      )
                    }
                  />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={12} lg={12} xl={12} mt={2}>
          <Grid container gap={2}>
            <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
              <Typography component="div" variant="h6">
                {t("Data Push Status")}
              </Typography>
              <Switch
                checked={dataPushActive}
                onChange={handleToggleChange}
                color="primary"
                name="dataPushStatus"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              {dataPushActive ? "Active" : "Not-Active"}
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xl={6}>
              {accountConfig?.map((tag: any, index: any) => (
                <Chip
                  key={index}
                  label={`${tag.key} - ${tag.value}`}
                  sx={{
                    marginLeft: "5px",
                    marginTop: "8px",
                    borderRadius: "5px",
                    fontSize: "15px",
                    backgroundColor: "#ECF9FF",
                  }}
                  variant="filled"
                  onDelete={() =>
                    setAccountConfig(
                      accountConfig.filter((item, i) => i !== index)
                    )
                  }
                />
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Dialog open={openPopup} onClose={handleClosePopup}>
          <Datapush />
        </Dialog>
      </>
    );
  };

  const addAccountDialogFooter = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <Box sx={classes.dialogFooter}>
          <CustomButton
            id="add_user_cancel_button"
            label="Cancel"
            onClick={() => handleCloseAddAccountDialog?.()}
            customClasses={{
              ...classes.cancelButtonStyle,
              backgroundColor: "#00000000",
              color: theme.palette.text.primary,
            }}
          />
          <CustomButton
            id="add_user_submit_button"
            label={edit ? "Update" : "Add"}
            onClick={addAccountHandler}
          />
        </Box>
      </Grid>
    );
  };

  const addAccountHeaderImg = () => {
    return (
      <Box display={"flex"}>
        <img src={uploadUser} alt="Add user not found!" />
      </Box>
    );
  };

  const addAccountDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>
          {edit ? t("Update Account") : t("Add Account")}
        </Typography>
      </Box>
    );
  };

  const getAddAccountDialog = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <CustomDialog
          isDialogOpen={openAddAccountDialog}
          closable
          closeButtonVisibility
          handleDialogClose={handleCloseAddAccountDialog}
          dialogHeaderContent={addAccountHeaderImg()}
          dialogTitleContent={addAccountDialogTitle()}
          dialogBodyContent={addAccountDialogBody()}
          dialogFooterContent={addAccountDialogFooter()}
          width={"700px"}
          fullScreen={false}
        />
      </Grid>
    );
  };

  return <Box>{getAddAccountDialog()}</Box>;
};

export default React.memo(AddAccountModal);
