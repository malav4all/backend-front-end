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
import {
  createGeozone,
  fetchGeozoneHandler,
  updateGeozone,
} from "./service/geozone.service";
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
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { fetchLocationType } from "../Settings/LocationType/service/location-type.service";
import { geoZoneInsertField, validateGeoZoneForm } from "./Geozone.helper";

const Geozone = () => {
  const [selectedRowData, setSelectedRowData] = useState<any>();
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
  const [locationType, setLocationType] = useState([]);
  const [edit, setEdit] = useState<boolean>(false); // edit: true
  const [formField, setFormField] = useState<any>(geoZoneInsertField());

  const fetchLocationTypeHandler = async () => {
    try {
      const res = await fetchLocationType({
        input: {
          page: -1,
          limit: 0,
        },
      });
      setLocationType(res.fetchLocationType.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

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
        var zipcode = result.items[0].address.postalCode;
        var marker = new window.H.map.Marker(coord);
        alert(
          `Location: ${locationName}\nLatitude: ${coord.lat.toFixed(
            4
          )}\nLongitude: ${coord.lng.toFixed(4)}\nZipcode: ${zipcode}`
        );

        currentMarker = marker;
        mapCheck.addObject(marker);

        setOpenModal(true);
        const addressParts = [
          result.items[0].address.countryName,
          result.items[0].address.city,
          result.items[0].address.state,
          result.items[0].address.subdistrict,
          result.items[0].address.district,
          result.items[0].address.postalCode,
        ].filter(Boolean);
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
            value: addressParts.join("-"),
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
    // renderAndUpdateCircleToMap(initialMap);
    showCircleToMap(initialMap);
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
    fetchGeozone();
    fetchLocationTypeHandler();
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
  const handleValidation = () => {
    const { isValid, errors } = validateGeoZoneForm(formField);
    setFormField({ ...errors });
    return isValid;
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
      if (handleValidation()) {
        if (edit) {
          const res = await updateGeozone({
            input: {
              _id: selectedRowData._id,
              ...payload,
              createdBy: store.getState().auth.userName,
            },
          });
          openSuccessNotification(res.updateGeozone.message);
          setEdit(false);
        } else {
          const res = await createGeozone({
            input: { ...payload, createdBy: store.getState().auth.userName },
          });
          openSuccessNotification(res.addGeozone.message);
        }
        await handleCloseDialog();
        setPointCheck(false);
        mapCheck.removeEventListener("tap", setUpClickListener);
        mapCheck.removeObjects(mapCheck.getObjects());
        setFormField(geoZoneInsertField());
        await fetchGeozone();
      }
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
    if (!isCircleActive) {
      return;
    }
    var pointer = evt.currentPointer;
    var latLng = mapCheck.screenToGeo(pointer.viewportX, pointer.viewportY);
    if (currentCircle) {
      // Remove existing circle and marker
      mapCheck.removeObject(currentCircle.circleGroup);
      mapCheck.removeObject(currentCircle.circleMarker);
    }

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

    setCircles([...circles, currentCircle]);
  };

  const addMarkersToMap = (map: any) => {
    let parisMarker = new window.H.map.Marker({
      lat: 28.495831757053296,
      lng: 77.07923644083718,
    });
    map.addObject(parisMarker);
  };

  const toggleGeozonesVisibility = async () => {
    setGeozonesVisible((prevVisibility) => !prevVisibility);
    if (!geozonesVisible) {
      await fetchGeozone();
    } else {
      mapCheck.removeObjects(mapCheck.getObjects());
    }
  };

  const handleCloseDialog = () => {
    setOpenModal(false);
    if (!edit) {
      circles.forEach(({ circleGroup, circleMarker }) => {
        if (mapCheck) {
          mapCheck.removeObject(circleGroup);
          mapCheck.removeObject(circleMarker);
        }
      });
      setCircles([]);
      setIsCircleActive(false);
      setFormField(geoZoneInsertField());
    }
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
          locationType={locationType}
        />
      </>
    );
  };

  useEffect(() => {
    if (mapCheck) {
      if (edit) {
        mapCheck.removeObjects(mapCheck.getObjects());
        renderCircleToMap(mapCheck); // Render circles if edit is true
      } else {
        mapCheck.removeObjects(mapCheck.getObjects()); // Remove all existing circles if edit is false
        showCircleToMap(mapCheck); // Add updated circles
      }
    }
  }, [edit, mapCheck, geozoneData, selectedRowData]);

  const showCircleToMap = (map: any) => {
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

  const renderCircleToMap = (map: any) => {
    map.setCenter({
      lat: selectedRowData.geoCodeData?.geometry?.coordinates[0],
      lng: selectedRowData.geoCodeData?.geometry?.coordinates[1],
    });
    map.setZoom(14);
    var circle = new window.H.map.Circle(
      {
        lat: selectedRowData.geoCodeData?.geometry?.coordinates[0],
        lng: selectedRowData.geoCodeData?.geometry?.coordinates[1],
      },
      selectedRowData.geoCodeData?.geometry?.radius,
      {
        style: geozoneStyle,
      }
    );

    var circleOutline = new window.H.map.Polyline(
      circle.getGeometry().getExterior(),
      {
        style: {
          lineWidth: 8,
          strokeColor: "rgba(255, 0, 0, 0)",
        },
      }
    );

    var circleGroup = new window.H.map.Group({
      volatility: true, // mark the group as volatile for smooth dragging of all it's objects
      objects: [circle, circleOutline],
    });

    var circleTimeout: any;

    // ensure that the objects can receive drag events
    circle.draggable = true;
    circleOutline.draggable = true;

    // extract first point of the circle outline polyline's LineString and
    // push it to the end, so the outline has a closed geometry
    circleOutline
      .getGeometry()
      .pushPoint(circleOutline.getGeometry().extractPoint(0));

    // add group with circle and it's outline (polyline)
    map.addObject(circleGroup);
    // event listener for circle group to show outline (polyline) if moved in with mouse (or touched on touch devices)
    circleGroup.addEventListener(
      "pointerenter",
      function (evt: any) {
        var currentStyle = circleOutline.getStyle(),
          newStyle = currentStyle.getCopy({
            strokeColor: "rgb(255, 0, 0)",
          });

        if (circleTimeout) {
          clearTimeout(circleTimeout);
          circleTimeout = null;
        }
        // show outline
        circleOutline.setStyle(newStyle);
      },
      true
    );
    // event listener for circle group to hide outline if moved out with mouse (or released finger on touch devices)
    // the outline is hidden on touch devices after specific timeout
    circleGroup.addEventListener(
      "pointerleave",
      function (evt: any) {
        var currentStyle = circleOutline.getStyle(),
          newStyle = currentStyle.getCopy({
            strokeColor: "rgba(255, 0, 0, 0)",
          }),
          timeout = evt.currentPointer.type == "touch" ? 1000 : 0;

        circleTimeout = setTimeout(function () {
          circleOutline.setStyle(newStyle);
        }, timeout);
        document.body.style.cursor = "default";
      },
      true
    );
    // event listener for circle group to change the cursor if mouse position is over the outline polyline (resizing is allowed)
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

    // event listener for circle group to resize the geo circle object if dragging over outline polyline
    circleGroup.addEventListener(
      "drag",
      function (evt: any) {
        var pointer = evt.currentPointer,
          distanceFromCenterInMeters = circle
            .getCenter()
            .distance(map.screenToGeo(pointer.viewportX, pointer.viewportY));

        // if resizing is alloved, set the circle's radius
        if (evt.target instanceof window.H.map.Polyline) {
          circle.setRadius(distanceFromCenterInMeters);

          // use circle's updated geometry for outline polyline
          var outlineLinestring = circle.getGeometry().getExterior();

          // extract first point of the outline LineString and push it to the end, so the outline has a closed geometry
          outlineLinestring.pushPoint(outlineLinestring.extractPoint(0));
          circleOutline.setGeometry(outlineLinestring);

          // prevent event from bubling, so map doesn't receive this event and doesn't pan
          evt.stopPropagation();
          setFormField({
            ...formField,
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
        }
      },
      true
    );
  };

  return (
    <>
      <Box component={"div"} id="map" style={{ width: "100%", height: "100%" }}>
        <Box
          style={{
            position: "absolute",
            top: "42%",
            left: "17vw",
            zIndex: 1,
            backgroundColor: "white",
            padding: "0.5rem",
            borderRadius: "0.2rem",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              width: "40px",
              padding: "0.5rem 0rem",
              borderRadius: "0.2rem",
              overflow: "hidden",
              gap: "0.5 rem",
            }}
          >
            <Button
              onClick={handleCircleButtonClick}
              style={{
                backgroundColor: isCircleActive ? "#cef2ff" : "white",
                marginRight: "0.3rem",
                marginLeft: "-12px",
              }}
            >
              <Tooltip title="Draw Circle Polygon" placement="right" arrow>
                <DrawIcon />
              </Tooltip>
            </Button>

            <Button
              onClick={toggleGeozonesVisibility}
              style={{
                backgroundColor: geozonesVisible ? "#cef2ff" : "white",
                marginLeft: "-12px",
              }}
            >
              {geozonesVisible ? (
                <Tooltip title="Hide Geofence View" placement="right" arrow>
                  <RemoveRedEyeIcon />
                </Tooltip>
              ) : (
                <Tooltip title="Show Geofence View" placement="right" arrow>
                  <RemoveRedEyeIcon />
                </Tooltip>
              )}
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
                if (pointCheck === true) {
                  // Remove all markers from the map
                  mapCheck.getObjects().forEach((object: any) => {
                    if (object !== circleGroup) {
                      mapCheck.removeObject(object);
                    }
                  });
                }
              }}
              style={{
                backgroundColor: pointCheck ? "#cef2ff" : "white",
                marginLeft: "-12px",
              }}
            >
              <Tooltip title="Draw Point" placement="right" arrow>
                <PinDropIcon />
              </Tooltip>
            </Button>
          </Box>
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
                          {item.description}
                        </ListItemText>
                      </Box>
                    </ListItemText>
                    <ListItemAvatar>
                      <EditIcon
                        htmlColor={"#0F2167"}
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          // setOpenModal(true);
                          setFormField(geoZoneInsertField(item));
                          setSelectedRowData(item);
                          setEdit(true);
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

export default React.memo(Geozone);
