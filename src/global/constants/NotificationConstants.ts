import { StringConstants } from "./StringConstants";

class NotificationConstants extends StringConstants {
  GENERIC_ERROR = "Something went wrong! Please try again.";
  LOGGEDOUT = "You are logged out from the system. Please log in again.";
  LOGIN_ERROR = "Please enter valid email id and password";
}

let notifiers = new NotificationConstants();
export default notifiers;
