import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import {
  centerItemFlex,
  primaryColorPurple,
} from "../../../../../utils/styles";

const TripVerificationFormStyles = (theme: Theme) => ({
  customDropZone: {
    borderRadius: "10px",
    background: theme.palette.background.paper,
    border: "1px dashed #E7E7E7",
    height: "115px", 
    display: "flex",
    alignItems: "center", 
    justifyContent: "center",
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "115px", 
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    "& .MuiDropzoneArea-icon": {
      width: "35px",
      height: "35px",
    },
    "& .MuiTypography-root": {
      fontSize: "0.875rem",
      overflowWrap: "break-word",
      textAlign: "center",
      color: "#828282",
    },
    "& .MuiDropzoneArea-text": {
      color: "#828282",
      margin: "10px auto",
      width: "100%",
    },
    "& .MuiSvgIcon-root": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  imgDisplay: {
    ...centerItemFlex,
    width: "100%",
    height: "115px",
    border: "1px dashed #CABEF8",
    background: "#F0ECFF",
    borderRadius: "10px",
    [`@media screen and (max-width: ${1370}px)`]: {
      height: "108px",
    },
  },
  profileBox: {
    ...centerItemFlex,
    width: "100px",
    height: "100px",
    background: primaryColorPurple,
    border: "1.5px solid #6842EF",
    boxShadow: "0px 2px 8px",
  },
  label: {
    color: "#fff", // Adjust color based on your theme
    marginBottom: theme.spacing(1),
  },
});

export default TripVerificationFormStyles;
