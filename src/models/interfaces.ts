import { CSSProperties } from "@mui/styles";

export interface User {
  pwd: string;
  authToken: string;
  name: string;
  contactNo: string;
  email: string;
  role: string;
  resources: string[];
  account: string;
  company: string;
  captchaToken?: string;
  planId?: string;
  paymentMethodId?: string;
}

export interface ActionDataType {
  campaignId: string;
  campaignName: string;
  campaignOwner: string;
  contactEmail: string;
  actionDetails: ActionDetails;
  action: string;
}

export interface ActionDetails {
  ipAddress: string;
  urls: any[];
  actionTimeLines: string[];
  city: string;
  country: string;
}

export interface campaignStatusBoxProps {
  boxHeading: string;
  data: number;
  icon: string;
}

export interface campaignRecipientProps {
  campaignRecipientData: any;
  colors: string[];
  chartHeading: string;
}
export interface campaignMatrixProps {
  data: string[];
  colors: string[];
  chartHeading: string;
}

export interface MatrixData {
  name: string;
  count: number;
}

export interface UserFields {
  [key: string]: {
    value: string;
    error: string;
  };
}

export interface CampaignGroupFields {
  groupName: {
    value: string;
    error: boolean;
  };
  groupType: {
    value: string[];
    error: boolean;
  };
  file: string[];
}

export interface UserData {
  email: JSX.Element;
  firstName: string;
  mobileNumber: number;
  createdBy: string;
  accountId: {
    accountName: string;
    roleId: {
      name: string;
      industryType: {
        name: string;
      };
    };
  };
}

export interface AssetAssingmentData {
  imei: number,
  labelName: string,
  // routes: string,
  boxSet: string,
  createdBy: string
}

export interface AssetAssingmentFields {
  [key: string]: {
    value: string;
    error: string;
  };
}

export interface RowData {
  emailId: string;
  assignBy: string;
  allowedEmailCount: string;
  title: string;
}

export interface Roles {
  superAdmin: string;
  admin: string;
  user: string;
}

export interface CampaignUserData {
  campaignName: JSX.Element;
  contactEmail: string;
  campaignOwner: JSX.Element;
  actionTimeLines: string;
}

export interface emailGroupUserData {
  name: string;
  owner: string;
  recipientCount: string;
}

export interface campaignUserData {
  CampaignName: JSX.Element;
  CampaignGroups: String;
  CampaignSubject: string;
  SentOn: string;
  CampaignStatus: JSX.Element;
  SubmittedBy: string;
  ScheduledOn: string;
  Action: JSX.Element;
}

export interface App {
  app: string;
  role: string;
}

export interface PricingData {
  id: string;
  name: string;
  app: string;
  price: number;
  currency: string;
  validityInDays: number;
  limits: planLimits[];
  features: [];
}

export interface planLimits {
  entity: string;
  limit: number;
}

export interface features {
  [key: string]: featuresData;
}

export interface featuresData {
  isRecommends: boolean;
  isLaunchingOffer: boolean;
  validity: string[];
}

export interface OTPInputProps {
  length: number;
  onChangeOTP: (otp: string) => any;

  autoFocus?: boolean;
  isNumberInput?: boolean;
  disabled?: boolean;

  style?: CSSProperties;
  className?: string;

  inputStyle?: CSSProperties;
  inputClassName?: string;
}

export interface SwitchButtonProps {
  text: string;
  onClick: Function;
}

export interface GroupData {
  name: string;
  owner: string;
  type: string;
  recipientCount: number;
  action: JSX.Element;
}

export interface CampaignData {
  name: JSX.Element;
  owner: JSX.Element;
  type: string;
  recipientCount: any;
  action: JSX.Element;
  id: string;
}

export interface AddEmployeeFields {
  [key: string]: {
    value: string;
    label: string;
    icon: any;
  };
}

export interface EmployeeFields {
  id: string;
  name: string;
  mobile: string;
  email: string;
  designation: string;
  type: string;
  status: string;
}

export interface LoginFields {
  [key: string]: {
    value: string;
    error: any;
  };
}

export interface ForgotPasswordFields {
  [key: string]: {
    value: string;
    error: any;
  };
}

export interface RegistrationFeild {
  [key: string]: {
    value: string;
    error: string;
  };
}

export interface LoginFormFields {
  [key: string]: {
    value: string;
    label: string;
    type: string;
    icon?: JSX.Element;
  };
}

// export interface ProjectDetails {
//   value: number;
//   grade: string | null;
// }

// export interface InnerProject {
//   details: Details;
//   lastAnalysis: string;
//   projectName: string;
//   status: string;
// }

export interface Data {
  [key: string]: Projects;
}

export interface Tests {
  [key: string]: TestData;
}

export interface TestData {
  testType: string;
  totalCount: number;
  status: string;
  runDate: string;
  failCount: number;
  successCount: number;
}

export interface Projects {
  [key: string]: InnerProject;
}

export interface InnerProject {
  projectName: string;
  status: string;
  lastAnalysis: string;
  details: Details;
}

export interface Monitor {
  Data: MonitorData[];
}

export interface MonitorData {
  icon: any;
  status: string;
  label: string;
}
export interface Details {
  [key: string]: {
    value: string;
    grade: string | null;
  };
}

