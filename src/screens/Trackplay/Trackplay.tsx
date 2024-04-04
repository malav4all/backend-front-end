import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CreateGeoZoneModal from "./Component/CreateTrackPlay.Modal";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import {
  openErrorNotification,
  openSuccessNotification,
} from "../../helpers/methods";
import { store } from "../../utils/store";
import {
  createTrackplay,
  fetchTrackplayHandler,
  updateTrackplay,
} from "./service/trackplay.service";
import CustomLoader from "../../global/components/CustomLoader/CustomLoader";

import trackplayStyle from "./Trackplay.styles";

import { fetchLocationType } from "../Settings/LocationType/service/location-type.service";
import { geoZoneInsertField, validateGeoZoneForm } from "./Trackplay.helper";
import { fetchJourney } from "../Journey/service/journey.service";

const Trackplay = () => {
  const [selectedRowData, setSelectedRowData] = useState<any>();
  const [isOpen, setOpenModal] = useState<boolean>(false);
  const [mapCheck, setMapCheck] = useState<any>(null);
  const [mapKey, setMapKey] = useState<number>(0);
  const [page, setpage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [trackplayData, setTrackplayData] = useState([]);
  const [circles, setCircles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isCircleActive, setIsCircleActive] = useState(false);
  const [trackplaysVisible, setTrackplaysVisible] = useState(true);
  const [pointCheck, setPointCheck] = useState(false);
  const [locationType, setLocationType] = useState([]);
  const [edit, setEdit] = useState<boolean>(false); // edit: true
  const [formField, setFormField] = useState<any>(geoZoneInsertField());
  const [searchLocationText, setSearchLocationText] = useState<string>("");
  const [viewTrackplay, setViewTrackplay] = useState<any>();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly Journey[]>([]);
  const searching = open && options.length === 0;
  const [inputValue, setInputValue] = useState("");
  interface Journey {
    journeyName: string;
  }

  function getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

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

  const topFilms = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    {
      title: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
    { title: "The Good, the Bad and the Ugly", year: 1966 },
    { title: "Fight Club", year: 1999 },
    {
      title: "The Lord of the Rings: The Fellowship of the Ring",
      year: 2001,
    },
    {
      title: "Star Wars: Episode V - The Empire Strikes Back",
      year: 1980,
    },
    { title: "Forrest Gump", year: 1994 },
    { title: "Inception", year: 2010 },
    {
      title: "The Lord of the Rings: The Two Towers",
      year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: "Goodfellas", year: 1990 },
    { title: "The Matrix", year: 1999 },
    { title: "Seven Samurai", year: 1954 },
    {
      title: "Star Wars: Episode IV - A New Hope",
      year: 1977,
    },
    { title: "City of God", year: 2002 },
    { title: "Se7en", year: 1995 },
    { title: "The Silence of the Lambs", year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: "Life Is Beautiful", year: 1997 },
    { title: "The Usual Suspects", year: 1995 },
    { title: "Léon: The Professional", year: 1994 },
    { title: "Spirited Away", year: 2001 },
    { title: "Saving Private Ryan", year: 1998 },
    { title: "Once Upon a Time in the West", year: 1968 },
    { title: "American History X", year: 1998 },
    { title: "Interstellar", year: 2014 },
  ];

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

  //   -----------------------------
  //   data fetching will come here
  // -------------------------------
  const fetchTrackplay = async () => {
    try {
      setLoading(true);
      const res = await fetchTrackplayHandler({
        input: {
          page,
          limit,
        },
      });

      setTrackplayData([]);
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

  const addTrackplayHandler = async () => {
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
          const res = await updateTrackplay({
            input: {
              _id: selectedRowData._id,
              ...payload,
              createdBy: store.getState().auth.userName,
            },
          });
          openSuccessNotification(res.updateTrackplay.message);
          setEdit(false);
        } else {
          const res = await createTrackplay({
            input: { ...payload, createdBy: store.getState().auth.userName },
          });
          openSuccessNotification(res.addTrackplay.message);
        }
        await handleCloseDialog();
        setPointCheck(false);
        mapCheck.removeEventListener("tap", setUpClickListener);
        mapCheck.removeObjects(mapCheck.getObjects());
        setFormField(geoZoneInsertField());
        await fetchTrackplay();
      }
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  let resizingTimeout: NodeJS.Timeout;

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

  const createTrackplayModal = () => {
    return (
      <>
        <CreateGeoZoneModal
          isOpenModal={isOpen}
          handleUpdateDialogClose={handleCloseDialog}
          setFormField={setFormField}
          formField={formField}
          addTrackplayHandler={addTrackplayHandler}
          locationType={locationType}
        />
      </>
    );
  };

  let bubbleNew: any;

  function openBubbleNew(position: any, text: any) {
    var platform = new window.H.service.Platform({
      apikey: "7snf2Sz_ORd8AClElg9h43HXV8YPI1pbVHyz2QvPsZI",
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
    trackplayData.forEach((item: any) => {
      if (trackplaysVisible) {
        let circle = new window.H.map.Circle(
          {
            lat: item?.geoCodeData?.geometry?.coordinates[0],
            lng: item?.geoCodeData?.geometry?.coordinates[1],
          },
          item?.geoCodeData?.geometry?.radius,
          {
            style: trackplayStyle,
          }
        );
        circle.setData(item.name);
        circle.addEventListener("tap", (evt: any) => {
          openBubbleNew(evt.target.getCenter(), item.name);
        });
        map.addObject(circle);
      }
    });
  };

  const viewTrackplayZoomLevel = (map: any) => {
    let marker;
    const center = {
      lat: viewTrackplay?.selectedTrackplayData.geoCodeData?.geometry
        ?.coordinates[0],
      lng: viewTrackplay?.selectedTrackplayData?.geoCodeData?.geometry
        ?.coordinates[1],
    };
    marker = new window.H.map.Marker(center);
    map.addObject(marker);
    map.setCenter(center);
    map.setZoom(17);
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
        style: trackplayStyle,
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

  const handleSearchLocation = () => {
    const platform = new window.H.service.Platform({
      apikey: "7snf2Sz_ORd8AClElg9h43HXV8YPI1pbVHyz2QvPsZI",
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
      apikey: "7snf2Sz_ORd8AClElg9h43HXV8YPI1pbVHyz2QvPsZI",
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

  function sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }

  const fetchJourneyHandler = async () => {
    try {
      const res = await fetchJourney({
        input: {
          page,
          limit: 10,
        },
      });
      const data = res.fetchJourney.data;
      setOptions(data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  useEffect(() => {
    let active = true;

    if (!searching) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);

      if (active) {
        setOptions([...options]);
      }
    })();

    return () => {
      active = false;
    };
  }, [searching]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

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

    return () => {
      window.removeEventListener("resize", () =>
        initialMap.getViewPort().resize()
      );
      initialMap.dispose();
    };
  }, []);

  useEffect(() => {
    fetchTrackplay();
    fetchLocationTypeHandler();
  }, []);

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
  }, [edit, mapCheck, trackplayData, selectedRowData]);

  useEffect(() => {
    if (viewTrackplay?.isViewTrackplay) {
      viewTrackplayZoomLevel(mapCheck);
    }
  }, [viewTrackplay]);

  useEffect(() => {
    fetchJourneyHandler();
  }, []);


  return (
    <>
      <Box
        component={"div"}
        id="map"
        style={{ width: "100%", height: "100%", position: "relative" }}
      ></Box>

      <Box
        style={{
          position: "absolute",
          top: 25,
          right: "25px",
          zIndex: 0,
          padding: "0.5rem",
          backgroundColor: "white",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          borderRadius: "0.3rem",
        }}
      >
        <Box
          style={{
            position: "absolute",
            top: 25,
            right: "25px",
            zIndex: 0,
            padding: "0.5rem",
            backgroundColor: "white",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            borderRadius: "0.3rem",
          }}
        >
          <Autocomplete
            id="asynchronous-demo"
            sx={{ width: 300, marginBottom: "3rem" }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            isOptionEqualToValue={(option, value) =>
              option.journeyName === value.journeyName
            }
            getOptionLabel={(option) => option.journeyName} 
            options={options} 
            loading={loading}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                InputLabelProps={{ shrink: false }}
                placeholder={inputValue ? "" : "Select Journey"}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />

          {/* <Autocomplete
            id="asynchronous-demo"
            sx={{ width: 300 }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            isOptionEqualToValue={(option, value) =>
              option.title === value.title
            }
            getOptionLabel={(option) => option.title}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select IMEI"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          /> */}

          <Box sx={{ margin: "5px 5px", width: "300px" }}>
            <PerfectScrollbar>
              <Box
                sx={{
                  height: "auto",
                  maxHeight: "300px",
                  padding: 0,
                  backgroundColor: "red",
                }}
              >
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  List 1
                </List>
              </Box>
            </PerfectScrollbar>
          </Box>
        </Box>

        {createTrackplayModal()}

        <CustomLoader isLoading={loading} />
      </Box>
    </>
  );
};

export default React.memo(Trackplay);
