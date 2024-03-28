import { useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { COORDINATES_SUBSCRIPTION } from "../service/journey.mutation";

const ViewLiveTracking = () => {
  const [map, setMap] = useState<any>(null); // State to hold the map object
  const [arrowMarker, setArrowMarker] = useState<any>(null); // State to hold the arrow marker object

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
    window.H.ui.UI.createDefault(initialMap, defaultLayers);
    setMap(initialMap); // Set the map object in state
    return () => {
      window.removeEventListener("resize", () =>
        initialMap.getViewPort().resize()
      );
      initialMap.dispose();
    };
  }, []);

  const updateArrowMarker = (lat: any, lng: any) => {
    if (!map) return;

    if (!arrowMarker) {
      const svgMarkup =
        '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M12 24l-8.47-10.994h5.219v-11.006h6.562v11.006h5.219z" fill="#000"/>' +
        "</svg>";
      const icon = new window.H.map.Icon(svgMarkup, {
        size: { w: 24, h: 24 },
        anchor: { x: 12, y: 12 },
      });
      const marker = new window.H.map.Marker({ lat, lng }, { icon });
      map.addObject(marker);
      setArrowMarker(marker);
    } else {
      arrowMarker.setGeometry({ lat, lng });
    }
  };

  const { data } = useSubscription(COORDINATES_SUBSCRIPTION, {
    variables: { topic: "malav_Live" },
  });
  useEffect(() => {
    if (data && data.coordinatesUpdated) {
      data.coordinatesUpdated.forEach((item: any) =>
        updateArrowMarker(item.lat, item.long)
      );
    }
  }, [data]);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
};

export default ViewLiveTracking;
