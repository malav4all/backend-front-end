import React, { useEffect, useRef } from "react";
import { airports } from "./dummy";

const apiKey = "B2MP4WbkH6aIrC9n0wxMrMrZhRCjw3EV7loqVzkBbEo";

const HereMapCluster: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = async () => {
      // Load HERE Maps API scripts dynamically
      const H = (window as any).H;

      const platform = new H.service.Platform({
        apikey: apiKey,
      });

      const defaultLayers = platform.createDefaultLayers();

      const map = new H.Map(mapRef.current!, defaultLayers.vector.normal.map, {
        center: { lat: 22.0, lng: 78.0 }, // Adjusted center based on your image
        zoom: 5, // Adjusted zoom level based on your image
        pixelRatio: window.devicePixelRatio || 1,
      });

      window.addEventListener("resize", () => map.getViewPort().resize());

      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      const ui = H.ui.UI.createDefault(map, defaultLayers);

      const dataPoints = airports.map(
        (item) => new H.clustering.DataPoint(item.latitude, item.longitude)
      );

      const clusteredDataProvider = new H.clustering.Provider(dataPoints, {
        clusteringOptions: {
          eps: 32,
          minWeight: 2,
        },
      });

      const clusteringLayer = new H.map.layer.ObjectLayer(
        clusteredDataProvider
      );
      map.addLayer(clusteringLayer);
    };

    initializeMap();
  }, []);

  return (
    <div id="map" ref={mapRef} style={{ width: "100%", height: "100vh" }} />
  );
};

export default HereMapCluster;
