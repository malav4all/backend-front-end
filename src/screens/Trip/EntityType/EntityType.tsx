import {
  Box,
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
import EntityTypeStyles from "./EntityType.styles";
import {
  addEntityType,
  fetchEntityTypeTableHandler,
  searchTableHandler,
  updateEntityType,
} from "./service/EntityType.service";
import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../helpers/methods";
import {
  entityTypeInsertField,
  entityTypeTableHeader,
  entityTypeValidation,
} from "./EntityTypeHelpers";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import AddEntityType from "./component/AddEntityType";
import { store } from "../../../utils/store";
import EditIcon from "@mui/icons-material/Edit";
import { hasAccessTo } from "../../../utils/AuthorizationManager";
import strings from "../../../global/constants/StringConstants";

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
  const [entityTypeFormData, setEntityTypeFormData] = useState(
    entityTypeInsertField()
  );
  const [edit, setEdit] = useState(false);
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

  const handleEditClick = (data: any): void => {
    setAddEntityTypeDialogHandler(true);
    setEdit(true);
    setEntityTypeFormData(entityTypeInsertField(data));
  };

  const tableDataRender = (res: any) => {
    const finalData = res?.map((item: any) => {
      return {
        accountId: store.getState().auth.tenantId,
        name: item.name,
        description: item.description,
        createdBy: item.createdBy,
        action: (
          <>
            {hasAccessTo(strings.TRIPS, strings.UPDATE) && (
              <Tooltip title="Edit" onClick={() => handleEditClick(item)}>
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
    return finalData;
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
      const finalData = tableDataRender(res?.fetchEntityType?.data);
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
          accountId: store.getState().auth.tenantId,
          search: searchText,
          page: pageNumber,
          limit: perPageData,
        },
      });
      const finalData = tableDataRender(res?.searchEntity?.data);
      setTableData(finalData);
      setCount(res?.searchEntity?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const addEntityTypeHandler = async () => {
    try {
      const payload: any = {
        accountId: store.getState().auth.tenantId,
        name: entityTypeFormData.name.value,
        description: entityTypeFormData.description.value,
      };

      if (handleValidation()) {
        if (edit) {
          const res = await updateEntityType({
            input: {
              ...payload,
              _id: entityTypeFormData?.id?.value,
              updatedBy: store.getState().auth.userName,
            },
          });
          openSuccessNotification(res?.updateEntityType?.message);
        } else {
          const res = await addEntityType({
            input: { ...payload, createdBy: store.getState().auth.userName },
          });
          openSuccessNotification(res.addEntityType.message);
        }
        setEdit(false);
        setAddEntityTypeDialogHandler(false);
        setEntityTypeFormData(entityTypeInsertField());
        await fetchTableEntityType();
      }
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
        label="Add Entity Type"
        customClasses={{ width: "170px" }}
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
        onChange={debounceEventHandler(handleSearchOnChange, 700)}
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
            Entity Type
          </Typography>

          <Stack
            direction={{ sm: "row", xs: "column" }}
            alignItems={{ sm: "center" }}
            spacing={1}
          >
            {searchBarRole()}
            {hasAccessTo(strings.TRIPS, strings.ADD) && getAddEntityTypeBtn()}
          </Stack>
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
        paddingTop: "3.5rem",
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
        handleFileChange={handleFileChange}
        handleSave={addEntityTypeHandler}
        isLoading={isLoading}
        MenuProps={MenuProps}
        isTruthy={isTruthy}
        classes={classes}
        edit={edit}
      />
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default EntityType;
