import React from "react";
import { Box, Divider, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FormElementsSidebar from "./FormElementsSidebar";
import useDesigner from "./useDesigner";
import PropertiesFormSidebar from "./PropertiesFormSidebar";

const DesignerSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesigner();

  return (
    <Box
      sx={{
        width: 400,
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        gap: 2,
        borderLeft: 1,
        borderColor: "divider",
        p: 2,
        bgcolor: "background.paper",
        overflowY: "auto",
        height: "100%",
      }}
    >
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && (
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1">Element properties</Typography>
            <IconButton size="small" onClick={() => setSelectedElement(null)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ my: 2 }} />
          <PropertiesFormSidebar />
        </Box>
      )}
    </Box>
  );
};

export default DesignerSidebar;
