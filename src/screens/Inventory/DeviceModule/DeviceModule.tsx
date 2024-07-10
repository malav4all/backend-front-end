import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  CustomAppHeader,
  CustomButton,
  CustomInput,
  CustomTable,
} from "../../../global/components";
import SearchIcon from "@mui/icons-material/Search";
import {
  debounceEventHandler,
  openErrorNotification,
  openSuccessNotification,
} from "../../../helpers/methods";

import AddDeviceModule from "./component/AddDeviceModule";
import {
  boldFont,
  getRelativeFontSize,
  headerColor,
  primaryHeadingColor,
} from "../../../utils/styles";
import strings from "../../../global/constants/StringConstants";
import EditIcon from "@mui/icons-material/Edit";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import {
  deviceModelTableHeader,
  deviceModuleInsertField,
} from "./DeviceModelHelpers";
import {
  fetchDeviceModelTableHandler,
  searchTableHandler,
} from "./service/deviceModule.service";
import DeviceModelStyles from "./DeviceModule.styles";
const DeviceModule = () => {
  const theme = useTheme();
  const classes = DeviceModelStyles;
  const [addUserDialogHandler, setAddUserDialogHandler] = useState(false);
  const [deviceModelData, setdeviceModelData] = useState(
    deviceModuleInsertField()
  );
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [perPageData, setPerPageData] = useState(10);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    setPageNumber(1);
  }, [searchText, perPageData]);

  useEffect(() => {
    if (searchText) {
      searchDataHandler();
    } else {
      fetchTableDeviceModel();
    }
  }, [pageNumber, perPageData, searchText]);

  // useEffect(() => {
  //   fetchTableDataHandler();
  // }, []);

  const addDeviceButton = () => {
    return (
      <CustomButton
        id="device_add_button"
        label={"Add Devices"}
        onClick={() => setAddUserDialogHandler(true)}
        customClasses={{
          width: "150px",
        }}
      />
    );
  };

  const getHeader = () => {
    return (
      <Box>
        <Typography sx={{ ...classes.mainCardHeading, color: "white" }}>
          Device Module
        </Typography>
      </Box>
    );
  };

  const fetchTableDeviceModel = async () => {
    try {
      setIsLoading(true);
      const res = await fetchDeviceModelTableHandler({
        input: { page: pageNumber, limit: perPageData },
      });
      const finalData = res?.fetchDeviceModel?.data?.map((item: any) => {
        return {
          deviceId: item.deviceId,
          deviceModelName: item.deviceModelName,
          deviceModel: item.deviceModel,
          deviceModelIpAddress: item.deviceModelIpAddress,
          deviceModelPortNumber: item.deviceModelPortNumber,
          deviceModelSimCount: item.deviceModelSimCount,
          deviceModelNetworkType: item.deviceModelNetworkType,
          deviceModelParser: item.deviceModelParser,
          deviceModelType: item.deviceModelType,
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
                <EditIcon />
              </Tooltip>
            </>
          ),
        };
      });
      setTableData(finalData);
      setCount(res?.fetchDeviceModel?.paginatorInfo?.count);
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
      setTableData(res?.searchDeviceModel?.data);
      setCount(res?.searchDeviceModel?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
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

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search text"
        id="users_search_field"
        onChange={debounceEventHandler(
          handleSearchOnChange,
          strings.SEARCH_TIME_OUT
        )}
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

  const addUserButton = () => {
    return (
      <CustomButton
        id="users_add_button"
        label={"Add Device"}
        onClick={() => setAddUserDialogHandler(true)}
        customClasses={{
          width: "150px",
        }}
      />
    );
  };

  const closeAddUserDialogHandler = () => {
    setAddUserDialogHandler(false);
  };

  const addDeviceModelBox = () => {
    return (
      <AddDeviceModule
        openAddUserDialog={addUserDialogHandler}
        handleCloseAddUserDialog={closeAddUserDialogHandler}
        tableData={fetchTableDeviceModel}
        selectedRowData={selectedRowData}
        edit={edit}
      />
    );
  };

  const handlePerPageData = (event: any) => {
    setPageNumber(1);
    setPerPageData(event.target.value);
  };

  const devicemoduleTableRender = () => {
    return (
      <>
        <Box
          sx={{
            minWidth: "300px",
            overflow: "auto",
          }}
        >
          <CustomTable
            headers={deviceModelTableHeader}
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

  const getUser = () => (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        height: "100%",
      }}
    >
      <CustomAppHeader
        className={{
          backgroundColor: headerColor,
          padding: "10px 20px 15px 18px",
        }}
      >
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
              ...boldFont,
              color: primaryHeadingColor,
            }}
          >
            {getHeader()}
          </Typography>

          <Stack
            direction={{ sm: "row", xs: "column" }}
            alignItems={{ sm: "center" }}
            spacing={1}
          >
            {getSearchBar()}
          </Stack>
        </Stack>
      </CustomAppHeader>
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
          {getSearchBar()}
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
        {devicemoduleTableRender()}
        {addDeviceModelBox()}
        {/* {updateUserDialogBox()} */}
      </Box>
      <CustomLoader isLoading={isLoading} />
    </Box>
  );

  return getUser();
};

export default DeviceModule;
