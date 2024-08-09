import React from "react";
import Backdrop from "@mui/material/Backdrop";

interface CustomLoaderProps {
  isLoading?: boolean;
}

const CustomLoader = (props: CustomLoaderProps) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1, 
        background:
          "radial-gradient(circle, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,1) 100%)",
      }}
      open={props.isLoading!}
    >
      <div
        style={{
          width: "4rem",
          height: "4rem",
          border: "0.5rem dashed",
          borderRadius: "50%",
          borderColor: "#5F22E1",
          animation: "spin 1s linear infinite",
          marginLeft: "14rem", 
        }}
      ></div>
    </Backdrop>
  );
};

export default CustomLoader;
