import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CustomButton,
  CustomDialog,
  CustomTable,
} from "../../../../global/components";
import { store } from "../../../../utils/store";
import AssetAssingmentStyles from "../../../Settings/AssertAssingment/AssetAssingment.styles";
import { bulkRoutesDeviceList } from "../../service/add-device.service";
import {
  openErrorNotification,
  openSuccessNotification,
} from "../../../../helpers/methods";

interface Props {
  showDialog: boolean;
  handleDialogClose: Function;
  tableData?: any;
  getAssetAssingmentDetailTable: any;
}

const UploadTableAsset = (props: Props) => {
  const classes = AssetAssingmentStyles;
  const [tableData, setTableData] = useState<any>(props.tableData);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setTableData(props.tableData);
  }, [props.tableData]);

  const getDialogTitle = () => {
    return <Box sx={classes.mainHeader}>Uploaded Device</Box>;
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const bulkDeviceUploadHandler = async () => {
    try {
      const payload = tableData.map((item: any) => {
        return {
          imei: item?.imei?.toString(),
          deviceModelCode: item.deviceModelCode,
          createdBy: store.getState().auth.userName,
        };
      });
      // console.log(payload);
      const res = await bulkRoutesDeviceList({
        input: payload,
      });
      props.handleDialogClose(false);
      openSuccessNotification(res?.bulkUploadDevice?.message);
      await props.getAssetAssingmentDetailTable?.();
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const dataRender = () => {
    const startIndex = (page - 1) * 5;
    const endIndex = startIndex + 5;
    return tableData
      ?.slice(startIndex, endIndex)
      ?.map((item: any, index: number) => {
        return {
          imei: item?.imei?.toString(),
          deviceModelCode: item?.deviceModelCode,
          createdBy: store.getState().auth.userName,
        };
      });
  };

  const getDialogBody = () => {
    return (
      <Grid xs={12} sm={12} md={12} lg={12}>
        <CustomTable
          headers={[
            { name: "IMEI", field: "imei" },
            { name: "Device Model Code", field: "deviceModelCode" },
          ]}
          rows={dataRender()}
          paginationCount={tableData.length}
          rowsPerPage={5}
          pageNumber={page}
          setPage={setPage}
          isRowPerPageEnable={true}
          handlePageChange={handleChangePage}
        />
      </Grid>
    );
  };

  const getDialogFooter = () => {
    return (
      <>
        <Box sx={classes.footerWrapper}>
          <CustomButton
            customClasses={classes.buttonWhiteBg}
            label="Cancel"
            onClick={() => {
              props.handleDialogClose();
            }}
            id="campaign_group_cancel_button"
          />
          <CustomButton
            label="Upload"
            onClick={bulkDeviceUploadHandler}
            id="campaign_group_upload_button"
          />
        </Box>
      </>
    );
  };

  const dialogHeaderContent = () => {
    return <></>;
  };

  return (
    <>
      <CustomDialog
        dialogHeaderContent={dialogHeaderContent()}
        isDialogOpen={props.showDialog}
        closable
        handleDialogClose={props.handleDialogClose}
        dialogTitleContent={getDialogTitle()}
        dialogBodyContent={getDialogBody()}
        dialogFooterContent={getDialogFooter()}
        closeButtonVisibility={true}
        width="800px"
      />
    </>
  );
};

export default React.memo(UploadTableAsset);
