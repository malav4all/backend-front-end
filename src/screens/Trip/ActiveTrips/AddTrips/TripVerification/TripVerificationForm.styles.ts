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
    height: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiDropzoneArea-root-370": {
      width: "100%",
      border: "dashed",
      cursor: "pointer",
      overflow: "hidden",
      position: "relative",
      boxSizing: "borderBox",
      minHeight: "140px !important",
      borderColor: "rgba(0, 0, 0, 0.12)",
      borderRadius: "4px",
      backgroundColor: "#fff",
    },
    customDropZoneRoot: {
      borderRadius: "8px",
      border: "2px dashed #E7E7E7",
      backgroundColor: theme.palette.background.paper,
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
    },
    uploadButtons: {
      color: "white",
      backgroundColor: "#6842EF",
    },
    customDropZoneIcon: {
      color: "#6842EF", // Custom icon color
      fontSize: "40px",
    },
    customDropZoneText: {
      color: "#828282",
      fontSize: "0.875rem",
      marginTop: "10px",
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
    background: "#060B25",
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
    overflow: "hidden",
  },
  label: {
    color: "#fff",
    marginBottom: theme.spacing(1),
  },
});

export default TripVerificationFormStyles;
