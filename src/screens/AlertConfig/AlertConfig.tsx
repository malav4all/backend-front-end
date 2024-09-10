import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Chip,
  Grid,
  InputAdornment,
  Stack,
  Switch,
  Tooltip,
  Typography,
  useTheme,
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
import { getRelativeFontSize, boldFont, headerColor } from "../../utils/styles";
import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
} from "../../helpers/methods";
import strings from "../../global/constants/StringConstants";
import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import { UserData, alertConfigTableHeader } from "./AlertConfig.helpers";
import AddFilter from "./Component/AddFilter";
import notifiers from "../../global/constants/NotificationConstants";
import { listAlertRecord, searchAlertRecord } from "./service/alert.service";
import history from "../../utils/history";
import { store } from "../../utils/store";
import { hasAccessTo } from "../../utils/AuthorizationManager";
import StringConstants from "../../global/constants/StringConstants";

const AlertConfig = () => {
  const classes = alertConfigStyles;
  const theme = useTheme();
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
    if (searchAlertConfig) {
      searchDetailTable();
    } else getUsersDetailTable();
  }, [searchAlertConfig, pageNumber, rowsPerPage]);

  const getHeader = () => {
    return (
      <Box>
        <Typography
          sx={{ ...classes.mainCardHeading, color: theme.palette.text.primary }}
        >
          Alerts
        </Typography>
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

  const searchDetailTable = async () => {
    try {
      setIsLoading(true);
      const res = await searchAlertRecord({
        input: {
          accountId: store.getState().auth.tenantId,
          search: searchAlertConfig,
          page: pageNumber,
          limit: perPageData,
        },
      });
      tableDataShowHandler(res?.searchAlert?.data);
      setCount(res?.searchAlert?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
      setIsLoading(false);
    }
  };

  const getUsersDetailTable = async () => {
    try {
      setIsLoading(true);
      const res = await listAlertRecord({
        input: {
          accountId: store.getState().auth.tenantId,
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
        label={"Add Alerts"}
        onClick={() => setAddFilterDialogHandler(true)}
      />
    );
  };

  const closeAddFilterDialogHandler = () => {
    setAddFilterDialogHandler(false);
    // setSelectedUserRowData(null);
  };
  const getRedirectionUrl = (_id: any) => {
    return history.push(`/device-group/view/${_id}`);
  };

  const tableDataShowHandler = (usersData: any) => {
    const source = usersData.map((usersData: any, index: number) => {
      return {
        key: index,
        name: usersData?.alertName,
        deviceGroupName: (
          <>
            <Tooltip
              arrow
              title={""}
              placement="top"

              // onClick={() => {
              //   getRedirectionUrl(
              //     usersData?.alertConfig?.alertImeiGroup?.deviceGroupId
              //   );
              // }}
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
                {usersData?.alertConfig?.alertImeiGroup?.deviceGroupName}
              </Typography>
            </Tooltip>
          </>
        ),
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
                    color: "#ffffff",
                    backgroundColor: headerColor,
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
            sx={{
              "& .MuiSwitch-switchBase": {
                color: "#B0B0B0", // Grey color when off
              },
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#42A876", // Green color when on
              },
              "& .MuiSwitch-switchBase + .MuiSwitch-track": {
                backgroundColor: "#B0B0B0", // Grey track color when off
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#42A876",
              },
            }}
            disabled
          />
        ),
        createdBy: usersData?.createdBy,
        action: (
          <>
            {hasAccessTo(strings.ALERTS, strings.UPDATE) && (
              <Tooltip
                arrow
                title="Edit"
                onClick={() => {
                  editUser(usersData);
                }}
              >
                <EditIcon
                  htmlColor={"#7C58CB"}
                  style={{ margin: "0px 8px -7px 0px", cursor: "pointer" }}
                />
              </Tooltip>
            )}
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
          handlePageChange={handleChangePage}
          pageNumber={pageNumber}
          setPage={setPageNumber}
          isLoading={isLoading}
          handlePerPageData={handlePerPageData}
          perPageData={perPageData}
          isExportCSV={false}
        />
      </Box>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        height: "100%",
        paddingTop: "5.5rem",
      }}
    >
      <Grid container spacing={2} direction="column">
        <Grid item>
          <CustomAppHeader
            className={{
              ...classes.headerBackgroundColor,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Stack
              px={4}
              direction={{ lg: "row", xs: "column" }}
              justifyContent="space-between"
              alignItems={{ lg: "center" }}
            >
              <Typography
                sx={{
                  fontSize: getRelativeFontSize(6),
                  ...boldFont,
                  color: theme.palette.text.primary,
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
                {hasAccessTo(StringConstants.ALERTS, StringConstants.ADD) &&
                  addFilterButton()}
              </Stack>
            </Stack>
          </CustomAppHeader>
        </Grid>

        <Grid item padding={2}>
          <Box
            sx={{
              minWidth: "300px",
              overflow: "auto",
              paddingLeft: "30px",
              paddingRight: "10px",
            }}
          >
            {campaignerTable()}
            {addFilterDialogBox()}
          </Box>
        </Grid>
      </Grid>
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default AlertConfig;
