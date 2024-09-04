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
import EntityStyles from "./Entity.styles";
import {
  addEntity,
  checkExitsEntity,
  fetchEntityTableHandler,
  fetchTableHandler,
  searchTableHandler,
  updateEntity,
} from "./service/Entity.service";
import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../helpers/methods";
import {
  entityInsertField,
  entityTableHeader,
  entityValidation,
} from "./EntityHelpers";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import AddEntity from "./component/AddEntity";
import { useLocation } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { store } from "../../../utils/store";
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
  const [entityFormData, setEntityFormData] = useState(entityInsertField());
  const [modulesData, setModuleData] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [perPageData, setPerPageData] = useState(10);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState<any>();
  const [addEntityDialogHandler, setAddEntityDialogHandler] = useState(false);

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
      [event?.target?.name]: {
        ...entityFormData[event?.target?.name],
        value: event?.target?.value,
        error: "",
      },
    });
  };

  const handleEditClick = (data: any): void => {
    setAddEntityDialogHandler(true);
    setEdit(true);
    setEntityFormData(entityInsertField(data));
  };

  const tableDataRender = (res: any) => {
    const finalData = res?.map((item: any) => {
      return {
        ...item,
        action: (
          <Tooltip title="Edit" onClick={() => handleEditClick(item)}>
            <EditIcon
              htmlColor={"#7C58CB"}
              style={{ margin: "0px 8px -7px 0px", cursor: "pointer" }}
            />
          </Tooltip>
        ),
      };
    });
    return finalData;
  };

  const fetchTableEntity = async () => {
    try {
      setIsLoading(true);
      const res = await fetchEntityTableHandler({
        input: {
          accountId: store.getState().auth.tenantId,
          page: pageNumber,
          limit: perPageData,
        },
      });
      const finalData = tableDataRender(res?.fetchEntitesType?.data);
      setTableData(finalData);
      setCount(res?.fetchEntitesType?.paginatorInfo?.count);
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
        accountId: store.getState().auth.tenantId,
        tripTypeList: entityFormData.tripTypeList?.value,
        name: entityFormData.name?.value,
        type: entityFormData.type?.value,
        address: entityFormData.address?.value,
        city: entityFormData.city?.value,
        state: entityFormData.state?.value,
        area: entityFormData.area?.value,
        district: entityFormData.district?.value,
        pinCode: entityFormData.pinCode?.value,
        contactName: entityFormData.contactName?.value,
        contactEmail: entityFormData.contactEmail?.value,
        contactPhone: entityFormData.contactPhone?.value,
        code: entityFormData.code?.value,
        gstIn: entityFormData.gstIn?.value,
        aadharCardNo: entityFormData.aadharCardNo?.value,
      };

      // if (handleValidation()) {
      setIsLoading(true);
      if (edit) {
        const res = await updateEntity({
          input: {
            ...payload,
            _id: entityFormData?.id?.value,
            updatedBy: store.getState().auth.userName,
          },
        });
        openSuccessNotification(res?.updateEntityType?.message);
      } else {
        const res = await addEntity({
          input: { ...payload, createdBy: store.getState().auth.userName },
        });
        openSuccessNotification(res.addEntitesType.message);
      }

      setEntityFormData(entityInsertField());
      await fetchTableEntity();
      setIsLoading(false);
      setAddEntityDialogHandler(false);
      setEdit(false);
      // }
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
            Entity
          </Typography>

          <Stack
            direction={{ sm: "row", xs: "column" }}
            alignItems={{ sm: "center" }}
            spacing={1}
          >
            {searchBarRole()}
            {getAddEntityBtn()}
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
        paddingTop: "3.5rem",
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
        setEntityFormData={setEntityFormData}
        edit={edit}
      />
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default Entity;
