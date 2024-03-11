import { Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import customIconStyles from "./CustomIcon.styles";
import clsx from "clsx";

interface CustomProps {
  icon: any;
  text?: string | JSX.Element;
  size?: string;
  color?: string;
  margin?: string;
  customClass?: string;
  onClick?: any;
}

const CustomIcon = (props: CustomProps) => {
  const classes = customIconStyles();

  const margin = props.margin ? { margin: props.margin } : {};
  const size = props.size ? { fontSize: props.size } : {};
  const color = props.color ? { color: props.color } : {};
  const customClass = props.customClass ? props.customClass : "";
  const onClick = props.onClick ? { onClick: props.onClick } : {};

  const customStyles = makeStyles((theme: Theme) => ({
    customStyledBox: {
      ...margin,
      ...color,
      ...size,
    },
  }));

  const customClasses = customStyles();

  return (
    <Box
      className={clsx(
        classes.centerAlignedBox,
        customClasses.customStyledBox,
        customClass
      )}
      {...onClick}
    >
      <Box className={classes.centerAlignedBox}>{props.icon}</Box>
      {props.text ? <Box display="inline-block">{props.text}</Box> : null}
    </Box>
  );
};

export default CustomIcon;
