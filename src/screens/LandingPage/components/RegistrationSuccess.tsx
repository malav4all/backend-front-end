import { Typography, Box } from "@mui/material";
import registerImage from "../../../assets/images/registered.png";
import registerStyles from "./Register.styles";
import { centerItemFlex } from "../../../utils/styles";
import strings from "../../../global/constants/StringConstants";
import { useTitle } from "../../../utils/UseTitle";

const RegistrationSuccessModal = () => {
  useTitle(strings.CheckYourEmailTitle);
  const classes = registerStyles;

  const getModalDesign = () => {
    return (
      <Box
        sx={{
          maxWidth: "450px",
          width: "450px",
          border: "1px solid #E7E7E7",
          boxShadow: "4px 8px 20px rgba(0, 0, 0, 0.05)",
          borderRadius: "16px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#FBF5FE",
            ...centerItemFlex,
            padding: 2,
            borderRadius: "16px 16px 0 0",
          }}
        >
          <img src={registerImage} alt="Registration successful!" />
        </Box>
        <Box p={2}>
          <Typography sx={classes.modalTitle}>Check your email!</Typography>
          <Typography sx={classes.fontText}>
            We’ve sent a message to your inbox with a link to activate your
            account.
          </Typography>
        </Box>
      </Box>
    );
  };

  const getDidntGetEmailSection = () => {
    return (
      <Box
        sx={{
          maxWidth: "450px",
          mt: 2,
        }}
      >
        <Typography sx={classes.didntGetEmail}>Didn’t get an email?</Typography>
        <Typography sx={classes.instructions}>
          Please check your spam or junk folder to see if the email ended up
          there by mistake. If you find it there, you can mark it as "not spam"
          to ensure future emails from that sender are delivered to your inbox.
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      mt="5%"
    >
      {getModalDesign()}
      {getDidntGetEmailSection()}
    </Box>
  );
};

export default RegistrationSuccessModal;
