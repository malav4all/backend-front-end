import React, { useEffect } from "react";

interface Props {
  location: any;
}

const ViewOfflineDevice = ({ location }: Props) => {
  useEffect(() => {
    const deviceLocation = location?.state?.data;
    const platform = new window.H.service.Platform({
      apikey: "7snf2Sz_ORd8AClElg9h43HXV8YPI1pbVHyz2QvPsZI",
    });
    const defaultLayers = platform.createDefaultLayers();

    const initialMap = new window.H.Map(
      document.getElementById("map"),
      defaultLayers.vector.normal.map,
      {
        center: { lat: 28.495831757053296, lng: 77.07923644083718 },
        zoom: 12,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );
    const marker = new window.H.map.Marker({
      lat: deviceLocation?.lat,
      lng: deviceLocation?.lng,
    });
    initialMap.addObject(marker);

    new window.H.mapevents.Behavior(
      new window.H.mapevents.MapEvents(initialMap)
    );
    window.H.ui.UI.createDefault(initialMap, defaultLayers);
    var ui = window.H.ui.UI.createDefault(initialMap, defaultLayers);
    var bubble: any;
    const geocoder = platform.getSearchService();

    geocoder.reverseGeocode(
      {
        at: `${deviceLocation?.lat},${deviceLocation?.lng}`,
      },
      (result: any) => {
        const locationName = result.items[0].address.label;
        bubble = new window.H.ui.InfoBubble(
          { lat: deviceLocation?.lat, lng: deviceLocation?.lng },
          { content: locationName }
        );
        ui.addBubble(bubble);
      },
      (error: any) => {
        console.error("Error reverse geocoding:", error);
      }
    );
    return () => {
      window.removeEventListener("resize", () =>
        initialMap.getViewPort().resize()
      );
      initialMap.dispose();
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
};

export default ViewOfflineDevice;
