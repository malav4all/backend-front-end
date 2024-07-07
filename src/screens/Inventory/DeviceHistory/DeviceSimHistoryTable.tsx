import React, { useEffect, useState } from "react";
import { CustomAppHeader, CustomTable } from "../../../global/components";
import { Box, Grid, Typography } from "@mui/material";
import DeviceHistoryStyles from "./DeviceHistory.style";
import {
  deviceOnboardingHistory,
  deviceSimHistory,
} from "./DeviceHistory.helper";
import {
  fetchDeviceOnboardingHistory,
  fetchDeviceSimHistory,
} from "./service/DeviceOnboarding.service";
import moment from "moment";
import { openErrorNotification } from "../../../helpers/methods";

const DeviceSimHistory = () => {
  const classes = DeviceHistoryStyles;
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchDeviceSimHistoryHandler();
  }, [rowsPerPage, page]);

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
        deviceOnboardingSimNo: item.deviceOnboardingSimNo
          ?.map((val: any) => val)
          .join("-"),
        deviceOnboardingIMEINumber: item.deviceOnboardingIMEINumber,
        fromDate: moment(item?.deviceOnboardingDate).format(
          "DD-MM-YYYY hh:mm:ss A"
        ),
        toDate: moment(item?.deviceDeboardingDate).format(
          "DD-MM-YYYY hh:mm:ss A"
        ),
        createdBy: item?.createdBy,
        updatedBy: item?.updatedBy,
      };
    });
    return data;
  };

  const fetchDeviceSimHistoryHandler = async () => {
    try {
      const res = await fetchDeviceSimHistory({
        input: { page, limit: rowsPerPage },
      });
      const data = tableRender(res?.fetchDeviceSimHistoryList?.data);
      setCount(res?.fetchDeviceSimHistoryList?.paginatorInfo?.count);
      setTableData(data);
    } catch (error: any) {
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
          // padding: "20px",
        }}
      >
        <CustomTable
          headers={deviceSimHistory}
          rows={tableData}
          size={[5]}
          handlePageChange={handleChangePage}
          handleRowsPerPage={handlePerPageData}
          paginationCount={count}
          rowsPerPage={rowsPerPage}
          pageNumber={page}
          setPage={setPage}
          handlePerPageData={handlePerPageData}
          perPageData={rowsPerPage}
        />
      </Box>
    );
  };
  return (
    <>
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
    </>
  );
};

export default React.memo(DeviceSimHistory);
