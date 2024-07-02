import {
  Box,
  Container,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  CustomButton,
  CustomInput,
  CustomTable,
  CustomDialog,
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
import AddCustomDialog from "./component/AddCustomerModule";

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

  const getProfileFooter = () => {
    return (
      <Box sx={classes.profileFooter}>
        <CustomButton
          id="profile_submit_button"
          customClasses={classes.saveBtnStyle}
          onClick={createCustomerModule}
          label="Save"
        />
      </Box>
    );
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

  const getAddModuleBtn = () => {
    return (
      <CustomButton
        id="add_module_button"
        label="Add Module"
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
          {getAddModuleBtn()}
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

  const getPersonalDetails = () => {
    return (
      <Grid container>
        <Grid item xs={12} mb={2} ml={1.5}>
          <Typography sx={classes.pageSubtitle}>Add Industry</Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box m={1.5}>
            <CustomInput
              required
              label="Name"
              id="profile_name_field"
              type="text"
              name="name"
              placeHolder="Enter Module Name"
              onChange={onChangeHandler}
              propsToInputElement={{ maxlength: 25 }}
              value={customerModuleFormData.name.value}
              onBlur={() => {
                if (customerModuleFormData.name.value) {
                  checkExitsCustomerModuleHandler();
                }
              }}
              error={customerModuleFormData.name.error}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box m={1.5}>
            <CustomInput
              required
              label="Code"
              id="profile_name_field"
              type="text"
              name="code"
              placeHolder="Enter Module Code"
              onChange={onChangeHandler}
              propsToInputElement={{ maxlength: 25 }}
              value={customerModuleFormData.code.value}
              onBlur={() => {
                if (customerModuleFormData.code.value) {
                  checkExitsCustomerModuleHandler();
                }
              }}
              error={customerModuleFormData.code.error}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box sx={classes.formInput} display={"flex"} flexDirection={"column"}>
            <Box display={"flex"}>
              <Typography sx={classes.label}>Description </Typography>
              <Typography sx={classes.star}>*</Typography>
            </Box>
            <TextField
              multiline
              minRows={3}
              inputProps={{ maxLength: 500 }}
              sx={classes.testAreaStyle}
              name="description"
              id="comment"
              //   error={ticketForm.comment.error}
              placeholder="Enter your description"
              value={customerModuleFormData.description.value}
              onChange={onChangeHandler}
            />
          </Box>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        height: "100%",
      }}
    >
      <AddCustomDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        title="Add Customer Module"
        actions={getProfileFooter()}
      >
        {getPersonalDetails()}
      </AddCustomDialog>
      {rolesTableRender()}
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default CustomerModule;
