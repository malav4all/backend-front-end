import React, { useEffect, useRef, useState } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import { fetchTrackplayHandler } from "./service/trackplay.service";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Slider,
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
  // const classes = trackplayStyle();
  const [map, setMap] = useState<any>(null);
  const [speed, setSpeed] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [dataValue, setDataValue] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [timeoutIds, setTimeoutIds] = useState<number[]>([]);
  const currentMarkerRef = useRef<any>(null);
  const [isStopped, setIsStopped] = useState(false);

  const marks = [
    { value: 1, label: "1X" },
    { value: 2, label: "2X" },
    { value: 3, label: "3X" },
    { value: 4, label: "4X" },
  ];

  const getReports = async (dataTest: any) => {
    const finalArr = dataTest.map(
      ({ direction, __typename, label, lat, lng, ...rest }: any) => ({
        ...rest,
        lat: Number(lat),
        lng: Number(lng),
      })
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
      ) => ({
        sNo: index,
        imei: dataTest[0].label,
        instruction,
        action,
        duration,
        length,
        offset,
        currentTime,
      })
    );

    setDataValue(reportData);
  };

  function addPolylineToMap(data: any) {
    const polylines = [];
    const speedColors = {
      60: "#FF0000", // Red for 60
      40: "#FFA500", // Orange for 40
      30: "#FFFF00", // Yellow for 30
      20: "#008000", // Green for 20
      10: "#0000FF", // Blue for 10
      0: "#800080", // Purple for 0
    };

    for (let i = 0; i < data.length - 1; i++) {
      const point1 = data[i];
      const point2 = data[i + 1];
      const speed = point1.speed;

      let color;
      if (speed >= 60) {
        color = speedColors[60];
      } else if (speed >= 40) {
        color = speedColors[40];
      } else if (speed >= 30) {
        color = speedColors[30];
      } else if (speed >= 20) {
        color = speedColors[20];
      } else if (speed >= 10) {
        color = speedColors[10];
      } else {
        color = speedColors[0];
      }

      const segmentLine = new window.H.geo.LineString();
      segmentLine.pushPoint({
        lat: Number(point1.lat),
        lng: Number(point1.lng),
      });
      segmentLine.pushPoint({
        lat: Number(point2.lat),
        lng: Number(point2.lng),
      });

      const polyline = new window.H.map.Polyline(segmentLine, {
        style: { lineWidth: 5, strokeColor: color },
      });
      polylines.push(polyline);
    }

    polylines.forEach((polyline) => map.addObject(polyline));
  }

  const trackPlayApiHandler = async () => {
    setIsLoading(true);
    const trackdata = await fetchTrackplayHandler();
    addPolylineToMap(trackdata.getRowData);
    await getReports(trackdata.getRowData);
    setRawData(trackdata.getRowData);
    setIsLoading(false);
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

    window.addEventListener("resize", () => initialMap.getViewPort().resize());

    return () => {
      if (initialMap) {
        initialMap.dispose();
      }
      window.removeEventListener("resize", () =>
        initialMap.getViewPort().resize()
      );
    };
  }, []);

  const test = () => {
    const interpolatedPoints = interpolatePoints(rawData);
    let newTimeouts: any[] = [];
    interpolatedPoints.forEach((item, index) => {
      const timeoutId = setTimeout(() => {
        const { lat, lng, direction } = item;
        animate(lat, lng, direction);
      }, (index * 100) / speed); // Adjust the delay as needed for smoothness
      newTimeouts.push(timeoutId);
    });
    setTimeoutIds(newTimeouts);
  };

  const interpolatePoints = (data: string | any[]) => {
    const points = [];
    for (let i = 0; i < data.length - 1; i++) {
      const start = data[i];
      const end = data[i + 1];
      const numInterpolations = 10; // Adjust for smoothness
      for (let j = 0; j < numInterpolations; j++) {
        const lat = interpolate(parseFloat(start.lat), parseFloat(end.lat), j / numInterpolations);
        const lng = interpolate(parseFloat(start.lng), parseFloat(end.lng), j / numInterpolations);
        const direction = calculateAngle(start, end);
        points.push({ lat, lng, direction });
      }
    }
    return points;
  };

  const interpolate = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  const calculateAngle = (start: any, end: any) => {
    const dy = end.lat - start.lat;
    const dx = end.lng - start.lng;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  const animate = (lat: any, lng: any, direction: any) => {
    const rotation = direction - 45; // Adjust angle to match the SVG orientation

    if (currentMarkerRef.current) {
        const currentMarker = currentMarkerRef.current;
        const currentPosition = currentMarker.getGeometry();
        const currentRotation = parseFloat(currentMarker.getData().angle);
        const positionChanged = Math.abs(currentPosition.lat - lat) > 0.0001 || Math.abs(currentPosition.lng - lng) > 0.0001;
        const rotationChanged = Math.abs(currentRotation - rotation) > 1;

        if (!positionChanged && !rotationChanged) return;

        // Update marker position and rotation
        if (positionChanged) {
            currentMarker.setGeometry({ lat, lng });
        }

        if (rotationChanged) {
            const domIcon = currentMarker.getIcon();
            if (domIcon) {
                const markerElement = domIcon.getElement();
                const svgElement = markerElement.getElementsByTagName("svg")[0];
                if (svgElement) {
                    svgElement.style.transform = `rotate(${rotation}deg)`;
                }
                currentMarker.setData({ angle: rotation });
            }
        }
        return;
    }

    // Create the marker if it doesn't exist
    const domIconElement = document.createElement("div");
    domIconElement.style.margin = "-20px 0 0 -20px";
    domIconElement.innerHTML = `
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" transform-origin="center center">
        <path d="m0.812665,23.806608l37.937001,-22.931615l-21.749812,38.749665l1.374988,-17.749847l-17.562177,1.931797z"
          fill-opacity="null" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#fff"/>
    </svg>`;

    const newMarker = new window.H.map.DomMarker(
        { lat, lng },
        {
            icon: new window.H.map.DomIcon(domIconElement, {
                onAttach: (clonedElement: any) => {
                    const svgElement = clonedElement.getElementsByTagName("svg")[0];
                    if (svgElement) {
                        svgElement.style.transition = "transform 0.1s ease-out";
                        svgElement.style.transform = `rotate(${rotation}deg)`;
                    }
                }
            }),
        }
    );
    newMarker.setData({ angle: rotation });

    map.addObject(newMarker);
    currentMarkerRef.current = newMarker;
};

  const handleSpeedChange = (event: any, newValue: any) => {
    setSpeed(newValue);
  };

  const handleClick = () => {
    if (timeoutIds.length > 0) {
      timeoutIds.forEach((id) => clearTimeout(id));
    }
    test();
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

  const inputSection = () => (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
        <CustomInput
          label="Journey Name"
          placeHolder="Enter Journey name"
          required
          name="journeyName"
        />
      </Grid>

      <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
        <CustomInput
          label="IMEI"
          placeHolder="Enter IMEI name"
          required
          name="imei"
        />
      </Grid>

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
        />
      </Grid>

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
        />
      </Grid>
    </Grid>
  );

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
              backgroundColor: isStopped ? "#ffffff" : "#f0ad4e",
              color: isStopped ? "#333" : "white",
            }}
            onClick={handleClick}
            icon={
              isStopped ? (
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
          <AccordionSummary aria-controls="panel1-content" id="speed-scale">
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
                sx={{ height: 8 }}
              />
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary aria-controls="panel2-content" id="panel2-header">
            <Typography>Reports</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button
              onClick={generateExcelFile}
              sx={{
                backgroundColor: isStopped ? "#ffffff" : "#FF5733",
                color: isStopped ? "#333" : "white",
                display: "flex",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <RiFileExcel2Fill />
            </Button>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default React.memo(Trackplay);
