import React, { useEffect, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import DeviceHistoryStyles from "./DeviceHistory.style";
import { deviceOnboardingHistory } from "./DeviceHistory.helper";
import { fetchDeviceOnboardingHistory } from "./service/DeviceOnboarding.service";
import moment from "moment";
import DeviceSimHistoryTable from "./DeviceSimHistoryTable";
import { openErrorNotification } from "../../../helpers/methods";
import { CustomAppHeader, CustomTable } from "../../../global/components";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import { boldFont, headerColor, primaryHeadingColor, getRelativeFontSize } from "../../../utils/styles";

const DeviceHistory = () => {
  const classes = DeviceHistoryStyles;
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDeviceOnboardingHistoryHandler();
  }, [rowsPerPage, page]);

  const getHeader = () => {
    return (
      <Box>
        <Typography sx={{ ...classes.mainCardHeading, color: "white" }}>
          Device Module
        </Typography>
      </Box>
    );
  };
  
  const handlePerPageData = (event: any) => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const tableRender = (tableData: any) => {
    const data = tableData.map((item: any, index: number) => {
      return {
        accountName: item?.deviceOnboardingAccount.accountName,
        deviceOnboardingSimNo: item.deviceOnboardingSimNo
          ?.map((val: any) => val)
          .join("-"),
        deviceOnboardingIMEINumber: item.deviceOnboardingIMEINumber,
        deviceOnboardingDate: moment(item?.deviceOnboardingDate).format(
          "DD-MM-YYYY hh:mm:ss A"
        ),
        deviceDeboardingDate:
          item?.deviceDeboardingDate &&
          moment(item?.deviceDeboardingDate).format("DD-MM-YYYY hh:mm:ss A"),
        createdBy: item?.createdBy,
        updatedBy: item?.updatedBy,
      };
    });
    return data;
  };

  const fetchDeviceOnboardingHistoryHandler = async () => {
    try {
      setIsLoading(true);
      const res = await fetchDeviceOnboardingHistory({
        input: { page, limit: rowsPerPage },
      });
      const data = tableRender(res?.fetchDeviceOnboardingHistoryList?.data);
      setCount(res?.fetchDeviceOnboardingHistoryList?.paginatorInfo?.count);
      setTableData(data);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      openErrorNotification(error.message);
    }
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
          headers={deviceOnboardingHistory}
          rows={tableData}
          size={[5]}
          handlePageChange={handleChangePage}
          handleRowsPerPage={handlePerPageData}
          paginationCount={count}
          // rowsPerPage={rowsPerPage}
          pageNumber={page}
          setPage={setPage}
          handlePerPageData={handlePerPageData}
          perPageData={rowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </Box>
    );
  };
  return (
    <>
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
        {getCustomTable()}
      </Grid>

      <Box mr={4}>
        <Typography sx={classes.mainCardHeading}>Device Sim History</Typography>
      </Box>
      <DeviceSimHistoryTable />
      <CustomLoader isLoading={isLoading} />
    </>
  );
};

export default React.memo(DeviceHistory);
