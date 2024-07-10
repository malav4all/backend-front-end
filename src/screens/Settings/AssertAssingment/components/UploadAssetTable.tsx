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
import AssetAssingmentStyles from "../AssetAssingment.styles";
import {
  assetAssingmentTableHeader,
  validateBulkRoutesUploadForm,
} from "../AssetAssingmentTypeAndValidation";
import { store } from "../../../../utils/store";
import { fetchRoutes } from "../../../Routes/service/routes.service";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../../helpers/methods";
import { bulkRoutesUpload } from "../service/AssetAssingment.service";

interface Props {
  showDialog: boolean;
  handleDialogClose: Function;
  tableData?: any;
  getAssetAssingmentDetailTable: any;
}

const UploadTableAsset = (props: Props) => {
  const classes = AssetAssingmentStyles;
  const [routesData, setRoutesData] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setTableData(
      props.tableData.map((item: any) => ({
        ...item,
        routes: {
          value: "",
          error: "",
        },
        createdBy: store.getState().auth.userName,
      }))
    );
  }, [props.tableData]);

  useEffect(() => {
    fetchRoutesData();
  }, []);

  const fetchRoutesData = async () => {
    try {
      const res = await fetchRoutes({
        input: {
          page: -1,
          limit: 10,
        },
      });
      setRoutesData(res.fetchRoutes.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const getDialogTitle = () => {
    return <Box sx={classes.mainHeader}>Uploaded Asset</Box>;
  };

  const handleSelectRoutesStatus = (event: any, index: any) => {
    const selectedRoutesId = event.target.value;
    const updatedTableData = [...tableData];
    updatedTableData[index].routes.value = selectedRoutesId;
    updatedTableData[index].routes.error = "";
    setTableData(updatedTableData);
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
        const filteredRoutesData = routesData?.filter(
          (routes: any) => routes._id !== item?.routes
        );
        return {
          imei: Number(item?.imei),
          labelName: item?.labelName,
          routes: (
            <>
              <Stack direction="column">
                <Select
                  sx={classes.dropDownStyle}
                  id="add_user_status_dropdown"
                  name="routes"
                  value={item?.routes.value}
                  onChange={(event) => handleSelectRoutesStatus(event, index)}
                  renderValue={(selectedValue) => {
                    const selectedItem = routesData?.find(
                      (item: any) => item._id === selectedValue
                    );
                    return selectedItem
                      ? selectedItem.routesName
                      : "Select Routes";
                  }}
                  MenuProps={classes.menuProps}
                  displayEmpty
                  error={
                    !isTruthy(tableData[0].routes?.value) &&
                    tableData[0]?.routes?.error
                  }
                >
                  {filteredRoutesData.map(
                    (routesItem: any, routesIndex: any) => (
                      <MenuItem
                        key={routesIndex}
                        value={routesItem._id}
                        sx={classes.dropDownOptionsStyle}
                      >
                        {routesItem.routesName}
                      </MenuItem>
                    )
                  )}
                </Select>
                {tableData[index]?.routes?.error && (
                  <FormHelperText error sx={{ paddingLeft: "5px" }}>
                    {tableData[index]?.routes?.error}
                  </FormHelperText>
                )}
              </Stack>
            </>
          ),
          boxSet: item.boxSet,
          createdBy: store.getState().auth.userName,
        };
      });
  };

  const handleValidation = () => {
    const { errors, isValid }: any = validateBulkRoutesUploadForm(tableData);
    setTableData(errors);
    return isValid;
  };
  const bulkRoutesUploadHandler = async () => {
    const payload = tableData.map((item: any) => ({
      ...item,
      routes: item.routes.value,
    }));

    try {
      if (handleValidation()) {
        const res = await bulkRoutesUpload({
          input: payload,
        });
        props.handleDialogClose(false);
        openSuccessNotification(res?.bulkRoutesUpload?.message);
        await props.getAssetAssingmentDetailTable?.();
      }
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const getDialogBody = () => {
    return (
      <Grid xs={12} sm={12} md={12} lg={12}>
        <CustomTable
          headers={assetAssingmentTableHeader}
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
            onClick={bulkRoutesUploadHandler}
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
