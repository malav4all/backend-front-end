import {
  Box,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Stack,
  Typography,
  SelectChangeEvent,
  InputAdornment,
  IconButton,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CustomButton,
  CustomContactNumberInput,
  CustomDialog,
  CustomInput,
} from "../../../../../global/components";
import usersStyles from "../../AssetAssingment.styles";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../../../helpers/methods";
import {
  insertAssetAssingmentField,
  validateAddAssetAssingmentForm,
} from "../../AssetAssingmentTypeAndValidation";

import strings from "../../../../../global/constants/StringConstants";
import _ from "lodash";

import { store } from "../../../../../utils/store";
import notifiers from "../../../../../global/constants/NotificationConstants";
import {
  addAssetAssingment,
  updateAssetAssingmentList,
} from "../../service/AssetAssingment.service";
import { fetchRoutes } from "../../../../Routes/service/routes.service";

interface CustomProps {
  openAddAssetAssingmentDialog: boolean;
  handleCloseAddAssetAssingmentDialog: Function;
  managerMail: string[];
  roles: any[];
  location?: any;
  tableData: Function;
  isLoading: boolean;
  edit?: boolean;
  selectedAssetAssingmentRowData?: any;
  setEdit?: any;
}

const AddAssetAssingment = (props: CustomProps) => {
  const theme = useTheme();
  const classes = usersStyles;
  const [assetAssingmentFormFields, setAssetAssingmentFormFields] =
    useState<any>(
      insertAssetAssingmentField(
        props?.selectedAssetAssingmentRowData,
        props.edit
      )
    );
    
  const [routesData, setRoutesData] = useState<any>([]);

  useEffect(() => {
    props.setEdit?.(false);
    setAssetAssingmentFormFields(insertAssetAssingmentField());
  }, [props.openAddAssetAssingmentDialog]);

  useEffect(() => {
    if (props.edit && props.selectedAssetAssingmentRowData) {
      props.setEdit?.(true);
      setAssetAssingmentFormFields(
        insertAssetAssingmentField(props.selectedAssetAssingmentRowData)
      );
    }
  }, [props.selectedAssetAssingmentRowData]);

  useEffect(() => {
    fetchRoutesData();
  }, []);

  const handleValidation = () => {
    const { isValid, errors }: any = validateAddAssetAssingmentForm(
      assetAssingmentFormFields,
      props.edit
    );
    setAssetAssingmentFormFields({ ...errors });
    return isValid;
  };

  const handleFormDataChange = (formFillEvent: any) => {
    setAssetAssingmentFormFields({
      ...assetAssingmentFormFields,
      [formFillEvent.target.name]: {
        ...assetAssingmentFormFields[formFillEvent.target.name],
        value: formFillEvent.target.value,
        error: "",
      },
    });
  };

  const handleSelectRoutesStatus = (formFillEvent: any) => {
    setAssetAssingmentFormFields({
      ...assetAssingmentFormFields,
      routes: {
        value: formFillEvent.target.value,
        error: "",
      },
    });
  };

  const addAssetAssingmentDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>
          {props.edit ? "Update Asset" : "Add Asset"}
        </Typography>
      </Box>
    );
  };

  const fetchRoutesData = async () => {
    try {
      const res = await fetchRoutes({
        input: {
          page: -1,
          limit: 10,
        },
      });
      setRoutesData(res.fetchRoutes.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const insertAssetAssingmentDetails = async () => {
    try {
      const insertAssetAssingmentBody = {
        imei: Number(assetAssingmentFormFields.imei?.value),
        labelName: assetAssingmentFormFields.labelName?.value?.trim(),
        boxSet: assetAssingmentFormFields.boxSet?.value?.trim(),
        routes: assetAssingmentFormFields.routes?.value,
        createdBy: assetAssingmentFormFields.createdBy?.value?.trim(),
      };
      if (handleValidation()) {
        if (props.edit) {
          const res = await updateAssetAssingmentList({
            input: {
              _id: props?.selectedAssetAssingmentRowData?._id,
              ...insertAssetAssingmentBody,
              createdBy: store.getState().auth.userName,
            },
          });
          props.handleCloseAddAssetAssingmentDialog(false);
          openSuccessNotification(res?.updateAssertAssingmentModule?.message);
          await props.tableData?.();
        } else {
          const res = await addAssetAssingment({
            input: {
              ...insertAssetAssingmentBody,
              createdBy: store.getState().auth.userName,
            },
          });
          props.handleCloseAddAssetAssingmentDialog(false);
          openSuccessNotification(res?.createAssetAssingment?.message);
          await props.tableData?.();
        }
      }
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
    }
  };

  const addAssetAssingmentDialogBody = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <CustomInput
            required
            id="add_asset_assingment_imei_field"
            placeHolder="Enter IMEI Number"
            name="imei"
            label="IMEI Number"
            onChange={handleFormDataChange}
            value={assetAssingmentFormFields.imei?.value}
            error={assetAssingmentFormFields.imei?.error}
            propsToInputElement={{ maxLength: strings.USER_FIRST_NAME_LIMIT }}
            sx={{
              input: {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.default,
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <CustomInput
            required
            id="add_asset_assingment_label_name_field"
            placeHolder="Enter Label Name"
            name="labelName"
            label="Label Name"
            onChange={handleFormDataChange}
            value={assetAssingmentFormFields.labelName?.value}
            error={assetAssingmentFormFields.labelName?.error}
            propsToInputElement={{ maxLength: strings.USER_LAST_NAME_LIMIT }}
            sx={{
              input: {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.default,
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box>
            <Stack direction="column">
              <InputLabel
                sx={{
                  ...classes.inputLabel,
                  color: theme.palette.text.primary,
                }}
                shrink
              >
                Box Set
                <Box ml={0.4} sx={classes.star}>
                  *
                </Box>
              </InputLabel>
              <Select
                sx={{
                  ...classes.dropDownStyle,
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  "& .MuiSelect-select": {
                    color: theme.palette.text.primary,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
                id="add_user_status_dropdown"
                name="boxSet"
                value={assetAssingmentFormFields?.boxSet?.value}
                onChange={handleFormDataChange}
                renderValue={() =>
                  assetAssingmentFormFields?.boxSet?.value || "Select Box set"
                }
                MenuProps={classes.menuProps}
                displayEmpty
                error={
                  !isTruthy(assetAssingmentFormFields.boxSet?.value) &&
                  assetAssingmentFormFields.boxSet?.error
                }
              >
                {["A", "B", "C"].map((item: any, index: any) => (
                  <MenuItem
                    key={index}
                    value={item}
                    sx={{
                      ...classes.dropDownOptionsStyle,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Select>
              {!isTruthy(assetAssingmentFormFields.boxSet?.value) && (
                <FormHelperText error sx={classes.errorStyle}>
                  {assetAssingmentFormFields.boxSet?.error}
                </FormHelperText>
              )}
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box>
            <Stack direction="column">
              <InputLabel
                sx={{
                  ...classes.inputLabel,
                  color: theme.palette.text.primary,
                }}
                shrink
              >
                Routes
              </InputLabel>
              <Select
                sx={{
                  ...classes.dropDownStyle,
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  "& .MuiSelect-select": {
                    color: theme.palette.text.primary,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
                id="add_user_status_dropdown"
                name="routes"
                value={assetAssingmentFormFields?.routes?.value}
                onChange={handleSelectRoutesStatus}
                renderValue={(selectedValue) => {
                  const selectedItem = routesData.find(
                    (item: any) => item._id === selectedValue
                  );
                  return selectedItem
                    ? selectedItem.routesName
                    : "Select Routes";
                }}
                MenuProps={classes.menuProps}
                displayEmpty
              >
                {routesData.map((item: any, index: any) => (
                  <MenuItem
                    key={index}
                    value={item._id}
                    sx={{
                      ...classes.dropDownOptionsStyle,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {item.routesName}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    );
  };

  const addAssetAssingmentDialogFooter = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <Box sx={classes.dialogFooter}>
          <CustomButton
            id="add_user_cancel_button"
            label="Cancel"
            onClick={() => props?.handleCloseAddAssetAssingmentDialog()}
            customClasses={{
              ...classes.cancelButtonStyle,
              backgroundColor: "#00000000",
              color: theme.palette.text.primary,
            }}
          />
          <CustomButton
            id="add_user_submit_button"
            label={props.edit ? "Update" : "Add"}
            onClick={insertAssetAssingmentDetails}
          />
        </Box>
      </Grid>
    );
  };

  // const addAssetAssingmentHeaderImg = () => {
  //   return (
  //     <Box display={"flex"}>
  //       <img src={uploadAssetAssingment} alt="Add user not found!" />
  //     </Box>
  //   );
  // };

  const getAddAssetAssingmentDialog = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <CustomDialog
          isDialogOpen={props.openAddAssetAssingmentDialog}
          closable
          closeButtonVisibility
          handleDialogClose={props.handleCloseAddAssetAssingmentDialog}
          // dialogHeaderContent={addAssetAssingmentHeaderImg()}
          dialogTitleContent={addAssetAssingmentDialogTitle()}
          dialogBodyContent={addAssetAssingmentDialogBody()}
          dialogFooterContent={addAssetAssingmentDialogFooter()}
          width={"700px"}
          fullScreen={false}
        />
      </Grid>
    );
  };

  return <Box>{getAddAssetAssingmentDialog()}</Box>;
};

export default AddAssetAssingment;
