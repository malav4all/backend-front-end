import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import { FormField } from "./FormBuilderHelper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { CustomButton, CustomDialog } from "../../global/components";
import { IoMdAddCircleOutline } from "react-icons/io";

const initialFields: FormField[] = [
  { id: uuidv4(), type: "text", label: "Text Input" },
  { id: uuidv4(), type: "email", label: "Email Input" },
  { id: uuidv4(), type: "number", label: "Number Input" },
];

const predefinedOptions = [
  "Distributor",
  "Transporter",
  "Material",
  "Permit Number",
  "Permit Start Date & Time",
  "Permit End Date & Time",
  "Driver Name",
  "Driver Phone Number",
];

interface FormBuilderProps {
  onFieldsChange: (fields: FormField[]) => void;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ onFieldsChange }) => {
  const theme = useTheme();
  const [fields, setFields] = useState<FormField[]>(initialFields);
  const [newFieldLabel, setNewFieldLabel] = useState<string | null>(null);
  const [newFieldType, setNewFieldType] = useState("text");
  const [editFieldId, setEditFieldId] = useState<string | null>(null);
  const [editFieldLabel, setEditFieldLabel] = useState("");
  const [customOptions, setCustomOptions] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newOption, setNewOption] = useState("");

  useEffect(() => {
    onFieldsChange(fields);
  }, [fields, onFieldsChange]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFields(items);
  };

  const addField = () => {
    if (newFieldLabel) {
      setFields([
        ...fields,
        { id: uuidv4(), type: newFieldType, label: newFieldLabel },
      ]);
      setNewFieldLabel(null);
    }
  };

  const deleteField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const startEditField = (id: string, label: string) => {
    setEditFieldId(id);
    setEditFieldLabel(label);
  };

  const saveEditField = (id: string) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, label: editFieldLabel } : field
      )
    );
    cancelEditField();
  };

  const cancelEditField = () => {
    setEditFieldId(null);
    setEditFieldLabel("");
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setNewOption("");
  };

  const addCustomOption = () => {
    if (newOption) {
      setCustomOptions([...customOptions, newOption]);
      closeDialog();
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: "3rem",
        width: "600px",
        color: theme.palette.text.primary,
        border: "1px solid",
        borderColor: theme.palette.divider,
        borderRadius: "5px",
      }}
    >
      <Box display="flex" gap={2}>
        <Box>
          <Typography variant="h6">Fields</Typography>
          <List>
            {[...predefinedOptions, ...customOptions].map((option) => (
              <ListItem
                key={option}
                button
                onClick={() => setNewFieldLabel(option)}
              >
                <ListItemText primary={option} />
              </ListItem>
            ))}
          </List>
          <CustomButton
            label="Add Option"
            onClick={openDialog}
            customClasses={{ color: "white" }}
          ></CustomButton>
        </Box>

        <Box flexGrow={1} ml={2}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="fields">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {fields.map((field, index) => (
                    <Draggable
                      key={field.id}
                      draggableId={field.id}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          p={2}
                          my={1}
                          border="1px dashed grey"
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          {editFieldId === field.id ? (
                            <Box
                              display="flex"
                              alignItems="center"
                              flexGrow={1}
                            >
                              <TextField
                                value={editFieldLabel}
                                onChange={(e) =>
                                  setEditFieldLabel(e.target.value)
                                }
                                variant="outlined"
                                size="small"
                                sx={{ marginRight: 2 }}
                              />
                              <IconButton
                                onClick={() => saveEditField(field.id)}
                                color="primary"
                              >
                                <SaveIcon />
                              </IconButton>
                              <IconButton
                                onClick={cancelEditField}
                                color="secondary"
                              >
                                <CancelIcon />
                              </IconButton>
                            </Box>
                          ) : (
                            <>
                              <Typography flexGrow={1}>
                                {field.label}
                              </Typography>
                              <Box>
                                <IconButton
                                  onClick={() =>
                                    startEditField(field.id, field.label)
                                  }
                                  color="primary"
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  onClick={() => deleteField(field.id)}
                                  color="secondary"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            </>
                          )}
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {newFieldLabel && (
            <Box display="flex" my={2}>
              <TextField
                label="Field Label"
                value={newFieldLabel}
                disabled
                variant="outlined"
                size="small"
                sx={{ marginRight: 2 }}
              />
              <TextField
                select
                label="Field Type"
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ marginRight: 2 }}
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="number">Number</MenuItem>
              </TextField>
              <CustomButton onClick={addField} label="Add" />
            </Box>
          )}
        </Box>
      </Box>

      <CustomDialog
        isDialogOpen={isDialogOpen}
        handleDialogClose={closeDialog}
        dialogTitleContent={
          <Typography variant="h6">Add Custom Option</Typography>
        }
        dialogBodyContent={
          <TextField
            label="Option Label"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
        }
        dialogFooterContent={
          <>
            <CustomButton
              onClick={closeDialog}
              label="Cancel"
              customClasses={{ backgroundColor: "#f50057", color: "white" }}
            />
            <CustomButton
              onClick={addCustomOption}
              label="Add"
              customClasses={{ backgroundColor: "#3f51b5", color: "white" }}
            />
          </>
        }
      />
    </Box>
  );
};

export default FormBuilder;