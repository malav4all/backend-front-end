import {
  Box,
  InputAdornment,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  CustomAppHeader,
  CustomButton,
  CustomInput,
  CustomTable,
} from "../../../global/components";
import {
  debounceEventHandler,
  openErrorNotification,
  openSuccessNotification,
} from "../../../helpers/methods";
import strings from "../../../global/constants/StringConstants";
import {
  createLocationType,
  fetchLocationType,
  searchLocations,
} from "./service/location-type.service";
import { store } from "../../../utils/store";
import { validateLocationTypeForm } from "./LocationTypeandValidations";
import { regularFont } from "../../../utils/styles";
import AddLocationTypeModal from "./component/AddLocationType";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import LocationTypeStyles from "./LocationType.styles";
const tableHeader = [
  {
    name: "Location Type",
    field: "type",
  },
];

const LocationType = () => {
  const theme = useTheme();
  const classes = LocationTypeStyles;
  const [formField, setFormField] = useState<any>({ value: "", error: "" });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [searchLocation, setSearchLocation] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchLocationTypeHandler();
  }, []);

  useEffect(() => {
    if (searchLocation) {
      getSearchData();
    } else {
      fetchLocationTypeHandler();
    }
  }, [searchLocation, page, limit, searchPageNumber]);

  const handleValidation = () => {
    const { isValid, errors } = validateLocationTypeForm(formField);
    setFormField(errors);
    return isValid;
  };

  const addLocationTypeHandler = async () => {
    try {
      if (handleValidation()) {
        const res = await createLocationType({
          input: {
            accountId: store.getState().auth.tenantId,
            type: formField.value,
            createdBy: store?.getState()?.auth.userName,
          },
        });
        openSuccessNotification(res.addLocationType.message);
        await fetchLocationTypeHandler();
        setFormField({ value: "", error: "" });
        setDialogOpen(false); // Close the dialog after successful addition
      }
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const fetchLocationTypeHandler = async () => {
    try {
      const res = await fetchLocationType({
        input: {
          accountId: store.getState().auth.tenantId,
          page,
          limit,
        },
      });
      setData(res.fetchLocationType.data);
      setCount(res.fetchLocationType.paginatorInfo.count);
    } catch (error: any) {
      console.log(error);
      openErrorNotification(error.message);
    }
  };

  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      setSearchLocation(SearchEvent.target.value.replace(/\s/g, ""));
      setPage(1);
      setLimit(10);
    } else {
      setSearchLocation("");
    }
  };

  const getSearchData = async () => {
    try {
      setIsLoading(true);
      const res = await searchLocations({
        input: {
          accountId: store.getState().auth.tenantId,
          search: searchLocation,
          page: 1,
          limit: 10,
        },
      });
      setData(res?.searchLocationTypes?.data);
      setCount(res?.searchLocationTypes?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search Location Type"
        id="assetAssingment_search_field"
        onChange={debounceEventHandler(
          handleSearchOnChange,
          strings.SEARCH_TIME_OUT
        )}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  };

  const AddLocationType = () => {
    return (
      <CustomButton
        id="add_location_type_button"
        label="Add Location Type"
        onClick={() => setDialogOpen(true)}
      />
    );
  };

  const handlePerPageData = (event: any) => {
    setPage(1);
    setSearchPageNumber(1);
    setLimit(event.target.value);
  };

  const handleSearchChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setSearchPageNumber(newPage);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const SettingsHeader = () => {
    return (
      <CustomAppHeader
        className={{
          ...classes.headerBackgroundColor,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Stack
          px={1}
          mt={4}
          direction={{ lg: "row", xs: "column" }}
          justifyContent="space-between"
          alignItems={{ lg: "center" }}
        >
          <Typography
            style={{
              ...classes.settingsTitle,
              color: theme.palette.text.primary,
            }}
          >
            Location Type
          </Typography>

          <Stack
            direction={{ sm: "row", xs: "column" }}
            alignItems={{ sm: "center" }}
            spacing={1}
          >
            {getSearchBar()}
            {AddLocationType()}
          </Stack>
        </Stack>
      </CustomAppHeader>
    );
  };

  const locationTypeTable = () => {
    return (
      <Box
        id="assetAssingment_display_table"
        sx={{
          minWidth: "300px",
          width: "100%",
          overflow: "auto",
        }}
      >
        <CustomTable
          headers={tableHeader}
          rows={data}
          paginationCount={count}
          handlePageChange={
            searchLocation ? handleSearchChangePage : handleChangePage
          }
          pageNumber={searchLocation ? searchPageNumber : page}
          setPage={searchLocation ? setSearchPageNumber : setPage}
          handlePerPageData={handlePerPageData}
          perPageData={limit}
          rowsPerPage={limit}
          isExportCSV={false}
        />
      </Box>
    );
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          height: "120%",
        }}
      >
        {SettingsHeader()}

        <Box
          sx={{
            minWidth: "300px",
            overflow: "auto",
            padding: "30px",
          }}
        >
          {locationTypeTable()}
        </Box>
        <CustomLoader isLoading={isLoading} />
      </Box>

      <AddLocationTypeModal
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        formField={formField}
        onChangeHandler={(e: any) => {
          setFormField({ ...formField, value: e.target.value, error: "" });
        }}
        handleSave={addLocationTypeHandler}
        isLoading={isLoading}
        classes={{}}
      />
    </>
  );
};

export default LocationType;
