import { Box, FormHelperText, Grid, InputLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import notifiers from "../../../../../global/constants/NotificationConstants";
import { DropzoneAreaBase } from "react-mui-dropzone";
import { ReactComponent as dropZoneDropZone } from "../../../../../assets/icons/dropZoneDropZone.svg";
import { CustomButton, CustomDialog } from "../../../../../global/components";
import UploadGroupModal from "../../../../../assets/images/UploadGroupModal.svg";
import AssetAssingmentStyles from "../../AssetAssingment.styles";
import { uploadGroupField } from "../../AssetAssingmentTypeAndValidation";
import * as XLSX from "xlsx";
import UploadTableAsset from "../UploadAssetTable";

interface CustomProps {
  showDialog: boolean;
  handleDialogClose: Function;
  getAssetAssingmentDetailTable: any;
}

const UploadAssetGroup = (props: CustomProps) => {
  const classes = AssetAssingmentStyles;
  const [formFields, setFormFields] = useState<any>(uploadGroupField());
  const [bulkUpload, setBulkUploadData] = useState<any>([]);
  const [assetTable, setAssetTable] = useState<boolean>(false);

  const getDialogTitle = () => {
    return <Box sx={classes.mainHeader}>Upload Asset</Box>;
  };

  const getParsedCSVColumnNames = async (event: any) => {
    const reader = new FileReader();
    reader.addEventListener("load", (evt: any) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { raw: true });

      if (data.length === 0) {
        alert("Excel sheet has no data.");
        return;
      }

      setBulkUploadData(data);
      setAssetTable(true);
      props.handleDialogClose?.();
    });
    reader.readAsBinaryString(event);
  };

  const getDialogBody = () => {
    return (
      <Grid xs={12} sm={12} md={12} lg={12}>
        <Grid style={{ height: "100px" }}>
          <InputLabel sx={classes.input} shrink>
            Upload File{" "}
            <Box ml={0.4} sx={classes.star}>
              *
            </Box>
          </InputLabel>
          <Box sx={classes.dropZoneHeader}>
            <DropzoneAreaBase
              fileObjects={[]}
              dropzoneText={"Drag files here or select files to upload"}
              acceptedFiles={[".csv", ".xlsx", ".xls"]}
              onAdd={(event: any) => {
                getParsedCSVColumnNames(event[0].file);
              }}
              filesLimit={1}
              showPreviews={true}
              showAlerts={false}
              Icon={dropZoneDropZone}
            />
            {formFields.groupCSV.error && (
              <FormHelperText error sx={classes.errorStyle}>
                {formFields.groupCSV.error}
              </FormHelperText>
            )}
          </Box>
        </Grid>
      </Grid>
    );
  };

  const getDialogFooter = () => {
    return <></>;
  };

  const dialogHeaderContent = () => {
    return (
      <Box display={"flex"}>
        <img src={UploadGroupModal} alt="" />
      </Box>
    );
  };

  const uploadAssetTable = () => {
    return (
      <UploadTableAsset
        showDialog={assetTable}
        handleDialogClose={() => {
          setAssetTable(false);
        }}
        tableData={bulkUpload}
        getAssetAssingmentDetailTable={props.getAssetAssingmentDetailTable}
      />
    );
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
        width="727px"
      />
      {uploadAssetTable()}
    </>
  );
};

export default React.memo(UploadAssetGroup);
