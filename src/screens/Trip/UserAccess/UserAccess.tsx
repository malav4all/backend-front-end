import {
  Box,
  InputAdornment,
  Stack,
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
import UserAccessStyles from "./UserAccess.styles";
import {
  addUserAccess,
  checkExitsUserAccess,
  fetchUserAccessTableHandler,
  fetchTableHandler,
  searchTableHandler,
} from "./service/UserAccess.service";
import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
  validateTabValue,
} from "../../../helpers/methods";
import {
  userAccessInsertField,
  userAccessTableHeader,
  userAccessValidation,
} from "./UserAccessHelpers";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import AddUserAccess from "./component/AddUserAccess";
import history from "../../../utils/history";
import { useLocation } from "react-router-dom";
import { store } from "../../../utils/store";
const TripAccess = () => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };
  const classes = UserAccessStyles;
  const theme = useTheme();
  const location = useLocation();
  const [userAccessFormData, setUserAccessFormData] = useState(
    userAccessInsertField()
  );
  const [modulesData, setModuleData] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [perPageData, setPerPageData] = useState(10);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any>();
  const [addUserAccessDialogHandler, setAddUserAccessDialogHandler] =
    useState(false);
  const urlParams = new URLSearchParams(location.search);
  const tabValueName = validateTabValue(urlParams.get("tabValue"));
  const [tabValue, setTabValue] = useState<string>(tabValueName!);

  useEffect(() => {
    setPageNumber(1);
  }, [searchText, perPageData]);

  useEffect(() => {
    fetchTableUserAccess();
  }, [pageNumber, perPageData]);

  useEffect(() => {
    fetchTableDataHandler();
  }, []);

  const handleModuleChange = (event: any) => {
    setUserAccessFormData({
      ...userAccessFormData,
      code: {
        value: event.target.value,
        error: "",
      },
    });
  };
  const handleChange = (newValue: string) => {
    setTabValue(newValue);
    history.push(`?tabValue=${newValue}`);
  };

  const fetchTableUserAccess = async () => {
    try {
      setIsLoading(true);
      const res = await fetchUserAccessTableHandler({
        input: {
          accountId: store.getState().auth.tenantId,
          page: pageNumber,
          limit: perPageData,
        },
      });
      const finalData = res?.fetchUserAccess?.data?.map((item: any) => {
        return {
          userId: item?.userId?.firstName,
          devicesImei: item?.devicesImei?.map((val: any) => val).join(","),
          entites: item?.entites?.map((val: any) => val).join(","),
          deviceGroup: item?.deviceGroup?.map((val: any) => val).join(","),
          createdBy: item.createdBy,
        };
      });
      setTableData(finalData);
      setCount(res?.fetchUserAccess?.paginatorInfo?.count);
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
      setTableData(res?.searchUserAccess?.data);
      setCount(res?.searchUserAccess?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const checkExitsRoleHandler = async () => {
    try {
      const res = await checkExitsUserAccess({
        input: { name: userAccessFormData.name.value },
      });
      if (res?.checkUserAccessExistsRecord?.success === 1) {
        openErrorNotification(res.checkUserAccessExistsRecord.message);
      }
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const addUserAccessHandler = async () => {
    try {
      const payload: any = {
        name: userAccessFormData.name.value,
        code: userAccessFormData.code.value,
        description: userAccessFormData.description.value,
        file,
      };
      setIsLoading(true);
      if (handleValidation()) {
        const res = await addUserAccess({
          input: { ...payload },
        });
        setUserAccessFormData(userAccessInsertField());
        await fetchTableUserAccess();
        openSuccessNotification(res.createUserAccess.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const handleValidation = () => {
    const { isValid, errors }: { isValid: boolean; errors: any } =
      userAccessValidation(userAccessFormData);
    setUserAccessFormData({ ...errors });
    return isValid;
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageNumber(newPage);
  };

  const fetchTableDataHandler = async () => {
    try {
      setIsLoading(true);
      const res = await fetchTableHandler({
        input: { page: -1, limit: 0 },
      });
      setModuleData(res?.customerModuleListAll?.data);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<any>) => {
    setUserAccessFormData({
      ...userAccessFormData,
      [event.target.name]: {
        value: event.target.value,
        error: "",
      },
    });
  };

  const handleFileChange = (e: any) => {
    const fileList = e.target.files[0];
    setFile(fileList);
  };

  const getAddUserAccessBtn = () => {
    return (
      <CustomButton
        id="profile_submit_button"
        label="Add Trip Access"
        customClasses={{ width: "180px" }}
        onClick={() => setAddUserAccessDialogHandler(true)}
      />
    );
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
        placeHolder="Search Trip Access Name"
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

  const SettingsHeader = () => {
    return (
      <CustomAppHeader
        className={{
          ...classes.headerBackgroundColor,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box ml={1}>
          <Typography
            style={{
              ...classes.settingsTitle,
              color: theme.palette.text.primary,
            }}
          >
            Trip Access
          </Typography>
        </Box>
        <Stack
          direction={{ lg: "row", md: "column", sm: "column", xs: "column" }}
          justifyContent="space-between"
          mt={2}
        ></Stack>
      </CustomAppHeader>
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
          direction="row"
          justifyContent="end"
          alignItems="center"
          spacing={1}
          pt={2}
          px={3}
        >
          {searchBarRole()}
          {getAddUserAccessBtn()}
        </Stack>
        <Box
          sx={{
            minWidth: "300px",
            overflow: "auto",
            padding: "30px",
          }}
        >
          <CustomTable
            headers={userAccessTableHeader}
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
      {SettingsHeader()}
      {rolesTableRender()}
      <AddUserAccess
        open={addUserAccessDialogHandler}
        handleClose={() => setAddUserAccessDialogHandler(false)}
        userAccessFormData={userAccessFormData}
        modulesData={modulesData}
        file={file}
        onChangeHandler={onChangeHandler}
        handleModuleChange={handleModuleChange}
        checkExitsRoleHandler={checkExitsRoleHandler}
        handleFileChange={handleFileChange}
        handleSave={addUserAccessHandler}
        isLoading={isLoading}
        MenuProps={MenuProps}
        isTruthy={isTruthy}
        classes={classes}
      />
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default TripAccess;
