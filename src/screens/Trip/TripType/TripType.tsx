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
import TripTypeStyles from "./TripType.styles";
import {
  addTripType,
  fetchTripTypeTableHandler,
  fetchTableHandler,
  searchTableHandler,
} from "./service/TripType.service";
import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
  validateTabValue,
} from "../../../helpers/methods";
import {
  tripTypeInsertField,
  tripTypeTableHeader,
  tripTypeValidation,
} from "./TripTypeHelpers";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import AddTripType from "./component/AddTripType";
import { useLocation } from "react-router-dom";
import { store } from "../../../utils/store";

const TripType = () => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };
  const classes = TripTypeStyles;
  const theme = useTheme();
  const location = useLocation();
  const [tripTypeFormData, setTripTypeFormData] = useState(
    tripTypeInsertField()
  );
  const [modulesData, setModuleData] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [perPageData, setPerPageData] = useState(10);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any>();
  const [addTripTypeDialogHandler, setAddTripTypeDialogHandler] =
    useState(false);
  const urlParams = new URLSearchParams(location.search);

  useEffect(() => {
    setPageNumber(1);
  }, [searchText, perPageData]);

  useEffect(() => {
    if (searchText) {
      searchDataHandler();
    } else {
      fetchTableTripType();
    }
  }, [pageNumber, perPageData, searchText]);

  useEffect(() => {
    fetchTableDataHandler();
  }, []);

  const handleModuleChange = (event: any) => {
    setTripTypeFormData({
      ...tripTypeFormData,
      code: {
        value: event.target.value,
        error: "",
      },
    });
  };

  const fetchTableTripType = async () => {
    try {
      setIsLoading(true);
      const res = await fetchTripTypeTableHandler({
        input: {
          accountId: store.getState().auth.tenantId,
          page: pageNumber,
          limit: perPageData,
        },
      });
      const finalData = res?.tripTypeList?.data?.map((item: any) => {
        return {
          accountId: item.accountId,
          name: item.tripName,
          minBatteryPercentage: item.minBatteryPercentage,
          tripRate: item.tripRate,
          gstPercentage: item.gstPercentage,
          createdBy: item.createdBy,
        };
      });
      setTableData(finalData);
      setCount(res?.tripTypeList?.paginatorInfo?.count);
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
      setTableData(res?.searchTripType?.data);
      setCount(res?.searchTripType?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const addTripTypeHandler = async () => {
    try {
      const payload: any = {
        accountId: tripTypeFormData?.accountId?.value,
        tripName: tripTypeFormData.name.value,
        minBatteryPercentage: Number(
          tripTypeFormData.minBatteryPercentage.value
        ),
        tripRate: Number(tripTypeFormData.tripRate.value),
        gstPercentage: tripTypeFormData.gstPercentage.value,
        createdBy: store.getState().auth.userName,
      };
      setIsLoading(true);
      if (handleValidation()) {
        const res = await addTripType({
          input: { ...payload },
        });
        setTripTypeFormData(tripTypeInsertField());
        await fetchTableTripType();
        openSuccessNotification(res.createTripType.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const handleValidation = () => {
    const { isValid, errors }: { isValid: boolean; errors: any } =
      tripTypeValidation(tripTypeFormData);
    setTripTypeFormData({ ...errors });
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
    setTripTypeFormData({
      ...tripTypeFormData,
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

  const getAddTripTypeBtn = () => {
    return (
      <CustomButton
        id="profile_submit_button"
        label="Add Trip Type"
        customClasses={{ width: "150px" }}
        onClick={() => setAddTripTypeDialogHandler(true)}
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
        placeHolder="Search TripType Name"
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
            Trip Type
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
          px={3}
        >
          {searchBarRole()}
          {getAddTripTypeBtn()}
        </Stack>
        <Box
          sx={{
            minWidth: "300px",
            overflow: "auto",
            padding: "30px",
          }}
        >
          <CustomTable
            headers={tripTypeTableHeader}
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
      <AddTripType
        open={addTripTypeDialogHandler}
        handleClose={() => setAddTripTypeDialogHandler(false)}
        tripTypeFormData={tripTypeFormData}
        modulesData={modulesData}
        file={file}
        onChangeHandler={onChangeHandler}
        handleModuleChange={handleModuleChange}
        checkExitsRoleHandler={() => {}}
        handleFileChange={handleFileChange}
        handleSave={addTripTypeHandler}
        isLoading={isLoading}
        MenuProps={MenuProps}
        isTruthy={isTruthy}
        classes={classes}
      />
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default TripType;
