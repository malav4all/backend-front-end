import React, { useEffect, useRef } from "react";
import { airports } from "./dummy";

const apiKey = "B2MP4WbkH6aIrC9n0wxMrMrZhRCjw3EV7loqVzkBbEo";

const HereMapCluster: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = async () => {
      const H = (window as any).H;

      if (!H) {
        console.error("HERE Maps API not loaded");
        return;
      }

      const platform = new H.service.Platform({
        apikey: apiKey,
      });

      const defaultLayers = platform.createDefaultLayers();

      const map = new H.Map(mapRef.current!, defaultLayers.vector.normal.map, {
        center: { lat: 22.0, lng: 78.0 },
        zoom: 5,
        pixelRatio: window.devicePixelRatio || 1,
      });

      window.addEventListener("resize", () => map.getViewPort().resize());

      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      const ui = H.ui.UI.createDefault(map, defaultLayers);

      const dataPoints = airports.map(
        (item) =>
          new H.clustering.DataPoint(item.latitude, item.longitude, null, item)
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

      clusteredDataProvider.addEventListener("tap", (event: any) => {
        const target = event.target;

        if (target instanceof H.map.Marker) {
          const data = target.getData();
          console.log("Data1: ", data);

          const bubbleContent = `
  <div class="font-sans leading-relaxed p-4 w-64">
    <h3 class="m-0 text-lg text-gray-800 font-semibold">${
      data.name || "No name available"
    }</h3>
    <p class="mt-2 text-sm text-gray-600"><strong>Address:</strong> ${
      data.address || "No address available"
    }</p>
    <p class="mt-2 text-sm text-gray-600"><strong>Contact:</strong> ${
      data.contact || "No contact available"
    }</p>
    <p class="mt-2 text-sm text-gray-600"><strong>Latitude:</strong> ${
      data?.dm?.data?.latitude || "No latitude available"
    }</p>
    <p class="mt-2 text-sm text-gray-600"><strong>Longitude:</strong> ${
      data?.dm?.data?.longitude || "No longitude available"
    }</p>
  </div>
`;

          const bubble = new H.ui.InfoBubble(target.getGeometry(), {
            content: bubbleContent,
          });
          ui.addBubble(bubble);
        }
      });

      clusteringLayer.addEventListener("tap", (event: any) => {
        const target = event.target;
        if (target instanceof H.map.Marker) {
          const data = target.getData();
          if (data) {
            console.log("Data2: ", data);

            const bubbleContent = `
              <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h3 style="margin: 0;">${data.name}</h3>
                <p style="margin: 0;">Address: ${data.address}</p>
                <p style="margin: 0;">Contact: ${data.contact}</p>
                <p style="margin: 0;">Rating: ${data.rating} ★</p>
                <p style="margin: 0;">Latitude: ${data.latitude}</p>
                <p style="margin: 0;">Longitude: ${data.longitude}</p>
              </div>
            `;
            const bubble = new H.ui.InfoBubble(target.getGeometry(), {
              content: bubbleContent,
            });
            ui.addBubble(bubble);
          }
        }
      });
    };

    initializeMap();
  }, []);

  return (
    <div id="map" ref={mapRef} style={{ width: "100%", height: "100vh" }} />
  );
};

export default HereMapCluster;
