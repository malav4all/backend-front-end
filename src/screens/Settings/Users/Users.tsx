import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Chip,
  Grid,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import usersStyles from "./Users.styles";
import CustomButton from "../../../global/components/CustomButton/CustomButton";
import AddUser from "./components/AddUser/AddUser";
import { RowData, UserData } from "../../../models/interfaces";
import SearchIcon from "@mui/icons-material/Search";
import {
  debounceEventHandler,
  getFormattedStatsCount,
  isTruthy,
  openErrorNotification,
} from "../../../helpers/methods";
import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from "@mui/icons-material/LockReset";
import {
  CustomAppHeader,
  CustomInput,
  CustomTable,
} from "../../../global/components";
import UpdateUser from "./components/UpdateUser/UpdateUser";
import { userTableHeader } from "./UserTypeAndValidation";
import strings from "../../../global/constants/StringConstants";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import notifiers from "../../../global/constants/NotificationConstants";
import { useTitle } from "../../../utils/UseTitle";

import {
  getRelativeFontSize,
  primaryHeadingColor,
  boldFont,
} from "../../../utils/styles";
import { fetchUserDataHandler, searchUser } from "./service/user.service";
import { store } from "../../../utils/store";
import ChangePassword from "./components/ChangePassword/ChangePassword";

