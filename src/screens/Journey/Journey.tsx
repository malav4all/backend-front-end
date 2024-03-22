import React, { useEffect, useState } from "react";
import {
  CustomAppHeader,
  CustomButton,
  CustomInput,
  CustomTable,
} from "../../global/components";
import {
  Autocomplete,
  Box,
  Divider,
  Grid,
  InputAdornment,
  InputLabel,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import journeyStyles from "./Journey.styles";
import {
  getRelativeFontSize,
  primaryHeadingColor,
  boldFont,
} from "../../utils/styles";
import SearchIcon from "@mui/icons-material/Search";
import { fetchGeozoneHandler } from "../Geozone/service/geozone.service";
import {
  openErrorNotification,
  openSuccessNotification,
} from "../../helpers/methods";
import { createJourney, fetchJourney } from "./service/journey.service";
import { store } from "../../utils/store";
import moment from "moment";
const Journey = () => {
  const classes = journeyStyles;
  const [page, setPage] = useState<number>(1);
  const [formField, setFormField] = useState<any>({
    journeyName: {
      value: "",
      error: "",
    },
    startDate: {
      value: "",
      error: "",
    },
    endDate: {
      value: "",
      error: "",
    },
  });
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [tableData, setTableData] = useState([]);
  const [journeyTableData, setJourneyTableData] = useState([]);
  const [finalLocationIds, setFinalLocationIds] = useState<string[]>([]);
  const [counter, setCounter] = useState(66);
  const [locationData, setLocationData] = useState<any>([
    {
      name: "LocationA",
      field: "locationA",
      type: "String",
      fieldMapping: "",
      required: true,
      error: "",
    },
  ]);

  useEffect(() => {
    fetchGeozone();
    fetchJourneyHandler();
  }, []);

  const handleStepOneOnChange = (event: React.ChangeEvent<any>) => {
    setFormField({
      ...formField,
      [event.target.name]: {
        ...formField[event.target.name],
        value: event.target.value,
        error: "",
      },
    });
  };

  const handleAutocompleteChange = (newValue: any) => {
    if (
      newValue.value &&
      newValue.value._id &&
      !finalLocationIds.includes(newValue.value._id)
    ) {
      setFinalLocationIds((prevIds) => [...prevIds, newValue.value._id]);
    }
  };

  const addJourneyHandler = async () => {
    try {
      const res = await createJourney({
        input: {
          journeyName: formField.journeyName.value,
          startDate: formField.startDate.value,
          endDate: formField.endDate.value,
          journeyData: finalLocationIds,
          createdBy: store.getState().auth.userName,
        },
      });
      openSuccessNotification(res.addJourney.message);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const tableRender = (tableData: any) => {
    const data = tableData.map((item: any, index: number) => {
      return {
        journeyName: item?.journeyName,
        startDate: moment(item.startDate).format("DD-MMM-YYYY hh:mm A"),
        endDate: moment(item.endDate).format("DD-MMM-YYYY hh:mm A"),
        // journeyData: (
        //   <>
        //     <Box
        //       style={{ display: "flex", justifyContent: "center" }}
        //       sx={{ minWidth: "400px", width: "100%" }}
        //     >
        //       <Stepper
        //         activeStep={0}
        //         connector={<Divider sx={classes.divderResponsive} />}
        //       >
        //         {item.journeyData.map(
        //           (journeyItem: any, journeyIndex: number) => (
        //             <Step
        //               key={journeyIndex}
        //               sx={{
        //                 display: "flex",
        //                 justifyContent: "center",
        //                 alignContent: "center",
        //                 alignItems: "center",
        //               }}
        //             >
        //               <StepLabel>
        //                 {journeyIndex === 0
        //                   ? `${journeyItem.name} - (First)${journeyItem.address.state} `
        //                   : journeyIndex === item.journeyData.length - 1
        //                   ? `${journeyItem.name} -  (Last)${journeyItem.address.state}`
        //                   : journeyItem.name}
        //               </StepLabel>
        //             </Step>
        //           )
        //         )}
        //       </Stepper>
        //     </Box>
        //   </>
        // ),
        createdBy: item?.createdBy,
      };
    });
    return data;
  };

  const fetchJourneyHandler = async () => {
    try {
      const res = await fetchJourney({
        input: {
          page,
          limit: 10,
        },
      });

      const data = tableRender(res.fetchJourney.data);

      setJourneyTableData(data);
      setCount(res.fetchJourney.paginatorInfo.count);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const fetchGeozone = async () => {
    try {
      const res = await fetchGeozoneHandler({
        input: {
          page: -1,
          limit: 0,
        },
      });
      setTableData(res?.listGeozone?.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const getHeader = () => {
    return (
      <Box>
        <Typography sx={classes.mainCardHeading}>Journey</Typography>
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
    setRowsPerPage(event.target.value);
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
          headers={[
            { name: "Journey Name", field: "journeyName" },
            // { name: "Location", field: "journeyData" },
            { name: "Created By", field: "createdBy" },
            { name: "Start Date", field: "startDate" },
            { name: "End Date", field: "endDate" },
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
      </Box>
    );
  };

  const addMoreLocation = () => {
    const name = `Location${String.fromCharCode(counter)}`;
    const field = `location${String.fromCharCode(counter)}`;
    const arr = [];

    arr.push(...locationData, {
      name,
      field,
      type: "",
      fieldMapping: "",
      required: true,
      error: "",
    });

    setLocationData(arr);
    setCounter(counter + 1); // Increment the counter for the next iteration
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search asset..."
        id="assetAssingment_search_field"
        // onChange={debounceEventHandler(
        //   handleSearchOnChange,
        //   strings.SEARCH_TIME_OUT
        // )}
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

  const inputSection = () => {
    return (
      <>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <CustomInput
              label="Journey Name"
              placeHolder="Enter Journey name"
              value={formField.journeyName.value}
              required
              name="journeyName"
              onChange={handleStepOneOnChange}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <Box>
              <InputLabel sx={classes.inputLabel} shrink>
                Start Location
                <Box ml={0.4} sx={classes.star}>
                  *
                </Box>
              </InputLabel>
              <Autocomplete
                sx={classes.emailDropDownStyle}
                id="update_user_manager_field"
                options={
                  tableData?.map((item: any) => ({
                    label: `${item.name} - ${item.description}`,
                    value: item,
                  })) || []
                }
                onChange={(event, newValue) =>
                  handleAutocompleteChange(newValue)
                }
                renderInput={(params) => (
                  <TextField
                    sx={classes.select}
                    {...params}
                    name="startLocation"
                    placeholder="Search Start location here....."
                    onSelect={() => {}}
                  />
                )}
              />
            </Box>
          </Grid>
          {locationData?.map((item: any, index: number) => (
            <Grid item xs={12} sm={3} md={3} lg={3} xl={3} key={index}>
              <Box>
                <InputLabel sx={classes.inputLabel} shrink>
                  {item.name}
                  <Box ml={0.4} sx={classes.star}>
                    *
                  </Box>
                </InputLabel>
                <Autocomplete
                  sx={classes.emailDropDownStyle}
                  id="update_user_manager_field"
                  options={
                    tableData?.map((item: any) => ({
                      label: `${item.name} - ${item.description}`,
                      value: item,
                    })) || []
                  }
                  onChange={(event, newValue) =>
                    handleAutocompleteChange(newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      sx={classes.select}
                      {...params}
                      name="assignBy"
                      placeholder="Search location here....."
                      onSelect={() => {}}
                    />
                  )}
                />
              </Box>
            </Grid>
          ))}
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <Box>
              <InputLabel sx={classes.inputLabel} shrink>
                End Location
                <Box ml={0.4} sx={classes.star}>
                  *
                </Box>
              </InputLabel>
              <Autocomplete
                sx={classes.emailDropDownStyle}
                id="update_user_manager_field"
                options={
                  tableData?.map((item: any) => ({
                    label: `${item.name} - ${item.description}`,
                    value: item,
                  })) || []
                }
                onChange={(event, newValue) =>
                  handleAutocompleteChange(newValue)
                }
                renderInput={(params) => (
                  <TextField
                    sx={classes.select}
                    {...params}
                    name="startLocation"
                    placeholder="Search End location here....."
                    onSelect={() => {}}
                  />
                )}
              />
            </Box>
          </Grid>
          {/* start data */}
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <CustomInput
              label="Start Date"
              type="datetime-local"
              id="scheduleTime"
              name="startDate"
              // propsToInputElement={{
              //   min: moment().format("YYYY-MM-DDTkk:mm"),
              // }}
              value={formField.startDate.value}
              onChange={handleStepOneOnChange}
            />
          </Grid>
          {/* end date */}
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <CustomInput
              label="End Date"
              type="datetime-local"
              id="scheduleTime"
              name="endDate"
              // propsToInputElement={{
              //   min: moment().format("YYYY-MM-DDTkk:mm"),
              // }}
              value={formField.endDate.value}
              onChange={handleStepOneOnChange}
            />
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <>
      <CustomAppHeader
        className={{
          backgroundColor: "#ECF9FF",
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
        <CustomButton
          id="users_add_button"
          label={"Add"}
          onClick={addMoreLocation}
          customClasses={{
            width: "150px",
          }}
        />
      </Box>

      <Box p={2}>{inputSection()}</Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
        mt={2}
        mr={2}
      >
        <CustomButton
          id="users_add_button"
          label={"Submit"}
          onClick={addJourneyHandler}
          customClasses={{
            width: "150px",
          }}
        />
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
        {getCustomTable()}
      </Grid>
    </>
  );
};

export default React.memo(Journey);
