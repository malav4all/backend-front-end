import { useSubscription } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { store } from "../../../utils/store";
import { DEVICE_DATA } from "../../Dashboard/service/Dashboard.mutation";

const HereMap = ({ selectedTrip }: any) => {
  const [map, setMap] = useState<any>(null);
  const [currentMarker, setCurrentMarker] = useState<any>(null);

  const { data } = useSubscription(DEVICE_DATA, {
    variables: {
      topicType: "track",
      accountId: store.getState().auth.tenantId,
      imeis: [selectedTrip],
    },
  });

  useEffect(() => {
    if (data) {
      try {
        const trackJson = JSON.parse(data.track);
        const { latitude, longitude, bearing } = trackJson;
        map.setZoom(15);
        if (map) {
          // If marker already exists, remove it from the map
          if (currentMarker) {
            map.removeObject(currentMarker);
          }

          // Create a new marker with updated position
          const domIconElement = document.createElement("div");
          domIconElement.style.margin = "-20px 0 0 -20px";
          domIconElement.innerHTML = `<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="rgba(255, 255, 255, 0.5)" stroke="none" />
            <polygon points="50,20 70,65 50,55 30,65" fill="#7C58CB" stroke="#5F22E1" stroke-width="2" />
          </svg>`;

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

          // Add the new marker to the map
          setCurrentMarker(newMarker);
          map.addObject(newMarker);

          // Re-center the map on the new position
          map.setCenter({ lat: latitude, lng: longitude });
        }
      } catch (error) {
        console.error("Error parsing live tracking data:", error);
      }
    }
  }, [data]);

  useEffect(() => {
    const platform = new window.H.service.Platform({
      apikey: "B2MP4WbkH6aIrC9n0wxMrMrZhRCjw3EV7loqVzkBbEo",
    });

    const defaultLayers = platform.createDefaultLayers();

    const initialMap = new window.H.Map(
      document.getElementById("here-map"),
      defaultLayers.vector.normal.map,
      {
        center: { lat: 25.0, lng: 78.0 },
        zoom: 3,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );

    new window.H.mapevents.Behavior(
      new window.H.mapevents.MapEvents(initialMap)
    );
    window.H.ui.UI.createDefault(initialMap, defaultLayers);

    setMap(initialMap);

    return () => {
      if (initialMap) {
        initialMap.dispose();
      }
    };
  }, []);

  return (
    <div
      id="here-map"
      style={{ width: "100%", height: "100%", position: "relative" }}
    />
  );
};

export default HereMap;
