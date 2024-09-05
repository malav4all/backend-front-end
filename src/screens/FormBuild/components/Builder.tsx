import { useEffect, useState } from "react";
import PreviewDialogBtn from "./PreviewDialogBtn"; // Replace with MUI dialog if needed
import SaveFormBtn from "./SaveFormBtn"; // Replace with MUI button if needed
import PublishFormBtn from "./PublishFormBtn"; // Replace with MUI button if needed
import Designer from "./Designer";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import { ImSpinner2 } from "react-icons/im";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
// import Link from 'next/link';
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import Confetti from "react-confetti";
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import useDesigner from "./useDesigner";
import { useParams } from "react-router-dom";

function Builder({ form }: { form: any }) {
  const { id } = useParams<{ id: any }>();
  const { setElements, setSelectedElement, elements } = useDesigner();
  const [isReady, setIsReady] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const theme = useTheme();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;
    // const elements = JSON.parse(form.content);
    setElements(elements);
    setSelectedElement(null);
    const readyTimeout = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(readyTimeout);
  }, [form, setElements, setSelectedElement]);

  const handleToastClose = () => {
    setToastOpen(false);
  };

  // const shareUrl = `${window.location.origin}/submit/${form?.shareURL}`;

  if (!isReady) {
    return (
      <Box className="flex flex-col items-center justify-center w-full h-full">
        <CircularProgress size={48} />
      </Box>
    );
  }

  // if (form.published) {
  //   return (
  //     <>
  //       {/* <Confetti
  //         width={window.innerWidth}
  //         height={window.innerHeight}
  //         recycle={false}
  //         numberOfPieces={1000}
  //       /> */}
  //       <Box className="flex flex-col items-center justify-center h-full w-full">
  //         <Box className="max-w-md">
  //           <Typography
  //             variant="h3"
  //             align="center"
  //             className="text-primary border-b pb-2 mb-10"
  //           >
  //             🎊🎊Form Published🎊🎊
  //           </Typography>
  //           <Typography variant="h5">Share this form</Typography>
  //           <Typography
  //             variant="body1"
  //             color="textSecondary"
  //             className="border-b pb-10"
  //           >
  //             Anyone with the link can view and submit the form
  //           </Typography>
  //           {/* <Box className="my-4 flex-col gap-2 items-center w-full border-b pb-4">
  //             <TextField fullWidth value={shareUrl} InputProps={{ readOnly: true }} />
  //             <CopyToClipboard text={shareUrl}>
  //               <Button
  //                 fullWidth
  //                 variant="contained"
  //                 color="primary"
  //                 onClick={() => setToastOpen(true)}
  //               >
  //                 Copy Link
  //               </Button>
  //             </CopyToClipboard>
  //           </Box> */}
  //           {/* <Box className="flex justify-between">
  //             <Button component={Link} href="/" startIcon={<BsArrowLeft />}>
  //               Go back home
  //             </Button>
  //             <Button component={Link} href={`/forms/${form.id}`} endIcon={<BsArrowRight />}>
  //               Form details
  //             </Button>
  //           </Box> */}
  //         </Box>
  //       </Box>
  //       <Snackbar
  //         open={toastOpen}
  //         autoHideDuration={6000}
  //         onClose={handleToastClose}
  //       >
  //         <Alert
  //           onClose={handleToastClose}
  //           severity="success"
  //           sx={{ width: "100%" }}
  //         >
  //           Link copied to clipboard
  //         </Alert>
  //       </Snackbar>
  //     </>
  //   );
  // }

  return (
    <DndContext sensors={sensors}>
      <Box className="flex flex-col w-full">
        <Box className="flex justify-between border-b-2 p-4 gap-3 items-center mt-[3.5rem] bg-[#15152E] -my-[3px]">
          {/* <Typography variant="h6" noWrap>
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </Typography> */}
          <Box className="flex items-center gap-2">
            <PreviewDialogBtn />
            {/* {!form.published && ( */}
            <>
              <SaveFormBtn id={id} />
              <PublishFormBtn id={id} />
            </>
            {/* )} */}
          </Box>
        </Box>

        {/* Form BackSide */}
        <Box
          className="flex w-full flex-grow items-center justify-center relative overflow-y-auto"
          sx={{
            // height: 200,
            backgroundColor: "#27272A",
            backgroundImage: `url(${
              theme.palette.mode === "dark" ? "/paper-dark.svg" : "/paper.svg"
            })`,
          }}
        >
          <Designer />
        </Box>
      </Box>
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default Builder;
