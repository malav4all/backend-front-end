import React, { useState } from "react";
import PublishIcon from "@mui/icons-material/Publish";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
// import { toast } from './ui/use-toast';
// import { PublishForm } from '@/actions/form';
// import { useRouter } from 'next/navigation';

function PublishFormBtn({ id }: { id: number }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // const router = useRouter();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const publishForm = async () => {
    try {
      setLoading(true);
      // await PublishForm(id);
      // toast({
      //   title: "Success!",
      //   description: "Your form is now available to the public!",
      // });
      // router.refresh();
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Something went wrong",
      // });
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<PublishIcon />}
        onClick={handleClickOpen}
        disabled={loading}
      >
        Publish
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. After publishing you will not be able
            to edit this form.
            <br />
            <br />
            <span>
              By publishing this form you will make it available to the public
              and you will be able to collect submissions.
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={publishForm}
            disabled={loading}
            color="primary"
            variant="contained"
          >
            {loading ? <CircularProgress size={24} /> : "Proceed"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PublishFormBtn;
