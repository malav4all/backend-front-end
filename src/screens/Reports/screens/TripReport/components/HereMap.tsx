import { useEffect } from "react";

const HereMap = () => {
  useEffect(() => {
    const platform = new window.H.service.Platform({
      apikey: "B2MP4WbkH6aIrC9n0wxMrMrZhRCjw3EV7loqVzkBbEo",
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new window.H.Map(
      document.getElementById("here-map"),
      defaultLayers.vector.normal.map,
      {
        center: { lat: 25.0, lng: 78.0 },
        zoom: 3,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );

    const behavior = new window.H.mapevents.Behavior(
      new window.H.mapevents.MapEvents(map)
    );

    const ui = window.H.ui.UI.createDefault(map, defaultLayers);

    return () => {
      map.dispose();
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
