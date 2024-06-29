import React, { ChangeEvent, useEffect, useState } from "react";
import {
  CustomAppHeader,
  CustomButton,
  CustomInput,
  CustomTable,
} from "../../global/components";
import {
  Box,
  Grid,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  getRelativeFontSize,
  primaryHeadingColor,
  boldFont,
  headerColor,
} from "../../utils/styles";
import { PiPencilSimpleBold } from "react-icons/pi";
import SearchIcon from "@mui/icons-material/Search";
import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
} from "../../helpers/methods";

import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import strings from "../../global/constants/StringConstants";
import notifiers from "../../global/constants/NotificationConstants";
import history from "../../utils/history";
import tripStyles from "./Trip.styles";
import AddTrip from "./components/AddTrip/AddTrip";
import { tripTableHeader } from "./TripTypeAndValidation";
import { fetchTrip, searchTrip } from "./service/Trip.service";

const Trip = () => {
  const theme = useTheme();
  const classes = tripStyles;
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
  const [searchTrips, setSearchTrips] = useState<any>("");
  const [addTripDialogHandler, setAddTripDialogHandler] = useState(false);
  const [tripData, setTripData] = useState<any>([]);
  const [selectedTripRowData, setSelectedTripRowData] = useState<any>({});

  const [roles, setRoles] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (searchTrips) {
      getSearchData();
    } else {
      getTripData();
    }
  }, [searchTrips, page, setRowsPerPage, searchPageNumber]);

  const handleSearchChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setSearchPageNumber(newPage);
  };

  const getRedirectionUrl = (_id: any) => {
    return history.push(`/device-group/view/${_id}`);
  };

  const tableRender = (tableData: any) => {
    const data = tableData?.map((item: any, index: number) => {
      return {
        key: item._id,
        tripName: (
          <>
            <Tooltip
              title="Show Imei List"
              placement="top"
              arrow
              onClick={() => {
                getRedirectionUrl(item?._id);
              }}
              sx={{
                color: theme.palette.text.primary,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  display: "inline-block",
                  color: theme.palette.text.primary,
                  fontSize: "13px",
                  "&:hover": {
                    borderBottom: `1px solid ${theme.palette.primary.main}`,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {item?.tripName}
              </Typography>
            </Tooltip>
          </>
        ),
        createdBy: (
          <Typography
            sx={{
              color: theme.palette.text.primary,
            }}
          >
            {item?.createdBy}
          </Typography>
        ),
        action: (
          <>
            <Tooltip
              title="Edit"
              onClick={() => {
                editTrip(item);
              }}
              sx={{
                color: theme.palette.text.primary,
              }}
            >
              <PiPencilSimpleBold
                style={{
                  margin: "0px 8px -7px 0px",
                  cursor: "pointer",
                  color: theme.palette.primary.main,
                  fontSize: "17px",
                }}
              />
            </Tooltip>
          </>
        ),
      };
    });
    setTripData([...data]);
  };

  const getHeader = () => {
    return (
      <Box>
        <Typography sx={{ ...classes.mainCardHeading, color: "white" }}>
          Trip
        </Typography>
      </Box>
    );
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handlePerPageData = (event: any) => {
    setPage(1);
    setSearchPageNumber(1);
    setRowsPerPage(event?.target?.value);
  };

  const getTripData = async () => {
    try {
      setIsLoading(true);
      const res = await fetchTrip({
        input: {
          page: page,
          limit: rowsPerPage,
        },
      });
      tableRender(res?.fetchTrip?.data);
      setCount(res?.fetchTrip?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
      setIsLoading(false);
    }
  };

  const getSearchData = async () => {
    try {
      setIsLoading(true);
      const res = await searchTrip({
        input: {
          search: searchTrips,
          page: 1,
          limit: 10,
        },
      });
      tableRender(res?.searchTrip?.data);
      setCount(res?.searchTrip?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      setSearchTrips(SearchEvent.target.value.trim());
      setPage(1);
      setRowsPerPage(10);
    } else {
      setSearchTrips("");
    }
  };
  const editTrip = React.useCallback(
    (rowdata: any) => {
      setAddTripDialogHandler(true);
      setSelectedTripRowData(rowdata);
      setEdit(true);
    },
    [edit]
  );
  const closeAddTripDialogHandler = () => {
    setAddTripDialogHandler(false);
    setSelectedTripRowData(null);
  };

  const addTripDailogBox = () => {
    return (
      <AddTrip
        openAddTripDialog={addTripDialogHandler}
        handleCloseAddTripDialog={closeAddTripDialogHandler}
        roles={roles}
        tableData={getTripData}
        selectedTripRowData={selectedTripRowData}
        isLoading={isLoading}
        edit={edit}
        setEdit={setEdit}
      />
    );
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
          headers={tripTableHeader}
          rows={tripData}
          size={[5]}
          handlePageChange={
            searchTrips ? handleSearchChangePage : handleChangePage
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

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search Device Group"
        id="trip_search_field"
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

  const addTripButton = () => {
    return (
      <CustomButton
        id="trip_add_button"
        label={"Add Trip"}
        onClick={() => setAddTripDialogHandler(true)}
        customClasses={{
          width: "150px",
        }}
      />
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        height: "100%",
      }}
    >
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

          <Stack
            direction={{ sm: "row", xs: "column" }}
            alignItems={{ sm: "center" }}
            spacing={1}
          >
            {getSearchBar()}
          </Stack>
        </Stack>
      </CustomAppHeader>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", flexWrap: "wrap" }}
        mt={2}
        mr={2}
      >
        {addTripButton()}
      </Box>

      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        sx={classes.mainSection}
      >
        {addTripDailogBox()}
        {getCustomTable()}
        <CustomLoader isLoading={isLoading} />
      </Grid>
    </Box>
  );
};

export default React.memo(Trip);
