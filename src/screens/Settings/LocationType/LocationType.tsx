import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
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
  updateLocationType,
} from "./service/location-type.service";
import { store } from "../../../utils/store";
import { validateLocationTypeForm } from "./LocationTypeandValidations";
import AddLocationTypeModal from "./component/AddLocationType";
import LocationTypeStyles from "./LocationType.styles";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import EditIcon from "@mui/icons-material/Edit";
import StringConstants from "../../../global/constants/StringConstants";
import { hasAccessTo } from "../../../utils/AuthorizationManager";
interface LocationTypeFormField {
  id: {
    value: string;
    error: string;
  };
  type: {
    value: string;
    error: string;
  };
}

const tableHeader = [
  { name: "Location Type", field: "type" },
  { name: "Action", field: "action" },
];

interface LocationTypeItem {
  _id: string;
  type: string;
}

const LocationType: React.FC = () => {
  const theme = useTheme();
  const classes = LocationTypeStyles;
  const [formField, setFormField] = useState<LocationTypeFormField>({
    id: { value: "", error: "" },
    type: { value: "", error: "" },
  });
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchPageNumber, setSearchPageNumber] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const title = "Location Type";
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

  const handleValidation = (): boolean => {
    const { isValid, errors } = validateLocationTypeForm(formField);
    setFormField(errors as LocationTypeFormField);
    return isValid;
  };

  const addLocationTypeHandler = async (): Promise<void> => {
    try {
      if (handleValidation()) {
        const payload = {
          accountId: store.getState().auth.tenantId,
          type: formField.type.value,
          ...(edit
            ? { updatedBy: store.getState().auth.userName }
            : { createdBy: store.getState().auth.userName }),
        };

        if (edit) {
          await handleUpdateLocationType(payload);
        } else {
          await handleCreateLocationType(payload);
        }

        resetForm();
        setDialogOpen(false);
      }
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const handleCreateLocationType = async (payload: any): Promise<void> => {
    const res = await createLocationType({ input: payload });
    openSuccessNotification(res.addLocationType.message);
    await fetchLocationTypeHandler();
  };

  const handleUpdateLocationType = async (payload: any): Promise<void> => {
    const res = await updateLocationType({
      input: {
        ...payload,
        _id: formField.id.value,
      },
    });
    openSuccessNotification(res.updateLocationType.message);
    await fetchLocationTypeHandler();
  };

  const resetForm = (): void => {
    setEdit(false);
    setFormField({
      id: { value: "", error: "" },
      type: { value: "", error: "" },
    });
  };

  const handleEditClick = (id: string, type: string): void => {
    setDialogOpen(true);
    setEdit(true);
    setFormField({
      id: { value: id, error: "" },
      type: { value: type, error: "" },
    });
  };

  const mapLocationTypeData = (data: LocationTypeItem[]) => {
    return data.map((item) => ({
      type: item.type,
      action: (
        <>
          {hasAccessTo(StringConstants.LOCATION, StringConstants.UPDATE) && (
            <Tooltip
              title="Edit"
              onClick={() => handleEditClick(item._id, item.type)}
            >
              <EditIcon
                htmlColor={"#7C58CB"}
                style={{ margin: "0px 8px -7px 0px", cursor: "pointer" }}
              />
            </Tooltip>
          )}
        </>
      ),
    }));
  };

  const fetchLocationTypeHandler = async (): Promise<void> => {
    try {
      const res = await fetchLocationType({
        input: {
          accountId: store.getState().auth.tenantId,
          page,
          limit,
        },
      });
      const responseData = mapLocationTypeData(res.fetchLocationType.data);
      setData(responseData);
      setCount(res.fetchLocationType.paginatorInfo.count);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const handleSearchOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchValue = event.target.value.trim();
    setSearchLocation(searchValue || "");
    setPage(1);
  };

  const getSearchData = async (): Promise<void> => {
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
      const responseData = mapLocationTypeData(res.searchLocationTypes.data);
      setData(responseData);
      setCount(res.searchLocationTypes.paginatorInfo.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const handlePerPageData = (event: ChangeEvent<HTMLInputElement>): void => {
    setPage(1);
    setLimit(Number(event.target.value));
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage);
  };

  const SettingsHeader = (): JSX.Element => (
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
        <Box>
          <Typography
            sx={{
              ...classes.mainCardHeading,
              color: theme.palette.text.primary,
            }}
          >
            {title}
          </Typography>
        </Box>

        <Stack
          direction={{ sm: "row", xs: "column" }}
          alignItems={{ sm: "center" }}
          spacing={1}
        >
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
          {hasAccessTo(StringConstants.LOCATION, StringConstants.ADD) && (
            <CustomButton
              id="add_location_type_button"
              label="Add Location Type"
              onClick={() => setDialogOpen(true)}
            />
          )}
        </Stack>
      </Stack>
    </CustomAppHeader>
  );

  const locationTypeTable = (): JSX.Element => (
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
        handlePageChange={handlePageChange}
        pageNumber={page}
        setPage={setPage}
        handlePerPageData={handlePerPageData}
        perPageData={limit}
        rowsPerPage={limit}
        isExportCSV={false}
      />
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          height: "100%",
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
        onChangeHandler={(e: ChangeEvent<HTMLInputElement>) =>
          setFormField({
            ...formField,
            type: { value: e.target.value, error: "" },
          })
        }
        handleSave={addLocationTypeHandler}
        isLoading={isLoading}
        classes={{}}
        edit={edit}
      />
    </>
  );
};

export default LocationType;
