import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateGeoZoneModal from "./Component/CreateGeoZone.Modal";

const Geozone = () => {
  const [selectedShape, setSelectedShape] = useState<any>("");
  const [isOpen, setOpenModal] = useState<boolean>(false);
  const [mapCheck, setMapCheck] = useState<any>(null);
  const [mapKey, setMapKey] = useState<number>(0);
  const [circles, setCircles] = useState<any[]>([]);
  const [formField, setFormField] = useState<any>({
    circleName: {
      value: "",
      error: "",
    },
    circleRadius: {
      value: "",
      error: "",
    },
    mobileNo: {
      value: "",
      error: "",
    },
    clientName: {
      value: "",
      error: "",
    },
    latitude: {
      value: "",
      error: "",
    },
    longitude: {
      value: "",
      error: "",
    },
    radius: {
      value: "",
      error: "",
    },
  });

  let circle: any;
  let circleOutline: any;
  let circleGroup: any;
  let circleMarker: any;
  let resizingTimeout: NodeJS.Timeout;

  const createResizableCircle = (map: any) => {
    map.addEventListener("tap", function (evt: any) {
      var pointer = evt.currentPointer;
      var latLng = map.screenToGeo(pointer.viewportX, pointer.viewportY);

      circle = new window.H.map.Circle(latLng, 100, {
        style: { fillColor: "rgba(0, 0, 255, 0.5)", lineWidth: 0 },
      });
      circleOutline = new window.H.map.Polyline(
        circle.getGeometry().getExterior(),
        {
          style: { lineWidth: 8, strokeColor: "rgba(0, 0, 255, 0.7)" },
        }
      );
      circleGroup = new window.H.map.Group({
        volatility: true,
        objects: [circle, circleOutline],
      });

      circleMarker = new window.H.map.Marker(latLng);

      circle.draggable = true;
      circleOutline.draggable = true;

      circleOutline
        .getGeometry()
        .pushPoint(circleOutline.getGeometry().extractPoint(0));

      circleGroup.addEventListener(
        "pointermove",
        function (evt: any) {
          if (evt.target instanceof window.H.map.Polyline) {
            document.body.style.cursor = "pointer";
          } else {
            document.body.style.cursor = "default";
          }
        },
        true
      );

      circleGroup.addEventListener(
        "drag",
        function (evt: any) {
          var pointer = evt.currentPointer;
          var distanceFromCenterInMeters = circle
            .getCenter()
            .distance(map.screenToGeo(pointer.viewportX, pointer.viewportY));

          if (evt.target instanceof window.H.map.Polyline) {
            circle.setRadius(distanceFromCenterInMeters);

            var outlineLinestring = circle.getGeometry().getExterior();
            outlineLinestring.pushPoint(outlineLinestring.extractPoint(0));
            circleOutline.setGeometry(outlineLinestring);
            circleMarker.setGeometry(circle.getCenter());
            evt.stopPropagation();
          }
          setFormField({
            ...formField,
            latitude: {
              value: latLng.lat,
            },
            longitude: {
              value: latLng.lng,
            },
            radius: {
              value: circle.getRadius(),
            },
          });
          if (resizingTimeout) {
            clearTimeout(resizingTimeout);
          }

          // Set new timeout to check if resizing is complete
          resizingTimeout = setTimeout(() => {
            setOpenModal(true);
          }, 500);
        },
        true
      );

      map.addObject(circleGroup);
      map.addObject(circleMarker);

      circleGroup.addEventListener(
        "pointerenter",
        function (evt: any) {
          var currentStyle = circleOutline.getStyle();
          var newStyle = currentStyle.getCopy({
            strokeColor: "rgb(255, 0, 0)",
          });
          circleOutline.setStyle(newStyle);
        },
        true
      );

      circleGroup.addEventListener(
        "pointerleave",
        function (evt: any) {
          var currentStyle = circleOutline.getStyle();
          var newStyle = currentStyle.getCopy({
            strokeColor: "rgba(255, 0, 0, 0)",
          });

          circleOutline.setStyle(newStyle);
        },
        true
      );
      setFormField({
        ...formField,
        latitude: {
          value: latLng.lat,
        },
        longitude: {
          value: latLng.lng,
        },
        radius: {
          value: circle.getRadius(),
        },
      });
      setCircles([...circles, { circleGroup, circleMarker }]);
    });
  };

  const addMarkersToMap = (map: any) => {
    let parisMarker = new window.H.map.Marker({
      lat: 28.495831757053296,
      lng: 77.07923644083718,
    });
    map.addObject(parisMarker);
  };

  // function addCircleToMap(map: any) {
  //   dummyData.map((item) =>
  //     map.addObject(
  //       new window.H.map.Circle(
  //         // The central point of the circle
  //         { lat: item.lat, lng: item.log },
  //         // The radius of the circle in meters
  //         item.radius,
  //         {
  //           style: {
  //             strokeColor: "rgba(55, 85, 170, 0.6)",
  //             lineWidth: 2,
  //             fillColor: "rgba(0, 128, 0, 0.7)",
  //           },
  //         }
  //       )
  //     )
  //   );
  // }

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
        key: mapKey,
      }
    );

    window.addEventListener("resize", () => initialMap.getViewPort().resize());

    new window.H.mapevents.Behavior(
      new window.H.mapevents.MapEvents(initialMap)
    );
    window.H.ui.UI.createDefault(initialMap, defaultLayers);
    setMapCheck(initialMap);
    addMarkersToMap(initialMap);
    // addCircleToMap(initialMap);
    createResizableCircle(initialMap);
    // createResizablePolygon(initialMap);

    // Event listener for map clicks to create shapes
    initialMap.addEventListener("tap", function (evt: any) {
      if (selectedShape === "circle") {
        // Create circle
      } else if (selectedShape === "polygon") {
        // Create polygon
      } else if (selectedShape === "rectangle") {
        // Create rectangle
      }
    });

    return () => {
      window.removeEventListener("resize", () =>
        initialMap.getViewPort().resize()
      );
      initialMap.dispose();
    };
  }, []);

  const handleCloseDialog = () => {
    setOpenModal(false);
    circles.forEach(({ circleGroup, circleMarker }) => {
      if (mapCheck) {
        mapCheck.removeObject(circleGroup);
        mapCheck.removeObject(circleMarker);
      }
    });
    setCircles([]);
  };

  const createGeozoneModal = () => {
    return (
      <>
        <CreateGeoZoneModal
          isOpenModal={isOpen}
          handleUpdateDialogClose={handleCloseDialog}
          setFormField={setFormField}
          formField={formField}
        />
      </>
    );
  };

  return (
    <>
      <Box component={"div"} id="map" style={{ width: "100%", height: "100%" }}>
        <Box
          style={{ position: "absolute", bottom: 0, left: "303px", zIndex: 1 }}
        >
          <button onClick={() => setSelectedShape("circle")}>Circle</button>
          <button onClick={() => setSelectedShape("polygon")}>Polygon</button>
          <button onClick={() => setSelectedShape("rectangle")}>
            Rectangle
          </button>
        </Box>
      </Box>
      {createGeozoneModal()}
    </>
  );
};

export default Geozone;
