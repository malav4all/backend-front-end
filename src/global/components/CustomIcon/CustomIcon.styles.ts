import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { centerItemFlex } from "../../../utils/styles";

const customIconStyles = makeStyles((theme: Theme) => ({
  centerAlignedBox: {
    ...centerItemFlex,
    float: "left",
  },
}));

export default customIconStyles;
