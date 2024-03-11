import { useEffect, useState } from "react";
import customTableStyles from "./customTableExpandRow.styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import TablePaginationActions from "./TablePaginationActions";
import NoData from "../../../assets/images/tableNoData.svg";
import Pagination from "@mui/material/Pagination";
import usePagination from "./Pagination";
import paginationStyles from "./Pagination.styles";
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
  expandRow?: any;
  data?: JSX.Element;
  isChecked?: boolean;
  icon?: JSX.Element;
  showCollapseTable?: number;
  expandRowData?: any;
}

const CustomTable = (props: CustomProps) => {
  const classes = customTableStyles;
  const pagination = paginationStyles;
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [rowData, setRowData] = useState(props.rows);
  useEffect(() => {
    setRowData(props?.rows);
  }, [props.rows]);

  const PER_PAGE = props.rowsPerPage ?? 10;
  const dataCount = Math.ceil(props?.paginationCount! / PER_PAGE);
  const finalTableData = usePagination(rowData, PER_PAGE);
  const getRowOnClickHandler = (row: any) => {
    let handleRowClick = props.handleRowClick
      ? {
          onClick: () => props.handleRowClick && props.handleRowClick(row),
        }
      : {};
    return handleRowClick;
  };

  const getHeaderCellClassHandler = () => {
    let customClasses = props.customClasses;
    let handleCustomClass =
      customClasses && customClasses.headerCellClass
        ? {
            className: customClasses.headerCellClass,
          }
        : {};
    return handleCustomClass;
  };

  const getRowData = (row: any) => {
    return (
      <>
        {props?.headers?.map((column, index) => (
          <>
            <TableCell
              sx={classes.tableCell}
              align={column["align"]}
              key={index}
            >
              {row[column["field"]]}
            </TableCell>
          </>
        ))}
      </>
    );
  };

  const getHeaders = () => {
    return (
      <TableHead>
        <TableRow>
          {props?.headers?.map((column, index) => (
            <>
              <TableCell
                sx={classes.tableHeaderCell}
                align={column["align"]}
                key={index}
              >
                {column.name}
              </TableCell>
            </>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const ExpandableTableRow = ({ children, expandComponent }: any) => {
    return (
      <>
        <TableRow>{children}</TableRow>

        {props.isChecked && <>{expandComponent}</>}
      </>
    );
  };

  const getRows = () => {
    return (
      <>
        <TableBody sx={classes.tableBody}>
          {finalTableData?.currentData()?.map((row: any, index: number) => (
            <>
              {props?.expandRowData && props?.showCollapseTable === index ? (
                <ExpandableTableRow
                  key={index}
                  expandComponent={
                    <TableCell
                      colSpan={6}
                      style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                      }}
                    >
                      {props?.data}
                    </TableCell>
                  }
                >
                  {getRowData(row)}
                </ExpandableTableRow>
              ) : (
                <TableRow
                  sx={classes.tableRow}
                  key={index}
                  {...getRowOnClickHandler(row)}
                >
                  {getRowData(row)}
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </>
    );
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    props.handlePageChange && props.handlePageChange(event, newPage - 1);
    setPage(newPage);
  };

  const getTablePagination = () => {
    return (
      <>
        <Pagination
          page={page}
          count={dataCount}
          shape="rounded"
          size="medium"
          sx={pagination.pageBtn}
          onChange={(event: any, page: any) => {
            handleChangePage(event, page);
          }}
          showLastButton
          showFirstButton
        />
      </>
    );
  };

  const getTable = () => {
    return (
      <Box pb={4}>
        <Table sx={classes.table}>
          {getHeaders()}

          {rowData?.length <= 0 ? (
            <TableCell colSpan={4}>
              <Box textAlign="center">
                <Box
                  component="img"
                  src={NoData}
                  overflow="auto"
                  height="100px"
                  width="100%"
                />
                <Typography sx={classes.mediumFonts}>
                  No Data Available!
                </Typography>
              </Box>
            </TableCell>
          ) : (
            getRows()
          )}
        </Table>
        {rowData?.length ? getTablePagination() : null}
      </Box>
    );
  };

  return getTable();
};

export default CustomTable;
