import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHistory } from "react-router-dom";
import { createForm } from "./formBuilder.service";
import { formSchema, formSchemaType } from "./form";
import {
  openErrorNotification,
  openSuccessNotification,
} from "../../helpers/methods";
import { store } from "../../utils/store";

const CreateFormButton: React.FC = () => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const { handleSubmit, control, formState } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: formSchemaType) {
    try {
      const response = await createForm({
        input: {
          accountId: "IMZ113343",
          createdBy: store.getState().auth.userName,
          ...values,
        },
      });
      const formId = response.addFormBuilder.data[0].formId;
      const description = response.addFormBuilder.data[0].description;
      const name = response.addFormBuilder.data[0].name;
      if (formId) {
        openSuccessNotification("Form created successfully");

        history.push({
          pathname: `/builder/${formId}`,
          state: {
            description: description,
            name: name,
          },
        });
      } else {
        throw new Error("Form ID not found in response");
      }
    } catch (error) {
      openErrorNotification("Something went wrong, please try again later");
    }
  }

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        style={{
          height: "190px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderStyle: "dashed",
          borderColor: "#1976d2",
        }}
      >
        <BsFileEarmarkPlus size={32} />
        <Typography variant="h6">Create new form</Typography>
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Form</DialogTitle>
        <DialogContent>
          <Typography>
            Create a new form to start collecting responses
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "16px" }}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Name" fullWidth margin="normal" />
              )}
            />
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                />
              )}
            />
            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={formState.isSubmitting}
                fullWidth
              >
                {formState.isSubmitting ? (
                  <ImSpinner2 className="animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateFormButton;
