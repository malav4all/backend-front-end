import { Height, Padding } from "@mui/icons-material";
import { borderRadius, purplePrimaryColor } from "../../../utils/styles";
const paginationStyles = {
  pageBtn: {
    display: "flex",
    justifyContent: "end",
    "& .Mui-selected": {
      color: "#fff",
      fontSize: "13px",
      height: "25px",
      backgroundColor: `${purplePrimaryColor} ! important`,
      fontWeight: "bold"
    },
  },
} as const;
export default paginationStyles;
