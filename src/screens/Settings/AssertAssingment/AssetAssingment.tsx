import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Chip,
  Grid,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import AssetAssingmentStyles from "./AssetAssingment.styles";
import CustomButton from "../../../global/components/CustomButton/CustomButton";
import { AssetAssingmentData, RowData } from "../../../models/interfaces";
import SearchIcon from "@mui/icons-material/Search";
import { PiPencilSimpleBold } from "react-icons/pi";
import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
} from "../../../helpers/methods";
import {
  CustomAppHeader,
  CustomInput,
  CustomTable,
} from "../../../global/components";
import { assetAssingmentTableHeader } from "./AssetAssingmentTypeAndValidation";
import strings from "../../../global/constants/StringConstants";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import notifiers from "../../../global/constants/NotificationConstants";
import { useTitle } from "../../../utils/UseTitle";
import UploadAssetGroup from "./components/UploadAsset/UploadAssetModal";
import {
  getRelativeFontSize,
  primaryHeadingColor,
  boldFont,
  headerColor,
} from "../../../utils/styles";
import AddAssetAssingment from "./components/AddAsset/AddAssertAssingment";
import {
  fetchAssetAssingmentDataHandler,
  searchAssetAssingment,
} from "./service/AssetAssingment.service";
import ExportCSV from "../../../global/components/ExportCSV";

