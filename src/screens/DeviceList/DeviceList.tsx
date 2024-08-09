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
  headerColor,
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
import {
  deviceListTable,
  deviceOnboardingTableHeader,
} from "../Inventory/DeviceOnboarding/DeviceOnboarding.helpers";
import DeviceNameModal from "./Component/DevicenNameModal";
import {
  fetchDeviceList,
  updateDeviceName,
} from "./service/devicelist.service";

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
    fetchDeviceOnboardingData();
  }, [pageNumber, perPageData]);

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
      formField("");
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
        <Typography sx={{ ...classes.mainCardHeading, color: "white" }}>
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
