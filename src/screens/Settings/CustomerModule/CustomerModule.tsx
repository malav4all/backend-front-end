import React, { ChangeEvent, useEffect, useState, useCallback } from "react";
import {
  Box,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  CustomAppHeader,
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
  updateCustomerModule,
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
import EditIcon from "@mui/icons-material/Edit";
import { hasAccessTo } from "../../../utils/AuthorizationManager";
import strings from "../../../global/constants/StringConstants";

interface CustomerModuleFormData {
  name: { value: string; error: string };
  code: { value: string; error: string };
  description: { value: string; error: string };
  id?: { value: string; error: string };
}

interface TableData {
  name: string;
  code: string;
  description: string;
  action: JSX.Element;
}

interface RowData {
  name: string;
  code: string;
  description: string;
  id: string;
}

const CustomerModule: React.FC = () => {
  const classes = IndustryStyles;
  const theme = useTheme();

  const [customerModuleFormData, setCustomerModuleFormData] =
    useState<CustomerModuleFormData>(customerModuleInsertField());
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [perPageData, setPerPageData] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    setPageNumber(1);
  }, [searchText, perPageData]);

  useEffect(() => {
    searchText ? searchDataHandler() : fetchTableDataHandler();
  }, [pageNumber, perPageData, searchText]);

  const handlePerPageDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPageNumber(1);
    setPerPageData(Number(event.target.value));
  };

  const createOrUpdateCustomerModule = async () => {
    if (!handleValidation()) return;

    const payload: Record<string, string> = {
      name: customerModuleFormData.name.value,
      code: customerModuleFormData.code.value,
      description: customerModuleFormData.description.value,
    };

    if (edit && customerModuleFormData.id) {
      payload._id = customerModuleFormData.id.value;
    }

    try {
      const res = edit
        ? await updateCustomerModule({ input: payload })
        : await createModule({ input: payload });

      openSuccessNotification(
        res?.[edit ? "updateCustomerModule" : "createCustomerModule"]?.message
      );
      resetForm();
      fetchTableDataHandler();
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const resetForm = () => {
    setCustomerModuleFormData(customerModuleInsertField());
    setEdit(false);
    setDialogOpen(false);
  };

  const editModule = useCallback((rowdata: RowData) => {
    setCustomerModuleFormData(customerModuleInsertField(rowdata));
    setEdit(true);
    setDialogOpen(true);
  }, []);

  const fetchTableDataHandler = async () => {
    setIsLoading(true);
    try {
      const res = await fetchTableHandler({
        input: { page: pageNumber, limit: perPageData },
      });

      if (res?.customerModuleListAll) {
        const finalData: TableData[] = res.customerModuleListAll.data.map(
          (item: RowData) => ({
            name: item.name,
            code: item.code,
            description: item.description,
            action: (
              <>
                {hasAccessTo(strings.SETTINGS, strings.UPDATE) && (
                  <Tooltip
                    title="Edit"
                    key={item.id}
                    onClick={() => editModule(item)}
                  >
                    <EditIcon
                      htmlColor={"#7C58CB"}
                      style={{ margin: "0px 8px -7px 0px", cursor: "pointer" }}
                    />
                  </Tooltip>
                )}
              </>
            ),
          })
        );
        setTableData(finalData);
        setCount(res.customerModuleListAll.paginatorInfo?.count || 0);
      }
    } catch (error: any) {
      openErrorNotification(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const searchDataHandler = async () => {
    setIsLoading(true);
    try {
      const res = await searchTableHandler({
        input: {
          search: searchText,
          page: pageNumber,
          limit: perPageData,
        },
      });
      setTableData(res?.searchCustomerModule?.data || []);
      setCount(res?.searchCustomerModule?.paginatorInfo?.count || 0);
    } catch (error: any) {
      openErrorNotification(error.message);
    } finally {
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

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomerModuleFormData((prevState: CustomerModuleFormData) => ({
      ...prevState,
      [event.target.name]: {
        value: event.target.value,
        error: "",
      },
    }));
  };

  const handleValidation = (): boolean => {
    const { isValid, errors } = customerModuleValidation(
      customerModuleFormData
    );
    setCustomerModuleFormData(errors);
    return isValid;
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageNumber(newPage);
  };

  const handleSearchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value.trim());
    setPerPageData(10);
  };

  const renderSearchBar = () => (
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

  const renderAddCustomerModuleButton = () => (
    <CustomButton
      id="add_module_button"
      label="Create Module"
      onClick={() => setDialogOpen(true)}
    />
  );

  const renderRolesTable = () => (
    <>
      <Box sx={{ minWidth: "300px", overflow: "auto", padding: "30px" }}>
        <CustomTable
          headers={customerModuleTableHeader}
          rows={tableData}
          paginationCount={count}
          handlePageChange={handleChangePage}
          pageNumber={pageNumber}
          handlePerPageData={handlePerPageDataChange}
          rowsPerPage={perPageData}
          perPageData={perPageData}
          setPage={setPageNumber}
        />
      </Box>
    </>
  );

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        height: "100%",
        paddingTop: "3.5rem",
      }}
    >
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
            Settings / Module
          </Typography>

          <Stack
            direction={{ sm: "row", xs: "column" }}
            alignItems={{ sm: "center" }}
            spacing={1}
          >
            {renderSearchBar()}
            {hasAccessTo(strings.SETTINGS, strings.ADD) &&
              renderAddCustomerModuleButton()}
          </Stack>
        </Stack>
      </CustomAppHeader>

      <AddCustomerModule
        open={dialogOpen}
        handleClose={resetForm}
        customerModuleFormData={customerModuleFormData}
        modulesData={[]}
        onChangeHandler={(e) => handleFormChange}
        handleModuleChange={() => {}}
        checkExitsRoleHandler={checkExitsCustomerModuleHandler}
        handleFileChange={() => {}}
        handleSave={createOrUpdateCustomerModule}
        isLoading={isLoading}
        MenuProps={{}}
        classes={classes}
        edit={edit}
      />
      {renderRolesTable()}
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default CustomerModule;
