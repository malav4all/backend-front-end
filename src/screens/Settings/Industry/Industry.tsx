import {
  Box,
  Checkbox,
  Container,
  FormHelperText,
  Grid,
  InputAdornment,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
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
} from "./service/Industry.service";
import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../helpers/methods";
import {
  industryInsertField,
  industryTableHeader,
  industryValidation,
} from "./IndustryHelpers";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import {
  primaryHeadingColor,
  regularFont,
  getRelativeFontSize,
} from "../../../utils/styles";
import AddIndustry from "./component/AddIndustry";

const Industry = () => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };
  const classes = IndustryStyles;
  const theme = useTheme();
  const [industryFormData, setIndustryFormData] = useState(
    industryInsertField()
  );
  const [modulesData, setModuleData] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [perPageData, setPerPageData] = useState(10);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any>();
  const [addIndustryDialogHandler, setAddIndustryDialogHandler] =
    useState(false);

  useEffect(() => {
    setPageNumber(1);
  }, [searchText, perPageData]);

  useEffect(() => {
    if (searchText) {
      searchDataHandler();
    } else {
      fetchTableIndustry();
    }
  }, [pageNumber, perPageData, searchText]);

  useEffect(() => {
    fetchTableDataHandler();
  }, []);

  const handleModuleChange = (event: any) => {
    setIndustryFormData({
      ...industryFormData,
      code: {
        value: event.target.value,
        error: "",
      },
    });
  };

  const fetchTableIndustry = async () => {
    try {
      setIsLoading(true);
      const res = await fetchIndustryTableHandler({
        input: { page: pageNumber, limit: perPageData },
      });
      const finalData = res?.industryListAll?.data?.map((item: any) => {
        return {
          name: item.name,
          code: item?.code?.map((val: any) => val).join(","),
          description: item.description,
          file: (
            <>
              <img
                src={`http://localhost:3000/${item.file}`}
                alt=""
                width="30"
                height="30"
              />
            </>
          ),
        };
      });
      setTableData(finalData);
      setCount(res?.industryListAll?.paginatorInfo?.count);
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
          search: searchText,
          page: pageNumber,
          limit: perPageData,
        },
      });
      setTableData(res?.searchIndustry?.data);
      setCount(res?.searchIndustry?.paginatorInfo?.count);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const checkExitsRoleHandler = async () => {
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

  const addIndustryHandler = async () => {
    try {
      const payload: any = {
        name: industryFormData.name.value,
        code: industryFormData.code.value,
        description: industryFormData.description.value,
        file,
      };
      setIsLoading(true);
      if (handleValidation()) {
        const res = await addIndustry({
          input: { ...payload },
        });
        setIndustryFormData(industryInsertField());
        await fetchTableIndustry();
        openSuccessNotification(res.createIndustry.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const handleValidation = () => {
    const { isValid, errors }: { isValid: boolean; errors: any } =
      industryValidation(industryFormData);
    setIndustryFormData({ ...errors });
    return isValid;
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageNumber(newPage);
  };

  const fetchTableDataHandler = async () => {
    try {
      setIsLoading(true);
      const res = await fetchTableHandler({
        input: { page: -1, limit: 0 },
      });
      setModuleData(res?.customerModuleListAll?.data);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(error.message);
      setIsLoading(false);
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<any>) => {
    setIndustryFormData({
      ...industryFormData,
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

  const getAddIndustryBtn = () => {
    return (
      <CustomButton
        id="profile_submit_button"
        label="Add Industry"
        customClasses={{ width: "150px" }}
        onClick={() => setAddIndustryDialogHandler(true)}
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
        placeHolder="Search Industry Name"
        name="Role"
        onChange={debounceEventHandler(handleSearchOnChange, 2000)}
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

  const handlePerPageData = (event: any) => {
    setPageNumber(1);
    setPerPageData(event.target.value);
  };

  const rolesTableRender = () => {
    return (
      <>
        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
          spacing={1}
          pt={2}
          px={3}
        >
          {searchBarRole()}
          {getAddIndustryBtn()}
        </Stack>
        <Box
          sx={{
            minWidth: "300px",
            overflow: "auto",
            padding: "30px",
          }}
        >
          <CustomTable
            headers={industryTableHeader}
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
      }}
    >
      {rolesTableRender()}
      <AddIndustry
        open={addIndustryDialogHandler}
        handleClose={() => setAddIndustryDialogHandler(false)}
        industryFormData={industryFormData}
        modulesData={modulesData}
        file={file}
        onChangeHandler={onChangeHandler}
        handleModuleChange={handleModuleChange}
        checkExitsRoleHandler={checkExitsRoleHandler}
        handleFileChange={handleFileChange}
        handleSave={addIndustryHandler}
        isLoading={isLoading}
        MenuProps={MenuProps}
        isTruthy={isTruthy}
        classes={classes}
      />
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default Industry;
