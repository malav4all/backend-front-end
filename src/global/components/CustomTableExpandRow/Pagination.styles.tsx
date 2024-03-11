import { purplePrimaryColor } from "../../../utils/styles";
const paginationStyles = {
  pageBtn: {
    display: "flex",
    marginTop: "8px",
    justifyContent: "end",
    "& .Mui-selected": {
      color: "#fff",
      backgroundColor: `${purplePrimaryColor} ! important`,
    },
  },
} as const;
export default paginationStyles;
