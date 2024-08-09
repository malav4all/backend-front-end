import React, { useEffect, useRef } from "react";
import { airports } from "./dummy";

const apiKey = "B2MP4WbkH6aIrC9n0wxMrMrZhRCjw3EV7loqVzkBbEo";

const HereMapCluster: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const currentBubbleRef = useRef(null);

  useEffect(() => {
    const initializeMap = async () => {
      const H = window.H;

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

      const clearCurrentBubble = () => {
        if (currentBubbleRef.current) {
          ui.removeBubble(currentBubbleRef.current);
          currentBubbleRef.current = null;
        }
      };

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

      clusteredDataProvider.addEventListener("tap", async (event: any) => {
        const target = event.target;

        // Ensure target is a marker and not a cluster
        if (target instanceof H.map.Marker && !target.getData().getClusteredData) {
          const data = target.getData();
          if (!data.Jq) {
            console.log("Marker Data: ", data);

            const address = await getReverseGeocodingData(data.dm.data.latitude, data.dm.data.longitude);

            const bubbleContent = `
              <div class="font-sans leading-relaxed p-4 w-64">
                <h3 class="m-0 text-lg text-gray-800 font-semibold">${data.name || "6232512668984"
              }</h3>
                <p class="mt-2 text-sm text-gray-600"><strong>Address:</strong> ${address}</p>
              }</p>
                <p class="mt-2 text-sm text-gray-600"><strong>Latitude:</strong> ${data?.dm?.data?.latitude || "No latitude available"
              }</p>
                <p class="mt-2 text-sm text-gray-600"><strong>Longitude:</strong> ${data?.dm?.data?.longitude || "No longitude available"
              }</p>
              </div>
            `;

            clearCurrentBubble();

            const bubble = new H.ui.InfoBubble(target.getGeometry(), {
              content: bubbleContent,
            });
            ui.addBubble(bubble);
            currentBubbleRef.current = bubble;
          }
        } else {
          console.log("Cluster clicked, no popup will be shown.");
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
