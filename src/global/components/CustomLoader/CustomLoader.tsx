import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Loader from "../../../assets/loader.gif";
interface CustomLoaderProps {
  isLoading?: boolean;
}
const CustomLoader = (props: CustomLoaderProps) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 101,
        backgroundColor: "rgb(255 243 243 / 50%) !important",
      }}
      open={props.isLoading!}
    >
      {/* <CircularProgress color="inherit" /> */}
      <img src={Loader} width="75px" />
    </Backdrop>
  );
};

export default CustomLoader;
