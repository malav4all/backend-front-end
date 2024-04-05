import { useEffect, useState } from "react";
import customTableStyles from "./customTable.styles";
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
} from "@mui/material";
import NoData from "../../../assets/images/tableNoData.svg";
import Pagination from "@mui/material/Pagination";
import usePagination from "./Pagination";
import paginationStyles from "./Pagination.styles";
import { theme } from "../../../utils/styles";
import CustomButton from "../CustomButton/CustomButton";
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
  const classes = customTableStyles;
  const pagination = paginationStyles;
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  // const [page, setPage] = useState<number>(1);
  const [rowData, setRowData] = useState(props.rows);
  const [selected, setSelected] = useState<any>();
  const rowPerPageData = [10, 15, 20, 25];

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

  const PER_PAGE = props.rowsPerPage ?? 10;
  const dataCount = Math.ceil(props.paginationCount! / PER_PAGE);
  const finalTableData = usePagination(rowData, PER_PAGE);

  const getRowData = (row: any) => {
    return props?.headers?.map((column, index) => (
      <>
        <TableCell sx={classes.tableCell} align={column["align"]} key={index}>
          {row[column["field"]]}
        </TableCell>
      </>
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
        <TableRow style={{ borderRadius: "10px" }}>
          {props.checkboxSelection && (
            <TableCell padding="checkbox" sx={classes.tableHeaderCell}>
              <Checkbox
                sx={classes.selectAllCheckbox}
                checked={checkValue ?? false}
                onChange={props.onSelectAllClick}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
              />
            </TableCell>
          )}
          {props.headers.map((column, index) => (
            <TableCell
              sx={classes.tableHeaderCell}
              align={column["align"]}
              key={index}
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
      <TableBody sx={classes.tableBody}>
        {finalTableData.currentData()?.map((row: any, index: any) => {
          return (
            <>
              <TableRow
                sx={classes.tableRow}
                key={index}
                {...getRowOnClickHandler(row)}
              >
                {props.checkboxSelection && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      sx={classes.checkbox}
                      onClick={(event) =>
                        props.handleClick ? props.handleClick(event, row) : null
                      }
                      checked={
                        props.isSelected ? props.isSelected(row.id) : null
                      }
                      inputProps={{
                        "aria-labelledby": `enhanced-table-checkbox-${index}`,
                      }}
                    />
                  </TableCell>
                )}
                {getRowData(row)}
              </TableRow>
            </>
          );
        })}
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
      <>
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
                <InputLabel sx={classes.regularFonts}>
                  Results per page:
                </InputLabel>
                <Select
                  value={props.perPageData}
                  onChange={handleChangePerPageData}
                  id="rowPerPage"
                  name="rowPerPage"
                  sx={classes.perPageDropdown}
                >
                  {rowPerPageData.map((items) => (
                    <MenuItem sx={classes.optionStyle} value={items}>
                      {items}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <InputLabel sx={classes.regularFonts}>
                  Total Records:
                </InputLabel>
                <Typography>{props?.paginationCount}</Typography>
              </Box>
            </>
          )}
          <Box display={"flex"} alignContent={"center"} alignItems={"center"}>
            {props.isExportCSV && (
              <>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginBottom: "10px",
                  }}
                >
                  <CustomButton
                    label={"Export CSV"}
                    onClick={() => props.onClickExportCSV?.()}
                    customClasses={{ width: "120px", marginTop: "8px" }}
                  />
                </Box>
              </>
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
      </>
    );
  };
  const getTable = () => {
    return (
      <Box>
        {rowData?.length ? getTablePagination() : null}
        <Table sx={classes.table}>
          {getHeaders()}
          {!props.isLoading && rowData?.length <= 0 ? (
            <TableCell
              colSpan={8}
              style={{
                border: "1px solid #F0F0F0",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Box textAlign="center">
                <Box
                  component="img"
                  src={NoData}
                  overflow="auto"
                  height="100px"
                  width="100%"
                />
                <Typography sx={classes.mediumFonts}>
                  We've got nothing for you, sorry!
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