const Users = () => {
  useTitle(strings.UsersTitle);
  const classes = usersStyles;
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [addUserDialogHandler, setAddUserDialogHandler] = useState(false);
  const [changePasswordDialogHandler, setChangePasswordDialogHandler] =
    useState(false);
  const [updateUserDialogHandler, setUpdateUserDialogHandler] = useState(false);
  const [userDataSource, setUserDataSource] = useState<UserData[]>([]);
  const [searchCampaigner, setSearchCampaigner] = useState<string>("");
  const [roles, setRoles] = useState([]);
  const [count, setCount] = useState(1);
  const [selectedRowData, setSelectedRowData] = useState<RowData>({
    emailId: "",
    assignBy: "",
    allowedEmailCount: "",
    title: "",
  });
  const [selectedUserRowData, setSelectedUserRowData] = useState<any>({});
  const [selectedEmailData, setSelectedEmailData] = useState<any>({
    email: "",
  });

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [perPageData, setPerPageData] = useState(10);
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
  const [activeCampaigner, setActiveCampaigner] = useState<any>([]);
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  useEffect(() => {
    if (searchCampaigner === "") {
      setPageNumber(1);
      setSearchPageNumber(1);
      setPerPageData(10);
    }
  }, [searchCampaigner, searchPageNumber]);

  useEffect(() => {
    if (searchCampaigner) {
      getSearchData();
    } else {
      getUsersDetailTable();
    }
  }, [searchCampaigner, pageNumber, perPageData, searchPageNumber]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageNumber(newPage);
  };
  const handlePerPageData = (event: any) => {
    setPageNumber(1);
    setSearchPageNumber(1);
    setPerPageData(event.target.value);
  };

  const tableDataShowHandler = (usersData: any) => {
    const source = usersData.map((usersData: any, index: number) => {
      return {
        email: (
          <Typography key={usersData._id} sx={classes.rowColor}>
            {usersData.email}
          </Typography>
        ),
        firstName: usersData?.firstName,
        mobileNumber: usersData?.mobileNumber,
        createdBy: usersData?.createdBy,
        roleId: usersData?.roleId,
        status: (
          <Chip
            label={usersData.status}
            sx={{
              backgroundColor: usersData.status === "Active" ? "green" : "red",
              color: "white",
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%": {
                  transform: "scale(1)",
                  opacity: 1,
                },
                "50%": {
                  transform: "scale(1.05)",
                  opacity: 0.75,
                },
                "100%": {
                  transform: "scale(1)",
                  opacity: 1,
                },
              },
            }}
            variant="filled"
          />
        ),
        action: (
          <>
            <Tooltip title="Change Password">
              <LockResetIcon
                htmlColor={"#4b14c4"}
                style={{ margin: "0px 8px -7px 0px", cursor: "pointer" }}
                onClick={() => {
                  setChangePasswordModal(true);
                  setSelectedEmailData(usersData.email);
                }}
              />
            </Tooltip>
            <Tooltip
              title="Edit"
              onClick={() => {
                editUser(usersData);
              }}
            >
              <EditIcon
                htmlColor={"#4b14c4"}
                style={{ margin: "0px 8px -7px 0px", cursor: "pointer" }}
              />
            </Tooltip>
          </>
        ),
      };
    });
    setUserDataSource([...source]);
  };

  const editUser = React.useCallback(
    (rowdata: any) => {
      setAddUserDialogHandler(true);
      setSelectedUserRowData(rowdata);
      setEdit(true);
    },
    [edit]
  );

  const getUsersDetailTable = async () => {
    try {
      setIsLoading(true);
      const res = await fetchUserDataHandler({
        input: {
          page: pageNumber,
          limit: perPageData,
        },
      });
      tableDataShowHandler(res?.userListAll?.data);
      setCount(res?.userListAll?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
      setIsLoading(false);
    }
  };

  const getSearchData = async () => {
    try {
      setIsLoading(true);
      const res = await searchUser({
        input: {
          search: searchCampaigner,
          page: pageNumber,
          limit: perPageData,
        },
      });
      tableDataShowHandler(res?.searchUsers?.data);
      setCount(res?.searchUsers?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      setSearchCampaigner(SearchEvent.target.value.replace(/\s/g, ""));
      setPageNumber(1);
      setPerPageData(10);
    } else {
      setSearchCampaigner("");
    }
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search user ..."
        id="users_search_field"
        onChange={debounceEventHandler(
          handleSearchOnChange,
          strings.SEARCH_TIME_OUT
        )}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  };

  const addUserButton = () => {
    return (
      <CustomButton
        id="users_add_button"
        label={"Add User"}
        onClick={() => setAddUserDialogHandler(true)}
        customClasses={{
          width: "150px",
        }}
      />
    );
  };

  const addUserDialogBox = () => {
    return (
      <AddUser
        openAddUserDialog={addUserDialogHandler}
        handleCloseAddUserDialog={closeAddUserDialogHandler}
        managerMail={activeCampaigner}
        roles={roles}
        tableData={getUsersDetailTable}
        selectedUserRowData={selectedUserRowData}
        isLoading={isLoading}
        edit={edit}
        setEdit={setEdit}
      />
    );
  };

  const changePasswordDialogBox = () => {
    return (
      <ChangePassword
        openChangePasswordDialog={changePasswordModal}
        handleCloseChangePasswordDialog={setChangePasswordModal}
        tableData={selectedEmailData}
        isLoading={isLoading}
      />
    );
  };

  const closeAddUserDialogHandler = () => {
    setAddUserDialogHandler(false);
    setSelectedUserRowData(null);
  };

  const updateUserDialogBox = () => {
    return (
      <UpdateUser
        updateUserDialogOpen={updateUserDialogHandler}
        handleUpdateDialogClose={updateDialogCloseHandler}
        selectedRowData={selectedRowData}
        managerMail={activeCampaigner}
        tableData={getUsersDetailTable}
        getSearchData={getSearchData}
        searchCampaigner={searchCampaigner}
      />
    );
  };

  const updateDialogCloseHandler = () => {
    setUpdateUserDialogHandler(false);
  };

  const handleSearchChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setSearchPageNumber(newPage);
  };
  const handleDownload = async () => {};

  const campaignerTable = () => {
    return (
      <Box id="users_display_table" sx={classes.campaignerTable}>
        <CustomTable
          headers={userTableHeader}
          rows={userDataSource}
          paginationCount={count}
          // handleRowClick={updateUserDetails}
          handlePageChange={
            searchCampaigner ? handleSearchChangePage : handleChangePage
          }
          pageNumber={searchCampaigner ? searchPageNumber : pageNumber}
          setPage={searchCampaigner ? setSearchPageNumber : setPageNumber}
          isLoading={isLoading}
          handlePerPageData={handlePerPageData}
          perPageData={perPageData}
          rowsPerPage={perPageData}
          isExportCSV={false}
          onClickExportCSV={handleDownload}
        />
      </Box>
    );
  };

  const getUser = () => (
    <Box>
      <Stack
        px={4}
        pt={2}
        direction={{ lg: "row", xs: "column" }}
        justifyContent="space-between"
        alignItems={{ lg: "center" }}
      >
        <Typography
          sx={{
            fontSize: getRelativeFontSize(6),
            ...boldFont,
            color: primaryHeadingColor,
          }}
        >
          Users
        </Typography>

        <Stack
          direction={{ sm: "row", xs: "column" }}
          alignItems={{ sm: "center" }}
          spacing={1}
        >
          {getSearchBar()}
          {addUserButton()}
        </Stack>
      </Stack>

      <Box
        sx={{
          minWidth: "300px",
          overflow: "auto",
          padding: "30px",
        }}
      >
        {campaignerTable()}
        {addUserDialogBox()}
        {updateUserDialogBox()}
        {changePasswordDialogBox()}
      </Box>
      <CustomLoader isLoading={isLoading} />
    </Box>
  );

  return getUser();
};

export default Users;
