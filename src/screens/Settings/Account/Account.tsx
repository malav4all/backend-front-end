import {
  Box,
  Grid,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  CustomAppHeader,
  CustomButton,
  CustomInput,
  CustomTable,
} from "../../../global/components";
import {
  fetchAccountTableHandler,
  searchTableHandler,
} from "./service/account.service";
import {
  debounceEventHandler,
  openErrorNotification,
} from "../../../helpers/methods";
import AddAccountModal from "./Component/AddAccountModal";
import {
  getRelativeFontSize,
  primaryHeadingColor,
} from "../../../utils/styles";
import EditIcon from "@mui/icons-material/Edit";
import { accountTableHeader } from "./Account.helper";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import AccountStyles from "./Account.styles";
import { hasAccessTo } from "../../../utils/AuthorizationManager";
import strings from "../../../global/constants/StringConstants";

interface AccountData {
  accountId: string;
  accountName: string;
  accountContactName: string;
  accountContactEmail: string;
  accountAddress: string;
  accountContactMobile: string;
  industryType: { name: string };
  deviceOnboardingIMEINumberCount?: number;
}

interface TableData {
  accountId: string;
  accountName: string;
  accountContactName: string;
  accountContactEmail: string;
  accountAddress: string;
  accountContactMobile: string;
  accountType: string;
  action: JSX.Element;
}

interface FetchAccountResponse {
  fetchAccountModuleList: {
    data: AccountData[];
    paginatorInfo: { count: number };
  };
}

const Account: React.FC = () => {
  const theme = useTheme();
  const classes = AccountStyles;
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalItemCount, setTotalItemCount] = useState<number>(0);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddAccountDialogOpen, setIsAddAccountDialogOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPageNumber(1);
  }, [searchQuery, rowsPerPage]);

  useEffect(() => {
    if (searchQuery) {
      handleSearchData();
    } else {
      fetchAccountTable();
    }
  }, [pageNumber, rowsPerPage, searchQuery]);

  const tableInsideDataRender = (res: any) => {
    const formattedTableData = res?.map((item: AccountData) => ({
      accountId: item.accountId,
      accountName: item.accountName,
      accountContactName: item.accountContactName,
      accountContactEmail: item.accountContactEmail,
      accountAddress: item.accountAddress,
      accountContactMobile: item.accountContactMobile,
      accountType: item.industryType.name,
      deviceOnboardingIMEINumberCount: item.deviceOnboardingIMEINumberCount,
      action: (
        <>
          {hasAccessTo(strings.SETTINGS, strings.UPDATE) && (
            <Tooltip
              arrow
              title="Edit"
              onClick={() => {
                setIsAddAccountDialogOpen(true);
                setSelectedRowData(item);
                setIsEditMode(true);
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
    }));
    return formattedTableData;
  };

  const fetchAccountTable = async () => {
    try {
      setIsLoading(true);
      const res: FetchAccountResponse = await fetchAccountTableHandler({
        input: { page: pageNumber, limit: rowsPerPage },
      });

      if (res?.fetchAccountModuleList?.data) {
        const finalData = tableInsideDataRender(
          res?.fetchAccountModuleList?.data
        );
        setTableData(finalData);
        setTotalItemCount(res.fetchAccountModuleList.paginatorInfo.count);
      }
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const handleSearchData = async () => {
    try {
      setIsLoading(true);
      const res = await searchTableHandler({
        input: {
          search: searchQuery,
          page: pageNumber,
          limit: rowsPerPage,
        },
      });
      const finalData = tableInsideDataRender(res?.searchAccount?.data);
      setTableData(finalData);
      setTotalItemCount(res?.searchAccount?.paginatorInfo?.count || 0);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageNumber(newPage);
  };

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setSearchQuery(event.target.value.trim());
      setRowsPerPage(10);
    } else {
      setSearchQuery("");
    }
  };

  const closeAddAccountDialog = () => {
    setIsAddAccountDialogOpen(false);
    setIsEditMode(false);
  };

  const renderAddAccountDialog = () => (
    <AddAccountModal
      openAddAccountDialog={isAddAccountDialogOpen}
      handleCloseAddAccountDialog={closeAddAccountDialog}
      tableData={fetchAccountTable}
      selectedRowData={selectedRowData}
      edit={isEditMode}
    />
  );

  const renderSettingsHeader = () => (
    <CustomAppHeader
      className={{
        ...classes.headerBackgroundColor,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Stack
        px={3}
        direction={{ lg: "row", xs: "column" }}
        justifyContent="space-between"
        alignItems={{ lg: "center" }}
      >
        <Typography
          style={{
            ...classes.settingsTitle,
            color: theme.palette.text.primary,
          }}
        >
          Settings / Account
        </Typography>

        <Stack
          direction={{ sm: "row", xs: "column" }}
          alignItems={{ sm: "center" }}
          spacing={1}
        >
          {renderSearchBar()}
          {hasAccessTo(strings.SETTINGS, strings.ADD) &&
            renderAddAccountButton()}
        </Stack>
      </Stack>
    </CustomAppHeader>
  );

  const renderAddAccountButton = () => (
    <CustomButton
      id="users_add_button"
      label={"Add Account"}
      onClick={() => setIsAddAccountDialogOpen(true)}
      customClasses={{
        width: "150px",
      }}
    />
  );

  const renderSearchBar = () => (
    <CustomInput
      id="role_mgmt_search_field"
      placeHolder="Search Account Name"
      name="Role"
      onChange={debounceEventHandler(handleSearchInputChange, 700)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPageNumber(1);
    setRowsPerPage(Number(event.target.value));
  };

  const renderAccountTable = () => (
    <>
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
            color: primaryHeadingColor,
            fontWeight: "bold",
          }}
        />
      </Stack>
      <Box
        sx={{
          minWidth: "300px",
          overflow: "auto",
          padding: "30px",
        }}
      >
        <CustomTable
          headers={accountTableHeader}
          rows={tableData}
          paginationCount={totalItemCount}
          handlePageChange={handlePageChange}
          pageNumber={pageNumber}
          handlePerPageData={handleRowsPerPageChange}
          rowsPerPage={rowsPerPage}
          perPageData={rowsPerPage}
          setPage={setPageNumber}
        />
      </Box>
    </>
  );

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      lg={12}
      xl={12}
      sx={{
        marginTop: "2px",
        width: "100%",
        margin: "auto",
        backgroundColor: theme.palette.background.paper,
        height: "100vh",
        paddingTop: "3.5rem",
      }}
    >
      {renderSettingsHeader()}
      {renderAccountTable()}
      {renderAddAccountDialog()}
      <CustomLoader isLoading={isLoading} />
    </Grid>
  );
};

export default Account;
