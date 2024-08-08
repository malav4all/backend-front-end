import React, { ChangeEvent, useEffect, useState } from "react";
import {
  CustomAppHeader,
  CustomButton,
  CustomInput,
  CustomTable,
} from "../../global/components";
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
  getRelativeFontSize,
  primaryHeadingColor,
  boldFont,
  headerColor,
} from "../../utils/styles";
import { PiPencilSimpleBold } from "react-icons/pi";
import SearchIcon from "@mui/icons-material/Search";
import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
} from "../../helpers/methods";

import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import strings from "../../global/constants/StringConstants";

import deviceGroupStyles from "./DeviceGroup.styles";
import {
  fetchDeviceGroup,
  searchDeviceGroup,
} from "./service/DeviceGroup.service";
import notifiers from "../../global/constants/NotificationConstants";
import { deviceGroupTableHeader } from "./DeviceGroupTypeAndValidation";
import AddDeviceGroup from "./components/AddDeviceGroup/AddDeviceGroup";
import EditIcon from "@mui/icons-material/Edit";
import history from "../../utils/history";
import { hasAccessTo } from "../../utils/AuthorizationManager";

const DeviceGroup = () => {
  const theme = useTheme();
  const classes = deviceGroupStyles(theme);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
  const [searchDeviceGroups, setSearchDeviceGroups] = useState<any>("");
  const [addDeviceGroupDialogHandler, setAddDeviceGroupDialogHandler] =
    useState(false);
  const [deviceGroupData, setDeviceGroupData] = useState<any>([]);
  const [selectedDeviceGroupRowData, setSelectedDeviceGroupRowData] =
    useState<any>({});

  const [roles, setRoles] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (searchDeviceGroups) {
      getSearchData();
    } else {
      getDeviceGroupData();
    }
  }, [searchDeviceGroups, page, rowsPerPage, searchPageNumber]);

  const handleSearchChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setSearchPageNumber(newPage);
  };

  const getRedirectionUrl = (_id: any) => {
    return history.push(`/device-group/view/${_id}`);
  };

  const tableRender = (tableData: any) => {
    const data = tableData?.map((item: any, index: number) => {
      return {
        key: item._id,
        deviceGroupName: (
          <>
            <Tooltip
              title="Show Imei List"
              placement="top"
              arrow
              onClick={() => {
                getRedirectionUrl(item?._id);
              }}
              sx={{
                color: theme.palette.text.primary,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  display: "inline-block",
                  color: theme.palette.text.primary,
                  fontSize: "13px",
                  "&:hover": {
                    borderBottom: `1px solid ${theme.palette.primary.main}`,
                    color: theme.palette.text.primary,
                  },
                }}
              >
                {item?.deviceGroupName}
              </Typography>
            </Tooltip>
          </>
        ),
        createdBy: (
          <Typography
            sx={{
              color: theme.palette.text.primary,
            }}
          >
            {item?.createdBy}
          </Typography>
        ),
        action: (
          <>
            <Tooltip
              title="Edit"
              onClick={() => {
                editDeviceGroup(item);
              }}
              sx={{
                color: theme.palette.text.primary,
              }}
            >
              <PiPencilSimpleBold
                style={{
                  margin: "0px 8px -7px 0px",
                  cursor: "pointer",
                  color: headerColor,
                  fontSize: "20px",
                }}
              />
            </Tooltip>
          </>
        ),
      };
    });
    setDeviceGroupData([...data]);
  };

  const getHeader = () => {
    return (
      <Box>
        <Typography sx={{ ...classes.mainCardHeading, color: "white" }}>
          Device Group
        </Typography>
      </Box>
    );
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handlePerPageData = (event: any) => {
    setPage(1);
    setSearchPageNumber(1);
    setRowsPerPage(event?.target?.value);
  };

  const getDeviceGroupData = async () => {
    try {
      setIsLoading(true);
      const res = await fetchDeviceGroup({
        input: {
          accountId: "IMZ113343",
          page: page,
          limit: rowsPerPage,
        },
      });
      tableRender(res?.fetchDeviceGroup?.data);
      setCount(res?.fetchDeviceGroup?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
      setIsLoading(false);
    }
  };

  const getSearchData = async () => {
    try {
      setIsLoading(true);
      const res = await searchDeviceGroup({
        input: {
          search: searchDeviceGroups,
          page: 1,
          limit: 10,
        },
      });
      tableRender(res?.searchDeviceGroup?.data);
      setCount(res?.searchDeviceGroup?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      setSearchDeviceGroups(SearchEvent.target.value.trim());
      setPage(1);
      setRowsPerPage(10);
    } else {
      setSearchDeviceGroups("");
    }
  };
  const editDeviceGroup = React.useCallback(
    (rowdata: any) => {
      setAddDeviceGroupDialogHandler(true);
      setSelectedDeviceGroupRowData(rowdata);
      setEdit(true);
    },
    [edit]
  );
  const closeAddDeviceGroupDialogHandler = () => {
    setAddDeviceGroupDialogHandler(false);
    setSelectedDeviceGroupRowData(null);
  };

  const addDeviceGroupDailogBox = () => {
    return (
      <AddDeviceGroup
        openAddDeviceGroupDialog={addDeviceGroupDialogHandler}
        handleCloseAddDeviceGroupDialog={closeAddDeviceGroupDialogHandler}
        roles={roles}
        tableData={getDeviceGroupData}
        selectedDeviceGroupRowData={selectedDeviceGroupRowData}
        isLoading={isLoading}
        edit={edit}
        setEdit={setEdit}
      />
    );
  };

  const getCustomTable = () => {
    return (
      <Box
        id="campaign_history_display_table"
        sx={{
          minWidth: "300px",
          width: "100%",
          overflow: "auto",
        }}
      >
        <CustomTable
          headers={deviceGroupTableHeader}
          rows={deviceGroupData}
          size={[5]}
          handlePageChange={
            searchDeviceGroups ? handleSearchChangePage : handleChangePage
          }
          handleRowsPerPage={handlePerPageData}
          paginationCount={count}
          pageNumber={page}
          setPage={setPage}
          handlePerPageData={handlePerPageData}
          perPageData={rowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </Box>
    );
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search Device Group"
        id="deviceGroup_search_field"
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

  const addDeviceGroupButton = () => {
    return (
      <CustomButton
        id="deviceGroup_add_button"
        label={"Add Group"}
        onClick={() => setAddDeviceGroupDialogHandler(true)}
        customClasses={{
          width: "150px",
        }}
      />
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

      <Box
        sx={{ display: "flex", justifyContent: "flex-end", flexWrap: "wrap" }}
        mt={2}
        mr={2}
      >
        {addDeviceGroupButton()}
      </Box>

      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        sx={classes.mainSection}
      >
        {addDeviceGroupDailogBox()}
        {getCustomTable()}
        <CustomLoader isLoading={isLoading} />
      </Grid>
    </Box>
  );
};

export default React.memo(DeviceGroup);
