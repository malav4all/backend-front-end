import {
  Box,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Arrow_Right_Black from "../../../assets/icons/Arrow_Right_Black.svg";
import moment from "moment";
import { CSSProperties } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import customDatePickerStyle from "./CustomDatePicker.styles";

type Props = {
  dateRange: any;
  disablePast?: any;
  handleDaterangeChange: Function;
  customWidth?: any;
  isFromMetaData?: boolean;
  fromDate?: any;
  toDate?: any;
  labelFirst?: any;
  labelSecond?: any;
  labelFirstRequired?: any;
  labelSecondRequired?: any;
  placeholderstart?: any;
  placeholderend?: any;
  disableFuture?: any;
  errorFirst?: any;
  errorSecond?: any;
  lableFirstClass?: any;
  lableSecondClass?: any;
  labelWidth?: any;
  readonly?: any;
};
const CustomDatePicker: React.FC<Props> = ({
  dateRange,
  handleDaterangeChange,
  customWidth,
  disableFuture,
  disablePast,
  errorFirst,
  errorSecond,
  fromDate,
  isFromMetaData,
  labelFirst,
  labelFirstRequired,
  labelSecond,
  labelSecondRequired,
  labelWidth,
  lableFirstClass,
  lableSecondClass,
  placeholderend,
  placeholderstart,
  readonly,
  toDate,
}) => {
  const classes = customDatePickerStyle;
  const pureWhiteColor = "#ffffff";
  const primaryBlackColor = "#000000";
  const errorStyling: CSSProperties = {
    paddingLeft: "6px",
  };
  const bgcolor = "blue";
  return (
    <>
      <Grid container sx={{ display: "flex", flexDirection: "column" }}>
        {(labelFirst || labelSecond) && (
          <Box
            sx={{
              display: "flex",
              mb: 0.5,
              ml: 1,
            }}
          >
            {labelFirst && (
              <>
                <Box display={"flex"} width={labelWidth}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: primaryBlackColor,
                    }}
                  >
                    {labelFirst}
                  </Typography>
                  {labelFirstRequired && <Box sx={classes.star}>*</Box>}
                </Box>
              </>
            )}

            {labelSecond && (
              <Typography variant="h5" sx={{ color: primaryBlackColor }}>
                {labelSecond}
              </Typography>
            )}
            {labelSecondRequired && <Box sx={classes.star}>*</Box>}
          </Box>
        )}

        <Grid
          container
          display={"flex"}
          p={isFromMetaData ? 0 : 0}
          width={customWidth}
          // style={{
          //   background: pureWhiteColor,
          //   border: "1px solid #7A81FD",
          //   borderRadius: "34px",
          // }}
        >
          <Grid
            item
            sm={5.3}
            xs={5.1}
            md={5.6}
            lg={5.6}
            xl={5.6}
            width={"100%"}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                value={dateRange.fromDate ? new Date(dateRange.fromDate) : null}
                ampm={true}
                format="dd/MM/yyyy hh:mm a"
                disableFuture={disableFuture ? true : false}
                onChange={(newValue: any) =>
                  handleDaterangeChange(newValue, fromDate)
                }
                slotProps={{
                  textField: {
                    variant: "outlined",
                    fullWidth: true,
                    inputProps: {
                      readOnly: readonly,
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <img
            src={Arrow_Right_Black}
            alt="Arrow_Right_Black"
            style={{ justifyContent: "center", display: "flex", width: "20px" }}
          />
          <Grid item sm={5.3} xs={5.1} md={5.6} lg={5.6} xl={5.6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                value={dateRange.toDate ? new Date(dateRange.toDate) : null}
                ampm={true}
                format="dd/MM/yyyy hh:mm a"
                onChange={(newValue) => {
                  handleDaterangeChange(newValue, toDate);
                }}
                disablePast={disablePast ? true : false}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    fullWidth: true,
                    inputProps: {
                      readOnly: readonly,
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        {(errorFirst || errorSecond) && (
          <Box
            sx={{
              display: "flex",
              mb: 0.5,
              ml: 1,
            }}
          >
            {(!dateRange.issueDate ||
              dateRange.issueDate == "Invalid date" ||
              !moment(dateRange.issueDate, "DD/MM/YYYY").isValid()) && (
              <FormHelperText error sx={{ width: labelWidth, ...errorStyling }}>
                {errorFirst}
              </FormHelperText>
            )}
            {(!dateRange.expiryDate ||
              dateRange.expiryDate == "Invalid date" ||
              !moment(dateRange.expiryDate, "DD/MM/YYYY").isValid()) && (
              <FormHelperText
                error
                sx={{
                  marginLeft:
                    dateRange.issueDate && dateRange.issueDate != "Invalid date"
                      ? labelWidth
                      : "",
                  ...errorStyling,
                }}
              >
                {errorSecond}
              </FormHelperText>
            )}
          </Box>
        )}
      </Grid>
    </>
  );
};

export default CustomDatePicker;
