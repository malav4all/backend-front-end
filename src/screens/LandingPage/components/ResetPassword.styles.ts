import {
  boldFont,
  getRelativeFontSize,
  inputLabelRequiredColor,
} from "../../../utils/styles";

const ResetPasswordStyles = {
  submitBtn: {
    width: "100%",
  },
  getHeading: {
    ...boldFont,
    fontSize: getRelativeFontSize(14),
    mx: 4,
    mt: 8,
    mb: 2,
  },
  formCenter: {
    width: "100%",
    px: 4,
  },
  label: { display: "flex" },
  labelIcon: { color: "black" },
  labelText: {
    marginLeft: "6px",
    ...boldFont,
  },
  error: {
    borderRadius: "8px",
    outline: "none",
    borderColor: "red !important",
    width: "100% !important",
  },
  select: {
    borderRadius: "20px",
    border: "1px solid black",
    width: "100% !important",
  },
  star: {
    color: inputLabelRequiredColor,
    marginLeft: "2px",
    fontSize: getRelativeFontSize(5),
    ...boldFont,
  },
} as const;

export default ResetPasswordStyles;
