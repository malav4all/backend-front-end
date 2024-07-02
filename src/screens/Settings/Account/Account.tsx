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
  headerColor,
  primaryHeadingColor,
  theme,
} from "../../../utils/styles";
import EditIcon from "@mui/icons-material/Edit";
import { accountTableHeader } from "./Account.helper";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";

const Account = () => {
  const theme = useTheme();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [perPageData, setPerPageData] = useState(10);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState<string>("");
  const [addUserDialogHandler, setAddUserDialogHandler] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any>();
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setPageNumber(1);
  }, [searchText, perPageData]);

  useEffect(() => {
    if (searchText) {
      searchDataHandler();
    } else {
      fetchTableAccount();
    }
  }, [pageNumber, perPageData, searchText]);

  const fetchTableAccount = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAccountTableHandler({
        input: { page: pageNumber, limit: perPageData },
      });
      const finalData = res?.fetchAccountModuleList?.data?.map((item: any) => {
        return {
          accountName: item.accountName,
          accountContactName: item.accountContactName,
          accountContactEmail: item.accountContactEmail,
          accountAddress: item.accountAddress,
          accountContactMobile: item.accountContactMobile,
          accountType: item.industryType.name,
          action: (
            <>
              <Tooltip
                title="Edit"
                onClick={() => {
                  setAddUserDialogHandler(true);
                  setSelectedRowData(item);
                  setEdit(true);
                }}
              >
                <EditIcon
                  htmlColor={headerColor}
                  style={{ margin: "0px 8px -7px 17px" }}
                />
              </Tooltip>
            </>
          ),
        };
      });
      setTableData(finalData);
      setCount(res?.fetchAccountModuleList?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const searchDataHandler = async () => {
    try {
      setIsLoading(true);
      const res = await searchTableHandler({
        input: {
          search: searchText,
          page: pageNumber,
          limit: perPageData,
        },
      });
      setTableData(res?.searchAccount?.data);
      setCount(res?.searchAccount?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageNumber(newPage);
  };

  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      setSearchText(SearchEvent.target.value.trim());
      setPerPageData(10);
    } else {
      setSearchText("");
    }
  };

  const closeAddUserDialogHandler = () => {
    setAddUserDialogHandler(false);
    setEdit(false);
  };

  const addAccountDialogBox = () => {
    return (
      <AddAccountModal
        openAddUserDialog={addUserDialogHandler}
        handleCloseAddUserDialog={closeAddUserDialogHandler}
        tableData={fetchTableAccount}
        selectedRowData={selectedRowData}
        edit={edit}
      />
    );
  };

  const addUserButton = () => {
    return (
      <CustomButton
        id="users_add_button"
        label={"Add Account"}
        onClick={() => setAddUserDialogHandler(true)}
        customClasses={{
          width: "150px",
        }}
      />
    );
  };

  const searchBarRole = () => {
    return (
      <CustomInput
        id="role_mgmt_search_field"
        placeHolder="Search Account Name"
        name="Role"
        onChange={debounceEventHandler(handleSearchOnChange, 2000)}
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

  const handlePerPageData = (event: any) => {
    setPageNumber(1);
    setPerPageData(event.target.value);
  };

  const rolesTableRender = () => {
    return (
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
          ></Typography>

          <Stack
            direction={{ sm: "row", xs: "column" }}
            alignItems={{ sm: "center" }}
            spacing={1}
          >
            {searchBarRole()}
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
          <CustomTable
            headers={accountTableHeader}
            rows={tableData}
            paginationCount={count}
            handlePageChange={handleChangePage}
            pageNumber={pageNumber}
            handlePerPageData={handlePerPageData}
            rowsPerPage={perPageData}
            perPageData={perPageData}
            setPage={setPageNumber}
          />
        </Box>
      </>
    );
  };

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      lg={12}
      xl={12}
      sx={{
        padding: theme.spacing(2),
        paddingTop: "2px",
        marginTop: "2px",
        width: "100%",
        margin: "auto",
        backgroundColor: theme.palette.background.paper,
        height: "130%",
      }}
    >
      {rolesTableRender()}
      {addAccountDialogBox()}
      <CustomLoader isLoading={isLoading} />
    </Grid>
  );
};

export default Account;
