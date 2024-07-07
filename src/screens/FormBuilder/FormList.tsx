import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  List,
  ListItem,
  Button,
  IconButton,
} from "@mui/material";
import { Form } from "./FormBuilderHelper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material";

interface FormListProps {
  forms: Form[];
  onViewForm: (form: Form) => void;
  onDeleteForm: (formId: string) => void;
}

const FormList: React.FC<FormListProps> = ({
  forms,
  onViewForm,
  onDeleteForm,
}) => {
  const theme = useTheme();
  // console.log(forms);
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: "1rem",
        color: theme.palette.text.primary,
        border: "1px solid",
        borderColor: theme.palette.divider,
        borderRadius: "5px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Form List
      </Typography>
      <List>
        {forms.map((form) => (
          <ListItem key={form.id}>
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {form.title}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  size="small"
                  color="secondary"
                  onClick={() => onViewForm(form)}
                >
                  <VisibilityIcon />
                </IconButton>

                <IconButton
                  size="small"
                  color="secondary"
                  onClick={() => onDeleteForm(form.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FormList;
