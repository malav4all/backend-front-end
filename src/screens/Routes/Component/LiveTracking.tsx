import { useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { DEVICE_DATA } from "../../Dashboard/service/Dashboard.mutation";
import moment from "moment";

const ViewLiveTracking = () => {
  const [map, setMap] = useState<any>(null);
  const [currentMarker, setCurrentMarker] = useState<any>(null);
  const [trackData, setTrackData] = useState<any>(null);
  const [address, setAddress] = useState<string>("Loading...");

  const apiKey = "B2MP4WbkH6aIrC9n0wxMrMrZhRCjw3EV7loqVzkBbEo";

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
    variables: { topicType: "track", accountId: "IMZ113343", imeis: [] },
  });

  const getReverseGeocodingData = async (latitude: number, longitude: number) => {
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

        const { longitude, latitude, bearing } = trackJson;

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

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div id="map" style={{ width: "100%", height: "80%" }}></div>
      {trackData && (
        <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t shadow-lg flex">
          <div className="flex-1 p-2">
            <span>
              <p className="text-sm font-semibold">{trackData.imei}</p>
            </span>
            <p className="text-xs">
              Connection:{" "}
              {trackData?.statusBitDefinition?.connection ? (
                <span>true</span>
              ) : (
                <span>false</span>
              )}{" "}
            </p>
            <p className="text-xs">ID: 23476</p>
            <p className="text-xs">
              Date/Time:{" "}
              {moment(trackData.dateTime).format("DD-MM-YYYY HH:mm:ss")}
            </p>
            <p className="text-xs text-red-500">Status: STOP</p>
          </div>
          <div className="flex-1 p-2">
            <span>
              <p className="text-sm font-semibold">{trackData.imei}</p>
            </span>
            <p className="text-sm">
              Network: {trackData.statusBitDefinition.network}
            </p>
            <p className="text-sm">Speed: 0 km/h</p>
            <p className="text-sm">Direction: 0°</p>
          </div>
          <div className="flex-1 p-2">
            <p className="text-sm font-semibold">Location</p>
            <p className="text-sm">Latitude: {trackData.latitude}</p>
            <p className="text-sm">Longitude: {trackData.longitude}</p>
            <p className="text-sm">Address: {address}</p>
          </div>

          <div className="flex-1 p-2">
            <p className="text-sm font-semibold">Engine</p>
            <p className="text-sm">Ignition: Off</p>
          </div>
          <div className="flex-1 p-2">
            <p className="text-sm font-semibold">Power Supply</p>
            <p className="text-sm">Battery Level: {trackData.Additional}</p>
            <p className="text-sm">Board Voltage: NA</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewLiveTracking;
