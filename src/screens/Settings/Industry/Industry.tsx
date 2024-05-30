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

const Industry = () => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const classes = IndustryStyles;
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
                src={`http://localhost:5000/${item.file}`}
                alt=""
                width="50"
                height="60"
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

  const getProfileFooter = () => {
    return (
      <Box sx={classes.profileFooter}>
        <CustomButton
          id="profile_submit_button"
          customClasses={classes.saveBtnStyle}
          onClick={addIndustryHandler}
          label="Save"
        />
      </Box>
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
      <Stack
        px={4}
        pt={2}
        direction={{ lg: "row", xs: "column" }}
        justifyContent="flex-end"
        alignItems={{ lg: "center" }}
      >
        <Stack
          direction={{ sm: "row", xs: "column" }}
          alignItems={{ sm: "center" }}
        >
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
        </Stack>
      </Stack>
    );
  };

  const handlePerPageData = (event: any) => {
    setPageNumber(1);
    setPerPageData(event.target.value);
  };

  const rolesTableRender = () => {
    return (
      <>
        {searchBarRole()}
        <Box
          sx={{
            minWidth: "300px",
            overflow: "auto",
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

  const getPersonalDetails = () => {
    return (
      <Grid container mt={2}>
        <Grid item xs={12} mb={2} ml={1.5}>
          <Typography sx={classes.pageSubtitle}>Add Industry</Typography>
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <Box m={1.5}>
            <CustomInput
              required
              label="Industry Name"
              id="profile_name_field"
              type="text"
              name="name"
              placeHolder="Enter Industry Name"
              onChange={onChangeHandler}
              propsToInputElement={{ maxlength: 25 }}
              value={industryFormData.name.value}
              onBlur={checkExitsRoleHandler}
              error={industryFormData.name.error}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <Box m={1.5}>
            <CustomInput
              required
              label="Industry Name"
              id="profile_name_field"
              type="file"
              name="name"
              placeHolder="Enter Industry Name"
              onChange={(e: any) => {
                const fileList = e.target.files[0];
                setFile(fileList);
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <Box sx={classes.formInput} display={"flex"} flexDirection={"column"}>
            <Box m={1.5}>
              <Box display={"flex"}>
                <Typography sx={classes.label}>Industry Module</Typography>
                <Typography sx={classes.star}>*</Typography>
              </Box>

              <Select
                id="role_management_select_permission_dropdown"
                name="permissions"
                sx={classes.dropDownStyle}
                displayEmpty
                value={industryFormData.code.value}
                onChange={handleModuleChange}
                multiple
                MenuProps={MenuProps}
                renderValue={(selected) => (
                  <Typography>
                    {selected.length === 0
                      ? "Select Modules"
                      : selected.join(", ")}
                  </Typography>
                )}
                error={
                  !isTruthy(industryFormData.code?.value) &&
                  industryFormData.code?.error
                }
              >
                {modulesData.map((item: any) => (
                  <MenuItem
                    key={item._id}
                    value={item.name}
                    sx={classes.optionStyle}
                  >
                    <Checkbox
                      checked={industryFormData.code?.value?.includes(
                        item.name
                      )}
                      sx={classes.checkbox}
                    />
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </Box>
            {!isTruthy(industryFormData.code?.value) && (
              <FormHelperText error sx={{ paddingLeft: "20px" }}>
                {industryFormData.code?.error}
              </FormHelperText>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <Box sx={classes.formInput} display={"flex"} flexDirection={"column"}>
            <Box display={"flex"}>
              <Typography sx={classes.label}>Description </Typography>
              <Typography sx={classes.star}>*</Typography>
            </Box>
            <TextField
              multiline
              minRows={3}
              inputProps={{ maxLength: 500 }}
              sx={classes.testAreaStyle}
              name="description"
              id="comment"
              //   error={ticketForm.comment.error}
              placeholder="Enter your description"
              value={industryFormData.description.value}
              onChange={onChangeHandler}
            />
          </Box>
        </Grid>
      </Grid>
    );
  };

  return (
    <Container>
      {getPersonalDetails()}
      {getProfileFooter()}
      {rolesTableRender()}
      <CustomLoader isLoading={isLoading} />
    </Container>
  );
};

export default Industry;
