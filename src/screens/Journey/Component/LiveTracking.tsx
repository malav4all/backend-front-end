import { useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { COORDINATES_SUBSCRIPTION } from "../service/journey.mutation";

const ViewLiveTracking = () => {
  const [map, setMap] = useState<any>(null);
  const [currentMarker, setCurrentMarker] = useState<any>(null);

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
    window.H.ui.UI.createDefault(initialMap, defaultLayers);
    setMap(initialMap);
    return () => {
      window.removeEventListener("resize", () =>
        initialMap.getViewPort().resize()
      );
      initialMap.dispose();
    };
  }, []);

  const { data } = useSubscription(COORDINATES_SUBSCRIPTION, {
    variables: { topic: "track/864180068905939" },
  });

  useEffect(() => {
    if (data && data.coordinatesUpdated) {
      const { lat, lng, direction } = data.coordinatesUpdated;
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
        { lat, lng },
        {
          icon: new window.H.map.DomIcon(domIconElement, {
            onAttach: function (
              clonedElement: any,
              domIcon: any,
              domMarker: any
            ) {
              const clonedContent =
                clonedElement.getElementsByTagName("svg")[0];
              clonedContent.style.transform = "rotate(" + direction + "deg)";
            },
          }),
        }
      );
      setCurrentMarker(newMarker);
      map.addObject(newMarker);
    }
  }, [data]);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
};

export default ViewLiveTracking;
