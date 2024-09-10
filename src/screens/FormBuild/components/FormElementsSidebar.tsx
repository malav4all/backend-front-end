import React from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";
import { FormElements } from "./FormElements";
import SidebarBtnElement from "./SidebarBtnElement";

const FormElementsSidebar = () => {
  return (
    <Box>
      <Typography variant="body2" color="textSecondary">
        Drag and Drop Elements
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary">
            Layout Elements
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <SidebarBtnElement formElement={FormElements.TitleField} />
        </Grid>
        <Grid item xs={6}>
          <SidebarBtnElement formElement={FormElements.SubTitleField} />
        </Grid>
        <Grid item xs={6}>
          <SidebarBtnElement formElement={FormElements.ParagraphField} />
        </Grid>
        <Grid item xs={6}>
          <SidebarBtnElement formElement={FormElements.SeparatorField} />
        </Grid>
        <Grid item xs={6}>
          <SidebarBtnElement formElement={FormElements.SpacerField} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary">
            Form Elements
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <SidebarBtnElement formElement={FormElements.TextField} />
        </Grid>
        <Grid item xs={6}>
          <SidebarBtnElement formElement={FormElements.NumberField} />
        </Grid>
        <Grid item xs={6}>
          <SidebarBtnElement formElement={FormElements.TextAreaField} />
        </Grid>
        <Grid item xs={6}>
          <SidebarBtnElement formElement={FormElements.DateField} />
        </Grid>
        <Grid item xs={6}>
          <SidebarBtnElement formElement={FormElements.SelectField} />
        </Grid>
        <Grid item xs={6}>
          <SidebarBtnElement formElement={FormElements.CheckboxField} />
        </Grid>
        <Grid item xs={6}>
          <SidebarBtnElement formElement={FormElements.EntityField} />
        </Grid>
        {/* <Grid item xs={6}>
          <SidebarBtnElement formElement={FormElements.TripField} />
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default FormElementsSidebar;
