import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  FormHelperText,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import {
  CustomButton,
  CustomDialog,
  CustomInput,
} from "../../../../../global/components";
import usersStyles from "../../Users.styles";
import {
  getFormattedNumbers,
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../../../helpers/methods";
// import { editCampaigner } from "../../UserService";
import { RowData } from "../../../../../models/interfaces";
import {
  updateUserValidation,
  updateUserValidationForm,
} from "../../UserTypeAndValidation";
import notifiers from "../../../../../global/constants/NotificationConstants";
import userUpdateImg from "../../../../../assets/images/userUpdateImg.svg";
import strings from "../../../../../global/constants/StringConstants";
import _ from "lodash";

interface customProps {
  updateUserDialogOpen: boolean;
  handleUpdateDialogClose: Function;
  selectedRowData: any;
  managerMail: string[];
  tableData: Function;
  getSearchData: Function;
  searchCampaigner: string;
}

const UpdateUser = (props: customProps) => {
  const classes = usersStyles;
  const [rowData, setRowData] = useState(
    updateUserValidation(props.selectedRowData)
  );
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setRowData(updateUserValidation(props.selectedRowData));
  }, [props.selectedRowData]);

  const formData = (
    updateFormFillEvent: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowData({
      ...rowData,
      [updateFormFillEvent.target.name]: {
        ...rowData[updateFormFillEvent.target.name],
        value: updateFormFillEvent.target.value,
      },
    });
  };

  const handleValidation = () => {
    const { errors, isValid } = updateUserValidationForm(rowData);
    setRowData({ ...errors });
    return isValid;
  };

  const checkValidMangerEmail = () => {
    return _.uniq(props.managerMail)?.includes(rowData?.assignBy?.value);
  };

  const updateUserDetail = async () => {
    setLoading(true);
    if (handleValidation() && checkValidMangerEmail()) {
      let insertUserBody = {
        emailId: rowData?.emailId?.value,
        allowedEmailCount: rowData?.allowedEmailCount?.value,
        assignBy: rowData?.assignBy?.value,
        title: rowData?.title?.value.trim(),
      };
      if (
        insertUserBody.title.length > 0 &&
        insertUserBody.assignBy.length > 0
      ) {
        try {
          // await editCampaigner(insertUserBody);
          openSuccessNotification("Campaigner Updated successfully");
          props.handleUpdateDialogClose(false);
          if (props.searchCampaigner) {
            await props.getSearchData();
          } else {
            await props.tableData();
          }
        } catch (error: any) {
          openErrorNotification(
            isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
          );
        }
      }
    }
    setLoading(false);
  };

  const updateUserDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>Update User</Typography>
      </Box>
    );
  };

  const updateUserDialogBody = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <CustomInput
            required
            sx={classes.BootstrapInput}
            label="Email"
            disabled={true}
            id="update_user_email_field"
            name="emailId"
            value={rowData?.emailId?.value}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box>
            <InputLabel sx={classes.inputLabel} shrink>
              Manager Email
              <Box ml={0.4} sx={classes.star}>
                *
              </Box>
            </InputLabel>
            <Autocomplete
              sx={classes.emailDropDownStyle}
              id="update_user_manager_field"
              options={props?.managerMail?.map((item: string) => item)}
              value={rowData?.assignBy?.value}
              renderInput={(params) => (
                <TextField
                  sx={classes.select}
                  {...params}
                  value={rowData?.assignBy?.value}
                  name="assignBy"
                  placeholder="Search manager email"
                  onSelect={formData}
                  error={!checkValidMangerEmail()}
                />
              )}
            />
            {checkValidMangerEmail() ? null : (
              <FormHelperText error sx={classes.errorStyle}>
                Please Select Manger Email in DropDown
              </FormHelperText>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <CustomInput
            label="Title"
            required
            id="update_user_title_field"
            name="title"
            placeHolder="Enter user title"
            value={rowData?.title?.value}
            onChange={formData}
            error={!isTruthy(rowData?.title?.value) && rowData?.title?.error}
            propsToInputElement={{ maxLength: strings.USER_TITLE_LIMIT }}
          />
          {isTruthy(rowData?.title?.value) &&
            rowData?.title?.value.length >= strings.USER_TITLE_LIMIT && (
              <FormHelperText error sx={classes.errorStyle}>
                {`Title must be less than ${strings.USER_TITLE_LIMIT} characters`}
              </FormHelperText>
            )}
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <CustomInput
            label="Allowed Email Count/Day"
            required
            id="update_user_allowed_email_field"
            InputProps={{ type: "number", min: 0 }}
            name="allowedEmailCount"
            placeHolder="Allowed email count/day"
            value={
              getFormattedNumbers(rowData?.allowedEmailCount?.value).number
            }
            onChange={(event: any) => {
              event.target.value = Math.abs(event.target.value);
              formData(event);
            }}
            error={
              !isTruthy(rowData?.allowedEmailCount?.value) &&
              rowData?.allowedEmailCount?.error
            }
          />
        </Grid>
      </Grid>
    );
  };

  const handleCancelUpdateModal = () => {
    props.handleUpdateDialogClose();
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
            label="Update"
            onClick={() => updateUserDetail()}
            loading={loading}
          />
        </Box>
      </Grid>
    );
  };

  const modalHeader = () => {
    return (
      <Box display={"flex"}>
        <img src={userUpdateImg} alt="Update user image not found!" />
      </Box>
    );
  };

  const updateCampaigner = () => {
    return (
      <CustomDialog
        isDialogOpen={props.updateUserDialogOpen}
        closable
        closeButtonVisibility
        handleDialogClose={props.handleUpdateDialogClose}
        dialogHeaderContent={modalHeader()}
        dialogTitleContent={updateUserDialogTitle()}
        dialogBodyContent={updateUserDialogBody()}
        dialogFooterContent={updateUserDialogFooter()}
        width={"870px"}
      />
    );
  };

  return <Box>{updateCampaigner()}</Box>;
};

export default UpdateUser;
