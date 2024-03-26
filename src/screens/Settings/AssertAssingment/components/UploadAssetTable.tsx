import { Box, Grid, MenuItem, Select, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CustomButton,
  CustomDialog,
  CustomTable,
} from "../../../../global/components";
import AssetAssingmentStyles from "../AssetAssingment.styles";
import { assetAssingmentTableHeader } from "../AssetAssingmentTypeAndValidation";
import { store } from "../../../../utils/store";
import { fetchJourney } from "../../../Journey/service/journey.service";
import { openErrorNotification } from "../../../../helpers/methods";

interface Props {
  showDialog: boolean;
  handleDialogClose: Function;
  tableData?: any;
}

const UploadTableAsset = (props: Props) => {
  const classes = AssetAssingmentStyles;
  const [journeyData, setJourneyData] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setTableData(
      props.tableData.map((item: any) => ({
        ...item,
        journey: "",
      }))
    );
  }, [props.tableData]);

  useEffect(() => {
    fetchJourneyData();
  }, []);

  const fetchJourneyData = async () => {
    try {
      const res = await fetchJourney({
        input: {
          page: -1,
          limit: 0,
        },
      });
      setJourneyData(res.fetchJourney.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const getDialogTitle = () => {
    return <Box sx={classes.mainHeader}>Uploaded Asset</Box>;
  };

  const handleSelectJourneyStatus = (event: any, index: any) => {
    const selectedJourneyId = event.target.value;
    const updatedTableData = [...tableData];
    updatedTableData[index].journey = selectedJourneyId;
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
      .slice(startIndex, endIndex)
      .map((item: any, index: number) => {
        const filteredJourneyData = journeyData.filter(
          (journey: any) => journey._id !== item.journey
        );
        return {
          imei: item["IMEI_NUMBER"],
          labelName: item["LABEL_NAME"],
          journey: (
            <>
              <Stack direction="column">
                <Select
                  sx={classes.dropDownStyle}
                  id="add_user_status_dropdown"
                  name="journey"
                  value={item.journey}
                  onChange={(event) => handleSelectJourneyStatus(event, index)}
                  renderValue={(selectedValue) => {
                    const selectedItem = journeyData.find(
                      (item: any) => item._id === selectedValue
                    );
                    return selectedItem
                      ? selectedItem.journeyName
                      : "Select Journey";
                  }}
                  MenuProps={classes.menuProps}
                  displayEmpty
                >
                  {filteredJourneyData.map(
                    (journeyItem: any, journeyIndex: any) => (
                      <MenuItem
                        key={journeyIndex}
                        value={journeyItem._id}
                        sx={classes.dropDownOptionsStyle}
                      >
                        {journeyItem.journeyName}
                      </MenuItem>
                    )
                  )}
                </Select>
              </Stack>
            </>
          ),
          boxSet: item["BOX_SET"],
          createdBy: store.getState().auth.userName,
        };
      });
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
            onClick={() => {}}
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
