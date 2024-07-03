import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Chip,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import usersStyles from "./Users.styles";
import CustomButton from "../../../global/components/CustomButton/CustomButton";
import AddUser from "./components/AddUser/AddUser";
import { RowData, UserData } from "../../../models/interfaces";
import SearchIcon from "@mui/icons-material/Search";
import { PiPencilSimpleBold } from "react-icons/pi";
import {
  debounceEventHandler,
  getFormattedStatsCount,
  isTruthy,
  openErrorNotification,
} from "../../../helpers/methods";
import { MdPassword } from "react-icons/md";
import {
  CustomDialog,
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
  regularFont,
  headerColor,
} from "../../../utils/styles";
import { fetchUserDataHandler, searchUser } from "./service/user.service";
import { store } from "../../../utils/store";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import uploadUser from "../../../assets/images/uploadUser.svg";
import history from "../../../utils/history";

const Users = () => {
  const theme = useTheme();
  useTitle(strings.UsersTitle);
  const classes = usersStyles;
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [addUserDialogHandler, setAddUserDialogHandler] = useState(false);
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
  const [imeiListDialogHandler, setImeiListDialogHandler] =
    useState<any>(false);
  const [selectedImeiData, setSelectedImeiData] = useState<any>([]);
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

  const getRedirectionUrl = (_id: any) => {
    return history.push(`/device-group/view/${_id}`);
  };

  const tableDataShowHandler = (usersData: any) => {
    const source = usersData?.map((usersData: any, index: number) => {
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
        // roleId: usersData?.roleId?.name,
        deviceGroupName: (
          <>
            <Tooltip
              title="Show Imeis"
              placement="top"
              arrow
              onClick={() => {
                getRedirectionUrl(usersData?.deviceGroup?._id);
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  display: "inline-block",
                  color: "#5F22E2",
                  fontSize: "13px",
                  "&:hover": {
                    borderBottom: "1px solid #5F22E2",
                  },
                }}
              >
                {usersData?.deviceGroup?.deviceGroupName}
              </Typography>
            </Tooltip>
          </>
        ),
        status: (
          <Chip
            label={usersData.status}
            sx={{
              backgroundColor: usersData.status === "Active" ? "green" : "grey",
              color: usersData.status === "Active" ? "white" : "white",
              borderRadius: "5px",
              border:
                usersData.status === "Active"
                  ? "1px solid #37b071"
                  : "1px solid white",
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%": {
                  transform: "scale(1)",
                  opacity: 1,
                },
                "50%": {
                  transform: "scale(1.1)",
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
              <MdPassword
                color={headerColor}
                style={{
                  margin: "0px 20px -7px 0px",
                  cursor: "pointer",
                  fontSize: "24px",
                }}
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
              <PiPencilSimpleBold
                style={{
                  margin: "0px 8px -7px 0px",
                  cursor: "pointer",
                  color: headerColor,
                  fontSize: "20px",
                }}
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

  const showImeis = (imeiData: any) => {
    setImeiListDialogHandler(true);
    setSelectedImeiData(imeiData.deviceGroup.imeiData);
  };
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
        label="Create User"
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

  const imeiDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>{"IMEI LIST"}</Typography>
      </Box>
    );
  };

  const addUserDialogBody = () => {
    return (
      <Grid container spacing={2} sx={{ padding: "1rem" }}>
        <Grid item xs={12} sm={6} md={12} lg={12} xl={12}>
          <TableContainer component={Paper}>
            <Table aria-label="IMEI Table">
              <TableHead>
                <TableRow>
                  <TableCell>S No.</TableCell>
                  <TableCell>IMEIs</TableCell>
                  <TableCell align="right">Label Name</TableCell>
                  <TableCell align="right">Box Set</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedImeiData?.map((imei: any, index: number) => (
                  <TableRow key={imei?.imei}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{imei?.imei}</TableCell>
                    <TableCell align="right">{imei?.labelName}</TableCell>
                    <TableCell align="right">{imei?.boxSet}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  };

  const showImeiHeaderImg = () => {
    return (
      <Box display={"flex"}>
        <img src={uploadUser} alt="Add user not found!" />
      </Box>
    );
  };

  const showImesListDialogBox = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <CustomDialog
          isDialogOpen={imeiListDialogHandler}
          closable
          closeButtonVisibility
          handleDialogClose={closeImeiListDialogHandler}
          dialogHeaderContent={showImeiHeaderImg()}
          dialogTitleContent={imeiDialogTitle()}
          dialogBodyContent={addUserDialogBody()}
          // dialogFooterContent={addUserDialogFooter()}
          width={"700px"}
          fullScreen={false}
        />
      </Grid>
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

  const closeImeiListDialogHandler = () => {
    setImeiListDialogHandler(false);
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
          // onClickExportCSV={handleDownload}
        />
      </Box>
    );
  };

  const getUser = () => (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        height: "100%",
      }}
    >
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
            ...regularFont,
            color: primaryHeadingColor,
          }}
        >
          
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
        {showImesListDialogBox()}
        {updateUserDialogBox()}
        {changePasswordDialogBox()}
      </Box>
      <CustomLoader isLoading={isLoading} />
    </Box>
  );

  return getUser();
};

export default Users;
