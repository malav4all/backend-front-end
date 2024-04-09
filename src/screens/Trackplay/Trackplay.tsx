import React, { useEffect, useState } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import { fetchTrackplayHandler } from "./service/trackplay.service";
import { Box, Slider } from "@mui/material";
import CustomButton from "../../global/components/CustomButton/CustomButton";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import polyline from "@mapbox/polyline";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TrackReport from "./Component/Report";
import * as XLSX from "xlsx";
import moment from "moment";

const Trackplay = () => {
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

    const url = `https://router.hereapi.com/v8/import?transportMode=car&return=polyline,turnByTurnActions,actions,instructions,travelSummary&apiKey=7snf2Sz_ORd8AClElg9h43HXV8YPI1pbVHyz2QvPsZI`;

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
        { instruction, action, duration, length, offset }: any,
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

  const reportDownload = () => {};

  const trackPlayApiHandler = async () => {
    const trackdata = await fetchTrackplayHandler();
    addPolylineToMap(trackdata.getRowData);
    getReports(trackdata.getRowData);
    setRawData(trackdata.getRowData);
  };

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
          document={<TrackReport reportData={dataValue} />}
          fileName={"Report.pdf"}
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              "Loading..."
            ) : (
              <button
                style={{
                  width: "100px",
                  padding: "13px 5px",
                  marginTop: "8px",
                  outline: "none",
                  backgroundColor: stop ? "#ffffff" : "#FF5733",
                  color: stop ? "#333" : "white",
                }}
                className="button"
              >
                Print Report
              </button>
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
      <Box
        display={"flex"}
        gap={3}
        pb={1}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          background: "grey",
          backgroundColor: "#5bc0de",
          color: "white",
        }}
      >
        <CustomButton
          label={"Start"}
          onClick={trackPlayApiHandler}
          disabled={journeyStarted}
          customClasses={{
            width: "100px",
            marginTop: "8px",
            backgroundColor: "#5bc0dv",
            color: "white",
          }}
        />
        <div style={{ width: 300 }}>
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
          />
        </div>
        <CustomButton
          customClasses={{
            width: "100px",
            marginTop: "8px",
            backgroundColor: stop ? "#ffffff" : "#f0ad4e",
            color: stop ? "#333" : "white",
          }}
          onClick={toggleMovement}
          icon={stop ? <PlayCircleFilledIcon /> : <StopCircleIcon />}
        />
        <CustomButton
          label={"Download Excel"}
          customClasses={{
            width: "100px",
            marginTop: "8px",
            backgroundColor: stop ? "#ffffff" : "#FF5733",
            color: stop ? "#333" : "white",
          }}
          onClick={generateExcelFile}
        />
        {downloadReport()}
      </Box>
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default React.memo(Trackplay);
