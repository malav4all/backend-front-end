import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
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
import SearchIcon from "@mui/icons-material/Search";
import { CustomInput } from "../../global/components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import geozoneStyle from "./Geozone.styles";
import DrawIcon from "@mui/icons-material/Draw";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PinDropIcon from "@mui/icons-material/PinDrop";

const Geozone = () => {
  const classes = geozoneStyle;
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
  const [geozonesVisible, setGeozonesVisible] = useState(true);
  const [pointCheck, setPointCheck] = useState(false);
  const [formField, setFormField] = useState<any>({
    name: {
      value: "",
      error: "",
    },
    type: {
      value: "",
      error: "",
    },
    propertyName: {
      name: "",
      error: "",
    },
    locationType: {
      value: "",
      error: "",
    },
    description: {
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
  const [buttonisActive, setButtonisActive] = useState(false);

  const handleCircleButtonClick = () => {
    setIsCircleActive(!isCircleActive);
    setPointCheck(false);
    mapCheck.removeEventListener("tap", setUpClickListener);
    mapCheck.removeObjects(mapCheck.getObjects());
  };

  useEffect(() => {
    if (!isCircleActive && mapCheck) {
      mapCheck.removeEventListener("tap", createCircle);
    }
  }, [isCircleActive, mapCheck]);

  useEffect(() => {
    if (!pointCheck && mapCheck) {
      mapCheck.removeEventListener("tap", setUpClickListener);
    }
  }, [isCircleActive, mapCheck]);

  useEffect(() => {
    if (isCircleActive && mapCheck) {
      mapCheck.addEventListener("tap", createCircle);
    }
    return () => {
      if (mapCheck) {
        mapCheck.removeEventListener("tap", createCircle);
        circles.forEach(({ circleGroup, circleMarker }) => {
          if (mapCheck) {
            mapCheck.removeObject(circleGroup);
            mapCheck.removeObject(circleMarker);
          }
        });
        setCircles([]);
      }
    };
  }, [isCircleActive, mapCheck]);

  useEffect(() => {
    if (pointCheck && mapCheck) {
      mapCheck.addEventListener("tap", setUpClickListener);
    }
    return () => {
      if (mapCheck) {
        mapCheck.removeEventListener("tap", setUpClickListener);
        circles.forEach(({ circleGroup, circleMarker }) => {
          if (mapCheck) {
            mapCheck.removeObject(circleGroup);
            mapCheck.removeObject(circleMarker);
          }
        });
        setCircles([]);
      }
    };
  }, [pointCheck, mapCheck]);

  let currentMarker: any = null;
  const setUpClickListener = (evt: any) => {
    const platform = new window.H.service.Platform({
      apikey: "7snf2Sz_ORd8AClElg9h43HXV8YPI1pbVHyz2QvPsZI",
    });
    var coord = mapCheck.screenToGeo(
      evt.currentPointer.viewportX,
      evt.currentPointer.viewportY
    );

    // Remove the previous marker if it exists
    if (currentMarker) {
      mapCheck.removeObject(currentMarker);
    }

    var geocoder = platform.getSearchService();

    geocoder.reverseGeocode(
      {
        at: `${coord.lat},${coord.lng}`,
      },
      (result: any) => {
        var locationName = result.items[0].address.label;
        var marker = new window.H.map.Marker(coord);
        alert(
          `Location: ${locationName}\nLatitude: ${coord.lat.toFixed(
            4
          )}\nLongitude: ${coord.lng.toFixed(4)}`
        );

        currentMarker = marker;
        mapCheck.addObject(marker);
        setOpenModal(true);
        setFormField({
          ...formField,
          propertyName: {
            value: locationName,
          },
          type: {
            value: "Point",
          },
          lat: {
            value: coord.lat.toFixed(4),
          },
          long: {
            value: coord.lng.toFixed(4),
          },
          radius: {
            value: 100,
          },
          zipCode: {
            value: result.items[0].address.postalCode,
          },
          country: {
            value: result.items[0].address.countryName,
          },
          state: {
            value: result.items[0].address.state,
          },
          area: {
            value: result.items[0].address.subdistrict,
          },
          city: {
            value: result.items[0].address.city,
          },
          district: {
            value: result.items[0].address.district,
          },
          address: {
            value: `${result.items[0].address.countryName} - ${result.items[0].address.state}-${result.items[0].address.subdistrict}-${result.items[0].address.district}-${result.items[0].address.postalCode}`,
          },
        });
      },
      (error: any) => {
        console.error(error);
      }
    );
  };

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
    addCircleToMap(initialMap);
    addMarkersToMap(initialMap);
    setMapCheck(initialMap);
    // setUpClickListener(initialMap, platform);

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
      setLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const addGeozoneHandler = async () => {
    try {
      const payload = {
        name: formField.name?.value,
        description: formField.description?.value,
        locationType: formField.locationType?.value,
        mobileNumber: Number(formField.mobileNumber?.value),
        geoCodeData: {
          type: "Feature",
          geometry: {
            type: formField.type?.value,
            radius: Number(formField.radius?.value),
            coordinates: [
              Number(formField.lat?.value),
              Number(formField.long?.value),
            ],
          },
          properties: {
            name: formField.propertyName?.value,
          },
        },
        address: {
          zipCode: formField.zipCode?.value,
          country: formField.country?.value,
          state: formField.state?.value,
          area: formField.area?.value,
          city: formField.city?.value,
          district: formField.district?.value,
        },
        finalAddress: formField?.address?.value,
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
  let currentCircle: any = null;

  const createCircle = (evt: any) => {
    if (currentCircle) {
      mapCheck.removeObject(circleGroup);
      mapCheck.removeObject(circleMarker);
    }
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
          type: {
            value: "Geozone",
          },
          lat: {
            value: latLng.lat,
          },
          long: {
            value: latLng.lng,
          },
          radius: {
            value: circle.getRadius(),
          },
          propertyName: {
            value: null,
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
    currentCircle = { circleGroup, circleMarker };
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
    geozoneData.forEach((item: any) => {
      if (geozonesVisible) {
        map.addObject(
          new window.H.map.Circle(
            {
              lat: item?.geoCodeData?.geometry?.coordinates[0],
              lng: item?.geoCodeData?.geometry?.coordinates[1],
            },
            item?.geoCodeData?.geometry?.radius,
            {
              style: geozoneStyle,
            }
          )
        );
      }
    });
  };

  const toggleGeozonesVisibility = async () => {
    setGeozonesVisible(prevVisibility => !prevVisibility);
    if (!geozonesVisible) {
      await fetchGeozone();
    } else {
      mapCheck.removeObjects(mapCheck.getObjects());
    }
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
    setIsCircleActive(false);
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
          style={{
            position: "absolute",
            bottom: 25,
            left: "50vw",
            zIndex: 1,
            backgroundColor: "white",
            padding: "0.5rem",
            borderRadius: "0.2rem",
          }}
        >
          <Button
            onClick={handleCircleButtonClick}
            className={
              buttonisActive
                ? "classes.activeButton"
                : "classes.nonActiveButton"
            }
          >
            <Tooltip title="Draw Circle" placement="top" arrow>
              <DrawIcon />
            </Tooltip>
          </Button>
          <Button onClick={toggleGeozonesVisibility}>
            <Tooltip title="Geofence View" placement="top" arrow>
              <RemoveRedEyeIcon />
            </Tooltip>
          </Button>
          <Button
            onClick={() => {
              setPointCheck(!pointCheck);
              setIsCircleActive(false);
              circles.forEach(({ circleGroup, circleMarker }) => {
                if (mapCheck) {
                  mapCheck.removeObject(circleGroup);
                  mapCheck.removeObject(circleMarker);
                }
              });
              setCircles([]);
            }}
          >
            <Tooltip title="Find location" placement="top" arrow>
              <PinDropIcon />
            </Tooltip>
          </Button>
        </Box>
      </Box>
      {/* <Box
        style={{
          position: "absolute",
          top: 25,
          right: "25px",
          zIndex: 1,
          padding: "0.5rem",
          backgroundColor: "white",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          borderRadius: "0.3rem",
        }}
      >
        <Box sx={{ margin: "5px 5px", width: "350px" }}>
          <CustomInput
            placeHolder="Search....."
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
            }}
          >
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {geozoneData
                .filter((item: any) => {
                  if (searchText.trim() !== "") {
                    return (
                      item.name.trim().toLowerCase() ==
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
                        <ListItemText style={{ fontSize: "8px" }}>
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
      </Box> */}

      {createGeozoneModal()}
      <CustomLoader isLoading={loading} />
    </>
  );
};

export default Geozone;
