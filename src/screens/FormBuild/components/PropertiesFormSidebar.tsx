import { Box, Typography, Divider, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useDesigner from "./useDesigner";
import { FormElements } from "./FormElements";

const PropertiesFormSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;

  const PropertiesForm = FormElements[selectedElement.type].propertiesComponent;

  return (
    <Box display="flex" flexDirection="column" p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" color="textSecondary">
          Element properties
        </Typography>
        <IconButton size="small" onClick={() => setSelectedElement(null)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ my: 2 }} />
      <PropertiesForm elementInstance={selectedElement} />
    </Box>
  );
};

export default PropertiesFormSidebar;
