import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DrawIcon from "@mui/icons-material/Draw";
import CreateGeoZoneModal from "./Component/CreateGeoZone.Modal";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../helpers/methods";
import { store } from "../../utils/store";
import {
  createGeozone,
  fetchGeozoneHandler,
  updateGeozone,
} from "./service/geozone.service";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import SearchIcon from "@mui/icons-material/Search";
import { CustomInput } from "../../global/components";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PinDropIcon from "@mui/icons-material/PinDrop";
import geozoneStyle from "./Geozone.styles";
import { fetchLocationType } from "../Settings/LocationType/service/location-type.service";
import { geoZoneInsertField } from "./Geozone.helper";
import { headerColor, primaryHeaderColor } from "../../utils/styles";
import { HiDotsVertical } from "react-icons/hi";

const fieldNames: { [key: string]: string } = {
  locationType: "Location Type",
  name: "Name",
  mobileNumber: "Mobile Number",
  zipCode: "Zip Code",
  country: "Country",
  state: "State",
  area: "Area",
  city: "City",
  district: "District",
  address: "Address",
};

const Geozone = () => {
  // const classes = geozoneStyle();
  const theme = useTheme();
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
  const [edit, setEdit] = useState<boolean>(false);
  const [formField, setFormField] = useState<any>(geoZoneInsertField());
  const [searchLocationText, setSearchLocationText] = useState<string>("");
  const [viewGeozone, setViewGeozone] = useState<any>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, item: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const validateFields = () => {
    let isValid = true;
    const newFormField = { ...formField };

    Object.keys(formField).forEach((field) => {
      if (!isTruthy(formField[field]?.value)) {
        newFormField[field].error = `Please enter ${
          fieldNames[field] || field
        }.`;
        isValid = false;
      }
    });

    setFormField(newFormField);
    return isValid;
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };
  const handleCircleButtonClick = () => {
    setIsCircleActive(!isCircleActive);
    setPointCheck(false);
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
      apikey: "B2MP4WbkH6aIrC9n0wxMrMrZhRCjw3EV7loqVzkBbEo",
    });
    var coord = mapCheck.screenToGeo(
      evt.currentPointer.viewportX,
      evt.currentPointer.viewportY
    );

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
      apikey: "B2MP4WbkH6aIrC9n0wxMrMrZhRCjw3EV7loqVzkBbEo",
    });
    const defaultLayers = platform.createDefaultLayers();

    const initialMap = new window.H.Map(
      document.getElementById("map"),
      defaultLayers.vector.normal.map,
      {
        center: { lat: 28.7041, lng: 77.1025 },
        zoom: 8,
        pixelRatio: window.devicePixelRatio || 1,
        key: mapKey,
      }
    );

    new window.H.mapevents.Behavior(
      new window.H.mapevents.MapEvents(initialMap)
    );
    window.H.ui.UI.createDefault(initialMap, defaultLayers);
    showCircleToMap(initialMap);
    addMarkersToMap(initialMap);
    setMapCheck(initialMap);

    return () => {
      window.removeEventListener("resize", () =>
        initialMap.getViewPort().resize()
      );
      initialMap.dispose();
    };
  }, []);

  useEffect(() => {
    fetchGeozone();
  }, []);

  const fetchGeozone = async () => {
    try {
      setLoading(true);
      const res = await fetchGeozoneHandler({
        input: {
          accountId: store.getState().auth.tenantId,
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
    if (!validateFields()) {
      return;
    }
    try {
      const payload = {
        accountId: store.getState().auth.tenantId,
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
      setEdit(false);
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
        });
        if (resizingTimeout) {
          clearTimeout(resizingTimeout);
        }

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
          edit={edit}
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

  useEffect(() => {
    if (viewGeozone?.isViewGeozone) {
      viewGeozoneZoomLevel(mapCheck);
    }
  }, [viewGeozone]);

  let bubbleNew: any;
  function openBubbleNew(position: any, text: any, map: any) {
    var platform = new window.H.service.Platform({
      apikey: "B2MP4WbkH6aIrC9n0wxMrMrZhRCjw3EV7loqVzkBbEo",
    });
    var defaultLayers = platform.createDefaultLayers();
    var ui = window.H.ui.UI.createDefault(mapCheck, defaultLayers);
    if (!bubbleNew) {
      bubbleNew = new window.H.ui.InfoBubble(position, { content: text });
      ui.addBubble(bubbleNew);
    } else {
      bubbleNew.setPosition(position);
      bubbleNew.setContent(text);
      bubbleNew.open();
    }
  }

  const showCircleToMap = (map: any) => {
    geozoneData.forEach((item: any) => {
      if (geozonesVisible) {
        let circle = new window.H.map.Circle(
          {
            lat: item?.geoCodeData?.geometry?.coordinates[0],
            lng: item?.geoCodeData?.geometry?.coordinates[1],
          },
          item?.geoCodeData?.geometry?.radius,
          {
            style: geozoneStyle,
          }
        );
        circle.setData(item.name);
        circle.addEventListener("tap", (evt: any) => {
          openBubbleNew(evt.target.getCenter(), item.name, map);
        });
        map.addObject(circle);
      }
    });
  };

  const viewGeozoneZoomLevel = (map: any) => {
    let marker;
    const center = {
      lat: viewGeozone?.selectedGeozoneData.geoCodeData?.geometry
        ?.coordinates[0],
      lng: viewGeozone?.selectedGeozoneData?.geoCodeData?.geometry
        ?.coordinates[1],
    };
    marker = new window.H.map.Marker(center);
    map.addObject(marker);
    map.setCenter(center);
    map.setZoom(13);
  };

  const renderCircleToMap = (map: any) => {
    map.setCenter({
      lat: selectedRowData.geoCodeData?.geometry?.coordinates[0],
      lng: selectedRowData.geoCodeData?.geometry?.coordinates[1],
    });
    map.setZoom(13);
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
      volatility: true,
      objects: [circle, circleOutline],
    });

    var circleTimeout: any;

    circle.draggable = true;
    circleOutline.draggable = true;

    circleOutline
      .getGeometry()
      .pushPoint(circleOutline.getGeometry().extractPoint(0));

    map.addObject(circleGroup);
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
        circleOutline.setStyle(newStyle);
      },
      true
    );
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
        var pointer = evt.currentPointer,
          distanceFromCenterInMeters = circle
            .getCenter()
            .distance(map.screenToGeo(pointer.viewportX, pointer.viewportY));

        if (evt.target instanceof window.H.map.Polyline) {
          circle.setRadius(distanceFromCenterInMeters);

          var outlineLinestring = circle.getGeometry().getExterior();

          outlineLinestring.pushPoint(outlineLinestring.extractPoint(0));
          circleOutline.setGeometry(outlineLinestring);

          evt.stopPropagation();
          setFormField({
            ...formField,
            radius: {
              value: circle.getRadius(),
            },
          });
          if (resizingTimeout) {
            clearTimeout(resizingTimeout);
          }

          resizingTimeout = setTimeout(() => {
            setOpenModal(true);
          }, 500);
        }
      },
      true
    );
  };

  const handleSearchLocation = () => {
    const platform = new window.H.service.Platform({
      apikey: "B2MP4WbkH6aIrC9n0wxMrMrZhRCjw3EV7loqVzkBbEo",
    });
    const geocoder = platform.getSearchService();
    const geocodingParameters = {
      q: searchLocationText,
      countryCode: "IND",
    };

    geocoder.geocode(
      geocodingParameters,
      (result: any) => {
        addLocationsToMap(result.items);
        mapCheck.setZoom(16);
      },
      (error: any) => {
        alert("Error geocoding location");
      }
    );
  };

  let bubble: any;
  function openBubble(position: any, text: any) {
    var platform = new window.H.service.Platform({
      apikey: "B2MP4WbkH6aIrC9n0wxMrMrZhRCjw3EV7loqVzkBbEo",
    });
    var defaultLayers = platform.createDefaultLayers();
    var ui = window.H.ui.UI.createDefault(mapCheck, defaultLayers);
    if (!bubble) {
      bubble = new window.H.ui.InfoBubble(position, { content: text });
      ui.addBubble(bubble);
    } else {
      bubble.setPosition(position);
      bubble.setContent(text);
      bubble.open();
    }
  }

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSearchLocation();
    }
  };

  let markers: any = [];

  const addLocationsToMap = (locations: any) => {
    var group = new window.H.map.Group(),
      i;

    markers.forEach((marker: any) => {
      mapCheck.removeObject(marker);
    });
    markers = [];

    for (i = 0; i < locations.length; i += 1) {
      let location = locations[i];
      let marker = new window.H.map.Marker(location.position);
      marker.label = location.address.label;
      markers.push(marker);
      group.addObject(marker);
    }

    group.addEventListener(
      "tap",
      function (evt: any) {
        mapCheck.setCenter(evt.target.getGeometry());
        openBubble(evt.target.getGeometry(), evt.target.label);
      },
      false
    );

    mapCheck.addObject(group);
    mapCheck.setCenter(group.getBoundingBox().getCenter());
  };

  return (
    <Box display="flex" height="100vh">
      <Box
        sx={{
          width: "20%",
          minWidth: "300px",
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          padding: "1rem",
        }}
      >
        <Box
          sx={{
            padding: "2rem 1.5rem",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "8px",
            border: "1px solid",
            borderColor: theme.palette.divider,
            color: theme.palette.text.primary,
            marginBottom: "1rem",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Geist_semibold",
              fontSize: "1.1rem",
              marginBottom: "1rem",
              padding: "0.2rem 0.8rem",
              borderRadius: "5px",
              borderLeft: "7px solid",
              borderLeftColor: "#855BDE",
            }}
          >
            Create Geofence
          </Typography>

          <CustomInput
            placeHolder="Search Location"
            id="search_location"
            onChange={(e: any) => setSearchLocationText(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: theme.palette.text.primary }} />
                </InputAdornment>
              ),
              style: { color: theme.palette.text.primary },
            }}
            sx={{ marginBottom: "2rem", width: "100%" }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <Tooltip arrow title="Create Circle" placement="top">
              <Button
                onClick={handleCircleButtonClick}
                sx={{
                  backgroundColor: isCircleActive
                    ? "#E3D7FC"
                    : theme.palette.background.paper,
                  marginRight: "0.5rem",
                  padding: "0.5rem",
                  minWidth: "auto",
                }}
              >
                <DrawIcon sx={{ color: primaryHeaderColor }} />
              </Button>
            </Tooltip>
            <Tooltip
            arrow
              title={
                geozonesVisible ? "Hide Geofence View" : "Show Geofence View"
              }
              placement="top"
            >
              <Button
                onClick={toggleGeozonesVisibility}
                sx={{
                  backgroundColor: geozonesVisible
                    ? "#E3D7FC"
                    : theme.palette.background.paper,
                  marginRight: "0.5rem",
                  padding: "0.5rem",
                  minWidth: "auto",
                }}
              >
                <RemoveRedEyeIcon sx={{ color: primaryHeaderColor }} />
              </Button>
            </Tooltip>
            <Tooltip arrow title="Create Location Point" placement="top">
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
                    mapCheck.getObjects().forEach((object: any) => {
                      if (object !== circleGroup) {
                        mapCheck.removeObject(object);
                      }
                    });
                  }
                }}
                sx={{
                  backgroundColor: pointCheck
                    ? "#E3D7FC"
                    : theme.palette.background.paper,
                  padding: "0.5rem",
                  minWidth: "auto",
                }}
              >
                <PinDropIcon sx={{ color: primaryHeaderColor }} />
              </Button>
            </Tooltip>
          </Box>
        </Box>
        <Box
          sx={{
            padding: "2rem 1.5rem",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "8px",
            border: "1px solid",
            borderColor: theme.palette.divider,
            color: theme.palette.text.primary,
            marginBottom: "1rem",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Geist_semibold",
              fontSize: "1.1rem",
              marginBottom: "1rem",
              padding: "0.2rem 0.8rem",
              borderRadius: "5px",
              borderLeft: "7px solid",
              borderLeftColor: "#855BDE",
            }}
          >
            Geozone List
          </Typography>
          <CustomInput
            placeHolder="Search Geozone"
            id="search_geozone"
            onChange={(e: any) => setSearchText(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: theme.palette.text.primary }} />
                </InputAdornment>
              ),
              style: { color: theme.palette.text.primary },
            }}
            sx={{ marginBottom: "1rem", width: "100%" }}
          />
          <PerfectScrollbar style={{ maxHeight: "500px" }}>
            <List>
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
                .map((item: any) => (
                  <ListItem
                    key={item._id}
                    sx={{
                      backgroundColor: theme.palette.background.paper,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        cursor: "pointer",
                        display: "flex",
                        marginY: "1rem",
                      }}
                      onClick={() => {
                        setViewGeozone({
                          isViewGeozone: true,
                          selectedGeozoneData: item,
                        });
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: "#e3d7fc" }}>
                          <LocationOnIcon sx={{ color: "#855BDE" }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              color: theme.palette.text.primary,
                              fontWeight: "bold",
                            }}
                          >
                            {item.locationId} - {item.name}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            sx={{
                              color: theme.palette.text.secondary,
                              fontSize: "13px",
                            }}
                          >
                            {item.locationType}
                          </Typography>
                        }
                      />
                    </Box>

                    <IconButton
                      onClick={(event) => handleMenuClick(event, item)}
                    >
                      <HiDotsVertical />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedItem === item}
                      onClose={handleMenuClose}
                    >
                      <MenuItem
                        onClick={() => {
                          handleMenuClose();
                          setOpenModal(true);
                          setFormField(geoZoneInsertField(item));
                          setSelectedRowData(item);
                          setEdit(true);
                        }}
                      >
                        <EditIcon sx={{ marginRight: "0.5rem" }} />
                        Edit
                      </MenuItem>
                    </Menu>
                  </ListItem>
                ))}
            </List>
          </PerfectScrollbar>
        </Box>
      </Box>

      <Box id="map" sx={{ width: "80%", height: "100vh" }}></Box>
      {createGeozoneModal()}
      <CustomLoader isLoading={loading} />
    </Box>
  );
};

export default React.memo(Geozone);
