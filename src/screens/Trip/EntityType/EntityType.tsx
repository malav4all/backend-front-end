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
import EntityTypeStyles from "./EntityType.styles";
import {
  addEntityType,
  checkExitsEntityType,
  fetchEntityTypeTableHandler,
  fetchTableHandler,
  searchTableHandler,
} from "./service/EntityType.service";
import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
  validateTabValue,
} from "../../../helpers/methods";
import {
  entityTypeInsertField,
  entityTypeTableHeader,
  entityTypeValidation,
} from "./EntityTypeHelpers";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import {
  primaryHeadingColor,
  regularFont,
  getRelativeFontSize,
} from "../../../utils/styles";
import AddEntityType from "./component/AddEntityType";
import history from "../../../utils/history";
import { useLocation } from "react-router-dom";
import { store } from "../../../utils/store";
const EntityType = () => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };
  const classes = EntityTypeStyles;
  const theme = useTheme();
  const location = useLocation();
  const [entityTypeFormData, setEntityTypeFormData] = useState(
    entityTypeInsertField()
  );
  const [modulesData, setModuleData] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [perPageData, setPerPageData] = useState(10);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any>();
  const [addEntityTypeDialogHandler, setAddEntityTypeDialogHandler] =
    useState(false);
  const urlParams = new URLSearchParams(location.search);
  const tabValueName = validateTabValue(urlParams.get("tabValue"));
  const [tabValue, setTabValue] = useState<string>(tabValueName!);

  useEffect(() => {
    setPageNumber(1);
  }, [searchText, perPageData]);

  useEffect(() => {
    if (searchText) {
      searchDataHandler();
    } else {
      fetchTableEntityType();
    }
  }, [pageNumber, perPageData, searchText]);

  const handleModuleChange = (event: any) => {
    setEntityTypeFormData({
      ...entityTypeFormData,
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

  const fetchTableEntityType = async () => {
    try {
      setIsLoading(true);
      const res = await fetchEntityTypeTableHandler({
        input: {
          accountId: store.getState().auth.tenantId,
          page: pageNumber,
          limit: perPageData,
        },
      });
      const finalData = res?.fetchEntityType?.data?.map((item: any) => {
        return {
          accountId: store.getState().auth.tenantId,
          name: item.name,
          description: item.description,
          createdBy: item.createdBy,
        };
      });
      setTableData(finalData);
      setCount(res?.fetchEntityType?.paginatorInfo?.count);
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
      setTableData(res?.searchEntityType?.data);
      setCount(res?.searchEntityType?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const checkExitsRoleHandler = async () => {
    try {
      const res = await checkExitsEntityType({
        input: { name: entityTypeFormData.name.value },
      });
      if (res?.checkEntityTypeExistsRecord?.success === 1) {
        openErrorNotification(res.checkEntityTypeExistsRecord.message);
      }
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const addEntityTypeHandler = async () => {
    try {
      const payload: any = {
        accountId: store.getState().auth.tenantId,
        name: entityTypeFormData.name.value,
        description: entityTypeFormData.description.value,
        createdBy: store.getState().auth.userName,
      };

      // if (handleValidation()) {
      const res = await addEntityType({
        input: { ...payload },
      });
      setEntityTypeFormData(entityTypeInsertField());
      await fetchTableEntityType();
      openSuccessNotification(res.addEntityType.message);
      // }
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const handleValidation = () => {
    const { isValid, errors }: { isValid: boolean; errors: any } =
      entityTypeValidation(entityTypeFormData);
    setEntityTypeFormData({ ...errors });
    return isValid;
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageNumber(newPage);
  };

  const onChangeHandler = (event: React.ChangeEvent<any>) => {
    setEntityTypeFormData({
      ...entityTypeFormData,
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

  const getAddEntityTypeBtn = () => {
    return (
      <CustomButton
        id="profile_submit_button"
        label="Add EntityType"
        customClasses={{ width: "150px" }}
        onClick={() => setAddEntityTypeDialogHandler(true)}
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
        placeHolder="Search EntityType Name"
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
      <CustomAppHeader className={classes.headerBackgroundColor}>
        <Box ml={1}>
          <Typography style={classes.settingsTitle}>Entity Type</Typography>
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
          {getAddEntityTypeBtn()}
        </Stack>
        <Box
          sx={{
            minWidth: "300px",
            overflow: "auto",
            padding: "30px",
          }}
        >
          <CustomTable
            headers={entityTypeTableHeader}
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
      <AddEntityType
        open={addEntityTypeDialogHandler}
        handleClose={() => setAddEntityTypeDialogHandler(false)}
        entityTypeFormData={entityTypeFormData}
        modulesData={modulesData}
        file={file}
        onChangeHandler={onChangeHandler}
        handleModuleChange={handleModuleChange}
        checkExitsRoleHandler={checkExitsRoleHandler}
        handleFileChange={handleFileChange}
        handleSave={addEntityTypeHandler}
        isLoading={isLoading}
        MenuProps={MenuProps}
        isTruthy={isTruthy}
        classes={classes}
      />
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default EntityType;
