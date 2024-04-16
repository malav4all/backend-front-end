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
import {
  CustomAppHeader,
  CustomButton,
  CustomInput,
  CustomTable,
} from "../../global/components";
import alertConfigStyles from "./AlertConfig.styles";
import SearchIcon from "@mui/icons-material/Search";
import {
  getRelativeFontSize,
  primaryHeadingColor,
  boldFont,
} from "../../utils/styles";
import { debounceEventHandler } from "../../helpers/methods";
import strings from "../../global/constants/StringConstants";

import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import { UserData, alertConfigTableHeader } from "./AlertConfig.helpers";
import LockResetIcon from "@mui/icons-material/LockReset";

const AlertConfig = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userDataSource, setUserDataSource] = useState<UserData[]>([]);
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
  const [perPageData, setPerPageData] = useState<Number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [searchCampaigner, setSearchCampaigner] = useState<string>("");
  const [count, setCount] = useState(1);

  const [searchAlertConfig, setSearchAlertConfig] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [addFilterDialogHandler, setAddFilterDialogHandler] = useState(false);

  const classes = alertConfigStyles;
  const getHeader = () => {
    return (
      <Box>
        <Typography sx={classes.mainCardHeading}>Alert Config</Typography>
      </Box>
    );
  };
  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      setSearchAlertConfig(SearchEvent.target.value.trim());
      setPage(1);
      setRowsPerPage(10);
    } else {
      setSearchAlertConfig("");
    }
  };
  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search here..."
        id="alertConfig_search_field"
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
  const addFilterButton = () => {
    return (
      <CustomButton
        id="users_add_button"
        label={"Filter"}
        onClick={() => setAddFilterDialogHandler(true)}
        customClasses={{
          width: "150px",
        }}
      />
    );
  };

  const tableDataShowHandler = (usersData: any) => {
    const source = usersData.map((usersData: any, index: number) => {
      return {
        name: usersData?.name,
        imei: usersData?.imei,
        geozoneIn: usersData?.geozoneIn,
        geozoneOut: usersData?.geozoneOut,
      };
    });
    setUserDataSource([...source]);
  };

  const handleSearchChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setSearchPageNumber(newPage);
  };

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

  const campaignerTable = () => {
    return (
      <Box id="users_display_table" sx={classes.campaignerTable}>
        <CustomTable
          headers={alertConfigTableHeader}
          rows={userDataSource}
          paginationCount={count}
          // handleRowClick={updateUserDetails}
          handlePageChange={
            searchCampaigner ? handleSearchChangePage : handleChangePage
          }
          pageNumber={searchCampaigner ? searchPageNumber : pageNumber}
          setPage={searchCampaigner ? setSearchPageNumber : setPageNumber}
          isLoading={isLoading}
          handlePerPageData={handlePerPageData}
          perPageData={perPageData}
          // rowsPerPage={perPageData}
          isExportCSV={true}
          // onClickExportCSV={handleDownload}
        />
      </Box>
    );
  };

  return (
    <>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <CustomAppHeader
            className={{
              backgroundColor: "#f1edff",
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
        </Grid>

        <Grid item padding={2} sx={{ display: "flex", justifyContent: "end" }}>
          <Box>{addFilterButton()}</Box>
        </Grid>

        <Grid item padding={2}>
          <Box>{campaignerTable()}</Box>
        </Grid>
      </Grid>
      <CustomLoader isLoading={isLoading} />
    </>
  );
};

export default AlertConfig;
