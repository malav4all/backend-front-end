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
import Speedometer from "./Speedometer";
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

  const apiKey = "B2MP4WbkH6aIrC9n0wxMrMrZhRCjw3EV7loqVzkBbEo";

  const { imei, status } = location?.state as LocationState;

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
        zoom: 8,
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
      if (data.items && data.items.length > 0) {
        const address = data.items[0].address.label;
        return address;
      } else {
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
        map.setZoom(15);
        // Fetch address for the current location
        getReverseGeocodingData(latitude, longitude).then(setAddress);

        const domIconElement = document.createElement("div");
        domIconElement.style.margin = "-20px 0 0 -20px";

        domIconElement.innerHTML = `<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="rgba(255, 255, 255, 0.5)" stroke="none" />
  <polygon points="50,20 70,65 50,55 30,65" fill="#7C58CB" stroke="#5F22E1" stroke-width="2" />
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

        map.setCenter({ lat: latitude, lng: longitude });
        map.setZoom(15);
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
            top: "27%",
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
            top: "53%",
            left: "0.5%",
            zIndex: 1000,
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          }}
        >
          <BatteryLineChart dataGraph={graphData?.offline} />
        </div>
        <div
          style={{
            position: "absolute",
            top: "28%",
            right: "0.4%",
            zIndex: 1000,
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          }}
        >
          {trackData && <Speedometer speed={trackData?.speed} />}
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
                <p className="text-sm py-1">
                  Status:{" "}
                  <span className=" bg-green-500 rounded p-1 text-white">
                    {status}
                  </span>
                </p>
                <p className="text-sm">
                  Connection:{" "}
                  {!trackData?.statusBitDefinition?.connection ? (
                    <span>Connected</span>
                  ) : (
                    <span>Not Connected</span>
                  )}
                </p>
                <p className="text-sm">
                  Last Updated: {moment(trackData.dateTime).fromNow()}
                </p>
                <p className="text-sm">
                  Date/Time:{" "}
                  {moment(trackData.dateTime).format("DD-MM-YYYY HH:mm:ss")}
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
                  <LiaSignalSolid style={{ display: "inline" }} />
                  <p className="text-sm font-semibold">Network</p>
                </span>
                <p className="text-sm">Speed: {trackData.speed} km/h</p>

                {trackData["Additional Data"] && (
                  <>
                    <p className="text-sm">
                      Satellites:{" "}
                      {trackData["Additional Data"].find((item: any) =>
                        item.hasOwnProperty("satellites")
                      )?.satellites || "N/A"}
                    </p>
                  </>
                )}

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
                    <span>On</span>
                  ) : (
                    <span>Off</span>
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
                {trackData["Additional Data"] && (
                  <>
                    <p className="text-sm">
                      Battery Level:{" "}
                      {trackData["Additional Data"].find((item: any) =>
                        item.hasOwnProperty("batteryPercentage")
                      )?.batteryPercentage || "N/A"}{" "}
                      %
                    </p>
                    <p className="text-sm">
                      {`Battery Voltage: ${
                        trackData["Additional Data"].find((item: any) =>
                          item.hasOwnProperty("batteryVoltage")
                        )?.batteryVoltage || "N/A"
                      } mV`}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </Box>
    </>
  );
};

export default ViewLiveTracking;
