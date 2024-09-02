import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Chip,
  Grid,
  Stack,
  Tooltip,
  Typography,
  InputAdornment,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  CustomButton,
  CustomInput,
  CustomTable,
} from "../../../global/components";
import SearchIcon from "@mui/icons-material/Search";
import AddUpdateRoles from "./components/AddUpdateRoles";
import RoleManagementStyles from "./RoleManagement.styles";
import EditIcon from "@mui/icons-material/Edit";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import {
  debounceEventHandler,
  isTruthy,
  openErrorNotification,
} from "../../../helpers/methods";
import { DeleteRoleConfirmModal } from "./components/DeleteRoleConfirmModal";
import strings from "../../../global/constants/StringConstants";
import notifiers from "../../../global/constants/NotificationConstants";
import { initialRoleData, rolesTableHeader } from "./RoleManagementHelpers";
import { useTitle } from "../../../utils/UseTitle";
import {
  fetchIndustryType,
  fetchRole,
  searchRole,
} from "./service/RoleManagement.service";

import { hasAccessTo } from "../../../utils/AuthorizationManager";
import { headerColor } from "../../../utils/styles";

export const RoleManagement = () => {
  useTitle(strings.RoleManagementTitle);
  const classes = RoleManagementStyles;
  const theme = useTheme();
  const [buttonClick, setButtonClick] = useState<string>(strings.rolesTable);
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState();
  const [roleData, setRoleData] = useState<any>(initialRoleData);
  const [resources, setResources] = useState<any>([]);
  const [deleteRoleConfirmModal, setDeleteRoleConfirmModal] = useState({
    visible: false,
    role: "",
  });
  const [industryType, setIndustryType] = useState([]);
  const [searchText, setSearchText] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("Add");

  const hasRoleManagementAddAccess = hasAccessTo("RoleMangement", "Add");

  useEffect(() => {
    setPage(1);
  }, [searchText, rowsPerPage]);

  useEffect(() => {
    if (searchText) {
      searchRolesHandler();
    } else {
      fetchRolesHandler();
    }
  }, [rowsPerPage, page, searchText]);

  useEffect(() => {
    fetchIndustryTypeHandler();
  }, []);

  const fetchIndustryTypeHandler = async () => {
    try {
      const res = await fetchIndustryType({ input: { page: -1, limit: 0 } });
      setIndustryType(res?.industryListAll?.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const fetchRolesHandler = async () => {
    try {
      setLoading(true);
      const res = await fetchRole({ input: { page, limit: rowsPerPage } });
      const finalSearchData = tableDataConversion(res?.roleListAll?.data);
      setTableData(finalSearchData);
      setCount(res?.roleListAll?.paginatorInfo?.count);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
    }
  };

  const searchRolesHandler = async () => {
    try {
      setLoading(true);
      const res = await searchRole({
        input: { search: searchText, page, limit: rowsPerPage },
      });
      const finalSearchData = tableDataConversion(res?.searchRoles?.data);
      setTableData(finalSearchData);
      setCount(res?.searchRoles?.paginatorInfo?.count);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
    }
  };

  const customDialog = () => {
    return (
      <DeleteRoleConfirmModal
        handleModalClose={() =>
          setDeleteRoleConfirmModal({
            visible: false,
            role: "",
          })
        }
        openModal={deleteRoleConfirmModal.visible}
        handleConfirmDelete={() => {}}
        role={deleteRoleConfirmModal.role}
      />
    );
  };

  const handleEdit = (rowData: any) => {
    setDialogMode("Edit");
    setRoleData(rowData);
    setDialogOpen(true);
  };

  const handleRoleCreator = () => {
    setDialogMode("Add");
    setRoleData(initialRoleData);
    setDialogOpen(true);
  };

  const handlePerPageData = (event: any) => {
    setRowsPerPage(event.target.value);
  };

  const tableDataConversion = (finalTableData: any) => {
    return finalTableData?.map((role: any, index: number) => {
      return {
        name: role?.name,
        industryType: role.industryType?.name,
        resources: role?.resources?.map((res: any) => {
          return (
            <Stack
              direction="row"
              alignItems="center"
              alignContent="center"
              spacing={1}
              mt={1}
            >
              <Typography>{res?.name}</Typography>:
              {res?.permissions?.map((i: any) => (
                <Chip
                  key={role?.id + i}
                  label={i}
                  sx={{ ...classes.addTagChip, color: "white" }}
                  variant="filled"
                />
              ))}
            </Stack>
          );
        }),
        action: (
          <Box sx={{ display: "flex", cursor: "pointer" }}>
            <>
              <Tooltip title="Edit Role" placement="top" arrow>
                <EditIcon
                  htmlColor={"#7C58CB"}
                  style={{ margin: "0px 8px -7px 0px", cursor: "pointer" }}
                  onClick={() => handleEdit(role)}
                />
              </Tooltip>
            </>
          </Box>
        ),
      };
    });
  };

  const searchBarRole = () => {
    return (
      <Stack
        px={4}
        pt={2}
        direction={{ lg: "row", xs: "column" }}
        justifyContent="space-between"
        alignItems={{ lg: "center" }}
      >
        <Typography mt={1} sx={classes.pageSubtitle}></Typography>
        <Stack
          direction={{ sm: "row", xs: "column" }}
          alignItems={{ sm: "center" }}
          spacing={1}
        >
          <CustomInput
            id="role_mgmt_search_field"
            placeHolder="Search Role Name"
            name="Role"
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
          <Box>
            {hasRoleManagementAddAccess && (
              <CustomButton
                id="role_mgmt_create_button"
                label="Create Role"
                onClick={handleRoleCreator}
                startIcon={<AddIcon />}
                customClasses={{
                  width: "175px",
                }}
              />
            )}
          </Box>
        </Stack>
      </Stack>
    );
  };

  const handleSearchOnChange = (SearchEvent: ChangeEvent<HTMLInputElement>) => {
    if (SearchEvent.target.value) {
      setSearchText(SearchEvent.target.value.trim());
      setRowsPerPage(10);
    } else {
      setSearchText("");
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const rolesTableRender = () => {
    return (
      <>
        {searchBarRole()}
        <Box
          sx={{
            minWidth: "300px",
            maxHeight: "700px",
            overflowY: "scroll",
            overflow: "auto",
            padding: "30px",
          }}
        >
          <CustomTable
            headers={rolesTableHeader}
            rows={tableData}
            handlePageChange={handleChangePage}
            handleRowsPerPage={handlePerPageData}
            paginationCount={count}
            pageNumber={page}
            isLoading={loading}
            setPage={setPage}
            handlePerPageData={handlePerPageData}
            perPageData={rowsPerPage}
            rowsPerPage={rowsPerPage}
          />
        </Box>
      </>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
        backgroundColor: theme.palette.background.paper,
        height: "100%",
        paddingTop: "3.5rem",
      }}
    >
      <Grid>
        {rolesTableRender()}
        <AddUpdateRoles
          open={dialogOpen}
          handleClose={() => setDialogOpen(false)}
          name={dialogMode}
          rowData={roleData}
          fetchRolesHandler={fetchRolesHandler}
          setButtonClick={setButtonClick}
          resources={resources}
          industryType={industryType}
        />
      </Grid>
      <CustomLoader isLoading={loading} />
      {customDialog()}
    </Box>
  );
};
