import React, { useEffect, useState } from "react";
import {
  CustomButton,
  CustomDialog,
  CustomInput,
} from "../../../../global/components";
import { Box, Chip, Grid, MenuItem, Select, Typography } from "@mui/material";
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
import { theme } from "../../../../utils/styles";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";

interface CustomProps {
  openAddUserDialog: boolean;
  handleCloseAddUserDialog?: Function;
  edit?: boolean;
  tableData?: Function;
  isLoading?: boolean;
  selectedRowData?: any;
}

const languages = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "hi",
    name: "Hindi",
  },
];

const AddAccountModal = (props: CustomProps) => {
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
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
  const classes = AccountStyles;
  const [accountFields, setAccountFields] = useState<any>(
    insertAccountField(props?.selectedRowData)
  );
  const [roleData, setRoleData] = useState([]);
  const [authAccountNo, setAccountAuthNo] = useState([]);
  const [accountConfig, setAccountConfig] = useState([]);
  const [language, setLanguage] = useState("");

  useEffect(() => {
    setAccountFields(insertAccountField());
    setAccountConfig([]);
    setAccountAuthNo([]);
    cookies.set("i18next", "en");
    i18next.changeLanguage("en");
    setLanguage("");
  }, [props.openAddUserDialog]);

  useEffect(() => {
    if (props.edit && props.selectedRowData) {
      setAccountFields(insertAccountField(props.selectedRowData));
      setAccountConfig(props?.selectedRowData?.accountConfiguration);
      setAccountAuthNo(props?.selectedRowData?.authAccountNo);
    }
  }, [props.selectedRowData]);

  useEffect(() => {
    fetchTableDataHandler();
  }, []);

  const fetchTableDataHandler = async () => {
    try {
      const res = await fetchIndustryHandler({
        input: { page: -1, limit: 0 },
      });
      setRoleData(res?.industryListAll?.data);
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
        accountKey: { ...prevData.tagsValue, error: "key cant be empty" },
        accountValue: { ...prevData.tagsValue, error: "Value cant be empty" },
      }));
      return false;
    }
    const checkExistingValue = accountConfig?.some(
      (item: any) =>
        item?.key === accountFields.accountKey.value &&
        item?.value === accountFields.accountValue.value
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
          error: "You cannot add duplicate value",
        },
      }));
      return false;
    }
    return true;
  };

  const addAccountConfig = () => {
    if (validateAccountConfig()) {
      const addedConfig: any[] = [];
      addedConfig.push(...accountConfig, {
        key: accountFields.accountKey.value,
        value: accountFields.accountValue.value,
      });
      const filterValue: any = _.uniqWith(addedConfig, _.isEqual);
      setAccountConfig(filterValue);
      setAccountFields((prevData: any) => ({
        ...prevData,
        accountKey: { value: "", error: "" },
        accountValue: { value: "", error: "" },
      }));
    }
  };

  const validateAuthorizedNo = () => {
    if (!isTruthy(accountFields.accountAuthorizedNo.value)) {
      setAccountFields((prevData: any) => ({
        ...prevData,
        accountAuthorizedNo: {
          ...prevData.accountAuthorizedNo,
          error: "Account Auth No can be empty",
        },
      }));
      return false;
    }
    const checkExistingValue = authAccountNo?.some(
      (item: any) => item === accountFields.accountAuthorizedNo.value
    );
    if (checkExistingValue) {
      setAccountFields((prevData: any) => ({
        ...prevData,
        accountAuthorizedNo: {
          ...prevData.accountAuthorizedNo,
          error: "You cannot add duplicate  No",
        },
      }));
      return false;
    }
    return true;
  };

  const addAuthNoHandler = () => {
    if (validateAuthorizedNo()) {
      const arrAuthNo: any[] = [];
      arrAuthNo.push(...authAccountNo, accountFields.accountAuthorizedNo.value);
      const filterValue: any = _.uniqWith(arrAuthNo, _.isEqual);
      setAccountAuthNo(filterValue);
      setAccountFields((prevData: any) => ({
        ...prevData,
        accountAuthorizedNo: {
          value: "",
          error: "",
        },
      }));
    }
  };

  const addUserDialogBody = () => {
    return (
      <>
        {/* <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={8} md={8} lg={8} xl={8}></Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <Box>
              <Box>
                <Box display={"flex"}>
                  <Typography sx={classes.label}>
                    {t("selectLanguage")}
                  </Typography>
                </Box>

                <Select
                  id="role_select_dropdown"
                  name="chooseLanguage"
                  sx={classes.dropDownStyle}
                  value={language}
                  displayEmpty
                  onChange={(e: any) => {
                    const chooseLan = e.target.value;
                    i18next.changeLanguage(chooseLan);
                    setLanguage(chooseLan);
                  }}
                  MenuProps={MenuProps}
                  renderValue={
                    language !== "" ? undefined : () => "Select a Language"
                  }
                >
                  {languages.map((item: any, index: number) => (
                    <MenuItem
                      key={index}
                      value={item.code}
                      sx={classes.optionStyle}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          </Grid>
        </Grid> */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              required
              label={t("accountName")}
              id="account_name_field"
              type="text"
              name="accountName"
              placeHolder="Enter Account Name"
              onChange={onChangeHandler}
              propsToInputElement={{ maxlength: 25 }}
              value={accountFields.accountName.value}
              //   error={profileFormData.name.error}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              required
              label={t("accountContactName")}
              id="account_name_field"
              type="text"
              name="accountContactName"
              placeHolder="Enter Account Contact Name"
              onChange={onChangeHandler}
              propsToInputElement={{ maxlength: 25 }}
              value={accountFields.accountContactName.value}
              //   error={profileFormData.name.error}
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
                  <Typography sx={classes.label}>{t("accountType")}</Typography>
                  <Typography sx={classes.star}>*</Typography>
                </Box>

                <Select
                  id="role_select_dropdown"
                  name="accountType"
                  disabled={props.edit}
                  sx={classes.dropDownStyle}
                  displayEmpty
                  value={accountFields.accountType.value}
                  onChange={onChangeHandler}
                  MenuProps={MenuProps}
                  renderValue={
                    accountFields.accountType.value !== ""
                      ? undefined
                      : () => "Select a Industry Type"
                  }
                >
                  {roleData.map((item: any, index: number) => (
                    <MenuItem
                      key={index}
                      value={item._id}
                      sx={classes.optionStyle}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              required
              label={t("accountContactEmail")}
              id="account_contact_email_field"
              type="text"
              name="accountContactEmail"
              placeHolder="Enter Account Contact Email"
              onChange={onChangeHandler}
              propsToInputElement={{ maxlength: 35 }}
              value={accountFields.accountContactEmail.value}
              //   error={profileFormData.name.error}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              label={t("accountAddress")}
              id="account_address_field"
              type="text"
              name="accountAddress"
              placeHolder="Enter Address"
              onChange={onChangeHandler}
              propsToInputElement={{ maxlength: 100 }}
              value={accountFields.accountAddress.value}
              //   error={profileFormData.name.error}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              required
              label={t("accountContactMobile")}
              id="account_contact_mobile_field"
              type="text"
              name="accountContactMobile"
              placeHolder="Enter contact mobile number"
              onChange={onChangeHandler}
              propsToInputElement={{ maxlength: 100 }}
              value={accountFields.accountContactMobile.value}
              //   error={profileFormData.name.error}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              label={t("accountPanNo")}
              id="account_address_field"
              type="number"
              name="accountPanNo"
              placeHolder="Enter Account Pan No"
              onChange={onChangeHandler}
              propsToInputElement={{ maxlength: 100 }}
              value={accountFields.accountPanNo.value}
              //   error={profileFormData.name.error}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              label={t("accountGstNo")}
              id="account_address_field"
              type="number"
              name="accountGstNo"
              placeHolder="Enter Account GST No"
              onChange={onChangeHandler}
              propsToInputElement={{ maxlength: 100 }}
              value={accountFields.accountGstNo.value}
              //   error={profileFormData.name.error}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              label={t("accountAadharNo")}
              id="account_address_field"
              type="number"
              name="accountAadharNo"
              placeHolder="Enter Account Aadhar Card Number"
              onChange={onChangeHandler}
              propsToInputElement={{ maxlength: 100 }}
              value={accountFields.accountAadharNo.value}
              //   error={profileFormData.name.error}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              label={t("accountState")}
              id="account_address_field"
              type="text"
              name="accountState"
              placeHolder="Enter Account State"
              onChange={onChangeHandler}
              propsToInputElement={{ maxlength: 100 }}
              value={accountFields.accountState.value}
              //   error={profileFormData.name.error}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              label={t("accountCity")}
              id="account_address_field"
              type="text"
              name="accountCity"
              placeHolder="Enter Account City"
              onChange={onChangeHandler}
              propsToInputElement={{ maxlength: 100 }}
              value={accountFields.accountCity.value}
              //   error={profileFormData.name.error}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              label={t("remarks")}
              id="account_address_field"
              type="text"
              name="remarks"
              placeHolder="Enter Remarks"
              onChange={onChangeHandler}
              propsToInputElement={{ maxlength: 100 }}
              value={accountFields.remarks.value}
              //   error={profileFormData.name.error}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={12} xl={12}>
            <Grid container gap={2}>
              <Grid item xs={12} sm={6} md={6} lg={8} xl={8}>
                <CustomInput
                  label={t("accountAuthMobile")}
                  id="recipient_modal_tags_field"
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
                  id="recipient_modal_add_tag_button"
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
              <CustomInput
                label={t("accountKey")}
                id="recipient_modal_tags_field"
                type="text"
                name="accountKey"
                placeHolder="Enter Account Key"
                error={accountFields.accountKey.error}
                onChange={onChangeHandler}
                value={accountFields.accountKey.value}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
              <CustomInput
                label={t("accountValue")}
                id="recipient_modal_tags_field"
                type="text"
                name="accountValue"
                placeHolder="Enter Account value"
                required
                error={accountFields.accountValue.error}
                onChange={onChangeHandler}
                value={accountFields.accountValue.value}
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
                onClick={addAccountConfig}
                label="Add"
              />
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
      </>
    );
  };
  const onChangeHandler = (event: any) => {
    setAccountFields({
      ...accountFields,
      [event.target.name]: {
        value: event.target.value,
        error: "",
      },
    });
  };

  const addAccountHandler = async () => {
    try {
      const accountpayload: any = {
        accountName: accountFields.accountName.value,
        accountContactName: accountFields.accountContactName.value,
        accountContactEmail: accountFields.accountContactEmail.value,
        accountAddress: accountFields.accountAddress.value,
        accountContactMobile: accountFields.accountContactMobile.value,
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
      if (props.edit) {
        const res = await updateAccount({
          input: { ...accountpayload, _id: props?.selectedRowData?._id },
        });
        openSuccessNotification(res.updateAccount?.message);
      } else {
        const res = await addAccount({
          input: { ...accountpayload },
        });
        openSuccessNotification(res.createAccountModule.message);
      }
      await props.tableData?.();
      props.handleCloseAddUserDialog?.(false);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
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
            onClick={addAccountHandler}
            // loading={loading}
          />
        </Box>
      </Grid>
    );
  };

  useEffect(() => {
    document.body.dir = currentLanguage as any;
    document.title = t("app_title");
  }, [currentLanguage, t]);

  const addUserHeaderImg = () => {
    return (
      <Box display={"flex"}>
        <img src={uploadUser} alt="Add user not found!" />
      </Box>
    );
  };

  const addUserDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>
          {props.edit ? t("updateAccount") : t("accountModalName")}
        </Typography>
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

export default React.memo(AddAccountModal);