export interface ContactsType {
  contactNo: "";
  emailId: JSX.Element;
  firstName: "";
  groups: ContactsGroups[];
  lastName: "";
  owners: "";
  action: JSX.Element;
}

export interface ContactsGroups {
  id: string;
  name: string;
}

export interface CampaignCounts {
  Clicked: 0;
  Failed: 0;
  InProgress: 0;
  Opened: 0;
  Requested: 0;
  Success: 0;
  Unsubscribed: 0;
  Unconfirmed: 0;
}
export interface HandleTemplateType {
  category: string;
  image: string;
  jsonContent: string;
  name: string;
  order: number;
  users: any;
  id: string | undefined;
  owner: string;
}
export interface CampaignTemplateType {
  name: string;
  usersJson: string[];
  jsonContent: string;
  image: string;
  id: string | null | undefined;
}
export interface SummaryType {
  campaignOwner: JSX.Element;
  campaignName: string;
  status: JSX.Element;
  scheduleTime: string;
}

export interface AuthMap {
  [key: string]: string[];
}

export interface tabInterface {
  label: string;
  count: number;
}

export interface Groups {
  id: string;
  name: string;
}
export interface paidValidate {
  account: string;
  captchaToken?: any;
  contactNo: string;
  email: string;
  firstName: string;
  lastName: string;
  planId: string | null;
  paymentMethodId: string;
}

export interface ticketDownload {
  id: null;
  app: string;
  type: null;
  audit: null;
  title: null;
  status: string;
  ownerId: null;
  ownerEmail: null;
  ownerName: null;
  ownerType: null;
  contextId: null;
  path: string;
  metadata: null;
  content: null;
  tagss: null;
  issueDate: "";
  expiryDate: "";
  expriyMandatory: null;
  issueMandatory: null;
}

// dashborad type

export interface campaignCountMetricsType {
  count?: number | undefined;
  name?: string | undefined;
}
export interface campaignCountMetricsDataType {
  Clicked?: number | undefined;
  Failed?: number | undefined;
  InProgress?: number | undefined;
  Opened?: number | undefined;
  Requested?: number | undefined;
  Success?: number | undefined;
  Unconfirmed?: number | undefined;
}
export interface totalDataType {
  count?: number | undefined;
  name?: string | undefined;
}
export interface CustomTooltipType {
  payload: any;
  label?: string | undefined;
}

// for template
export interface errorsType {
  error?: string | undefined;
  value?: string | undefined;
}
export interface unlayerJSONType {
  body: {
    id?: string;
    row?: any;
    value?: any;
  };
  counters: {
    u_column?: number;
    u_content_heading?: number;
    u_content_html?: number;
    u_content_text?: number;
    u_row?: number;
  };
  schemaVersion?: string | undefined;
}

export interface exportHtmlType {
  amp: {
    enabled?: boolean | undefined;
    format?: string | undefined;
    html?: any;
    validation: {
      errors: any;
      status?: string | undefined;
    };
  };
  chunks: {
    body?: string | undefined;
    css?: string | undefined;
    fonts: any;
    js?: string | undefined;
    tags: any;
  };
  design: {
    body: {
      id?: string | undefined;
      rows: any;
      values: any;
    };
    counters: {
      u_column?: number | undefined;
      u_content_heading?: number | undefined;
      u_content_menu?: number | undefined;
      u_content_text?: number | undefined;
      u_row?: number | undefined;
    };
    schemaVersion?: string | undefined;
  };
  html?: string | undefined;
}
// for campaign
export interface showViewPopoverType {
  count?: number | undefined;
  name: any;
}
export interface locationType {
  hash?: string | undefined;
  key?: string | undefined;
  pathname?: string | undefined;
  search?: string | undefined;
  state?: any;
}
export interface campaignDetailTableType {
  attachments: {
    "watch.jpg"?: string | undefined;
  };
  content?: string | undefined;
  counts: Array<{
    count?: number | undefined;
    name?: string | undefined;
  }>;
  createdOn?: string | undefined;
  data: {
    spamPercentage?: number | undefined;
  };
  displayName?: string | undefined;
  fromId?: string | undefined;

  groups: Array<{
    id?: string | undefined;
    name?: string | undefined;
  }>;
  haveChildren?: boolean;
  id: any;
  name?: string | undefined;
  owner?: string | undefined;
  scheduleTime?: string | undefined;
  status?: string | undefined;
  subject?: string | undefined;
  template?: string | undefined;
}
export interface usersDataType {
  id?: string | undefined;
  name?: string | undefined;
}
// for contact
export interface campaignGroup {
  id: string;
  name: string;
  owner: string;
  recipientCount: number;
  type: string;
}

export interface emailTableDataType {
  contactNo: string;
  counts: any;
  emailId: string;
  firstName: string;
  groups: any;
  lastName: string;
  owners: any;
  segment: any;
  type: any;
}

export interface recipient {
  emailId: string;
  firstName: string;
  lastName: string;
  contactNo: string;
  type: any;
  segment: any;
  tagName: any;
  tags: Tag[];
  groups: any[];
  owners: any[];
  counts: any[];
}

export interface Tag {
  id: string;
  name: string;
}

export interface Resources {
  name: string;
  permissions: string[];
}

export interface FormattedResources {
  [key: string]: string[];
}
