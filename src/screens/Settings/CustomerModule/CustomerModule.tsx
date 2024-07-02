import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Grid,
  InputAdornment,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  CustomButton,
  CustomInput,
  CustomTable,
} from "../../../global/components";
import IndustryStyles from "./CustomerModule.styles";
import {
  checkExitsCustomerModule,
  createModule,
  fetchTableHandler,
  searchTableHandler,
} from "./service/Customer.service";
import {
  debounceEventHandler,
  openErrorNotification,
  openSuccessNotification,
} from "../../../helpers/methods";
import {
  customerModuleInsertField,
  customerModuleTableHeader,
  customerModuleValidation,
} from "./CustomerIndustryHelpers";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import AddCustomerModule from "./component/AddCustomerModule";

const CustomerModule = () => {
  const classes = IndustryStyles;
  const theme = useTheme();
  const [customerModuleFormData, setCustomerModuleFormData] = useState<any>(
    customerModuleInsertField()
  );
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [perPageData, setPerPageData] = useState(10);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setPageNumber(1);
  }, [searchText, perPageData]);

  useEffect(() => {
    if (searchText) {
      searchDataHandler();
    } else {
      fetchTableDataHandler();
    }
  }, [pageNumber, perPageData, searchText]);

  const handlePerPageData = (event: any) => {
    setPageNumber(1);
    setPerPageData(event.target.value);
  };

  const createCustomerModule = async () => {
    try {
      if (handleValidation()) {
        const name = customerModuleFormData.name.value;
        const code = customerModuleFormData.code.value;
        const description = customerModuleFormData.description.value;
        const res = await createModule({ input: { name, code, description } });
        setCustomerModuleFormData(customerModuleInsertField());
        openSuccessNotification(res?.createCustomerModule?.message);
        await fetchTableDataHandler();
        setDialogOpen(false);
      }
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const fetchTableDataHandler = async () => {
    try {
      setIsLoading(true);
      const res = await fetchTableHandler({
        input: { page: pageNumber, limit: perPageData },
      });
      if (res && res.customerModuleListAll) {
        setTableData(res.customerModuleListAll.data || []);
        setCount(res.customerModuleListAll.paginatorInfo?.count || 0);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error: any) {
      openErrorNotification(error.message);
    } finally {
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
      setTableData(res?.searchCustomerModule?.data);
      setCount(res?.searchCustomerModule?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const checkExitsCustomerModuleHandler = async () => {
    try {
      const res = await checkExitsCustomerModule({
        input: {
          name: customerModuleFormData.name.value,
          code: customerModuleFormData.code.value,
        },
      });
      if (res?.checkCustomerModuleExistsRecord?.success === 1) {
        openErrorNotification(res.checkCustomerModuleExistsRecord.message);
      }
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<any>) => {
    setCustomerModuleFormData({
      ...customerModuleFormData,
      [event.target.name]: {
        value: event.target.value,
        error: "",
      },
    });
  };

  const handleValidation = () => {
    const { isValid, errors }: { isValid: boolean; errors: any } =
      customerModuleValidation(customerModuleFormData);
    setCustomerModuleFormData({ ...errors });
    return isValid;
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

  const searchBarRole = () => {
    return (
      <CustomInput
        id="role_mgmt_search_field"
        placeHolder="Search Module Name"
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

  const getAddCustomerModuleBtn = () => {
    return (
      <CustomButton
        id="add_module_button"
        label="Create Module"
        onClick={() => setDialogOpen(true)}
      />
    );
  };

  const rolesTableRender = () => {
    return (
      <>
        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
          spacing={1}
          pt={2}
          px={3}
        >
          {searchBarRole()}
          {getAddCustomerModuleBtn()}
        </Stack>
        <Box
          sx={{
            minWidth: "300px",
            overflow: "auto",
            padding: "30px",
          }}
        >
          <CustomTable
            headers={customerModuleTableHeader}
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
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        height: "100%",
      }}
    >
      <AddCustomerModule
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        customerModuleFormData={customerModuleFormData}
        modulesData={[]}
        onChangeHandler={onChangeHandler}
        handleModuleChange={() => {}}
        checkExitsRoleHandler={checkExitsCustomerModuleHandler}
        handleFileChange={() => {}}
        handleSave={createCustomerModule}
        isLoading={isLoading}
        MenuProps={{}}
        classes={classes}
      />
      {rolesTableRender()}
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default CustomerModule;
