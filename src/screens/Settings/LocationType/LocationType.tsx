import {
  Box,
  FormHelperText,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  getRelativeFontSize,
  primaryHeadingColor,
  boldFont,
} from "../../../utils/styles";
import SearchIcon from "@mui/icons-material/Search";
import {
  CustomButton,
  CustomInput,
  CustomTable,
} from "../../../global/components";
import {
  debounceEventHandler,
  isTruthy,
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
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";

const tableHeader = [
  {
    name: "Type",
    field: "type",
  },
];

const LocationType = () => {
  const [formField, setFormField] = useState<any>({ value: "", error: "" });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [searchLocation, setSearchLocation] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);

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
            type: formField,
            createdBy: store?.getState()?.auth.userName,
          },
        });
        openSuccessNotification(res.addLocationType.message);
        await fetchLocationTypeHandler();
        setFormField({});
      }
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const fetchLocationTypeHandler = async () => {
    try {
      const res = await fetchLocationType({
        input: {
          page,
          limit,
        },
      });
      setData(res.fetchLocationType.data);
      setCount(res.fetchLocationType.paginatorInfo.count);
    } catch (error: any) {
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
          search: searchLocation,
          page: 1,
          limit: 10,
        },
      });
      setData(res?.searchLocations?.data);
      setCount(res?.searchLocations?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search asset..."
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
  const addLocationTypeButton = () => {
    return (
      <CustomButton
        id="assetAssingment_add_button"
        label={"Add"}
        onClick={addLocationTypeHandler}
        customClasses={{
          width: "150px",
          marginTop: "20px",
        }}
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

  const locationTypeTable = () => {
    return (
      <Box
        id="assetAssingment_display_table"
        sx={{
          minWidth: "300px",
          width: "30%",
          overflow: "auto",
        }}
      >
        <CustomTable
          headers={tableHeader}
          rows={data}
          paginationCount={count}
          // handleRowClick={updateAssetAssingmentDetails}
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
      <Box>
        <Stack
          px={4}
          pt={2}
          direction={{ lg: "row", xs: "column" }}
          justifyContent="space-between"
          alignItems={{ lg: "center" }}
        >
          <Typography
            sx={{
              fontSize: getRelativeFontSize(6),
              ...boldFont,
              color: primaryHeadingColor,
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
          </Stack>
        </Stack>

        <Stack
          px={4}
          pt={2}
          direction={{ lg: "row", xs: "column" }}
          alignItems={{ lg: "center" }}
          gap={2}
        >
          <CustomInput
            label="Type"
            value={formField.value}
            onChange={(e: any) => {
              setFormField({ ...formField, value: e.target.value, error: "" });
            }}
            placeHolder="Enter Type"
            error={
              !isTruthy(formField?.value) &&
              isTruthy(formField?.error) &&
              formField?.error
            }
          />
          {addLocationTypeButton()}
        </Stack>
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
    </>
  );
};

export default LocationType;
