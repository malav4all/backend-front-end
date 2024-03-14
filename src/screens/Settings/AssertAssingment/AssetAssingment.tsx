import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Chip,
  Grid,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import AssetAssingmentStyles from "./AssetAssingment.styles";
import CustomButton from "../../../global/components/CustomButton/CustomButton";
import AddUser from "./components/AddAsset/AddAssertAssingment";
import { AssetAssingmentData, RowData } from "../../../models/interfaces";
import SearchIcon from "@mui/icons-material/Search";
import {
  debounceEventHandler,
  getFormattedStatsCount,
  isTruthy,
  openErrorNotification,
} from "../../../helpers/methods";
import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from "@mui/icons-material/LockReset";
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

import {
  getRelativeFontSize,
  primaryHeadingColor,
  boldFont,
} from "../../../utils/styles";

import AddAssetAssingment from "./components/AddAsset/AddAssertAssingment";
import {
  fetchAssetAssingmentDataHandler,
  searchAssetAssingment,
} from "./service/AssetAssingment.service";
import UpdateAssetAssingment from "./components/UpdateAsset/UpdateAssetAssingment";

const AssetAssingment = () => {
  useTitle(strings.AssetAssingmentTitle);
  const classes = AssetAssingmentStyles;
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [addAssetAssingmentDialogHandler, setAddAssetAssingmentDialogHandler] =
    useState(false);
  const [changePasswordDialogHandler, setChangePasswordDialogHandler] =
    useState(false);
  const [
    updateAssetAssingmentDialogHandler,
    setUpdateAssetAssingmentDialogHandler,
  ] = useState(false);
  const [assetAssingmentDataSource, setAssetAssingmentDataSource] = useState<
    AssetAssingmentData[]
  >([]);
  const [searchCampaigner, setSearchCampaigner] = useState<string>("");
  const [roles, setRoles] = useState([]);
  const [count, setCount] = useState(1);
  const [selectedRowData, setSelectedRowData] = useState<RowData>({
    emailId: "",
    assignBy: "",
    allowedEmailCount: "",
    title: "",
  });
  const [selectedAssetAssingmentRowData, setSelectedAssetAssingmentRowData] =
    useState<any>({});
  // const [selectedEmailData, setSelectedEmailData] = useState<any>({
  //   email: "",
  // });

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [perPageData, setPerPageData] = useState(10);
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
  const [activeCampaigner, setActiveCampaigner] = useState<any>([]);
  // const [changePasswordModal, setChangePasswordModal] = useState(false);

  useEffect(() => {
    if (searchCampaigner === "") {
      setPageNumber(1);
      setSearchPageNumber(1);
      setPerPageData(10);
    }
  }, [searchCampaigner, searchPageNumber]);

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
    setPageNumber(1);
    setSearchPageNumber(1);
    setPerPageData(event.target.value);
  };

  const tableDataShowHandler = (assetAssingmentData: any) => {
    const source = assetAssingmentData?.map((assetAssingmentData: any) => {
      return {
        imei: assetAssingmentData?.imei,
        labelName: assetAssingmentData?.labelName,
        // journey: assetAssingmentData?.journey,
        boxSet: assetAssingmentData?.boxSet,
        createdBy: assetAssingmentData?.createdBy,
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
          page: pageNumber,
          limit: perPageData,
        },
      });
      tableDataShowHandler(res?.searchAssetAssingment?.data);
      setCount(res?.searchAssetAssingment?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      setSearchCampaigner(SearchEvent.target.value.replace(/\s/g, ""));
      setPageNumber(1);
      setPerPageData(10);
    } else {
      setSearchCampaigner("");
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

  const addAssetAssingmentButton = () => {
    return (
      <CustomButton
        id="assetAssingment_add_button"
        label={"Add Asset"}
        onClick={() => setAddAssetAssingmentDialogHandler(true)}
        customClasses={{
          width: "150px",
        }}
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

  // const updateAssetAssingmentDialogBox = () => {
  //   return (
  //     <UpdateAssetAssingment
  //       updateAssetAssingmentDialogOpen={updateAssetAssingmentDialogHandler}
  //       handleUpdateDialogClose={updateDialogCloseHandler}
  //       selectedRowData={selectedRowData}
  //       managerMail={activeCampaigner}
  //       tableData={getAssetAssingmentDetailTable}
  //       getSearchData={getSearchData}
  //       searchCampaigner={searchCampaigner}
  //     />
  //   );
  // };

  const updateDialogCloseHandler = () => {
    setUpdateAssetAssingmentDialogHandler(false);
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
      <Box id="assetAssingment_display_table" sx={classes.campaignerTable}>
        <CustomTable
          headers={assetAssingmentTableHeader}
          rows={assetAssingmentDataSource}
          paginationCount={count}
          // handleRowClick={updateAssetAssingmentDetails}
          handlePageChange={
            searchCampaigner ? handleSearchChangePage : handleChangePage
          }
          pageNumber={searchCampaigner ? searchPageNumber : pageNumber}
          setPage={searchCampaigner ? setSearchPageNumber : setPageNumber}
          isLoading={isLoading}
          handlePerPageData={handlePerPageData}
          perPageData={perPageData}
          rowsPerPage={perPageData}
          isExportCSV={searchCampaigner ? false : true}
          onClickExportCSV={handleDownload}
        />
      </Box>
    );
  };

  const getAssetAssingment = () => (
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
          AssetAssingment
        </Typography>

        <Stack
          direction={{ sm: "row", xs: "column" }}
          alignItems={{ sm: "center" }}
          spacing={1}
        >
          {getSearchBar()}
          {addAssetAssingmentButton()}
        </Stack>
      </Stack>

      <Box
        sx={{
          minWidth: "300px",
          overflow: "auto",
          padding: "30px",
        }}
      >
        {campaignerTable()}
        {addAssetAssingmentDialogBox()}
        {/* {updateAssetAssingmentDialogBox()} */}
      </Box>
      <CustomLoader isLoading={isLoading} />
    </Box>
  );

  return getAssetAssingment();
};

export default AssetAssingment;
