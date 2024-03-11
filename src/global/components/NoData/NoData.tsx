import { Box } from "@mui/system";
import noData from "../../../assets/images/noData.svg";
const NoData = () => {
  return (
    <>
      <Box textAlign="center" bgcolor="white">
        <Box
          component="img"
          src={noData}
          height="60vh"
          width="auto"
          overflow="auto"
        />
      </Box>
    </>
  );
};

export default NoData;
