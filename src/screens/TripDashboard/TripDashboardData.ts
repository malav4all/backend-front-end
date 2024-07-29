import strings from "../../global/constants/StringConstants";

export const options = [
  {
    label: "Today",
    value: 0,
  },
  {
    label: "Yesterday",
    value: 1,
  },
  {
    label: "Last 4 Days",
    value: 4,
  },
  {
    label: "Last 1 Week",
    value: 7,
  },
  {
    label: "Last 2 Weeks",
    value: 14,
  },
  {
    label: "Last 1 Month",
    value: 30,
  },
  {
    label: "Last 45 days",
    value: 45,
  },
];

export const dashboardTourSteps = [
  {
    target: "#Dashboard_Interval_Dropdown",
    content:
      "Users have the option to choose their desired data range, spanning up to 45 days. The dashboard will dynamically reflect the selected timeframe's data",
    disableBeacon: true,
    disableOverlayClose: true,
    pointsArray: [],
  },
  {
    target: "#Dashboard_My_Campaigns",
    content: "List of the last 3 days' campaigns for quick access",
    disableOverlayClose: true,
    pointsArray: [],
  },
  {
    target: "#Dashboard_Campaign_Recipients",
    content:
      "A visual representation illustrates campaign statuses, adapting based on the selected date range",
    disableOverlayClose: true,
    pointsArray: [],
  },
  {
    target: "#Dashboard_Recent_Activities",
    content:
      "Displays recent activities, such as executed campaigns and contact-related activities.",
    disableOverlayClose: true,
    pointsArray: [],
  },
  {
    target: "#Dashboard_Recent_Campaigns",
    content:
      "The outcomes of the most recently executed campaigns are showcased in this segment.",
    disableOverlayClose: true,
    pointsArray: [],
  },
];

export const getRecentActivityOptions = (
  hasCampaignFetchAccess: boolean,
  hasContactFetchAccess: boolean
) => {
  let options = [];
  hasCampaignFetchAccess &&
    hasContactFetchAccess &&
    options.push({
      label: "All",
      value: strings.allActivity,
    });
  hasCampaignFetchAccess &&
    options.push({
      label: "Campaign",
      value: strings.campaignActivity,
    });
  hasContactFetchAccess &&
    options.push({
      label: "Audience",
      value: strings.audienceActivity,
    });

  return options;
};

export const COLORS = [
  "rgb(138, 185, 4)",
  "rgb(231, 69, 77)",
  "rgb(248, 101, 34)",
  "rgb(108, 150, 226)",
  "#6C96E2",
  "#00C49F",
  "#CC5285",
  "#0088FE",
  "#8AB904",
  "#F86522",
  "#E7454D",
  "#FFCA16",
  "#FFBB28",
  "#FF8042",
];

export interface Counts {
  name: string;
  count: number;
}

export interface CampaignRecipientCounts {
  [key: string]: { name: string; value: number };
}

export interface CampaignCounts {
  [key: string]: { name: string; value: number; fill: string };
}

export interface RecentCampaignStats {
  id: string;
  name: string;
  createdOn: string;
  stats: CampaignCounts;
}

export interface Last3DaysCampaigns {
  [key: string]: any[];
}
