import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomLoader from "../../../../global/components/CustomLoader/CustomLoader";
import { Box, Grid, IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import { CustomAppHeader, CustomInput, CustomTable } from "../../../../global/components";
import strings from "../../../../global/constants/StringConstants";
import { debounceEventHandler, openErrorNotification } from "../../../../helpers/methods";
import SearchIcon from "@mui/icons-material/Search";
import { getRelativeFontSize, boldFont,primaryHeadingColor } from "../../../../utils/styles";
import viewDeviceGroupListStyles from "./ViewDeviceGroupList.styles";
import { fetchDeviceGroupById } from "./service/ViewDeviceGroupList.service";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useHistory } from "react-router-dom";


const TableHeader = [
  { name: "IMEI", field: "imei" },
  { name: "Label Name", field: "labelName" },
  { name: "BoxSet", field: "boxSet" },

];

const ViewDeviceGroupList=()=>{
    const classes=viewDeviceGroupListStyles;
    const history = useHistory();
    // const _id=useParams<{_id:string}>();
    const _id="6630df2f9753a45614d87cfe";

    const [isLoading,setIsLoading]=useState(false)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [count, setCount] = useState<number>(0);
    const [tableData, setTableData] = useState([]);
    const [page, setPage] = useState<number>(1);
    const [searchDeviceGroup, setSearchDeviceGroup] = useState<string>("");
    const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
    useEffect(()=>{
      fetchDeviceGroupData(_id);
    },[])


    const deviceData = [
      {
        imei: 864180068905939,
        labelName: "abc",
        _id: "660fc302750705e3f7a2276c",
        boxSet: "A",
        journey: {
          _id: "660fc19f591bc4da6b2b4244",
          totalDuration: "13.87",
          totalDistance: "1100.45",
          endDate: "2024-04-06T09:17:00.000+00:00",
          startDate: "2024-04-05T09:17:00.000+00:00",
          createdBy: "vimal",
          journeyName: "new journey2"
        }
      },
      {
        imei: 9999999999,
        labelName: "new journey testing",
        _id: "660fc80df38976c8c1f6e79b",
        boxSet: "A",
        journey: {
          _id: "660fc6aef38976c8c1f6e70c",
          totalDuration: "3.4",
          totalDistance: "93.82",
          endDate: "2024-04-08T09:38:00.000+00:00",
          startDate: "2024-04-06T09:38:00.000+00:00",
          createdBy: "vimal",
          journeyName: "new journey6"
        }
      }
    ]
    


  const tableRender = (tableData: any) => {
    const data = tableData?.map((item: any, index: number) => {
      return {
        imei:item.imei,
        labelName:item.labelName,
        boxSet:item.boxSet
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


  const handleSearchChangePage = (
    newPage: number
  ) => {
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

    const fetchDeviceGroupData = async (_id:any) => {
      try {
        setIsLoading(true);
        const res = await fetchDeviceGroupById({
          input: {
            _id:_id,
            page,
            limit: 10,
          },
        });
        const data = tableRender(deviceData);
        setTableData(data);
        setCount(10);
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
          <Box ml={2}>
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
}

export default React.memo(ViewDeviceGroupList);
