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
import { userTableHeader } from "./UserTypeAndValidation";

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
    const source = usersData.map((userData: any, index: number) => {
      return {
        user: (
          <Typography key={index} sx={classes.rowColor}>
            {userData.user}
          </Typography>
        ),
        imei: userData.imei,
        journey: userData.journey,
        action: (
          <button>
            Download
          </button>
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

      const dummyData = [
        {
          imei: "123456789",
          journey: "Lorem Ipsum",
          user: "John Doe",
          action: <button>Download</button>,
        },
        {
          imei: "987654321",
          journey: "Dolor Sit Amet",
          user: "Jane Smith",
          action: <button>Download</button>,
        },
        {
          imei: "555555555",
          journey: "Consectetur adipiscing elit",
          user: "Alice Johnson",
          action: <button>Download</button>,
        },
        {
          imei: "777777777",
          journey: "Sed do eiusmod tempor incididunt",
          user: "Bob Brown",
          action: <button>Download</button>,
        },
        {
          imei: "999999999",
          journey: "Ut labore et dolore magna aliqua",
          user: "Eve White",
          action: <button>Download</button>,
        },
      ];

      // Simulate a delay to mimic the network request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Set dummy data to state variables
      tableDataShowHandler(dummyData);
      setCount(dummyData.length);

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
        label={"Filter Report"}
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
          Alert Report
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
