export class StringConstants {
  IMZ = "IMZ";

  applicationJSON = { "Content-Type": "application/json" };
  multipartForm = { "Content-Type": "multipart/form-data" };

  notification = "notification";
  error = "error";
  success = "success";
  warning = "warning";
  info = "info";
  autoHideDuration = 600 * 1000; //in milliseconds

  SEARCH_TIME_OUT = 350;

  integration = "Integration";
  performance = "Performance";

  // Landing Page
  LOGIN = "login";
  REGISTER = "register";
  FORGOT_PASSWORD = "forgot-password";
  RESET_PASSWORD = "changepwd";
  ACTIVATE_USER = "activate";
  CONNECTION_LOST = "connection-lost";

  //string regex
  nospecialcharacters =
    /^[^<>{}\"/|;:.,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©0-9_+]*$/;
  //Email validation Regex
  regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  passwordregex =
    /^(?=.[a-z])(?=.[A-Z])(?=.[#@$!%?&])(?=.[0-9])[A-Za-z\d#@$!%?&]/;
  //Phone Number Regex
  phoneNumber = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  // Only Characters Regex
  characterRegex = /^[A-Za-z ]*$/;

  passwordValidationRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[#@$!%*?&])(?=.*[0-9])[A-Za-z\d#@$!%*?&]{8,}/;

  Opened = "Opened";
  Clicked = "Clicked";

  // step 4 acceptedFiles
  jpeg = ".jpeg";
  jpg = ".jpg";
  png = ".png";
  gif = ".gif";
  bmp = ".bmp";
  tiff = ".tiff";
  pdf = ".pdf";
  doc = ".doc";
  docx = ".docx";
  txt = ".txt";
  xls = ".xls";
  xlsx = ".xlsx";

  // step 3 using this text in card
  chooseTemplate = "chooseTemplate";
  BuildTemplate = "BuildTemplate";
  PasteHtml = "PasteHtml";

  // ReCAPTCHA
  siteKey = "6LcfPTQiAAAAAEiV_UD6vAZCy2RkJ1heocnrPFSq";

  SUPER_ADMIN = "Super Admin";
  ADMIN = "Admin";
  USER = "User";
  USERADMIN = "UserAdmin";

  // Predefined Roles
  ACCOUNTADMINROLEID = 1;
  ADMINROLEID = 2;

  // authManager
  DASHBOARD = "Dashboard";
  TRIPVIEW = "TripView";
  MAPVIEW = "MapView";
  CAMPAIGNS = "Campaigns";
  SEQUENCES = "Sequences";
  GROUPS = "Campaign Groups";
  CONTACTS = "Contacts";
  CAMPAIGNHISTORY = "Campaign History";
  TEMPLATES = "Templates";
  TEMPLATESEDITOR = "Templates Editor";
  USERS = "Users";
  LOGINACTIVITY = "LoginActivity";
  INDUSTRY = "Industry";
  CUSTOMER_MODULE = "Customer Module";
  MANAGE_TRIPS = "Manage Trips";
  ROLE_MANAGEMENT = "Role";
  ACCOUNT = "Account";
  DEVICEONBOARDING = "Device Onboarding";
  INTEGRATION = "Integration";
  CREATECAMPAIGN = "Create Campaign";
  RETARGEETTING = "Retargetting";
  CAMPAIGNDETAILS = "Campaign Stats";
  PAGENOTFOUND = "Page Not Found";
  SOCIAL = "Social";
  TICKETS = "Tickets";
  DEVICEHISTORY = "Device History";
  ASSETASSIGNMENT = "Asset Assignment";
  LOCATIONTYPE = "LocationType";
  DISTANCE = "Distance";

  ALERT = "Alert";
  LIVE_MONITORING = "Live Monitoring";
  ALL_DEVICES = "All Devices";
  DEVICES = "Devices";
  DEVICE_FORM_BUILDER = "Device Form Builder";
  DEVICE_LIST = "Device List";
  STATE = "123456789";
  FACEBOOK_APP_ID = 1347418019080617;
  FACEBOOK_APP_SECRET = "f474dc2284358fc1a8fdd73955d2fa81";
  ACTIVE_ROUTES = "Active Routes";
  UPCOMING_ROUTES = "Upcoming Routes";

  //For Support Ticket
  assignedToMe = "Assigned To Me";
  raisedByMe = "Raised By Me";
  completedTickets = "Completed Tickets";
  openTickets = "Open Tickets";
  PROCESSADMIN = "Process Admin";
  USER_DESCRIPTION_LIMIT = 500;
  TICKET_USER_TITLE_LIMIT = 50;

  // for campaign Component
  Completed = "Completed";
  Submitted = "Submitted";
  Draft = "Draft";
  All = "All";

  CAMPAIGN_NAME_SIZE = 100;
  SUBJECT_LINE_SIZE = 90;
  DISPLAY_NAME_SIZE = 50;
  USER_TITLE_LIMIT = 50;
  USER_FIRST_NAME_LIMIT = 30;
  USER_LAST_NAME_LIMIT = 30;
  USER_EMAIL_LIMIT = 100;
  USER_ADDRESS_LIMIT = 150;
  TAGS_LIMIT = 25;
  TEST_MAIL_LIMIT = 9;

  //  for ticket
  assignData = "assignData";
  RaisedData = "RaisedData";
  openData = "openData";
  completedData = "completedData";
  Reassign = "Reassign";
  DrawerTitle = "Ticket Details";
  ReassignTitleValue = "New Assignee";

  // campaign status
  Success = "Success";
  Failed = "Failed";
  Sent = "Sent";
  unsubscribed = "Unsubscribed";
  Requested = "Requested";

  groupMailingListType = "Groups";
  tagMailingListType = "Tags";

  // tabs change
  Assigneded = "Assigneded To Me";
  RaisedByMe = "Raised By Me";
  OpenTickets = "Open Tickets";
  CompletedTickets = "Completed Tickets";

  // Recent Activity drop down values
  allActivity = "all";
  campaignActivity = "campaign";
  audienceActivity = "audience";

  FACEBOOK = true;
  LINKEDIN = false;
  INSTAGRAM = false;
  INTEGRATIONS = false;

  SUPPORT_TICKET = true;

  RESENDCAMPAIGN = "resendCampaign";

  //for settings
  profile = "Profile";
  roleManagement = "Role Management";
  billingUsage = "Billing Usage";
  editRole = "Edit Role";
  createRole = "Create Role";
  rolesTable = "Roles Table";
  usersTable = "Users Table";
  editPassword = "Edit Password";

  // for title
  LoginTitle = "Login | IMZ";
  CreateAccountTitle = "Create Account | ";
  OnboardTitle = "Let's get started | IMZ";
  DashboardTitle = "Dashboard | IMZ";
  CampaignsTitle = "Campaigns | IMZ";
  CreateCampaignTitle = "Create Campaign | IMZ";
  CampaignGroups = "Groups | IMZ";
  ContactTitle = "Contacts | IMZ";
  CampaignHistoryTitle = "History | IMZ";
  CheckYourEmailTitle = "Check your email | IMZ";
  TemplatesTitle = "Templates | IMZ";
  UsersTitle = "Users | IMZ";
  AlertReportTitle = "Alert Report | IMZ";
  AssetAssingmentTitle = "Asset | IMZ";
  ForgotPasswordTitle = "Forgot Password | IMZ";
  Integration = "Integrations | IMZ";
  Social = "Social | IMZ";
  Ticket = "Tickets | IMZ";
  StatsTitle = "Stats | IMZ";
  ResendCampaignTitle = "Resend Campaign | IMZ";
  ProfileTitle = "Profile | IMZ";
  RoleManagementTitle = "Role Management | IMZ";
  SequentialCampaignTitle = "Sequences | IMZ";

  //for new templates page and new create campaign page
  allTemplates = "All Templates";
  myTemplates = "My Templates";

  // Resources
  app = "app";
  account = "account";
  campaigner = "campaigner";
  campaign = "campaign";
  contact = "contact";
  social = "social";
  billing = "billing";

  // Permissions
  adminPermission = "admin";
  selfPermission = "self";
  fetchPermission = "fetch";
  addPermission = "add";
  updatePermission = "update";
  uploadPermission = "upload";
  deletePermission = "delete";

  //Social page
  emptyContentAndImageError =
    "Please either enter content or upload image or both";

  // Email Campaign Types
  EMAIL_REGULAR_CAMPAIGN = "regular";
  EMAIL_AB_CAMPAIGN = "ab";
  MODULE = "Module";
  ROUTES = "Routes";
  VIEW_ROUTES = "VIEW ROUTES";
  LIVE_TRACKING = "LIVE TRACKING";
  TRACK_PLAY = "TRACK PLAY";
  ALERT_REPORTS = "ALERT REPORTS";
  DISTANCE_REPORTS = "DISTANCE REPORTS";
  ROUTES_REPORTS = "DISTANCE REPORTS";
  VIEW_OFFLINE = "VIEW OFFLINE";
  ARCHIVED_ROUTES = "ARCHIVED ROUTES";
  ASSET_ASSIGNMENT = "ASSET ASSIGNMENT";
  ALERT_CONFIG = "Alerts";
  DEVICE_GROUP = "DEVICE GROUP";
  ACTIVE_TRIPS = "ACTIVE TRIPS";
  // MANAGE_TRIPS = "MANAGE TRIPS";
  ARCHIVED_TRIPS = "ARCHIVED TRIPS";
  FORM_BUILDER = "FORM BUILDER";
  TRIP = "Trip";

  DEVICE_MODULE = "DEVICE MODULE";
  DEVICE_HISTORY = "DEVICE HISTORY";
  DEVICE_ONBOARDING = "DEVICE ONBOARDING";
  ENTITY = "ENTITY";
  ENTITY_TYPE = "ENTITY TYPE";
  TRIPT_TYPE = "TRIP TYPE";
  TRIP_REPORT = "TRIP REPORT";
  TRIP_ACCESS = "TRIP ACCESS";
  USER_ACCESS = "USER ACCESS";
  ADD_DEVICE = "ADD DEVICE";
  DEVICE_TRANSFER = "DEVICE TRANSFER";
  DATAPUSH = "DATA PUSH";
  FORM_BUILD = "FORM BUILD";
  ADD_TRIPS = "ADD TRIPS";
  VIEW_TRIP = "VIEW TRIP";
  Cancel = "Cancel";
  Unlock = "Unlock";
  Previous = "Previous";
  Save = "Save";
  Next = "Next";
  DATE_FORMAT = "MMM DD YYYY";
  Edit = "Edit";
  Created = "Created";
  Started = "Started";
  Ended = "Ended";
  Closed = "Closed";
  GEOZONE = "Geozone";
  ADD = "Add";
  UPDATE = "Update";
  DELETE = "delete";
  FETCH = "fetch";
  UPLOAD = "upload";
  ALERTS = "Alerts";
  LOCATION = "Location";
  DEVICE = "Devices";
  TRIPS = "Trips";
  INVENTORY = "Inventory";
  SETTINGS = "Settings";
  REPORTS = "Reports";
}

let strings = new StringConstants();
export default strings;
