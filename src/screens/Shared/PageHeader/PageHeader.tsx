import { Box, Typography } from "@mui/material";
import { boldFont } from "../../../utils/styles";

interface CustomProps {
  children?: any;
  title: string;
  backgroundColor?: string;
  paddingVertical?: string;
  paddingHorizontal?: string;
}

const PageHeader = (props: CustomProps) => {
  const paddingX = props.paddingHorizontal ?? "30px";
  const paddingY = props.paddingVertical ?? "15px";
  const backgroundColor = props.backgroundColor ?? "#FFF";
  return (
    <Box
      style={{
        backgroundColor: backgroundColor,
        padding: paddingY + " " + paddingX,
      }}
    >
      <Box mt={1}>
        <Typography sx={{ ...boldFont }} variant="h4">
          {props.title}
        </Typography>
      </Box>
      {props.children}
    </Box>
  );
};

export default PageHeader;
