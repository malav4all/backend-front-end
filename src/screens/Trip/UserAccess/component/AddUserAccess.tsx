import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  CustomButton,
  CustomDialog,
} from "../../../../global/components";
import {
  addUserAccess,
  fetchUserAccountWise,
} from "../service/UserAccess.service";
import { store } from "../../../../utils/store";
import {
  openErrorNotification,
  openSuccessNotification,
} from "../../../../helpers/methods";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import MultiSelectAutocomplete from "./MultiSelectComponent";
import { fetchDeviceGroup } from "../../../DeviceGroup/service/DeviceGroup.service";
import { fetchDeviceOnboardingTableHandler } from "../../../Inventory/DeviceOnboarding/service/DeviceOnboarding.service";
import { fetchEntityTableHandler } from "../../Entity/service/Entity.service";

const AddUserAccess = ({
  open,
  handleClose,
  userAccessFormData,
  isLoading,
  classes,
}: any) => {
  const theme = useTheme();
  const [userAccessList, setUserAccessList] = useState({
    userList: [],
    deviceGroupList: [],
    deviceImeiList: [],
    entitesAccessList: [],
  });
  const [selectedDeviceGroups, setSelectedDeviceGroups] = useState([]);
  const [selectedEntities, setSelectedEntities] = useState([]);
  const [selectedImeis, setSelectedImeis] = useState([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    fetchUserAccessFormData();
  }, []);

  const addUserAccessDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>Add User Access</Typography>
      </Box>
    );
  };

  const handleUserChange = (event: any) => {
    const userId = event.target.value;
    const selectedUser = userAccessList.userList.find(
      (user: any) => user._id === userId
    );
    setSelectedUser(selectedUser);
  };

  const addUserAccessHandler = async () => {
    try {
      const payload: any = {
        accountId: store.getState().auth.tenantId,
        userId: selectedUser,
        deviceGroup: selectedDeviceGroups,
        entites: selectedEntities,
        devicesImei: selectedImeis,
        createdBy: store.getState().auth.userName,
      };

      const res = await addUserAccess({
        input: { ...payload },
      });

      openSuccessNotification(res.addUserAccess.message);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const fetchUserAccessFormData = async () => {
    try {
      const [res1, res2, res3, res4] = await Promise.all([
        fetchUserAccountWise({
          input: { accountId: store.getState().auth.tenantId },
        }),
        fetchDeviceGroup({
          input: {
            accountId: store.getState().auth.tenantId,
            page: -1,
            limit: 100000,
          },
        }),
        fetchDeviceOnboardingTableHandler({
          input: {
            accountId: store.getState().auth.tenantId,
            page: 1,
            limit: 10,
          },
        }),
        fetchEntityTableHandler({
          input: {
            accountId: store.getState().auth.tenantId,
            page: -1,
            limit: 100000,
          },
        }),
      ]);
      setUserAccessList({
        ...userAccessList,
        userList: res1?.fetchUserAccountWise?.data,
        deviceGroupList: res2?.fetchDeviceGroup?.data,
        deviceImeiList: res3.fetchDeviceOnboardingList.data,
        entitesAccessList: res4?.fetchEntitesType?.data,
      });
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const addUserAccessDialogBody = () => {
    return (
      <Grid container spacing={2} sx={{ padding: "1rem" }}>
        <Grid item xs={12} sm={6} md={12} lg={12} xl={12}>
          <Box>
            <Stack direction="column">
              <InputLabel
                sx={{
                  ...classes.inputLabel,
                  color: theme.palette.text.primary,
                }}
                shrink
              >
                Select User
                <Box ml={0.4} sx={classes.star}>
                  *
                </Box>
              </InputLabel>
              <Select
                sx={classes.dropDownStyle}
                id="add_user_roles_dropdown"
                name="userId"
                value={selectedUser ? selectedUser._id : ""}
                onChange={handleUserChange}
                renderValue={(selected) =>
                  selected ? selectedUser.firstName : "Select a User"
                }
                MenuProps={classes.menuProps}
                displayEmpty
                error={
                  userAccessFormData.userId.value.length < 4 &&
                  userAccessFormData.userId.error.length !== 0
                }
              >
                {userAccessList?.userList?.map((item: any, index: any) => (
                  <MenuItem
                    key={index}
                    value={item._id}
                    sx={classes.dropDownOptionsStyle}
                  >
                    {item.firstName}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={12} lg={12} xl={12}>
          <MultiSelectAutocomplete
            label="Device Group"
            options={userAccessList.deviceGroupList}
            selectedOptions={selectedDeviceGroups}
            setSelectedOptions={setSelectedDeviceGroups}
            optionKey="deviceGroupName"
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            style={{
              height: "47px",
              display: "flex",
              alignItems: "center",
              color: "white",
              backgroundColor: "#060b25",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={12} lg={12} xl={12}>
          <MultiSelectAutocomplete
            label="Entities"
            options={userAccessList.entitesAccessList}
            selectedOptions={selectedEntities}
            setSelectedOptions={setSelectedEntities}
            optionKey="name"
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={12} lg={12} xl={12}>
          <MultiSelectAutocomplete
            label="Imei"
            options={userAccessList.deviceImeiList}
            selectedOptions={selectedImeis}
            setSelectedOptions={setSelectedImeis}
            optionKey="deviceOnboardingIMEINumber"
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
          />
        </Grid>
      </Grid>
    );
  };

  const addUserAccessDialogFooter = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <Box sx={classes.dialogFooter}>
          <CustomButton
            id="add_userAccess_cancel_button"
            label="Cancel"
            onClick={handleClose}
            customClasses={{
              ...classes.cancelButtonStyle,
              backgroundColor: "#00000000",
              color: theme.palette.text.primary,
            }}
          />
          <CustomButton
            id="add_userAccess_submit_button"
            label="Add"
            onClick={addUserAccessHandler}
            loading={isLoading}
          />
        </Box>
      </Grid>
    );
  };

  const addUserAccessHeaderImg = () => {
    return (
      <Box display={"flex"}>
        {/* <img src={} alt="Add userAccess not found!" /> */}
      </Box>
    );
  };

  return (
    <CustomDialog
      isDialogOpen={open}
      closable
      //   closeButtonVisibility
      handleDialogClose={handleClose}
      dialogHeaderContent={addUserAccessHeaderImg()}
      dialogTitleContent={addUserAccessDialogTitle()}
      dialogBodyContent={addUserAccessDialogBody()}
      dialogFooterContent={addUserAccessDialogFooter()}
      width={"700px"}
      fullScreen={false}
    />
  );
};

export default AddUserAccess;
