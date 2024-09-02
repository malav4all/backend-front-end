import React, { ChangeEvent, useEffect, useState } from "react";
import DeviceOnboardingStyle from "./DeviceOnboarding.styles";
import {
  Box,
  Grid,
  InputAdornment,
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
import {
  debounceEventHandler,
  openErrorNotification,
} from "../../../helpers/methods";
import strings from "../../../global/constants/StringConstants";
import {
  boldFont,
  getRelativeFontSize,
  primaryHeadingColor,
} from "../../../utils/styles";
import SearchIcon from "@mui/icons-material/Search";
import { deviceOnboardingTableHeader } from "./DeviceOnboarding.helpers";
import AddDeviceOnboarding from "./Component/AddDeviceOnboading";
import { fetchDeviceOnboardingTableHandler } from "./service/DeviceOnboarding.service";
import EditIcon from "@mui/icons-material/Edit";
import { store } from "../../../utils/store";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import ExportCSV from "../../../global/components/ExportCSV";
import UploadAssetGroup from "./Component/UploadAsset/UploadAssetModal";
import { useLocation } from "react-router-dom";

const DeviceOnboarding = () => {
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
  const [uploadAsset, setUploadAsset] = useState(false);
  const location = useLocation();
  const title =
    location.pathname === "/device-list" ? "Device List" : "Device Onboarding";
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
  const uploadAssetModalClose = () => {
    setUploadAsset(false);
  };

  const uploadAssetGroupModal = () => {
    return (
      <UploadAssetGroup
        showDialog={uploadAsset}
        handleDialogClose={uploadAssetModalClose}
        getAssetAssingmentDetailTable={() => {}}
      />
    );
  };

  const fetchDeviceOnboardingData = async () => {
    try {
      setIsLoading(true);
      const res = await fetchDeviceOnboardingTableHandler({
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

  const addUserButton = () => {
    return (
      <CustomButton
        id="users_add_button"
        label={"Onboard Device"}
        onClick={() => setAddUserDialogHandler(true)}
        customClasses={{
          width: "170px",
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

        <Stack
          direction={{ sm: "row", xs: "column" }}
          alignItems={{ sm: "center" }}
          spacing={1}
        >
          {/* {getSearchBar()} */}
          <CustomButton
            id="groups_download_template_button"
            label="Download&nbsp;Template"
            onClick={ExportCSV(
              ["imei,accountId,simno,businessmodel,location"],
              "deviceassignment"
            )}
            customClasses={{
              width: "200px",
            }}
          />
          <CustomButton
            id="groups_download_template_button"
            label="Upload Bulk Device"
            onClick={() => {
              setUploadAsset(true);
            }}
            customClasses={{
              width: "200px",
            }}
          />
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
          px={4}
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
        {uploadAssetGroupModal()}
      </Grid>

      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};
export default React.memo(DeviceOnboarding);
