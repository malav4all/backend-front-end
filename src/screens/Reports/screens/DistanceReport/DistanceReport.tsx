import JourneyReport from "../JourneyReport/JourneyReport";
import DistanceReportStyles from "./DistanceReport.styles";

const DistanceReport = () => {
  const classes = DistanceReportStyles;
  return <JourneyReport isFromDistanceReport={true} />;
};

export default DistanceReport;
