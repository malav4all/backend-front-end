import React, { useEffect, useState } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import { fetchTrackplayHandler } from "./service/trackplay.service";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Grid,
  InputLabel,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import CustomButton from "../../global/components/CustomButton/CustomButton";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import polyline from "@mapbox/polyline";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TrackReport from "./Component/Report";
import * as XLSX from "xlsx";
import moment from "moment";
import { RiFileExcel2Line } from "react-icons/ri";
import trackplayStyle from "./Trackplay.styles";
import { CustomInput } from "../../global/components";
import { RiFileExcel2Fill } from "react-icons/ri";

const Trackplay = () => {
  const classes = trackplayStyle;
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [lineString, setLineString] = useState<any>(null);
  const [speed, setSpeed] = useState(1);
  const [animation, setAnimation] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stop, setStop] = useState(false);
  const [lastStoppedIndex, setLastStoppedIndex] = useState(0);
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataValue, setDataValue] = useState([]);
  const [rawData, setRawData] = useState([]);

  const marks = [
    { value: 1, label: "1X" },
    { value: 2, label: "2X" },
    { value: 3, label: "3X" },
    { value: 4, label: "4X" },
  ];

  const getReports = async (dataTest: any) => {
    const finalArr = dataTest.map(
      ({ direction, __typename, label, lat, lng, ...rest }: any) => {
        return {
          ...rest,
          lat: Number(lat),
          lng: Number(lng),
        };
      }
    );

    const payload = { trace: finalArr };

    const url = `https://router.hereapi.com/v8/import?transportMode=car&return=polyline,turnByTurnActions,actions,instructions,travelSummary&apiKey=B2MP4WbkH6aIrC9n0wxMrMrZhRCjw3EV7loqVzkBbEo`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    const route = data.routes[0];
    const reportData = route.sections[0].actions.map(
      (
        { instruction, action, duration, length, offset, currentTime }: any,
        index: number
      ) => {
        return {
          sNo: index,
          imei: dataTest[0].label,
          instruction,
          action,
          duration,
          length,
          offset,
          currentTime,
        };
      }
    );

    setDataValue(reportData);
  };

  function addPolylineToMap(data: any) {
    const mapLine = new window.H.geo.LineString();
    data.forEach((item: any) => {
      mapLine.pushPoint({ lat: Number(item.lat), lng: Number(item.lng) });
    });
    const polyline = new window.H.map.Polyline(mapLine, {
      style: { lineWidth: 5 },
    });
    map.addObject(polyline);
    const svgMarkup =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="40" height="40" style="enable-background:new 0 0 512 512" xml:space="preserve"><path style="fill:#e6e6e6" d="m286.378 211.608-3.972 37.7L256 499.819l-26.417-250.511-3.972-37.7z"/><circle style="fill:#f95428" cx="256.006" cy="114.203" r="102.017"/><path style="fill:#e54728" d="M294.383 177.829c-56.341 0-102.013-45.673-102.013-102.013 0-18.311 4.849-35.479 13.296-50.336-30.854 17.543-51.678 50.688-51.678 88.718 0 56.341 45.673 102.013 102.013 102.013 38.03 0 71.174-20.825 88.718-51.678-14.856 8.449-32.025 13.296-50.336 13.296z"/><path style="fill:#b3b3b3" d="m286.378 211.608-3.972 37.702c-8.42 2.266-17.267 3.461-26.406 3.461s-17.998-1.206-26.418-3.461l-3.972-37.702h60.768z"/><path style="fill:#333" d="M370.199 114.199C370.199 51.229 318.97 0 256 0S141.801 51.229 141.801 114.199c0 48.26 30.091 89.622 72.495 106.314l29.579 280.579a12.186 12.186 0 0 0 24.237 0l29.579-280.575c42.412-16.69 72.508-58.055 72.508-106.318zM255.996 383.587 239.51 227.203a114.708 114.708 0 0 0 16.491 1.195c5.597 0 11.097-.412 16.481-1.193l-16.486 156.382zm.004-179.56c-49.53 0-89.828-40.296-89.828-89.828S206.47 24.371 256 24.371s89.828 40.296 89.828 89.828-40.296 89.828-89.828 89.828z"/><ellipse transform="rotate(-134.999 293.699 78.6)" style="fill:#f47c6c" cx="293.697" cy="78.6" rx="37.113" ry="25.87"/></svg>';
    const icon = new window.H.map.Icon(svgMarkup);
    const marker = new window.H.map.Marker(mapLine.extractPoint(0), {
      icon: icon,
    });
    map.addObject(marker);
    setLineString(mapLine);
    setMarker(marker);
  }

  const trackPlayApiHandler = async () => {
    const trackdata = await fetchTrackplayHandler();

    addPolylineToMap(trackdata.getRowData);
    getReports(trackdata.getRowData);
    setRawData(trackdata.getRowData);
  };

  useEffect(() => {
    const platform = new window.H.service.Platform({
      apikey: "B2MP4WbkH6aIrC9n0wxMrMrZhRCjw3EV7loqVzkBbEo",
    });
    const defaultLayers = platform.createDefaultLayers();

    const initialMap = new window.H.Map(
      document.getElementById("map"),
      defaultLayers.vector.normal.map,
      {
        center: { lat: 28.495831757053296, lng: 77.07923644083718 },
        zoom: 5,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );

    new window.H.mapevents.Behavior(
      new window.H.mapevents.MapEvents(initialMap)
    );
    setMap(initialMap);
    window.H.ui.UI.createDefault(initialMap, defaultLayers);
    return () => {
      window.removeEventListener("resize", () =>
        initialMap.getViewPort().resize()
      );
      initialMap.dispose();
    };
  }, []);

  useEffect(() => {
    if (marker && lineString && map && !stop) {
      marker.getGeometry();
      const totalPoints = lineString.getPointCount();
      const interval = setInterval(() => {
        const currentPoint = lineString.extractPoint(currentIndex);
        marker.setGeometry(currentPoint);
        setCurrentIndex(
          (prevIndex) => (prevIndex + speed + totalPoints) % totalPoints
        );
        if (currentIndex === 0 && speed !== 0) {
          clearInterval(interval);
          setStop(true);
          setLastStoppedIndex(currentIndex);
        }
      }, 5000 / (speed * 20));
      setAnimation(interval);
    }
    return () => clearInterval(animation);
  }, [marker, lineString, speed, currentIndex, map, stop, lastStoppedIndex]);

  const handleSpeedChange = (event: any, newValue: any) => {
    setSpeed(newValue);
  };

  const toggleMovement = () => {
    setStop((prevStop) => !prevStop);
  };

  const downloadReport = () => {
    return (
      <>
        <PDFDownloadLink
          document={<TrackReport reportData={dataValue} rawData={rawData} />}
          fileName={"Report.pdf"}
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              "Loading..."
            ) : (
              <Button
                onClick={generateExcelFile}
                sx={{
                  backgroundColor: stop ? "#ffffff" : "#FF5733",
                  color: "white",
                  display: "flex",
                  gap: "0.5rem",
                  textDecoration: "none",
                }}
              >
                <BsFileEarmarkPdfFill />
              </Button>
            )
          }
        </PDFDownloadLink>
      </>
    );
  };

  const generateExcelFile = () => {
    const modifiedData = rawData.map((item: any) => ({
      IMEI: item.imei,
      Vehicle_No: item.label,
      Latitude: item.lat,
      Longitude: item.lng,
      Time: item.currentTime
        ? moment(item.currentTime).format("DD-MM-YYYY HH:mm:ss A")
        : "",
    }));
    const worksheet = XLSX.utils.json_to_sheet(modifiedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "TrackReport.xlsx");
  };

  const inputSection = () => {
    return (
      <>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <CustomInput
              label="Journey Name"
              placeHolder="Enter Journey name"
              // value={formField?.journeyName?.value}
              required
              name="journeyName"
              // onChange={handleOnChange}
              // error={formField?.journeyName?.error}
            />
          </Grid>

          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <CustomInput
              label="IMEI"
              placeHolder="Enter IMEI name"
              // value={formField?.journeyName?.value}
              required
              name="imei"
              // onChange={handleOnChange}
              // error={formField?.journeyName?.error}
            />
          </Grid>

          {/* start data */}
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <CustomInput
              label="Start Date"
              type="datetime-local"
              id="scheduleTime"
              name="startDate"
              required
              propsToInputElement={{
                min: moment().format("YYYY-MM-DDTkk:mm"),
              }}
              // value={formField?.startDate?.value}
              // onChange={handleOnChange}
              // error={
              //   !isTruthy(formField?.startDate?.value) &&
              //   formField?.startDate?.error
              // }
            />
          </Grid>

          {/* end date */}
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <CustomInput
              label="End Date"
              type="datetime-local"
              id="scheduleTime"
              name="endDate"
              required
              propsToInputElement={{
                min: moment().format("YYYY-MM-DDTkk:mm"),
              }}
              // value={formField?.endDate?.value}
              // onChange={handleOnChange}
              // error={
              //   !isTruthy(formField?.endDate?.value) &&
              //   formField?.endDate?.error
              // }
            />
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <Box
      component={"div"}
      id="map"
      style={{
        width: "100%",
        zIndex: 1,
        height: "100%",
        position: "relative",
      }}
    >
      <CustomLoader isLoading={isLoading} />

      <Box
        sx={{
          position: "absolute",
          top: "1rem",
          left: "0.3rem",
          zIndex: "2",
          width: "94%",
          margin: "auto",
          padding: "1rem 2rem",
          borderRadius: "5px",
          backgroundColor: "white",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <Grid container>
          <Grid container xs={12} md={10} lg={10} xl={10}>
            {inputSection()}
          </Grid>

          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "end",
            }}
            xs={12}
            md={2}
            lg={2}
            xl={2}
          >
            <CustomButton
              id="users_add_button"
              label={"Submit"}
              onClick={trackPlayApiHandler}
              customClasses={{
                width: "150px",
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "9rem",
          right: "2rem",
          zIndex: "2",
          backgroundColor: "white",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          padding: "1rem",
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            width: "200px",
            gap: "0.5rem",
            justifyContent: "space-between",
          }}
        >
          <CustomButton
            customClasses={{
              marginBottom: "8px",
              backgroundColor: stop ? "#ffffff" : "#f0ad4e",
              color: stop ? "#333" : "white",
            }}
            onClick={toggleMovement}
            icon={
              stop ? (
                <Box
                  sx={{ display: "flex", gap: "1rem", alignItems: "center" }}
                >
                  <Typography>Stop</Typography>
                </Box>
              ) : (
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <Typography>Start</Typography>
                </Box>
              )
            }
          />
        </Box>

        <Accordion>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="speed-scale"
          >
            <Typography>Speed</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ width: 150, margin: "auto" }}>
              <Slider
                aria-label="Restricted values"
                value={speed}
                onChange={handleSpeedChange}
                valueLabelDisplay="auto"
                defaultValue={0}
                step={1}
                marks={marks}
                min={1}
                max={4}
                sx={{
                  height: 8,
                }}
              />
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Reports</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button
              onClick={generateExcelFile}
              sx={{
                backgroundColor: stop ? "#ffffff" : "#FF5733",
                color: stop ? "#333" : "white",
                display: "flex",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <RiFileExcel2Fill />
            </Button>

            {downloadReport()}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default React.memo(Trackplay);
