import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomLoader from "../../../../global/components/CustomLoader/CustomLoader";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import {
  CustomAppHeader,
  CustomInput,
  CustomTable,
} from "../../../../global/components";
import strings from "../../../../global/constants/StringConstants";
import {
  debounceEventHandler,
  openErrorNotification,
} from "../../../../helpers/methods";
import SearchIcon from "@mui/icons-material/Search";
import {
  getRelativeFontSize,
  boldFont,
  primaryHeadingColor,
} from "../../../../utils/styles";
import viewDeviceGroupListStyles from "./ViewDeviceGroupList.styles";
import {
  fetchDeviceGroupById,
  searchDeviceImeiData,
} from "./service/ViewDeviceGroupList.service";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useHistory } from "react-router-dom";

const TableHeader = [
  { name: "IMEI", field: "imei" },
  { name: "Label Name", field: "labelName" },
  { name: "BoxSet", field: "boxSet" },
];

const ViewDeviceGroupList = () => {
  const classes = viewDeviceGroupListStyles;
  const history = useHistory();
  const _id: any = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [searchDeviceGroup, setSearchDeviceGroup] = useState<string>("");
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);

  // useEffect(() => {
  //   if (searchDeviceGroup) {
  //     searchImeiData();
  //   } else {
  //     fetchDeviceGroupData();
  //   }
  // }, [searchDeviceGroup, page, rowsPerPage]);

  const tableRender = (tableData: any) => {
    const data = tableData?.map((item: any, index: number) => {
      return {
        imei: item.imei,
        labelName: item.labelName,
        boxSet: item.boxSet,
      };
    });
    return data;
  };
  const handlePerPageData = (event: any) => {
    setPage(1);
    setSearchPageNumber(1);
    setRowsPerPage(event?.target?.value);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleSearchChangePage = (newPage: number) => {
    setSearchPageNumber(newPage);
  };

  const getCustomTable = () => {
    return (
      <Box
        id="device_group_display_table"
        sx={{
          minWidth: "300px",
          width: "100%",
          overflow: "auto",
        }}
      >
        <CustomTable
          headers={TableHeader}
          rows={tableData}
          size={[5]}
          handlePageChange={
            searchDeviceGroup ? handleSearchChangePage : handleChangePage
          }
          handleRowsPerPage={handlePerPageData}
          paginationCount={count}
          pageNumber={page}
          setPage={setPage}
          handlePerPageData={handlePerPageData}
          perPageData={rowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </Box>
    );
  };

  const fetchDeviceGroupData = async () => {
    try {
      setIsLoading(true);
      const res = await fetchDeviceGroupById({
        input: {
          id: _id.id,
          page,
          limit: 10,
        },
      });
      const data = tableRender(res?.fetchDeviceGroupById?.data[0]?.imeiData);
      setTableData(data);
      setCount(res?.fetchDeviceGroupById?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      openErrorNotification(error.message);
    }
  };

  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      setSearchDeviceGroup(SearchEvent.target.value.trim());
      setPage(1);
      setRowsPerPage(10);
    } else {
      setSearchDeviceGroup("");
    }
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search device..."
        id="assetAssingment_search_field"
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

  const getHeader = () => {
    return (
      <Stack display={"flex"} alignItems={"center"} justifyContent={"s"}>
        <Box>
          <IconButton>
            <KeyboardBackspaceIcon
              style={{ color: "#828282" }}
              onClick={() => history.goBack()}
            />
          </IconButton>
        </Box>
        <Box>
          <Typography sx={classes.mainCardHeading}>Device Group</Typography>
        </Box>
      </Stack>
    );
  };

  return (
    <>
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
        <CustomLoader isLoading={isLoading} />
      </Grid>
    </>
  );
};

export default React.memo(ViewDeviceGroupList);
