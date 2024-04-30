import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Chip,
  FormControlLabel,
  Grid,
  InputAdornment,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  CustomAppHeader,
  CustomButton,
  CustomInput,
  CustomTable,
} from "../../global/components";
import alertConfigStyles from "./AlertConfig.styles";
import SearchIcon from "@mui/icons-material/Search";
import {
  getRelativeFontSize,
  primaryHeadingColor,
  boldFont,
} from "../../utils/styles";
import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
} from "../../helpers/methods";
import strings from "../../global/constants/StringConstants";

import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import { UserData, alertConfigTableHeader } from "./AlertConfig.helpers";
import LockResetIcon from "@mui/icons-material/LockReset";
import AddFilter from "./Component/AddFilter";
import { fetchUserDataHandler } from "../Settings/Users/service/user.service";
import notifiers from "../../global/constants/NotificationConstants";
import { listAlertRecord } from "./service/alert.service";

const AlertConfig = () => {
  const classes = alertConfigStyles;
  const [isLoading, setIsLoading] = useState(false);
  const [userDataSource, setUserDataSource] = useState<UserData[]>([]);
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
  const [perPageData, setPerPageData] = useState<Number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedAlertConfigRowData, setSelectedAlertConfigRowData] =
    useState<any>({});
  const [searchCampaigner, setSearchCampaigner] = useState<string>("");
  const [count, setCount] = useState(1);
  const [activeCampaigner, setActiveCampaigner] = useState<any>([]);
  const [searchAlertConfig, setSearchAlertConfig] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [addFilterDialogHandler, setAddFilterDialogHandler] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedUserRowData, setSelectedUserRowData] = useState<any>({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getUsersDetailTable();
  }, []);

  const getHeader = () => {
    return (
      <Box>
        <Typography sx={classes.mainCardHeading}>Alert Config</Typography>
      </Box>
    );
  };

  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      setSearchAlertConfig(SearchEvent.target.value.trim());
      setPage(1);
      setRowsPerPage(10);
    } else {
      setSearchAlertConfig("");
    }
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search here..."
        id="alertConfig_search_field"
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

  const getUsersDetailTable = async () => {
    try {
      setIsLoading(true);
      const res = await listAlertRecord({
        input: {
          page: pageNumber,
          limit: perPageData,
        },
      });
      tableDataShowHandler(res?.fetchAlert?.data);
      setCount(res?.fetchAlert?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
      setIsLoading(false);
    }
  };

  const addFilterButton = () => {
    return (
      <CustomButton
        id="users_add_button"
        label={"Add Filter"}
        onClick={() => setAddFilterDialogHandler(true)}
        customClasses={{
          width: "150px",
        }}
      />
    );
  };

  const closeAddFilterDialogHandler = () => {
    setAddFilterDialogHandler(false);
    // setSelectedUserRowData(null);
  };

  const tableDataShowHandler = (usersData: any) => {
    const source = usersData.map((usersData: any, index: number) => {
      return {
        key: index,
        name: usersData?.alertName,
        deviceGroupName:
          usersData?.alertConfig?.alertImeiGroup?.deviceGroupName,
        userSelectedImei: (
          <Box
            key={index}
            sx={{
              width: "100%",
              minWidth: "150px",
              display: "flex",
              flexDirection: "row",
              flex: "wrap",
            }}
          >
            {usersData?.alertConfig?.userSelectedImei?.map((item: any) => (
              <Box>
                <Chip
                  key={index}
                  label={item}
                  sx={{
                    marginLeft: "20px",
                    marginTop: "8px",
                    borderRadius: "5px",
                    fontSize: "15px",
                    backgroundColor: "#ECF9FF",
                  }}
                  variant="filled"
                />
              </Box>
            ))}
          </Box>
        ),
        mobileNo: usersData?.mobileNo,
        isAlertDisable: (
          <Switch
            checked={usersData?.isAlertDisable}
            color="warning"
            disabled
          />
        ),
        createdBy: usersData?.createdBy,
        action: (
          <>
            <Tooltip
              title="Edit"
              onClick={() => {
                editUser(usersData);
              }}
            >
              <EditIcon
                htmlColor={"#5F22E2"}
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
      setAddFilterDialogHandler(true);
      setSelectedAlertConfigRowData(rowdata);
      setEdit(true);
    },
    [edit]
  );

  const addFilterDialogBox = () => {
    return (
      <AddFilter
        openAddUserDialog={addFilterDialogHandler}
        handleCloseAddUserDialog={closeAddFilterDialogHandler}
        managerMail={activeCampaigner}
        roles={roles}
        tableData={getUsersDetailTable}
        selectedUserRowData={selectedAlertConfigRowData}
        isLoading={isLoading}
        edit={edit}
        setEdit={setEdit}
      />
    );
  };

  const handleSearchChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setSearchPageNumber(newPage);
  };

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

  const campaignerTable = () => {
    return (
      <Box id="users_display_table" sx={classes.campaignerTable}>
        <CustomTable
          headers={alertConfigTableHeader}
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
          // rowsPerPage={perPageData}
          isExportCSV={false}
          // onClickExportCSV={handleDownload}
        />
      </Box>
    );
  };

  return (
    <>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <CustomAppHeader
            className={{
              backgroundColor: "#f1edff",
              padding: "10px 20px 15px 18px",
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
                  ...boldFont,
                  color: primaryHeadingColor,
                }}
              >
                {getHeader()}
              </Typography>

              <Stack
                direction={{ sm: "row", xs: "column" }}
                alignItems={{ sm: "center" }}
                spacing={1}
              >
                {getSearchBar()}
              </Stack>
            </Stack>
          </CustomAppHeader>
        </Grid>

        <Grid item padding={2} sx={{ display: "flex", justifyContent: "end" }}>
          <Box>{addFilterButton()}</Box>
        </Grid>

        <Grid item padding={2}>
          <Box
            sx={{
              minWidth: "300px",
              overflow: "auto",
              padding: "30px",
            }}
          >
            {campaignerTable()}
            {addFilterDialogBox()}
          </Box>
        </Grid>
      </Grid>
      <CustomLoader isLoading={isLoading} />
    </>
  );
};

export default AlertConfig;