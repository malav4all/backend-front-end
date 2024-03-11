import { useState } from "react";
import { Typography, SxProps, Box } from "@mui/material";
import CustomTypographyStyles from "./CustomTypography.styles";

interface CustomProps {
  textMessage: string;
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
  sx?: SxProps;
  readMoreClass?: object;
}

const CustomTypography = (props: CustomProps) => {
  const classes = CustomTypographyStyles;
  const [readMore, setReadMore] = useState<boolean>(true);
  const handleReadMore = () => {
    setReadMore(!readMore);
  };
  return (
    <Typography
      gutterBottom={props.gutterBottom}
      noWrap={props.noWrap}
      paragraph={props.paragraph}
      sx={props.sx}
      variant="body1"
    >
      {readMore ? props.textMessage.slice(0, 240) : props.textMessage}
      {props.textMessage.length > 240 && (
        <Box component="span" onClick={handleReadMore} sx={classes.readMore}>
          {readMore ? " ... read more" : " show less"}
        </Box>
      )}
    </Typography>
  );
};

export default CustomTypography;
