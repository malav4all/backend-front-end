import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Chip,
  Grid,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import alertReportsStyles from "./AlertReport.styles";

import SearchIcon from "@mui/icons-material/Search";

import LockResetIcon from "@mui/icons-material/LockReset";

import {
  fetchAlertReportDataHandler,
  searchAlertReport,
} from "./service/alertReport.service";

import strings from "../../../../global/constants/StringConstants";
import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
} from "../../../../helpers/methods";
import notifiers from "../../../../global/constants/NotificationConstants";
import {
  CustomAppHeader,
  CustomButton,
  CustomInput,
  CustomTable,
} from "../../../../global/components";
import { boldFont, primaryHeadingColor } from "../../../../utils/styles";
import CustomLoader from "../../../../global/components/CustomLoader/CustomLoader";
import { RowData, UserData } from "../../../../models/interfaces";
import EditIcon from "@mui/icons-material/Edit";
import { useTitle } from "../../../../utils/UseTitle";
import AddAlertReport from "./components/AddUser/AddAlertReport";
import { alertReportTableHeader } from "./UserTypeAndValidation";

const AlertReport = () => {
  useTitle(strings.AlertReportTitle);
  const classes = alertReportsStyles;
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [addAlertReportDialogHandler, setAddAlertReportDialogHandler] =
    useState(false);

  const [updateAlertReportDialogHandler, setUpdateAlertReportDialogHandler] =
    useState(false);
  const [alertReportDataSource, setAlertReportDataSource] = useState<
    UserData[]
  >([]);
  const [searchCampaigner, setSearchCampaigner] = useState<string>("");
  const [roles, setRoles] = useState([]);
  const [count, setCount] = useState(1);
  const [selectedRowData, setSelectedRowData] = useState<RowData>({
    emailId: "",
    assignBy: "",
    allowedEmailCount: "",
    title: "",
  });
  const [selectedAlertReportRowData, setSelectedAlertReportRowData] =
    useState<any>({});
  const [selectedEmailData, setSelectedEmailData] = useState<any>({
    email: "",
  });

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [perPageData, setPerPageData] = useState(10);
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
  const [activeCampaigner, setActiveCampaigner] = useState<any>([]);
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  useEffect(() => {
    if (searchCampaigner === "") {
      setPageNumber(1);
      setSearchPageNumber(1);
      setPerPageData(10);
    }
  }, [searchCampaigner, searchPageNumber]);

  useEffect(() => {
    if (searchCampaigner) {
      getSearchData();
    } else {
      getAlertReportDetailTable();
    }
  }, [searchCampaigner, pageNumber, perPageData, searchPageNumber]);

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

  const tableDataShowHandler = (alertReportsData: any) => {
    const source = alertReportsData.map(
      (alertReportsData: any, index: number) => {
        return {
          email: (
            <Typography key={alertReportsData._id} sx={classes.rowColor}>
              {alertReportsData.email}
            </Typography>
          ),
          firstName: alertReportsData?.firstName,
          mobileNumber: alertReportsData?.mobileNumber,
          createdBy: alertReportsData?.createdBy,
          roleId: alertReportsData?.roleId,
          status: (
            <Chip
              label={alertReportsData.status}
              sx={{
                backgroundColor:
                  alertReportsData.status === "Active" ? "#DFFFF3" : "grey",
                color:
                  alertReportsData.status === "Active" ? "#37b071" : "white",
                border:
                  alertReportsData.status === "Active"
                    ? "1px solid #37b071"
                    : "1px solid white",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": {
                    transform: "scale(1)",
                    opacity: 1,
                  },
                  "50%": {
                    transform: "scale(1.05)",
                    opacity: 0.75,
                  },
                  "100%": {
                    transform: "scale(1)",
                    opacity: 1,
                  },
                },
              }}
              variant="filled"
            />
          ),
          action: (
            <>
              <Tooltip title="Change Password">
                <LockResetIcon
                  htmlColor={"#5F22E2"}
                  style={{ margin: "0px 8px -7px 0px", cursor: "pointer" }}
                  onClick={() => {
                    setChangePasswordModal(true);
                    setSelectedEmailData(alertReportsData.email);
                  }}
                />
              </Tooltip>
              <Tooltip
                title="Edit"
                onClick={() => {
                  editAlertReport(alertReportsData);
                }}
              >
                <EditIcon
                  htmlColor={"#5F22E2"}
                  style={{ margin: "0px 8px -7px 0px", cursor: "pointer" }}
                />
              </Tooltip>
            </>
          ),
        };
      }
    );
    setAlertReportDataSource([...source]);
  };

  const editAlertReport = React.useCallback(
    (rowdata: any) => {
      setAddAlertReportDialogHandler(true);
      setSelectedAlertReportRowData(rowdata);
      setEdit(true);
    },
    [edit]
  );

  const getAlertReportDetailTable = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAlertReportDataHandler({
        input: {
          page: pageNumber,
          limit: perPageData,
        },
      });
      tableDataShowHandler(res?.alertReportListAll?.data);
      setCount(res?.alertReportListAll?.paginatorInfo?.count);
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
      const res = await searchAlertReport({
        input: {
          search: searchCampaigner,
          page: pageNumber,
          limit: perPageData,
        },
      });
      tableDataShowHandler(res?.searchAlertReport?.data);
      setCount(res?.searchAlertReport?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const getHeader = () => {
    return (
      <Box>
        <Typography sx={classes.mainCardHeading}>Alert Report</Typography>
      </Box>
    );
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
        placeHolder="Search here ..."
        id="alertReports_search_field"
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

  const addAlertReportButton = () => {
    return (
      <CustomButton
        id="alertReports_add_button"
        label={"Add AlertReport"}
        onClick={() => setAddAlertReportDialogHandler(true)}
        customClasses={{
          width: "150px",
        }}
      />
    );
  };

  const addAlertReportDialogBox = () => {
    return (
      <AddAlertReport
        openAddUserDialog={addAlertReportDialogHandler}
        handleCloseAddUserDialog={closeAddAlertReportDialogHandler}
        managerMail={activeCampaigner}
        roles={roles}
        tableData={getAlertReportDetailTable}
        selectedUserRowData={selectedAlertReportRowData}
        isLoading={isLoading}
        edit={edit}
        setEdit={setEdit}
      />
    );
  };

  const closeAddAlertReportDialogHandler = () => {
    setAddAlertReportDialogHandler(false);
    setSelectedAlertReportRowData(null);
  };

  const updateDialogCloseHandler = () => {
    setUpdateAlertReportDialogHandler(false);
  };

  const handleSearchChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setSearchPageNumber(newPage);
  };
  const handleDownload = async () => {};

  const campaignerTable = () => {
    return (
      <Box id="alertReports_display_table" sx={classes.campaignerTable}>
        <CustomTable
          headers={alertReportTableHeader}
          rows={alertReportDataSource}
          paginationCount={count}
          // handleRowClick={updateAlertReportDetails}
          handlePageChange={
            searchCampaigner ? handleSearchChangePage : handleChangePage
          }
          pageNumber={searchCampaigner ? searchPageNumber : pageNumber}
          setPage={searchCampaigner ? setSearchPageNumber : setPageNumber}
          isLoading={isLoading}
          handlePerPageData={handlePerPageData}
          perPageData={perPageData}
          rowsPerPage={perPageData}
          isExportCSV={false}
          onClickExportCSV={handleDownload}
        />
      </Box>
    );
  };

  const getAlertReport = () => (
    <Box>
      <CustomAppHeader
        className={{
          backgroundColor: "#f1edff",
          padding: "10px 20px 15px 18px",
        }}
      >
        <Stack
          px={4}
          py={4}
          direction={{ lg: "row", xs: "column" }}
          justifyContent="space-between"
          alignItems={{ lg: "center" }}
        >
          <Typography
            sx={{
              ...boldFont,
              color: primaryHeadingColor,
            }}
          >
            {getHeader()}
          </Typography>
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
            ...boldFont,
            color: primaryHeadingColor,
          }}
        ></Typography>

        <Stack
          direction={{ sm: "row", xs: "column" }}
          alignItems={{ sm: "center" }}
          spacing={1}
        >
          {getSearchBar()}
          {addAlertReportButton()}
        </Stack>
      </Stack>

      <Box
        sx={{
          minWidth: "300px",
          overflow: "auto",
          padding: "30px",
        }}
      >
        {campaignerTable()}
        {addAlertReportDialogBox()}
      </Box>
      <CustomLoader isLoading={isLoading} />
    </Box>
  );

  return getAlertReport();
};

export default AlertReport;
