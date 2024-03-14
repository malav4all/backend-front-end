import {
  Avatar,
  Box,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CreateGeoZoneModal from "./Component/CreateGeoZone.Modal";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import {
  openErrorNotification,
  openSuccessNotification,
} from "../../helpers/methods";
import { store } from "../../utils/store";
import { createGeozone, fetchGeozoneHandler } from "./service/geozone.service";
import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import ImageIcon from "@mui/icons-material/MoveToInbox";
import WorkIcon from "@mui/icons-material/MoveToInbox";
import SearchIcon from "@mui/icons-material/Search";
import BeachAccessIcon from "@mui/icons-material/MoveToInbox";
import { CustomInput } from "../../global/components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const Geozone = () => {
  const mapRef = useRef<any>(null);
  const [selectedShape, setSelectedShape] = useState<any>("");
  const [isOpen, setOpenModal] = useState<boolean>(false);
  const [mapCheck, setMapCheck] = useState<any>(null);
  const [mapKey, setMapKey] = useState<number>(0);
  const [page, setpage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [geozoneData, setGeozoneData] = useState([]);
  const [circles, setCircles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isCircleActive, setIsCircleActive] = useState(false);

  const [formField, setFormField] = useState<any>({
    name: {
      value: "",
      error: "",
    },
    type: {
      value: "",
      error: "",
    },
    centerNo: {
      value: "",
      error: "",
    },
    radius: {
      value: "",
      error: "",
    },
    mobileNumber: {
      value: "",
      error: "",
    },
    address: {
      value: "",
      error: "",
    },
    zipCode: {
      value: "",
      error: "",
    },
    country: {
      value: "",
      error: "",
    },
    state: {
      value: "",
      error: "",
    },
    area: {
      value: "",
      error: "",
    },
    city: {
      value: "",
      error: "",
    },
    district: {
      value: "",
      error: "",
    },
    lat: {
      value: "",
      error: "",
    },
    long: {
      value: "",
      error: "",
    },
  });

  const handleCircleButtonClick = () => {
    setIsCircleActive(true);
  };

  useEffect(() => {
    if (!isCircleActive && mapCheck) {
      mapCheck.removeEventListener("tap", createCircle);
    }
  }, [isCircleActive, mapCheck]);

  useEffect(() => {
    if (isCircleActive && mapCheck) {
      mapCheck.addEventListener("tap", createCircle);
    }
    return () => {
      if (mapCheck) {
        mapCheck.removeEventListener("tap", createCircle);
      }
    };
  }, [isCircleActive, mapCheck]);

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

    // window.addEventListener("resize", () => initialMap.getViewPort().resize());

    new window.H.mapevents.Behavior(
      new window.H.mapevents.MapEvents(initialMap)
    );
    window.H.ui.UI.createDefault(initialMap, defaultLayers);
    // addCircleToMap(initialMap);
    addMarkersToMap(initialMap);
    setMapCheck(initialMap);
    // createResizableCircle(initialMap);

    return () => {
      window.removeEventListener("resize", () =>
        initialMap.getViewPort().resize()
      );
      initialMap.dispose();
    };
  }, []);

  useEffect(() => {
    if (mapCheck) {
      mapCheck.removeObjects(mapCheck.getObjects()); // Remove all existing circles
      addCircleToMap(mapCheck); // Add updated circles
    }
  }, [geozoneData]);

  useEffect(() => {
    fetchGeozone();
  }, []);

  const fetchGeozone = async () => {
    try {
      setLoading(true);
      const res = await fetchGeozoneHandler({
        input: {
          page,
          limit,
        },
      });
      setGeozoneData(res?.listGeozone?.data);
      console.log(res);
      setLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const addGeozoneHandler = async () => {
    try {
      const payload = {
        name: formField.name.value,
        radius: formField.radius.value,
        centerNo: formField.centerNo.value,
        type: formField.type.value,
        mobileNumber: Number(formField.mobileNumber.value),
        address: formField.address.value,
        zipCode: formField.zipCode.value,
        country: formField.country.value,
        state: formField.state.value,
        area: formField.area.value,
        city: formField.city.value,
        district: formField.district.value,
        lat: formField.lat.value,
        long: formField.long.value,
      };
      const res = await createGeozone({
        input: { ...payload, createdBy: store.getState().auth.userName },
      });
      openSuccessNotification(res.addGeozone.message);
      await handleCloseDialog();
      setFormField({
        name: {
          value: "",
          error: "",
        },
        type: {
          value: "",
          error: "",
        },
        centerNo: {
          value: "",
          error: "",
        },
        radius: {
          value: "",
          error: "",
        },
        mobileNumber: {
          value: "",
          error: "",
        },
        address: {
          value: "",
          error: "",
        },
        zipCode: {
          value: "",
          error: "",
        },
        country: {
          value: "",
          error: "",
        },
        state: {
          value: "",
          error: "",
        },
        area: {
          value: "",
          error: "",
        },
        city: {
          value: "",
          error: "",
        },
        district: {
          value: "",
          error: "",
        },
        lat: {
          value: "",
          error: "",
        },
        long: {
          value: "",
          error: "",
        },
      });
      await fetchGeozone();
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  let circle: any;
  let circleOutline: any;
  let circleGroup: any;
  let circleMarker: any;
  let resizingTimeout: NodeJS.Timeout;

  const createCircle = (evt: any) => {
    if (!isCircleActive) {
      return;
    }
    var pointer = evt.currentPointer;
    var latLng = mapCheck.screenToGeo(pointer.viewportX, pointer.viewportY);

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
        var pointer = evt.currentPointer;
        var distanceFromCenterInMeters = circle
          .getCenter()
          .distance(mapCheck.screenToGeo(pointer.viewportX, pointer.viewportY));

        if (distanceFromCenterInMeters < circle.getRadius()) {
          document.body.style.cursor = "zoom-in"; // Change cursor to plus sign inside the circle
        } else {
          document.body.style.cursor = "default"; // Change cursor back to default outside the circle
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
          .distance(mapCheck.screenToGeo(pointer.viewportX, pointer.viewportY));

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
          lat: {
            value: latLng.lat,
          },
          long: {
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

    mapCheck.addObject(circleGroup);
    mapCheck.addObject(circleMarker);

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
  };

  const addMarkersToMap = (map: any) => {
    let parisMarker = new window.H.map.Marker({
      lat: 28.495831757053296,
      lng: 77.07923644083718,
    });
    map.addObject(parisMarker);
  };

  const addCircleToMap = (map: any) => {
    geozoneData.map((item: any) =>
      map.addObject(
        new window.H.map.Circle(
          { lat: item.lat, lng: item.long },
          item.radius,
          {
            style: {
              strokeColor: "rgba(0, 0, 255, 0.5)",
              lineWidth: 2,
              fillColor: "rgba(0, 0, 255, 0.5)",
            },
          }
        )
      )
    );
  };

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
          addGeozoneHandler={addGeozoneHandler}
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
          <button onClick={handleCircleButtonClick}>Circle</button>
          <button onClick={() => setSelectedShape("polygon")}>Polygon</button>
          <button onClick={() => setSelectedShape("rectangle")}>
            Rectangle
          </button>
        </Box>
      </Box>
      <Box
        style={{
          position: "absolute",
          top: 25,
          right: "25px",
          zIndex: 1,
          padding: "0.5rem",
          backgroundColor: "white",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          borderRadius: "16px",
        }}
      >
        <Box sx={{ margin: "5px 5px", width: "350px" }}>
          <CustomInput
            placeHolder="Search user ..."
            id="users_search_field"
            onChange={(e: any) => {
              setSearchText(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <PerfectScrollbar>
          <Box
            sx={{
              height: "auto",
              maxHeight: "350px",
              // overflowY: "scroll",
            }}
          >
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {geozoneData
                .filter((item: any) => {
                  if (searchText.trim() !== "") {
                    return (
                      item.name.trim().toLowerCase() ===
                      searchText.trim().toLowerCase()
                    );
                  } else {
                    return true;
                  }
                })
                .map((item: any, index) => (
                  <ListItem key={item._id}>
                    <ListItemAvatar>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      sx={{ display: "flex", flexDirection: "row" }}
                    >
                      <Box>
                        <ListItemText
                          style={{ fontSize: "12px", fontWeight: "bold" }}
                        >
                          {item.name}
                        </ListItemText>
                        <ListItemText style={{ fontSize: "12px" }}>
                          {item.address}
                        </ListItemText>
                      </Box>
                    </ListItemText>
                    <ListItemAvatar>
                      <EditIcon
                        htmlColor={"#0F2167"}
                        style={{
                          cursor: "pointer",
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemAvatar>
                      <DeleteIcon
                        htmlColor={"#0F2167"}
                        style={{
                          cursor: "pointer",
                        }}
                      />
                    </ListItemAvatar>
                  </ListItem>
                ))}
            </List>
          </Box>
        </PerfectScrollbar>
      </Box>

      {createGeozoneModal()}
      <CustomLoader isLoading={loading} />
    </>
  );
};

export default Geozone;
