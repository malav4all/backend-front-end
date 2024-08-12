import { useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { DEVICE_DATA } from "../../Dashboard/service/Dashboard.mutation";
import moment from "moment";
import { FaLock } from "react-icons/fa";
import { LiaSignalSolid } from "react-icons/lia";
import { FaMapPin } from "react-icons/fa";
import { FaCarBattery } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import SpeedLineChart from "./SpeedLineGraph";
import { batteryGraphData, speedGraphData } from "../service/routes.service";
import BatteryLineChart from "./BatteryLineGraph";
import { Box } from "@mui/material";
import { store } from "../../../utils/store";

interface LocationState {
  imei: string;
  status: string;
}

const ViewLiveTracking = () => {
  const [map, setMap] = useState<any>(null);
  const [currentMarker, setCurrentMarker] = useState<any>(null);
  const [trackData, setTrackData] = useState<any>(null);
  const [address, setAddress] = useState<string>("Loading...");
  const location = useLocation();
  const [graphData, setGraphData] = useState<any>();
  console.log("location State:", location.state);

  const apiKey = "B2MP4WbkH6aIrC9n0wxMrMrZhRCjw3EV7loqVzkBbEo";

  const { imei, status } = location.state as LocationState;

  useEffect(() => {
    const platform = new window.H.service.Platform({
      apikey: apiKey,
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
    window.H.ui.UI.createDefault(initialMap, defaultLayers);
    setMap(initialMap);
    return () => {
      window.removeEventListener("resize", () =>
        initialMap.getViewPort().resize()
      );
      initialMap.dispose();
    };
  }, []);

  const { data } = useSubscription(DEVICE_DATA, {
    variables: {
      topicType: "track",
      accountId: store.getState().auth.tenantId,
      imeis: [imei],
    },
  });

  const getReverseGeocodingData = async (
    latitude: number,
    longitude: number
  ) => {
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&lang=en-US&apikey=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Reverse Geocoding Data: ", data);

      if (data.items && data.items.length > 0) {
        const address = data.items[0].address.label;
        return address;
      } else {
        console.log("No address found for the given coordinates.");
        return "No address available";
      }
    } catch (error) {
      console.error("Error during reverse geocoding: ", error);
      return "No address available";
    }
  };

  useEffect(() => {
    if (data?.track) {
      try {
        const trackJson = JSON.parse(data.track);
        setTrackData(trackJson);

        const { longitude, latitude, bearing, imei } = trackJson;

        // Fetch address for the current location
        getReverseGeocodingData(latitude, longitude).then(setAddress);

        const domIconElement = document.createElement("div");
        domIconElement.style.margin = "-20px 0 0 -20px";

        domIconElement.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40">
          <path d="m0.812665,23.806608l37.937001,-22.931615l-21.749812,38.749665l1.374988,-17.749847l-17.562177,1.931797z"
            fill-opacity="null" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#fff"/>
        </svg>`;

        if (currentMarker) {
          map.removeObject(currentMarker);
        }
        const newMarker = new window.H.map.DomMarker(
          { lat: latitude, lng: longitude },
          {
            icon: new window.H.map.DomIcon(domIconElement, {
              onAttach: function (
                clonedElement: any,
                domIcon: any,
                domMarker: any
              ) {
                const clonedContent =
                  clonedElement.getElementsByTagName("svg")[0];
                clonedContent.style.transform = "rotate(" + bearing + "deg)";
              },
            }),
          }
        );
        setCurrentMarker(newMarker);
        map.addObject(newMarker);
      } catch (error) {
        console.error("Error parsing JSON string:", error);
      }
    }
  }, [data]);

  useEffect(() => {
    graphDataHandler();
  }, []);

  const graphDataHandler = async () => {
    try {
      const [online, offline] = await Promise.all([
        speedGraphData({
          input: {
            accountId: store.getState().auth.tenantId,
            imei: imei,
          },
        }),
        batteryGraphData({
          input: {
            accountId: store.getState().auth.tenantId,
            imei: imei,
          },
        }),
      ]);

      setGraphData({
        online: online?.speedGraphData,
        offline: offline?.batteryGraphDataData,
      });
    } catch (error) {}
  };

  return (
    <>
      <Box style={{ position: "relative", height: "100vh" }}>
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "0.5%",
            zIndex: 1000,
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          }}
        >
          <SpeedLineChart dataGraph={graphData?.online} />
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "0.5%",
            zIndex: 1000,
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          }}
        >
          <BatteryLineChart dataGraph={graphData?.offline} />
        </div>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <div id="map" style={{ width: "100%", height: "80%" }}></div>
          {trackData && (
            <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t shadow-lg flex">
              <div className="flex-1 p-2">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.2rem",
                  }}
                >
                  <FaLock style={{ display: "inline" }} />
                  <p className="text-sm font-semibold">{trackData.imei}</p>
                </span>
                <p className="text-sm">
                  Connection:
                  {!trackData?.statusBitDefinition?.connection ? (
                    <span>true</span>
                  ) : (
                    <span>false</span>
                  )}
                </p>
                <p className="text-sm">
                  Last Updated: {moment(trackData.dateTime).fromNow()}
                </p>
                <p className="text-sm">
                  Date/Time:{" "}
                  {moment(trackData.dateTime).format("DD-MM-YYYY HH:mm:ss")}
                </p>
                <p className="text-sm text-green-500">Status: {status}</p>
              </div>
              <div className="flex-1 p-2">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.2rem",
                  }}
                >
                  <LiaSignalSolid style={{ display: "inline" }} />
                  <p className="text-sm font-semibold">Network</p>
                </span>
                Network
                <p className="text-sm">Speed: {trackData.speed} km/h</p>
                <p className="text-sm">
                  Satellites: {trackData["Additional Data"][3].satellites}
                </p>
                <p className="text-sm">Bearing: 0°</p>
              </div>
              <div className="flex-1 p-2">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.2rem",
                  }}
                >
                  <FaMapPin style={{ display: "inline" }} />
                  <p className="text-sm font-semibold">Location</p>
                </span>
                <p className="text-sm">Latitude: {trackData.latitude}</p>
                <p className="text-sm">Longitude: {trackData.longitude}</p>
                <p className="text-sm">Address: {address}</p>
              </div>

              <div className="flex-1 p-2">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.2rem",
                  }}
                >
                  <FaCarBattery style={{ display: "inline" }} />
                  <p className="text-sm font-semibold">Ignition</p>
                </span>
                <p className="text-sm">
                  Ignition:{" "}
                  {!trackData?.statusBitDefinition?.ignitionOn ? (
                    <span>true</span>
                  ) : (
                    <span>false</span>
                  )}
                </p>
              </div>
              <div className="flex-1 p-2">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.2rem",
                  }}
                >
                  <FaCarBattery style={{ display: "inline" }} />
                  <p className="text-sm font-semibold">Battery</p>
                </span>
                <p className="text-sm">
                  Battery Level:{" "}
                  {trackData["Additional Data"][1].batteryPercentage}
                </p>
                <p className="text-sm">
                  {`Battery Voltage: ${trackData["Additional Data"][1].batteryVoltage} V`}
                </p>
              </div>
            </div>
          )}
        </div>
      </Box>
    </>
  );
};

export default ViewLiveTracking;
