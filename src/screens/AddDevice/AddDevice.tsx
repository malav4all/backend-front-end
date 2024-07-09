import {
  Box,
  Grid,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
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
  updateDevice,
} from "./service/add-device.service";
import { store } from "../../utils/store";
import { addDevicetable } from "./AddDeviceValidation";
import { PiPencilSimpleBold } from "react-icons/pi";
import ExportCSV from "../../global/components/ExportCSV";
import UploadAssetGroup from "./Component/UploadAsset/UploadAssetModal";

const AddDevice = () => {
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
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [searchLocation, setSearchLocation] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchDeviceListData();
  }, [page, limit]);

  const handleSearchOnChange = (
    SearchEvent: ChangeEvent<HTMLInputElement>
  ) => {};

  const addDeviceRecord = async () => {
    try {
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
      setDialogOpen(false); // Close the dialog after successful addition
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
      const tableData = res?.fetchDeviceList?.data.map((item: any) => {
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

      setData(tableData);
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
          setPage={searchLocation ? setSearchPageNumber : setPage}
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
          sx={{
            ...boldFont,
            fontSize: getRelativeFontSize(10),
            color: primaryHeadingColor,
            [theme.breakpoints.down("md")]: {
              marginTop: theme.spacing(3),
            },
          }}
        >
          Add Device
        </Typography>
      </Box>
    );
  };

  return (
    <>
      <CustomAppHeader
        className={{
          backgroundColor: headerColor,
          padding: "50px 20px 50px 18px",
        }}
      >
        <Grid container xs={12} md={12} lg={12} xl={12} alignItems="center">
          <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
            {getHeader()}
          </Grid>
        </Grid>
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
        />
      </Box>
      {uploadAssetGroupModal()}
    </>
  );
};

export default AddDevice;