import { Box, Stack, Typography } from "@mui/material";
import { pinkDarkColor, theme } from "../../../utils/styles";
import CardSectionStyles from "./CardSection.style";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { planLimits, PricingData } from "../../../models/interfaces";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { getFormattedStatsCount } from "../../../helpers/methods";

interface CustomProps {
  pricingData?: PricingData[];
  plan: any;
  setPlan: Function;
  currency?: any;
}

const CardSection = (props: CustomProps) => {
  const classes = CardSectionStyles;

  const rightIcon = () => {
    return (
      <Box
        component="span"
        sx={{
          marginRight: 1,
          color: "#ADC804",
          svg: {
            height: "20px",
            width: "20px",
          },
        }}
      >
        <DoneRoundedIcon />
      </Box>
    );
  };

  return (
    <>
      {props.pricingData?.map((plan: any) => {
        return (
          <Box
            sx={{
              backgroundColor: "#fff",
              cursor: "pointer",
              border:
                plan.id === props.plan.id
                  ? "2px solid #0352B5"
                  : "1px solid #DDDDDD",
              boxShadow: "2px 7px 19px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              width: "215px",
              height: {
                xl: "70vh",
                lg: "75vh",
                md: "70vh",
                sm: "70vh",
                xs: "70vh",
              },
            }}
            onClick={() => props.setPlan(plan)}
          >
            <>
              <Box
                sx={{
                  backgroundColor: pinkDarkColor,
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  color: "#FFFFFF",
                  padding: 1,
                  display: "flex",
                  justifyContent: "center",
                  svg: {
                    height: "15px",
                    width: "15px",
                  },
                }}
              >
                <StarRateRoundedIcon />
                <Typography sx={classes.recommendsText}>
                  IMZ Recommends
                </Typography>
              </Box>
              <Stack
                direction="column"
                display="flex"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                padding={2}
              >
                <Box
                  sx={{
                    padding: "15px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    "& .not-allowed": {
                      cursor: "not-allowed! important",
                      pointerEvents: "auto! important",
                    },
                  }}
                >
                  <Typography gutterBottom sx={classes.title}>
                    {plan.name}
                  </Typography>
                  <Box
                    sx={{
                      marginBottom: 2,
                      [theme.breakpoints.down("sm")]: {
                        marginTop: "1px",
                        "& .MuiStack-root>:not(style)": {
                          marginTop: "1px !important",
                        },
                      },
                    }}
                  >
                    <Typography component="span" sx={classes.amount}>
                      {plan.currency === "INR"
                        ? `₹${getFormattedStatsCount(plan.price ?? 0)}`
                        : `$${getFormattedStatsCount(plan.price ?? 0)}`}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={classes.title}>
                      Validity: {plan.validityInDays} days
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    textAlign: "left",
                    overflow: "auto",
                    maxHeight: "31vh",
                    "::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
                  {plan.limits.map((data: planLimits) => {
                    return (
                      <Box display="flex">
                        {rightIcon()}
                        <Typography variant="h2" sx={classes.validity}>
                          {getFormattedStatsCount(data.limit)} {data.entity}
                        </Typography>
                      </Box>
                    );
                  })}

                  <>
                    {plan.features?.map((desc: string) => {
                      return (
                        <Typography variant="h2" sx={classes.validity}>
                          {rightIcon()} {desc}
                        </Typography>
                      );
                    })}
                  </>
                </Box>
              </Stack>
            </>
          </Box>
        );
      })}
    </>
  );
};

export default CardSection;
