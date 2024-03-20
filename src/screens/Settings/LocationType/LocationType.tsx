import { Box, InputAdornment, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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
  openErrorNotification,
  openSuccessNotification,
} from "../../../helpers/methods";
import strings from "../../../global/constants/StringConstants";
import {
  createLocationType,
  fetchLocationType,
} from "./service/location-type.service";
import { store } from "../../../utils/store";

const tableHeader = [
  {
    name: "Type",
    field: "type",
  },
];

const LocationType = () => {
  const [formField, setFormField] = useState<string>("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchLocationTypeHandler();
  }, []);

  const addLocationTypeHandler = async () => {
    try {
      const res = await createLocationType({
        input: {
          type: formField,
          createdBy: store.getState().auth.userName,
        },
      });
      openSuccessNotification(res.addLocationType.message);
      await fetchLocationTypeHandler();
      setFormField("");
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

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search asset..."
        id="assetAssingment_search_field"
        // onChange={debounceEventHandler(
        //   handleSearchOnChange,
        //   strings.SEARCH_TIME_OUT
        // )}
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
    setLimit(event.target.value);
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
          handlePageChange={handleChangePage}
          pageNumber={page}
          setPage={setPage}
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
            value={formField}
            onChange={(e: any) => {
              setFormField(e.target.value);
            }}
            placeHolder="Enter Type"
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
      </Box>
    </>
  );
};

export default LocationType;
