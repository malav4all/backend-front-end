import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Grid,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { PiPencilSimpleBold } from "react-icons/pi";
import SearchIcon from "@mui/icons-material/Search";
import tripStyles from "./Trip.styles";
import AddTrip from "./components/AddTrip/AddTrip";
import { tripTableHeader } from "./TripTypeAndValidation";
import { fetchTrip, searchTrip } from "./service/Trip.service";
import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
} from "../../../helpers/methods";
import notifiers from "../../../global/constants/NotificationConstants";
import {
  CustomAppHeader,
  CustomButton,
  CustomInput,
  CustomTable,
} from "../../../global/components";
import {
  boldFont,
  headerColor,
  primaryHeadingColor,
  getRelativeFontSize,
} from "../../../utils/styles";
import strings from "../../../global/constants/StringConstants";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import { useHistory } from "react-router-dom";

const Trip = () => {
  const theme = useTheme();
  const classes = tripStyles;
  const history = useHistory();
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
  const [searchTrips, setSearchTrips] = useState<any>("");
  const [showAddTripForm, setShowAddTripForm] = useState(false);
  const [tripData, setTripData] = useState<any>([]);
  const [selectedTripRowData, setSelectedTripRowData] = useState<any>({});
  const [roles, setRoles] = useState([]);
  const [edit, setEdit] = useState(false);

  const dummyData = [
    {
      key: "66448109b3b0d0254254e229",
      imeiNumber: "123456789012359",
      totalDistance: "1150.00 Km",
      totalDuration: "21.00 Hours",
      startDate: "29-May-2024 04:15 PM",
      endDate: "30-May-2024 06:25 PM",
      createdBy: "Ramesh",
    },
  ];

  useEffect(() => {
    tableRender(dummyData);
  }, []);

  useEffect(() => {
    if (searchTrips) {
      getSearchData();
    } else {
      getTripData();
    }
  }, [searchTrips, page, rowsPerPage, searchPageNumber]);

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
        key: item.key,
        imeiNumber: item.imeiNumber,
        totalDistance: item.totalDistance,
        totalDuration: item.totalDuration,
        startDate: item.startDate,
        endDate: item.endDate,
        createdBy: item.createdBy,
        action: (
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
                color: headerColor,
                fontSize: "17px",
              }}
            />
          </Tooltip>
        ),
      };
    });
    setTripData([...data]);
  };

  const getHeader = () => {
    return (
      <Box>
        <Typography sx={{ ...classes.mainCardHeading, color: "white" }}>
          Active Trips
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
      tableRender(dummyData);
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
      setShowAddTripForm(true);
      setSelectedTripRowData(rowdata);
      setEdit(true);
    },
    [edit]
  );

  const closeAddTripForm = () => {
    setShowAddTripForm(false);
    setSelectedTripRowData(null);
  };

  const addTripForm = () => {
    return (
      <AddTrip
        openAddTripForm={showAddTripForm}
        handleCloseAddTripForm={closeAddTripForm}
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
        onClick={() => setShowAddTripForm(true)}
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
        {!showAddTripForm ? addTripButton() : ""}
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
        {showAddTripForm ? addTripForm() : getCustomTable()}
        <CustomLoader isLoading={isLoading} />
      </Grid>
    </Box>
  );
};

export default React.memo(Trip);
