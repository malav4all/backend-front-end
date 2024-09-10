import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Grid,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import DeviceOnboardingStyle from "../Inventory/DeviceOnboarding/DeviceOnboarding.styles";
import {
  CustomAppHeader,
  CustomInput,
  CustomTable,
} from "../../global/components";
import strings from "../../global/constants/StringConstants";
import EditIcon from "@mui/icons-material/Edit";
import {
  boldFont,
  getRelativeFontSize,
  primaryHeadingColor,
} from "../../utils/styles";
import SearchIcon from "@mui/icons-material/Search";
import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import { store } from "../../utils/store";
import {
  debounceEventHandler,
  openErrorNotification,
  openSuccessNotification,
} from "../../helpers/methods";
import { deviceListTable } from "../Inventory/DeviceOnboarding/DeviceOnboarding.helpers";
import DeviceNameModal from "./Component/DevicenNameModal";
import {
  fetchDeviceList,
  updateDeviceName,
} from "./service/devicelist.service";
import { searchDeviceOnboardingHandler } from "../Inventory/DeviceOnboarding/service/DeviceOnboarding.service";

const DeviceList = () => {
  const classes = DeviceOnboardingStyle;
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [addUserDialogHandler, setAddUserDialogHandler] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any>();
  const [searchCampaigner, setSearchCampaigner] = useState<string>("");
  const [edit, setEdit] = useState(false);
  const [count, setCount] = useState(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [perPageData, setPerPageData] = useState(10);
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
  const [tableData, setTableData] = useState<any>([]);
  const [formField, setFormField] = useState<any>();
  const title = "Device List";

  useEffect(() => {
    setPageNumber(1);
  }, [searchCampaigner]);

  useEffect(() => {
    if (searchCampaigner) {
      searchDeviceOnboardingData();
    } else {
      fetchDeviceOnboardingData();
    }
  }, [pageNumber, perPageData, searchCampaigner]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageNumber(newPage);
  };

  const handlePerPageData = (event: any) => {
    setPageNumber(1);
    setSearchPageNumber(1);
    setPerPageData(event.target.value);
  };

  const updateDeviceNameHandler = async () => {
    try {
      const res = await updateDeviceName({
        input: {
          _id: selectedRowData._id,
          ...selectedRowData,
          deviceName: formField,
          updatedBy: store.getState().auth.userName,
        },
      });
      openSuccessNotification(res?.updateDeviceOnboarding?.message);
      await fetchDeviceOnboardingData();
      setFormField("");
      setAddUserDialogHandler(false);
      setSelectedRowData({});
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const tableDataRender = (tableValue: string[]) => {
    const data = tableValue.map((item: any) => {
      return {
        _id: item._id,
        accountId: item.accountId,
        deviceOnboardingAccount: store.getState().auth.account,
        deviceOnboardingSimNo: item.deviceOnboardingSimNo
          ?.map((val: any) => val)
          ?.join("-"),
        deviceOnboardingIMEINumber: item.deviceOnboardingIMEINumber,
        deviceName: item.deviceName,
        action: (
          <>
            <Tooltip
              arrow
              title="Edit"
              onClick={() => {
                setAddUserDialogHandler(true);
                setSelectedRowData(item);
                setEdit(true);
              }}
            >
              <EditIcon
                htmlColor={"#7C58CB"}
                style={{ margin: "0px 8px -7px 0px", cursor: "pointer" }}
              />
            </Tooltip>
          </>
        ),
      };
    });
    return data;
  };

  const updateDeviceModalName = () => {
    return (
      <DeviceNameModal
        open={addUserDialogHandler}
        handleClose={() => {
          setAddUserDialogHandler(false);
        }}
        formField={formField}
        handleSave={updateDeviceNameHandler}
        onChangeHandler={(e) => {
          setFormField(e.target?.value);
        }}
      />
    );
  };

  const searchDeviceOnboardingData = async () => {
    try {
      setIsLoading(true);
      const res = await searchDeviceOnboardingHandler({
        input: {
          accountId: store.getState().auth.tenantId,
          search: searchCampaigner,
          page: pageNumber,
          limit: perPageData,
        },
      });
      const finalTableData = tableDataRender(
        res.searchDeviceOnboardingList.data
      );

      setTableData(finalTableData);
      setCount(res.searchDeviceOnboardingList?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const fetchDeviceOnboardingData = async () => {
    try {
      setIsLoading(true);
      const res = await fetchDeviceList({
        input: {
          accountId: store.getState().auth.tenantId,
          page: pageNumber,
          limit: perPageData,
        },
      });
      const finalTableData = tableDataRender(
        res.fetchDeviceOnboardingList.data
      );

      setTableData(finalTableData);
      setCount(res.fetchDeviceOnboardingList?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      setSearchCampaigner(SearchEvent.target.value.replace(/\s/g, ""));
      setPageNumber(1);
      setPerPageData(10);
    } else {
      setSearchCampaigner("");
    }
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search Device"
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

  const handleSearchChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setSearchPageNumber(newPage);
  };

  const campaignerTable = () => {
    return (
      <Box id="users_display_table" sx={classes.campaignerTable}>
        <CustomTable
          headers={deviceListTable}
          rows={tableData}
          paginationCount={count}
          handlePageChange={
            searchCampaigner ? handleSearchChangePage : handleChangePage
          }
          pageNumber={searchCampaigner ? searchPageNumber : pageNumber}
          setPage={searchCampaigner ? setSearchPageNumber : setPageNumber}
          isLoading={isLoading}
          handlePerPageData={handlePerPageData}
          perPageData={perPageData}
          rowsPerPage={perPageData}
        />
      </Box>
    );
  };

  const getDeviceOnboarding = () => (
    <Box>
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
      </Stack>

      <Box
        sx={{
          minWidth: "300px",
          overflow: "auto",
        }}
      >
        {campaignerTable()}
      </Box>
    </Box>
  );

  const getHeader = () => {
    return (
      <Box>
        <Typography
          sx={{ ...classes.mainCardHeading, color: theme.palette.text.primary }}
        >
          {title}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        height: "100%",
        paddingTop: "2.5rem",
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
            sx={{
              fontSize: getRelativeFontSize(6),
              ...boldFont,
              color: theme.palette.text.primary,
            }}
          >
            {getHeader()}
          </Typography>

          <Stack
            direction={{ sm: "row", xs: "column" }}
            alignItems={{ sm: "center" }}
          >
            {getSearchBar()}
          </Stack>
        </Stack>
      </CustomAppHeader>

      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        sx={classes.mainSection}
      >
        {getDeviceOnboarding()}
        {updateDeviceModalName()}
      </Grid>

      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};
export default React.memo(DeviceList);
