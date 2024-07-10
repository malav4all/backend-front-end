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
import EntityStyles from "./Entity.styles";
import {
  addEntity,
  checkExitsEntity,
  fetchEntityTableHandler,
  fetchTableHandler,
  searchTableHandler,
} from "./service/Entity.service";
import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
  validateTabValue,
} from "../../../helpers/methods";
import {
  entityInsertField,
  entityTableHeader,
  entityValidation,
} from "./EntityHelpers";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import AddEntity from "./component/AddEntity";
import history from "../../../utils/history";
import { useLocation } from "react-router-dom";
const Entity = () => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };
  const classes = EntityStyles;
  const theme = useTheme();
  const location = useLocation();
  const [entityFormData, setEntityFormData] = useState(
    entityInsertField()
  );
  const [modulesData, setModuleData] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [perPageData, setPerPageData] = useState(10);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any>();
  const [addEntityDialogHandler, setAddEntityDialogHandler] =
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
      fetchTableEntity();
    }
  }, [pageNumber, perPageData, searchText]);

  useEffect(() => {
    fetchTableDataHandler();
  }, []);

  const handleModuleChange = (event: any) => {
    setEntityFormData({
      ...entityFormData,
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

  const fetchTableEntity = async () => {
    try {
      setIsLoading(true);
      const res = await fetchEntityTableHandler({
        input: { page: pageNumber, limit: perPageData },
      });
      const finalData = res?.entityListAll?.data?.map((item: any) => {
        return {
          name: item.name,
          code: item?.code?.map((val: any) => val).join(","),
          description: item.description,
          file: (
            <>
              <img
                src={`http://localhost:5000/${item.file}`}
                alt=""
                width="30"
                height="30"
              />
            </>
          ),
        };
      });
      setTableData(finalData);
      setCount(res?.entityListAll?.paginatorInfo?.count);
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
      setTableData(res?.searchEntity?.data);
      setCount(res?.searchEntity?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const checkExitsRoleHandler = async () => {
    try {
      const res = await checkExitsEntity({
        input: { name: entityFormData.name.value },
      });
      if (res?.checkEntityExistsRecord?.success === 1) {
        openErrorNotification(res.checkEntityExistsRecord.message);
      }
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const addEntityHandler = async () => {
    try {
      const payload: any = {
        name: entityFormData.name.value,
        code: entityFormData.code.value,
        description: entityFormData.description.value,
        file,
      };
      setIsLoading(true);
      if (handleValidation()) {
        const res = await addEntity({
          input: { ...payload },
        });
        setEntityFormData(entityInsertField());
        await fetchTableEntity();
        openSuccessNotification(res.createEntity.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const handleValidation = () => {
    const { isValid, errors }: { isValid: boolean; errors: any } =
      entityValidation(entityFormData);
    setEntityFormData({ ...errors });
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
    setEntityFormData({
      ...entityFormData,
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

  const getAddEntityBtn = () => {
    return (
      <CustomButton
        id="profile_submit_button"
        label="Add Entity"
        customClasses={{ width: "150px" }}
        onClick={() => setAddEntityDialogHandler(true)}
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
        placeHolder="Search Entity Name"
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
          <Typography style={classes.settingsTitle}>Entity</Typography>
        </Box>
        <Stack
          direction={{ lg: "row", md: "column", sm: "column", xs: "column" }}
          justifyContent="space-between"
          mt={2}
        >
        </Stack>
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
          {getAddEntityBtn()}
        </Stack>
        <Box
          sx={{
            minWidth: "300px",
            overflow: "auto",
            padding: "30px",
          }}
        >
          <CustomTable
            headers={entityTableHeader}
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
      <AddEntity
        open={addEntityDialogHandler}
        handleClose={() => setAddEntityDialogHandler(false)}
        entityFormData={entityFormData}
        modulesData={modulesData}
        file={file}
        onChangeHandler={onChangeHandler}
        handleModuleChange={handleModuleChange}
        checkExitsRoleHandler={checkExitsRoleHandler}
        handleFileChange={handleFileChange}
        handleSave={addEntityHandler}
        isLoading={isLoading}
        MenuProps={MenuProps}
        isTruthy={isTruthy}
        classes={classes}
      />
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default Entity;
