import { ChangeEvent, useEffect, useState } from "react";
import { fetchJourney } from "../../../Journey/service/journey.service";
import { Box, Grid, InputAdornment, Tooltip, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CustomInput, CustomTable } from "../../../../global/components";
import moment from "moment";
import {
  debounceEventHandler,
  openErrorNotification,
} from "../../../../helpers/methods";
import strings from "../../../../global/constants/StringConstants";
import CustomLoader from "../../../../global/components/CustomLoader/CustomLoader";
import journeyReportStyles from "./JourneyReport.styles";
interface CustomProps {
  isFromDistanceReport: boolean;
}

const JourneyReport = (props: CustomProps) => {
  const classes = journeyReportStyles;
  const [isLoading, setIsLoading] = useState<any>(false);
  const [count, setCount] = useState<number>(0);
  const [tableData, setTableData] = useState([]);
  const [journeyTableData, setJourneyTableData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchJourney, setSearchJourney] = useState<string>("");
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
  useEffect(() => {
    fetchJourneyHandler();
  }, []);
  const fetchJourneyHandler = async () => {
    try {
      setIsLoading(true);
      const res = await fetchJourney({
        input: {
          page,
          limit: 10,
        },
      });

      const data = tableRender(res.fetchJourney.data);

      setJourneyTableData(data);
      setCount(res.fetchJourney.paginatorInfo.count);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      openErrorNotification(error.message);
    }
  };

  const formatDuration = (durationInHours: number) => {
    if (durationInHours < 1) {
      const minutes = Math.round(durationInHours * 60);
      return `${minutes} Minutes`;
    } else {
      return `${durationInHours.toFixed(2)} Hours`;
    }
  };

  const formatDistance = (distanceInKm: number) => {
    const distance = Number(distanceInKm);
    if (distance < 1) {
      const meters = Math.round(distance * 1000);
      return `${meters} m`;
    } else {
      return `${distance.toFixed(2)} Km`;
    }
  };

  const tableRender = (tableData: any) => {
    const data = tableData?.map((item: any, index: number) => {
      const coordinates = item?.journeyData?.map((coor: any) => {
        const [lat, lng] = coor?.geoCodeData?.geometry?.coordinates;
        return { lat, lng };
      });
      const firstCoordinate = coordinates?.shift();
      const lastCoordinate = coordinates?.pop();
      const routeOrigin: { lat: number; lng: number }[] = [];
      if (firstCoordinate) {
        const { lat: firstLat, lng: firstLong } = firstCoordinate;
        routeOrigin.push({ lat: firstLat, lng: firstLong });
      }
      if (lastCoordinate) {
        const { lat: lastLat, lng: lastLong } = lastCoordinate;
        routeOrigin.push({ lat: lastLat, lng: lastLong });
      }
      return {
        key: item._id,
        journeyName: item?.journeyName,
        startDate: moment(item.startDate).format("DD-MMM-YYYY hh:mm A"),
        endDate: moment(item.endDate).format("DD-MMM-YYYY hh:mm A"),
        createdBy: item?.createdBy,
        totalDistance: formatDistance(item?.totalDistance),
        totalDuration: formatDuration(item?.totalDuration),
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

  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      setSearchJourney(SearchEvent.target.value.trim());
      setPage(1);
      setRowsPerPage(10);
    } else {
      setSearchJourney("");
    }
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search Report..."
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

  const getDashboardHeader = () => {
    return (
      <Grid
        container
        sx={classes.header}
        xs={12}
        md={12}
        lg={12}
        xl={12}
        width="100%"
      >
        <Grid item xs={12} md={5} lg={8} sx={{ display: "flex" }}>
          <Typography variant="h5" sx={classes.heading}>
            {getSearchBar()}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={7}
          lg={4}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }}
        ></Grid>
      </Grid>
    );
  };
  const getDashboardBody = () => {
    return (
      <Grid
        container
        spacing={2}
        sx={{ padding: "0 16px", marginTop: "-48px" }}
        xs={12}
      >
        <Grid item xs={12} sm={12} xl={12} md={12} lg={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              {getAlertsTable()}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  const getAlertsTable = () => {
    return (
      <Box
        id="Alerts_panel"
        sx={{
          padding: "1.5rem 1.5rem",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.07)",
        }}
      >
        <Grid container xs={12} md={12} lg={12} xl={12} width="100%">
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{ display: "flex", margin: "1rem 0rem" }}
          >
            <Typography variant="h5" sx={classes.heading}>
              {`${
                props.isFromDistanceReport
                  ? "Distance Report"
                  : "Journey Report"
              }`}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexWrap: "wrap",
            }}
          ></Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
            <CustomTable
              headers={[
                { name: "Journey Name", field: "journeyName" },
                { name: "Created By", field: "createdBy" },
                { name: "Start Date", field: "startDate" },
                { name: "End Date", field: "endDate" },
                { name: "Total Distance", field: "totalDistance" },
                { name: "Total Duration", field: "totalDuration" },
              ]}
              rows={journeyTableData}
              size={[5]}
              handlePageChange={handleChangePage}
              handleRowsPerPage={handlePerPageData}
              paginationCount={count}
              // rowsPerPage={rowsPerPage}
              pageNumber={page}
              setPage={setPage}
              handlePerPageData={handlePerPageData}
              perPageData={rowsPerPage}
              rowsPerPage={rowsPerPage}
            />
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Box>
      {getDashboardHeader()}
      {getDashboardBody()}
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default JourneyReport;
