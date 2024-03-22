import React, { useEffect } from "react";

interface ViewJourneyProps {
  location: any;
}

const ShowJourneyModal = (props: ViewJourneyProps) => {
  useEffect(() => {
    const coordinates = props?.location?.state?.coordinates;

    function calculateRoutes(platform: any, coords: number[]) {
      for (let i = 0; i < coords.length - 3; i += 2) {
        const start = `${coords[i]},${coords[i + 1]}`;
        const end = `${coords[i + 2]},${coords[i + 3]}`;
        calculateRouteFromAtoB(platform, start, end);
      }
    }

    function calculateRouteFromAtoB(platform: any, start: string, end: string) {
      var router = platform.getRoutingService(null, 8),
        routeRequestParams = {
          routingMode: "fast",
          transportMode: "car",
          origin: start,
          destination: end,
          return:
            "polyline,turnByTurnActions,actions,instructions,travelSummary",
        };

      router.calculateRoute(routeRequestParams, onSuccess, onError);
    }

    function onSuccess(result: any) {
      var route = result.routes[0];

      addRouteShapeToMap(route);
      addManueversToMap(route);
      // addWaypointsToPanel(route);
      // addManueversToPanel(route);
      addSummaryToPanel(route);
      // ... etc.
    }

    function onError() {
      alert("Can't reach the remote server");
    }

    var mapContainer = document.getElementById("map");

    var platform = new window.H.service.Platform({
      apikey: "7snf2Sz_ORd8AClElg9h43HXV8YPI1pbVHyz2QvPsZI",
    });

    var defaultLayers = platform.createDefaultLayers();

    var map = new window.H.Map(mapContainer, defaultLayers.vector.normal.map, {
      center: { lat: 28.633, lng: 77.2196 },
      zoom: 13,
      pixelRatio: window.devicePixelRatio || 1,
    });

    // window.addEventListener("resize", () => map.getViewPort().resize());

    new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));

    var ui = window.H.ui.UI.createDefault(map, defaultLayers);

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

    function addRouteShapeToMap(route: any) {
      route.sections.forEach((section: any) => {
        // decode LineString from the flexible polyline
        let linestring = window.H.geo.LineString.fromFlexiblePolyline(
          section.polyline
        );

        let polyline = new window.H.map.Polyline(linestring, {
          style: {
            lineWidth: 4,
            strokeColor: "rgba(0, 128, 255, 0.7)",
          },
        });

        map.addObject(polyline);
        // And zoom to its bounding rectangle
        map.getViewModel().setLookAtData({
          bounds: polyline.getBoundingBox(),
        });
      });
    }

    function addManueversToMap(route: any) {
      var svgMarkup =
          '<svg width="18" height="18" ' +
          'xmlns="http://www.w3.org/2000/svg">' +
          '<circle cx="8" cy="8" r="8" ' +
          'fill="#1b468d" stroke="white" stroke-width="1" />' +
          "</svg>",
        dotIcon = new window.H.map.Icon(svgMarkup, { anchor: { x: 8, y: 8 } }),
        group = new window.H.map.Group(),
        i,
        j;

      route.sections.forEach((section: any) => {
        let poly = window.H.geo.LineString.fromFlexiblePolyline(
          section.polyline
        ).getLatLngAltArray();

        let actions = section.actions;

        for (i = 0; i < actions.length; i += 1) {
          let action = actions[i];
          var marker = new window.H.map.Marker(
            {
              lat: poly[action.offset * 3],
              lng: poly[action.offset * 3 + 1],
            },
            { icon: dotIcon }
          );
          marker.instruction = action.instruction;
          group.addObject(marker);
        }

        group.addEventListener(
          "tap",
          function (evt: any) {
            map.setCenter(evt.target.getGeometry());
            openBubble(evt.target.getGeometry(), evt.target.instruction);
          },
          false
        );

        // Add the maneuvers group to the map
        map.addObject(group);
      });
    }

    function addWaypointsToPanel(route: any) {
      var nodeH3 = document.createElement("h3");
      var labels: any = [];

      route.sections.forEach((section: any) => {
        labels.push(section.turnByTurnActions[0].nextRoad?.name[0].value);
        labels.push(
          section.turnByTurnActions[section.turnByTurnActions.length - 1]
            .currentRoad.name[0].value
        );
      });

      nodeH3.textContent = labels.join(" - ");
      // routeInstructionsContainer!.innerHTML = "";
      // routeInstructionsContainer!?.appendChild(nodeH3);
    }

    function addSummaryToPanel(route: any) {
      let distance = 0;
      let duration = 0;

      route.sections.forEach((section: any) => {
        distance += section.travelSummary.length;
        duration += section.travelSummary.duration;
      });

      // Convert distance to kilometers
      let distanceInKm = (distance / 1000).toFixed(2);

      // Convert duration to hours and minutes
      let hours = Math.floor(duration / 3600);
      let minutes = Math.floor((duration % 3600) / 60);

      var summaryDiv = document.createElement("div"),
        content =
          "<b>Total distance</b>: " +
          distanceInKm +
          " km. <br />" +
          "<b>Travel Time</b>: " +
          (hours > 0 ? hours + " hours " : "") +
          (minutes > 0 ? minutes + " minutes" : "");

      summaryDiv.style.fontSize = "small";
      summaryDiv.style.marginLeft = "5%";
      summaryDiv.style.marginRight = "5%";
      summaryDiv.innerHTML = content;

      console.log({ distanceInKm, hours, minutes });

      // routeInstructionsContainer!.appendChild(summaryDiv);
    }

    function addManueversToPanel(route: any) {
      var nodeOL = document.createElement("ol");

      nodeOL.style.fontSize = "small";
      nodeOL.style.marginLeft = "5%";
      nodeOL.style.marginRight = "5%";
      nodeOL.className = "directions";

      route.sections.forEach((section: any) => {
        section.actions.forEach((action: any, idx: any) => {
          var li = document.createElement("li"),
            spanArrow = document.createElement("span"),
            spanInstruction = document.createElement("span");

          spanArrow.className =
            "arrow " + (action.direction || "") + action.action;
          spanInstruction.innerHTML = section.actions[idx].instruction;
          li.appendChild(spanArrow);
          li.appendChild(spanInstruction);

          nodeOL.appendChild(li);
        });
      });

      // routeInstructionsContainer!?.appendChild(nodeOL) as any;
    }

    function toMMSS(duration: any) {
      return (
        Math.floor(duration / 60) + " minutes " + (duration % 60) + " seconds."
      );
    }

    if (coordinates && coordinates.length >= 4) {
      calculateRoutes(platform, coordinates);
    }
  }, []);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
};

export default ShowJourneyModal;
