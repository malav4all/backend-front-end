import { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NoData from "../../../assets/images/tableNoData.svg";
import Pagination from "@mui/material/Pagination";
import CustomButton from "../CustomButton/CustomButton";
import customTableStyles from "./customTable.styles";
import paginationStyles from "./Pagination.styles";
import usePagination from "./Pagination";
import { Height } from "@mui/icons-material";

interface CustomProps {
  headers: any[];
  rows: any[];
  customClasses?: { headerCellClass?: string; rowClass?: string };
  size?: any;
  searchFields?: string[];
  handleRowClick?: Function;
  handlePageChange?: Function;
  handleRowsPerPage?: Function;
  paginationCount?: number;
  rowsPerPage?: number;
  pageNumber?: number;
  currentSelectedTab?: string;
  checkboxSelection?: boolean;
  handleClick?: any;
  onSelectAllClick?: any;
  isSelected?: any;
  isSelectAll?: any;
  isLoading?: boolean;
  searchParam?: string;
  setPage?: any;
  handlePerPageData?: any;
  perPageData?: any;
  isRowPerPageEnable?: boolean;
  isExportCSV?: boolean;
  onClickExportCSV?: () => void;
}

const CustomTable = (props: CustomProps) => {
  const theme = useTheme();
  const classes = customTableStyles;
  const pagination = paginationStyles;
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [rowData, setRowData] = useState(props.rows);
  const [selected, setSelected] = useState<any>();
  const rowPerPageData = [10, 15, 20, 25];
  const PER_PAGE = props.rowsPerPage ?? 10;
  const dataCount = Math.ceil(props.paginationCount! / PER_PAGE);
  const finalTableData = usePagination(rowData, PER_PAGE);

  useEffect(() => {
    setSelected(props?.rows?.map((item: any) => item?.id));
    setRowData(props?.rows);
  }, [props.rows]);

  const getRowOnClickHandler = (row: any) => {
    let handleRowClick = props.handleRowClick
      ? {
          onClick: () => props.handleRowClick && props.handleRowClick(row),
        }
      : {};
    return handleRowClick;
  };

  const getRowData = (row: any) => {
    return props?.headers?.map((column, index) => (
      <TableCell
        sx={{
          ...classes.tableCell,
          borderColor: theme.palette.divider,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
        align={column["align"]}
        key={index}
      >
        {row[column["field"]]}
      </TableCell>
    ));
  };

  const getHeaders = () => {
    let checkValue: boolean | null = null;
    if (props?.isSelectAll?.length)
      checkValue = selected?.every((item: any) =>
        props.isSelectAll?.includes(item)
      );
    return (
      <TableHead>
        <TableRow>
          {props.headers.slice(0, 2).map((column, index) => (
            <TableCell
              sx={{
                ...classes.tableHeaderCell,
                borderTop: "none !important",
                borderLeft: "none !important",
                borderRight: "none !important",
                // borderBottom: "1px solid !important",
                borderBottomColor: theme.palette.divider + "!important",
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                position: "sticky",
                left: 0,
                zIndex: 1,
              }}
              align={column["align"]}
              key={index}
            >
              {column.name}
            </TableCell>
          ))}
          {props.headers.slice(2).map((column, index) => (
            <TableCell
              sx={{
                ...classes.tableHeaderCell,
                borderTop: "none !important",
                borderLeft: "none !important",
                borderRight: "none !important",
                borderBottomColor: theme.palette.divider + "!important",
                backgroundColor: theme.palette.tableHeader,
                color: theme.palette.text.primary,
              }}
              align={column["align"]}
              key={index + 2}
            >
              {column.name}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const getRows = () => {
    return (
      <TableBody
        sx={{
          ...classes.tableBody,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        {finalTableData.currentData()?.map((row: any, index: any) => (
          <TableRow
            sx={{
              ...classes.tableRow,
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              // borderBottom: "1px solid",
              // borderBottomColor: theme.palette.divider,
            }}
            key={index}
            {...getRowOnClickHandler(row)}
          >
            {props.checkboxSelection && (
              <TableCell padding="checkbox">
                <Checkbox
                  sx={{
                    ...classes.checkbox,
                    color: theme.palette.text.primary,
                  }}
                  onClick={(event) =>
                    props.handleClick ? props.handleClick(event, row) : null
                  }
                  checked={props.isSelected ? props.isSelected(row.id) : null}
                  inputProps={{
                    "aria-labelledby": `enhanced-table-checkbox-${index}`,
                  }}
                />
              </TableCell>
            )}
            {getRowData(row)
              .slice(0, 2)
              .map((data: any, dataIndex: number) => (
                <TableCell
                  key={dataIndex}
                  sx={{
                    ...classes.tableCell,
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    position: "sticky",
                    left: 0,
                    zIndex: 1,
                    // border: "1px solid",
                    // borderColor: theme.palette.divider,
                  }}
                >
                  {data}
                </TableCell>
              ))}
            {getRowData(row)
              .slice(2)
              .map((data: any, dataIndex: number) => (
                <TableCell
                  key={dataIndex + 2}
                  sx={{
                    ...classes.tableCell,
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    // border: "1px solid",
                    // borderColor: theme.palette.divider,
                  }}
                >
                  {data}
                </TableCell>
              ))}
          </TableRow>
        ))}
      </TableBody>
    );
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    props.handlePageChange && props.handlePageChange(event, newPage);
    props.setPage && props.setPage(newPage);
  };

  const handleChangePerPageData = (event: any) => {
    props.handlePerPageData && props.handlePerPageData(event);
  };

  const getTablePagination = () => {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: props.isRowPerPageEnable ? "end" : "space-between",
          flexWrap: "wrap",
          marginTop: "8px",
        }}
      >
        {!props.isRowPerPageEnable && (
          <>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <InputLabel
                sx={{
                  ...classes.regularFonts,
                  color: theme.palette.text.secondary,
                }}
              >
                Results per page:
              </InputLabel>
              <Select
                value={props.perPageData}
                onChange={handleChangePerPageData}
                id="rowPerPage"
                name="rowPerPage"
                sx={{
                  ...classes.perPageDropdown,
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                }}
              >
                {rowPerPageData.map((items) => (
                  <MenuItem
                    sx={{
                      ...classes.optionStyle,
                      backgroundColor: theme.palette.background.paper,
                      color: theme.palette.text.primary,
                    }}
                    value={items}
                  >
                    {items}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <InputLabel
                sx={{
                  ...classes.regularFonts,
                  color: theme.palette.text.secondary,
                }}
              >
                Total Records:
              </InputLabel>
              <Typography sx={{
                marginLeft: "5px",
                fontSize: "13px",
              }}>{props?.paginationCount}</Typography>
            </Box>
          </>
        )}
        <Box display={"flex"} alignContent={"center"} alignItems={"center"}>
          {props.isExportCSV && (
            <Box
              style={{
                display: "flex",
                justifyContent: "end",
                marginBottom: "10px",
                height: "15px",
              }}
            >
              <CustomButton
                label={"Export CSV"}
                onClick={() => props.onClickExportCSV?.()}
                customClasses={{ width: "120px", marginTop: "8px", height: "10px", }}
              />
            </Box>
          )}
          <Pagination
            page={props.pageNumber!}
            count={dataCount}
            shape="rounded"
            size={isDesktop ? "medium" : "small"}
            sx={pagination.pageBtn}
            onChange={(event: any, page: any) => {
              handleChangePage(event, page);
            }}
            showLastButton
            showFirstButton
          />
        </Box>
      </Box>
    );
  };

  const getTable = () => {
    return (
      <Box>
        {rowData?.length ? getTablePagination() : null}
        <Table
          sx={{
            ...classes.table,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: "5px !important",
            border: "1px solid !important",
            borderColor: theme.palette.divider + "!important",
            overflow: "hidden !important",
          }}
        >
          {getHeaders()}
          {!props.isLoading && rowData?.length <= 0 ? (
            <TableCell
              colSpan={8}
              style={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
              }}
            >
              <Box textAlign="center">
                <Typography
                  sx={{
                    ...classes.mediumFonts,
                    color: theme.palette.text.secondary,
                    padding: "5rem",
                  }}
                >
                  We've got nothing for you!
                </Typography>
              </Box>
            </TableCell>
          ) : (
            getRows()
          )}
        </Table>
      </Box>
    );
  };

  return getTable();
};

export default CustomTable;
