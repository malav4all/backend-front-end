import {
  Box,
  Grid,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  boldFont,
  getRelativeFontSize,
  headerColor,
  primaryHeadingColor,
  regularFont,
  theme,
} from "../../utils/styles";
import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import {
  CustomAppHeader,
  CustomButton,
  CustomInput,
  CustomTable,
} from "../../global/components";
import {
  debounceEventHandler,
  openErrorNotification,
  openSuccessNotification,
} from "../../helpers/methods";
import strings from "../../global/constants/StringConstants";
import SearchIcon from "@mui/icons-material/Search";
import AddDeviceModal from "./Component/AddDeviceModla";
import {
  addDeviceList,
  fetchDeviceList,
  searchDeviceList,
  updateDevice,
} from "./service/add-device.service";
import { store } from "../../utils/store";
import { addDevicetable } from "./AddDeviceValidation";
import { PiPencilSimpleBold } from "react-icons/pi";
import ExportCSV from "../../global/components/ExportCSV";
import UploadAssetGroup from "./Component/UploadAsset/UploadAssetModal";
import DeviceOnboardingStyle from "../Inventory/DeviceOnboarding/DeviceOnboarding.styles";

const AddDevice = () => {
  const classes = DeviceOnboardingStyle;
  const theme = useTheme();
  const [formField, setFormField] = useState<any>({
    imei: {
      value: "",
      error: "",
    },
    deviceModelCode: {
      value: "",
      error: "",
    },
  });
  const [page, setPage] = useState(1);
  const [uploadAsset, setUploadAsset] = useState(false);
  const [edit, setEdit] = useState(false);
  const [limit, setLimit] = useState<any>(10);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [searchLocation, setSearchLocation] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [searchLocation, limit]);

  useEffect(() => {
    if (searchLocation) {
      handleSearchData();
    } else {
      fetchDeviceListData();
    }
  }, [page, limit, searchLocation]);

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setSearchLocation(event.target.value.trim());
      setLimit(10);
    } else {
      fetchDeviceListData();
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors: any = {};

    if (!formField.imei.value.trim()) {
      errors.imei = "IMEI is required";
      isValid = false;
    }

    if (!formField.deviceModelCode.value.trim()) {
      errors.deviceModelCode = "Device Model Code is required";
      isValid = false;
    }

    setFormField((prevState: any) => ({
      ...prevState,
      imei: {
        ...prevState.imei,
        error: errors.imei || "",
      },
      deviceModelCode: {
        ...prevState.deviceModelCode,
        error: errors.deviceModelCode || "",
      },
    }));

    return isValid;
  };

  const tableDataRender = (res: any) => {
    const tableData = res?.map((item: any) => {
      return {
        deviceId: item.deviceId,
        imei: item.imei,
        deviceModelName: item.deviceModelName,
        deviceModelType: item.deviceModelType,
        createdBy: item.createdBy,
        action: (
          <>
            <Tooltip
              title="Edit"
              onClick={() => {
                editDevice(item);
              }}
            >
              <PiPencilSimpleBold
                style={{
                  margin: "0px 8px -7px 0px",
                  cursor: "pointer",
                  color: headerColor,
                  fontSize: "20px",
                }}
              />
            </Tooltip>
          </>
        ),
      };
    });
    return tableData;
  };

  const handleSearchData = async () => {
    try {
      setIsLoading(true);
      const res = await searchDeviceList({
        input: {
          search: searchLocation,
          page,
          limit,
        },
      });
      const responseTable = tableDataRender(res?.searchDeviceList?.data);
      setData(responseTable);
      setCount(res?.searchDeviceList?.paginatorInfo?.count || 0);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const addDeviceRecord = async () => {
    try {
      if (validateForm()) {
        if (edit) {
          const res = await updateDevice({
            input: {
              _id: formField?.rowId,
              imei: formField?.imei?.value,
              deviceModelCode: formField?.deviceModelCode?.value,
              updatedBy: store?.getState()?.auth.userName,
            },
          });
          openSuccessNotification(res?.updateDeviceList?.message);
        } else {
          const res = await addDeviceList({
            input: {
              imei: formField?.imei?.value,
              deviceModelCode: formField?.deviceModelCode?.value,
              createdBy: store?.getState()?.auth.userName,
            },
          });
          openSuccessNotification(res?.addDeviceList?.message);
        }

        await fetchDeviceListData();
        setFormField({
          imei: {
            value: "",
            error: "",
          },
          deviceModelCode: {
            value: "",
            error: "",
          },
        });
        setEdit(false);
        setDialogOpen(false); // Close the dialog after successful addition
      }
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const editDevice = React.useCallback(
    (rowdata: any) => {
      setDialogOpen(true);
      setFormField({
        rowId: rowdata._id,
        imei: {
          value: rowdata.imei,
          error: "",
        },
        deviceModelCode: {
          value: rowdata.deviceModelCode,
          error: "",
        },
      });
      setEdit(true);
    },
    [edit]
  );

  const fetchDeviceListData = async () => {
    try {
      const res = await fetchDeviceList({
        input: {
          page,
          limit,
        },
      });
      const responseTable = tableDataRender(res?.fetchDeviceList?.data);
      setData(responseTable);
      setCount(res?.fetchDeviceList?.paginatorInfo?.count);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search Location"
        id="assetAssingment_search_field"
        onChange={debounceEventHandler(
          handleSearchInputChange,
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

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handlePerPageData = (event: any) => {
    setPage(1);
    setSearchPageNumber(1);
    setLimit(event.target.value);
  };

  const addDeviceTable = () => {
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
          headers={addDevicetable}
          rows={data}
          paginationCount={count}
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

  const uploadAssetGroupModal = () => {
    return (
      <UploadAssetGroup
        showDialog={uploadAsset}
        handleDialogClose={() => setUploadAsset(false)}
        getAssetAssingmentDetailTable={() => {}}
      />
    );
  };

  const AddLocationType = () => {
    return (
      <>
        <CustomButton
          id="add_location_type_button"
          label="Add Device"
          onClick={() => setDialogOpen(true)}
        />

        <CustomButton
          id="groups_download_template_button"
          label="Download&nbsp;Template"
          onClick={ExportCSV(["imei,deviceModelCode"], "addDevice")}
          customClasses={{
            width: "170px",
          }}
        />

        <CustomButton
          id="groups_download_template_button"
          label="Upload Add Bulk Device"
          onClick={() => {
            setUploadAsset(true);
          }}
        />
      </>
    );
  };

  const getHeader = () => {
    return (
      <Box>
        <Typography
          sx={{ ...classes.mainCardHeading, color: theme.palette.text.primary }}
        >
          Add Device
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        width: "100%",
        height: "100vh",
        margin: "auto",
      }}
    >
      <CustomAppHeader
        className={{
          ...classes.headerBackgroundColor,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Stack
          px={4}
          direction={{ lg: "row", xs: "column" }}
          justifyContent="space-between"
          alignItems={{ lg: "center" }}
        >
          <Typography
            sx={{
              fontSize: getRelativeFontSize(6),
              ...boldFont,
              color: theme.palette.text.primary,
            }}
          >
            {getHeader()}
          </Typography>

          <Stack
            direction={{ sm: "row", xs: "column" }}
            alignItems={{ sm: "center" }}
            spacing={1}
          >
            {getSearchBar()}
          </Stack>
        </Stack>
      </CustomAppHeader>

      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          height: "100%",
        }}
      >
        <Stack
          px={4}
          pt={2}
          direction={{ lg: "row", xs: "column" }}
          justifyContent="space-between"
          alignItems={{ lg: "center" }}
        >
          <Typography
            sx={{
              ...regularFont,
              color: theme.palette.text.primary,
            }}
          ></Typography>

          <Stack
            direction={{ sm: "row", xs: "column" }}
            alignItems={{ sm: "center" }}
            spacing={1}
          >
            {getSearchBar()}
            {AddLocationType()}
          </Stack>
        </Stack>

        <Box
          sx={{
            minWidth: "300px",
            overflow: "auto",
            padding: "30px",
          }}
        >
          {addDeviceTable()}
        </Box>

        <AddDeviceModal
          open={dialogOpen}
          handleClose={() => setDialogOpen(false)}
          formField={formField}
          onChangeHandler={(e: any) => {
            setFormField({
              ...formField,
              [e?.target?.name]: {
                ...formField[e?.target?.name],
                value: e.target.value,
                error: "",
              },
            });
          }}
          handleSave={addDeviceRecord}
          isLoading={isLoading}
          edit={edit}
        />
      </Box>
      {uploadAssetGroupModal()}
    </Box>
  );
};

export default AddDevice;
