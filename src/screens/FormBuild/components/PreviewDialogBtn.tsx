import React, { useState } from "react";
import PreviewIcon from "@mui/icons-material/Preview";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Paper,
} from "@mui/material";
import useDesigner from "./useDesigner";
import {
  FormElements,
  FormElementInstance,
  ElementsType,
} from "./FormElements";

function PreviewDialogBtn() {
  const { elements }: { elements: FormElementInstance[] } = useDesigner();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<PreviewIcon />}
        onClick={handleOpen}
      >
        Preview
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>Form preview</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="textSecondary">
            This is how your form will look like to your users 📃
          </Typography>
          <Paper
            elevation={0}
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: "#f0f0f0",
              borderRadius: 2,
            }}
          >
            {elements.map((element) => {
              const FormComponent =
                FormElements[element.type as ElementsType].formComponent;
              return (
                <FormComponent key={element.id} elementInstance={element} />
              );
            })}
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PreviewDialogBtn;
