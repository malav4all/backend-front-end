import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid,
  List,
  TextField,
} from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import { fetchJourney } from "../Journey/service/journey.service";
import { isTruthy, openErrorNotification } from "../../helpers/methods";

import moment from "moment";
import { CustomInput } from "../../global/components";
import { fetchTrackplayHandler } from "./service/trackplay.service";

const Trackplay = () => {
  const [isLoading, setIsLoading] = useState<any>(false);

  const [mapKey, setMapKey] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const limit: number = 10;

  const [openJourney, setOpenJourney] = useState(false);
  const [openIMEI, setOpenIMEI] = useState(false);
  const [options, setOptions] = useState<readonly Journey[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [formField, setFormField] = useState<any>({
    journeyName: {
      value: "",
      error: "",
    },
    imei: {
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

  interface Journey {
    journeyName: string;
    imei: number;
  }

  function sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }

  const fetchJourneyHandler = async () => {
    try {
      setLoading(true);
      const res = await fetchJourney({
        input: {
          page,
          limit,
        },
      });
      const data = res.fetchJourney.data;

      const uniqueJourneys = Array.from(
        new Set(data.map((journey: any) => journey.journeyName))
      );

      const uniqueJourneyData = uniqueJourneys.map((journeyName) => {
        return data.find((journey: any) => journey.journeyName === journeyName);
      });

      setOptions(uniqueJourneyData);
    } catch (error: any) {
      openErrorNotification(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (event: React.ChangeEvent<any>) => {
    setFormField({
      ...formField,
      [event.target.name]: {
        ...formField[event?.target?.name],
        value: event?.target?.value,
        error: "",
      },
    });
  };

  const trackplaydata = async () => {
    const trackdata = await fetchTrackplayHandler();
    console.log(trackdata.getRowData);
  };

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);

      if (active) {
        setOptions([...options]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!openJourney) {
      setOptions([]);
    }
  }, [openJourney]);

  useEffect(() => {
    const platform = new window.H.service.Platform({
      apikey: "7snf2Sz_ORd8AClElg9h43HXV8YPI1pbVHyz2QvPsZI",
    });
    const defaultLayers = platform.createDefaultLayers();

    const initialMap = new window.H.Map(
      document.getElementById("map"),
      defaultLayers.vector.normal.map,
      {
        center: { lat: 28.495831757053296, lng: 77.07923644083718 },
        zoom: 5,
        pixelRatio: window.devicePixelRatio || 1,
        key: mapKey,
      }
    );

    return () => {
      window.removeEventListener("resize", () =>
        initialMap.getViewPort().resize()
      );
      initialMap.dispose();
    };
  }, []);

  useEffect(() => {
    fetchJourneyHandler();
    trackplaydata();
  }, []);

//   console.log(options);

  return (
    <>
      <Box
        component={"div"}
        id="map"
        style={{ width: "100%", height: "100%", position: "relative" }}
      ></Box>

      <Box
        style={{
          position: "absolute",
          top: 25,
          right: "25px",
          zIndex: 0,
          padding: "0.5rem",
          backgroundColor: "white",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          borderRadius: "0.3rem",
        }}
      >
        <Autocomplete
          id="asynchronous-demo"
          sx={{ width: 300, marginBottom: "1rem" }}
          open={openIMEI}
          onOpen={() => setOpenIMEI(true)}
          onClose={() => setOpenIMEI(false)}
          isOptionEqualToValue={(option, value) =>
            option.journeyName === value.journeyName
          }
          getOptionLabel={(option) => option.journeyName}
          options={options}
          loading={loading}
          inputValue={inputValue}
          //   value={formField?.---?.value}
          onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{ shrink: false }}
              placeholder={inputValue ? "" : "Select Journey"}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : (
                      params.InputProps.endAdornment
                    )}
                  </React.Fragment>
                ),
              }}
            />
          )}
          onChange={handleOnChange}
        />

        <Autocomplete
          id="asynchronous-demo"
          sx={{ width: 300, marginBottom: "1rem" }}
          open={openJourney}
          onOpen={() => setOpenJourney(true)}
          onClose={() => setOpenJourney(false)}
          isOptionEqualToValue={(option, value) => option.imei === value.imei}
          getOptionLabel={(option) => option.imei.toString()}
          options={options}
          loading={loading}
          inputValue={inputValue}
          //   value={formField?.---?.value}
          onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{ shrink: false }}
              placeholder={inputValue ? "" : "Select IMEI"}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : (
                      params.InputProps.endAdornment
                    )}
                  </React.Fragment>
                ),
              }}
            />
          )}
          onChange={handleOnChange}
        />

        <CustomInput
          label="Start Date"
          type="datetime-local"
          id="scheduleTime"
          name="startDate"
          required
          propsToInputElement={{
            min: moment().format("YYYY-MM-DDTkk:mm"),
          }}
          value={formField?.startDate?.value}
          onChange={handleOnChange}
          error={
            !isTruthy(formField?.startDate?.value) &&
            formField?.startDate?.error
          }
        />

        <CustomInput
          label="Start Date"
          type="datetime-local"
          id="scheduleTime"
          name="startDate"
          required
          propsToInputElement={{
            min: moment().format("YYYY-MM-DDTkk:mm"),
          }}
          value={formField?.startDate?.value}
          onChange={handleOnChange}
          error={
            !isTruthy(formField?.startDate?.value) &&
            formField?.startDate?.error
          }
        />

        {/* <DemoItem label="Desktop variant">
          <DesktopDatePicker defaultValue={dayjs("2022-04-17")} />
        </DemoItem> */}

        <Box sx={{ margin: "5px 5px", width: "300px" }}>
          <PerfectScrollbar>
            <Box
              sx={{
                height: "auto",
                maxHeight: "300px",
                padding: 0,
                backgroundColor: "red",
              }}
            >
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              ></List>
            </Box>
          </PerfectScrollbar>
        </Box>
      </Box>

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <CustomLoader isLoading={isLoading} />
      </Grid>
    </>
  );
};

export default React.memo(Trackplay);
