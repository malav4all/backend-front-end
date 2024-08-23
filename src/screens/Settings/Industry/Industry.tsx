import React, { ChangeEvent, useEffect, useState, useCallback } from "react";
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
import IndustryStyles from "./Industry.styles";
import {
  addIndustry,
  checkExitsIndustry,
  fetchIndustryTableHandler,
  fetchTableHandler,
  searchTableHandler,
  updateIndustry,
} from "./service/Industry.service";
import {
  debounceEventHandler,
  openErrorNotification,
  openSuccessNotification,
} from "../../../helpers/methods";
import {
  industryInsertField,
  industryTableHeader,
  industryValidation,
} from "./IndustryHelpers";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import AddIndustry from "./component/AddIndustry";
import { PiPencilSimpleBold } from "react-icons/pi";
import { headerColor } from "../../../utils/styles";

interface IndustryFormData {
  name: { value: string; error: string };
  code: { value: string; error: string };
  description: { value: string; error: string };
  id?: { value: string; error: string };
}

interface TableData {
  name: string;
  code: string;
  description: string;
  action: JSX.Element;
}

interface ModuleData {
  name: string;
  code: string;
}

const Industry: React.FC = () => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };
  const classes = IndustryStyles;
  const theme = useTheme();

  const [industryFormData, setIndustryFormData] = useState<IndustryFormData>(
    industryInsertField()
  );
  const [moduleData, setModuleData] = useState<ModuleData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalItemCount, setTotalItemCount] = useState<number>(0);
  const [industryTableData, setIndustryTableData] = useState<TableData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isAddIndustryDialogOpen, setIsAddIndustryDialogOpen] =
    useState<boolean>(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, rowsPerPage]);

  useEffect(() => {
    searchQuery ? handleSearchIndustry() : handleFetchIndustryTable();
  }, [currentPage, rowsPerPage, searchQuery]);

  useEffect(() => {
    handleFetchModuleData();
  }, []);

  const handleModuleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIndustryFormData((prevState) => ({
      ...prevState,
      code: { value: event.target.value, error: "" },
    }));
  };

  const handleEditIndustry = useCallback((industryData: IndustryFormData) => {
    setIsAddIndustryDialogOpen(true);
    setIndustryFormData(industryInsertField(industryData));
    setIsEditMode(true);
  }, []);

  const handleFetchIndustryTable = async () => {
    try {
      setIsLoading(true);
      const res = await fetchIndustryTableHandler({
        input: { page: currentPage, limit: rowsPerPage },
      });

      if (res?.industryListAll) {
        const formattedTableData: TableData[] = res.industryListAll.data.map(
          (item: any) => ({
            id: item._id,
            name: item.name,
            code: item.code.join(", "),
            description: item.description,
            action: (
              <Tooltip title="Edit" onClick={() => handleEditIndustry(item)}>
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
          })
        );
        setIndustryTableData(formattedTableData);
        setTotalItemCount(res.industryListAll.paginatorInfo?.count || 0);
      }
    } catch (error: any) {
      openErrorNotification(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchIndustry = async () => {
    try {
      setIsLoading(true);
      const res = await searchTableHandler({
        input: {
          search: searchQuery,
          page: currentPage,
          limit: rowsPerPage,
        },
      });
      setIndustryTableData(res?.searchIndustry?.data || []);
      setTotalItemCount(res?.searchIndustry?.paginatorInfo?.count || 0);
    } catch (error: any) {
      openErrorNotification(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckExistingIndustry = async () => {
    try {
      const res = await checkExitsIndustry({
        input: { name: industryFormData.name.value },
      });
      if (res?.checkIndustryExistsRecord?.success === 1) {
        openErrorNotification(res.checkIndustryExistsRecord.message);
      }
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const handleSaveIndustry = async () => {
    if (!validateIndustryFormData()) return;

    const payload = {
      name: industryFormData.name.value,
      code: industryFormData.code.value,
      description: industryFormData.description.value,
    };

    const action = isEditMode
      ? updateIndustry({
          input: { _id: industryFormData.id?.value!, ...payload },
        })
      : addIndustry({ input: payload });

    try {
      setIsLoading(true);
      const res = await action;

      const successMessage = isEditMode
        ? res?.updateIndustry?.message
        : res?.createIndustry?.message;

      openSuccessNotification(successMessage);
      resetForm();
      setIsAddIndustryDialogOpen(false);
      await handleFetchIndustryTable();
    } catch (error: any) {
      openErrorNotification(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const validateIndustryFormData = (): boolean => {
    const { isValid, errors } = industryValidation(industryFormData);
    setIndustryFormData(errors);
    return isValid;
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const handleFetchModuleData = async () => {
    try {
      setIsLoading(true);
      const res = await fetchTableHandler({ input: { page: -1, limit: 0 } });
      setModuleData(res?.customerModuleListAll?.data || []);
    } catch (error: any) {
      openErrorNotification(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIndustryFormData((prevState) => ({
      ...prevState,
      [event.target.name]: {
        value: event.target.value,
        error: "",
      },
    }));
  };

  const handleSearchInputChange = (
    SearchEvent: ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(SearchEvent.target.value.trim());
    setRowsPerPage(10);
  };

  const resetForm = () => {
    setIndustryFormData(industryInsertField());
    setIsEditMode(false);
  };

  const renderSearchBar = () => (
    <CustomInput
      id="industry_search_field"
      placeHolder="Search Industry Name"
      name="search"
      onChange={debounceEventHandler(handleSearchInputChange, 2000)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );

  const renderAddIndustryButton = () => (
    <CustomButton
      id="add_industry_button"
      label="Add Industry"
      customClasses={{ width: "150px" }}
      onClick={() => setIsAddIndustryDialogOpen(true)}
    />
  );

  const renderIndustryTable = () => (
    <>
      <Stack
        direction="row"
        justifyContent="end"
        alignItems="center"
        spacing={1}
        pt={2}
        px={3}
      >
        {renderSearchBar()}
        {renderAddIndustryButton()}
      </Stack>
      <Box sx={{ minWidth: "300px", overflow: "auto", padding: "30px" }}>
        <CustomTable
          headers={industryTableHeader}
          rows={industryTableData}
          paginationCount={totalItemCount}
          handlePageChange={handlePageChange}
          pageNumber={currentPage}
          handlePerPageData={(e: any) => setRowsPerPage(Number(e.target.value))}
          rowsPerPage={rowsPerPage}
          perPageData={rowsPerPage}
          setPage={setCurrentPage}
        />
      </Box>
    </>
  );

  return (
    <Box
      sx={{ backgroundColor: theme.palette.background.paper, height: "100%" }}
    >
      <CustomAppHeader
        className={{
          ...classes.headerBackgroundColor,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box ml={1}>
          <Typography style={classes.settingsTitle}>
            Settings / Industry
          </Typography>
        </Box>
      </CustomAppHeader>
      {renderIndustryTable()}
      <AddIndustry
        open={isAddIndustryDialogOpen}
        handleClose={() => setIsAddIndustryDialogOpen(false)}
        industryFormData={industryFormData}
        modulesData={moduleData}
        onChangeHandler={handleInputChange}
        handleModuleChange={handleModuleChange}
        checkExitsRoleHandler={handleCheckExistingIndustry}
        handleSave={handleSaveIndustry}
        isLoading={isLoading}
        MenuProps={menuProps}
        classes={classes}
        edit={isEditMode}
      />
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default Industry;
