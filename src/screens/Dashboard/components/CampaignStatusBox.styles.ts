import { boldFont, getRelativeFontSize } from "../../../utils/styles";

const CampaignStatusBoxStyle = {
  boxStyle: {
    display: "flex",
    padding: "10px",
  },
  textMargin: {
    ...boldFont,
    color: "gray",
  },
  dashboardDataSize: {
    ...boldFont,
    lineHeight: 1.2,
    fontSize: getRelativeFontSize(10),
    color: "black",
  },
  borderRadiusStyle: {
    border: "none",
    background: "red",
  },
};

export default CampaignStatusBoxStyle;
