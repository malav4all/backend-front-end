import { purplePrimaryColor } from "../../../utils/styles";
const paginationStyles = {
  pageBtn: {
    display: "flex",
    justifyContent: "end",
    "& .Mui-selected": {
      color: "#fff",
      backgroundColor: `${purplePrimaryColor} ! important`,
    },
  },
} as const;
export default paginationStyles;
