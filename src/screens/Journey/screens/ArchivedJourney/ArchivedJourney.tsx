import {
  Box,
  Grid,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import moment from "moment"
import {
  CustomAppHeader,
  CustomInput,
  CustomPaper,
  CustomTable,
} from "../../../../global/components"
import CustomLoader from "../../../../global/components/CustomLoader/CustomLoader"
import {
  debounceEventHandler,
  openErrorNotification,
} from "../../../../helpers/methods"
import strings from "../../../../global/constants/StringConstants"
import SearchIcon from "@mui/icons-material/Search"
// import history from "../../utils/history";
import {
  alertRowData,
  statusDevice,
} from "../../../Reports/service/Report.service"
import archivedJourneyStyles from "./ArchivedJourney.styles"
import { FaRoute } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import {
  boldFont,
  disabledBackgroundColor,
  primaryHeadingColor,
} from "../../../../utils/styles"
import { archiveJourney } from "./service/ArchivedJourney.service"
import history from "../../../../utils/history"
const ArchivedJoruney = () => {
  const classes = archivedJourneyStyles
  const [alertTableData, setAlertTableData] = useState([])
  const [page, setPage] = useState(1)
  const [dateFilter, setDateFilter] = useState({
    startDate: moment().clone().subtract(30, "minutes").toISOString(),
    endDate: moment().toISOString(),
  })
  const [filterData, setFilterData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const startIndex = (page - 1) * 10
  const endIndex = startIndex + 10
  const [statusPage, setStatusPage] = useState(1)
  const [statData, setStatData] = useState<any>([])
  const startDeviceIndex = (statusPage - 1) * 10
  const endDeviceIndex = startDeviceIndex + 10
  const serachInputValue = useRef<any>("")
  const [archivedTableData, setArchivedTableData] = useState([])

  useEffect(() => {
    fetchArchivedJourneys()
  }, [])
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleSearchOnChange = (searchEvent: ChangeEvent<HTMLInputElement>) => {
    const value = searchEvent?.target?.value.toLowerCase().trim()
    if (value) {
      setIsLoading(true)
      const searchedReports = archivedTableData?.filter(
        (data: any) =>
          data?.journeyName?.toLowerCase()?.includes(value) ||
          data?.createdBy?.toLowerCase()?.includes(value) ||
          data?.startDate?.toLowerCase()?.includes(value) ||
          data?.endDate?.toLowerCase()?.includes(value) ||
          data!?.totalDistance!?.toLowerCase()?.includes(value) ||
          data?.totalDuration?.toLowerCase()?.includes(value)
      )
      setFilterData(searchedReports)
      setIsSearching(true)
      setIsLoading(false)
    } else {
      setFilterData([...archivedTableData])
      setIsSearching(false)
    }
  }

  const fetchArchivedJourneys = async () => {
    try {
      const response = await archiveJourney()
      const res = tableRender(response.archiveJourney.data)
      setArchivedTableData(res)
    } catch (error: any) {
      setIsLoading(false)
      openErrorNotification(error.message)
    }
  }

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search Archived Journey"
        id="report_search_field"
        // inputRef={serachInputValue}
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
    )
  }

  const alertData = async () => {
    try {
      setIsLoading(true)
      const [res1, res2] = await Promise.all([
        alertRowData({
          input: {
            startDate: dateFilter.startDate,
            endDate: dateFilter.endDate,
          },
        }),
        statusDevice({
          input: {
            startDate: dateFilter.startDate,
            endDate: dateFilter.endDate,
          },
        }),
      ])
      const alertTableDataValue = res1.getAlertData.map((item: any) => {
        return {
          imei: item.imei,
          label: item.label,
          mode: item.mode,
          event: item.event,
          message: item.message,
          source: item.source,
          time: moment(item.time).format("DD-MM-YYYY HH:mm:ss A"),
        }
      })
      setAlertTableData(alertTableDataValue)
      const deviceStatus = res2.getStatusDevice.map((item: any) => {
        return {
          imei: item.imei,
          label: item.label,
          status: item.status,
          time: moment(item.time).format("DD-MM-YYYY HH:mm:ss A"),
        }
      })
      setStatData(deviceStatus)
      setIsLoading(false)
    } catch (error: any) {
      setIsLoading(false)
      openErrorNotification(error.message)
    }
  }

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
    )
  }

  const getHeader = () => {
    return (
      <Box>
        <Typography sx={classes.mainCardHeading}>Archived Journey</Typography>
      </Box>
    )
  }

  const formatDuration = (durationInHours: number) => {
    if (durationInHours < 1) {
      const minutes = Math.round(durationInHours * 60)
      return `${minutes} Minutes`
    } else {
      return `${durationInHours.toFixed(2)} Hours`
    }
  }

  const formatDistance = (distanceInKm: number) => {
    const distance = Number(distanceInKm)
    if (distance < 1) {
      const meters = Math.round(distance * 1000)
      return `${meters} m`
    } else {
      return `${distance.toFixed(2)} Km`
    }
  }

  const tableRender = (tableData: any) => {
    const data = tableData?.map((item: any, index: number) => {
      return {
        key: item._id,
        journeyName: item?.journeyName,
        startDate: moment(item.startDate).format("DD-MMM-YYYY hh:mm A"),
        endDate: moment(item.endDate).format("DD-MMM-YYYY hh:mm A"),
        createdBy: item?.createdBy,
        totalDistance: formatDistance(item?.totalDistance),
        totalDuration: formatDuration(item?.totalDuration),
        action: (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip
              title={
                <CustomPaper
                  className={{ backgroundColor: disabledBackgroundColor }}
                >
                  <Typography sx={classes.liveTrackingTooltipText}>
                    {"Live Tracking"}
                  </Typography>
                </CustomPaper>
              }
              placement="top"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    background: "none",
                  },
                },
              }}
            >
              <FaRoute
                style={{
                  color: "#5F22E2",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
                onClick={() => {
                  history.push({
                    pathname: "/trackplay",
                  })
                }}
              />
            </Tooltip>
          </Box>
        ),
      }
    })
    return data
  }

  const getAlertsTable = () => {
    return (
      <Box
        id="Alerts_panel"
        sx={
          {
            // padding: "30px",
          }
        }
      >
        <Grid container xs={12} md={12} lg={12} xl={12} width="100%">
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{ display: "flex", margin: "1rem 0rem" }}
          >
            {/* <Typography variant="h5" sx={classes.heading}>
                Alerts Report
              </Typography> */}
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
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            xl={12}
            lg={12}
            sx={{ padding: "0px 20px" }}
          >
            <CustomTable
              headers={[
                { name: "Journey Name", field: "journeyName" },
                { name: "Total Distance", field: "totalDistance" },
                { name: "Total Duration", field: "totalDuration" },
                { name: "Start Date", field: "startDate" },
                { name: "End Date", field: "endDate" },
                { name: "Created By", field: "createdBy" },
                { name: "Action", field: "action" },
              ]}
              rows={isSearching ? filterData : archivedTableData}
              paginationCount={1}
              rowsPerPage={10}
              pageNumber={page}
              isRowPerPageEnable={true}
              setPage={setPage}
              handlePageChange={handleChangePage}
            />
          </Grid>
        </Grid>
      </Box>
    )
  }

  return (
    <Box>
      <CustomAppHeader
        className={{
          backgroundColor: "#f1edff",
          padding: "10px 20px 15px 18px",
          marginBottom: "5rem",
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
              //   fontSize: getRelativeFontSize(6),
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

      {/* {getDashboardHeader()} */}
      {getDashboardBody()}
      <CustomLoader isLoading={isLoading} />
    </Box>
  )
}

export default ArchivedJoruney
