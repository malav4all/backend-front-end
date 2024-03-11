import { useEffect, useState } from "react";
import layoutStyles from "./Layout.styles";
import SupportIcon from "../../../assets/icons/support.svg";
import {
  CustomButton,
  CustomDialog,
  CustomInput,
} from "../../../global/components";
import supportTicketImg from "../../../assets/images/support-ticket.svg";
import { DropzoneAreaBase } from "react-mui-dropzone";
import {
  FormHelperText,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  Box,
  Chip,
  TextField,
  useMediaQuery,
} from "@mui/material";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../helpers/methods";
import notifiers from "../../../global/constants/NotificationConstants";
// import { attachFileUpload } from "../../CreateCampaign/createCampaignServices";
import { ReactComponent as dropZoneDropZone } from "../../../assets/icons/dropZoneDropZone.svg";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import strings from "../../../global/constants/StringConstants";
// import urls from "../../../global/constants/UrlConstants";
import history from "../../../utils/history";
import CloseIcon from "@mui/icons-material/Close";
import { theme } from "../../../utils/styles";

const CreateTicket = () => {
  const classes = layoutStyles;
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [isSupportTicketOpen, setIsSupportTicketOpen] = useState(true);
  const [openModel, setOpenModel] = useState(false);
  const [hideSupportTicketIcon, setHideSupportTicketIcon] =
    useState<boolean>(false);
  const [process, setProcess] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filePath, setFilePath] = useState<string[]>([]);
  const [uploadFileName, setUploadFileName] = useState<any>([]);
  const [ticketForm, setTicketForm] = useState<any>({
    process: {
      value: "",
      error: "",
    },
    title: {
      value: "",
      error: "",
    },
    comment: {
      value: "",
      error: "",
    },
  });

  useEffect(() => {
    if (openModel) {
      loadProcess();
    }
  }, [openModel]);

  useEffect(() => {
    setTicketForm({
      process: {
        value: "",
        error: "",
      },
      title: {
        value: "",
        error: "",
      },
      comment: {
        value: "",
        error: "",
      },
    });
    setFilePath([]);
    setUploadFileName([]);
  }, [openModel]);

  const handleSupportTicketModal = () => {
    setOpenModel(true);
  };

  const dialogHeaderContent = () => {
    return (
      <Box display={"flex"}>
        <img src={supportTicketImg} alt="" />
      </Box>
    );
  };

  const handleOnChange = (event: any) => {
    setTicketForm({
      ...ticketForm,
      [event.target.name]: {
        ...ticketForm[event.target.name],
        value: event.target.value,
        error: false,
      },
    });
  };

  const handleDropRejected = (files: any, event: any) => {
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    const rejectedFiles = files.filter(
      (file: any) => file.size > MAX_FILE_SIZE
    );
    if (rejectedFiles.length > 0) {
      const rejectedFileNames = rejectedFiles
        .map((file: any) => file.name)
        .join(", ");
      openErrorNotification(
        `The following files exceed the maximum allowed size of 2 MB: ${rejectedFileNames}`
      );
    }
  };

  const handleValidation = () => {
    let errors = ticketForm;
    let isValid = true;
    const process = ticketForm.process.value;
    const title = ticketForm.title.value.trim();
    const comment = ticketForm.comment.value.trim();
    if (!process && !title && !comment) {
      // Set the fields as error true
      errors.process.error = "Please select process";
      errors.title.error = "Please enter title";
      errors.comment.error = "Please enter description";
      isValid = false;
    } else if (!process) {
      errors.process.error = "Please select process";
      isValid = false;
    } else if (!title) {
      errors.title.error = "Please enter title";
      isValid = false;
    } else if (!comment) {
      errors.comment.error = "Please enter issue description";
      isValid = false;
    }
    setTicketForm({ ...errors });
    return isValid;
  };

  const handleSubmit = async () => {
    // try {
    //   setIsLoading(true);
    //   if (handleValidation() && ticketForm?.comment?.value?.length < 500) {
    //     // const docUrl = ticketForm?.fileName;
    //     await addNewSupportTicket(
    //       ticketForm.process.value,
    //       ticketForm.title.value,
    //       ticketForm.comment.value,
    //       filePath
    //     );
    //     openSuccessNotification("Your Response has been submitted");
    //     const ticket = ticketForm;
    //     ticket.process = "";
    //     ticket.title = "";
    //     ticket.comment = "";
    //     setFilePath([]);
    //     setUploadFileName([]);
    //     setTicketForm(ticket);
    //     setIsLoading(false);
    //     setOpenModel(false);
    //     history.push({
    //       pathname: urls.ticketsViewPath,
    //       state: { fromPageTableValue: strings.RaisedByMe, loadingState: true },
    //     });
    //   } else {
    //     setIsLoading(false);
    //   }
    // } catch (error: any) {
    //   openErrorNotification(
    //     isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
    //   );
    // }
  };

  const handleDeleteFile = (index: any) => {
    setUploadFileName(
      uploadFileName.filter((item: any, i: number) => i !== index)
    );
    setFilePath(filePath.filter((item: any, i: number) => i !== index));
  };

  const uploadFile = async (event: any) => {
    // try {
    //   let fileNameArray: any[] = [];
    //   let uploadFilePath: any[] = [];
    //   const fileData = event?.filter((data: any) => {
    //     return !uploadFileName?.includes(data?.file?.name);
    //   });
    //   const isExits = checkIsExitsFileName(fileData);
    //   if (!isExits) {
    //     for (const element of fileData) {
    //       setIsLoading(true);
    //       let fileNames = element?.file?.name;
    //       const data = new FormData();
    //       data.append("file", element?.file);
    //       data.append("fileName", element?.file?.name);
    //       const [res] = await Promise.all([attachFileUpload(data)]);
    //       uploadFilePath.push(...filePath, res?.message);
    //       fileNameArray.push(...uploadFileName, fileNames);
    //       setIsLoading(false);
    //     }
    //     setFilePath(uploadFilePath);
    //     setUploadFileName(fileNameArray);
    //   }
    // } catch (error: any) {
    //   setIsLoading(false);
    //   openErrorNotification(
    //     isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
    //   );
    // }
  };
  const checkIsExitsFileName = (files: any) => {
    const data: any = [];
    return files.every((item: any) => {
      if (uploadFileName?.includes!(item?.file?.name)) {
        data.push(item?.file?.name);
      }
      return uploadFileName?.includes(item?.file?.name);
    });
  };

  const loadProcess = async () => {
    // try {
    //   const response = await getProcessDefinitions();
    //   setProcess([...response]);
    // } catch (error: any) {
    //   openErrorNotification(
    //     isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
    //   );
    // }
  };

  const supportTicketContent = () => {
    return (
      <>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12}>
            <Typography sx={classes.supportTicketTitle}>HELP DESK</Typography>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={6} xl={6} item>
            <Box sx={classes.formInput}>
              <Box display={"flex"}>
                <Typography sx={classes.label}>Process</Typography>
                <Typography sx={classes.star}>*</Typography>
              </Box>
              <Select
                id="process"
                name="process"
                value={ticketForm.process.value}
                onChange={handleOnChange}
                input={<OutlinedInput />}
                sx={classes.selectStyle}
                displayEmpty
                renderValue={
                  ticketForm.process.value !== ""
                    ? undefined
                    : () => "Select process"
                }
                error={
                  !isTruthy(ticketForm.process.value) &&
                  ticketForm.process.error
                }
              >
                {process.map((process: any) => (
                  <MenuItem value={process.name} sx={classes.optionStyle}>
                    {process.name}
                  </MenuItem>
                ))}
              </Select>
              {!isTruthy(ticketForm.process.value) &&
                ticketForm.process.error && (
                  <FormHelperText error sx={classes.errorStyle}>
                    {ticketForm.process.error}
                  </FormHelperText>
                )}
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={6} xl={6} item>
            <CustomInput
              required
              id="title"
              placeHolder="Enter Title"
              type="text"
              name="title"
              label="Title"
              onChange={handleOnChange}
              value={ticketForm.title.value}
              propsToInputElement={{ minLength: 5, maxLength: 50 }}
              error={
                !isTruthy(ticketForm.title.value) && ticketForm.title.error
              }
            />
            {isTruthy(ticketForm.title.value) &&
              ticketForm.title.value.length >=
                strings.TICKET_USER_TITLE_LIMIT && (
                <FormHelperText error sx={classes.errorStyle}>
                  {`Title cannot be more than ${strings.TICKET_USER_TITLE_LIMIT} characters`}
                </FormHelperText>
              )}
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
            <Box
              sx={classes.formInput}
              display={"flex"}
              flexDirection={"column"}
            >
              <Box display={"flex"}>
                <Typography sx={classes.label}>Description </Typography>
                <Typography sx={classes.star}>*</Typography>
              </Box>
              <TextField
                multiline
                minRows={3}
                inputProps={{ maxLength: 500 }}
                sx={classes.testAreaStyle}
                name="comment"
                id="comment"
                error={ticketForm.comment.error}
                placeholder="Enter your comment"
                value={ticketForm.comment.value}
                onChange={(event: any) => handleOnChange(event)}
                onBlur={(event: any) => {
                  setTicketForm({
                    ...ticketForm,
                    [event.target.name]: {
                      ...ticketForm[event.target.name],
                      error: false,
                    },
                  });
                }}
              />
              {!isTruthy(ticketForm.comment.value) &&
                ticketForm.comment.error && (
                  <FormHelperText error sx={classes.errorStyle}>
                    {ticketForm.comment.error}
                  </FormHelperText>
                )}
              {isTruthy(ticketForm.comment.value) &&
                ticketForm.comment.value.length >=
                  strings.USER_DESCRIPTION_LIMIT && (
                  <FormHelperText error sx={classes.errorStyle}>
                    {`Description cannot be more than ${strings.USER_DESCRIPTION_LIMIT} characters`}
                  </FormHelperText>
                )}
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
            <Box sx={classes.formInput}>
              <Typography sx={classes.label}>Upload File </Typography>
              <Box sx={classes.dropZoneWrapper}>
                <DropzoneAreaBase
                  fileObjects={[]}
                  dropzoneText={"Drag files here Or select files to upload"}
                  onAdd={uploadFile}
                  maxFileSize={2097152}
                  acceptedFiles={[".jpeg", ".jpg", ".png", ".doc", ".pdf"]}
                  showAlerts={false}
                  showPreviewsInDropzone={true}
                  showFileNames={true}
                  filesLimit={10}
                  Icon={dropZoneDropZone}
                  onDropRejected={handleDropRejected}
                />
                <Box>
                  {uploadFileName &&
                    uploadFileName
                      ?.filter(
                        (item1: any, index: number) =>
                          uploadFileName.indexOf(item1) === index
                      )
                      ?.map((item: any, index2: number) => {
                        return (
                          <>
                            <Chip
                              sx={classes.previewChip}
                              label={item}
                              variant="filled"
                              onDelete={() => handleDeleteFile(index2)}
                            />
                          </>
                        );
                      })}
                </Box>

                <Typography sx={classes.warningContent}>
                  The file should be in .doc/.pdf/.png/.jpg/.jpeg and size
                  should not be more than 2MB
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            item
            display="flex"
            justifyContent="center"
          >
            <CustomButton
              label="Submit"
              onClick={() => handleSubmit()}
              customClasses={classes.submitButton}
            />
          </Grid>
        </Grid>
      </>
    );
  };

  const supportTicketModal = () => {
    return (
      <>
        <CustomDialog
          dialogHeaderContent={dialogHeaderContent()}
          isDialogOpen={openModel}
          handleDialogClose={() => setOpenModel(false)}
          closable
          dialogBodyContent={supportTicketContent()}
          closeButtonVisibility={true}
          width="600px"
        />
      </>
    );
  };

  return (
    <Box>
      {isSupportTicketOpen && (
        <Box style={classes.supportTicket}>
          {isDesktop && !hideSupportTicketIcon && (
            <Box
              sx={classes.closeIcon}
              onClick={() => setHideSupportTicketIcon(true)}
              component={"div"}
            >
              <CloseIcon
                style={{
                  fontSize: "15px",
                  background: "white",
                  borderRadius: "20px",
                }}
              />
            </Box>
          )}
          <Box
            sx={classes.supportTicketIcon}
            onClick={handleSupportTicketModal}
          >
            {isDesktop && !hideSupportTicketIcon ? (
              <img
                src={SupportIcon}
                alt="Support Icon"
                style={{ width: "75px" }}
              />
            ) : (
              <Box sx={classes.supportTicket1}>
                <Typography sx={classes.helpDeskContent}>HELPDESK</Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}
      {supportTicketModal()}
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default CreateTicket;
