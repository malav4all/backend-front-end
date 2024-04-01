import React, { useEffect } from "react";

interface ViewJourneyProps {
  location: any;
}

const ShowJourneyModal = (props: ViewJourneyProps) => {
  useEffect(() => {
    const routeOrigin = props?.location?.state?.routeOrigin;
    const coordinates = props?.location?.state?.coordinates;

    if (!routeOrigin || routeOrigin.length < 2) {
      console.error("Invalid routeOrigin:", routeOrigin);
      return;
    }

    const platform = new window.H.service.Platform({
      apikey: "7snf2Sz_ORd8AClElg9h43HXV8YPI1pbVHyz2QvPsZI",
    });

    const defaultLayers = platform.createDefaultLayers({
      tileSize: 256,
      ppi: 320,
    });
    const map = new window.H.Map(
      document.getElementById("map"),
      defaultLayers.vector.normal.map,
      {
        center: { lat: 28.633, lng: 77.2196 },
        zoom: 13,
      }
    );
    var ui = window.H.ui.UI.createDefault(map, defaultLayers);
    map.addLayer(defaultLayers.vector.normal.traffic);
    var bubble: any;

    function openBubble(position: any, text: any) {
      if (!bubble) {
        bubble = new window.H.ui.InfoBubble(
          position,

          { content: text }
        );
        ui.addBubble(bubble);
      } else {
        bubble.setPosition(position);
        bubble.setContent(text);
        bubble.open();
      }
    }

    window.addEventListener("resize", () => map.getViewPort().resize());

    const router = platform.getRoutingService(null, 8);

    const onSuccess = (result: any) => {
      addRouteShapeToMap(result.routes[0].sections);
    };

    const onError = (error: any) => {
      alert("Can't reach the remote server");
    };

    const routeRequestParams = {
      routingMode: "fast",
      transportMode: "car",
      origin: `${routeOrigin[0].lat},${routeOrigin[0].lng}`,
      destination: `${routeOrigin[1].lat},${routeOrigin[1].lng}`,
      return: "polyline",
      via: new window.H.service.Url.MultiValueQueryParameter(
        coordinates.map((wp: any) => `${wp.lat},${wp.lng}`)
      ),
    };

    router.calculateRoute(routeRequestParams, onSuccess, onError);
    const geocoder = platform.getSearchService();
    function addRouteShapeToMap(route: any) {
      const lineStrings: any = [];
      const waypointMarkers: any = [];
      route.forEach((section: any) => {
        lineStrings.push(
          window.H.geo.LineString.fromFlexiblePolyline(section.polyline)
        );
      });

      coordinates.forEach((waypoint: any) => {
        const waypointMarker = new window.H.map.Marker({
          lat: waypoint.lat,
          lng: waypoint.lng,
        });
        waypointMarkers.push(waypointMarker);
        geocoder.reverseGeocode(
          {
            at: `${waypoint.lat},${waypoint.lng}`,
          },
          (result: any) => {
            const locationName = result.items[0].address.label;
            waypointMarker.label = locationName;
          },
          (error: any) => {
            console.error("Error reverse geocoding:", error);
          }
        );
      });

      const multiLineString = new window.H.geo.MultiLineString(lineStrings);
      const routeLine = new window.H.map.Polyline(multiLineString, {
        style: {
          strokeColor: "blue",
          lineWidth: 5,
        },
      });

      const startMarker = new window.H.map.Marker(routeOrigin[0]);

      const endMarker = new window.H.map.Marker(routeOrigin[1]);

      const group = new window.H.map.Group();
      group.addObjects([routeLine, startMarker, endMarker, ...waypointMarkers]);
      group.addEventListener(
        "tap",
        function (evt: any) {
          map.setCenter(evt.target.getGeometry());
          openBubble(evt.target.getGeometry(), evt.target.label);
        },
        false
      );
      map.addObject(group);
      map.getViewModel().setLookAtData({ bounds: group.getBoundingBox() });
    }

    new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
  }, []);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
};

export default ShowJourneyModal;
