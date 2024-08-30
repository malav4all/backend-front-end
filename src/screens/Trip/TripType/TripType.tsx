import {
  Box,
  InputAdornment,
  Stack,
  Tooltip,
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
import TripTypeStyles from "./TripType.styles";
import {
  addTripType,
  fetchTripTypeTableHandler,
  searchTableHandler,
  updateTripType,
} from "./service/TripType.service";
import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
  validateTabValue,
} from "../../../helpers/methods";
import {
  tripTypeInsertField,
  tripTypeTableHeader,
  tripTypeValidation,
} from "./TripTypeHelpers";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import AddTripType from "./component/AddTripType";
import { useLocation } from "react-router-dom";
import { store } from "../../../utils/store";
import { PiPencilSimpleBold } from "react-icons/pi";
import { headerColor } from "../../../utils/styles";

const TripType = () => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };
  const classes = TripTypeStyles;
  const theme = useTheme();
  const location = useLocation();
  const [tripTypeFormData, setTripTypeFormData] = useState(
    tripTypeInsertField()
  );
  const [modulesData, setModuleData] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [perPageData, setPerPageData] = useState(10);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any>();
  const [edit, setEdit] = useState(false);
  const [addTripTypeDialogHandler, setAddTripTypeDialogHandler] =
    useState(false);

  useEffect(() => {
    setPageNumber(1);
  }, [searchText, perPageData]);

  useEffect(() => {
    if (searchText) {
      searchDataHandler();
    } else {
      fetchTableTripType();
    }
  }, [pageNumber, perPageData, searchText]);

  const handleModuleChange = (event: any) => {
    setTripTypeFormData({
      ...tripTypeFormData,
      code: {
        value: event.target.value,
        error: "",
      },
    });
  };

  const tableRender = (res: any) => {
    const finalData = res?.map((item: any) => {
      return {
        accountId: item.accountId,
        name: item.tripName,
        minBatteryPercentage: item.minBatteryPercentage,
        tripRate: item.tripRate,
        gstPercentage: item.gstPercentage,
        createdBy: item.createdBy,
        action: (
          <Tooltip title="Edit" onClick={() => handleEditClick(item)}>
            <PiPencilSimpleBold
              style={{
                margin: "0px 8px -7px 0px",
                cursor: "pointer",
                color: headerColor,
                fontSize: "20px",
              }}
            />
          </Tooltip>
        ),
      };
    });
    return finalData;
  };

  const handleEditClick = (data: any): void => {
    setAddTripTypeDialogHandler(true);
    setEdit(true);
    setTripTypeFormData(tripTypeInsertField(data));
  };

  const fetchTableTripType = async () => {
    try {
      setIsLoading(true);
      const res = await fetchTripTypeTableHandler({
        input: {
          accountId: store.getState().auth.tenantId,
          page: pageNumber,
          limit: perPageData,
        },
      });
      const final = tableRender(res?.tripTypeList?.data);
      setTableData(final);
      setCount(res?.tripTypeList?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const searchDataHandler = async () => {
    try {
      setIsLoading(true);
      const res = await searchTableHandler({
        input: {
          accountId: store.getState().auth.tenantId,
          search: searchText,
          page: pageNumber,
          limit: perPageData,
        },
      });
      const final = tableRender(res?.searchTripType?.data);
      setTableData(final);
      setCount(res?.searchTripType?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const addTripTypeHandler = async () => {
    try {
      const tripRateValue = Number(tripTypeFormData.tripRate.value);
      const gstAmount = (tripRateValue * 18) / 100;
      const totalTripRateWithGST = tripRateValue + gstAmount;

      const payload: any = {
        accountId: tripTypeFormData?.accountId?.value,
        tripName: tripTypeFormData.name.value,
        minBatteryPercentage: Number(
          tripTypeFormData.minBatteryPercentage.value
        ),
        tripRate: totalTripRateWithGST,
        gstPercentage: tripTypeFormData.gstPercentage.value,
        createdBy: store.getState().auth.userName,
      };

      setIsLoading(true);
      if (edit) {
        const res = await updateTripType({
          input: {
            ...payload,
            _id: tripTypeFormData?.id?.value,
            updatedBy: store.getState().auth.userName,
          },
        });
        openSuccessNotification(res?.updateTripType?.message);
      } else {
        const res = await addTripType({
          input: { ...payload },
        });
        openSuccessNotification(res.createTripType.message);
      }

      setTripTypeFormData(tripTypeInsertField());
      await fetchTableTripType();
      setEdit(false);
      setAddTripTypeDialogHandler(false);

      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageNumber(newPage);
  };

  const onChangeHandler = (event: React.ChangeEvent<any>) => {
    setTripTypeFormData({
      ...tripTypeFormData,
      [event.target.name]: {
        value: event.target.value,
        error: "",
      },
    });
  };

  const handleFileChange = (e: any) => {
    const fileList = e.target.files[0];
    setFile(fileList);
  };

  const getAddTripTypeBtn = () => {
    return (
      <CustomButton
        id="profile_submit_button"
        label="Add Trip Type"
        customClasses={{ width: "150px" }}
        onClick={() => setAddTripTypeDialogHandler(true)}
      />
    );
  };

  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      setSearchText(SearchEvent.target.value.trim());
      setPerPageData(10);
    } else {
      setSearchText("");
    }
  };

  const searchBarRole = () => {
    return (
      <CustomInput
        id="role_mgmt_search_field"
        placeHolder="Search TripType Name"
        name="Role"
        onChange={debounceEventHandler(handleSearchOnChange, 700)}
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

  const SettingsHeader = () => {
    return (
      <CustomAppHeader
        className={{
          ...classes.headerBackgroundColor,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Stack
          px={3}
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
            Trip Type
          </Typography>

          <Stack
            direction={{ sm: "row", xs: "column" }}
            alignItems={{ sm: "center" }}
            spacing={1}
          >
            {searchBarRole()}
            {getAddTripTypeBtn()}
          </Stack>
        </Stack>
      </CustomAppHeader>
    );
  };

  const handlePerPageData = (event: any) => {
    setPageNumber(1);
    setPerPageData(event.target.value);
  };

  const rolesTableRender = () => {
    return (
      <>
        <Box
          sx={{
            minWidth: "300px",
            overflow: "auto",
            padding: "30px",
          }}
        >
          <CustomTable
            headers={tripTypeTableHeader}
            rows={tableData}
            paginationCount={count}
            handlePageChange={handleChangePage}
            pageNumber={pageNumber}
            handlePerPageData={handlePerPageData}
            rowsPerPage={perPageData}
            perPageData={perPageData}
            setPage={setPageNumber}
          />
        </Box>
      </>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        height: "100%",
        paddingTop: "2.5rem",
      }}
    >
      {SettingsHeader()}
      {rolesTableRender()}
      <AddTripType
        open={addTripTypeDialogHandler}
        handleClose={() => setAddTripTypeDialogHandler(false)}
        tripTypeFormData={tripTypeFormData}
        modulesData={modulesData}
        file={file}
        onChangeHandler={onChangeHandler}
        handleModuleChange={handleModuleChange}
        checkExitsRoleHandler={() => {}}
        handleFileChange={handleFileChange}
        handleSave={addTripTypeHandler}
        isLoading={isLoading}
        MenuProps={MenuProps}
        isTruthy={isTruthy}
        classes={classes}
        setTripTypeFormData={setTripTypeFormData}
        edit={edit}
      />
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default TripType;
