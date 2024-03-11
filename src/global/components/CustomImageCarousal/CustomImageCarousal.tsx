import { useState, useEffect } from "react";
import customImageCarousalStyles from "./CustomImageCarousal.styles";
import { Box } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

interface CustomProps {
  imageArray: string[];
  noImageLayout: any;
  displayImageIndex?: number;
  setDisplayImageIndex?: Function;
  customStyle?: any;
  imageStyle?: any;
}

const CustomImageCarousal = (props: CustomProps) => {
  const classes = customImageCarousalStyles;
  const [carousalIndex, setCarousalIndex] = useState<number>(0);

  useEffect(() => {
    if (carousalIndex !== props.displayImageIndex) {
      setCarousalIndex(props.displayImageIndex ?? 0);
    }
  }, [props.displayImageIndex]);

  const carousalIndexIncrement = () => {
    if (carousalIndex !== props.imageArray.length - 1) {
      setCarousalIndex((prevState) => prevState + 1);
      if (props.displayImageIndex !== undefined) {
        props.setDisplayImageIndex?.(props.displayImageIndex! + 1);
      }
    }
  };

  const carousalIndexDecrement = () => {
    if (carousalIndex !== 0) {
      setCarousalIndex((prevState) => prevState - 1);
      if (props.displayImageIndex !== undefined) {
        props.setDisplayImageIndex?.(props.displayImageIndex! - 1);
      }
    }
  };

  return (
    <Box
      sx={{
        ...(props.customStyle
          ? { ...props.customStyle }
          : { ...classes.mainContainerBox }),
        position: "relative",
      }}
    >
      {props.imageArray.length > 0 &&
        carousalIndex !== props.imageArray.length - 1 && (
          <Box
            sx={{
              ...classes.arrowIconBox,
              right: "0px",
            }}
          >
            <NavigateNextIcon
              onClick={carousalIndexIncrement}
              sx={classes.arrowIcons}
            />
          </Box>
        )}
      <img
        src={props.imageArray[carousalIndex] || props.noImageLayout}
        style={props.imageStyle}
        alt="images"
      />
      {props.imageArray.length > 0 && carousalIndex !== 0 && (
        <Box
          sx={{
            ...classes.arrowIconBox,
            left: "0px",
          }}
        >
          <NavigateBeforeIcon
            onClick={carousalIndexDecrement}
            sx={classes.arrowIcons}
          />
        </Box>
      )}
    </Box>
  );
};

export default CustomImageCarousal;
