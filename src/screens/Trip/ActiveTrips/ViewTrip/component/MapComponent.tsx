import React, { useEffect, useState } from "react";

const MapComponent = () => {
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    const platform = new window.H.service.Platform({
      apikey: "B2MP4WbkH6aIrC9n0wxMrMrZhRCjw3EV7loqVzkBbEo"});

    const defaultLayers = platform.createDefaultLayers();

    const initialMap = new window.H.Map(
      document.getElementById("here-map"),
      defaultLayers.vector.normal.map,
      {
        center: { lat: 25.0, lng: 78.0 },
        zoom: 4,
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
      style={{ width: "100%", height: "485px", position: "relative" }}
    />
  );
};

export default MapComponent;