const AssetAssingment = () => {
  useTitle(strings.AssetAssingmentTitle);
  const theme = useTheme();
  const classes = AssetAssingmentStyles;
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [addAssetAssingmentDialogHandler, setAddAssetAssingmentDialogHandler] =
    useState(false);
  const [uploadAsset, setUploadAsset] = useState(false);
  const [assetAssingmentDataSource, setAssetAssingmentDataSource] = useState<
    AssetAssingmentData[]
  >([]);
  const [searchCampaigner, setSearchCampaigner] = useState<string>("");
  const [roles, setRoles] = useState([]);
  const [count, setCount] = useState(0);

  const [selectedAssetAssingmentRowData, setSelectedAssetAssingmentRowData] =
    useState<any>({});

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [perPageData, setPerPageData] = useState(10);
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
  const [activeCampaigner, setActiveCampaigner] = useState<any>([]);
  // const [changePasswordModal, setChangePasswordModal] = useState(false);

  useEffect(() => {
    if (searchCampaigner) {
      getSearchData();
    } else {
      getAssetAssingmentDetailTable();
    }
  }, [searchCampaigner, pageNumber, perPageData, searchPageNumber]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageNumber(newPage);
  };
  const handlePerPageData = (event: any) => {
    setSearchPageNumber(1);
    setPerPageData(event.target.value);
  };

  const tableDataShowHandler = (assetAssingmentData: any) => {
    const source = assetAssingmentData?.map((assetAssingmentData: any) => {
      return {
        imei: assetAssingmentData?.imei,
        labelName: assetAssingmentData?.labelName,
        journey: assetAssingmentData?.journey?.journeyName,
        boxSet: assetAssingmentData?.boxSet,
        createdBy: assetAssingmentData?.createdBy,
        action: (
          <>
            <Tooltip
              title="Edit"
              onClick={() => {
                editAssetAssingment(assetAssingmentData);
              }}
            >
              <PiPencilSimpleBold
                style={{
                  margin: "0px 8px -7px 0px",
                  cursor: "pointer",
                  color: theme.palette.primary.main,
                  fontSize: "17px",
                }}
              />
            </Tooltip>
          </>
        ),
      };
    });
    setAssetAssingmentDataSource([...source]);
  };

  const editAssetAssingment = React.useCallback(
    (rowdata: any) => {
      setAddAssetAssingmentDialogHandler(true);
      setSelectedAssetAssingmentRowData(rowdata);
      setEdit(true);
    },
    [edit]
  );

  const getAssetAssingmentDetailTable = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAssetAssingmentDataHandler({
        input: {
          page: pageNumber,
          limit: perPageData,
        },
      });
      tableDataShowHandler(res?.fetchAssertAssingmentModule?.data);
      setCount(res?.fetchAssertAssingmentModule?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
      setIsLoading(false);
    }
  };

  const getSearchData = async () => {
    try {
      setIsLoading(true);
      const res = await searchAssetAssingment({
        input: {
          search: searchCampaigner,
          page: 1,
          limit: perPageData,
        },
      });
      tableDataShowHandler(res?.searchAssertAssingmentModule?.data);
      setCount(res?.searchAssertAssingmentModule?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      setSearchCampaigner(SearchEvent.target.value.trim().toLowerCase());
      setPerPageData(10);
    } else {
      setSearchCampaigner("");
    }
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search Asset"
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

  const addAssetAssingmentButton = () => {
    return (
      <CustomButton
        id="assetAssingment_add_button"
        label={"Add Asset"}
        onClick={() => setAddAssetAssingmentDialogHandler(true)}
      />
    );
  };

  const addAssetAssingmentDialogBox = () => {
    return (
      <AddAssetAssingment
        openAddAssetAssingmentDialog={addAssetAssingmentDialogHandler}
        handleCloseAddAssetAssingmentDialog={
          closeAddAssetAssingmentDialogHandler
        }
        managerMail={activeCampaigner}
        roles={roles}
        tableData={getAssetAssingmentDetailTable}
        selectedAssetAssingmentRowData={selectedAssetAssingmentRowData}
        isLoading={isLoading}
        edit={edit}
        setEdit={setEdit}
      />
    );
  };

  const closeAddAssetAssingmentDialogHandler = () => {
    setAddAssetAssingmentDialogHandler(false);
    setSelectedAssetAssingmentRowData(null);
  };

  const uploadAssetModalClose = () => {
    setUploadAsset(false);
  };

  const handleSearchChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setSearchPageNumber(newPage);
  };
  const handleDownload = async () => {};

  const campaignerTable = () => {
    return (
      <Box id="assetAssingment_display_table">
        <CustomTable
          headers={assetAssingmentTableHeader}
          rows={assetAssingmentDataSource}
          paginationCount={count}
          handlePageChange={
            searchCampaigner ? handleSearchChangePage : handleChangePage
          }
          pageNumber={pageNumber}
          setPage={setPageNumber}
          isLoading={isLoading}
          handlePerPageData={handlePerPageData}
          perPageData={perPageData}
          rowsPerPage={perPageData}
          isExportCSV={false}
          onClickExportCSV={handleDownload}
        />
      </Box>
    );
  };

  const uploadAssetGroupModal = () => {
    return (
      <UploadAssetGroup
        showDialog={uploadAsset}
        handleDialogClose={uploadAssetModalClose}
        getAssetAssingmentDetailTable={getAssetAssingmentDetailTable}
      />
    );
  };

  const getHeader = () => {
    return (
      <Box>
        <Typography sx={{...classes.mainCardHeading,
          color: "white",
        }}>Asset Assignment</Typography>
      </Box>
    );
  };
  const getAssetAssingment = () => (
    <Box>
      <CustomAppHeader
        className={{
          backgroundColor: headerColor,
          color: theme.palette.text.primary,
          padding: "10px 20px 15px 18px",
        }}
      >
        <Stack
          px={4}
          pt={4}
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
        </Stack>
      </CustomAppHeader>

      <Stack
        px={4}
        pt={2}
        direction={{ lg: "row", xs: "column" }}
        justifyContent="flex-end"
        alignItems={{ lg: "" }}
        sx={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Stack
          direction={{ sm: "row", xs: "column" }}
          alignItems={{ sm: "center" }}
          spacing={1}
        >
          {getSearchBar()}
          {addAssetAssingmentButton()}
          <CustomButton
            id="groups_download_template_button"
            label="Download&nbsp;Template"
            onClick={ExportCSV(["imei,labelName,boxSet"], "asset_assignment")}
            customClasses={{
              width: "170px",
            }}
          />
          <CustomButton
            id="groups_download_template_button"
            label="Upload Asset"
            onClick={() => {
              setUploadAsset(true);
            }}
          />
        </Stack>
      </Stack>
      <Box
        sx={{
          minWidth: "300px",
          overflow: "auto",
          padding: "30px",
          backgroundColor: theme.palette.background.paper,
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
        }}
      >
        {campaignerTable()}
        {addAssetAssingmentDialogBox()}
        {uploadAssetGroupModal()}
      </Box>
      <CustomLoader isLoading={isLoading} />
    </Box>
  );

  return getAssetAssingment();
};

export default AssetAssingment;
