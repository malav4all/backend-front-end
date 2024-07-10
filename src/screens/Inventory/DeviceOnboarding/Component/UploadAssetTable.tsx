import {
  Box,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CustomButton,
  CustomDialog,
  CustomTable,
} from "../../../../global/components";

import { store } from "../../../../utils/store";
import { fetchJourney } from "../../../Journey/service/journey.service";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../../helpers/methods";
import AssetAssingmentStyles from "../../../Settings/AssertAssingment/AssetAssingment.styles";
import { bulkDeviceUpload } from "../service/DeviceOnboarding.service";

interface Props {
  showDialog: boolean;
  handleDialogClose: Function;
  tableData?: any;
  getAssetAssingmentDetailTable: any;
}

const UploadTableAsset = (props: Props) => {
  const classes = AssetAssingmentStyles;
  const [tableData, setTableData] = useState<any>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setTableData(props.tableData);
  }, [props.tableData]);

  const getDialogTitle = () => {
    return <Box sx={classes.mainHeader}>Uploaded Device Assignment List</Box>;
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const dataRender = () => {
    const startIndex = (page - 1) * 5;
    const endIndex = startIndex + 5;
    return tableData
      ?.slice(startIndex, endIndex)
      ?.map((item: any, index: number) => {
        return {
          location: item?.location,
          accountId: item.accountId,
          deviceOnboardingSimNo: item.simno,
          deviceOnboardingIMEINumber: item.imei,
          businessModel: item.businessModel,
          createdBy: store.getState().auth.userName,
        };
      });
  };

  const getDialogBody = () => {
    return (
      <Grid xs={12} sm={12} md={12} lg={12}>
        <CustomTable
          headers={[
            { name: "Imei", field: "deviceOnboardingIMEINumber" },
            { name: "accountId", field: "location" },
            { name: "Sim No", field: "deviceOnboardingSimNo" },
            { name: "Business Model", field: "businessmodel" },
            { name: "EnteredBy", field: "createdBy" },
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

  const bulkDeviceUploadHandler = async () => {
    try {
      const payload = tableData.map((item: any) => {
        return {
          location: item?.location,
          accountId: item.accountId,
          deviceOnboardingSimNo: [item.simno?.toString()],
          deviceOnboardingIMEINumber: item.imei.toString(),
          businessModel: item.businessModel,
          createdBy: store.getState().auth.userName,
        };
      });
      const res = await bulkDeviceUpload({
        input: payload,
      });
      props.handleDialogClose(false);
      openSuccessNotification(res?.bulkUploadDeviceAssignment?.message);
      await props.getAssetAssingmentDetailTable?.();
    } catch (error: any) {
      openErrorNotification(error.message);
    }
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
