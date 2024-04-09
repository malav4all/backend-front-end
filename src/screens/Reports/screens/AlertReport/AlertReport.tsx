import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { searchAlertReport } from "./service/alertReport.service";

import strings from "../../../../global/constants/StringConstants";
import {
  debounceEventHandler,
  openErrorNotification,
} from "../../../../helpers/methods";
import {
  CustomAppHeader,
  CustomInput,
  CustomTable,
} from "../../../../global/components";
import { boldFont, primaryHeadingColor } from "../../../../utils/styles";
import CustomLoader from "../../../../global/components/CustomLoader/CustomLoader";
import { useTitle } from "../../../../utils/UseTitle";
import { options, reportTableHeader } from "../../Report.helper";
import reportStyles from "../../Report.styles";
import { useSubscription } from "@apollo/client";
import { FETCH_REPORT_DETAIL } from "./service/alertReport.mutation";
import { alertReportStyles } from "./AlertReport.styles";

const AlertReport = () => {
  useTitle("Alert Report");
  const classes = alertReportStyles;
  const [isLoading, setIsLoading] = useState(false);

  const [alertReportDataSource, setAlertReportDataSource] = useState<any>([]);
  const [searchCampaigner, setSearchCampaigner] = useState<string>("");
  const [count, setCount] = useState(1);

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [perPageData, setPerPageData] = useState(10);
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);

  const topicData = [
    {
      event: "other",
      imei: "937066712051",
      label: "937066712051",
      lat: 28.495638,
      lng: 77.078944,
      message: "Device generated alert. Source G-310-20221207-0001",
      mode: "DEVICE",
      source: "G-310-20221207-0001",
    },
    {
      event: "other",
      imei: "937066712051",
      label: "937066712051",
      lat: 28.495638,
      lng: 77.078944,
      message: "Device generated alert. Source G-310-20221207-0001",
      mode: "DEVICE",
      source: "G-310-20221207-0001",
    },
    {
      event: "other",
      imei: "937066712051",
      label: "937066712051",
      lat: 28.495638,
      lng: 77.078944,
      message: "Device generated alert. Source G-310-20221207-0001",
      mode: "DEVICE",
      source: "G-310-20221207-0001",
    },
    {
      event: "other",
      imei: "937066712051",
      label: "937066712051",
      lat: 28.495638,
      lng: 77.078944,
      message: "Device generated alert. Source G-310-20221207-0001",
      mode: "DEVICE",
      source: "G-310-20221207-0001",
    },
    {
      event: "other",
      imei: "937066712051",
      label: "937066712051",
      lat: 28.495638,
      lng: 77.078944,
      message: "Device generated alert. Source G-310-20221207-0001",
      mode: "DEVICE",
      source: "G-310-20221207-0001",
    },
    {
      event: "other",
      imei: "937066712051",
      label: "937066712051",
      lat: 28.495638,
      lng: 77.078944,
      message: "Device generated alert. Source G-310-20221207-0001",
      mode: "DEVICE",
      source: "G-310-20221207-0001",
    },
    {
      event: "other",
      imei: "937066712051",
      label: "937066712051",
      lat: 28.495638,
      lng: 77.078944,
      message: "Device generated alert. Source G-310-20221207-0001",
      mode: "DEVICE",
      source: "G-310-20221207-0001",
    },
  ];

  const { data } = useSubscription(FETCH_REPORT_DETAIL, {
    variables: { topic: "alerts/#" },
  });

  useEffect(() => {
    if (searchCampaigner) {
      getSearchData();
    } else {
      fetchAlertReportHandler();
    }
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

  const tableDataShowHandler = (alertReportsData: any) => {
    const source = alertReportsData?.map(
      (alertReportsData: any, index: number) => {
        return {
          event: alertReportsData?.event,
          imei: alertReportsData?.imei,
          label: alertReportsData?.label,
          lat: alertReportsData?.lat,
          lng: alertReportsData?.lng,
          message: alertReportsData?.message,
          mode: alertReportsData?.mode,
          source: alertReportsData?.source,
        };
      }
    );
    setAlertReportDataSource([...source]);
  };

  const fetchAlertReportHandler = async () => {
    try {
      // const res = await fetchAlertReports();
      tableDataShowHandler(topicData);
      // setCount(res?.userListAll?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
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
          headers={reportTableHeader}
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
        <Grid
          item
          xs={12}
          md={7}
          lg={4}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Select
              id="Dashboard_Interval_Dropdown"
              sx={classes.dropdown}
              value={"Past 24hr"}
              onChange={(event: any) => {}}
            >
              {options.map((data) => (
                <MenuItem
                  key={data.label}
                  value={data.value}
                  sx={classes.dropdownOptions}
                >
                  {data.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>
        <Stack
          direction={{ sm: "row", xs: "column" }}
          alignItems={{ sm: "center" }}
          spacing={1}
        >
          {getSearchBar()}
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
      </Box>
      <CustomLoader isLoading={isLoading} />
    </Box>
  );

  return getAlertReport();
};

export default AlertReport;
