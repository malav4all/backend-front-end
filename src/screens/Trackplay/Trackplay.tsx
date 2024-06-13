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
  const classes = trackplayStyle;
  const [map, setMap] = useState<any>(null);
  const [speed, setSpeed] = useState(1);
  const [currentMarker, setCurrentMarker] = useState(null);
  const [animationFrameId, setAnimationFrameId] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stop, setStop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataValue, setDataValue] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [timeoutIds, setTimeoutIds] = useState<number[]>([]);
  const currentMarkerRef = useRef<any>(null);
  const currentIndexRef = useRef(currentIndex);
  const speedRef = useRef(speed);
  const marks = [
    { value: 1, label: "1X" },
    { value: 2, label: "2X" },
    { value: 3, label: "3X" },
    { value: 4, label: "4X" },
  ];
  
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

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
    const polylines = [];
    const speedColors = {
      40: "#007bff", // Blue for 40
      20: "#FFAC34", // Yellow for 20
      0: "#FF7D90", // Red for 0
    };

    // Initialize the bounding box with the first point
    let boundingBox = new window.H.geo.Rect(
      Number(data[0].lat),
      Number(data[0].lng),
      Number(data[0].lat),
      Number(data[0].lng)
    );

    for (let i = 0; i < data.length - 1; i++) {
      const point1 = data[i];
      const point2 = data[i + 1];
      const speed = point1.speed;

      let color;
      if (speed >= 40) {
        color = speedColors[40];
      } else if (speed >= 20) {
        color = speedColors[20];
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

      // Update the bounding box with the new points
      boundingBox = boundingBox.mergePoint({
        lat: Number(point1.lat),
        lng: Number(point1.lng),
      });
      boundingBox = boundingBox.mergePoint({
        lat: Number(point2.lat),
        lng: Number(point2.lng),
      });

      const polyline = new window.H.map.Polyline(segmentLine, {
        style: { lineWidth: 10, strokeColor: color },
      });

      polylines.push(polyline);
    }

    polylines.forEach((polyline) => map.addObject(polyline));

    // Zoom to fit the bounding box
    map.getViewModel().setLookAtData({
      bounds: boundingBox,
    });

    // Set a specific zoom level to zoom in as desired
    map.setZoom(12);

    const svgMarkup = `<svg width="24" height="24" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="80" fill="rgba(204, 230, 255, 0.6)" stroke="rgba(0, 123, 255, 0.9)" stroke-width="2" />
      <circle cx="100" cy="100" r="30" fill="#007bff" stroke="#ffffff" stroke-width="5" />
    </svg>`;
    const icon = new window.H.map.Icon(svgMarkup);
    const initalMarker = new window.H.map.Marker(
      { lat: Number(data[0].lat), lng: Number(data[0].lng) },
      { icon: icon }
    );
    // map.addObject(initalMarker);
    // setCurrentMarker(initalMarker);
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
    window.addEventListener("resize", () => initialMap.getViewPort().resize());

    return () => {
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
        setCurrentIndex(currentIndex + index + 1);
      }, (index * 100) / speedRef.current);
      newTimeouts.push(timeoutId);
    });
    setTimeoutIds(newTimeouts);
  };

  const interpolatePoints = (data: string | any[]) => {
    const points = [];
    for (let i = 0; i < data.length - 1; i++) {
      const start = data[i];
      const end = data[i + 1];
      const numInterpolations = 10;
      for (let j = 0; j < numInterpolations; j++) {
        const lat = interpolate(
          parseFloat(start.lat),
          parseFloat(end.lat),
          j / numInterpolations
        );
        const lng = interpolate(
          parseFloat(start.lng),
          parseFloat(end.lng),
          j / numInterpolations
        );
        const direction = interpolateDirection(
          start.direction,
          end.direction,
          j / numInterpolations
        );
        points.push({ lat, lng, direction });
      }
    }
    return points;
  };

  const interpolate = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  const interpolateDirection = (start: number, end: number, factor: number) => {
    let delta = end - start;
    if (delta > 180) {
      delta -= 360;
    } else if (delta < -180) {
      delta += 360;
    }
    return start + delta * factor;
  };

  const animate = (lat: number, lng: number, direction: number) => {
    if (currentMarkerRef.current) {
      // Update marker position
      currentMarkerRef.current.setGeometry({ lat, lng });

      // Update rotation of the marker
      const svgElement = currentMarkerRef.current.getData();
      if (svgElement) {
        svgElement.style.transform = `rotate(${direction}deg)`;
        svgElement.style.transition = `transform 1s ease-in-out`;
        svgElement.style.transformOrigin = "center center";
      }
    } else {
      const domIconElement = document.createElement("div");
      domIconElement.style.margin = "-30px 0 0 -27px";
      domIconElement.classList.add("move-animation");

      domIconElement.innerHTML = `<svg width="60" height="60" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="80" fill="rgba(204, 230, 255, 0.4)" stroke="rgba(0, 123, 255, 0.4)" stroke-width="2" />
        <circle cx="100" cy="100" r="30" fill="#007bff" stroke="#ffffff" stroke-width="5" />
      </svg>`;

      const newMarker = new window.H.map.DomMarker(
        { lat, lng },
        {
          icon: new window.H.map.DomIcon(domIconElement, {
            onAttach: (clonedElement: any) => {
              const svgElement = clonedElement.querySelector("svg");
              if (svgElement) {
                svgElement.classList.add("rotate-animation");
                svgElement.style.transform = `rotate(${direction}deg)`;
                svgElement.style.transition = `transform 1s ease-in-out`;
                svgElement.style.transformOrigin = "center center";
              }
            },
          }),
        }
      );

      newMarker.setData(domIconElement.querySelector("svg"));

      map.addObject(newMarker);
      currentMarkerRef.current = newMarker;
    }
  };

  const handleSpeedChange = (event: any, newValue: any) => {
    let speedMultiplier;
    switch (newValue) {
      case 1:
        speedMultiplier = 2;
        break;
      case 2:
        speedMultiplier = 4;
        break;
      case 3:
        speedMultiplier = 8;
        break;
      case 4:
        speedMultiplier = 10;
        break;
      default:
        speedMultiplier = 2;
    }
  
    setSpeed(newValue);
    speedRef.current = speedMultiplier;
  
    // Clear existing timeouts
    if (timeoutIds.length > 0) {
      timeoutIds.forEach((id) => clearTimeout(id));
    }
  
    // Continue animation from the current position
    animateFromCurrentPosition();
  };
  

  const animateFromCurrentPosition = () => {
    const interpolatedPoints = interpolatePoints(rawData);
    let newTimeouts: any[] = [];
    interpolatedPoints.slice(currentIndexRef.current).forEach((item, index) => {
      const timeoutId = setTimeout(() => {
        const { lat, lng, direction } = item;
        animate(lat, lng, direction);
        setCurrentIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          currentIndexRef.current = newIndex;
          return newIndex;
        });
      }, (index * 100) / speedRef.current);
      newTimeouts.push(timeoutId);
    });
    setTimeoutIds(newTimeouts);
  };

  const handleClick = () => {
    if (timeoutIds.length > 0) {
      timeoutIds.forEach((id) => clearTimeout(id));
    }
    test();
  };

  // useEffect(() => {
  //   return () => {
  //     if (timeoutIds.length > 0) {
  //       timeoutIds.forEach((id) => clearTimeout(id));
  //     }
  //   };
  // }, []);

  const toggleMovement = () => {
    setStop((prevStop) => !prevStop);
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

  // const inputSection = () => {
  //   return (
  //     <>
  //       <Grid container spacing={4}>
  //         <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
  //           <CustomInput
  //             label="Journey Name"
  //             placeHolder="Enter Journey name"
  //             required
  //             name="journeyName"
  //           />
  //         </Grid>

  //         <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
  //           <CustomInput
  //             label="IMEI"
  //             placeHolder="Enter IMEI name"
  //             required
  //             name="imei"
  //           />
  //         </Grid>

  //         <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
  //           <CustomInput
  //             label="Start Date"
  //             type="datetime-local"
  //             id="scheduleTime"
  //             name="startDate"
  //             required
  //             propsToInputElement={{
  //               min: moment().format("YYYY-MM-DDTkk:mm"),
  //             }}
  //           />
  //         </Grid>

  //         <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
  //           <CustomInput
  //             label="End Date"
  //             type="datetime-local"
  //             id="scheduleTime"
  //             name="endDate"
  //             required
  //             propsToInputElement={{
  //               min: moment().format("YYYY-MM-DDTkk:mm"),
  //             }}
  //           />
  //         </Grid>
  //       </Grid>
  //     </>
  //   );
  // };

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

      {/* <Box
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
          </Grid>
        </Grid>
      </Box> */}

      <Box
        sx={{
          position: "absolute",
          top: "2rem",
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
            display: "flex",
            gap: "0.5rem",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
          }}
        >
          <CustomButton
            id="users_add_button"
            label={"Plot"}
            onClick={trackPlayApiHandler}
            customClasses={{
              width: "150px",
            }}
          />

          <CustomButton
            customClasses={{
              backgroundColor: stop ? "#ffffff" : "#f0ad4e",
              color: stop ? "#333" : "white",
            }}
            onClick={handleClick}
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
                backgroundColor: stop ? "#ffffff" : "#FF5733",
                color: stop ? "#333" : "white",
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
