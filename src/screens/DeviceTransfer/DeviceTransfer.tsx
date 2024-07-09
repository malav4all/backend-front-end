import React, { ChangeEvent, useState } from "react";
import {
  CustomAppHeader,
  CustomButton,
  CustomInput,
  CustomTable,
} from "../../global/components";
import {
  boldFont,
  getRelativeFontSize,
  headerColor,
  primaryHeadingColor,
  theme,
} from "../../utils/styles";
import {
  Autocomplete,
  Box,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { debounceEventHandler } from "../../helpers/methods";
import strings from "../../global/constants/StringConstants";
import SearchIcon from "@mui/icons-material/Search";
import CustomLoader from "../../global/components/CustomLoader/CustomLoader";
import { store } from "../../utils/store";
import DeviceOnboardingStyle from "../Inventory/DeviceOnboarding/DeviceOnboarding.styles";

const DeviceTransfer = () => {
  const classes = DeviceOnboardingStyle;
  const [searchText, setSearchText] = useState<string>("");
  const [perPageData, setPerPageData] = useState(10);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);

  const deviceModelTableHeader = [
    {
      name: "From Account",
      field: "fromAccount",
    },
    {
      name: "IMEI",
      field: "imei",
    },
    {
      name: "To Account",
      field: "toAccount",
    },
  ];

  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      setSearchText(SearchEvent.target.value.trim());
      setPerPageData(10);
    } else {
      setSearchText("");
    }
  };

  const getSearchBar = () => {
    return (
      <CustomInput
        placeHolder="Search text"
        id="users_search_field"
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
          Device Transfer
        </Typography>
      </Box>
    );
  };

  const getDetails = () => {
    return (
      <Grid container mt={2} gap={3} display={"flex"} justifyContent={"center"}>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <Box>
            <Stack direction="column">
              <InputLabel sx={classes.inputLabel} shrink>
                From Account
                <Box ml={0.4} sx={classes.star}>
                  *
                </Box>
              </InputLabel>
              <Select
                sx={classes.dropDownStyle}
                id="add_user_roles_dropdown"
                name="deviceOnboardingModel"
                value={""}
                onChange={(e) => {}}
                // renderValue={
                //   userDeviceFields.businessModel.value !== ""
                //     ? undefined
                //     : () => "Select a Device Model"
                // }
                MenuProps={classes.menuProps}
                displayEmpty
                // error={
                //   userDeviceFields.businessModel.value?.length < 4 &&
                //   userDeviceFields.businessModel.error?.length !== 0
                // }
              >
                {["CAPEX", "OPEX"]?.map((item: any, index: any) => (
                  <MenuItem
                    key={index}
                    value={item}
                    sx={classes.dropDownOptionsStyle}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <Box>
            <InputLabel
              sx={{
                ...classes.inputLabel,
                color: theme.palette.text.primary,
              }}
              shrink
            >
              IMEI
              <Box ml={0.4} sx={classes.star}>
                *
              </Box>
            </InputLabel>

            <Autocomplete
              sx={classes.emailDropDownStyle}
              id="update_user_manager_field"
              options={
                data.map((item: any) => ({
                  key: item._id,
                  label: `${item.imei}`,
                  value: item,
                })) || []
              }
              renderInput={(params) => {
                const InputProps = { ...params.InputProps };
                InputProps.endAdornment = null;
                return (
                  <TextField
                    sx={classes.select}
                    {...params}
                    name="startLocation"
                    placeholder="Select Imei"
                    onSelect={() => {}}
                    InputProps={InputProps}
                  />
                );
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <Box>
            <Stack direction="column">
              <InputLabel sx={classes.inputLabel} shrink>
                To Account
                <Box ml={0.4} sx={classes.star}>
                  *
                </Box>
              </InputLabel>
              <Select
                sx={classes.dropDownStyle}
                id="add_user_roles_dropdown"
                name="deviceOnboardingModel"
                value={""}
                onChange={(e) => {}}
                // renderValue={
                //   userDeviceFields.businessModel.value !== ""
                //     ? undefined
                //     : () => "Select a Device Model"
                // }
                MenuProps={classes.menuProps}
                displayEmpty
                // error={
                //   userDeviceFields.businessModel.value?.length < 4 &&
                //   userDeviceFields.businessModel.error?.length !== 0
                // }
              >
                {["CAPEX", "OPEX"]?.map((item: any, index: any) => (
                  <MenuItem
                    key={index}
                    value={item}
                    sx={classes.dropDownOptionsStyle}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          display={"flex"}
          justifyContent={"center"}
        >
          <CustomButton
            id="submit_button"
            label={"Submit"}
            onClick={() => {}}
          />
        </Grid>
      </Grid>
    );
  };

  const deviceTransferTableRender = () => {
    return (
      <>
        <Box
          sx={{
            minWidth: "300px",
            overflow: "auto",
          }}
        >
          <CustomTable
            headers={deviceModelTableHeader}
            rows={tableData}
            paginationCount={count}
            handlePageChange={(event: any, newPage: any) =>
              setPageNumber(newPage)
            }
            pageNumber={pageNumber}
            handlePerPageData={(event: any) =>
              setPerPageData(Number(event.target.value))
            }
            rowsPerPage={perPageData}
            perPageData={perPageData}
            setPage={setPageNumber}
          />
        </Box>
      </>
    );
  };

  const getDeviceTransfer = () => (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        height: "100%",
      }}
    >
      <CustomAppHeader
        className={{
          backgroundColor: headerColor,
          padding: "10px 20px 15px 18px",
        }}
      >
        <Stack
          px={4}
          pt={2}
          direction={{ lg: "row", xs: "column" }}
          justifyContent="space-between"
          alignItems={{ lg: "center" }}
        >
          {getHeader()}
          <Stack
            direction={{ sm: "row", xs: "column" }}
            alignItems={{ sm: "center" }}
            spacing={1}
          >
            {getSearchBar()}
          </Stack>
        </Stack>
      </CustomAppHeader>
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
            color: primaryHeadingColor,
            fontWeight: "bold",
          }}
        ></Typography>
      </Stack>

      <Box
        sx={{
          minWidth: "300px",
          overflow: "auto",
          padding: "30px",
        }}
      >
        {getDetails()}
        {deviceTransferTableRender()}
      </Box>
      <CustomLoader isLoading={isLoading} />
    </Box>
  );

  return getDeviceTransfer();
};

export default DeviceTransfer;
