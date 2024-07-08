import React, { ChangeEvent, useEffect, useState } from "react";
import DeviceOnboardingStyle from "./DeviceOnboarding.styles";
import {
  Box,
  Grid,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  CustomAppHeader,
  CustomButton,
  CustomInput,
  CustomTable,
} from "../../../global/components";
import {
  debounceEventHandler,
  openErrorNotification,
} from "../../../helpers/methods";
import strings from "../../../global/constants/StringConstants";
import {
  getRelativeFontSize,
  primaryHeadingColor,
} from "../../../utils/styles";
import SearchIcon from "@mui/icons-material/Search";
import {
  deviceOnboardingTableHeader,
  deviceOnboardingTableHeaderTenant,
} from "./DeviceOnboarding.helpers";
import AddDeviceOnboarding from "./Component/AddDeviceOnboading";
import { fetchDeviceOnboardingTableHandler } from "./service/DeviceOnboarding.service";
import EditIcon from "@mui/icons-material/Edit";
import { store } from "../../../utils/store";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";

const DeviceOnboarding = () => {
  const classes = DeviceOnboardingStyle;
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

  useEffect(() => {
    fetchDeviceOnboardingData();
  }, []);

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

  const tableDataRender = (tableValue: string[]) => {
    const data = tableValue.map((item: any) => {
      return {
        _id: item._id,
        assetsType: item?.assetsType,
        description: item.description,
        deviceOnboardingName: item.deviceOnboardingName,
        deviceOnboardingAccount: item.deviceOnboardingAccount.accountName,
        deviceOnboardingUser: item.deviceOnboardingUser.firstName,
        deviceOnboardingSimNo: item.deviceOnboardingSimNo
          ?.map((val: any) => val)
          ?.join("-"),

        deviceOnboardingModel: item.deviceOnboardingModel?.deviceModelName,
        deviceOnboardingStatus: item.deviceOnboardingStatus,
        deviceOnboardingIMEINumber: item.deviceOnboardingIMEINumber,
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

  const tableDataRenderTenantData = (tableValue: string[]) => {
    const data = tableValue.map((item: any) => {
      return {
        _id: item._id,
        assetsType: item?.assetsType,
        deviceOnboardingAccount: item.deviceOnboardingAccount.accountName,
        deviceOnboardingUser: item.deviceOnboardingUser.firstName,
        deviceOnboardingIMEINumber: item.deviceOnboardingIMEINumber,
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

  const fetchDeviceOnboardingData = async () => {
    try {
      setIsLoading(true);
      const res = await fetchDeviceOnboardingTableHandler({
        input: { page: pageNumber, limit: perPageData },
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

  const addUserButton = () => {
    return (
      <CustomButton
        id="users_add_button"
        label={"Onboard Device"}
        onClick={() => setAddUserDialogHandler(true)}
        customClasses={{
          width: "150px",
        }}
      />
    );
  };

  const addDeviceDialogBox = () => {
    return (
      <AddDeviceOnboarding
        openAddUserDialog={addUserDialogHandler}
        handleCloseAddUserDialog={closeAddUserDialogHandler}
        isLoading={isLoading}
        tableData={fetchDeviceOnboardingData}
        selectedRowData={selectedRowData}
        edit={edit}
      />
    );
  };

  const closeAddUserDialogHandler = () => {
    setAddUserDialogHandler(false);
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
          headers={deviceOnboardingTableHeader}
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

  const getUser = () => (
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
        >
          Device Onboarding
        </Typography>

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
        }}
      >
        {campaignerTable()}
        {addDeviceDialogBox()}
      </Box>
    </Box>
  );

  const getHeader = () => {
    return (
      <Box>
        <Typography sx={classes.mainCardHeading}>Device Onboarding</Typography>
      </Box>
    );
  };

  return (
    <>
      <CustomAppHeader
        className={{
          backgroundColor: "#ECF9FF",
          padding: "59px 10px 79px 44px",
        }}
      >
        <Grid container xs={12} md={12} lg={12} xl={12} alignItems="center">
          <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
            {getHeader()}
          </Grid>
        </Grid>
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
        {getUser()}
      </Grid>
      <CustomLoader isLoading={isLoading} />
    </>
  );
};
export default React.memo(DeviceOnboarding);
