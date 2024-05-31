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
  const [marker, setMarker] = useState<any>(null);
  const [lineString, setLineString] = useState<any>(null);
  const [speed, setSpeed] = useState(1);
  const [currentMarker, setCurrentMarker] = useState(null);
  const [animationFrameId, setAnimationFrameId] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stop, setStop] = useState(false);
  const [lastStoppedIndex, setLastStoppedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [dataValue, setDataValue] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [timeoutIds, setTimeoutIds] = useState([]);
  const currentMarkerRef = useRef<any>(null);
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

    polylines.forEach(polyline => map.addObject(polyline));

    const svgMarkup = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40">
    <path d="m0.812665,23.806608l37.937001,-22.931615l-21.749812,38.749665l1.374988,-17.749847l-17.562177,1.931797z"
      fill-opacity="null" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#fff"/>
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
    return () => {
      window.removeEventListener("resize", () =>
        initialMap.getViewPort().resize()
      );
      initialMap.dispose();
    };
  }, []);
  let testMarker = null;

  const test = () => {
    let timeouts: any = [];
    rawData.forEach((item, index) => {
      const timeoutId = setTimeout(() => {
        const { lat, lng, direction } = item;
        animate(lat, lng, direction);
      }, (index * 1000) / speed); // Adjust the delay as needed based on speed
      timeouts.push(timeoutId);
    });
    setTimeoutIds(timeouts);
  };

  const animate = (lat: any, lng: any, direction: any) => {
    const domIconElement = document.createElement("div");
    domIconElement.style.margin = "-20px 0 0 -20px";
    const rotation = parseFloat(direction);

    domIconElement.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40"  transform-origin="center center">
    <path d="m0.812665,23.806608l37.937001,-22.931615l-21.749812,38.749665l1.374988,-17.749847l-17.562177,1.931797z"
      fill-opacity="null" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#fff"/>
  </svg>`;

    if (currentMarkerRef.current) {
      // console.log("Removing current marker:", currentMarkerRef.current);
      map.removeObject(currentMarkerRef.current);
    }

    const newMarker = new window.H.map.DomMarker(
      { lat, lng },
      {
        icon: new window.H.map.DomIcon(domIconElement, {
          onAttach: function (clonedElement: any) {
            const svgElement = clonedElement.getElementsByTagName("svg")[0];
            if (svgElement) {
              console.log("Before rotation:", svgElement.style.transform);
              let rotation = parseFloat(direction) - 40;
              svgElement.style.transform = "rotate(" + rotation + "deg)";
              svgElement.style.transformOrigin = "center center";
              console.log("After rotation:", rotation);
            } else {
              console.error("SVG element not found");
            }
          },
        }),
      }
    );

    map.addObject(newMarker);
    currentMarkerRef.current = newMarker;
  };
  const handleSpeedChange = (event: any, newValue: any) => {
    setSpeed(newValue);
  };

  const handleClick = () => {
    if (timeoutIds.length > 0) {
      timeoutIds.forEach(id => clearTimeout(id));
    }
    test();
  };

  useEffect(() => {
    return () => {
      if (timeoutIds.length > 0) {
        timeoutIds.forEach(id => clearTimeout(id));
      }
    };
  }, [timeoutIds]);

  const toggleMovement = () => {
    setStop(prevStop => !prevStop);
  };

  // const downloadReport = () => {
  //   return (
  //     <>
  //       <PDFDownloadLink
  //         document={<TrackReport reportData={dataValue} rawData={rawData} />}
  //         fileName={"Report.pdf"}
  //       >
  //         {({ blob, url, loading, error }) =>
  //           loading ? (
  //             "Loading..."
  //           ) : (
  //             <Button
  //               onClick={generateExcelFile}
  //               sx={{
  //                 backgroundColor: stop ? "#ffffff" : "#FF5733",
  //                 color: "white",
  //                 display: "flex",
  //                 gap: "0.5rem",
  //                 textDecoration: "none",
  //               }}
  //             >
  //               <BsFileEarmarkPdfFill />
  //             </Button>
  //           )
  //         }
  //       </PDFDownloadLink>
  //     </>
  //   );
  // };

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
            onClick={handleClick}
            icon={
              true ? (
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
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default React.memo(Trackplay);
